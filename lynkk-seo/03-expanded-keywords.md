# Lynkk — Expanded Keyword Research + lynkk.ai Audit

**Date:** 2026-10-21
**Data source:** Ubersuggest MCP connector, account `marketing@lynkk.ai`
**Scope:** second research pass — wider keyword sweep plus what Ubersuggest knows about `lynkk.ai`
**Reads with:** `01-keyword-research.md` (first pass), `02-rewritten-listing.md` (copy)

---

## 1. What Ubersuggest knows about lynkk.ai

| Metric | Value |
|---|---|
| Domain Authority | **1** |
| Organic keywords | **1** |
| Organic traffic | **0** / mo |
| Backlinks | 4 (0 follow, 4 nofollow) |
| Referring domains | 3 |
| Top pages report | empty |

The site ranks for exactly one keyword:

| Keyword | Position | Vol | SD | CPC | URL |
|---|---|---|---|---|---|
| zoom meeting bot | **39** | 20 | 26 | $21.00 | `lynkk.ai/features/meeting-bot` |

Two things follow from this.

### 1a. The store listing cannot borrow authority from the site

My first-pass advice said "align lynkk.ai with the same keyword set so the listing inherits
authority." With DA 1, 4 nofollow backlinks and zero traffic, **there is no authority to
inherit.** Alignment is still right, but treat the site as a greenfield build, not a booster.
All four backlinks being nofollow means nothing is passing link equity at all.

### 1b. ⚠️ A positioning contradiction to resolve before publishing

The one page Google has indexed is **`/features/meeting-bot`**, ranking for **`zoom meeting
bot`** — while the Chrome extension's entire differentiation is *"no bot joins your meeting."*

Those two claims cannot both front the same brand. Decide which Lynkk is:

- **If Lynkk has both** a server-side bot recorder and the bot-free extension, keep them on
  separate pages with explicit labels, and make sure the extension listing never implies the
  product has no bot *anywhere* — a reviewer who finds `/features/meeting-bot` will read the
  listing as misleading, which is a removal risk under the store's deceptive-claims policy.
- **If the bot is legacy**, the page should be retired or rewritten before you push "no bot" as
  the hook, because it is currently the only thing Google knows about you.

The bot cluster is tiny either way — `meeting bot` 70/mo, `zoom meeting bot` 20/mo,
`ai meeting bot` 10/mo, `google meet notetaker bot` 0 — so there is little traffic to lose by
retiring it. **[VERIFY]** which of these two cases is true; the answer changes the listing.

---

## 2. New keywords worth adding — store listing

These are additions to the §3 set in the first-pass doc, all US (2840).

### 2a. The best new find: the "recorder" cluster

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| **zoom meeting recorder** | **2,900** | **17** | $12.35 |
| meeting recorder | 1,900 | 32 | $15.25 |
| meeting recorder chrome extension | 10 | **5** | — |

`zoom meeting recorder` at **2,900/mo and SD 17** is the single best volume-to-difficulty term
found across both research passes — roughly the volume of `ai meeting note taker` at **less than
half the difficulty**. Lynkk records browser Zoom, so the term is honest.

This is strong enough to change the Name recommendation. See §5.

### 2b. The "assistant" cluster — large, and trending hard

| Keyword | Vol | SD | CPC | Note |
|---|---|---|---|---|
| ai powered meeting assistant | **40,500** | 50 | $2.49 | ⚠️ see caveat |
| ai meeting assistant | 4,400 | 60 | $18.91 | |
| meeting assistant | 4,400 | 59 | — | |
| meeting assistant ai | 3,600 | 66 | $12.86 | |

**Caveat on the 40,500 figure:** its 13-month history runs 5,400 → 9,900 → 18,100 → **90,500**
→ 74,000 → 40,500. A 17× swing means either a genuine trend break or noisy modelling. The
direction is clearly up, but don't plan around the absolute number — re-pull it in 30 days
before committing budget. SD 60–66 on the stable variants makes this cluster a **12-month
content target, not a store-field target**.

### 2c. Exact store-intent terms — low volume, very high intent

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| ai note taker chrome extension | 30 | 37 | **$21.82** |
| ai note taker extension | 20 | 27 | $4.63 |
| ai meeting note taker chrome extension | 10 | 27 | — |
| google meet note taker extension | 10 | 30 | $7.60 |
| note taker chrome extension | 10 | 18 | $3.75 |

Tiny volume, but a $21.82 CPC on `ai note taker chrome extension` means advertisers find this
traffic worth real money — these searchers are at the install decision. Cheap to include as
body text; no reason not to.

### 2d. Transcription cluster

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| transcribe meeting | 140 | 48 | $14.02 |
| transcribe meeting minutes | 170 | 61 | $10.88 |
| transcribe meeting in teams | 40 | **23** | $7.61 |
| how to transcribe meeting in teams | 40 | 30 | $5.84 |
| teams transcribe meeting | 30 | **20** | $6.78 |

Teams again shows the softest difficulty — consistent with the first pass. **[VERIFY]** whether
the extension surfaces a transcript to the user; if it only produces summaries, drop this
cluster rather than implying transcription.

### 2e. Outcome terms

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| meeting summary ai | 140 | 37 | $17.32 |
| meeting action items | 70 | 40 | — |
| crm notes | 90 | 17 | $36.29 |

---

## 3. The sales angle *does* have volume — just not on "note taker"

This is the most useful finding of the second pass. Sales-qualified **notetaker** terms are
zero (first-pass §0), but sales **follow-up** terms are large and barely defended:

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| **follow up email to sales call** | **8,100** | **7** | $5.13 |
| sales follow up email | 2,400 | 59 | $7.07 |
| follow up email sales example | 1,900 | **16** | $8.22 |
| follow up email | 3,600 | 34 | $3.26 |

**`follow up email to sales call` — 8,100/mo at SD 7.** That is an almost undefended keyword
with meaningful volume, and its trend is up (480 → 14,800 over 13 months). It also describes
precisely what Lynkk produces in the ninety seconds after a rep hangs up.

This is the bridge the repositioning needed. The sales ICP has real search demand; it sits on
the *outcome* (the follow-up email), not on the *tool category* (the note taker).

**Act on it like this:**
- **lynkk.ai** gets a page targeting `follow up email to sales call` — templates, examples, and
  Lynkk generating the draft from the actual call. At SD 7, even a DA-1 domain can rank.
- **The store listing** gets "follow-up email" as body text in the benefit and FAQ blocks. Nobody
  browses the Web Store for email templates, so it earns no store ranking — but it is the phrase
  that makes a rep recognise their own problem.

---

## 4. Enterprise cluster — for lynkk.ai only, and the CPCs are remarkable

| Keyword | Vol | SD | CPC |
|---|---|---|---|
| **sales call recording software** | 110 | 31 | **$108.65** |
| conversation intelligence tools | 90 | 37 | **$126.46** |
| best conversation intelligence software | 90 | 40 | $56.51 |
| what is revenue intelligence | 50 | 26 | $66.02 |
| revenue intelligence platforms | 1,000 | 49 | $47.04 |
| sales enablement tool | 1,300 | 49 | $43.72 |
| conversation intelligence platform | 880 | 37 | $43.16 |
| conversation intelligence software | 390 | 40 | $38.71 |
| conversation intelligence | 1,900 | 60 | $18.00 |
| revenue intelligence | 320 | 35 | $30.60 |

A $108–126 CPC is Gong/Chorus/Clari budget. Low volume, extreme commercial value: these are
**buying-committee** terms, not rep terms. Three implications:

1. **Never put these in the Chrome listing.** Wrong audience entirely, and claiming
   "conversation intelligence" on a 4-install extension invites a single-purpose rejection.
2. **They are the right targets for lynkk.ai's commercial pages** once the sales-rep wedge has
   traction — `conversation intelligence platform` (880, SD 37, $43) is the standout.
3. Your Ubersuggest project already tracks several (`conversation intelligence platform/s`,
   `conversation intelligence software`). Those are the few tracked keywords that are *not*
   off-strategy — keep them, but understand they serve the enterprise motion, not the rep.

---

## 5. Revised Name recommendation (third iteration)

`zoom meeting recorder` (2,900 / SD 17) is strong enough that I'd now spend Name characters on
it. It stacks with the head term instead of replacing it:

### ✅ Recommended

```
Lynkk: AI Meeting Note Taker, Recorder for Google Meet, Zoom & Teams
```

**68 / 75 characters.** This bids on, in one field:

- `ai meeting note taker` — 3,600 / SD 44
- `ai note taker` — 27,100 / SD 48 (substring)
- `meeting recorder` — 1,900 / SD 32
- `zoom meeting recorder` — 2,900 / SD 17 *(adjacent, not exact-phrase — see caveat)*
- `google meet ai note taker` — 590 / SD 40
- `microsoft teams ai note taker` — 590 / SD 26

**Caveat, stated honestly:** this phrasing puts "Recorder" and "Zoom" in the field but not as
the contiguous phrase `zoom meeting recorder`. Chrome Web Store matching is looser than Google's,
so partial coverage usually helps — but if you want the exact phrase, use the alternative below
and accept losing "Google Meet" as a spelled-out pair.

| Alternative | Chars | Trade |
|---|---|---|
| `Lynkk: AI Meeting Note Taker & Zoom Meeting Recorder for Teams, Meet` | 68 | Exact `zoom meeting recorder`; "Google Meet" shortens to "Meet" |
| `Lynkk: AI Meeting Note Taker & Recorder — Google Meet, Zoom, Teams` | 66 | Cleanest read; weakest exact-match |
| `Lynkk: AI Meeting Note Taker for Google Meet, Zoom & Teams` | 58 | First-pass recommendation; no recorder terms |

**Summary, revised to carry the follow-up outcome:**

```
For sales reps: record Google Meet, Zoom & Teams with no bot joining. AI meeting notes, action items and follow-up email drafts.
```

**128 / 132.** **[VERIFY]** "follow-up email drafts" — only keep this if Lynkk actually drafts
the email. If it produces a summary the rep adapts, say "notes you can paste into your
follow-up" instead. Do not ship the stronger claim on the weaker feature.

---

## 6. Ranked additions for the Chrome listing

Add to the existing P0/P1 set from first-pass §3. Priority = volume ÷ SD, adjusted for honesty
of fit.

| Keyword | Vol | SD | Priority | Place in |
|---|---|---|---|---|
| zoom meeting recorder | 2,900 | 17 | **P0** | Name, Desc platform block |
| meeting recorder | 1,900 | 32 | **P0** | Name, Desc ¶1 |
| ai note taker chrome extension | 30 | 37 | **P1** | Desc ¶1 (CPC $21.82) |
| meeting summary ai | 140 | 37 | **P1** | Desc feature block |
| transcribe meeting in teams | 40 | 23 | **P1** | Desc platform block **[VERIFY]** |
| ai note taker extension | 20 | 27 | **P2** | Desc |
| teams transcribe meeting | 30 | 20 | **P2** | Desc platform block **[VERIFY]** |
| meeting action items | 70 | 40 | **P2** | Desc feature block |
| meeting recorder chrome extension | 10 | 5 | **P2** | Desc |
| ai meeting assistant | 4,400 | 60 | **P3** | Desc only — SD too high for a store field |

**Do not add to store fields:** the conversation-intelligence and revenue-intelligence cluster
(§4), `ai powered meeting assistant` (unstable volume, SD 50), and anything from the phone
call-recording cluster — `call recording` (9,900) and its iPhone/Android long tail are a
different product category and would draw installs that uninstall immediately, which damages
store ranking more than the traffic helps.

## 7. Revised blog queue for lynkk.ai

Ordered by winnability at DA 1.

| # | Target | Vol | SD | Angle |
|---|---|---|---|---|
| 1 | follow up email to sales call | **8,100** | **7** | Templates + Lynkk drafting from the real call. Best opportunity found. |
| 2 | follow up email sales example | 1,900 | 16 | Companion piece; internal-link to #1 |
| 3 | jamie ai note taker | 1,300 | 17 | Comparison; softest brand target |
| 4 | zoom meeting recorder | 2,900 | 17 | How-to that converts to the extension |
| 5 | granola ai note taker | 1,300 | 30 | Comparison |
| 6 | best ai meeting note taker | 720 | 40 | "…for sales teams" — mirrors Bluedot's #3 |
| 7 | conversation intelligence platform | 880 | 37 | Enterprise motion, $43 CPC |
| 8 | sales call recording software | 110 | 31 | $108 CPC — lowest volume, highest value |

Also: with 3 referring domains and every backlink nofollow, link acquisition gates all of this.
A page targeting SD 7 can rank from a weak domain; SD 37+ targets will not move until the
backlink profile does.

## 8. Budget used

~40 of 150 daily reports; 2 of 250 monthly keyword-metric updates. No SERP refreshes run.
