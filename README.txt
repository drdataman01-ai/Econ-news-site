Remove Risk Manager Desk — apply instructions
==============================================

Option A (preferred): apply the git patch
------------------------------------------
    cd Econ-news-site
    git checkout main && git pull
    git checkout -b remove-risk-manager-desk
    git am 0001-Remove-Risk-Manager-Desk-section.patch
    git push -u origin remove-risk-manager-desk
Then open a PR against main as usual.

Option B: manual apply
-----------------------
1. Replace these 6 files with the versions in modified_files/:
   - assets/js/config.js
   - assets/js/render.js
   - assets/js/charts.js
   - index.html
   - content/schema.md
   - content/articles.json
2. Delete these 2 files entirely:
   - assets/js/credit-spread-history-data.js
   - skills/risk-manager-desk-daily-SKILL.md
3. Commit, push to a new branch, open a PR against main.

What changed
------------
- Risk Manager Desk removed from the nav (config.js SECTIONS)
- Its chart function and dispatch removed (charts.js, render.js)
- Its only data file (credit-spread-history-data.js) deleted, and its
  <script> tag removed from index.html
- Removed from the section list in content/schema.md
- Its daily-post skill file deleted so it's no longer part of the
  routine
- The 6 existing riskmanager articles (a27, a33, a39, a45, a51, a62)
  removed from content/articles.json — all other articles and the
  rankings object are untouched (52 articles remain)

Verified: JSON validated against the repo's actual
workflows/validate-articles.yml logic (0 errors), and smoke-tested in
a headless browser — nav no longer shows Risk Manager Desk, all other
sections still render, no JS errors.
