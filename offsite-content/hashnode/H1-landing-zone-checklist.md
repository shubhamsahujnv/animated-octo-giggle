---
platform: Hashnode
post_id: H1
week: 1
title: "The landing zone checklist we run before any migration wave"
slug: landing-zone-checklist-before-migration-wave
subtitle: "Eleven things that have to be true before you move the first workload, learned from the waves where they weren't."
tags: [cloud, aws, azure, devops, architecture, terraform]
target_keyword: "on premise to cloud migration" (SD 17, 320/mo, CPC $58.99)
canonical: NONE — original post, not a republish
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "the full step-by-step migration strategy"
    type: partial-match
  - url: https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem
    anchor: "cloud cost is an architecture problem"
    type: partial-match
external_links:
  - Microsoft Learn — Cloud Adoption Framework landing zones
cross_link: M1
---

# The landing zone checklist we run before any migration wave

Most failed migrations I have seen did not fail during the migration. They
failed about five weeks later, when someone asked a question nobody could
answer: *who gave that subscription permission to create a public load
balancer?*

The answer is almost always that the landing zone was built in parallel with the
first wave, by the same two people, under deadline. It worked well enough to get
workload one across. It did not survive workload forty.

So this is the checklist. Eleven things that have to be true before the first
production workload moves. None of them are exotic. The reason to write them
down is that under migration pressure, four or five always get deferred, and the
deferred ones are the ones that produce the five-week-later question.

## 1. Identity exists before compute exists

If your first VM lands before your identity model does, every later access
decision is a retrofit.

Concretely, before anything moves:

- Workload identities are federated to your existing IdP. No standalone cloud
  accounts with local credentials, not even for the pilot.
- Human access is role-assumption only, time-bounded, with no standing
  privileged access.
- Every role has a named owner. Not a team — a person.

The test: can you answer "which humans could have modified this resource
yesterday?" with a query rather than an investigation? If not, stop.

## 2. The account/subscription boundary is a blast radius decision

People choose account topology for billing clarity, then discover they chose
their blast radius too.

The rule we use: **one account per workload per environment**, not one account
per team. Teams reorganise; workloads have lifecycles. A workload-scoped
boundary means decommissioning is `delete account`, which is the only
decommissioning that ever actually happens.

```hcl
# Minimal shape — the point is that env is in the account identity,
# not a tag on shared infrastructure.
locals {
  accounts = {
    "payments-prod"    = { workload = "payments", env = "prod",    ou = "workloads/regulated" }
    "payments-nonprod" = { workload = "payments", env = "nonprod", ou = "workloads/regulated" }
    "catalog-prod"     = { workload = "catalog",  env = "prod",    ou = "workloads/standard" }
  }
}
```

Tags are for reporting. Accounts are for control. Do not try to use tags for
control; they are editable by the people you are controlling.

## 3. Guardrails are preventive, not detective

A detective control tells you someone created an unencrypted bucket. A
preventive control means they could not.

Both have a place, but the first wave needs preventive, because during a
migration your detective alerts go to a queue nobody is reading. Minimum set,
enforced at the organisation level so a workload account cannot opt out:

- No public object storage, by policy, with an explicit exception process that
  requires a second approver.
- Encryption at rest mandatory, with keys in your KMS, not the provider default.
- Region allowlist. This catches more mistakes than you would expect, and it is
  also your data-residency control.
- No IAM user creation. Federation only, as per item 1.

## 4. Network is designed for the steady state, not the migration

This is the one that bites hardest. Migration-period networking is temporary:
a big fat link back to the data centre, permissive routing, flat address space,
because you need everything to reach everything while it is half-moved.

Then the migration ends and that topology is production. Nobody unwinds it,
because unwinding it is a project with no feature in it.

Design the steady state first, then design the migration overlay as an
explicitly temporary thing with a removal ticket attached:

```
# Steady state: hub-spoke, spokes cannot route to each other
# Migration overlay: spoke -> on-prem via hub, TAGGED FOR REMOVAL
#
# The overlay routes carry an expiry tag. A weekly job opens a ticket
# for every overlay route older than its expiry. Crude, but it is the
# only thing that has ever actually got them removed.
```

Address space: allocate assuming three times the workloads you are migrating.
You will re-use this account structure for things that were never in the data
centre, and renumbering later is a genuine outage.

## 5. Cost attribution works on day one, not day ninety

If the first invoice arrives and you cannot split it by workload, you have lost
the ability to have a cost conversation for the rest of the programme. Finance
will ask "why is cloud expensive" and the only available answer will be a
shrug.

Mandatory tags, enforced preventively (you cannot create the resource without
them): `workload`, `env`, `owner`, `cost-centre`. Enforced, not requested — a
tagging policy without enforcement produces a tag coverage of about 60%, which
is the same as zero for attribution purposes.

This matters more than it sounds. Almost every "cloud is more expensive than
we thought" conversation is really an attribution failure, which is why
[cloud cost is an architecture problem](https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem)
rather than a procurement one — you cannot fix a structure you cannot see.

## 6. Logging goes somewhere the workload account cannot delete

Audit logs in the account being audited is not an audit trail. Central logging
account, write-only from workload accounts, separate retention policy,
different access path.

The specific failure this prevents: an incident where you need to know what
happened, in an account where what happened included someone with broad
permissions.

## 7. There is a defined path to production, and it is the only one

Before the first wave, the deployment path exists and is used by the pilot
workload: source control → CI → artefact → environment promotion. No console
deploys to production. No exceptions for the migration.

The migration will generate enormous pressure to make exceptions, because
console-deploying one thing takes ten minutes and wiring it through the pipeline
takes two days. The two days are the point. Everything that goes in through the
console stays undocumented forever.

Short-lived credentials for the pipeline, federated via OIDC rather than stored
keys — I wrote up the mechanics of that separately, since it is the single
highest-value control you can add to a CI system.

## 8. Backup and restore are tested, in that order

Everyone configures backup. The checklist item is **restore**, performed once,
on the pilot workload, with the time recorded.

The recorded time is what you give the business when they ask about RTO. Not the
number from the provider documentation — your number, from your attempt, with
your data volume and your dependencies.

## 9. Observability exists before the thing you need to observe

Migrating a workload into an environment with no dashboards means your first
production incident is also your first attempt at instrumentation.

Baseline before wave one: infrastructure metrics, application logs with a
correlation ID that survives the service boundary, and one synthetic check per
workload that exercises a real user path. Not a health endpoint that returns
200 — a path that touches the database.

## 10. Somebody owns the landing zone as a product

Not a project. A product, with a backlog, a version, and a person whose job
includes it after the migration ends.

The alternative — landing zone as a project deliverable — produces an
environment that is correct on the day the project closes and drifts from that
day onward, with no mechanism to pull it back.

## 11. The first wave is deliberately boring

The pilot workload should be the one with the least business risk and the most
representative architecture. Those two usually conflict, and people resolve the
conflict by picking something trivially simple — a static site, an internal
tool with four users.

That teaches you nothing. A static site does not exercise identity, data
migration, cross-account networking or the restore path. Pick something dull but
*structurally complete*: a service with a database, an external dependency and a
scheduled job. Boring in business terms, complete in architectural terms.

---

## Running the checklist

We treat these as gates, not suggestions. The first wave does not start with
items outstanding, and the way that holds up under deadline pressure is that the
gate is reviewed by someone who is not responsible for the deadline.

Items 1-6 are the ones that are expensive to retrofit. 7-11 are expensive to
skip. If you only have time for six, take 1-6 and accept that you will be fixing
7-11 during the migration rather than before it.

Microsoft's
[Cloud Adoption Framework landing zone guidance](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)
covers the same ground in more depth and with Azure specifics; it is worth
reading even if you are on AWS, because the reasoning is portable and the
enforcement primitives map closely.

For how this fits into the wider sequence — assessment, wave planning,
the 7 Rs decision per application, and what to modernise during the move versus
after — Pixorama published
[the full step-by-step migration strategy](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud),
which is where this checklist sits as step two.

If you are running this with outside help rather than in-house, the thing to
test a partner on is whether they treat the landing zone as a product with an
owner or as a project deliverable. Their
[survey of DevOps consulting firms](https://pixoramagroup.com/blog/best-devops-consulting-companies-india)
is a reasonable place to start a shortlist, and that question separates the
candidates faster than anything on their websites.

The thing I would most want to convince you of: the landing zone is not
preparation for the migration. It is the migration's only durable output. The
workloads were going to end up in the cloud either way. Whether they end up
somewhere governable is decided entirely in the weeks before the first one
moves.
