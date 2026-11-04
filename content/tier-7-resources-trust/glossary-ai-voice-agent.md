# /resources/glossary/ai-voice-agent

| Field | Value |
|---|---|
| Primary keyword | what is an ai voice agent (110 / SD 37) |
| Secondary keywords | ai voice agent (6,600 / SD 40), what is an ai receptionist (50 / SD 18), how do ai voice agents work, ai voice agent vs ivr, ai voice agent examples |
| Title tag | What Is an AI Voice Agent? Definition, How It Works, Examples |
| Meta description | An AI voice agent is software that holds natural phone conversations and takes actions like booking appointments. How they work, what they do and where they fall short. |
| H1 | What is an AI voice agent? |
| Schema | `DefinedTerm` (inDefinedTermSet: /resources/glossary) + `Article` + `FAQPage` + `BreadcrumbList` |
| Target length | ~1,100 words |

---

## Page copy

### H1: What is an AI voice agent?

> **An AI voice agent is software that holds a natural spoken conversation, usually over the phone. It listens to what a caller says, works out what they want, replies in a human-sounding voice, and can take actions such as booking an appointment, looking up an order or transferring the call to a person.**

Unlike a traditional phone menu ("press 1 for sales"), an AI voice agent understands open-ended speech and responds to what the caller actually said.

---

### H2: How an AI voice agent works

Every turn of the conversation runs through the same loop, usually in under a second:

1. **Listen: speech-to-text (STT).** The caller's audio is transcribed into text as they speak.
2. **Understand and decide: a large language model (LLM).** The model reads the transcript and conversation history and decides what to do: answer, ask a clarifying question, or take an action.
3. **Look things up: retrieval (RAG).** For factual answers, the agent searches the business's own knowledge, such as FAQs, policies and product data, so the answer is grounded rather than invented. [What is RAG? →](/blog/what-is-rag-in-ai)
4. **Act: tools and integrations.** The agent calls a calendar, CRM or order system to book, check or update something.
5. **Speak: text-to-speech (TTS).** The reply is turned into natural speech and played to the caller.

Around that loop sit **guardrails** (rules on what the agent may and may not say or do), **hand-off rules** (when to transfer to a person) and **logging** (a record of every call for review).

---

### H2: AI voice agent vs IVR vs answering service

| | IVR / phone menu | Human answering service | AI voice agent |
|---|---|---|---|
| Understands open speech | ✗ (keypad or keywords) | ✓ | ✓ |
| Available 24/7 | ✓ | Often | ✓ |
| Takes actions (book, look up) | Limited | Sometimes | ✓ |
| Handles many calls at once | ✓ | Limited by staff | ✓ |
| Knows your business in detail | ✗ | Script only | ✓ (from your knowledge base) |
| Handles complex or emotional calls | ✗ | ✓ | Should hand off |
| Cost model | Fixed | Per call or per minute | Per minute |

More on this comparison: [AI receptionist vs answering service](/blog/ai-answering-service-vs-human-receptionist).

---

### H2: What AI voice agents are used for

- **AI receptionists** for small businesses: answering, booking and taking messages ([small business](/products/pxo-ai/use-cases/small-business))
- **Appointment booking** for clinics and dental practices ([healthcare](/products/pxo-ai/use-cases/healthcare))
- **Reservations and phone orders** for restaurants ([restaurants](/products/pxo-ai/use-cases/restaurants))
- **Lead qualification** for real estate agents ([real estate](/products/pxo-ai/use-cases/real-estate))
- **Tier-1 customer support** such as order status, account questions and returns ([customer service](/products/pxo-ai/use-cases/customer-service))
- **Outbound calls** for reminders, follow-ups and surveys ([outbound](/products/pxo-ai/use-cases/outbound))

---

### H2: What is an AI receptionist?

An **AI receptionist** is an AI voice agent set up to do a receptionist's phone job: greeting callers, answering common questions, booking appointments, taking messages and routing calls. It's the most common use of AI voice agents in small businesses.

---

### H2: Where AI voice agents fall short

AI voice agents are good at routine, well-defined calls. They're weaker at:

- **Complex, emotional or high-stakes conversations.** These should go to a person.
- **Very noisy lines and strong accents in unsupported languages.** Speech recognition still makes mistakes.
- **Questions not covered by the knowledge base.** A good agent says "I don't know" and takes a message, while a bad one makes something up.
- **Situations needing judgement or authority**, such as negotiating, making exceptions or giving professional advice.

The best deployments use AI for the routine majority and hand everything else to people, with context.

---

### H2: What to look for when choosing one

1. **Latency.** Does it respond quickly enough to feel natural?
2. **Grounding.** Does it answer from your content, and admit when it doesn't know?
3. **Integrations.** Can it actually book, look up and update in your systems?
4. **Hand-off.** Can callers always reach a person, with context passed along?
5. **Visibility.** Can you see every call's transcript, sources and actions?
6. **Compliance.** Does it disclose that it's AI? Does it support consent and calling rules for outbound?
7. **All-in pricing.** Is the per-minute price all-in? [How to compare quotes →](/products/pxo-ai/pricing)

We compare the main platforms, including our own, in [the best AI voice agents](/compare/best-ai-voice-agents).

---

### H2: Frequently asked questions

**Are AI voice agents legal?**
Generally yes for inbound calls. Outbound calls using AI voices are regulated in many countries. In the US, for example, the FCC treats AI-generated voices as "artificial" under the TCPA, so consent rules apply. [Outbound compliance →](/products/pxo-ai/use-cases/outbound)

**Do callers know they're talking to AI?**
They should. Good practice, and in some places the law, is for the agent to say it's an AI at the start of the call.

**How much does an AI voice agent cost?**
Most are priced per minute, sometimes with a monthly platform fee. [See how pricing works](/products/pxo-ai/pricing) or [estimate your ROI](/resources/ai-voice-agent-roi-calculator).

**Can an AI voice agent replace a receptionist?**
It can take over most routine calls. Many businesses use it alongside staff, for overflow, after hours and peak times.

**What's the difference between an AI voice agent and a chatbot?**
A chatbot works in text. A voice agent works in speech, which adds speech recognition, voice synthesis and much tighter latency requirements. Many platforms, including PXO AI, run the same agent on both.

---

### Related
[AI and software engineering glossary](/resources/glossary) · [PXO AI: the AI voice agent platform](/products/pxo-ai) · [How to build an AI agent](/blog/how-to-build-an-ai-agent)

---

## Internal links
- Out to: all PXO AI use-case pages, `/products/pxo-ai`, `/products/pxo-ai/pricing`, `/compare/best-ai-voice-agents`, `/resources/ai-voice-agent-roi-calculator`, `/blog/what-is-rag-in-ai`, `/blog/ai-answering-service-vs-human-receptionist`
- In from: `/resources/glossary`, `/products/pxo-ai` FAQ, `/products/pxo-ai/use-cases/small-business` FAQ, `/blog/ai-agents-for-business-use-cases`

## Writer notes
- The blockquoted definition at the top is the snippet target. Keep it to about 50 words, in plain language, and repeat "AI voice agent" once.
