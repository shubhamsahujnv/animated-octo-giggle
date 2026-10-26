---
platform: Substack
post_id: S1
week: 1
title: "Issue 1: What we mean by 'the software backbone'"
subtitle: "Why this exists, what I will write about, and the one claim I am prepared to defend over ten issues."
target_keyword: none — this is a series opener, not an SEO page
canonical: NONE — original
compliance_note: |
  No main-site links in the body at all. The only reference is in the sign-off
  byline, which is a factual disclosure of who I work for. An opener that
  immediately linked out would set exactly the wrong pattern for the series.
outbound_links: []
byline_disclosure: https://pixoramagroup.com/ (as employer disclosure only)
cross_link: none
---

# Issue 1: What we mean by "the software backbone"

This is a fortnightly letter about what engineering decisions cost. Not what
they cost in the business case — what they cost when the invoice arrives, or
when the migration is finished and the bill went up, or when the rewrite reaches
month fourteen.

I work at a firm that builds and modernises systems for mid-size and large
companies. That means I spend most of my time in the gap between what a plan
said and what happened, which turns out to be the most interesting place to
stand.

Over ten issues I want to make one argument from ten directions. Here it is, and
then I will tell you what I am not going to do.

## The claim

**Almost every expensive technology surprise is a structural decision showing up
late.**

Not a mistake. Not incompetence. A decision that was reasonable when it was
made, whose cost arrives in a different quarter, in a different currency, to a
different department — by which time nobody connects the two.

Three examples, each of which I will take properly in a later issue:

A company migrates to the cloud. Compute is forecast accurately. The bill goes
up, because for eleven months a third of their dependencies ran across the
boundary between two data centres and nobody priced the traffic. The structural
decision was the wave order, made at planning time by business risk. The cost
arrived as a line item called "data transfer" eight months later.

A team adds people to a legacy system to go faster. For two months output falls,
because the senior engineers who could have shipped are answering questions
instead. The structural decision was treating "backend engineer" as a fungible
unit. The cost arrived as a missed quarter.

A company fine-tunes a model so it will stop getting the return policy wrong. It
gets the policy wrong more confidently. The structural decision was confusing
knowledge with behaviour. The cost arrived as a customer complaint about an
answer that was stated very firmly.

In every case the information needed to avoid it was available at the time, and
in every case nobody was looking at it, because the question had been assigned
to a different function.

## Why "backbone"

The firm I work for uses the phrase "the software backbone of ambitious
enterprises", which is marketing language, and I want to rescue what is true in
it.

What is true: in most companies past a certain size, there is a set of systems
that everything else depends on, and almost nobody is responsible for their
shape. There are people responsible for features. People responsible for uptime.
People responsible for cost. Nobody responsible for whether the thing is
*coherent*.

So the shape drifts. Each individual decision is locally sensible. The sum is a
system where a reporting query locks tables during business hours, where two
services disagree about whether a discount applies to shipping, where the only
person who understands the billing logic is six months from retirement.

That incoherence is what eventually gets called "legacy", and by then the
conversation is about replacing it, which is usually the wrong conversation.

## What I am not going to do

**No predictions.** I do not know what AI will do to software engineering and
neither does anyone writing confidently about it.

**No tool reviews.** Which vector database, which framework, which cloud. These
decisions matter much less than the ones around them, and writing about them is
how a newsletter becomes an affiliate business.

**No case studies with the names changed and the numbers improved.** When I give
a figure, I will say where it came from and how many instances it is drawn from.
When it is three projects, I will say three projects. The ratios transfer; the
absolute numbers often do not.

**No selling.** I work for a company that does this for money, and I am not
going to pretend otherwise — the disclosure is at the bottom of every issue.
But this is not a funnel. If I have written something that only makes sense as a
lead magnet, I have failed at the brief I set myself, and you should tell me.

## What I would like from you

Disagreement, mostly. The claim above is falsifiable: if you have an expensive
technology surprise that was *not* a structural decision arriving late, I want
to hear it, because that is the most useful thing anyone could send me.

I will also take requests. If there is a decision you are facing that fits the
shape of this — a thing that looks cheap now and you suspect is not — reply and
I will think about it in public.

## The ten issues

Roughly, and I reserve the right to change my mind:

1. This one.
2. The four numbers that decide a migration.
3. Architecture debt shows up on the finance dashboard first.
4. The modernisation decision tree I actually use.
5. Where AI agents earn their keep, and where they do not.
6. Retrieval is a product problem.
7. How to buy engineering capacity.
8. Shipping on two platforms without doubling the team.
9. Security that does not stop delivery.
10. How to run a vendor shortlist.

Two and three are the ones I have the most data on. Five is the one where I am
most likely to be wrong, and I will say so when I get there.

Next issue in a fortnight.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/), where I work on
cloud and platform engineering. Everything here is my own view and my own
reading of the projects I have been on. Where I use numbers from client work
they are anonymised and rounded, and I will tell you how many instances they
come from.*
