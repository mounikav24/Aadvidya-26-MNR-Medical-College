# AADVIDYA’26 — MNR Medical College Fest Website

A responsive, single-page website starter for the AADVIDYA’26 medical college fest. Built with plain HTML, CSS, and JavaScript; no framework or package install is needed.

## Run it in VS Code

1. Extract `aadvidya26-site.zip` (if you downloaded the ZIP) and open the `aadvidya26-site` folder in VS Code.
2. Open `index.html` in a browser, or install the **Live Server** extension and select **Go Live**.
3. Edit `index.html`, `styles.css`, and `script.js` to customize the site. Save changes and refresh if you're opening the file directly; Live Server refreshes automatically.

## What's included

- Responsive desktop, tablet, and mobile layouts.
- Sticky navigation and mobile menu.
- Medical-inspired palette, anniversary motif, CSS motion, reduced-motion support, and abstract medical illustrations.
- Countdown component that stays in announcement mode until a real date is configured.
- Interactive sample event schedule with day/category/time filters.
- Calendar `.ics` download functions that activate when the official date is entered.
- Individual/team registration preview, generated local ID, and downloadable text confirmation.
- Speaker and organizing committee placeholder cards.
- Feedback form with anonymous option.

## Required before production

This is a front-end starter, not a live registration service. The displayed schedule is **illustrative** and should be replaced with approved event titles, times, locations, and rules. The official dates, complete venue, logos, videos, speaker names, committee members, and contact/social links were not supplied and therefore remain placeholders.

In `script.js`, set `FEST_CONFIG.startDate` to the approved event start date/time, including the India offset, for example `2026-12-01T09:00:00+05:30` (example only; do not use unless confirmed). Then replace the `EVENTS` array with the published schedule.

Before publishing, also:

- Connect registration and feedback forms to a secured backend/API, add server-side validation, and implement a privacy notice and retention policy.
- Integrate an approved payment provider and official QR/UPI details only after verification. No payment is collected by this demo.
- Replace the abstract campus/guest placeholders with authorized college photos, logo assets, videos, and confirmed names.
- Add official addresses, phone/email, venue details, social links, accessibility checks, and production hosting configuration.
- Test the production website on actual mobile devices and across current browsers.

## Project files

- `index.html` — page structure and content
- `styles.css` — responsive visual design and animations
- `script.js` — interactive behavior and illustrative schedule data
