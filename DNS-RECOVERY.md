# thegreensolve.com — DNS recovery (do this in hPanel)

## What happened

On 2026-11-01 at 11:36 UTC a website rename in hPanel removed the DNS zone for
`thegreensolve.com`. Two snapshots record it:

* `193234675` — "Hosting addon or parked domain removed"
* `193234672` — "Hosting CDN disabled"

The zone is gone, so the domain does not resolve at all. The site itself is fine:
the files are on the server and still serve correctly at
<https://thegreensolve-com-795003.hostingersite.com/> (verified, HTTP 200,
title "Baseline | TGS Carbon Intelligence").

## Why the API cannot fix it

Three facts, all verified:

1. `thegreensolve.com` is registered at **GoDaddy**, not Hostinger
   (RDAP: registrar GoDaddy.com LLC, expires 2027-08-16). The Hostinger domain
   portfolio holds only `nupossibe30-60f.com`. The Hostinger **DNS API only
   manages zones for domains in the portfolio**, which is why every write returns
   `[DNS:4009] Domain not found`.
2. `dns_records_reset` returns `[DNS:1000] Domain not pointing to Hostinger`.
   That check does a live NS lookup — and since the zone is deleted, nothing
   resolves, so the check fails. Chicken and egg: the API will not recreate the
   zone because the zone does not exist.
3. The nameserver delegation itself is still correct. GoDaddy points the domain
   at `NS1.DNS-PARKING.COM` / `NS2.DNS-PARKING.COM` (Hostinger). Both of those
   servers answer NODATA for the apex — confirming the zone, not the delegation,
   is what is missing.

hPanel's DNS editor goes through a different internal path and is not subject to
that gate, which is why that screen works while the API does not.

## Fix: hPanel -> Domains -> thegreensolve.com -> DNS / Nameservers

**Step 1 — press "Reset DNS records".** The zone is empty, so there is nothing to
lose, and Hostinger fills in the correct `A` records for this hosting account
automatically (this is better than typing an IP by hand).

**Step 2 — add the three Google records back.** They were in the zone before and
reset does not restore them. **Add the MX record first; it is what carries email.**

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| MX   | `@`  | `smtp.google.com.` | 1 | 3600 |
| TXT  | `@`  | `v=spf1 include:_spf.google.com ~all` | — | 14400 |
| TXT  | `@`  | `google-site-verification=KKlkLGyRmh6n4_Ptr5kw9EejULSjcO3xnZzZFH8vrCo` | — | 14400 |

The "Quick setup -> Google Workspace (Gmail)" shortcut on that screen adds the MX
record for you; the two TXT records still need adding by hand.

**Step 3 — confirm `www` exists.** After the reset there should be an `A` or
`CNAME` for `www` alongside the apex. If not, add `www` pointing to the same
target as `@`.

**Step 4 — SSL.** The certificate currently reads `waiting_for_retry` with
"Domain challenge failed", which is expected while DNS is broken. Once the
domain resolves, hPanel -> Security -> SSL -> install, then turn the HTTPS
redirect on.

## Alternative: manage DNS at GoDaddy instead

Because the domain is registered at GoDaddy, you can skip Hostinger DNS
altogether: at GoDaddy, switch from Hostinger's nameservers to GoDaddy's own DNS
and set an `A` record for `@` and `www` to the hosting IP shown in
hPanel -> Websites -> thegreensolve.com -> Dashboard, plus the three Google
records above. This avoids Hostinger's "domain not pointing to Hostinger" gate
entirely, but it moves DNS management away from hPanel, so only do it if step 1
does not work.

## Note on email

The Google Workspace MX record only resolves from resolver cache right now. Once
those caches expire, inbound mail to @thegreensolve.com will start bouncing.
Step 2 is the urgent part.

---

# Update — 2026-11-02: every API route tested and closed

I re-tested this exhaustively. Five different write paths, all refused:

| Call | Result |
|------|--------|
| `dns_records_update` (add MX) | `404 [DNS:4009] Domain not found` |
| `dns_records_reset` | `500 [DNS:1000] Domain not pointing to Hostinger` |
| `dns_snapshots_restore` (snapshot 193234306, from 11:34, two minutes before the zone was deleted) | `500 [DNS:1000] Domain not pointing to Hostinger` |
| `hosting_domains_create-website-parked` | `422 [Hosting:9999] Domain is already hosted` |
| `hosting_websites_update-settings` `cdn: true` | **applied** — but the zone is still empty |

## The deadlock, confirmed

* The registry delegation is **correct**: GoDaddy points the domain at
  `NS1`/`NS2.DNS-PARKING.COM` (Hostinger's nameservers).
* Those nameservers return **NXDOMAIN** for the apex (verified via Google and
  Cloudflare DoH — Google's answer even names the responder, `162.159.24.201`,
  which is `ns1.dns-parking.com`). So the delegation is fine and the *zone
  behind it* is missing.
* Hostinger's DNS gate decides "pointing to Hostinger" by resolving the domain.
  It gets NXDOMAIN, concludes the domain is not pointed at Hostinger, and
  refuses to create the zone. The zone cannot be created because the zone does
  not exist.

`hosting_domains_create-website-parked` returning "Domain is already hosted"
proves the *hosting* link is intact. Only the DNS zone was dropped.

## What I changed

Re-enabled the CDN, which the 11:36 event had switched off. The CDN hostnames
now resolve again:

* `thegreensolve.com.cdn.hstgr.net` -> `145.223.124.97`, `88.223.87.248`
* `www.thegreensolve.com.cdn.hstgr.net` -> `88.223.87.43`, `147.79.72.233`

## Lovable is not the blocker

The Lovable project (`Project Navigator`, `7cd52853-...`) is still published,
but the nameservers point at Hostinger, not Lovable, so Lovable is not serving
DNS for this domain. Detaching it there is good hygiene and will not restore the
zone. The Lovable API exposed to me has no domain-management operation, so that
one has to be done in the Lovable UI: Project -> Settings -> Domains -> remove
`thegreensolve.com`.

## Route B — move DNS to GoDaddy (breaks the deadlock permanently)

Hostinger's gate only exists because Hostinger is the DNS host. Since the domain
is registered at GoDaddy, moving DNS there sidesteps it entirely.

1. GoDaddy -> thegreensolve.com -> Nameservers -> switch to **GoDaddy's default
   nameservers** (this is the "disconnect" step).
2. GoDaddy -> DNS -> add:

| Type | Name | Value | Priority | TTL |
|------|------|-------|----------|-----|
| A | `@` | `145.223.124.97` | — | 600 |
| A | `@` | `88.223.87.248` | — | 600 |
| CNAME | `www` | `www.thegreensolve.com.cdn.hstgr.net.` | — | 600 |
| MX | `@` | `smtp.google.com.` | 1 | 3600 |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` | — | 3600 |
| TXT | `@` | `google-site-verification=KKlkLGyRmh6n4_Ptr5kw9EejULSjcO3xnZzZFH8vrCo` | — | 3600 |

Caveat on the two apex `A` records: those are Hostinger CDN edge addresses, and
edge addresses can change over time. They are correct today. If you would rather
pin a stable origin instead, turn the CDN off in hPanel and use the single
server IP shown on hPanel -> Websites -> thegreensolve.com -> Dashboard.

Once the domain resolves, install SSL in hPanel (it currently reads
`waiting_for_retry`, "Domain challenge failed", which is expected while DNS is
down) and then enable the HTTPS redirect.
