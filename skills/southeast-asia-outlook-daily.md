---
name: southeast-asia-outlook-daily
description: Write the daily "Southeast Asia outlook" post for the site's Southeast Asia outlook section. Use this whenever the user asks for today's Southeast Asia market update, a note on Singapore/Indonesia/Vietnam/Thailand/Malaysia/Philippines markets, or says things like "write today's Southeast Asia outlook" or "do the SEA post." Produces a short, scannable post following a fixed structure, ready to publish.
---

# Southeast Asia Outlook Daily

Generates the daily "Southeast Asia outlook" post for the site's Southeast Asia outlook section (nav: Front page | S&P 500 outlook | Japan outlook | Taiwan outlook | Southeast Asia outlook | Tech stocks outlook | Fed Watch | Economics classroom).

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

This is a multi-country beat — pick whichever single market or theme is most newsworthy on a given day rather than trying to cover all countries in one post:

- Equity indices: Singapore (STI), Indonesia (IDX Composite), Vietnam (VN-Index), Thailand (SET), Malaysia (KLCI), Philippines (PSEi)
- Regional currencies (SGD, IDR, VND, THB, MYR, PHP) and capital flows
- Commodity exposure (palm oil, rubber, coal, rice) where it drives a specific market
- Manufacturing/export data and supply-chain diversification stories (e.g. companies moving production out of China)
- ASEAN trade policy or regional central bank decisions

## Template

```
[Date] | Southeast Asia Outlook

Headline: one sentence, under ~12 words, naming today's key
development and which market/country it concerns.

Dek: one sentence summarizing the story, for the article preview.

Body, 2–4 short paragraphs:
1. What happened (2–3 sentences: the index/currency move or policy
   news, with exact figures, named sources, and the specific
   country/market)
2. Why it matters (1–2 sentences: what this means for businesses,
   investors, or consumers connected to that market or region —
   not just how it compares to a neighboring index)
3. What to watch next (1–2 sentences: upcoming data, a central bank
   decision, or a policy date)
```

## Style rules

- Total length: 120–180 words.
- Always name the specific country/index — never write generically about "Southeast Asian markets" without pointing to which one moved and why.
- Name exact index levels, percentage moves, and currency levels rather than vague language.
- Follow the voice and audience guide above: short sentences, active voice, plain language, explain the real-world stakes. No markdown formatting (bold/asterisks) in the body — the site renders plain text.
- Byline: ask the user for a preferred byline the first time this skill is used, then reuse it consistently across posts (matching this site's pattern of one dedicated author per desk).

## Chart field (for the site's trend chart)

Every post should include a `chart` field so the site shows a historical trend chart alongside the article. Since this beat covers multiple countries, pick the key matching whichever market the post is actually about:

```json
"chart": { "key": "vnindex" }
```

Currently registered index keys in `assets/js/market-history-data.js` include `vnindex` (Vietnam). If the post covers a market that isn't registered yet (Singapore's STI, Indonesia's IDX Composite, Thailand's SET, Malaysia's KLCI, the Philippines' PSEi), or a specific company, don't invent historical data for it — flag to the user that a new chart series needs to be added first, and omit the `chart` field for that post rather than guessing.

## Output shape for articles.json

```json
{
  "id": "aNN",
  "section": "sea",
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

Note the section id is `"sea"`, matching this site's config.js — not "southeast-asia" or "asia".

Leave `theoryKey`/`theoryBody` as empty strings unless the user explicitly wants a "Macroeconomic reasoning" panel tied to an existing framework in the site's theory library.
