#!/usr/bin/env python3
"""internal-links.csv — every internal-linking action from priorities 1-3 as a
tickable worklist row."""
import csv, json, re
from pathlib import Path

P1 = [  # priority 1: feed the AI automation page
 ("ai-agents-for-business-use-cases","add body link","How do you build AI agents for business, or should you buy them?","AI automation agencies in the USA and Australia"),
 ("how-to-build-an-ai-agent","add body link","Is it hard to build an AI agent?","hire an AI automation agency"),
 ("conversational-ai-platform-buyers-guide","add body link","How should you evaluate providers?","how to tell a builder from a reseller"),
 ("conversational-ai-platform-buyers-guide","add to Related reading","Related reading (update count 4->5)","Best AI automation agencies in the USA and Australia for 2026"),
 ("ai-answering-service-vs-human-receptionist","add body link","How do you choose and set up an AI answering service?","picking an automation agency to set it up"),
 ("top-ai-development-companies-australia","add body link","Should you hire an AI consultancy or build an in-house AI team?","AI automation agencies specifically"),
 ("top-ai-development-companies-india","add body link","A specialist AI firm, or a large IT services company?","AI automation agencies and what they actually do"),
 ("top-ai-development-companies-india","add to Related reading","Related reading","Best AI automation agencies in the USA and Australia"),
 ("what-is-rag-in-ai","add body link","When should a business use RAG?","agencies that build this kind of system"),
 ("rag-vs-fine-tuning","add body link","RAG vs fine-tuning: which is better for your project?","choosing an agency to do the work"),
]
AI_AGENCY = "best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c"

RECIP = [
 (AI_AGENCY,"add body link","What should you ask an AI automation agency before hiring?","how to build an AI agent","how-to-build-an-ai-agent"),
 (AI_AGENCY,"add body link","What should you ask an AI automation agency before hiring?","15 ways companies are using AI agents","ai-agents-for-business-use-cases"),
]

P3 = [
 ("best-seo-agencies-australia","REMOVE link (misleading anchor)","StudioHawk entry","AI search","rag-that-survives-contact-with-users","defect: anchor describes a competitor's service, destination is a RAG essay; page has 2,982 impressions and this is its only internal link"),
 ("what-is-a-fractional-cto","REMOVE link (misleading anchor)","Responsibilities table, Risk row","compliance readiness","zero-trust-without-stopping-delivery","defect: wrong topic, and a table cell is a poor link context. Optionally re-add in prose after the table"),
 ("react-native-vs-flutter","MOVE anchor","One thing that matters more than the framework","this post -> shipping one product to two platforms without doubling headcount","shipping-mobile-on-two-platforms","wasted anchor; destination is correct"),
 ("top-saas-development-companies-usa-australia","REWRITE list item + add link","What matters more than location","a practical on-premise to cloud migration strategy","cloud-migration-strategy-on-premise-to-cloud","de-duplicate boilerplate shared with 2 other pages; adds the migration link"),
 ("top-mobile-app-development-companies-usa","REWRITE list item + add 2 links","What matters more than location","what an app costs in the USA and Australia / React Native vs Flutter","mobile-app-development-cost-usa-australia; react-native-vs-flutter","de-duplicate boilerplate; zero-trust is the weakest fit of the three"),
]

ADD_TO_EXISTING = {  # priority 2 part 2
 "best-mobile-app-development-companies-india": [("top-mobile-app-development-companies-usa","Top mobile app development companies in the USA"),("mobile-app-development-cost-usa-australia","What an app costs in the USA and Australia")],
 "react-native-vs-flutter": [("shipping-mobile-on-two-platforms","Shipping one product on two platforms"),("mobile-app-development-cost-usa-australia","App costs: USA and Australia compared")],
 "mobile-app-development-cost-india": [("mobile-app-development-cost-usa-australia","The same build priced in the USA and Australia")],
 "best-software-development-companies-india": [("how-to-choose-software-development-company","In-house or outsourced? How to choose"),("top-mvp-development-companies-usa","Where to build an MVP in the USA")],
 "best-flutter-development-companies-india": [("react-native-vs-flutter","React Native vs Flutter: the decision")],
 "best-cloud-migration-companies-india": [("cloud-migration-strategy-on-premise-to-cloud","The migration strategy itself, step by step"),("cloud-cost-is-an-architecture-problem","Why the bill goes up after you finish")],
 "best-staff-augmentation-companies-india": [("what-is-staff-augmentation","What staff augmentation is, and when it beats a team"),("top-it-staff-augmentation-companies-usa","US staff augmentation firms, compared")],
 "best-saas-development-companies-india": [("how-to-build-saas-product","How to build a SaaS product"),("top-saas-development-companies-usa-australia","SaaS firms in the USA and Australia")],
 "best-devops-consulting-companies-india": [("cloud-migration-strategy-on-premise-to-cloud","Planning an on-prem to cloud migration"),("zero-trust-without-stopping-delivery","Zero-trust without stopping delivery")],
 "legacy-modernization-refactor-rebuild-replace": [("legacy-application-modernization","Legacy modernization: strategies and options"),("cloud-migration-strategy-on-premise-to-cloud","Modernising during a cloud migration")],
 "what-is-staff-augmentation": [("what-is-a-fractional-cto","What a fractional CTO costs, and when to hire one")],
}

NO_FAQ = {"shipping-mobile-on-two-platforms","rag-that-survives-contact-with-users",
          "cloud-cost-is-an-architecture-problem","zero-trust-without-stopping-delivery"}

rows = []
def add(pri, page, action, where, anchor, dest, note=""):
    rows.append({"priority":pri,"source_page":page,"action":action,"insert_at":where,
                 "anchor_text":anchor,"destination":dest,"note":note,"done":""})

for page, action, where, anchor in P1:
    add(1, page, action, where, anchor, AI_AGENCY, "target: 4,400/mo, SD 13, GSC pos 11, 0 inbound today")
for page, action, where, anchor, dest in RECIP:
    add(1, page, action, where, anchor, dest, "reciprocal: target has only 1 outbound blog link")

blocks = json.load(open("priority-2/blocks.json"))
for b in blocks:
    where = ("end of article body (no FAQ section)" if b["page"] in NO_FAQ
             else "immediately before the FAQ heading")
    for dest in b["links"]:
        anchor = re.search(rf'href="/blog/{re.escape(dest)}"[^>]*>([^<]+)<', b["html"]).group(1)
        note = "new Related reading block" + ("  [page is a pure sink: 0 outbound today]" if b["page"] in NO_FAQ else "")
        add(2, b["page"], "new Related reading block", where, anchor, dest, note)

for page, items in ADD_TO_EXISTING.items():
    for dest, anchor in items:
        add(2, page, "append to existing Related reading", "existing Related reading <ul> (update count line)",
            anchor, dest, "routes equity out of the India cluster")

for page, action, where, anchor, dest, note in P3:
    add(3, page, action, where, anchor, dest, note)

# Mark the second link from a page to the same destination. Google generally
# credits only the first link's anchor per URL per page, so these are good UX
# (a body reference plus a nav entry) but add little extra equity. The site's
# India cluster already does this, so it is a normal pattern, not a mistake.
seen_pairs = set()
for r in rows:
    pair = (r["source_page"], r["destination"])
    if pair in seen_pairs:
        tag = "second link to this URL from this page - UX only, no extra equity"
        r["note"] = f"{r['note']}; {tag}" if r["note"] else tag
    seen_pairs.add(pair)

COLS = ["priority","source_page","action","insert_at","anchor_text","destination","note","done"]
with open("internal-links.csv","w",newline="",encoding="utf-8") as fh:
    w = csv.DictWriter(fh, fieldnames=COLS, quoting=csv.QUOTE_ALL)
    w.writeheader(); w.writerows(rows)

print(f"internal-links.csv — {len(rows)} rows")
from collections import Counter
for p, n in sorted(Counter(r["priority"] for r in rows).items()):
    print(f"  priority {p}: {n} actions across {len({r['source_page'] for r in rows if r['priority']==p})} pages")
print(f"\n  pages touched in total: {len({r['source_page'] for r in rows})}")
print(f"  links into the AI automation page: {sum(1 for r in rows if r['destination']==AI_AGENCY)}")
