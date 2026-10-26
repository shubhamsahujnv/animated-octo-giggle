---
platform: Hashnode
post_id: H8
week: 9
title: "One codebase, two platforms: the cross-platform decision is a build-system problem"
slug: flutter-react-native-decision-build-system-problem
subtitle: "The framework comparison is the least important input. What decides it is your existing code, your hiring pool and your native-module exposure."
tags: [flutter, reactnative, mobile, architecture, cicd]
target_keyword: "flutter vs react native" (GSC pos 31.75) / "react native vs flutter"
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/react-native-vs-flutter
    anchor: "React Native vs Flutter"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/shipping-mobile-on-two-platforms
    anchor: "shipping one product on two platforms without doubling the team"
    type: natural-language
external_links:
  - Flutter and React Native official architecture docs
cross_link: S8
---

# One codebase, two platforms: the cross-platform decision is a build-system problem

The Flutter versus React Native question gets argued on rendering architecture,
startup time, and which one "feels native". I have now made this decision four
times and in none of them did any of that matter.

What mattered, every time, was some combination of: what the team already knows,
what native capability the app needs, what the existing web codebase looks like,
and how much CI complexity the organisation can absorb. Those are build-system
and org-chart questions, not framework questions.

Here is the decision procedure I would actually use, and the parts of it that
are genuinely technical.

## The framework comparison, dispatched quickly

Both are mature. Both ship apps used by millions of people. The real
architectural difference is one thing:

**Flutter draws its own widgets.** It ships a rendering engine and paints to a
canvas. You get pixel-identical output across platforms and complete control,
and you do not get platform widgets — so when iOS changes its date picker, your
app does not.

**React Native drives platform components.** A `<Text>` becomes a `UITextView`
or a `TextView`. You inherit platform behaviour and platform updates for free,
and you inherit platform inconsistency.

Everything else — performance, tooling quality, hot reload, ecosystem size — is
close enough in 2026 that it should not decide anything. Both have good
profilers. Both have adequate state management stories. Both have a long tail of
packages of variable quality.

If your app is a brand-controlled experience with custom design (fintech
dashboards, media apps, anything with a strong design system), Flutter's
own-rendering model is an advantage. If your app should feel like an OS app and
follow platform conventions (utilities, productivity, anything with heavy
system integration), React Native's platform-component model is an advantage.

That is the whole framework analysis. Now the parts that actually decide it.

## Decision input 1: your native-module exposure

Count the platform capabilities your app needs that are not covered by
first-party framework APIs. Bluetooth LE with a specific peripheral profile.
Background location with geofencing. A payment terminal SDK. HealthKit. A
hardware barcode scanner. CarPlay. An enterprise MDM integration.

For each one, answer: **is there a maintained community package, and if not, who
on the team writes the bridge?**

```
Capability             | Flutter pkg      | RN pkg          | Bridge needed?
-----------------------|------------------|-----------------|----------------
BLE (generic)          | mature           | mature          | no
BLE (vendor profile)   | —                | —               | YES, both
Background geofencing  | adequate         | adequate        | no
Payment terminal SDK   | —                | —               | YES, both
HealthKit / Health Conn| adequate         | mature          | no
CarPlay / Android Auto | minimal          | minimal         | YES, both
```

If that column has two or more `YES` rows, **the cross-platform framework choice
is no longer the main cost of your project.** You are writing native code for
both platforms either way, plus the bridge layer, plus the plugin's build
integration into your CI. At that point:

- Writing bridges in Kotlin/Swift for React Native uses skills that overlap with
  web-native hiring (TypeScript on one side).
- Writing bridges for Flutter needs Dart plus Kotlin plus Swift — three
  languages, and Dart has a smaller hiring pool.

This is usually the deciding input, and it is almost never in the comparison
articles.

## Decision input 2: what your web codebase is

If you have a substantial React web app, React Native lets you share genuinely
useful things: validation schemas, API clients, domain types, state logic, and
business rules. Not components — the sharing-UI-components dream mostly does not
work — but the layer underneath, which is frequently 30-40% of the code.

```
packages/
├── core/              # shared: types, validation, domain logic
│   ├── src/api/       #   generated client from OpenAPI — shared
│   ├── src/domain/    #   pricing rules, entitlements — shared
│   └── src/schema/    #   zod schemas — shared
├── web/               # React
└── mobile/            # React Native — imports @acme/core
```

That structure pays for itself in correctness, not just effort: a pricing rule
that exists once cannot diverge between platforms. We shipped a bug once where
web and mobile disagreed about whether a discount applied to shipping, and it
took three weeks to find because both were "correct" in their own codebase.

With Flutter, that sharing does not exist. You will reimplement the domain layer
in Dart, and it will drift.

Conversely, if your web app is Angular, Vue, or server-rendered, there is
nothing to share and this input is neutral — which frees Flutter to win on its
own merits.

## Decision input 3: the CI reality

This is the part teams consistently underestimate, and it is where "one
codebase" stops being true.

One codebase does not mean one build. You still need:

- Two toolchains (Xcode and Android SDK), version-pinned and reproducible.
- macOS runners for iOS. These cost roughly 4-10× Linux runners.
- Two signing-credential paths: certificates and provisioning profiles for
  Apple, keystore for Android.
- Two store-submission pipelines with different review latencies and metadata.
- Device testing across OS versions on both platforms.

```yaml
# The irreducible shape. "One codebase" does not collapse this.
jobs:
  test:
    runs-on: ubuntu-latest        # cheap: unit tests, lint, typecheck

  build-android:
    runs-on: ubuntu-latest        # cheap
    needs: test

  build-ios:
    runs-on: macos-14             # expensive, slower, flakier
    needs: test
```

Two specifics worth knowing before you commit:

**Toolchain pinning is not optional.** An unpinned Xcode or Android Gradle
Plugin version will break your build on a runner image update, on a day you did
not plan to debug build infrastructure. Pin both, in the repo, and upgrade
deliberately.

**iOS signing is the most common CI failure for both frameworks.** Certificates
expire, provisioning profiles need regenerating when you add a device or a
capability, and the failure message is unhelpful. Use the platform's official
automation (`fastlane match` or App Store Connect API keys), store it properly,
and write down the renewal procedure, because the person who set it up will be
on leave when it expires.

Neither framework helps with any of this. The build complexity is a property of
shipping to two app stores, and it is roughly the same either way.

## Decision input 4: who you can hire

Unglamorous, decisive.

- **React Native**: hires from the React pool, which is large. A competent React
  engineer is productive in React Native in weeks. Native bridge work needs a
  Kotlin/Swift specialist, hired or contracted.
- **Flutter**: hires from the Flutter/Dart pool, which is smaller but genuinely
  enthusiastic and often more experienced in mobile specifically. Harder to
  hire quickly; frequently better mobile engineers when you do.

For a team of three building one app, hiring speed probably decides it. For a
team of fifteen with existing React people, the overlap decides it.

## The procedure

```
1. Count native capabilities needing a custom bridge.
   >= 2  -> weight heavily toward whichever language your team
            can staff bridges in. Framework choice is now secondary.

2. Is there a substantial React web codebase?
   yes  -> React Native, for the shared core package.
   no   -> neutral; continue.

3. Is the UI a controlled brand experience or a platform-conventional app?
   brand-controlled     -> Flutter.
   platform-conventional -> React Native.

4. Can you hire for Dart in your market, at your timeline?
   no -> React Native.

5. Still tied? Pick React Native if the team is web-leaning,
   Flutter if the team is mobile-leaning. Both are fine.
   Stop researching and start building.
```

Step 5 is sincere. I have watched teams spend six weeks on this decision. Six
weeks of building in either framework would have produced more information than
six weeks of comparison, because the real constraints only show up when you hit
them.

## The thing that actually doubles your team

A closing observation that applies regardless of which you pick.

The cost that surprises people is not writing the code twice. It is **testing,
releasing, and supporting twice** — two store review cycles, two sets of OS
version compatibility, two crash-report streams, two sets of device-specific
bugs, two release trains that drift out of sync.

A cross-platform framework addresses the writing. It does almost nothing for the
rest, and the rest is where the sustained effort lives. Pixorama's note on
[shipping one product on two platforms without doubling the team](https://pixoramagroup.com/blog/shipping-mobile-on-two-platforms)
is mostly about that operational half, which is the half worth planning.

For a straight framework-versus-framework treatment with the trade-offs laid out
properly, their
[React Native vs Flutter](https://pixoramagroup.com/blog/react-native-vs-flutter)
comparison covers the ground this post deliberately skips.

Read both frameworks' own architecture documentation before deciding — Flutter's
rendering-pipeline docs and React Native's New Architecture docs are honest
about their own trade-offs in a way third-party comparisons usually are not.
