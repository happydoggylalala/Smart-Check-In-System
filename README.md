# Smart Check-In System (Multi-Event Management Platform)

A pure front-end (no backend server) event check-in management platform for enterprises. It can manage multiple events at once, with each event independently configuring its check-in rules, grouping, and four modular features: materials / early bird rewards / lottery / survey. Data is stored in the browser's localStorage.

The interface style and navigation structure were redesigned from reference of a multi-event check-in platform sample site, rebuilt as a pure front-end version with no login and no backend.

## Feature Overview

- **Event Management**: Create/browse/cancel/delete events. Each event can configure basic info (name, organizer, time, location, type, format), the participant roster (mock roster or CSV upload), whether grouping is needed, and which modular features to enable (materials/survey/early bird/lottery).
- **Smart Check-In**: After selecting an event, enter the check-in workbench, where you can switch between "Check-in/Check-out" mode and "Card/Manual" mode.
  - Card mode supports a **USB card reader (keyboard-emulation input)**: after a scan, it matches the employee ID precisely and completes check-in/check-out instantly; quick simulation buttons are also provided for demos without a physical reader.
  - Manual mode lets you search by name/employee ID, check in/out manually, and supports on-site walk-in registration for people not on the roster.
  - Check-in/check-out status rules: checking in within 15 minutes of the event start = **on time**; 15–30 minutes = **late**; more than 30 minutes = **check-in blocked by the system** and treated as absent; checking out within 30 minutes before the event ends = **early leave** (an independent, stackable flag).
  - A live feed shows the most recent check-in/check-out records in real time.
- **Reports**: Real-time attendance statistics per event (expected/checked-in/needs follow-up/attendance rate) plus a filterable (department/group/status) full roster, with leave marking and CSV export.
- **History**: Read-only check-in records for ended/cancelled events.
- **Materials Management**: Each event can have its own list of material links added freely.
- **Early Bird Rewards**: The earliest N registrants qualify, but only those who **check in on time** actually receive early-bird status — anyone late, absent, or not yet checked in loses it even if they were within the top N, and the slot is not backfilled by the next person in line.
- **Event Lottery**: Draw winners on the spot from checked-in attendees, with an option to exclude previous winners, and a persisted winner history.
- **Survey Sending**: Once a survey link is set, send it to all checked-in attendees with one click (actually emails if EmailJS is configured for that event, otherwise simulates sending and logs the status).
- **Multi-language Support**: Instantly switch between Traditional Chinese / English / Simplified Chinese / Japanese from the top-right corner, applied immediately across the whole app including dynamic content.

## Getting Started

Because this project uses ES modules (`<script type="module">`), **you cannot open `index.html` directly in the browser via `file://`** — it will be blocked by module-loading CORS restrictions. Use any install-free static server instead:

```bash
npx serve .
# or
python -m http.server 8000
```

Then open the URL it prints in your browser.

## Usage Flow

1. On the **Event Management** page, click "Create Event": fill in the basic info, choose a "mock roster" for a quick demo or upload a CSV (suggested columns: `employee_id, name, department, email`; you can test with the `sample-roster.csv` file included in the project), enable grouping and modular features as needed, then submit.
2. On the **Smart Check-In** page, select the event you just created, enter the check-in workbench, and check people in/out via card or manual mode.
3. Check attendance in real time on the **Reports** page; once the event has ended, view the read-only record on the **History** page.
4. Depending on which features are enabled for the event, the sidebar dynamically shows **Materials Management** / **Early Bird Rewards** / **Event Lottery** / **Survey Sending**.

## EmailJS Setup (Survey Sending / Handout Emails)

1. Sign up for a free account at [emailjs.com](https://www.emailjs.com/) and create an Email Service and Template.
2. The template should include these variables: `to_email`, `to_name`, `event_name`, `handout_link`, `group_seat`.
3. On the **Survey Sending** page, fill in the Service ID / Template ID / Public Key in the "Email Delivery Settings" section and enable it; use "Send test email to myself" to confirm the setup works.
4. If it's not configured or sending fails, the survey-sending flow still completes normally (treated as a simulated send) — it never gets stuck.

## Key Design Decisions

- **Pure front-end, no login, no backend**: the logged-in user avatar (Winnie Chen), the "System connection normal · LMS · Email · RFID" status in the bottom-left corner, and the "Select from LMS" course list are all **decorative placeholder data** (`js/mockOrg.js`) and do not represent any real integration.
- **Single-device assumption**: localStorage only exists in a single browser and does not sync across devices.
- **Late check-in is hard-blocked**: after 30 minutes (configurable) past the event start, the system no longer allows check-in and treats the person as absent — this is a deliberate rule.
- **Early-bird slots are not backfilled**: early-bird eligibility only depends on registration order; if someone in the top N doesn't check in on time, their slot is not passed down to the next person.
- **Seat overflow never blocks check-in**: group seating is an auxiliary feature assigned round-robin; exceeding the planned headcount only shows a warning badge and never blocks check-in. The only rules that can block check-in are the late-check-in cutoff above and the event capacity cap for on-site walk-ins.
- **Materials/Survey are interface-level features**: materials only store a title/link/description, with no real file upload; survey "sending" simulates by default (no email sent) — an event actually sends real emails only when EmailJS is explicitly configured and enabled for it.
- **CSV import always reads as UTF-8 plain text**: this avoids browser-side libraries mis-detecting the encoding of a BOM-less CSV file and mangling Chinese characters (`.xlsx`/`.xls` are binary formats and are unaffected, so they keep their original read path).

## Project Structure

```
index.html                Sidebar layout shell; loads CDN dependencies and js/app.js
css/style.css               Layout and styles (sidebar, event cards, check-in workbench, tables, etc.)
js/
  app.js                     Entry point; wires up each screen module and re-renders on language switch
  state.js                    localStorage read/write (the single access point), schemaVersion 2
  models.js                    Data model factory functions (event, person)
  eventsStore.js                Event CRUD and status resolution (ongoing/upcoming/ended/cancelled)
  session.js                     In-memory currently-selected event / check-in workbench mode
  mockOrg.js                      Decorative placeholder data (user avatar, connection status, mock LMS courses)
  i18n.js                          Four-language translation dictionary and core functions
  utils.js                         Shared utility functions
  sidebar.js / topHeader.js         Sidebar navigation (with dynamic feature items) / top bar (language, avatar)
  eventPicker.js                     Shared event search/filter/card-rendering component
  eventsScreen.js                     Event management page (list, create-event wizard)
  importRoster.js                     Pure CSV/Excel import functions
  demoData.js                         Mock roster generator
  grouping.js                          Group seat assignment algorithm
  earlybird.js                         Early-bird eligibility logic
  checkinLogic.js                      Core check-in/check-out state machine (pure logic)
  checkinScreen.js                     Smart check-in workbench screen
  waitlist.js                          On-site walk-in logic
  email.js                             EmailJS sending (handouts / survey)
  rosterTable.js                       Shared roster table for reports/history
  reportsScreen.js                     Reports page
  historyScreen.js                     History page
  materialsScreen.js                   Materials management page
  lotteryScreen.js                     Event lottery page
  surveyScreen.js                      Survey sending page
  exportData.js                        CSV/Excel export
sample-roster.csv         Sample roster for testing (employee_id, name, department, email)
```
