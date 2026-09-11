---
name: risk-manager-desk-daily
description: Write the daily "Risk Manager Desk" post for the site's Risk Manager Desk section. Use this whenever the user asks for today's Risk Manager Desk writeup, a risk desk update, a daily insurance/ALM note, or says things like "write today's Risk Manager Desk," "do the risk desk post," or "Risk Manager Desk for [date]." Covers interest-rate/ALM risk, credit risk in the investment portfolio, underwriting and catastrophe risk, claims-cost inflation, and regulatory capital — written for insurance risk managers, not retail investors. Produces a short, scannable, fact-then-analysis post following a fixed structure and word count, ready to publish on the Risk Manager Desk page.
---

# Risk Manager Desk Daily Writeup

Generates the daily post for the site's Risk Manager Desk section (nav: Front page | S&P 500 outlook | Japan outlook | Taiwan outlook | Southeast Asia outlook | Tech stocks outlook | Risk Manager Desk | Fed Watch).

This is a scan-and-move-on module, not a full article. Target length is **120–180 words total** across all sections combined — the constraint is length, not depth. A short post can still be analytically dense; that's the point of this desk.

## Voice and audience

Write as a senior insurance/reinsurance trade press reporter — the goal is to sound like Business Insurance or Reinsurance News, not a retail markets blog, and not a dumbed-down general-business explainer.

**Who's reading**: an insurance or reinsurance risk manager, ALM/investment officer, or chief risk officer. They are a specialist. They know what duration, convexity, OAS, RBC, treaty structures, and reserve adequacy mean without being told. Do not define basic insurance or fixed-income concepts the way Fed Watch defines basic market terms for a general executive — this audience finds that condescending, and it wastes the word budget.

**This does not extend to proper nouns and specific citations.** Not defining "duration" is respecting the reader's expertise; leaving "AG 53" or an acronym like the NAIC unspelled on first mention is just being unclear about what you're actually citing, regardless of how expert the reader is. Every regulatory body should be named in full on first mention (National Association of Insurance Commissioners, then "NAIC" afterward); every named guideline, rule, or specific framework should get a short parenthetical gloss on first mention (e.g., "AG 53 (long-duration asset-adequacy testing)"). This is a hard rule, not a style preference — a specialist reader who already knows what AG 53 requires still benefits from the anchor, and a reader who doesn't is otherwise lost for the rest of the post.

**How to write:**
- Precise and technical, but never bureaucratic. Sound like someone who actually manages a balance sheet, not someone summarizing a press release about one.
- Every fact must resolve to a balance-sheet, capital, or underwriting consequence. A rate move, spread change, or catastrophe estimate without a stated consequence for reserves, capital, or portfolio positioning isn't a finished thought — this is the single most important rule for this desk.
- Keep sentences short: roughly 15–25 words each. Break up anything longer.
- Use active voice. "The NAIC flagged private credit exposure," not "Private credit exposure was flagged by the NAIC."
- Name the actual mechanism, not just the direction. "Widening high-yield spreads raise the mark-to-market loss on below-investment-grade holdings" is usable; "credit markets weakened" is not.
- When citing a number, always give the reader something to compare it to — the prior reading, the multi-year range, or the level that would trigger a different action (a reserve adjustment, a renewal repricing, a capital charge change).

**Phrases to avoid** (replace with the actual mechanism or consequence):
- "markets are cautious"
- "risk appetite waned"
- "sentiment shifted" / "sentiment turned negative"
- "investors are watching closely"
- "weighed on the outlook"
- Any similar sentiment-only phrase that describes a mood rather than a mechanism — the test: could a chief risk officer act on this sentence, or does it only describe a feeling? If it only describes a feeling, cut it or replace it with the concrete number or mechanism behind it.

This tone applies throughout the body — the headline and dek should be tight and specific, naming the actual metric or event rather than a vague market-mood framing.

## When writing a Risk Manager Desk post

1. Identify today's single most relevant development for an insurance balance sheet — a rate move, a credit spread shift, a reinsurance renewal data point, a catastrophe loss estimate, a rating-agency action, or a regulatory development (NAIC, Solvency II). If the user hasn't supplied it, ask what happened today (or search, if search is available) rather than inventing one.
2. Identify which risk domain the story belongs to: ALM/interest-rate, investment credit risk, underwriting/catastrophe risk, claims-cost inflation, or regulatory capital. Say so implicitly through the framing — the reader should immediately know which part of their job this affects.
3. Fill out the template below in order. Do not skip the fact/analysis separation — it's a firm requirement, not a style choice.
4. Always name sources and timestamp the post (the data release, rating action, or filing being referenced, e.g. "NAIC's Q3 capital markets bureau report" or "Fitch's downgrade of [name]").
5. Keep numbers precise (basis points, dollar figures, percentages) — never round into vagueness ("spreads moved a bit").
6. **Also produce a `metrics` snapshot** for the site's Risk Manager Desk trend chart (see below) — this is required for every post, not optional, since the chart pulls its data from these fields across the last several posts.

## Metrics snapshot (for the trend chart)

The site draws a small trend chart on every Risk Manager Desk post from the `metrics` field of the last several articles in this section — each post only needs to record *that day's* snapshot, not a history. Always include this object alongside the written post:

```json
"metrics": {
  "yield10y": 4.84,
  "igSpread": 92,
  "hySpread": 312,
  "spreadTrend": "widening"
}
```

- `yield10y`: current 10-year Treasury yield, to 2 decimal places — the anchor rate for most insurer ALM discussions.
- `igSpread`: investment-grade corporate option-adjusted spread (OAS), in basis points. This is the single most-watched number for an insurer's core bond portfolio.
- `hySpread`: high-yield corporate OAS, in basis points — relevant to insurers with below-investment-grade or private-credit allocations.
- `spreadTrend`: `"widening"`, `"tightening"`, or `"stable"` — the direction credit spreads have moved over the last several sessions, not just today. This is what actually matters for portfolio mark-to-market and reserve discussions, more than a single day's print.

If the user hasn't supplied current values for these four fields, ask for them (or search, if search is available) rather than inventing plausible-sounding figures — this feeds a chart readers will treat as factual.

**Engineering note, not for the writer**: as of this skill's creation, `market-history-data.js` does not yet have registered `igSpread`/`hySpread` series, and `render.js`'s chart dispatch does not yet route the `riskmanager` section to any chart function. This metrics snapshot should still be captured in every post's JSON regardless, so that once that wiring exists, the full history is already there rather than needing to be reconstructed.

## Template

```
[Date] | Risk Manager Desk

Headline (1 sentence)
The single most relevant development for an insurer's balance sheet today,
naming the actual metric or event, not a vague market-mood framing.

What Happened (2–3 sentences)
The concrete facts: what moved, what was released, or what action was
taken, and how it compares to the prior reading or a relevant benchmark.
Name sources explicitly.

Balance Sheet Impact (1–2 sentences)
What this specific move or event does to reserves, capital, portfolio
duration, mark-to-market positioning, or underwriting economics — stated
as a mechanism, not a mood.

Why It Matters (2–3 sentences)
Connect today's news to the bigger risk-management picture: an upcoming
reinsurance renewal, a capital adequacy threshold, a reserve adequacy
review, or a portfolio rebalancing decision this desk's readers are
actually facing.

Risk Desk Take (optional, 1 sentence)
A forward-looking read, clearly labeled as analysis, not fact — start the
sentence with "Risk Desk take:" so it reads as separate from the
reporting above it.
```

## Style rules

- Total length: 120–180 words. If it runs long, cut from "Why It Matters" first, not from "What Happened" or "Balance Sheet Impact" — the mechanism and the number are the two things this desk can't afford to lose.
- Facts and analysis must stay visually separated — the "Risk Desk Take" sentence should be clearly labeled as such, not blended into the reporting above it.
- Always timestamp and name sources (the data release, rating action, filing, or speaker being cited).
- Use the same core metrics every day (10-year yield, IG spread, HY spread, spread trend) so readers build a habit of checking the same numbers, the same way Fed Watch does with its own tracked metrics.
- Follow the voice and audience guide above: technical precision, active voice, every fact resolved to a consequence. No hedging filler ("it seems," "some believe") unless attributing a specific person's or institution's view — and no sentiment-only language standing in for a mechanism.
- Byline: ask the user for a preferred Risk Manager Desk byline the first time this skill is used, then reuse it consistently across future posts, the same convention used for the Southeast Asia desk.
