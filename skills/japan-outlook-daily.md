---
name: japan-outlook-daily
description: Write the daily "Japan outlook" post for the site's Japan outlook section. Use this whenever the user asks for today's Japan market update, a Nikkei/TOPIX writeup, a yen (USD/JPY) note, or says things like "write today's Japan outlook" or "do the Japan post." Produces a short, scannable post following a fixed structure, ready to publish.
---

# Japan Outlook Daily

Generates the daily "Japan outlook" post for the site's Japan outlook section (nav: Front page | S&P 500 outlook | Japan outlook | Taiwan outlook | Southeast Asia outlook | Tech stocks outlook | Fed Watch | Economics classroom).

This is a scan-and-move-on desk update, not a full article. Target length is **120–180 words** across all body paragraphs combined.

## Voice and audience

Write as a senior financial journalist covering markets for a business audience — the goal is to sound like The Wall Street Journal's news section, not an investment bank research note.

**Who's reading**: an intelligent Fortune 500 executive who is not a financial markets specialist. They can handle a serious, substantive story — they just haven't spent years absorbing trading-desk shorthand.

**How to write:**
- Professional but conversational — never stiff, never breezy.
- Explain *why* something matters, not just what happened. A price move without a consequence isn't a finished sentence.
- Keep sentences short: roughly 15–25 words each. Break up anything longer.
- Use active voice. "The Fed raised rates," not "Rates were raised by the Fed."
- The first time you mention a financial concept a general reader might not know (yield curve, basis points, an index, a specific mechanism), define it briefly in plain language in the same sentence or the next one — don't assume it's already understood.
- When something happens, say what it means for businesses, consumers, or investors specifically — not just that markets "reacted."
- Avoid market jargon, trading-desk shorthand, and analyst-style stock phrases unless a plain-English alternative genuinely doesn't exist. When in doubt, explain it in a plain clause instead of naming the jargon.

**Phrases to avoid** (replace with a plain explanation of what actually happened):
- "risk-off mood"
- "hawkish Fed bets"
- "shares led lower"
- "weighs on sentiment"
- "outnumbered advancers"
- Any similar trading-desk shorthand not in this list — the test is: would a Fortune 500 executive outside finance need this phrase explained to them? If yes, don't use it.

This tone applies throughout the body — the headline and dek can still be tight and punchy, but should not lean on jargon either.

## What this beat covers

- Nikkei 225 and TOPIX moves
- USD/JPY and yen policy (Bank of Japan rate decisions, yield curve control, intervention risk)
- Major Japanese exporters (autos, electronics, machinery) and how currency moves affect them
- Japanese government bond (JGB) yields when relevant to the BOJ story

## Template

```
[Date] | Japan Outlook

Headline: one sentence, under ~12 words, naming today's key development
in plain language.

Dek: one sentence summarizing the story, for the article preview.

Body, 2–4 short paragraphs:
1. What happened (2–3 sentences: the index move, yen move, or BOJ
   development, with exact figures and named sources)
2. Why it matters (1–2 sentences: what this means for Japanese
   businesses, exporters, or anyone doing business with Japan —
   not just "carry trade dynamics" unexplained)
3. What to watch next (1–2 sentences: next BOJ meeting, upcoming
   data, or a name-checked stock/sector exposed to the story)
```

## Style rules

- Total length: 120–180 words.
- Name exact index levels and percentage moves (e.g. "Nikkei 225 closed up 0.8% at 41,230") rather than vague language ("stocks rose").
- When discussing the yen, always give the USD/JPY level, and briefly explain what a stronger or weaker yen means for Japanese exporters or importers — don't assume the reader already knows.
- Follow the voice and audience guide above: short sentences, active voice, plain language, explain the business impact. No markdown formatting (bold/asterisks) in the body — the site renders plain text and will show literal asterisks if included.
- Byline: use "S. Okafor" for consistency with this site's existing Asia-desk coverage, unless the user specifies a different author.

## Chart field (for the site's trend chart)

Every post should include a `chart` field so the site shows a historical trend chart alongside the article:

```json
"chart": { "key": "nikkei225" }
```

This is the default for Japan outlook posts, since the beat is usually about the index. If the post is specifically about one company (e.g. a Toyota or SoftBank earnings story) rather than the broader market, use that company's ticker as the key instead (e.g. `{"key": "SFTBY"}`) — but only if that key already exists in `assets/js/market-history-data.js`. If it doesn't exist yet, don't invent historical data for it — flag to the user that a new chart series needs to be added first, and either omit the `chart` field for that post or default to `nikkei225`.

## Output shape for articles.json

```json
{
  "id": "aNN",
  "section": "japan",
  "tier": "free",
  "headline": "...",
  "dek": "...",
  "body": "Paragraph one.\n\nParagraph two.\n\nParagraph three.",
  "author": "S. Okafor",
  "ts": "<current ISO 8601 UTC timestamp>",
  "theoryKey": "",
  "theoryBody": ""
}
```

Leave `theoryKey`/`theoryBody` as empty strings unless the user explicitly wants a "Macroeconomic reasoning" panel tied to an existing framework in the site's theory library — don't invent a theoryKey that isn't already defined there.

## Full outlook post (multi-month forecast, distinct from the daily post above)

Separate from the daily 120–180 word desk update above, this desk also
publishes a longer-form outlook post periodically: a 400–500 word
analysis that commits to an explicit call on the next 3, 6, 12, and 24
months, rendered as a color-coded forecast chart above the article
body. Both formats coexist on this desk — use the daily template for
routine updates, and this one when the user asks for something like
"write the Japan outlook analysis," "update the Japan 3/6/12/24 month
view," or "do the full Japan outlook."

**Structure** (~400–500 words total):
1. Opening paragraph: the current state of the Nikkei/TOPIX/yen story,
   with exact figures and named sources — same evidentiary standard as
   the daily post, just more room to set the scene.
2. One paragraph per horizon (3-month, 6-month, 12-month, 24-month),
   each opening with "Next [N] months: [flat/slightly up/up/down]."
   and then giving the specific reasoning behind that call — a color
   is a conclusion the paragraph has to earn, not a label. Vary the
   calls across horizons where the reasoning actually supports it;
   don't default to a straight line from flat to up.
3. Closing line: "Japan Outlook take:" followed by one sentence naming
   the single most important thing to watch.

**The `outlook` field** — add this alongside the normal article fields
to render the forecast chart:

```json
"outlook": {
  "threeMonth": "flat",
  "sixMonth": "flat",
  "twelveMonth": "slight_up",
  "twentyFourMonth": "up"
}
```

Each value must be one of `down`, `flat`, `slight_up`, or `up` —
defined once in `OUTLOOK_LEVELS` (`assets/js/config.js`) and shared
across all five outlook desks (sp500, japan, taiwan, sea, tech), not
redefined per desk. The site's `renderOutlookChart()`
(`assets/js/charts.js`) reads this field and draws the line-and-color-
strip forecast chart automatically, before the article body and
before the historical Nikkei chart — don't build a new chart per
post, just supply this field. See `content/schema.md` for the full
field reference.

Still include the normal `chart` field too (default `nikkei225`, per
the Chart field section above) — the outlook chart and the historical
trend chart both show on these posts, with the outlook chart first.

**Voice**: same Fortune 500-executive audience and plain-language
rules as the daily post above (including the banned-phrases list),
just with room to develop the reasoning behind each horizon rather
than compressing everything into one paragraph.

**Byline**: same convention as the daily post — "S. Okafor," unless
the user specifies otherwise.
