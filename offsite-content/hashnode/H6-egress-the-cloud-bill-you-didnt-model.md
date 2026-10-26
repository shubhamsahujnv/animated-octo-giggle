---
platform: Hashnode
post_id: H6
week: 3
title: "Egress is the cloud bill you didn't model"
slug: egress-cloud-bill-data-gravity-cost-tags
subtitle: "Compute is easy to forecast. The line item that wrecks the business case is data movement, and it is an architecture decision."
tags: [cloud, aws, azure, finops, architecture, devops]
target_keyword: "cloud cost" cluster / supports "on premise to cloud migration"
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem
    anchor: "Pixorama wrote this up as an architecture problem wearing a finance costume"
    type: branded
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "migration strategy guide"
    type: partial-match
external_links:
  - Flexera State of the Cloud
cross_link: S3
---

# Egress is the cloud bill you didn't model

Every migration business case I have reviewed models compute accurately. Most
model storage adequately. Almost none model data movement, and data movement is
the line item that turns a 20% saving into a 15% increase.

The reason is structural. Compute cost is a function of things you chose
deliberately — instance sizes, counts, hours. Egress cost is a function of
something nobody chose: where the data happens to be relative to where the
compute happens to be, which in a migration is decided by wave sequencing rather
than by design.

Here is how to find it before the invoice does.

## Why it is invisible in planning

Pre-migration, all your traffic is on your own network. A service reading 200GB
a day from a database two racks away costs nothing marginal — the switch is a
capital asset, already paid for.

Post-migration, if that service is in the cloud and the database is still on
prem, the same 200GB a day is cross-boundary. At roughly $0.09/GB that is
$540/month for one dependency, and the uncomfortable part is that it is
*recurring for as long as the hybrid period lasts*, which is always longer than
planned.

Multiply across a mid-size estate during a 14-month migration and this is
routinely a six-figure line nobody budgeted.

Three distinct charges people conflate:

| Flow | Typical cost | Notes |
|---|---|---|
| Internet egress | ~$0.05-0.12/GB | Tiered, falls with volume |
| Cross-region | ~$0.02/GB | Both directions in some services |
| Cross-AZ | ~$0.01/GB each way | **Both** directions — easy to double-count |
| Ingress | $0 | Which is why it feels free to move data in |
| NAT gateway processing | ~$0.045/GB | *On top of* egress, and often larger |

That last row is the one that surprises people. If your private-subnet workloads
reach the internet through a managed NAT gateway, you pay a processing fee per
gigabyte *plus* the egress. For high-volume flows the NAT fee can exceed the
egress fee. A VPC endpoint for the same service costs a fraction.

Cross-AZ is the quiet one. A three-AZ Kafka cluster with replication factor 3
pays cross-AZ on every replica write, in both directions, forever. That is an
architectural choice with a direct monthly number attached, and it is almost
never costed at design time.

## Finding it in your own traffic, before you migrate

You do not need a tool. You need flow logs and a dependency inventory, and you
need to join them.

```sql
-- Flow records, aggregated per application pair per day.
-- The question: for each candidate migration wave, how much traffic
-- crosses the boundary that the wave is about to create?
WITH flows AS (
  SELECT
    src.app_id              AS src_app,
    dst.app_id              AS dst_app,
    SUM(f.bytes) / 1e9      AS gb_per_day
  FROM flow_logs f
  JOIN asset_map src ON f.src_addr = src.ip
  JOIN asset_map dst ON f.dst_addr = dst.ip
  WHERE f.day >= CURRENT_DATE - 30
  GROUP BY 1, 2
)
SELECT
  f.src_app,
  f.dst_app,
  ROUND(f.gb_per_day, 1)                       AS gb_per_day,
  w_src.wave                                   AS src_wave,
  w_dst.wave                                   AS dst_wave,
  -- Months of hybrid exposure for this edge
  GREATEST(w_src.wave, w_dst.wave) - LEAST(w_src.wave, w_dst.wave) AS waves_apart,
  ROUND(f.gb_per_day * 30 * 0.09, 0)           AS usd_per_month_if_split
FROM flows f
JOIN wave_plan w_src ON f.src_app = w_src.app_id
JOIN wave_plan w_dst ON f.dst_app = w_dst.app_id
WHERE w_src.wave <> w_dst.wave
  AND f.gb_per_day > 1
ORDER BY usd_per_month_if_split DESC;
```

The top twenty rows of that query are your egress forecast. They are also, more
usefully, a **resequencing instruction**: an edge carrying 80GB/day whose
endpoints are six waves apart is telling you to move those two applications
together.

This is the single highest-return query in migration planning and it takes an
afternoon. I have never run it on a real estate without finding at least one
pair that should obviously have been in the same wave.

## Data gravity is a design constraint, not a metaphor

"Data gravity" sounds like consultant-speak. It describes something concrete:
the larger a dataset, the more expensive it is to compute anywhere other than
where it lives, so compute migrates toward data rather than the reverse.

Practically, this means the sequencing rule is: **move the data first, or move
the data last, but never move the compute separately from the data it reads
heavily.**

The two workable patterns:

**Data first.** Replicate the datastore to the cloud, run it as a read replica
during transition, cut over writes when the dependent applications have moved.
Costs you an ingress period (free) and dual-running storage (cheap). Avoids
sustained egress entirely. This is almost always correct.

**Data last.** Keep the datastore on prem, move only applications whose read
volume is genuinely low. Requires the query above to prove "low" rather than
assume it.

The pattern that does not work, and is the default if you do not decide: move
applications in wave order and let the data follow whenever it is convenient.
That maximises the number of wave-months where a chatty edge spans the boundary.

## Instrument so attribution is possible

If you cannot attribute egress to a workload, you cannot have a conversation
about it — the bill arrives as one number and the discussion becomes "cloud is
expensive."

Minimum instrumentation, in place before wave one:

```hcl
# Every resource carries workload identity. Enforced by policy so the
# resource cannot be created without it — a tagging *request* gets you
# about 60% coverage, which is useless for attribution.
locals {
  required_tags = {
    workload    = var.workload
    env         = var.environment
    owner       = var.owner_email
    cost_centre = var.cost_centre
    data_class  = var.data_classification
  }
}

# VPC flow logs to the central logging account, with the fields you
# actually need for cost work.
resource "aws_flow_log" "workload" {
  log_destination      = var.central_flow_log_arn
  log_destination_type = "s3"
  traffic_type         = "ALL"
  vpc_id               = aws_vpc.workload.id

  # pkt-srcaddr/pkt-dstaddr matter: without them, traffic through an
  # intermediary is attributed to the intermediary, not the real endpoints.
  log_format = join(" ", [
    "$${version}", "$${account-id}", "$${vpc-id}", "$${subnet-id}",
    "$${srcaddr}", "$${dstaddr}", "$${srcport}", "$${dstport}",
    "$${protocol}", "$${bytes}", "$${packets}",
    "$${pkt-srcaddr}", "$${pkt-dstaddr}", "$${flow-direction}",
    "$${traffic-path}", "$${start}", "$${end}", "$${action}",
  ])
}
```

`pkt-srcaddr` and `pkt-dstaddr` versus `srcaddr`/`dstaddr` is the detail worth
knowing: with a NAT gateway or a transit gateway in the path, the plain fields
show the intermediary. You will attribute 40% of your egress to "the NAT
gateway", which is true and useless.

## The three fixes, in order of return

**1. VPC endpoints for provider services.** If workloads reach object storage,
queues, or secret stores over the internet via NAT, you are paying NAT
processing plus egress for traffic that never needed to leave the provider
network. Gateway endpoints for object storage are typically free. This is the
single cheapest fix available and it is frequently worth 20-30% of a NAT bill.

**2. Collapse chatty edges into one AZ or one service.** A cross-AZ call pattern
in a request path is paying twice per hop for availability you may not need at
that tier. Multi-AZ for the datastore, single-AZ for the stateless tier behind an
AZ-aware load balancer, is a legitimate design that many teams reject reflexively.

**3. Cache at the boundary, not at the service.** A read-through cache in the
cloud in front of an on-prem datastore converts sustained egress into a bounded
miss rate. During a hybrid period this is often the highest-leverage code change
available — one team I worked with cut a $4,100/month cross-boundary bill to
about $300 with a cache and a 15-minute TTL, because the data was reference data
that changed daily.

And one anti-fix: do not solve this with a reserved-capacity or committed-spend
discount. Commitments reduce the unit price of a structure you have not changed.
The structure is the problem — which is the whole argument in
[Pixorama wrote this up as an architecture problem wearing a finance costume](https://pixoramagroup.com/blog/cloud-cost-is-an-architecture-problem),
and it matches what I have seen every time: cost programmes that only touch
pricing get one good quarter and then revert.

## What to do on Monday

Run the flow-log join. Produce the top twenty cross-boundary edges with a dollar
figure. Take that list to whoever owns the wave plan and resequence around the
top five.

Then add egress as an explicit line in the business case, derived from that
query and the planned hybrid duration, rather than omitted. A business case that
shows a smaller saving and survives contact with the invoice is worth more than
one that shows a larger saving and does not.

Flexera's annual
[State of the Cloud report](https://info.flexera.com/CM-REPORT-State-of-the-Cloud)
survey has put managing cloud spend at or near the top of respondents' concerns
for years running, alongside consistently large self-reported waste. The waste is
not mostly idle instances. It is structural, and data movement is the largest
structural component nobody models.

For where this fits in sequencing — and why the assessment phase should include
the flow-log work rather than treating it as optimisation to do later —
Pixorama's
[migration strategy guide](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
puts it in step one, which is the right place for it. And if you are shortlisting
partners, their notes on
[reading cloud migration firms' partner tiers](https://pixoramagroup.com/blog/best-cloud-migration-companies-india)
are a useful corrective: a top-tier badge measures committed spend through that
provider, which is close to the opposite of an incentive to reduce your bill.
