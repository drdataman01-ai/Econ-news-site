---
name: tech-outlook-daily
description: Write the daily "Tech stocks outlook" post for the site's Tech stocks outlook section. Use this whenever the user asks for today's tech market update, a semiconductor/AI capex note, a big-tech earnings writeup, or says things like "write today's tech outlook" or "do the tech post." Produces a short, scannable post following a fixed structure, ready to publish.
---

# Tech Outlook Daily

Generates the daily "Tech stocks outlook" post for the site's Tech stocks outlook section (nav: Front page | S&P 500 outlook | Japan outlook | Taiwan outlook | Southeast Asia outlook | Tech stocks outlook | Fed Watch | Economics classroom).

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

- Major tech indices (Nasdaq Composite) and mega-cap tech stock moves
- Semiconductor names and the AI/data center capex cycle
- Big Tech earnings and guidance
- Notable single-stock moves large enough to move the sector narrative
- Estimate revisions, analyst rating changes, and product/regulatory news that shifts sentiment

## Template

```
[Date] | Tech Outlook

Headline: one sentence, under ~12 words, naming today's key
development in plain language.

Dek: one sentence summarizing the story, for the article preview.

Body, 2–4 short paragraphs:
1. What happened (2–3 sentences: the stock/index move or earnings
   news, with exact figures and named sources)
2. Why it matters (1–2 sentences: what this means for the company's
   customers, competitors, or the broader industry — not just how
   it fits a "capex cycle" or "sector rotation" unexplained)
3. What to watch next (1–2 sentences: upcoming earnings, a product
   launch, or a data point that could confirm/contradict the theme)
```

## Style rules

- Total length: 120–180 words.
- Name exact stock/index levels and percentage moves rather than vague language ("tech stocks rallied").
- When the story is about AI-related capex or demand, be specific about which part of the chain is implicated (chip design, foundry capacity, data center buildout, software) rather than a blanket "AI stocks" reference — and briefly explain what that part of the chain does, since most readers won't know the distinction.
- Follow the voice and audience guide above: short sentences, active voice, plain language, explain why a reader outside tech/finance should care. No markdown formatting (bold/asterisks) in the body — the site renders plain text.
- Byline: use "J. Lindqvist" for consistency with this site's existing Tech desk coverage, unless the user specifies otherwise.

## Chart field (for the site's trend chart)

Since tech posts are usually about a specific company (an earnings report, a stock move) rather than an index, default to that company's ticker as the chart key, using the site's 5-year stock chart convention:

```json
"chart": { "key": "INTC" }
```

Only use a key that already exists in `assets/js/market-history-data.js` (currently: `INTC`). If the post is about a company that isn't registered yet, don't invent 5 years of historical price data for it — flag to the user that a new chart series needs to be added first, and omit the `chart` field for that post rather than guessing. If the post is genuinely about the sector as a whole rather than one company, omit the `chart` field entirely — there's no default sector-level index registered for this beat yet.

## Output shape for articles.json

```json
{
  "id": "aNN",
  "section": "tech",
  "tier": "free",
  "headline": "...",
  "dek": "...",
  "body": "Paragraph one.\n\nParagraph two.\n\nParagraph three.",
  "author": "J. Lindqvist",
  "ts": "<current ISO 8601 UTC timestamp>",
  "theoryKey": "",
  "theoryBody": ""
}
```

Leave `theoryKey`/`theoryBody` as empty strings unless the user explicitly wants a "Macroeconomic reasoning" panel tied to an existing framework in the site's theory library — this site's existing tech pieces have used frameworks like Schumpeterian growth theory and Tobin's Q, so those keys may already exist if the user wants to reuse them.
