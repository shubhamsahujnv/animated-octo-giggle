# Publishing checklist

Per-post, per-platform. Front matter in each file carries that post's links,
anchors and tags — strip the front matter before pasting; it is working
metadata, not content.

## Before you publish anything

- [ ] **Decide the bylines.** Publish under real named people from the team, not
      the company. The main site already credits a real author with a LinkedIn
      profile. One author across 30 posts on three brand-new accounts all
      linking to one domain is the most detectable pattern in this programme;
      2-3 genuine authors substantially reduces it.
- [ ] **Set up the Hashnode blog on a subdomain you control** (e.g.
      `engineering.pixoramagroup.com`) rather than `*.hashnode.dev`. Posts on
      the default subdomain do not inherit hashnode.com's authority. This is the
      only dofollow track, so this one setting decides most of the programme's
      SEO value.
- [ ] **Do not import any contact list to Substack.** Their guidelines prohibit
      importing purchased, scraped or harvested addresses and adding people
      without consent. Grow it honestly or not at all.
- [ ] Set up a UTM convention so referral traffic is attributable, e.g.
      `?utm_source=hashnode&utm_medium=referral&utm_campaign=offsite-h1`.
      **Add UTMs to Medium and Substack links only.** Leave the Hashnode links
      clean — that is the dofollow track and you do not want query strings
      fragmenting the target URL.

## Per post

- [ ] Strip the YAML front matter.
- [ ] Confirm the two or three pixoramagroup.com links are present with the
      **exact anchor text** from the front matter. The anchors are deliberately
      varied across the 30 to avoid an exact-match footprint; changing them
      ad hoc undoes that.
- [ ] Confirm the external authority link is present. A post that links only to
      one commercial domain is a footprint.
- [ ] Add the cross-link to the sibling post named in the front matter, once
      that sibling is live. Early posts will need this added retroactively —
      keep a note.
- [ ] **Do not set a canonical URL.** All 30 are original posts. A canonical
      pointing at pixoramagroup.com would tell Google to index a page whose
      content does not match, and would throw away the indexable off-site
      footprint. See `STRATEGY.md` §2.4.
- [ ] Platform-specific:
  - **Hashnode** — add tags from front matter; leave `originalArticleURL` empty;
    check code blocks render with the right language hint.
  - **Medium** — up to 5 tags; put the site link in your profile bio (not
    stacked in the post); do not add the post to a paid publication that
    changes the promotional framing.
  - **Substack** — read `substack/README-SUBSTACK-COMPLIANCE.md` first. No
    gated content, no "book a call", no offers. One CTA maximum per issue and it
    should be "reply and tell me I'm wrong", not a conversion ask.

## Cadence

Three posts a week, one per platform, over 10 weeks. The order in
`STRATEGY.md` §4 is deliberate: weeks 1-4 concentrate on the cloud-migration and
modernization clusters because those pages are closest to a ranking change.
Do not publish all 30 in a fortnight.

## Link verification (already done once — redo if you edit anchors)

All 24 unique pixoramagroup.com URLs and all 10 external authority URLs were
checked and returned HTTP 200 on 2026-10-26. Two external links were corrected
during that pass:

- H2: the AWS Prescriptive Guidance portfolio-assessment URL 404'd and was
  replaced with the current `application-portfolio-assessment-guide` path.
- H6: the Flexera link pointed at a generic press centre and now points at the
  State of the Cloud report itself.

Re-run before publishing if any time has passed:

```bash
cd offsite-content
for f in medium/*.md hashnode/*.md substack/S*.md; do
  awk 'BEGIN{fm=0} /^---$/{fm++; next} fm>=2' "$f" \
    | grep -oE 'https://[a-zA-Z0-9._/-]+'
done | sed 's/[.)]*$//' | sort -u | while read -r u; do
  printf "%s  %s\n" "$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 25 "$u")" "$u"
done
```

Note: `https://token.actions.githubusercontent.com` will report 404. That is
correct and expected — it is the OIDC issuer identifier inside a JSON/HCL
config value in H7, not a hyperlink.

## What to measure, and when

Full detail in `STRATEGY.md` §5. The short version:

- **Do not review before week 6.** Links need discovery and reassessment.
- **Primary KPI:** position of `/blog/cloud-migration-strategy-on-premise-to-cloud`
  on "on prem to cloud migration" (26.3 today) and "on premise to cloud
  migration" (32.6 today).
- **Second:** first impressions at all for `/blog/what-is-staff-augmentation`
  (zero today, SD 17, CPC up to $429).
- **Third:** referring domains, 37 today, target 55-65. Domains, not the 2,363
  backlinks.
- **Exclude `/blog/best-seo-agencies-australia` from the week-6 review.** It
  will still be at position 70+ and reviewing it early produces the wrong
  conclusion about the whole programme.
- Read the two GSC clusters separately. The site-wide average position is
  meaningless here — it moved from 5 to 58 in October purely because the SEO
  agency page started collecting page-6 impressions.
