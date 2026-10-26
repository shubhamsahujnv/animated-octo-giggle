---
platform: Substack
post_id: S9
week: 8
title: "Issue 9: Security that doesn't stop delivery"
subtitle: "Most zero-trust programmes never reach production. The one change I would make this quarter takes a day and nobody has to be persuaded."
target_keyword: zero-trust / supports cloud migration landing zone cluster
canonical: NONE — original
compliance_note: |
  Stands alone. Two main-site links as references.
outbound_links:
  - url: https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery
    anchor: "zero-trust without bringing delivery to a halt"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "built into the landing zone before the first workload lands"
    type: natural-language
cross_link: H7
---

# Issue 9: Security that doesn't stop delivery

I have watched three zero-trust programmes. Two produced documents. One produced
change.

The difference was not budget or executive support — the document-producing ones
had more of both. It was that the successful one started with changes where **the
secure version was also the more convenient version**, and therefore needed no
enforcement.

That is the whole thesis of this issue, and I want to make it concrete rather
than leave it as a slogan.

## Why security programmes stall

The standard shape: a maturity assessment, a target-state architecture, a
roadmap with workstreams, and a set of controls to be implemented across the
estate.

Every control in that roadmap makes someone's job harder. That is not a
criticism — it is the nature of a control. But it means every control has a
negotiation attached, and the negotiation is between a security team with
authority-on-paper and delivery teams with deadlines-in-practice.

Delivery wins those negotiations, mostly, and it wins them by attrition rather
than by argument. The control is agreed, scheduled, deprioritised, and raised
again next quarter. Two years later the maturity assessment is repeated and the
scores have barely moved.

The programmes that work invert the selection criterion. Instead of asking
*what is the highest-risk gap*, they ask **what is the highest-risk gap whose fix
makes life easier?** Those exist, there are more of them than people think, and
they build the credibility that the genuinely inconvenient controls later
require.

## The one I would do this quarter

Here is the specific example, and I think it is close to universal.

Somewhere in your CI system there is a static cloud access key. It has broad
permissions, because deploys need broad permissions. It does not expire. It is
usable by anyone who can trigger a workflow or read the secret store.

That key is plausibly the most valuable credential your organisation holds. It
outranks any individual engineer's access, because it is scoped to deploy —
which means it can modify production. And because it is long-lived, a single
exposure is a persistent compromise rather than a time-boxed one.

Every CI provider now supports OIDC federation, which removes it entirely. The
workflow presents a signed token describing itself — this repository, this
branch, this environment — your cloud account verifies it against the provider's
public keys, and if the claims match a policy you wrote, hands back credentials
that live fifteen minutes.

No key. Nothing to rotate. Nothing to inherit when someone leaves. Nothing to
leak.

**And it is less work than the thing it replaces.** No rotation schedule, no
secret to manage, no annual audit finding about key age, no "who has access to
this secret" question. The engineer whose life you were about to complicate
instead has one fewer thing to maintain.

That asymmetry is why this one actually ships. Nobody has to be persuaded,
because there is no trade-off to argue about.

## The two things to get right

I will keep this brief because the mechanics are well documented, but these two
mistakes are common enough to name.

**Scope the trust policy exactly.** The policy says which identities may assume
the role. The failure is loosening it until it works:

```
"sub": "repo:acme/payments:ref:refs/heads/main"   ← correct
"sub": "repo:acme/*"                               ← trusts every repo in the org
"sub": "*"                                         ← trusts every repo on GitHub
```

That third one is not hypothetical. It is what you get when someone debugs a
claims mismatch at 6pm by widening the condition until the error stops. Use exact
matching, not pattern matching, and review these policies specifically.

**Pull-request workflows get a read-only role.** The token for a pull-request
event does not identify the source branch, which means a PR from a fork can
satisfy a PR-scoped trust policy. Deploy roles are gated on the protected
environment, never on the PR event.

If you want the full mechanics — trust policy construction, permissions
boundaries, and migrating without a delivery freeze — my colleagues have the
argument and the implementation in
[zero-trust without bringing delivery to a halt](https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery).

## Migrating without a freeze

The reason this does not get done, despite being easy, is fear of breaking
deploys. It does not require a freeze:

1. Create the provider and roles **alongside** the existing keys. Nothing
   changes.
2. Switch one low-risk service. Keep its key in place as rollback.
3. **Watch the audit log for both principals** for a few days. This is the step
   people skip and regret — it is how you find the scheduled job in a workflow
   nobody remembered that still uses the key.
4. **Deactivate the key, do not delete it.** Deactivation is instantly
   reversible. Leave it deactivated for a sprint.
5. Repeat per service, then delete.
6. Add an organisation-level policy denying access-key creation, so the problem
   cannot return.

Step six is the one that makes it permanent. Without it, a key reappears within
a year, created in a hurry by someone solving a Friday problem — which is how
the original one got there.

## The general pattern

What makes the CI credential example work, generalised:

**The control removes a maintenance burden rather than adding one.** Short-lived
credentials remove rotation. A managed secret store removes the config file
nobody wants to own. Automated patching removes the quarterly scramble.

**The control is preventive rather than detective.** A policy that stops an
unencrypted bucket being created is better than an alert that one was created,
and it is also less work for everyone — no triage, no remediation ticket, no
exception register. Detective controls generate work indefinitely; preventive
ones generate work once.

**The control is enforced by infrastructure rather than by review.** Anything
that depends on someone remembering during code review will be missed under
deadline, and then the security team's role becomes catching omissions, which is
adversarial and does not scale.

If you order your roadmap by that pattern first, the inconvenient controls
afterwards land in a relationship where delivery teams have experienced security
work as something that helped them. That is worth more than any amount of
executive mandate.

## The best time to do this

Before the estate exists.

Everything above is a retrofit, and retrofits are where security programmes
spend their effort. If you are standing up a new cloud environment, the
organisation-level deny on access-key creation costs nothing on day one and
means you never accumulate the keys at all.

Same for encryption defaults, region allowlists, mandatory tags, and central
logging the workload account cannot delete. All trivial before the first
workload, all a programme afterwards.

This is the part that connects to issue two: the landing zone is not preparation
for a migration, it is the migration's only durable output. The workloads were
going to end up in the cloud anyway. Whether they end up somewhere governable is
decided in the weeks before the first one moves, and that is why these controls
belong
[built into the landing zone before the first workload lands](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
rather than added later.

I realise "do it at the start" is useless advice if you are not at the start.
So, for the much more common case: pick the one control whose fix removes work,
ship it, and use the credibility.

Next issue, the last one: how to run a vendor shortlist, which is the thing I
get asked about most and have the least systematic view of.

---

*I am an engineer at [Pixorama](https://pixoramagroup.com/). Three programmes,
anonymised. I am not a security specialist; this is the view from delivery, which
is a partial view and I would be glad to be corrected by someone whose job it
actually is.*
