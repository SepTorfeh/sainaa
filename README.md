# For Sainaa 💌

A small, reusable home for cute invitations and questions.

## Current invitation

`invites/table-tennis/` asks Sainaa to play table tennis on Friday, 14 August 2026 at 7:00 PM (Australia/Sydney).

The page is mobile-friendly, has a playful dodging “No” button, lets her genuinely choose “another time” after a few tries, celebrates a “Yes,” offers an `.ics` calendar download, and opens a pre-filled WhatsApp reply.

## Preview locally

From this folder, run:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Add another invitation

1. Copy `invites/table-tennis/` to a new folder, such as `invites/movie-night/`.
2. Edit the words and date in its `index.html`.
3. If needed, copy and adapt `assets/invitation.js` or move invitation details into a small config object.
4. Add a link from the root `index.html`.

## Publishing

This is a dependency-free static site, so it can be hosted free on GitHub Pages, Cloudflare Pages, Netlify, or Vercel. GitHub Pages is the simplest first home if you already use GitHub.

Static hosting cannot privately record her answer by itself. The current version uses WhatsApp for the reply. A later version can add a tiny database/API (for example Supabase) without redesigning the page.
