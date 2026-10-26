---
platform: Substack
post_id: S8
week: 9
title: "Issue 8: Shipping on two platforms without doubling the team"
subtitle: "The framework saves you some of the writing. It saves you almost none of the testing, releasing and supporting — which is where the cost lives."
target_keyword: "flutter vs react native" (GSC pos 31.75) / mobile cost cluster
canonical: NONE — original
compliance_note: |
  Stands alone. Two main-site links as references.
outbound_links:
  - url: https://pixoramagroup.com/blog/shipping-mobile-on-two-platforms
    anchor: "shipping one product on two platforms"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/mobile-app-development-cost-usa-australia
    anchor: "what the build itself costs in the US and Australia"
    type: descriptive
cross_link: H8
---

# Issue 8: Shipping on two platforms without doubling the team

The cross-platform promise is one codebase instead of two. It is true, and it is
a smaller win than it sounds, because writing the code was never the expensive
part.

I have been close to three apps through to their second year — two
cross-platform, one native on both. The cross-platform choice saved perhaps
30-40% on initial implementation. It saved considerably less than that on the
ongoing cost, and the ongoing cost dominates.

Here is where the money actually goes.

## What does not collapse

One codebase does not mean one of any of the following:

**Two toolchains.** Xcode and the Android SDK, version-pinned and reproducible.
An unpinned Xcode or Android Gradle Plugin version will break your build on a
runner image update, on a day you had not planned to debug build
infrastructure.

**Two release trains with different latencies.** Apple review is a day or more
and occasionally much longer. Google is usually faster. So your "simultaneous
release" is two releases that drift, and any coordinated feature launch is
paced by the slower one.

**Two sets of OS releases to survive.** Annually, both platforms, and each one
breaks something. Not always much, always something. Budget two to four weeks of
engineering per year per platform purely to stay shippable, having added no
features.

**Two signing-credential paths.** Certificates and provisioning profiles for
Apple, a keystore for Android. iOS signing is the single most common CI failure
I have seen on mobile projects, in both frameworks equally, and the failure
message is unhelpful. Write down the renewal procedure, because the person who
set it up will be on leave when it expires.

**Two device test matrices.** And this one is worse than it looks: supporting
iOS 15 as well as iOS 18 roughly doubles your matrix. The decision to drop old
OS versions is a cost decision disguised as a product decision, and in my
experience it is made by nobody — it just drifts, and the matrix grows.

**Two crash streams.** Device-specific, OS-version-specific,
network-condition-specific, frequently not reproducible on your desk.

None of that is affected by your framework choice. It is a property of shipping
to two app stores.

## The number that reframes it

On the two consumer apps, post-launch bug work settled at roughly **25-30% of
ongoing engineering capacity, indefinitely.** Not a stabilisation period — a
steady state.

This surprised everyone involved, including me. The mental model is that bugs are
a launch phenomenon that decays. In mobile it does not decay, because the
environment keeps changing underneath you: new devices, new OS versions, new
network behaviours, and a long tail of users on three-year-old hardware.

And mobile has a property that web does not: **you cannot fix forward
immediately.** A bad web release is reverted in minutes. A bad mobile release
sits in review while your users have it, and some portion of your users will
never update — one of those apps still had 4% of its active base on a version
eighteen months old.

That single fact changes the economics of quality. Mobile QA is worth more than
web QA, because the cost of a bad release is structurally higher and the
remediation is slower. Teams that carry over web release instincts to mobile
learn this expensively.

## So what actually keeps the team small

Four things, in order of how much they mattered:

**1. Decide the OS support policy, in writing, before you start.** "We support
the current and previous major version" is one sentence that removes a recurring
argument and a meaningful slice of the test matrix. Deciding it later means
deciding it under pressure from one complaining customer, which is how you end
up supporting iOS 15 in 2026.

**2. Share the layer below the UI, not the UI.** On the React Native app this
was the biggest real win and it was not what we expected. Sharing components
with web mostly did not work. Sharing the layer underneath — API client,
validation schemas, domain types, pricing rules — worked extremely well, and
was about 35% of the code.

The payoff was correctness more than effort. We had previously shipped a bug
where web and mobile disagreed about whether a discount applied to shipping, and
it took three weeks to find because both were correct in their own codebase. A
rule that exists once cannot diverge.

**3. Automate the release, including the metadata.** Screenshots, descriptions
and localised store copy are a surprising amount of manual work every time the
UI changes meaningfully. Generating screenshots from UI tests is a day of setup
and removes a recurring half-day.

**4. Instrument before you need it.** You cannot reproduce a user's crash on
your desk. Breadcrumbs, session context and a correlation ID that survives into
your backend logs are what turn "it crashes sometimes" into a fix.

## What I would not do

**Do not pick the framework on projected cost savings.** Across three years my
rough sense is that total costs converge much more than the initial quotes
suggest. Native writes everything twice; cross-platform pays a framework-upgrade
tax — we hit one major version bump that consumed six weeks of dependency churn
and native build configuration.

Pick on team skills and native-capability needs instead. Specifically: count the
platform capabilities you need that have no maintained package, because for each
of those you are writing native code on both platforms regardless, and then the
question is which language your team can staff bridges in.

**Do not treat the app as the project.** If the app needs accounts, sync, push
or server-side logic, that is a separate system, and on the three projects the
backend was **40-70% of total engineering effort.** The B2B one was 70% — the
app was eight weeks, the ERP integration was nine months.

If a quote for "a mobile app" has no line for backend work, find out whether
that is because it is excluded or because nobody has thought about it. Those are
very different situations and both are common.

## The honest summary

A cross-platform framework addresses the writing. The writing is maybe a third
of a mobile product's lifetime cost. Testing, releasing and supporting two
platforms is most of the rest, and it is roughly the same either way.

So the team does not double, but it does not halve either. What keeps it small
is the OS support policy, sharing the domain layer, automating the release, and
accepting that a quarter of your capacity is permanently allocated to the
environment changing underneath you.

My colleagues wrote about the operational half of this —
[shipping one product on two platforms](https://pixoramagroup.com/blog/shipping-mobile-on-two-platforms)
— which is the half worth planning and the half that gets left out of estimates.
And if you are at the quoting stage,
[what the build itself costs in the US and Australia](https://pixoramagroup.com/blog/mobile-app-development-cost-usa-australia)
is more granular on the first line of the budget than I could be from three
projects.

The one question I would put to any firm quoting you a mobile build: *what is
your year-two and year-three estimate?* A firm that maintains the apps it builds
has an answer. A firm that does not is quoting a build, not a product, and you
should weight their number accordingly.

Next issue: security that does not stop delivery, and the one change I think
most teams should make this quarter.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). Three apps, two
consumer and one B2B field-service, anonymised. Percentages are from those
three; treat the ratios as more transferable than the absolute figures.*
