---
platform: Medium
post_id: M8
week: 9
title: "What a mobile app actually costs, after the quote"
subtitle: "The build quote is the smallest number in the project. Here is the rest of it, from three apps I have seen through to their second year."
tags: [mobile-app-development, startup, product-management, software-development, technology]
target_keyword: "mobile app development cost" cluster
canonical: NONE — original post
distribution_notes: |
  Original cost analysis from first-hand projects with specific figures.
  Not a vendor round-up. Numbers are presented as ranges with their
  provenance stated.
outbound_links:
  - url: https://pixoramagroup.com/blog/mobile-app-development-cost-usa-australia
    anchor: "USA and Australia prices compared line by line"
    type: descriptive
  - url: https://pixoramagroup.com/blog/react-native-vs-flutter
    anchor: "the cross-platform decision"
    type: descriptive
bio_link: https://pixoramagroup.com/blog
cross_link: H8
---

# What a mobile app actually costs, after the quote

Someone quotes you $120,000 to build an app. You budget $120,000, maybe $150,000
with a contingency, and the app ships roughly on budget.

Then year two costs you another $90,000 and nobody warned you, because the quote
was for the build and the build is the part of a mobile app with the clearest
scope and the smallest total cost.

I have now watched three apps through to their second year. The numbers below
are from those three — two consumer, one B2B field-service — and I am giving
ranges rather than averages because the variance is the interesting part.

## What the build quote covers

Design, implementation, QA, store submission. Usually a fixed scope with a
change-request process. If the quote came from a competent firm it is probably
approximately right for the scope described, and scope creep during the build is
a well-understood risk that everybody plans for.

Fine. That is the number you have. Here is what is not in it.

## 1. The backend, if you did not already have one

This is the single largest omission I have seen in app budgets, and it happens
because the conversation starts with "we need an app" and the app is the visible
part.

If the app needs accounts, sync, push notifications, an admin interface or any
server-side business logic, that is a separate system. In the three projects:
the backend was **40% to 70% of total engineering effort.**

The B2B one was 70%, because the app was essentially a client for a scheduling
and inventory system that had to integrate with an existing ERP. The app was
eight weeks. The integration was nine months.

If a quote for "a mobile app" does not have a line for backend work, establish
immediately whether that is because it is excluded or because nobody has thought
about it. Those are very different situations and both are common.

## 2. Two app stores, forever

Not a one-off. An ongoing operational commitment:

- **Apple requires an annual developer account** and periodically requires
  rebuilds against a newer SDK to accept updates. Miss a deadline and you cannot
  ship.
- **Each OS release** (annually, both platforms) breaks something. Not always
  much. Always something. Budget two to four weeks of engineering per year per
  platform just to stay shippable, having added no features.
- **Review rejections** cost calendar time at the worst moment. We had a
  rejection over a subscription-flow technicality that cost eleven days against
  a marketing launch date.
- **Store metadata, screenshots and descriptions** need maintaining across
  locales every time the UI changes meaningfully.

Across the three projects this "do nothing, stay alive" cost ran **$18,000 to
$35,000 a year**, with the variance driven mostly by how many OS versions and
devices they supported.

That last point is worth dwelling on: supporting iOS 15 as well as iOS 18
roughly doubles your device test matrix. The decision to drop old OS versions is
a cost decision disguised as a product decision, and it is usually made by
nobody.

## 3. Crash and support load scales with installs, not features

Once real users have it, you get a stream of reports that are device-specific,
OS-version-specific, network-condition-specific, and frequently not reproducible
on your desk.

In the consumer apps, **post-launch bug work settled at roughly 25-30% of
ongoing engineering capacity**, indefinitely. Not during a stabilisation period —
as a steady state.

This surprised everyone on all three projects. The mental model is that bugs are
a launch phenomenon that decays. In mobile it does not decay, because the
environment keeps changing underneath you: new devices, new OS versions, new
network behaviours, users on three-year-old hardware.

Mobile has a characteristic that web does not: **you cannot fix forward
immediately.** A bad release on the web is reverted in minutes. A bad mobile
release sits in review for a day or more while your users have it, and a portion
of your users will never update. One of the consumer apps still had 4% of its
active base on a version eighteen months old.

That changes the economics of testing. Mobile QA is worth more than web QA
because the cost of a bad release is structurally higher.

## 4. Analytics, crash reporting, and the rest of the stack

Individually small, collectively not: crash reporting, analytics, push
notification infrastructure, feature flags, over-the-air update capability,
error tracking, session replay.

**$500 to $4,000 a month** across the three, scaling with volume. The B2B app
was at the low end; the consumer app with a large free tier was at the high end
because analytics pricing is per-event and a chatty app generates a lot of
events.

Worth checking: several of these price per monthly active user or per event,
which means your infrastructure cost grows with the success metric you are
trying to grow. Model it at 10× current users before you commit.

## 5. The feature treadmill nobody budgets as a line

An app that does not change looks abandoned. Users notice, reviews mention it,
and store ranking algorithms appear to favour recency.

So you ship updates. Not necessarily big ones, but regularly. Across the three
projects, **ongoing feature work ran 30-50% of the original build cost, per
year.** The B2B app was lower, because its users had no alternative and did not
care about freshness. The consumer apps were at the top of the range.

This is the number that makes the total-cost picture land: a $120,000 build is
plausibly a $60,000-a-year commitment thereafter, which over three years makes
the build about 40% of the total.

## 6. The cross-platform decision, which cuts both ways

Both consumer apps were cross-platform; the B2B one was native on both.

What I observed: the cross-platform choice saved perhaps 30-40% on initial
implementation and saved considerably less than that on the ongoing cost, because
the ongoing cost is dominated by testing, releasing and supporting two
platforms, which does not collapse.

It also introduced a cost nobody forecast: **framework version upgrades.** A
major version bump of a cross-platform framework is a project — dependency
churn, breaking changes in community packages, native build configuration. We
hit one of these that consumed six weeks.

Native avoids that and pays for it by writing everything twice. Across three
years and three apps, my rough sense is that the total costs converge more than
the initial quotes suggest, and the decision should therefore be made on team
skills and native-capability needs rather than on projected cost savings —
which is also roughly the conclusion of Pixorama's
[the cross-platform decision](https://pixoramagroup.com/blog/react-native-vs-flutter)
write-up.

## Putting it together

For a $120,000 build quote, the three-year picture looked roughly like:

| | Low | High |
|---|---|---|
| Build (quoted) | $120,000 | $120,000 |
| Backend, if not existing | $80,000 | $280,000 |
| Store/OS maintenance, 3yr | $54,000 | $105,000 |
| Bug and support work, 3yr | $70,000 | $150,000 |
| Tooling and infrastructure, 3yr | $18,000 | $144,000 |
| Feature work, 3yr | $108,000 | $180,000 |
| **Three-year total** | **$450,000** | **$979,000** |

The quoted build is **12-27% of the three-year cost.**

I want to be careful about how much weight those numbers carry: they are three
projects, in specific markets, with specific scopes. The ratios are more
transferable than the absolute figures, and the ratio I would stand behind is
that the build is somewhere between a sixth and a third of what you will spend
over three years.

For region-specific build pricing with the components broken out — which is the
input to the first row rather than the whole table — Pixorama's
[USA and Australia prices compared line by line](https://pixoramagroup.com/blog/mobile-app-development-cost-usa-australia)
is more granular than anything I would attempt from three data points.

## What to do with this

Two things, both of which are cheap and almost never done:

**Ask the quoting firm for their year-two and year-three estimate.** A good firm
has one, because they maintain apps they have built and know what it costs.
A firm that has not thought about it is quoting a build, not a product, and you
should hold their number accordingly.

**Decide the OS support policy before you start.** "We support the current and
previous major OS version" is a single sentence that removes a recurring
argument and a meaningful slice of the test matrix. Deciding it later means
deciding it under pressure from a specific complaining customer.

One last note on geography, since it changes the first row of that table more
than anything else: the same scope quoted in different markets varies by a
factor I would not have believed before seeing it. Their breakdown of
[what a build costs in India, line by line](https://pixoramagroup.com/blog/mobile-app-development-cost-india)
is a useful comparison point against the US and Australian figures, and the
thing worth noticing is that the *ratio* of build to three-year total is
roughly constant across markets. A cheaper build does not buy you a cheaper
product; it buys you a cheaper sixth of one.

The app is not the project. The app is the part of the project you can see.
