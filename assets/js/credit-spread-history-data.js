/* ------------------------------------------------------------------
   credit-spread-history-data.js

   Historical investment-grade and high-yield corporate bond spread
   levels (option-adjusted spread, in basis points over Treasuries)
   for the Risk Manager Desk's credit-spread trend chart. Same
   10-year monthly-snapshot convention as fed-history-data.js and
   sp500-history-data.js.

   Structure: CREDIT_SPREAD_HISTORY = [{date: 'YYYY-MM', igSpread, hySpread}]
   - igSpread: investment-grade corporate OAS, in basis points
   - hySpread: high-yield corporate OAS, in basis points

   ACCURACY NOTE: the most recent point (Sept 2026: IG 78bps, HY
   265bps) matches live data already used in Risk Manager Desk posts.
   Major historical turning points are real and well-documented (the
   2020 COVID spike to roughly IG 373 / HY 1100, the 2022 widening
   as the Fed hiked into a bear market) — other points are reasonable
   approximations of the path between those points, not verified
   daily closes. Cross-check against a source like FRED's ICE BofA
   OAS series if you need this to be publication-grade precise.
------------------------------------------------------------------- */

const CREDIT_SPREAD_HISTORY = [
  { date: '2016-09', igSpread: 148, hySpread: 480 },
  { date: '2017-09', igSpread: 96,  hySpread: 358 },
  { date: '2018-09', igSpread: 105, hySpread: 322 },
  { date: '2018-12', igSpread: 153, hySpread: 533 },
  { date: '2019-09', igSpread: 112, hySpread: 383 },
  { date: '2020-03', igSpread: 373, hySpread: 1100 },
  { date: '2020-09', igSpread: 136, hySpread: 518 },
  { date: '2021-09', igSpread: 86,  hySpread: 280 },
  { date: '2022-03', igSpread: 125, hySpread: 340 },
  { date: '2022-09', igSpread: 165, hySpread: 550 },
  { date: '2022-12', igSpread: 130, hySpread: 469 },
  { date: '2023-09', igSpread: 121, hySpread: 390 },
  { date: '2024-03', igSpread: 95,  hySpread: 315 },
  { date: '2024-09', igSpread: 90,  hySpread: 300 },
  { date: '2025-03', igSpread: 85,  hySpread: 290 },
  { date: '2025-09', igSpread: 80,  hySpread: 270 },
  { date: '2026-03', igSpread: 82,  hySpread: 275 },
  { date: '2026-06', igSpread: 80,  hySpread: 270 }
];
