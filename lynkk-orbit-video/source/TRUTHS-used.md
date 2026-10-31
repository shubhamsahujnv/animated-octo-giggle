# What Lynkk really does (the only claims a video may make)

Every claim on screen, in a title, in the UI you draw or in the caption must be in this file or in
`TRUTHS-web.md` (the feature pages' own words, verbatim). If the prompt asks for something that is not here, leave
it out and say so in your report, or ask the person. Never invent numbers, customers, testimonials or features.

Sources: the Mac brief (`design-lab/explorations/product-pages/_BRIEF-mac.md`, checked against the Swift code), the
Spotter page (`lib/seo/features/spotter.ts`) and the site's feature pages, as of 2026-10-29.

## The product in one line

Lynkk (lynkk.ai) is an AI meeting assistant. It records your calls, writes the notes (summary, decisions, action
items), lets you ask across every call, and on the Mac it also types what you say in any app.

## Lynkk for Mac

**What it is.** The Mac app does two things: it records your calls, whatever app they happen in, and it types what
you say. No bot joins anything, no calendar is needed. It lives in the menu bar. Same account as lynkk.ai; notes
made on the Mac are the same notes on lynkk.ai.

**Requirements.** Apple silicon only. macOS 14.2 or later. Not on Intel Macs (they use Lynkk in the browser). Free
to install. Signed and notarized by Apple, so it opens like any Mac app. Install is about two minutes, no Terminal.
Do not print a version number (it changes every week).

### Calls
- Notices calls in **Zoom, Google Meet (in a browser), Microsoft Teams, Slack huddles, WhatsApp, FaceTime and
  Webex**. Web calls are read from nine browsers (name at most five: Chrome, Safari, Arc, Brave, Edge).
- When a call has been steady for **3 seconds**, a dark card appears **top right**: "<App> call detected" (for
  Slack: "Slack huddle detected") with **Record** and **Not now**, and the line "Both sides are recorded on this
  Mac. Stop any time." A thin line under it drains over **30 seconds**. It never takes focus; ignore it and it goes.
- Settings, Calls: **Ask first** (default), **Automatically**, or **Off**.
- While recording, a slim **column on the right edge**: clock, source app, Pause, Stop, two levels (You, Others),
  live words, a note field. It can tuck into a small tab.
- **Both sides**: your microphone and the Mac's call audio, two channels of one file. The transcript labels your
  side "You"; others keep speaker labels ("Speaker A").
- **Nothing joins the call.** No bot in the participant list. No calendar.
- **Stops itself** when the call ends: "The call ended. Saving in 10 s." with **Keep recording**. Also stops after
  5 minutes of silence, and at the 2 hour cap per recording.
- The card and the column are hidden from screen share (best effort, macOS 15.4 and later; say so if you show it).
  The dictation island is NOT hidden.
- Audio is written to disk from the first second; upload waits for a connection and resumes. Recordings are private
  to your account; Lynkk never trains on your conversations.

### The note (made from each recording)
Title, abstract, key takeaways with timestamps, topics, action items (owner, due, priority), decisions, open
questions, transcript with speaker labels. The Meeting Brief is free; Summary Shapes and Ask are Pro.

### Dictation
- Hold a key anywhere, talk, let go; the words land where your cursor is, in any app (Slack, Mail, Notion, a
  browser, a terminal). Key: **fn** by default (or right/left option, right/left command, option+space).
- The **notch island** at the top centre shows it is listening, with the destination app's icon and name ("Slack"),
  and has Undo. It shows a padlock and refuses to listen in a password field.
- **Language:** English by default; Hinglish and Hindi opt-in. Cloud dictation hears **18 languages** (never say 20).
- **Three modes:** Instant (on your Mac, English, free), Accurate and Polished (cloud, Pro). Only **Polished**
  removes the ums and false starts. If a video shows fillers vanishing, that is Polished; don't name a price.
- Free dictation runs on your Mac, nothing sent. With a cloud mode on, the finished words are typed **once**
  (never claim "corrected in place").
- Never say "never uses the clipboard".

### The app window
Sidebar: Notes (⌘1), Ask Lynkk (⌘2), Dictation (⌘3). ⌘K finds any note. ⌘J asks. Notes have AI Summary and
Transcript tabs and an Ask Lynkk column (Pro). Do not draw a Home page (removed) or the old "wings" dictation UI.

## Spotter (Mac, early access)
- A live AI assistant at the top of your Mac screen. Press **⌘↩** and it reads your screen and the call, then tells
  you what to say next. While it works it shows **"Reading your screen"**.
- **In development, early access by request**, on Lynkk Pro. Always say "early access" when you show it.
- Never hidden from screen capture, on purpose. Hears nothing until you press Listen (your mic as Me, the Mac's
  sound as Them). Asks are not saved anywhere.
- **It does not know your past meetings.** It answers from your screen, this call and your mode's notes. If a video
  shows Spotter answering, the source must be on screen (a doc, a shared screen) or said on the call.
- Keys: ⌘↩ ask, ⌘\ show or hide the bar, ⌘⇧\ listen.

## Plans (never print a price)
Free: records and transcribes, the Meeting Brief, on-Mac Instant dictation, 2 hour cap per recording.
Pro adds cloud dictation (Accurate, Polished), custom words, dictation stats, Ask Lynkk, Summary Shapes, Spotter
(early access).

## Example content you may reuse (Remi's own lines on the site)
These are the site's worked examples, so a video can use the same people and lines:
- Meetings: a 47-minute Google Meet with **Corvane** (Corvane Logistics) becomes a summary, a key decision and the
  next step: **"Send the security overview by Friday."** People: **Priya Shah**, **Neha**, **Sam Carter**.
- Dictation: in Mail or Slack, hold fn and say "hey Sam um just wanted to check…". Sam gets **"Hey Sam, just wanted
  to check…"**, fillers gone (Polished). In Slack, say "send" and it presses Return. In a terminal, "git commit dash
  m fix the login redirect" types `git commit -m "fix the login redirect"`.
- Spotter: Priya asks how the pilot would work. Press ⌘↩ and Spotter answers: **"One team, up to 20 seats, for
  30 days."** Another: lost a number? Ask "What budget did they mention?" About $30K for this quarter, from what was
  said on this call.
- Ask Lynkk: ask "What did Corvane say about budget?" and Lynkk answers across 3 calls: $30K became $50K, with the
  sources.

## Words and names
- Product: **Lynkk** (two k). Site: **lynkk.ai**. The Mac app: **Lynkk for Mac**. CTA: **Download for Mac**.
- The robot is **Remi** (in code it is still called Dot).
- Other apps may appear only as platforms Lynkk works with (Zoom, Google Meet, Teams, Slack, Mail, Notion, Chrome).
  Draw them as generic windows labelled with the name; never copy their UI pixel for pixel, never use their logos
  except in a "works with" row. Never name a competing note taker.

## Integrations (added 2026-10-31 for the Orbit film)
Source: https://lynkk.ai/integrations, read on 2026-10-31.
- **Meeting platforms:** the notetaker records Zoom, Google Meet and Microsoft Teams. Webex, FaceTime, Slack huddles
  and WhatsApp calls are recorded by the Mac app.
- **Google Calendar:** auto-join sends the notetaker to every meeting with a Zoom, Meet or Teams link. Ask Lynkk can
  create calendar events from an answer, such as a follow-up meeting (after you confirm).
- **CRM:** each call's summary, next steps and tasks are logged on the deal: HubSpot (deal activity timeline),
  Salesforce (Opportunity), Pipedrive (notes and activities on the deal), Attio (deal record), Zoho CRM (notes and
  tasks on the Deal). CRM setup is handled with Lynkk's sales team, and CRM logging is priced separately (never print
  a price).
- **Slack:** mention @Lynkk in a thread to get an answer drawn from your meeting notes.
- **Tagline on that page:** "Meeting memory for teams."
- Not yet supported: Outlook, Notion, Linear, Asana (do not show them as integrations).
