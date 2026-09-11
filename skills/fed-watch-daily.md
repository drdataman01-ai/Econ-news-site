---
name: fed-watch-daily
description: Write the daily "Fed Watch Today" post for the site's Fed Watch section. Use this whenever the user asks for today's Fed Watch writeup, a Fed Watch update, a daily Fed market note, or says things like "write today's Fed Watch," "do the Fed Watch post," or "Fed Watch for [date]." Also use for related recurring modules on the same page, like Fedspeak Tracker log entries, if the user asks for those. Produces a short, scannable, fact-then-analysis post following a fixed structure and word count, ready to publish on the Fed Watch page.
---

# Fed Watch Daily Writeup

Generates the daily "Fed Watch Today" post for the site's Fed Watch section (nav: Front page | S&P 500 outlook | US outlook | Asian outlook | Tech stocks outlook | Fed Watch | Economics classroom).

This is a scan-and-move-on module, not a full article. Target length is **120–180 words total** across all sections combined.

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

## When writing a Fed Watch Today post

1. Identify today's single most important Fed-relevant development. If the user hasn't supplied it, ask what happened today (a speech, a data release, a market move) rather than inventing one.
2. Identify the 2–3 market metrics being tracked for the strip (default: 2-year Treasury yield, Fed funds futures / rate-cut odds, S&P 500). Reuse the same metrics every day unless the user specifies otherwise — consistency is the point.
3. Fill out the template below in order. Do not skip the fact/opinion separation — it's a firm requirement, not a style choice.
4. Always name sources and timestamp the post (Fed speaker's name and role, or the exact data release name, e.g. "August CPI report").
5. Keep numbers precise (basis points, percentages) rather than vague ("yields moved a bit") — but the first time you use a term like "basis points," briefly say what it means.
6. **Also produce a `metrics` snapshot** for the site's Fed Watch trend chart (see below) — this is required for every post, not optional, since the chart pulls its data from these fields across the last several posts.

## Metrics snapshot (for the trend chart)

The site draws a small trend chart on every Fed Watch post from the `metrics` field of the last several Fed Watch articles — each post only needs to record *that day's* snapshot, not a history. Always include this object alongside the written post:

```json
"metrics": {
  "fedFundsRate": 3.625,
  "yield2y": 4.377,
  "yield10y": 4.784,
  "moveOdds": 60,
  "moveDirection": "hike"
}
```

- `fedFundsRate`: midpoint of the current target range (e.g. a 3.50%–3.75% range → 3.625).
- `yield2y` / `yield10y`: current Treasury yields, to the same precision as reported (usually 3 decimal places for 2Y, 2 for 10Y).
- `moveOdds`: the market-implied probability (as a plain number, no % sign) of the next FOMC move in whichever direction is currently favored.
- `moveDirection`: `"hike"` or `"cut"` — whichever `moveOdds` refers to. If odds are genuinely split with no clear lean, default to whichever direction the most recent Fed commentary or futures pricing leans toward, and say so in the body text.

If the user hasn't supplied current values for these four numbers, ask for them (or search, if search is available) rather than inventing plausible-sounding figures — this feeds a chart readers will treat as factual.

## Template

```
[Date] | Fed Watch Today

Headline (1 sentence)
The single most important Fed-relevant thing that happened today, in
plain language — what it is, not just its market label.

What Happened (2–3 sentences)
The concrete facts: who said/did what, or what data printed, and how it
compares to expectations or the prior reading. Name sources explicitly.

Market Reaction (1–2 sentences)
How the tracked metrics moved, and — briefly — what that kind of move
actually means in practice (e.g. what a higher 10-year yield does to
borrowing costs), not just the number itself.

Why It Matters (2–3 sentences)
Connect today's news to the bigger picture, and to something a business
reader would actually feel: the next FOMC meeting, the inflation debate,
or how this could affect borrowing costs, hiring, or spending.

Fed Watch Take (optional, 1 sentence)
A forward-looking read, clearly labeled as analysis, not fact — e.g.
start the sentence with "Fed Watch take:" so it reads as separate from
the reporting above it.
```

## Style rules

- Total length: 120–180 words. If it runs long, cut from "Why It Matters" first, not from "What Happened." A few extra words are fine if they're spent briefly explaining a term a general reader wouldn't know — that's a better use of the space than jargon.
- Facts and opinion must stay visually separated — the "Fed Watch Take" sentence should be clearly labeled as such, not blended into the reporting above it.
- Always timestamp and name sources (speaker + role, or exact data release name).
- Use the same 2–3 market metrics every day so readers build a habit of checking the same numbers — but explain what each one means the way you'd explain it to a smart colleague outside finance, not a trading desk.
- Follow the voice and audience guide above: short sentences, active voice, plain language, explain the "so what" for a business reader. No hedging filler ("it seems," "some believe") unless attributing a specific person's view — but also no unexplained jargon.

## Related: Fedspeak Tracker entries

If asked for a Fedspeak Tracker log entry (a running log of Fed official remarks), use this compact row format instead of the full template:

```
[Date] | [Speaker, role] | [Hawkish/Dovish/Neutral] | [One-line takeaway]
```

Tag hawkish/dovish/neutral based on the substance of the remarks, not just tone — a call for "patience" while inflation is above target usually reads hawkish, for example.
