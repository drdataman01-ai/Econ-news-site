# Outlook chart, extended to Japan / Taiwan / Southeast Asia / Tech

This delivers two things: (1) the 4-horizon color-coded forecast chart
feature (previously S&P 500-only) generalized so it works on all five
outlook desks, and (2) four new full outlook analysis articles — Japan,
Taiwan, Southeast Asia, and Tech — written in that same style.

## What's in this folder

- **`new_articles/`** — the four new articles as plain, standalone
  `.json` files. Each file is exactly one article object (the same
  shape as an entry in `content/articles.json`'s `"articles"` array).
  Open any of these directly to read the article data — no code
  required.
  - `new-article-a63-japan.json`
  - `new-article-a64-taiwan.json`
  - `new-article-a65-sea.json`
  - `new-article-a66-tech.json`

- **`modified_files/`** — full, plain copies of every file that
  changed, at the same relative path as in the GitHub repo. Use these
  to directly replace the matching files in your repo:
  - `assets/js/config.js` — renamed `SP500_OUTLOOK_LEVELS` to
    `OUTLOOK_LEVELS` (shared across all 5 desks instead of sp500-only).
  - `assets/js/charts.js` — renamed `renderSP500OutlookChart` to
    `renderOutlookChart(article)`, now reads a generic `article.outlook`
    field and titles the chart dynamically by section.
  - `assets/js/render.js` — updated wiring so any article on
    `sp500`/`japan`/`taiwan`/`sea`/`tech` with an `outlook` field shows
    the forecast chart.
  - `content/articles.json` — the full content file, including the
    four new articles already added (plus the S&P 500 article's field
    renamed from `sp500Outlook` to `outlook`). This is the file you'd
    replace in the repo to get everything at once.
  - `content/schema.md` — documentation for the generalized `outlook`
    field.
  - `workflows/validate-articles.yml` — the GitHub Actions validator,
    updated to check the `outlook` field across all 5 desks.
  - `skills/japan-outlook-daily.md`, `skills/taiwan-outlook-daily.md`,
    `skills/southeast-asia-outlook-daily.md`,
    `skills/tech-outlook-daily.md` — each now documents both the
    existing 120-180 word daily post and this new "full outlook post"
    format.

- **`outlook-all-desks.patch`** — a git patch of the same change, for
  reference or for applying with `git am` if you prefer that over
  copying files directly.

- **`screenshots/`** — smoke-test screenshots of each new article as
  rendered by the live site (forecast chart, color strip, and full
  article text), confirming everything renders correctly.

## How to use this

**Easiest path**: replace `content/articles.json`,
`assets/js/config.js`, `assets/js/charts.js`, `assets/js/render.js`,
`content/schema.md`, and `workflows/validate-articles.yml` in your repo
with the matching files from `modified_files/`, and replace the four
skill files in `skills/`. That's everything — the new articles are
already included in the `articles.json` copy.

**If you'd rather add the articles yourself** (e.g. you've made other
edits to `articles.json` since this was generated): apply the code
changes from `modified_files/` (config.js, charts.js, render.js,
schema.md, validate-articles.yml, and the four skill files), then
append the four objects from `new_articles/*.json` into your own
`articles.json`'s `"articles"` array.

## The four new articles

Each one is a ~460-520 word analysis (distinct from the site's usual
120-180 word daily desk posts) that commits to an explicit outlook —
red/down, yellow/flat, light-green/slightly-up, or green/up — for the
next 3, 6, 12, and 24 months, with the reasoning behind each call, and
carries an `outlook` field so the forecast chart renders automatically
above the article.

| Article | Desk | Byline | 3M / 6M / 12M / 24M |
|---|---|---|---|
| a63 | Japan outlook | S. Okafor | Flat / Flat / Slightly Up / Up |
| a64 | Taiwan outlook | J. Lindqvist | Flat / Slightly Up / Slightly Up / Up |
| a65 | Southeast Asia outlook (Vietnam) | N. Suwannarat | Slightly Up / Up / Slightly Up / Up |
| a66 | Tech stocks outlook | J. Lindqvist | Flat / Slightly Up / Up / Slightly Up |

## Skills updated

Both the repo's `skills/*.md` files (in `modified_files/skills/`
above) and the four matching account-level Cowork skills
(`japan-outlook-daily`, `taiwan-outlook-daily`,
`southeast-asia-outlook-daily`, `tech-outlook-daily`) have been updated
with a new "Full outlook post" section, so this longer format is
documented as a repeatable convention going forward, alongside the
existing daily post format. The account-level skill updates were sent
to you as proposals to review and save — the versions in this delivery
are the same content, kept in sync.

## Not pushed to GitHub

As before, this wasn't pushed — the changes are committed locally to a
branch called `outlook-all-desks` in the working clone, and this folder
is everything you need to bring those changes into your own repo,
however you'd like to apply them.
