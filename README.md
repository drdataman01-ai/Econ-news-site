# MeridianDesk

A static economic-news site: front page, four desks (S&P 500, US, Asian,
Tech Stocks outlook), a three-tier membership paywall, and a
"macroeconomic reasoning" panel with a textbook-style graph on
qualifying stories.

The site itself is pure HTML/CSS/JS with no build step and no backend.
Content lives in one JSON file, separate from the code, so it can be
swapped out weekly without touching anything else.

## Folder structure

```
econ-news-site/
├── index.html              The public site
├── README.md                This file
├── assets/
│   ├── css/
│   │   └── styles.css       All styling
│   └── js/
│       ├── config.js         Sections + membership tiers (edit prices here)
│       ├── theories.js       Library of macro theories + their SVG graphs
│       ├── content.js        Fetches content/articles.json, tracks membership
│       ├── utils.js          Small shared helpers (HTML escaping)
│       ├── render.js         Turns state + content into HTML
│       └── app.js            Navigation and click handlers
├── content/
│   ├── articles.json         THIS WEEK'S CONTENT — replace this weekly
│   └── schema.md             Field-by-field documentation of articles.json
└── admin/
    ├── index.html            Newsroom desk: a local tool for preparing next week's JSON
    └── admin.js
```

## How the weekly update works

`index.html` never contains article text. On load, `content.js` fetches
`content/articles.json` and everything else on the page — the front
page, the four desks, article pages, paywalls, theory panels — is
rendered from whatever is in that file.

To publish a new week:

1. Open `admin/index.html` in a browser (double-click it, or serve the
   folder — either works, since the admin tool doesn't fetch anything
   itself).
2. Load the current `content/articles.json`, or start blank.
3. Add/edit/delete stories, set "Week of," and click **Download
   articles.json**.
4. Replace `content/articles.json` in this folder with the download.
5. Redeploy the site (upload the folder, `git push`, etc.).

See `content/schema.md` for the exact JSON fields, including how to
attach a macroeconomic theory (and its graph) to a story.

## Running the public site locally

Fetching a local JSON file only works when the page is served over
`http://`, not opened directly from disk (`file://`) — browsers block
that fetch for security reasons. From inside `econ-news-site/`, run
one of:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit `http://localhost:8080`.

## Wiring up a real backend later

Everything content-related funnels through `loadData()` in
`assets/js/content.js`. To move from a static JSON file to a real CMS
or database, replace the `fetch(CONTENT_URL, ...)` call in that one
function with an API call that returns the same `{week_of, articles}`
shape — nothing else in the site needs to change.

Membership selection is stored in the visitor's browser
(`localStorage`), not on a server — there's no real payment
processing or account system here. Add authentication, a real
subscription backend, and access control on the article data itself
(the client currently receives full article text and merely hides it
in the UI) before handling paying subscribers for real.
