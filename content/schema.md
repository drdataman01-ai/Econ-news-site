# `articles.json` schema

This file is the entire content of the site for the current week. The
site (`index.html`) fetches it at page load; nothing else about the
code needs to change when you publish a new week.

```json
{
  "week_of": "2026-09-01",
  "articles": [
    {
      "id": "a1",
      "section": "sp500",
      "tier": "free",
      "headline": "S&P 500 holds the 5,500 line as breadth quietly improves",
      "dek": "One or two sentence summary shown on the front page and section lists.",
      "body": "First paragraph.\n\nSecond paragraph.\n\nThird paragraph.",
      "author": "M. Halvorsen",
      "ts": "2026-09-05T14:00:00.000Z",
      "theoryKey": "phillips",
      "theoryBody": "First paragraph of the graduate-level reasoning.\n\nSecond paragraph connecting it to the story above."
    }
  ]
}
```

## Field reference

| Field | Required | Notes |
|---|---|---|
| `week_of` | yes | An ISO date (`YYYY-MM-DD`) for your own bookkeeping. Not shown to readers. |
| `id` | yes | Unique string. The admin tool generates one automatically; if you hand-edit the JSON, just keep every `id` unique. |
| `section` | yes | One of `sp500`, `japan`, `taiwan`, `sea`, `tech`, `fedwatch`, `stockposition` — must match a section `id` in `assets/js/config.js`. |
| `tier` | yes | One of `free`, `plus`, `pro`. Controls the paywall on the article and its theory panel. |
| `headline` | yes | Plain text. HTML is escaped automatically, so don't pre-encode it. |
| `dek` | yes | Plain text, one or two sentences. |
| `body` | yes | Plain text. Use a blank line (`\n\n`) between paragraphs — the site splits on blank lines to build `<p>` tags. |
| `author` | yes | Byline shown under the headline. |
| `ts` | yes | ISO 8601 timestamp. Used for sorting (newest first) and the displayed date. |
| `theoryKey` | no | One of the keys in `assets/js/theories.js` (e.g. `phillips`, `okun`, `islm`, `solow` — see that file for the full list). Leave as `""` or omit for no theory. |
| `theoryBody` | no | Required if `theoryKey` is set. Plain text, paragraphs separated by `\n\n`. This is the article-specific reasoning; the theory's name, graph, and caption come automatically from `assets/js/theories.js`. |

## Outlook chart (`section`: `sp500`, `japan`, `taiwan`, `sea`, or `tech`)

Any article in one of these five desks can carry an `outlook` object
to render the standing outlook chart (`renderOutlookChart()` in
`charts.js`) above the article body, before that section's historical
price chart (`renderSP500Chart()` for `sp500`, `renderMarketChart()`
for the other four). This is the reusable visual for outlook-style
posts going forward, across all five desks — reuse it via this field
rather than building a new forecast graphic per post or per desk.
Articles without this field (routine, non-outlook posts) just skip
the chart, same as `theoryKey`.

```json
{
  "id": "a62",
  "section": "sp500",
  "tier": "free",
  "headline": "...",
  "dek": "...",
  "body": "...",
  "author": "M. Halvorsen",
  "ts": "2026-09-17T14:00:00.000Z",
  "theoryKey": "",
  "theoryBody": "",
  "outlook": {
    "threeMonth": "flat",
    "sixMonth": "slight_up",
    "twelveMonth": "slight_up",
    "twentyFourMonth": "up"
  }
}
```

| Field | Required | Notes |
|---|---|---|
| `outlook` | no | Object with four keys below. Omit entirely for a routine post with no forecast call. |
| `outlook.threeMonth` | yes, if `outlook` present | The 3-month call. |
| `outlook.sixMonth` | yes, if `outlook` present | The 6-month call. |
| `outlook.twelveMonth` | yes, if `outlook` present | The 12-month call. |
| `outlook.twentyFourMonth` | yes, if `outlook` present | The 24-month call. |

Each of the four calls above must be one of the ids in
`OUTLOOK_LEVELS` (`assets/js/config.js`), which is the single source
of truth for the label and color of each — shared across all five
desks, not redefined per desk:

| id | Label | Color |
|---|---|---|
| `down` | Down | Red |
| `flat` | Flat | Yellow/gold |
| `slight_up` | Slightly Up | Light green |
| `up` | Up | Green |

The chart draws these four calls as a line across the four horizons
(so the shape of the line shows the trajectory of the view), then
restates each horizon's call as a color strip directly underneath —
readers can get the takeaway from the strip alone, without needing to
read the line. A written call this confident deserves real reasoning
behind it: treat each horizon's color as a conclusion your article
body has to earn, not a decoration.

## Stock Position Desk (`section: "stockposition"`)

This desk has two independent parts, and it's important to keep them
separate: **rankings** (the actual ranked stock picks, sourced from your
own analysis, shown as tables) and **news** (commentary articles, shown
the same way as any other desk, just labeled with a style). Neither one
generates the other — a news article's `styleKey` is only a label, not a
trade recommendation with its own numbers.

### Rankings — top-level `rankings` object

Add a `rankings` object at the top level of `articles.json`, alongside
`week_of` and `articles`:

```json
{
  "week_of": "2026-09-01",
  "articles": [ ... ],
  "rankings": {
    "core": [
      { "rank": 1, "ticker": "JNJ", "company": "Johnson & Johnson", "note": "Optional one-line rationale" }
    ],
    "income": [],
    "swing": [],
    "momentum": [],
    "catalyst": []
  }
}
```

All five keys (`core`, `income`, `swing`, `momentum`, `catalyst`) should
be present, each an array of ranked entries — empty arrays are fine and
render as "No ranked picks published yet for this style." This is the
one part of the site meant to be filled in from your own local stock
analysis, not written as prose; there's no formula converting a research
score into these fields; you decide the ranking and hand over the ticker,
company, and (optionally) a short note per row.

| Field | Required | Notes |
|---|---|---|
| `rank` | yes | Number. 1 = your top pick in that style this week. Rows are sorted by this when rendered. |
| `ticker` | yes | Exchange ticker, e.g. `JNJ`. |
| `company` | yes | Full company name. |
| `note` | no | Short free-text rationale, shown under the company name. |

### News — `styleKey` on an article

Any article can carry a `styleKey`, but it's only meaningful (and
required) when `section` is `"stockposition"`. It's a plain label — like
`theoryKey` — not a structured trade object, and everything else about
the article (`headline`, `dek`, `body`, `author`, `ts`, `tier`) works
exactly the same as any other desk's article.

```json
{
  "id": "a52",
  "section": "stockposition",
  "tier": "plus",
  "headline": "AMD's post-selloff bounce reinforces the swing case in chip names",
  "dek": "AMD rebounded 2.2% Tuesday after Monday's chip selloff, with Piper Sandler holding a $600 target.",
  "body": "First paragraph.\n\nSecond paragraph.",
  "author": "T. Marchetti",
  "ts": "2026-09-16T14:00:00.000Z",
  "theoryKey": "",
  "theoryBody": "",
  "styleKey": "swing"
}
```

| Field | Required | Notes |
|---|---|---|
| `styleKey` | yes, for `section: "stockposition"` | One of `core`, `income`, `swing`, `momentum`, `catalyst` — must match an id in `POSITION_STYLES` in `assets/js/config.js`. Renders as a colored badge next to the headline and byline. |

### The five position styles (`assets/js/config.js` → `POSITION_STYLES`)

| id | Label | Typical holding period | Typical expected return |
|---|---|---|---|
| `core` | Conservative / Core | 6-12+ months | 8-15% |
| `income` | Income / Dividend Growth | 12+ months | 6-12% + yield |
| `swing` | Moderate / Swing | 2-4 months | 20-40% |
| `momentum` | Aggressive / Momentum | 3-6 weeks | 40-80% |
| `catalyst` | Speculative / Catalyst | Days-weeks (event-driven) | Wide / binary |

These five ids are explained in full — with a diagram of the shape of
each trade — in the **Stock Position Classroom**
(`assets/js/position-styles.js` → `POSITION_STYLE_LIBRARY`, rendered by
`renderPositionClassroomView()` in `render.js`), linked from the
classroom promo block at the bottom of every page, the same way the
Economics and Trading Strategy classrooms are. Add a new style by adding
an entry to both `POSITION_STYLES` (config.js) and
`POSITION_STYLE_LIBRARY` (position-styles.js) with a matching id.

The Stock Position Desk page shows a standing "not personalized
investment advice" disclaimer above the rankings. Keep that framing in
mind in both places: a ranking row is a stated position, not a promise,
and a news article's job is to explain the setup and the realistic case
for being wrong, not to guarantee an outcome.

## Adding a new theory to the library

`theoryKey` only works if the key exists in `THEORY_LIBRARY` inside
`assets/js/theories.js`. To add a new framework (and its graph),
add an entry there — the admin tool's dropdown picks up new entries
automatically, no other changes needed.

## Updating content weekly

1. Open `admin/index.html` (the newsroom desk tool) in a browser.
2. Load the current `content/articles.json` to bring in last week's stories, or start fresh.
3. Add, edit, or delete stories for the week.
4. Set "Week of" and click "Download articles.json".
5. Replace `content/articles.json` in this folder with the downloaded file.
6. Redeploy / re-upload the site folder.

There's no database and no login here — anyone who can overwrite the
file on the server can "publish." Add real authentication and a real
backend before this goes live with outside contributors.
