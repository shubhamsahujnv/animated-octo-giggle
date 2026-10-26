---
platform: Hashnode
post_id: H7
week: 8
title: "Zero-trust in CI: killing long-lived cloud credentials with OIDC"
slug: zero-trust-ci-oidc-short-lived-credentials
subtitle: "The highest-value security change available to most teams is deleting the access keys in your CI secrets. Here is the whole migration."
tags: [devops, security, aws, githubactions, cicd, terraform]
target_keyword: supports "zero trust" + "on premise to cloud migration" landing zone cluster
canonical: NONE — original post
outbound_links:
  - url: https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery
    anchor: "zero-trust without bringing delivery to a halt"
    type: exact-adjacent
  - url: https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud
    anchor: "landing zone guardrails"
    type: descriptive
external_links:
  - GitHub Docs — security hardening with OpenID Connect
cross_link: S9
---

# Zero-trust in CI: killing long-lived cloud credentials with OIDC

Most "zero-trust programme" slide decks never reach production. Meanwhile the
single change with the best ratio of risk reduction to effort sits untouched in
every CI system: a static cloud access key, in a secret store, with broad
permissions and no expiry, usable by anyone who can trigger a workflow.

That key is the most valuable credential in most organisations. It outranks
individual engineer access because it is scoped to deploy, which means it can
modify production. And it is long-lived, so a single leak — a logged environment
variable, a compromised dependency, a fork PR with a misconfigured trigger — is
a persistent compromise rather than a time-boxed one.

OIDC federation removes it entirely. No key anywhere, credentials that live
fifteen minutes, and a trust policy that can be scoped to one repository on one
branch. This is a day's work and it is worth more than a quarter of policy
documents.

## What is actually happening

The CI provider becomes an identity provider. Instead of presenting a secret,
your workflow presents a signed JWT describing itself — this repo, this branch,
this workflow, this event type. Your cloud account verifies the signature
against the provider's public keys and, if the claims match a trust policy you
wrote, hands back temporary credentials.

```
[workflow] --(1) request JWT--> [CI provider OIDC endpoint]
[workflow] <-(2) signed JWT----
[workflow] --(3) AssumeRoleWithWebIdentity + JWT--> [STS]
                                                      |
                                      (4) verify sig against provider JWKS
                                      (5) match claims against trust policy
[workflow] <-(6) 15-minute credentials ---------------
```

Nothing is stored. There is no secret to leak, rotate, or inherit when someone
leaves.

## The trust policy is the whole security control

This is where the mistakes happen, so it is worth being slow here.

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com"
    },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub":
          "repo:acme/payments-service:ref:refs/heads/main"
      }
    }
  }]
}
```

Three things about that `sub` claim:

**It is `StringEquals`, not `StringLike`.** The common catastrophic
misconfiguration is:

```json
"StringLike": { "...:sub": "repo:acme/*" }
```

which trusts every repository in the org, including the one a contractor has
write access to. Worse, I have seen:

```json
"StringLike": { "...:sub": "*" }
```

which trusts **every GitHub repository on the internet** to assume your
production deploy role. That is not a hypothetical; it has been found in real
accounts, because it is what you get when someone debugs a claims mismatch by
loosening the condition until it works.

**It pins the branch.** `ref:refs/heads/main` means a workflow on a feature
branch cannot assume this role. If you need deploys from tags, add a second
condition value for `ref:refs/tags/*` — explicitly, with `StringLike` scoped to
the tag namespace only.

**Pull requests need separate treatment.** The `pull_request` event produces
`sub` of `repo:acme/payments-service:pull_request`, which notably does **not**
identify the source branch. A PR from a fork can therefore satisfy a
`pull_request`-scoped trust policy. So: PR workflows get a read-only role, never
the deploy role. Non-negotiable.

Pin the environment instead when you want approval gates:

```json
"token.actions.githubusercontent.com:sub":
  "repo:acme/payments-service:environment:production"
```

Combined with a protected environment that requires a reviewer, this means the
credential cannot be minted at all until a human approves — the control is in
identity, not in a pipeline step someone can reorder.

## The Terraform

```hcl
# One provider per CI system, per account.
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  # GitHub rotates these; AWS now validates against the library of
  # trusted CAs for this provider, but keeping it current is harmless.
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

data "aws_iam_policy_document" "deploy_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # Deliberately StringEquals with an explicit list.
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_org}/${var.repo}:environment:production",
      ]
    }
  }
}

resource "aws_iam_role" "deploy" {
  name                 = "ci-deploy-${var.repo}"
  assume_role_policy   = data.aws_iam_policy_document.deploy_trust.json
  max_session_duration = 900          # 15 minutes. Deploys are not long.
  permissions_boundary = aws_iam_policy.ci_boundary.arn
}
```

Two details I would insist on:

**`max_session_duration = 900`.** The default is an hour. A deploy takes
minutes. Shortening the window costs nothing and bounds the damage from a
credential captured mid-run.

**A permissions boundary.** The deploy role's own policy says what it can do;
the boundary says what it can *never* do, regardless of future policy edits.
This is how you stop a well-meaning change from granting the CI role
`iam:*`:

```hcl
resource "aws_iam_policy" "ci_boundary" {
  name   = "ci-permissions-boundary"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      { Effect = "Allow", Action = "*", Resource = "*" },
      {
        Effect = "Deny"
        Action = [
          "iam:CreateUser", "iam:CreateAccessKey",
          "iam:AttachUserPolicy", "iam:PutUserPolicy",
          "organizations:*", "account:*",
          "cloudtrail:StopLogging", "cloudtrail:DeleteTrail",
        ]
        Resource = "*"
      },
    ]
  })
}
```

`iam:CreateAccessKey` in that deny list is the important one. It is the
privilege-escalation path that converts a 15-minute federated credential back
into a permanent key — exactly the thing you just removed.

## The workflow

```yaml
name: deploy
on:
  push:
    branches: [main]

permissions:
  id-token: write      # required to request the JWT
  contents: read       # and nothing else

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production     # gates credential minting on approval
    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/ci-deploy-payments-service
          aws-region: ap-southeast-2
          role-duration-seconds: 900

      - run: ./deploy.sh
```

`permissions:` declared explicitly at the top is worth calling out. Without it
you inherit the repository default, which is frequently write-all. The
`id-token: write` permission is what allows the JWT request; everything else
should be the minimum the job needs.

## Migrating without a delivery freeze

The reason this does not get done is fear of breaking deploys. It does not have
to:

1. **Create the OIDC provider and roles alongside the existing keys.** Nothing
   changes yet.
2. **Switch one low-risk service's workflow** to the role. Keep its key in place
   as a rollback.
3. **Watch CloudTrail for both principals.** You want to see the role being used
   and the key going quiet.
4. **Deactivate the key — do not delete it.** Deactivation is instantly
   reversible; deletion is not. Leave it deactivated for a sprint.
5. **Repeat per service**, then delete the deactivated keys.
6. **Add the preventive control** so the problem cannot return:

```json
{
  "Effect": "Deny",
  "Action": "iam:CreateAccessKey",
  "Resource": "*",
  "Condition": {
    "StringNotEquals": { "aws:PrincipalArn": "arn:aws:iam::*:role/break-glass-admin" }
  }
}
```

Applied at the organisation level, that makes "add a CI access key" something
nobody can quietly do at 6pm under deadline. Which is the actual mechanism by
which these keys appear.

Step 3 is the one people skip and then regret. Watching both principals for a
few days is how you catch the scheduled job, in a workflow nobody remembered,
that still uses the key.

## Where this sits in a security programme

The argument I would make to anyone running a zero-trust initiative: this is the
work. Not the strategy document. An identity-based, short-lived,
narrowly-scoped, auditable credential replacing a permanent shared secret in the
highest-privilege system you own — in a day, with no delivery freeze.

That framing matters because security programmes typically fail by stopping
delivery, which is the argument in Pixorama's
[zero-trust without bringing delivery to a halt](https://pixoramagroup.com/blog/zero-trust-without-stopping-delivery).
OIDC federation is the clearest example of the pattern: the secure version is
also the more convenient one, so it does not need enforcement.

If you are standing up a new cloud estate, make this part of the
[landing zone guardrails](https://pixoramagroup.com/blog/cloud-migration-strategy-on-premise-to-cloud)
from day one rather than retrofitting. Setting the `iam:CreateAccessKey` deny
before the first workload lands means you never accumulate the keys in the first
place.

GitHub's
[security hardening guide for OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
documents the full claim set, including `job_workflow_ref`, which is worth using
if you want to pin trust to a specific reusable workflow rather than a branch.

GitLab, Bitbucket, CircleCI and Buildkite all support the same flow. The claim
names differ; the trust-policy reasoning is identical, as is the
`StringEquals`-not-`StringLike` rule.

If this is work you would outsource, it is a good interview question in both
directions — ask a prospective
[DevOps consulting firm](https://pixoramagroup.com/blog/best-devops-consulting-companies-india)
how they handle CI credentials today. A firm still shipping static access keys
into client pipelines in 2026 has told you where their practice sits.
