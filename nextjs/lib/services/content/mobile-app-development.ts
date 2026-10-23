import { type ServiceContent, pending } from "../types";

export const mobileAppDevelopment: ServiceContent = {
  slug: "mobile-app-development",
  keywordPhrase: "Mobile App Development",
  navLabel: "Mobile App Development",
  title: "Mobile App Development | iOS & Android | Pixorama",
  metaDescription:
    "From written specification to a signed build in both stores. Native Swift and Kotlin or cross-platform React Native and Flutter, offline-first and tablet-ready.",
  h1: "Mobile App Development: Specification to Signed Build",
  eyebrow: "Capability",

  openingAnswer:
    "Mobile App Development is how Pixorama takes a mobile product from written specification to a signed build in both app stores — native in Swift and Kotlin, or cross-platform in React Native or Flutter. It is for enterprises and funded startups shipping to iOS and Android. Every app ships offline-first, with proper tablet layouts.",

  proofLine: pending(
    "No existing client reference covers mobile. The five clients named on the site are platform, education, web and SEO work. Confirm whether there is a shipped mobile app Pixorama can name, or app store listings it can point to. If not, this page should lead on the engineering specifics, which are concrete and differentiating, rather than on a proof claim it cannot support.",
  ),
  proofLineFallback:
    "From written specification to a signed build in both stores — laid out properly for tablets rather than stretched.",

  included: [
    { label: "Native builds", detail: "Swift for iOS, Kotlin for Android, where platform depth matters." },
    {
      label: "Cross-platform builds",
      detail: "React Native or Flutter, where one codebase serves both well.",
    },
    { label: "Tablet layouts", detail: "Laid out properly for tablets, not stretched phone screens." },
    {
      label: "Offline-first data",
      detail: "Local persistence and sync that behaves on a bad connection.",
    },
    { label: "Push notifications", detail: "Setup, segmentation and delivery handling." },
    {
      label: "Deep links",
      detail: "Universal links and app links, wired to the right in-app destination.",
    },
    {
      label: "In-app payments",
      detail: "Store billing or payment provider integration where needed.",
    },
    {
      label: "Store submission",
      detail: "Signed builds, store listings, review handling, release management.",
    },
    { label: "Handover", detail: "Full ownership of code, signing assets and documentation." },
  ],

  timelines: [
    "Production increment inside the first fortnight, senior-led from day one.",
    "Store review time sits with Apple and Google — we plan around it rather than promise through it.",
  ],

  engagementModels: [
    {
      model: "Outcome-based project",
      fits: "The common fit for a defined app build. Milestone-based commercials.",
    },
    { model: "Dedicated squad", fits: "A continuous mobile roadmap." },
    {
      model: "Specialist augmentation",
      fits: "An in-house team needing one mobile capability.",
    },
    { model: "Advisory & architecture", fits: "A review of an existing app." },
  ],

  caseStudy: pending(
    "Any named mobile engagement, app store listing, or client willing to be referenced. This page has the weakest proof position of the five.",
  ),
  namedExpert: pending("Named mobile engineer with credentials."),

  costDrivers: [
    {
      label: "Native or cross-platform",
      detail: "And whether both platforms are in scope.",
    },
    {
      label: "Feature depth",
      detail: "Offline sync, payments and background work each carry real weight.",
    },
    { label: "Backend state", detail: "An existing API to build against, or one to be built." },
    { label: "Design state", detail: "Designs ready, or design work in scope." },
    {
      label: "Compliance",
      detail: "Regulated-sector requirements for data handling on device.",
    },
    {
      label: "Release management",
      detail: "One submission, or an ongoing release cadence.",
    },
  ],
  priceBand: pending(
    "Starting price or typical band. Note the published cost post already answers much of this and should be linked from the pricing section.",
  ),

  forWho: [
    "Enterprises and funded startups shipping to both iOS and Android",
    "Teams with a written specification, or ready to produce one",
    "Products needing offline-first behaviour, tablet layouts, or in-app payments done properly",
    "Teams who want the signed build, the signing assets and the code handed over",
  ],
  notForWho: [
    "Anyone wanting a prototype with no route to a store release",
    "Single-platform throwaway builds where the engagement model exceeds the need",
    "Teams wanting hourly junior capacity rather than a senior-led build",
  ],

  faq: [
    {
      q: "Do you build mobile apps for iOS and Android?",
      a: "We do. We take a mobile product from written specification to a signed build in both stores, native in Swift and Kotlin or cross-platform with React Native or Flutter. Every app is laid out properly for tablets rather than stretched, with offline-first data, push, deep links, and in-app payments where needed.",
    },
    {
      q: "Should we go native or cross-platform?",
      a: "Native when you need platform depth — heavy device APIs or demanding performance. Cross-platform when the feature set is shared and one codebase is the faster, cheaper route. We make the recommendation against your actual feature list, not a house preference.",
    },
    {
      q: "Can you take over an existing app?",
      a: "Yes. An advisory and architecture review establishes what is there and what it would take to move it forward, before any rewrite is considered.",
    },
    {
      q: "Do you handle App Store and Play Store submission?",
      a: "Yes — signed builds, store listings, review handling and release management. Store review times themselves sit with Apple and Google.",
    },
    {
      q: "Do we own the code and signing assets?",
      a: "Completely, including documentation, with handover designed in from the start.",
    },
  ],

  relatedServices: ["product-software-engineering", "ai-development-services"],
  blogLinks: [
    { href: "/blog/flutter-vs-react-native", label: "Flutter vs React Native" },
    {
      href: "/blog/shipping-mobile-on-two-platforms",
      label: "Shipping mobile on two platforms",
    },
    {
      href: "/blog/mobile-app-development-cost-usa-australia",
      label: "Mobile app development cost: USA and Australia",
    },
  ],

  lastUpdated: "2026-10-23",

  serviceType: "Mobile application development",
  audienceType: "Enterprises and funded startups",

  targetKeyword: {
    phrase: "mobile app development company",
    volumePerMonth: 3600,
    market: "US",
    blockedOn: "Gate 2 — head term, long horizon. The slug already sits inside the phrase.",
  },

  internalNotes: [
    "The cost post is the strongest asset for this page — link it from the pricing section too, since it is the question this buyer arrives with and Pixorama has already answered it in public.",
  ],
};
