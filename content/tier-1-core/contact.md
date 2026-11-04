# /contact

| Field | Value |
|---|---|
| Primary keyword | contact Pixorama (branded) |
| Secondary keywords | book a discovery call, hire ai developers, software development consultation |
| Title tag | Contact Pixorama: Book a Discovery Call |
| Meta description | Tell us what you're building. We reply within one business day, and discovery calls are free, with no obligation. Specialists can usually start within two weeks. |
| H1 | Tell us what you're building |
| Schema | `ContactPage` + `Organization` with `contactPoint` (contactType: sales; areaServed: IN, US, AU; availableLanguage: en). **No `LocalBusiness`, no street address.** |
| Target length | ~450 words. This is a conversion page, so keep it short. |

---

## Page copy

### H1: Tell us what you're building

Share a few lines about your project and we'll come back within one business day `[[CONFIRM: response SLA]]` with either a time for a discovery call or a couple of questions.

The first call is free and comes with no obligation. You'll talk to a senior engineer, not a salesperson. There's no account manager layer.

---

### Form (keep fields as they are today)

- **Name**
- **Work email**
- **Company**
- **How would you like to work with us?** (dropdown)
  - Outcome-based project
  - Dedicated squad
  - Specialist augmentation
  - Advisory & architecture
  - Not sure yet
- **What are you building?** (textarea; placeholder: *"A sentence or two is plenty: what it does, who uses it, and any deadline."*)
- **[Send message]**

Microcopy under the button: *We'll only use your details to reply to this enquiry. [Privacy policy](/privacy).*

---

### H2: Prefer to talk now?

- **WhatsApp:** [+91 96826 35763](https://wa.me/919682635763)
- **Email:** [contact@pixoramagroup.com](mailto:contact@pixoramagroup.com)
- **Book directly:** `[[ADD: Calendly or Cal.com link]]`

---

### H2: What happens next

1. **We reply within one business day** with a time for a call or a couple of clarifying questions.
2. **A 30-minute discovery call** with a senior engineer. We'll talk through the problem, constraints and timing, and tell you honestly if we're not the right fit.
3. **A short written proposal**: usually a fixed-price discovery, or a team proposal if you need augmentation or a squad.
4. **Kick-off.** Specialists can usually start within about two weeks, and a full squad within three to four.

---

### H2: Where we work

We're remote-first and work with clients across three primary markets:

- **India:** IST working hours
- **USA:** overlapping hours with US East Coast mornings and West Coast `[[CONFIRM: actual overlap offered]]`
- **Australia:** strong overlap with AEST/AEDT business hours

We don't operate client-facing offices, so all meetings are on video.

---

### H2: Quick answers

**Do you sign NDAs?** Yes, before the first detailed conversation if you'd like.
**Do you work with early-stage startups?** Yes, with funded startups.
**What's the minimum engagement?** `[[ADD: minimum size or duration, or remove this question]]`

---

### Trust strip

Trustpilot rating widget · "100% code and IP ownership" · "Senior-led delivery"

---

## Internal links

- Out to: `/process`, `/engagement-models`, `/privacy`
- In from: every page's primary CTA

## Writer notes

- Replaces `/#contact`. Point every "Book a discovery call" button here.
- The live site hides contact@pixoramagroup.com behind Cloudflare email obfuscation, so search engines and users without JavaScript see "[email protected]". Turn off Email Address Obfuscation in Cloudflare (Scrape Shield), or exclude the contact page from it, so the address appears as plain text.
- Pass the engagement-model dropdown value to the CRM. It tells you which model pages are converting.
