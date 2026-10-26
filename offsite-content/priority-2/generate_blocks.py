#!/usr/bin/env python3
"""Generate Related reading blocks for pixoramagroup.com/blog.

Matches the site's existing template exactly:
    <h2 id="related-reading">Related reading</h2>
    <p>N guides that answer the next question:</p>
    <ul><li><a href="/blog/SLUG" rel="noreferrer">Anchor</a></li>...</ul>

Design rules enforced here:
  1. A page never links to itself.
  2. Every block carries at least one PRIORITY target.
  3. Anchor text rotates, so no two blocks use an identical anchor for the
     same destination.
  4. Blocks are 4-6 links. Longer lists dilute and look generated.
"""
import json, sys
from pathlib import Path

# Anchor variants per destination. Rotated by page index so anchors vary.
ANCHORS = {
 "cloud-migration-strategy-on-premise-to-cloud": [
   "Moving from on-prem to cloud, step by step",
   "A practical cloud migration strategy",
   "How to plan an on-premise to cloud migration"],
 "cloud-cost-is-an-architecture-problem": [
   "Cloud cost is an architecture problem",
   "Why cloud cost is really an architecture problem",
   "Cloud cost wearing a finance costume"],
 "legacy-application-modernization": [
   "Legacy application modernization: strategies and options",
   "Legacy modernization options and benefits",
   "How to approach legacy application modernization"],
 "legacy-modernization-refactor-rebuild-replace": [
   "Refactor, rebuild or replace?",
   "Deciding between refactor, rebuild and replace",
   "Legacy modernization: which of the three?"],
 "zero-trust-without-stopping-delivery": [
   "Zero-trust without stopping delivery",
   "Security that does not halt delivery",
   "Zero-trust controls in a delivery pipeline"],
 "best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c": [
   "Best AI automation agencies in the USA and Australia",
   "How to choose an AI automation agency",
   "AI automation agencies, and telling builders from resellers",
   "What an AI automation agency actually does"],
 "ai-agents-for-business-use-cases": [
   "15 ways companies are using AI agents",
   "AI agents for business: real use cases",
   "Where AI agents are actually deployed",
   "What companies are doing with AI agents today"],
 "how-to-build-an-ai-agent": [
   "How to build an AI agent",
   "Building an AI agent, step by step",
   "What it takes to build an AI agent",
   "A step-by-step guide to building an AI agent"],
 "rag-vs-fine-tuning": [
   "RAG vs fine-tuning: which do you need?",
   "Choosing between RAG and fine-tuning",
   "RAG or fine-tuning for your project",
   "Do you need RAG, fine-tuning, or both?"],
 "what-is-rag-in-ai": [
   "What is RAG in AI?",
   "RAG explained in plain English",
   "A plain-English guide to RAG",
   "Retrieval-augmented generation, explained"],
 "rag-that-survives-contact-with-users": [
   "Retrieval that survives contact with real users",
   "Making retrieval work in production",
   "Why RAG breaks with real users",
   "Retrieval that holds up outside the demo"],
 "conversational-ai-platform-buyers-guide": [
   "Conversational AI platforms: a buyer's guide",
   "Choosing a conversational AI platform",
   "Evaluating conversational AI platforms"],
 "ai-answering-service-vs-human-receptionist": [
   "AI receptionist vs answering service",
   "Comparing AI and human answering services",
   "Is an AI receptionist right for you?"],
 "what-is-staff-augmentation": [
   "What is staff augmentation, and when does it beat a project team?",
   "When staff augmentation beats hiring a team",
   "Staff augmentation explained",
   "Buying engineering capacity without hiring"],
 "top-it-staff-augmentation-companies-usa": [
   "Top IT staff augmentation companies in the USA",
   "US staff augmentation firms, compared",
   "Picking a US staff augmentation partner"],
 "best-staff-augmentation-companies-india": [
   "Staff augmentation companies in India, and the contract",
   "Augmenting from India: what to put in the contract",
   "Staff augmentation firms in India"],
 "what-is-a-fractional-cto": [
   "What is a fractional CTO? Rates and when to hire one",
   "The fractional CTO: role and rates",
   "When to hire a fractional CTO"],
 "how-to-choose-software-development-company": [
   "In-house or outsourced? Choosing a development company",
   "How to choose a software development company",
   "Picking a development partner that fits"],
 "how-to-build-saas-product": [
   "How to build a SaaS product",
   "Building a SaaS product: stages and costs",
   "What building a SaaS product involves",
   "From idea to shipped SaaS product"],
 "react-native-vs-flutter": [
   "React Native vs Flutter: how to choose",
   "Choosing between React Native and Flutter",
   "React Native or Flutter for your app"],
 "shipping-mobile-on-two-platforms": [
   "Shipping one mobile product on two platforms",
   "Two platforms without doubling the team",
   "Running one mobile product across both stores"],
 "mobile-app-development-cost-usa-australia": [
   "Mobile app development cost: USA and Australia compared",
   "What a mobile app costs in the USA and Australia",
   "App development pricing across the USA and Australia",
   "What an app really costs, after the quote"],
 "mobile-app-development-cost-india": [
   "What mobile app development costs in India",
   "Mobile app build costs in India, line by line",
   "App development pricing in India"],
 "top-mobile-app-development-companies-usa": [
   "Top mobile app development companies in the USA",
   "US mobile app development firms worth shortlisting",
   "Mobile development companies in the USA"],
 "best-mobile-app-development-companies-india": [
   "Mobile app development companies in India",
   "Indian mobile development firms, by specialism",
   "Mobile app firms in India and what each suits"],
 "best-seo-agencies-australia": [
   "Best SEO agencies in Australia for 2026",
   "SEO agencies across Sydney, Melbourne and Brisbane",
   "How to read the Australian SEO agency market"],
 "top-web-development-companies-australia": [
   "Top web development companies in Australia",
   "Australian web development firms worth shortlisting",
   "Web development companies across Australia"],
 "top-ai-development-companies-australia": [
   "Top AI development companies in Australia",
   "Australian AI development firms",
   "AI development companies in Sydney, Melbourne and Brisbane"],
 "top-saas-development-companies-usa-australia": [
   "Top SaaS development companies in the USA and Australia",
   "SaaS development firms across the USA and Australia",
   "Building your SaaS with a US or Australian firm"],
 "top-mvp-development-companies-usa": [
   "Top MVP development companies in the USA",
   "US firms for building an MVP",
   "Where to build an MVP in the USA"],
 "best-software-development-companies-india": [
   "Software development companies in India, compared on evidence",
   "Indian software development firms, compared",
   "Custom software firms in India"],
 "best-cloud-migration-companies-india": [
   "Cloud migration companies and their partner tiers",
   "Reading a cloud migration firm's partner tier",
   "Cloud migration firms in India"],
 "best-devops-consulting-companies-india": [
   "DevOps consulting companies, and when you need one",
   "When you actually need DevOps consulting",
   "DevOps consulting firms in India"],
 "best-saas-development-companies-india": [
   "SaaS development companies in India",
   "What makes SaaS harder to build",
   "SaaS development firms in India"],
 "top-ai-development-companies-india": [
   "AI development companies in India",
   "Indian AI development firms for 2026",
   "AI development firms in India"],
 "best-mvp-development-companies-india": [
   "Where to build your MVP in India",
   "MVP development companies in India",
   "Indian MVP development firms"],
}

# PRIORITY targets, by GSC position + Ubersuggest difficulty/value.
PRIORITY = {
 "cloud-migration-strategy-on-premise-to-cloud",
 "best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c",
 "best-seo-agencies-australia",
 "what-is-staff-augmentation",
 "how-to-build-an-ai-agent",
 "ai-agents-for-business-use-cases",
 "legacy-application-modernization",
 "react-native-vs-flutter",          # GSC pos 31.75 — near-miss, worth feeding
}

CLOUD = ["cloud-migration-strategy-on-premise-to-cloud","cloud-cost-is-an-architecture-problem",
         "legacy-application-modernization","legacy-modernization-refactor-rebuild-replace",
         "zero-trust-without-stopping-delivery","best-cloud-migration-companies-india"]
AI    = ["best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c",
         "ai-agents-for-business-use-cases","how-to-build-an-ai-agent","rag-vs-fine-tuning",
         "what-is-rag-in-ai","rag-that-survives-contact-with-users",
         "conversational-ai-platform-buyers-guide"]
ENGAGE= ["what-is-staff-augmentation","what-is-a-fractional-cto",
         "how-to-choose-software-development-company","top-it-staff-augmentation-companies-usa",
         "how-to-build-saas-product","top-mvp-development-companies-usa"]
MOBILE= ["react-native-vs-flutter","shipping-mobile-on-two-platforms",
         "mobile-app-development-cost-usa-australia","top-mobile-app-development-companies-usa",
         "mobile-app-development-cost-india","best-mobile-app-development-companies-india",
         "what-is-staff-augmentation"]   # bridge out of a cluster with no other commercial target
AUS   = ["best-seo-agencies-australia","top-web-development-companies-australia",
         "top-ai-development-companies-australia","top-saas-development-companies-usa-australia",
         "mobile-app-development-cost-usa-australia"]

# page -> ordered candidate pool. Self-links are stripped below.
PAGES = {
 # --- the 4 dead-end essays: high inbound, zero outbound. Fix these first.
 "cloud-cost-is-an-architecture-problem":            CLOUD,
 "zero-trust-without-stopping-delivery":             CLOUD,
 "rag-that-survives-contact-with-users":             AI,
 "shipping-mobile-on-two-platforms":                 MOBILE,
 # --- cloud / platform
 "cloud-migration-strategy-on-premise-to-cloud":     CLOUD,
 "legacy-application-modernization":                 CLOUD,
 "how-to-build-saas-product":                        ENGAGE + ["cloud-migration-strategy-on-premise-to-cloud"],
 # --- AI
 "how-to-build-an-ai-agent":                         AI,
 "ai-agents-for-business-use-cases":                 AI,
 "what-is-rag-in-ai":                                AI,
 "rag-vs-fine-tuning":                               AI,
 "ai-answering-service-vs-human-receptionist":       AI,
 "best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c": AI,
 # --- engagement models
 "top-it-staff-augmentation-companies-usa":          ENGAGE,
 "what-is-a-fractional-cto":                         ENGAGE,
 "how-to-choose-software-development-company":       ENGAGE,
 "top-mvp-development-companies-usa":                ENGAGE,
 # --- mobile
 "top-mobile-app-development-companies-usa":         MOBILE,
 "mobile-app-development-cost-usa-australia":        MOBILE,
 # --- Australia
 "best-seo-agencies-australia":                      AUS,
 "top-web-development-companies-australia":           AUS,
 "top-ai-development-companies-australia":            AUS + ["best-ai-automation-agencies-in-the-usa-and-australia-for-2026-how-to-c"],
 "top-saas-development-companies-usa-australia":      AUS + ["how-to-build-saas-product"],
}

MAXL = 5
valid = set(Path(sys.argv[1]).read_text().split())
out, used, stats = [], {}, {}

for idx, (page, pool) in enumerate(sorted(PAGES.items())):
    links, seen = [], set()
    for dest in pool:
        if dest == page or dest in seen:
            continue
        if dest not in valid:
            sys.exit(f"ERROR: unknown slug {dest}")
        seen.add(dest)
        links.append(dest)
        if len(links) >= MAXL:
            break
    # Every block must feed a priority target — unless the page IS one, in
    # which case it is a receiver and its own block has nothing to prove.
    if page not in PRIORITY and not any(d in PRIORITY for d in links):
        sys.exit(f"ERROR: no priority target in block for {page}")
    rows = []
    for j, dest in enumerate(links):
        variants = ANCHORS[dest]
        # Round-robin per destination: with 7 uses and 4 variants this yields
        # 2/2/2/1 rather than concentrating on the exact-match phrasing.
        anchor = variants[stats.get(dest, 0) % len(variants)]
        used.setdefault(dest, []).append(anchor)
        stats[dest] = stats.get(dest, 0) + 1
        rows.append(f'<li><a href="/blog/{dest}" rel="noreferrer">{anchor}</a></li>')
    out.append({"page": page, "n": len(links),
                "html": '<h2 id="related-reading">Related reading</h2>\n'
                        f'<p>{len(links)} guides that answer the next question:</p>\n<ul>\n'
                        + "\n".join(rows) + "\n</ul>",
                "links": links})

Path("blocks.json").write_text(json.dumps(out, indent=1))
print(f"generated {len(out)} blocks, {sum(b['n'] for b in out)} new internal links\n")
print("NEW INBOUND LINKS PER TARGET")
for dest, n in sorted(stats.items(), key=lambda kv: -kv[1]):
    mark = "  <-- PRIORITY" if dest in PRIORITY else ""
    print(f"  {n:>2}  {dest}{mark}")
dupes = {d: a for d, a in used.items() if len(a) != len(set(a))}
print("\nrepeated anchor for same destination:", dupes if dupes else "none")
