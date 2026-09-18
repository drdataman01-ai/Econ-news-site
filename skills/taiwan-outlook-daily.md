---
name: taiwan-outlook-daily
description: Write the daily "Taiwan outlook" post for the site's Taiwan outlook section. Use this whenever the user asks for today's Taiwan market update, a TAIEX writeup, a TSMC/semiconductor supply chain note, or says things like "write today's Taiwan outlook" or "do the Taiwan post." Produces a short, scannable post following a fixed structure, ready to publish.
---

# Taiwan Outlook Daily

Generates the daily "Taiwan outlook" post for the site's Taiwan outlook section (nav: Front page | S&P 500 outlook | Japan outlook | Taiwan outlook | Southeast Asia outlook | Tech stocks outlook | Fed Watch | Economics classroom).

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

- TAIEX index moves
- TSMC and the broader semiconductor/foundry supply chain (capacity, capex, export orders)
- Cross-strait geopolitical risk (China-Taiwan tensions) when it moves markets
- Taiwan dollar (TWD) moves when relevant
- Taiwan's export order data, a closely watched leading indicator for global tech demand

## Template

```
[Date] | Taiwan Outlook

Headline: one sentence, under ~12 words, naming today's key development
in plain language.

Dek: one sentence summarizing the story, for the article preview.

Body, 2–4 short paragraphs:
1. What happened (2–3 sentences: the index move or company/sector
   news, with exact figures and named sources)
2. Why it matters (1–2 sentences: what this means for the global
   chip supply chain, electronics makers, or anyone buying the
   products these companies build — not just "capex" unexplained)
3. What to watch next (1–2 sentences: upcoming earnings, export
   order data, or a geopolitical date to watch)
```

## Style rules

- Total length: 120–180 words.
- Name exact index levels and percentage moves rather than vague language.
- When discussing semiconductors, be specific about which part of the chain is affected (foundry capacity, advanced packaging, memory, legacy nodes) rather than saying "chip stocks" — and briefly explain what that part of the chain actually does, since most readers won't know the distinction.
- Follow the voice and audience guide above: short sentences, active voice, plain language, explain the real-world impact. No markdown formatting (bold/asterisks) in the body — the site renders plain text.
- Byline: use "J. Lindqvist" if the story is primarily a tech/supply-chain angle (consistent with this site's existing Tech desk byline), or a general Taiwan-desk byline of the user's choosing for broader market stories. Ask the user which they prefer if it's ambiguous, rather than guessing.

## Chart field (for the site's trend chart)

Every post should include a `chart` field so the site shows a historical trend chart alongside the article:

```json
"chart": { "key": "taiex" }
```

This is the default for Taiwan outlook posts, since the beat is usually about the index. If the post is specifically about one company (e.g. TSMC or MediaTek earnings, a specific stock's move) rather than the broader market, use that company's ticker as the key instead — but only if that key already exists in `assets/js/market-history-data.js` (e.g. Intel is registered as `"INTC"`). If the ticker you need doesn't exist yet, don't invent historical data for it — flag to the user that a new chart series needs to be added first, and either omit the `chart` field for that post or default to `taiex`.

## Output shape for articles.json

```json
{
  "id": "aNN",
  "section": "taiwan",
  "tier": "free",
  "headline": "...",
  "dek": "...",
  "body": "Paragraph one.\n\nParagraph two.\n\nParagraph three.",
  "author": "...",
  "ts": "<current ISO 8601 UTC timestamp>",
  "theoryKey": "",
  "theoryBody": ""
}
```

Leave `theoryKey`/`theoryBody` as empty strings unless the user explicitly wants a "Macroeconomic reasoning" panel tied to an existing framework in the site's theory library.

## Full outlook post (multi-month forecast, distinct from the daily post above)

Separate from the daily 120–180 word desk update above, this desk also
publishes a longer-form outlook post periodically: a 400–500 word
analysis that commits to an explicit call on the next 3, 6, 12, and 24
months, rendered as a color-coded forecast chart above the article
body. Both formats coexist on this desk — use the daily template for
routine updates, and this one when the user asks for something like
"write the Taiwan outlook analysis," "update the Taiwan 3/6/12/24
month view," or "do the full Taiwan outlook."

**Structure** (~400–500 words total):
1. Opening paragraph: the current state of the TAIEX/TSMC/supply-chain
   story, with exact figures and named sources — same evidentiary
   standard as the daily post, just more room to set the scene.
2. One paragraph per horizon (3-month, 6-month, 12-month, 24-month),
   each opening with "Next [N] months: [flat/slightly up/up/down]."
   and then giving the specific reasoning behind that call — a color
   is a conclusion the paragraph has to earn, not a label. Vary the
   calls across horizons where the reasoning actually supports it;
   don't default to a straight line from flat to up.
3. Closing line: "Taiwan Outlook take:" followed by one sentence
   naming the single most important thing to watch.

**The `outlook` field** — add this alongside the normal article fields
to render the forecast chart:

```json
"outlook": {
  "threeMonth": "flat",
  "sixMonth": "slight_up",
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
before the historical TAIEX chart — don't build a new chart per post,
just supply this field. See `content/schema.md` for the full field
reference.

Still include the normal `chart` field too (default `taiex`, per the
Chart field section above) — the outlook chart and the historical
trend chart both show on these posts, with the outlook chart first.

**Voice**: same Fortune 500-executive audience and plain-language
rules as the daily post above (including the banned-phrases list),
just with room to develop the reasoning behind each horizon rather
than compressing everything into one paragraph.

**Byline**: given that any multi-month Taiwan outlook is almost always
anchored in TSMC and the semiconductor cycle, default to "J.
Lindqvist" for this longer format unless the piece is genuinely a
broader, non-tech Taiwan story — ask the user which they prefer if
that's the case, per the daily post's byline note above.
