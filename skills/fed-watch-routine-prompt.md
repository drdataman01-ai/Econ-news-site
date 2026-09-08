**Repository**: drdataman01-ai/Econ-news-site — this is the exact GitHub repository to work in. Do not guess at a repository name from the site's brand name ("Kuonomics") or domain — the actual repo is named Econ-news-site.

You are producing today's "Fed Watch Today" post for the Kuonomics site and adding it to the site's content file. Follow every step below exactly — you are running unattended, so do not skip validation steps or guess when uncertain.

## 1. Check whether today needs a post at all

- If U.S. financial markets are closed today (weekend, federal holiday), do NOT generate a routine post. Instead, only post if there was a genuine Fed-relevant development anyway (e.g. a Fed speech, a leak, an off-cycle data release). Otherwise, end the session without making any changes or opening a PR.
- If markets are open but there is no clear Fed-relevant news today (no speech, no data release, no meaningful market move tied to Fed expectations), do NOT invent a story. End the session without making changes rather than manufacturing a low-value post.

## 2. Research today's Fed-relevant development

Search for and identify the single most important Fed-relevant development from the last 24 hours. This could be:
- A speech or remarks by a Fed governor, regional Fed president, or the Fed Chair
- A significant economic data release (CPI, PPI, jobs report, PCE, GDP, etc.)
- A notable market move tied to rate expectations (Treasury yields, equity indices, prediction market odds)
- FOMC meeting minutes or a policy decision, if today is a meeting day

Also gather these four current figures, needed for the site's trend chart:
- Current Fed funds rate target range (report the midpoint, e.g. a 3.50%–3.75% range → 3.625)
- Current 2-year Treasury yield
- Current 10-year Treasury yield
- Market-implied probability of the next FOMC move (from a source like CME FedWatch or Polymarket), and which direction (hike or cut) that probability refers to

If you cannot find reliable current figures for any of the four numbers above, do not guess or estimate — end the session without posting rather than publishing fabricated figures.

## 3. Write the post

Use this exact structure (do not add markdown formatting like bold/asterisks — the site's renderer displays plain text and will show literal asterisks if you include them):

- **Headline**: one sentence, under ~12 words, naming today's key development
- **Dek**: one sentence summarizing the story, for the article preview
- **Body**: 3–5 short paragraphs, separated by blank lines:
  1. What happened (2–3 sentences, name sources and exact figures)
  2. Market reaction (1–2 sentences, using the 2Y yield, 10Y yield, and a major equity index if relevant)
  3. Why it matters (2–3 sentences, connecting to the next FOMC meeting or the broader rate debate)
  4. A closing sentence labeled "Fed Watch take:" with a brief forward-looking read, clearly framed as analysis

Target length: 120–180 words total across all paragraphs.

## 4. Add the article to content/articles.json

Open `content/articles.json` in the repository. It has this shape:

```json
{
  "week_of": "...",
  "articles": [ { ... }, { ... } ]
}
```

To add today's post:
1. Find the highest existing numeric suffix among article `id` values (e.g. if the highest is `a11`, use `a12` next).
2. Construct a new article object with this exact shape:

```json
{
  "id": "aNN",
  "section": "fedwatch",
  "tier": "free",
  "headline": "...",
  "dek": "...",
  "body": "Paragraph one.\n\nParagraph two.\n\nParagraph three.\n\nFed Watch take: closing paragraph.",
  "author": "R. Costa",
  "ts": "<current UTC timestamp in ISO 8601 format, e.g. 2026-09-08T14:00:00.000Z>",
  "theoryKey": "",
  "theoryBody": "",
  "metrics": {
    "fedFundsRate": <number>,
    "yield2y": <number>,
    "yield10y": <number>,
    "moveOdds": <number, 0-100, no percent sign>,
    "moveDirection": "hike" or "cut"
  }
}
```

3. Insert this object as a new entry inside the `articles` array — after the last existing entry, with a comma added after the previous entry's closing `}`. Do NOT place it outside the array or after the array's closing `]`.
4. Do not modify, remove, or reorder any existing articles.

## 5. Validate before committing

Before committing, run `python3 -m json.tool content/articles.json` (or equivalent) to confirm the file is still valid JSON. If validation fails, fix the issue before proceeding — do not commit invalid JSON under any circumstances.

## 6. Commit, push, and open a pull request

- Commit with a message like: `Add Fed Watch post: <headline>`
- Push to a new branch (the platform will handle branch naming/permissions automatically)
- Open a pull request against `main` with:
  - Title: `Fed Watch: <headline>`
  - Description: a 1–2 sentence summary of what today's post covers and where the four metrics figures came from (name the source, e.g. "CME FedWatch" or "Polymarket")

Do not merge the pull request yourself. A human reviews and merges each day's post before it goes live.
