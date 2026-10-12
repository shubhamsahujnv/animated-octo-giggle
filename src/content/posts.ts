export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  dek: string;
  author: string;
  role: string;
  date: string; // ISO
  readMins: number;
  tag: string;
  updated?: string; // ISO, when the article was materially revised
  faqs?: Faq[]; // article-specific questions; also emitted as FAQPage schema
  body: string[]; // lines starting with "## " are headings, "> " is a pull quote
  draft?: boolean; // hidden draft: not listed anywhere, noindex
};

export const POSTS: Post[] = [
  {
    slug: "how-a-clean-baseline-changes-the-carbon-conversation",
    title: "How a clean baseline changes the carbon conversation",
    dek: "A mid-sized manufacturer does not need a bigger team to cut emissions. It needs twelve months of numbers it can defend.",
    author: "Ankita Patwa",
    role: "Founder, TheGreensolve",
    date: "2026-09-27",
    readMins: 5,
    tag: "Practice",
    faqs: [
      {
        q: "What is a carbon baseline?",
        a: "A baseline is a defined period of measured activity, at least twelve clean months, where every emissions line is tied to a source document and every assumption is written down. It is the reference point every reduction project, customer disclosure and credit methodology is measured against.",
      },
      {
        q: "Which emissions should a manufacturer measure first?",
        a: "Start with electricity, gas and fuel. Someone is already paying for them, so the invoices exist. Reconcile them to meter reads where you can and record units exactly as billed. For most metal parts and electroplating sites this first pass covers the large majority of Scope 1 and 2.",
      },
      {
        q: "Do we need submetering before we can build a baseline?",
        a: "No. Boilers, ovens, compressors, plating lines and HVAC already sit behind the main meters. Consistency matters more than resolution in the first cycle; submetering can be added later where it changes a decision.",
      },
      {
        q: "How often should the baseline be updated?",
        a: "Monthly, if you want it to be a management tool. A baseline refreshed once a year is a report. Routine monthly capture keeps the numbers close enough to operations that anomalies show up while they are still cheap to fix.",
      },
    ],
    body: [
      "Most decarbonisation conversations in a mid-sized plant start with a technology. A solar quote, a boiler retrofit, a new compressor. The honest starting point is quieter than that: a baseline you would be willing to show a reviewer, a banker or your largest customer without flinching.",
      "A baseline is not a spreadsheet of estimates. It is a period of measured activity, twelve clean months at minimum, with every line tied to a source document and every assumption written down. When that exists, every later conversation gets shorter.",
      "## Start with what the meter already knows",
      "Electricity, gas and fuel are the easiest lines because someone is already paying for them. Pull the invoices, reconcile them to meter reads where you can, and record the units exactly as billed. A plant in Ohio will see therms and kWh; a plant in Pune will see kWh, diesel litres and furnace oil by the kilogram. Both are fine, as long as the unit and the source stay attached to the number.",
      "For a metal parts or electroplating site, this first pass usually covers the large majority of Scope 1 and 2. Boilers, ovens, compressors, plating lines and HVAC all sit behind those meters. You do not need perfect submetering to begin; you need consistency.",
      "> The first baseline is not about being right. It is about being able to show how you got the number.",
      "## Scope 3 is a sequence, not a project",
      "The mistake most teams make with Scope 3 is trying to close all fifteen categories in the first cycle. For manufacturers, purchased goods, upstream transport, waste and business travel carry most of the weight. Start there, use spend-based factors where you must, and label every line with its data quality: metered, invoiced, calculated, estimated or proxy.",
      "That single label changes the review conversation. An assurer who can see which lines are measured and which are estimated spends their time in the right places, and you spend next year's budget the same way.",
      "## What changes once the baseline exists",
      "Three things happen quickly. First, reduction projects stop being opinions. A heat-recovery retrofit on one boiler can be priced against a measured fuel line, not a guess. Second, customer questionnaires stop being emergencies, because the inventory with evidence per line already exists. Third, credit screening becomes an afternoon exercise instead of a quarter of consulting, because the baseline is the first thing every methodology asks for.",
      "> Companies do not lose carbon opportunities because they are small. They lose them because nobody wrote the numbers down.",
      "## Keeping it alive",
      "A baseline that is updated once a year is a report. A baseline that is updated monthly is a management tool. Routine capture, even a simple monthly entry per activity, keeps the inventory close enough to operations that anomalies show up while they are still cheap to fix.",
      "The plants that move fastest are not the ones with the biggest budgets. They are the ones where the numbers are already in order when the opportunity arrives.",
    ],
  },
  {
    slug: "carbon-credits-are-not-just-for-big-companies",
    title: "Carbon credits are not just for big companies",
    dek: "The smallest factory on the street can hold a credit-eligible project. Most of them never find out.",
    author: "Ankita Patwa",
    role: "Founder, TheGreensolve",
    date: "2026-08-04",
    readMins: 5,
    tag: "Carbon markets",
    faqs: [
      {
        q: "Can a small manufacturer earn carbon credits?",
        a: "Yes. A carbon credit pays for a measurable, additional reduction that can be independently verified. Company size does not decide eligibility. A boiler heat-recovery retrofit, a rinse-water redesign or a switch from diesel gensets to grid-plus-solar can each carry a defensible tonne count.",
      },
      {
        q: "What stops smaller firms from getting credits?",
        a: "Usually three things: there is no baseline of twelve clean months of Scope 1 and 2 data, validation and verification costs are priced for large volumes, and nobody inside the business owns the paperwork.",
      },
      {
        q: "How does aggregation help a small project?",
        a: "Aggregation pools several similar projects so validation, verification and registry costs are shared. It solves the transaction-cost and ownership problems. It cannot solve a missing baseline, which only the plant can build.",
      },
      {
        q: "What is the right order for a carbon credit project?",
        a: "Measure first, screen second, monetise third. Build an ISO 14064-1 inventory with evidence attached to each line, then screen reduction projects against applicable methodologies, and only then talk to buyers or brokers.",
      },
    ],
    body: [
      "Ask a 60-person electroplating shop whether carbon credits apply to them and the answer is almost always the same: that is for the big names. It is the single most expensive assumption in the mid-market.",
      "A credit is not a reward for size. It is a payment for a measurable, additional reduction that somebody can verify. A heat-recovery retrofit on a single boiler, a rinse-water redesign that cuts pumping load, a switch from diesel gensets to grid-plus-solar: each of these can carry a defensible tonne count.",
      "## What actually blocks smaller firms",
      "Three things, and none of them is ambition. First, there is no baseline. Without twelve clean months of Scope 1 and 2 data, no methodology can be applied. Second, transaction cost: validation and verification are priced for large volumes. Third, nobody in the building owns the paperwork.",
      "> Aggregation solves two of the three. A clean baseline solves the first, and only you can do that part.",
      "## The order that works",
      "Measure first. Screen second. Monetise third. Firms that try to start at the credit end spend money on consultants who then ask for the data that was never collected.",
      "Build the inventory, hold it to ISO 14064-1, keep the evidence attached to every line. Then the screening conversation takes an afternoon instead of a quarter.",
      "If you run a plant under 500 employees and you have a reduction project on the shelf, the honest next step is not a broker. It is twelve months of numbers you would be willing to defend.",
    ],
  },
  {
    slug: "un-article-6-4-n2o-methodology",
    title: "The UN just opened a door for N₂O projects",
    dek: "A new Article 6.4 methodology brings nitrous oxide abatement into the compliance market. For chemical and pharma sites, this is large.",
    author: "TGS Editorial",
    role: "TheGreensolve",
    date: "2026-07-21",
    readMins: 4,
    tag: "Policy",
    faqs: [
      {
        q: "Why is nitrous oxide abatement so valuable?",
        a: "Nitrous oxide has a 100-year global warming potential of 273, so one tonne of N₂O avoided equals 273 tonnes of CO₂ equivalent. That multiplier can turn a marginal catalyst retrofit into a project with a strong payback.",
      },
      {
        q: "Which facilities can use the Article 6.4 N₂O methodology?",
        a: "It targets N₂O abatement at nitric acid plants, adipic acid production and certain pharmaceutical processes. Each site still has to meet the methodology's applicability conditions.",
      },
      {
        q: "What does a plant need before it can claim N₂O credits?",
        a: "Continuous or campaign-based measurement of N₂O concentration and gas flow, a documented baseline that reflects real operating conditions rather than design values, and evidence that the abatement is additional to what regulation already requires in that jurisdiction.",
      },
      {
        q: "Can N₂O credits be sold if the plant is covered by a domestic scheme?",
        a: "Possibly, but check first. Sites in India and the US need to confirm how the project interacts with domestic carbon schemes, because double-counting rules decide whether a tonne can be sold at all.",
      },
    ],
    body: [
      "Nitrous oxide warms the planet 273 times more than the same mass of CO₂ over a century, and it lingers for over a hundred years. Until recently, abating it sat awkwardly between voluntary methodologies and national policy.",
      "The approval of an N₂O methodology under Article 6.4 changes the arithmetic. Abatement at nitric acid plants, adipic acid production and certain pharmaceutical processes now has a route into a UN-backed crediting mechanism.",
      "## Why it matters commercially",
      "One tonne of N₂O avoided is 273 tonnes of CO₂ equivalent. A catalyst retrofit that looked marginal against a spot price suddenly carries a very different payback when the multiplier is applied and the credits sit in a compliance-grade registry.",
      "## What a plant needs before it can claim anything",
      "Continuous or campaign-based measurement of N₂O concentration and gas flow. A documented baseline that reflects real operating conditions, not design values. Evidence that the abatement is additional to regulation in your jurisdiction.",
      "> If your emission factor for N₂O is a default from a table, you do not have a project yet. You have a hypothesis.",
      "Sites in India and the US should also check the interaction with domestic schemes before committing, because double counting rules decide whether a tonne can be sold at all.",
    ],
  },
  {
    slug: "what-jpmorgan-buying-removals-tells-smes",
    title: "What a bank buying removals tells the rest of us",
    dek: "When institutional capital pre-buys carbon removal, it sets the quality bar that every supplier will eventually be measured against.",
    author: "TGS Editorial",
    role: "TheGreensolve",
    date: "2026-06-30",
    readMins: 4,
    tag: "Markets",
    faqs: [
      {
        q: "What is a carbon removal pre-purchase?",
        a: "It is a long-dated contract to buy tonnes of carbon removal that will be delivered in future years. The buyer's commitment helps finance the plants that will produce those removals.",
      },
      {
        q: "What quality standards do institutional removal buyers expect?",
        a: "Durable storage, monitored delivery, third-party verification and contractual clarity about who owns each tonne. These diligence terms matter more than the price of the purchase.",
      },
      {
        q: "Why does this matter to a mid-sized supplier?",
        a: "The same quality bar moves down the supply chain. It shows up first in supplier questionnaires, then in procurement scorecards, then in the terms customers offer at contract renewal.",
      },
      {
        q: "What should a supplier prepare now?",
        a: "A verified Scope 1–3 inventory with evidence attached to every line. It is far cheaper to build that quality early than to retrofit it when a customer asks for it.",
      },
    ],
    body: [
      "Large financial institutions have moved from offset portfolios to long-dated removal purchases, financing the plants that will deliver tonnes years from now.",
      "The interesting part is not the cheque. It is the diligence attached to it: durable storage, monitored delivery, third-party verification, and contractual clarity about who owns the tonne.",
      "## The pass-through effect",
      "That bar does not stay at the top of the market. It arrives in supplier questionnaires, then in procurement scorecards, then in the terms your customer offers you at renewal.",
      "A mid-sized supplier that can hand over a verified Scope 1–3 inventory with evidence per line is not doing a favour for the planet. It is protecting a contract.",
      "> Quality is becoming the cheapest thing you can build early and the most expensive thing you can retrofit late.",
    ],
  },
  {
    slug: "scope-3-for-manufacturers-without-a-data-team",
    title: "Scope 3 for manufacturers without a data team",
    dek: "Fifteen categories, one spreadsheet and no analyst. Here is the sequence that gets a defensible number.",
    author: "TGS Editorial",
    role: "TheGreensolve",
    date: "2026-05-19",
    readMins: 6,
    tag: "Practice",
    faqs: [
      {
        q: "Which Scope 3 categories matter most for manufacturers?",
        a: "For automotive parts, metals, electroplating and pharma, purchased goods and services, upstream transportation, waste and business travel typically cover the large majority of Scope 3. Make those four credible before working on the rest.",
      },
      {
        q: "Are spend-based emission factors acceptable?",
        a: "Yes, for a first inventory, provided you disclose that you used them. Replace them category by category with supplier-specific or mass-based data and record which lines changed and why. Assurers reward visible progression.",
      },
      {
        q: "What is a data-quality rating in a GHG inventory?",
        a: "A single field on each line that records how the number was produced: metered, invoiced, calculated, estimated or proxy. It shows reviewers where to focus and shows you where next year's effort should go.",
      },
      {
        q: "Does a Scope 3 inventory need to be accurate in year one?",
        a: "No. The goal in year one is traceability: every number has a source, a method and a quality rating. Accuracy improves in later years because that trail exists.",
      },
    ],
    body: [
      "Most manufacturing sites do not have a sustainability department. They have a plant manager with a purchasing report and a deadline from a customer.",
      "## Start with the four categories that carry the weight",
      "For automotive parts, metals, electroplating and pharma, purchased goods and services, upstream transport, waste and business travel typically cover the large majority of Scope 3. Everything else is rounding until the first four are credible.",
      "## Spend data is a starting point, not an answer",
      "Spend-based factors are acceptable for a first inventory if you say so plainly. Replace them category by category with supplier-specific or mass-based data, and record which lines changed and why. Assurers reward visible progression far more than a confident single number.",
      "## Rate every line",
      "Metered, invoiced, calculated, estimated, proxy. Five tiers, one field. That single column tells a reviewer where to spend their time and tells you where next year's effort goes.",
      "> The goal in year one is not accuracy. It is traceability. Accuracy is what year two buys with it.",
    ],
  },
  {
    slug: "india-and-us-reporting-what-changes",
    title: "Reporting in India and the US: what actually differs",
    dek: "Same gases, different rulebooks. A practical read of BRSR, CCTS, SB 253 and the EPA programme for a plant operating in both.",
    author: "TGS Editorial",
    role: "TheGreensolve",
    date: "2026-04-12",
    readMins: 6,
    tag: "Compliance",
    faqs: [
      {
        q: "What emissions data does SEBI's BRSR ask for?",
        a: "BRSR asks for emissions intensity per rupee of turnover and per turnover adjusted for purchasing power parity, plus a physical intensity metric. Grid emissions should reference Central Electricity Authority (CEA) factors.",
      },
      {
        q: "Which grid emission factors should US facilities use?",
        a: "Use EPA eGRID subregion factors rather than the national average. Location-based Scope 2 should include methane and nitrous oxide alongside CO₂.",
      },
      {
        q: "Can one GHG inventory support both Indian and US reporting?",
        a: "Yes. Build one ISO 14064-1 inventory with one evidence trail and one data-quality rating per line. Each filing then becomes a formatting exercise rather than a separate project, though each framework keeps its own disclosures.",
      },
      {
        q: "Does this article replace compliance advice?",
        a: "No. It is practical guidance. Confirm applicability, revenue thresholds and filing dates for your company, facilities and reporting period before you file.",
      },
    ],
    body: [
      "A company with a plant in Pune and a plant in Ohio is not running one reporting process. It is running two, and the overlap is smaller than most boards assume.",
      "## India",
      "SEBI's BRSR asks for intensity per rupee of turnover and per turnover adjusted for purchasing power parity, plus a physical intensity. Grid emissions should reference CEA factors, and the regional grid matters for a manufacturer with open access or captive supply. The carbon market adds obligations for notified sectors.",
      "## United States",
      "Grid factors belong at eGRID subregion level, not national average, and location-based Scope 2 carries methane and nitrous oxide alongside CO₂. Fuels are measured in therms, MMBtu, gallons and short tons. California adds climate-risk reporting alongside emissions disclosure for firms over the revenue thresholds.",
      "## The part that travels",
      "One ISO 14064-1 inventory, one evidence trail, one data-quality rating per line. Build that once and both filings become formatting exercises rather than separate projects.",
      "> Two rulebooks, one set of numbers. That is the only version of this that stays affordable.",
    ],
  },
];

export const DRAFT_POSTS: Post[] = [];

export function postBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug) ?? DRAFT_POSTS.find((p) => p.slug === slug);
}

export function postsByAuthor(name: string) {
  return POSTS.filter((p) => p.author === name);
}

export function wordCount(post: Post) {
  return post.body.join(" ").split(/\s+/).filter(Boolean).length;
}

// Fallback for articles that have not been given their own questions yet.
const FALLBACK_FAQS = {
  markets: [
    {
      q: "Can a small manufacturer generate carbon credits?",
      a: "Yes, when a project creates measurable, additional and independently verifiable reductions under an applicable standard. Company size does not determine eligibility.",
    },
    {
      q: "Is a GHG inventory the same as a carbon credit project?",
      a: "No. An inventory measures the company footprint. A credit project measures reductions against an approved project baseline with its own monitoring and verification rules.",
    },
  ],
  compliance: [
    {
      q: "Does this replace professional compliance advice?",
      a: "No. The article is practical guidance. Applicability, thresholds and filing dates should be confirmed for the company, facility and reporting period.",
    },
    {
      q: "Can one inventory support more than one disclosure?",
      a: "Usually, yes. A controlled ISO 14064-1 inventory and evidence trail can become the common data foundation, while each framework still needs its own presentation and disclosures.",
    },
  ],
  practice: [
    {
      q: "What evidence should be kept for a GHG inventory?",
      a: "Keep invoices, meter records, purchasing data, calculation notes, factor sources, assumptions and approvals connected to the relevant inventory line.",
    },
    {
      q: "When should the inventory be reviewed?",
      a: "Review it before external reporting, after material corrections and whenever an organisational or operational change affects the reporting boundary.",
    },
  ],
};

export function faqsForPost(post: Post): Faq[] {
  if (post.faqs?.length) return post.faqs;
  if (post.tag === "Carbon markets" || post.tag === "Markets") return FALLBACK_FAQS.markets;
  if (post.tag === "Policy" || post.tag === "Compliance") return FALLBACK_FAQS.compliance;
  return FALLBACK_FAQS.practice;
}

export const JOURNAL_FAQS: Faq[] = [
  {
    q: "What is The Baseline Journal?",
    a: "The Baseline Journal is TheGreensolve's blog. It publishes short, practical field notes on carbon accounting, Scope 1–3 measurement, carbon credit eligibility and climate reporting for small and mid-sized manufacturers.",
  },
  {
    q: "Who writes for the journal?",
    a: "Articles are written by TheGreensolve team, including founder Ankita Patwa and the TGS editorial desk, and by invited contributors: plant managers, sustainability leads, auditors, financiers and founders writing about work they have done.",
  },
  {
    q: "How can I contribute an article?",
    a: "Use the contributor form on this page or email info@thegreensolve.com with a working title and your argument in three lines. Pieces run 800–1,200 words and are published under your name with a link to your work.",
  },
  {
    q: "Is the journal's content legal or regulatory advice?",
    a: "No. Articles are practical guidance based on cited rules and methodologies. Always confirm applicability, thresholds and deadlines for your own company and facilities before filing.",
  },
  {
    q: "How do articles relate to the Baseline platform?",
    a: "The journal explains the thinking; the Baseline platform puts it into practice with a GHG inventory, baseline calculator, project screening for credit pathways and TGS expert review.",
  },
];

export const SITE = "https://thegreensolve.com";
