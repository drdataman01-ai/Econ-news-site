/* ------------------------------------------------------------------
   fed-history-data.js

   Approximate historical data for the Fed Watch 10-year trend chart:
   Fed funds rate (midpoint of target range) and 2Y/10Y Treasury
   yields, sampled roughly every 3-6 months plus extra points at
   major policy turning points (COVID cut, 2022 hiking start, 2024-25
   cutting cycle) so the shape of each cycle reads clearly.

   ACCURACY NOTE: pre-2026 figures are built from well-documented
   FOMC decisions and general market history, not pulled point-by-point
   from FRED. The shape and turning points are right; if you want
   publication-grade precision, cross-check against FRED's FEDFUNDS,
   DGS2, and DGS10 series before treating this as authoritative. The
   most recent points (2026) match the live data tracked in Fed Watch
   posts.
------------------------------------------------------------------- */

const FED_HISTORY = [
  { date: '2016-09', fedFundsRate: 0.375, yield2y: 0.80, yield10y: 1.60 },
  { date: '2016-12', fedFundsRate: 0.625, yield2y: 1.20, yield10y: 2.45 },
  { date: '2017-06', fedFundsRate: 1.125, yield2y: 1.35, yield10y: 2.20 },
  { date: '2017-12', fedFundsRate: 1.375, yield2y: 1.89, yield10y: 2.40 },
  { date: '2018-06', fedFundsRate: 1.875, yield2y: 2.53, yield10y: 2.85 },
  { date: '2018-12', fedFundsRate: 2.375, yield2y: 2.48, yield10y: 2.68 },
  { date: '2019-06', fedFundsRate: 2.375, yield2y: 1.75, yield10y: 2.00 },
  { date: '2019-12', fedFundsRate: 1.625, yield2y: 1.57, yield10y: 1.92 },
  { date: '2020-03', fedFundsRate: 0.125, yield2y: 0.23, yield10y: 0.70 },
  { date: '2020-12', fedFundsRate: 0.125, yield2y: 0.13, yield10y: 0.93 },
  { date: '2021-12', fedFundsRate: 0.125, yield2y: 0.73, yield10y: 1.52 },
  { date: '2022-06', fedFundsRate: 1.625, yield2y: 3.00, yield10y: 3.15 },
  { date: '2022-12', fedFundsRate: 4.375, yield2y: 4.40, yield10y: 3.90 },
  { date: '2023-06', fedFundsRate: 5.125, yield2y: 4.90, yield10y: 3.75 },
  { date: '2023-12', fedFundsRate: 5.375, yield2y: 4.30, yield10y: 3.90 },
  { date: '2024-06', fedFundsRate: 5.375, yield2y: 4.70, yield10y: 4.30 },
  { date: '2024-09', fedFundsRate: 4.875, yield2y: 3.60, yield10y: 3.70 },
  { date: '2024-12', fedFundsRate: 4.375, yield2y: 4.25, yield10y: 4.55 },
  { date: '2025-06', fedFundsRate: 4.375, yield2y: 4.10, yield10y: 4.40 },
  { date: '2025-09', fedFundsRate: 4.125, yield2y: 4.00, yield10y: 4.40 },
  { date: '2025-12', fedFundsRate: 3.625, yield2y: 4.10, yield10y: 4.50 },
  { date: '2026-03', fedFundsRate: 3.625, yield2y: 4.20, yield10y: 4.60 },
  { date: '2026-06', fedFundsRate: 3.625, yield2y: 4.25, yield10y: 4.65 },
  { date: '2026-09', fedFundsRate: 3.625, yield2y: 4.377, yield10y: 4.784 }
];
