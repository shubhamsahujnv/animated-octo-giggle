# What Lynkk really does (write only from this)

Last checked against the product: **2026-09-29**. Every claim on a post must be
in this file. If something you want to say is not here, it is not a claim yet:
ask the Lynkk team before you write it. The "Don't claim" lists are hard rules
and `scripts/check.mjs` enforces the common ones.

Lynkk is an AI meeting assistant. It records your meetings, writes the notes,
pulls out the tasks, and lets you ask questions across everything you've
recorded. Site: **lynkk.ai**.

## Ways to record

| Way | What is true |
|---|---|
| **Mac app** (menu bar) | Notices calls in Zoom, Google Meet (in a browser), Microsoft Teams, Slack huddles, WhatsApp, FaceTime and Webex. A card top right says "<App> call detected" with **Record** and **Not now**. **No bot joins the call.** Records both sides on two channels, so the transcript labels your side "You". While recording, a slim column on the right edge of the screen shows the clock, Pause, Stop, two levels (you and others), live words and a note field. Stops itself when the call ends ("The call ended. Saving in 10 s."), after 5 minutes of silence, or at the 2 hour cap. The card and the column are hidden from screen share (best effort, macOS 15.4 and later). Writes audio to disk from the first second; bad Wi-Fi or sleep does not lose the file, the upload resumes. Apple silicon only, macOS 14.2 or later, free to install. |
| **Meeting bot** | Joins Google Meet, Zoom and Teams links: paste a link, or turn on calendar auto-join. Free, audio only. Video recording is Pro. Live transcript panel during the meeting. |
| **Chrome extension** | Live in the Chrome Web Store. Records a call in a Chrome tab on Google Meet, Zoom (web client) and Teams. **No bot**: a small capsule docks above the call controls; press Record. That tab's audio and your mic on two channels. Audio only. Works in Chrome and Chromium browsers from the Chrome Web Store (Edge, Brave, Arc). |
| **Web** | Record your mic in the browser at lynkk.ai, with countdown, pause and a silence warning. Works for an in-person meeting. |

**No phone.** No iPhone, Android, iOS or mobile app. Not in copy, not in mockups.

## The note (every recording)

- **Transcript** with speaker labels. **17 languages**: English, Hindi, Spanish,
  French, German, Portuguese, Italian, Dutch, Japanese, Chinese, Korean, Arabic,
  Russian, plus Tamil, Telugu, Marathi and Bengali in beta. Auto-detect. A
  dictionary of custom words. Say "17 languages" or "17 languages, four in beta".
- **Meeting Brief** (free): title, abstract, key takeaways with timestamps,
  topics, action items (owner, due date, priority), decisions with context,
  open questions. Every timestamp plays the recording from that moment.
- **Summary Shapes** (Pro): 9 built in: General Meeting, Daily Stand-up, Product
  Review, Engineering Design, Sales Call, Customer Interview, 1:1, Board
  Meeting, Brainstorm. Every version is kept.
- **Per-note chat** (Pro): "Ask anything about this note".
- **Share**: a revocable public link, or invite by email as a viewer. The
  summary is emailed to you after every meeting, and to attendees if you opt in.

## Before the meeting

- With Google Calendar connected: a **morning briefing email** on days you have
  meetings. For each meeting: who you're meeting, the most recent note with
  those people, and how many action items are still open between you.

## Tasks

- Kanban or list: open, in progress, in review, done. Due dates, priority, add
  by hand.
- **Jira**: "Send" from the note, one issue per action item, pick the project
  and issue type. **Manual, not automatic.**

## Ask Lynkk (Pro)

- A chat that answers **only from your own notes**. Finds notes by person,
  company or project; lists open tasks and decisions. Answers carry citation
  chips; evidence opens the note at the moment ("Play from 12:04").
- Attach a PDF, Word, text, Markdown or CSV file.
- Actions from chat, each behind a confirm card: create a Google Calendar event
  with a Meet link, share a note, mark a task done, rename or retag a note,
  create a Jira issue, create an Outlook event.
- Search: meaning and keyword together.
- Behind it (explain, never show as a screen): Lynkk links notes that mention
  the same people, companies and projects.

## Lynkk for Slack (answers need Pro)

- DM the Lynkk app, `@Lynkk` in a channel (answers in a thread), or
  `/lynkk <question>` (only you see it). Answers from **your** Lynkk notes, with
  sources and an "Open in Lynkk" button.
- It does **not** read your channels. It does not post summaries.

## Dictation (Mac app)

- Hold a key anywhere (fn by default), talk, let go: the words land where your
  cursor is, in any app. The notch island shows it is listening and which app
  the words go to. It refuses to listen in a password field.
- English by default; Hinglish and Hindi opt in. Cloud dictation hears **18
  languages**. Never say 20.
- Modes: **Instant** (on your Mac, English, free), **Accurate** and
  **Polished** (cloud, Pro). Only Polished removes ums and false starts.

## Workspaces (teams)

- A company workspace for **up to 10 seats**. Owner, admin, member. Invite by
  email, or colleagues with the company email domain join by domain.
- **Everyone in the workspace gets Pro.**
- Each note is "Admins can see this note" (the default) or **Personal** (only
  you). Admins can read workspace-visible notes; recordings stay with the
  owner; every admin read is logged.
- The honest pitch: everyone gets Pro, the company keeps the record, people
  choose what is personal.

## Privacy

- Recordings are private to your account. **Lynkk never trains on your
  conversations.**

## Plans (never print a price)

- **Free**: recording and transcription, the meeting bot (audio only), the
  Meeting Brief, tasks, Jira send, Instant dictation on the Mac, 2 hour cap per
  recording.
- **Pro** adds: Ask Lynkk, Summary Shapes, per-note chat, weekly digest, video
  recording from the bot, Slack answers, cloud dictation, custom words.
- Say "Start free", "Try it free", "Free plan". There is **no free trial**.
- Plan limits are being reworked: do not state note limits, hours or
  "unlimited" on a post.

## Numbers you may use

| Number | Meaning |
|---|---|
| 17 | transcription languages (13 + 4 in beta) |
| 18 | Mac cloud dictation languages |
| 2 h | cap per recording, every plan |
| 10 | seats in a workspace |
| 9 | built-in Summary Shapes |
| 3 s / 30 s | Mac call card appears after 3 s of a steady call; its line drains over 30 s |
| 10 s | "The call ended. Saving in 10 s." |
| 5 min | Mac recording stops after 5 minutes of silence |

Nothing else. No accuracy %, no speed claims ("notes in 30 seconds"), no user
counts, no ratings.

## Don't claim (hard rules)

- A bot or AI that **speaks** in the meeting, answers out loud, or answers
  during the call.
- **CRM** anything (Salesforce, HubSpot). Asana, Linear, Notion or Slack task
  sync. Automatic Jira.
- **Regions**, data residency, "your data stays in your country".
- SOC 2, HIPAA, ISO, AES-256, "GDPR compliant", end-to-end encryption (not
  verified).
- A knowledge graph screen, "traversing the graph", team-wide memory, answers
  from teammates' notes, SSO, an audit log screen, more than 10 seats.
- Phones, iPad, Android, App Store, Play Store. Intel Macs, Windows, Linux.
- Accuracy percentages, "offline-first" (only the Mac upload survives bad
  Wi-Fi; there is no offline web recording), uploading existing audio files,
  renaming speakers, custom Summary Shapes.
- Customers, logos, testimonials, quotes, ratings, or install counts that are
  not real and approved.
- A free trial.

## Competitors

Do not name competitors on posts. Compare against "a typical notetaker" or "most
notetakers", describe only what is generally true of the category, and keep that
side in the second ink. If the Lynkk team asks for a named comparison, they
supply the facts about the other product with a source, and the file adds
`<meta name="lynkk-allow" content="competitors">` so the checker allows it.
