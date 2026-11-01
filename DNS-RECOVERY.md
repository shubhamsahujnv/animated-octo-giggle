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
