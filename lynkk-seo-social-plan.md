# Lynkk.ai: SEO and Social Media Plan (90 days)

_Prepared 18 Nov 2026. Data: Ubersuggest project "lynkk.ai" (rank tracking, backlinks, AI-search visibility) plus a live crawl of lynkk.ai (sitemap, robots, redirects, homepage meta)._

---

## 1. Where we stand today

| Metric | Value | What it means |
|---|---|---|
| Domain Authority | **2** | Google barely trusts the domain yet. This is the main bottleneck. |
| Backlinks / referring domains | 19 / **7** | Only **2 dofollow** links. Competitors have thousands. |
| Indexed pages (sitemap) | ~129 | Strong content base: ~80 blog posts, 12 `/compare/` pages, 10 use-cases, 10 integrations, 10 feature pages. |
| Organic traffic (est.) | ~0 | Content exists but lacks the authority to rank. |
| Tracked keywords ranking (India) | 6 of 18 | 12 not in top 100. |
| Avg. tracked position (India) | **65.7 → 20** in 4 weeks | Rankings are climbing quickly. More links will speed this up. |
| AI-search visibility (ChatGPT) | **0%** of 10 prompts | Fireflies 50%, Otter 30%, Notta 30%, Fathom 20%, Avoma 20%. |

**Best current rankings (India):**

| Keyword | Volume | Position | Page |
|---|---|---|---|
| meeting ai assistant | 590 | **#8** | /blog/ai-powered-meeting-assistants |
| google meet note taker | 260 | **#12** (new) | /blog/google-meet-ai-note-taker |
| zoom note taker | 70 | #20 (↑ from 24) | /blog/zoom-note-taker |
| ai meeting assistant | 1,300 | #21 | /blog/ai-powered-meeting-assistants |
| ai assistant for meetings | 10 | #20 | /blog/ai-powered-meeting-assistants |

US: "ai note taker for zoom" (480/mo, $20 CPC) is at #39, and "is recording a meeting illegal" is at #30.

**Technical health is already good.** http→https and www→apex redirect correctly, the old `/articles/*` URLs 308 to `/blog/*`, `robots.txt` and `sitemap.xml` are clean, `llms.txt` exists, and the homepage has 8 JSON-LD blocks and a keyword-led title. **This plan therefore spends most of its effort off-page**, on links, mentions and social, and not on more on-page work.

**Lynkk's advantages to lead with in every channel:**
1. **Price:** from $4/mo, which undercuts Otter, Fireflies and Fathom.
2. **Hinglish and 15+ languages with mid-sentence code-switching.** None of the competitors owns this, and AI assistants are already being asked for "Hindi / regional language" note takers.
3. **Connected memory** (knowledge graph + "Ask your meetings") instead of only transcripts.
4. **In-person and WhatsApp** recording, a **Mac app with dictation**, and **meeting → Jira**.

---

## 2. Goals

| KPI | Today | Day 30 | Day 90 | Day 180 |
|---|---|---|---|---|
| Referring domains | 7 | 30 | 80 | 150 |
| Dofollow referring domains | 2 | 12 | 40 | 80 |
| Domain Authority | 2 | 6 | 12 | 20 |
| Tracked keywords in top 10 | 1 | 3 | 10 | 20 |
| Organic clicks / month (GSC) | ~0 | 300 | 2,000 | 6,000 |
| AI-search visibility (tracked prompts) | 0% | 10% | 30% | 40% |
| LinkedIn company followers | – | +300 | +1,500 | +4,000 |
| Signups attributed to organic + social | – | track | 150/mo | 500/mo |

---

## 3. Keyword strategy (which pages to push)

Rather than writing much more, put links and internal links into pages that already rank on page 2–3.

| Cluster | Money page to push | Primary keywords | Market |
|---|---|---|---|
| AI meeting assistant (head term) | Homepage + /blog/ai-powered-meeting-assistants | ai meeting assistant, meeting ai assistant, ai meeting note taker | IN, US, UK |
| Platform note takers | /integrations/zoom, /integrations/google-meet, /integrations/microsoft-teams + matching blogs | zoom note taker, google meet note taker, microsoft teams meeting note taker, transcribe zoom | IN, US |
| Teams recording (UK) | New: /blog/how-to-record-teams-meeting | how to record teams meeting, how to download teams recording, teams transcription | UK |
| Hinglish / Indian languages (**moat**) | /features/hinglish-transcription, /blog/hindi-transcription | hinglish transcription, hindi meeting transcription, ai note taker india | IN |
| Competitor alternatives | /compare/* + /blog/otter-ai-alternatives | otter alternative, fireflies alternative, fathom alternative, cheaper than otter | US, IN |
| Conversation intelligence | /blog/sales-conversation-intelligence | conversation intelligence platform/software | IN, US |
| Knowledge management | /blog/meeting-knowledge-management | knowledge management software, personal knowledge management | US |

**Note on cannibalisation:** "ai meeting assistant" currently ranks with a blog post instead of the homepage. Pick one target (we recommend the homepage for the head term and the blog post for "best AI meeting assistants 2026"), then shift internal anchors to match.

---

## 4. On-page and technical to-do list (short, since the basics are done)

1. **Google Search Console + Bing Webmaster Tools.** Verify both, submit the sitemap, and request indexing for the 5 pages above. Bing is important because it feeds ChatGPT search and Copilot.
2. **Internal-link sprint.** From all ~80 blog posts, add contextual links with keyword anchors to the 6 money pages in section 3 (2–3 links per post).
3. **Refresh the page-2 posts.** Update /blog/ai-powered-meeting-assistants, /blog/google-meet-ai-note-taker and /blog/zoom-note-taker with a "Tested in Nov 2026" section, a comparison table, FAQ schema, original screenshots and a short demo video embed.
4. **India landing page:** create `/in` or `/ai-note-taker-india` with INR pricing, Hinglish demo, UPI/Razorpay note and India data-residency/DPDP-Act notes. This page answers the exact AI-search prompts Lynkk is missing (section 6).
5. **New high-intent pages:** "Lynkk vs tl;dv", "vs Otter for Hindi", "Best AI note taker for Indian startups", and a UK "How to record a Teams meeting (2026)" guide.
6. **E-E-A-T:** only one author page exists (/blog/authors/samarth-wagh). Add a second author, real bios, LinkedIn links, and `Person` + `Organization` schema with `sameAs` links to every social profile and directory listing created below.
7. **Core Web Vitals:** run PageSpeed on homepage + top 5 posts monthly. Target LCP < 2.5s on mobile.

---

## 5. Off-page SEO: backlink plan

Ubersuggest's competitor link-gap tool returned no data for this project, so the target lists below come from the AI-citation-gap report (real pages ChatGPT cites for these queries) plus well-known SaaS link sources. **Rule: no paid PBN links, link farms, or bulk "DA 50 guest post" packages.** They carry Google penalty risk and don't help AI-search visibility.

### Tier 1: Foundation links (Weeks 1–3, ~40 links, mostly free)

**a) Integration marketplaces.** These are the highest-value easy links because they are high-DA, relevant and send buyers.
- Zoom App Marketplace
- Google Workspace Marketplace (Meet / Calendar)
- Microsoft AppSource / Teams store
- Atlassian Marketplace (Jira)
- Slack App Directory
- HubSpot App Marketplace, Pipedrive Marketplace, Zoho Marketplace, Salesforce AppExchange (when eligible), Attio
- Chrome Web Store (Chrome extension), Mac App Store / Setapp

**b) Software review sites** (also the sources AI assistants quote):
G2, Capterra, GetApp, Software Advice, TrustRadius, SaaSworthy, SoftwareSuggest (India), Techjockey (India), Crozdesk, SourceForge, Slashdot, AlternativeTo, SaaSHub, StackShare.
→ **Target: 25 G2 + 25 Capterra reviews in 90 days** (in-app prompt after a user's 5th meeting, plus a $10 gift card where the platform allows it).

**c) AI tool directories:**
There's An AI For That, Futurepedia, Toolify, TopAI.tools, AI Tool Hunt, Insidr, Future Tools, AIcyclopedia, Easy With AI, OpenTools, Dang.ai.

**d) Startup / company profiles:**
Crunchbase, LinkedIn, Product Hunt, Wellfound, F6S, Tracxn, BetaList, Indie Hackers, Startup India (DPIIT), YourStory company page.

### Tier 2: Listicle inclusion outreach (Weeks 2–8, ~20 links)

These pages **already rank and are already cited by ChatGPT** for Lynkk's prompts, but they mention competitors and not Lynkk. Getting added to them improves Google rankings and AI visibility together.

| Priority | Page | DR | Lists |
|---|---|---|---|
| 1 | notta.ai (homepage comparisons). Competitor, so pitch a "vs" or partnership only | 51 | Fathom, Fireflies, Otter, Tactiq |
| 1 | spotsaas.com/blog/best-conversation-intelligence-software | 41 | Avoma, Fireflies |
| 1 | dupple.com/learn/best-conversation-intelligence-software | 30 | Avoma, Fathom, Fireflies, Otter |
| 1 | dupple.com/learn/best-ai-knowledge-management-tools | 30 | Fathom |
| 1 | cleverly.co/blog/conversation-intelligence-tools | 30 | Avoma, Fathom |
| 1 | **knowledgesense.in/best-ai-meeting-assistants-india-2026** (INR pricing) | 16 | Fathom |
| 2 | **zendikt.com/top-10-conversation-intelligence-software/india/** | 8 | Avoma, Fireflies, Otter |
| 2 | aitoolwise.com/best-ai-note-taker | 10 | Fathom |
| 2 | aicentralresources.com (Otter vs Fireflies vs Fathom) | 8 | 4 brands |
| 2 | aitoolbriefing.com (Otter vs Fireflies) | 8 | 2 brands |
| 2 | comparecrest.com/best-ai-note-takers | 5 | 3 brands |
| 2 | softwarecompare.net (conversation intelligence) | 3 | 4 brands |
| 3 | stratilyze.com (Fathom vs Otter vs Fireflies) | 1 | 3 brands |

Expand the list each week: Google "best AI note taker 2026", "otter alternatives", "fireflies alternatives", "best AI note taker India", "AI meeting assistant for Hindi" and pitch every listicle in the top 30 that lacks Lynkk. **Goal: 60 pitches → ~15 inclusions.**

**Pitch template:**
> Subject: A Hinglish-ready option for your "{article title}" list
>
> Hi {name}, I liked your {article} breakdown, especially {specific point}. You might want to add Lynkk for readers who need {Hindi/Hinglish code-switching | in-person + WhatsApp recording | Jira action items} at $4/mo. That's a gap none of the listed tools cover.
> I'm happy to give you a free Pro account to test, plus screenshots, pricing and a 2-line blurb you can paste. — {name}, Lynkk

### Tier 3: Earned authority links (Weeks 4–12, ~20 high-DR links)

1. **Original data study (main linkable asset):** *"The Hinglish Meeting Report 2026"*. Benchmark Otter, Fireflies, Fathom, Notta and Lynkk on 50 real code-switched Indian business calls (word-error rate, speaker labels, action-item accuracy). Publish the methodology and downloadable data. Pitch it to Inc42, YourStory, Entrackr, Analytics India Magazine, The Ken, Economic Times Tech, LiveMint Tech, MediaNama and Indian SaaS newsletters.
2. **Free tools / templates (passive link magnets):**
   - Meeting cost calculator (salary × attendees × time)
   - "Is it legal to record a meeting?" interactive map by country / US state, built on the existing ranking post
   - Action-item tracker, meeting-minutes and QBR templates in Notion, Google Docs and Excel (the existing template posts become gated or ungated downloads)
3. **Journalist requests:** answer 3–5 queries a week on Qwoted, Featured.com, Help a B2B Writer, SourceBottle and Terkel as the founder (topics: AI at work, remote meetings, productivity, Indian SaaS).
4. **Guest posts (relevance over DA):** 2 a month on SaaS, productivity, sales and PM blogs. For example, Atlassian/Jira community, Zapier-style productivity blogs, HubSpot community, sales-ops blogs, Indian startup blogs (Inc42 Expert Voices, YourStory contributor). Use one contextual link with a branded or partial-match anchor.
5. **Podcasts:** founder on 2 shows a month (Indian startup, SaaS growth, future-of-work podcasts). Each appearance gives a show-notes link and backlink.
6. **Unlinked mentions:** set Google Alerts / Ubersuggest for "Lynkk" and "lynkk.ai". When a page mentions Lynkk without a link, ask for one.
7. **Partnerships:** co-marketing with integration partners (Jira, HubSpot, Zoho, Pipedrive consultants), accelerators, coworking spaces and college placement cells (interview transcription). Each partnership should come with a "tools we use" or partner-page link.
8. **Broken-link building:** find dead links on "meeting tools" resource pages (Ubersuggest/Ahrefs broken-link check) and offer the matching Lynkk guide.

### Anchor-text mix (keep it natural)
Branded (Lynkk, lynkk.ai) **50%** · Naked URL **15%** · Generic ("this tool", "here") **15%** · Partial-match ("AI meeting assistant for Zoom") **15%** · Exact-match **≤5%**.

### Monthly link targets
| Month | New referring domains | Of which dofollow | Focus |
|---|---|---|---|
| 1 | 25 | 10 | Marketplaces, directories, review sites, Product Hunt |
| 2 | 25 | 15 | Listicle outreach, first guest posts, journalist requests |
| 3 | 25 | 15 | Data study PR push, podcasts, tools/templates |

---

## 6. AI-search visibility (ChatGPT, Gemini, Google AI Overviews)

Lynkk currently appears in **0 of 10** tracked AI answers. These prompts are the gaps where competitors are cited and Lynkk is not:

- "Most affordable AI meeting notetaker with **Hindi or regional language** support in India": Otter cited
- "Best AI notetaker for **Indian startups**": Fathom cited
- "Best conversation intelligence software for **sales teams in India**": Avoma, Fireflies cited
- "Conversation intelligence platform with best **pricing for small businesses in India**": Avoma, Fireflies
- "Best meeting transcription for **Indian English**": Fireflies
- "Most accurate transcription for **multi-speaker calls in India**": Fathom, Fireflies, Otter

Lynkk has a better answer to every one of these than the brands being cited. To get cited:
1. Build the **India landing page** (section 4.4) that answers each prompt in plain sentences, with numbers (price in INR, languages, accuracy).
2. Get onto the **listicles AI already cites** (Tier 2 table).
3. **Reddit and Quora presence** (section 7), because LLMs heavily cite these.
4. Keep `llms.txt` current with pricing, languages and differentiators.
5. Earn **G2 / Capterra reviews** that mention "Hinglish", "Hindi", "cheap" and "Jira".
6. Re-check Ubersuggest Brand Visibility every 2 weeks and add 10 more tracked prompts (US/UK).

---

## 7. Social media plan

### Channel strategy

| Channel | Role | Cadence | Owner |
|---|---|---|---|
| **LinkedIn** (founder + company page) | #1 B2B channel: demand gen, thought leadership | Founder 4×/wk, company 3×/wk | Founder + content lead |
| **X / Twitter** | Build-in-public, product updates, AI/SaaS community | 1–2/day | Founder |
| **YouTube** (long + Shorts) | Tutorials and comparisons that rank on YouTube and Google, and link to the site | 1 long/wk + 3 Shorts/wk | Content lead |
| **Instagram Reels** | Short productivity hacks (India-heavy audience, students, freelancers) | 3 Reels/wk (repurposed Shorts) | Content lead |
| **Reddit** | Trust + AI-search citations | 3–5 helpful comments/wk | Founder (personal account) |
| **Quora** | Long-tail answers, AI-cited | 3 answers/wk | Content lead |
| **Product Hunt** | One launch spike + backlink + badge | 1 launch (Week 6) + a later relaunch of the Mac app | Founder |
| **WhatsApp Channel / Community** | Retention, Indian users, updates | 1–2/wk | Support |

### Content pillars (repeat weekly)

1. **Meeting-productivity tips (35%):** "3 questions to end every standup", "How to write action items people actually do", carousels made from the template blog posts.
2. **Product in action (25%):** 30–60s screen recordings: Hinglish call → clean English notes, "Ask Lynkk what we promised Acme last month", meeting → Jira ticket in one click.
3. **Hinglish / India angle (15%):** "Your AI note taker doesn't understand 'kal tak bhej dena'. Ours does." Customer stories from Indian startups.
4. **Comparisons and pricing (10%):** "Otter vs Fireflies vs Lynkk on a Hinglish call" (clips from the data study), "AI note takers under ₹500/mo".
5. **Build-in-public / founder story (15%):** metrics, launches, lessons, hiring.

### Sample weekly calendar

| Day | LinkedIn | X | YouTube / IG | Other |
|---|---|---|---|---|
| Mon | Founder: lesson / opinion post | Thread: weekly product update | Short: 30s feature demo | Reddit replies |
| Tue | Company: carousel (template / tip) | 2 tips | — | Quora answer |
| Wed | Founder: customer story | Build-in-public metric | **Long video:** tutorial or comparison | Journalist requests |
| Thu | Company: product demo video | Reply-guy session in AI/SaaS threads | Short / Reel | Reddit replies |
| Fri | Founder: Hinglish / India take | Poll | Short / Reel | Quora + WhatsApp channel |
| Weekend | — | 1 casual post | — | Plan next week |

### Example posts (ready to adapt)

**LinkedIn (founder):**
> Half of Indian meetings switch between Hindi and English every 30 seconds.
> Most AI note takers turn that into gibberish.
> We tested 5 of them on 50 real calls. Here's what happened ↓
> [chart] … Full report: lynkk.ai/hinglish-report

**X:**
> Shipped: say "create Jira tickets for everything Rahul committed to" in Lynkk chat → done, with links back to the exact moment in the call. 12 seconds instead of 12 minutes.

**YouTube titles:**
- "Best AI Note Taker for Zoom in 2026 (I Tested 7)": supports /blog/zoom-note-taker
- "How to Record a Teams Meeting & Get Automatic Notes": UK keyword cluster
- "Otter vs Fireflies vs Lynkk: Hinglish Transcription Test"

### Social → SEO connection
- Every YouTube description and Reddit/Quora answer links to the matching blog post. Most will be nofollow, but they send traffic and get cited by AI.
- Repurpose each blog post into 1 carousel, 1 Short and 1 thread.
- Add UTM tags to every link (`utm_source=linkedin&utm_medium=social&utm_campaign=<pillar>`).

### Launch moments (90 days)
- **Week 6: Product Hunt launch** (prepare hunters, a 40-person supporter list, a launch-day LinkedIn/X push and a demo GIF).
- **Week 9: Hinglish Meeting Report** release (PR + LinkedIn + X + a dedicated YouTube video).
- **Week 12: Mac app / dictation feature** push on X, Product Hunt "Ship" and Mac communities (r/macapps, Setapp).

---

## 8. 90-day roadmap

| Weeks | SEO (on-page) | Off-page / links | Social |
|---|---|---|---|
| 1–2 | GSC + Bing setup; internal-link sprint; fix "ai meeting assistant" cannibalisation | Submit to all integration marketplaces, review sites, AI directories, startup profiles | Optimise all profiles (same bio, logo, link); start founder LinkedIn cadence |
| 3–4 | Refresh 3 page-2 posts; build India landing page | Start G2/Capterra review campaign; first 20 listicle pitches | First 4 YouTube Shorts; Reddit/Quora accounts warmed up |
| 5–6 | Publish "Teams recording" UK guide + 2 new "vs" pages | 20 more pitches; 2 guest posts; journalist requests daily | **Product Hunt launch** |
| 7–8 | Launch meeting-cost calculator + recording-legality map | Promote tools to resource pages; broken-link outreach | Tool demo content; first long YouTube comparison |
| 9–10 | Publish Hinglish Meeting Report | PR push to Indian tech media + newsletters; 2 podcasts | Report campaign across all channels |
| 11–12 | Refresh based on GSC queries; add FAQs | Unlinked mentions; partner pages; 2 guest posts | Mac app push; review 90-day metrics and reset plan |

---

## 9. Measurement

- **Weekly:** Ubersuggest rank tracking (IN/US/UK), new/lost referring domains (`linking_domains`), outreach tracker (sent / replied / won), social reach and clicks.
- **Bi-weekly:** Ubersuggest Brand Visibility (AI-search share of voice vs Fireflies, Otter, Fathom, Avoma, Tactiq).
- **Monthly:** GSC clicks/impressions per cluster, DA, signups by source (UTMs), review counts on G2/Capterra.
- **Tools:** Ubersuggest (already set up), Google Search Console, Bing Webmaster Tools, GA4, a simple outreach sheet (or Pitchbox/BuzzStream), Buffer/Hootsuite for scheduling.

---

## 10. Budget-light resourcing

| Role | Time | Main jobs |
|---|---|---|
| Founder | ~5 h/wk | LinkedIn/X posts, podcasts, journalist quotes, PR |
| Content / SEO lead | full-time | Refreshes, new pages, outreach, YouTube scripts |
| Freelance video editor | ~10 h/wk | Shorts, Reels, long-form edits |
| Optional paid | ~$300–600/mo | G2/Capterra review incentives, Product Hunt promotion assets, a few newsletter sponsorships in Indian SaaS / productivity niches |
