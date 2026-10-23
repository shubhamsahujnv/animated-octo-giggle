# Homepage stat fixes

**Why:** the strategy forbids publishing numbers a client cannot trace. Three groups of figures on
pixoramagroup.com currently break that rule. This is a precise change list, derived from the live
server-rendered HTML (23 Oct 2026): **not** from the site's source, which this session does not have.

---

## 1. Remove the two unsubstantiated trust figures: requested

They sit in a `trustbar` section near the top of the homepage, as **literal hardcoded text**, not
counters. The section holds exactly **three** `trustitem` blocks:

| # | Value | Label | Action |
|---|---|---|---|
| 1 | `99.98% uptime` | SLA-backed reliability | **Remove**: no stated measurement basis or SLA document |
| 2 | `4.9 / 5` | Average client rating | **Remove**: aggregate rating, no source, one testimonial displayed |
| 3 | `100% ownership` | Code & IP handed to you | **Keep**: a policy commitment, not a measured claim, and it is backed by the FAQ |

### Find it

```bash
grep -rn "99.98\|SLA-backed reliability" --include=*.tsx --include=*.ts --include=*.jsx --include=*.js src app components
grep -rn "Average client rating" --include=*.tsx --include=*.ts --include=*.jsx --include=*.js src app components
```

The rendered markup to match is:

```html
<section class="trustbar" aria-label="Credentials">
  <div class="wrap wrap-wide">
    <div class="reveal trustbar__in">
      <div class="trustitem">
        <span class="trustitem__ico">…</span>
        <span>99.98% uptime</span><span>SLA-backed reliability</span>   <!-- remove this trustitem -->
      </div>
      <div class="trustitem">… 4.9 / 5 … Average client rating …</div>   <!-- remove this trustitem -->
      <div class="trustitem">… 100% ownership … Code &amp; IP handed to you …</div>  <!-- keep -->
    </div>
  </div>
</section>
```

Most likely this is an array of three objects mapped to `trustitem`. Delete the two entries rather
than hiding them with CSS, a hidden claim is still in the HTML, still crawled, and still quoted by
an AI assistant.

### After removing

One item left in a three-up row will look wrong. Options, in order of preference:

1. **Replace both with claims you can substantiate.** Good candidates already on the site, all
   policy or method rather than measurement: *"Senior-led from day one"*, *"Production increment in
   the first fortnight"*, *"Founded 2022"*.
2. **Keep one item** and let the row centre.
3. **Remove the whole `trustbar`** and rely on the FAQ, which makes the same commitments in prose
   and is already answer-ready.

**Do not** re-add the rating anywhere as `Review` or `AggregateRating` schema. Unverifiable review
markup risks a Google structured-data penalty. If the 4.9 figure comes from a real review platform,
link the profile and it can be marked up properly, which is also Step 5b.1 of the plan.

---

## 2. Correction to an earlier finding, and a larger issue

I previously reported that the "Continents of active delivery" counter *"renders as a literal 0"*
and listed it as a single display bug. That was too narrow, and partly wrong about the cause.

**What the server-rendered HTML actually contains: eight stats, all at zero**, across two blocks.

`pstat` block:

| Value in HTML | Label |
|---|---|
| `0+` | Enterprise clients served since 2022 |
| `0+` | Engineers, architects & strategists |
| `0` | Continents of active delivery |
| `0%` | Code & IP ownership transferred |

`istat` block:

| Value in HTML | Label |
|---|---|
| `0+` | Enterprise clients served since 2022 |
| `0.00%` | Average SLA-backed uptime |
| `0×` | Median uplift in deployment frequency |
| `−0%` | Typical cloud run-cost reduction |

There are no `data-target`, `data-to` or count-up attributes in the HTML, and the target values were
not in the twelve JS chunks fetched from the homepage. So the most likely explanation is a
scroll-triggered counter animated client-side from a value this session could not locate: meaning a
human in a browser may well see correct numbers, and my "renders a literal 0" was wrong as a
statement about what visitors see.

**It is still a real problem, for a different reason.** Google's crawler and the AI assistant
crawlers your `robots.txt` deliberately welcomes fetch the server HTML. They see:

> 0+ Enterprise clients served since 2022 · 0.00% Average SLA-backed uptime · 0× Median uplift in
> deployment frequency

That is the opposite of the credibility the section is for, on a site whose whole AEO play depends
on being quotable. **Check it in a browser first** to confirm whether the counters populate, then:

- **If they do populate:** server-render the real values as the initial state and animate from
  there, so crawlers get the number rather than zero.
- **If they do not:** these are eight broken stats, which is more urgent than the two above.

Either way, two of these labels are measured claims: *"Average SLA-backed uptime"* and *"Typical cloud run-cost
reduction"*, are measured claims and need a traceable source, exactly like the 99.98% figure.
*"Median uplift in deployment frequency"* likewise. Removing the trustbar pair while leaving these
in place only half-solves the problem.

---

## 3. Checklist

- [ ] Remove the `99.98% uptime` trustitem
- [ ] Remove the `4.9 / 5` trustitem
- [ ] Keep `100% ownership`; decide what fills the row (§1)
- [ ] Confirm no `AggregateRating` / `Review` schema references the 4.9 figure
- [ ] Check in a browser whether the eight `pstat` / `istat` counters populate
- [ ] Server-render their real initial values, or remove them
- [ ] Source or remove: "Average SLA-backed uptime", "Median uplift in deployment frequency",
      "Typical cloud run-cost reduction"
