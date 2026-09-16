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
| `section` | yes | One of `sp500`, `us`, `asia`, `tech` — must match a section `id` in `assets/js/config.js`. |
| `tier` | yes | One of `free`, `plus`, `pro`. Controls the paywall on the article and its theory panel. |
| `headline` | yes | Plain text. HTML is escaped automatically, so don't pre-encode it. |
| `dek` | yes | Plain text, one or two sentences. |
| `body` | yes | Plain text. Use a blank line (`\n\n`) between paragraphs — the site splits on blank lines to build `<p>` tags. |
| `author` | yes | Byline shown under the headline. |
| `ts` | yes | ISO 8601 timestamp. Used for sorting (newest first) and the displayed date. |
| `theoryKey` | no | One of the keys in `assets/js/theories.js` (e.g. `phillips`, `okun`, `islm`, `solow` — see that file for the full list). Leave as `""` or omit for no theory. |
| `theoryBody` | no | Required if `theoryKey` is set. Plain text, paragraphs separated by `\n\n`. This is the article-specific reasoning; the theory's name, graph, and caption come automatically from `assets/js/theories.js`. |

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
