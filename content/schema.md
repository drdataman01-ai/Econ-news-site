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
| `section` | yes | One of `sp500`, `japan`, `taiwan`, `sea`, `tech`, `riskmanager`, `fedwatch`, `stockposition` — must match a section `id` in `assets/js/config.js`. |
| `tier` | yes | One of `free`, `plus`, `pro`. Controls the paywall on the article and its theory panel. |
| `headline` | yes | Plain text. HTML is escaped automatically, so don't pre-encode it. |
| `dek` | yes | Plain text, one or two sentences. |
| `body` | yes | Plain text. Use a blank line (`\n\n`) between paragraphs — the site splits on blank lines to build `<p>` tags. |
| `author` | yes | Byline shown under the headline. |
| `ts` | yes | ISO 8601 timestamp. Used for sorting (newest first) and the displayed date. |
| `theoryKey` | no | One of the keys in `assets/js/theories.js` (e.g. `phillips`, `okun`, `islm`, `solow` — see that file for the full list). Leave as `""` or omit for no theory. |
| `theoryBody` | no | Required if `theoryKey` is set. Plain text, paragraphs separated by `\n\n`. This is the article-specific reasoning; the theory's name, graph, and caption come automatically from `assets/js/theories.js`. |

## Stock Position Desk (`section: "stockposition"`)

Articles in this section require one additional field, `position`, which
drives the risk-tier badge, trading-style tag, and the entry/target/stop
chart on the article page. Everything else (`headline`, `dek`, `body`,
`author`, `ts`, `tier`) works exactly the same as any other section — the
`body` field is the thesis, written the same way as any other desk's
article body.

```json
{
  "id": "a52",
  "section": "stockposition",
  "tier": "plus",
  "headline": "AMD's post-selloff bounce sets up a swing back toward $600",
  "dek": "AMD rebounded 2.2% Tuesday after Monday's chip selloff, with Piper Sandler holding a $600 target.",
  "body": "First paragraph of the thesis.\n\nSecond paragraph.",
  "author": "T. Marchetti",
  "ts": "2026-09-16T14:00:00.000Z",
  "theoryKey": "",
  "theoryBody": "",
  "position": {
    "ticker": "AMD",
    "company": "Advanced Micro Devices",
    "tradingStyle": "swing",
    "riskTier": "moderate",
    "holdingPeriod": "2-4 months",
    "expectedReturnLow": 20,
    "expectedReturnHigh": 30,
    "entryPrice": 504.20,
    "targetPrice": 650.00,
    "stopLoss": 430.00
  }
}
```

### `position` field reference

| Field | Required | Notes |
|---|---|---|
| `ticker` | yes | Exchange ticker, e.g. `AMD`. Shown as the headline of the position panel. |
| `company` | yes | Full company name. |
| `tradingStyle` | yes | One of `core`, `income`, `swing`, `momentum`, `catalyst` — must match an id in `TRADING_STYLES` in `assets/js/config.js`. |
| `riskTier` | yes | One of `conservative`, `moderate`, `aggressive`, `speculative` — must match an id in `RISK_TIERS` in `assets/js/config.js`. |
| `holdingPeriod` | yes | Free text, e.g. `"2-4 months"`. Shown as-is; not parsed. |
| `expectedReturnLow` / `expectedReturnHigh` | yes | Numbers (percent, no `%` sign, can be negative for a stated downside range). |
| `entryPrice` / `targetPrice` / `stopLoss` | yes | Numbers (USD). Drive the range chart on the article page — `renderStockPositionChart` in `assets/js/charts.js` draws a marker for each and shades the downside (stop-to-entry) and upside (entry-to-target) zones. |

### Trading styles (`assets/js/config.js` → `TRADING_STYLES`)

| id | Label | Typical holding period | Typical expected return |
|---|---|---|---|
| `core` | Conservative Core | 6-12+ months | 8-15% |
| `income` | Income / Dividend Growth | 12+ months | 6-12% + yield |
| `swing` | Moderate Swing | 2-4 months | 20-40% |
| `momentum` | Aggressive Momentum | 3-6 weeks | 40-80% |
| `catalyst` | Speculative Catalyst | Days-weeks (event-driven) | Wide / binary |

These are display defaults for the filter UI only — every article's own
`holdingPeriod` and `expectedReturnLow`/`expectedReturnHigh` are what
actually render, so a specific idea can sit outside its style's typical
range if the thesis calls for it.

Every Stock Position Desk article should carry a real, stated risk in its
body — these are not personalized investment advice, and the site shows a
standing disclaimer to that effect above the entry/target/stop chart and
at the top of the section page. Keep that framing in mind when writing
the thesis: state the catalyst or setup, the real numbers behind it, and
the realistic case for being wrong, not a confident guarantee.

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
