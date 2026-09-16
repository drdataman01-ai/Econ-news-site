/* ------------------------------------------------------------------
   sp500-history-data.js

   Approximate historical S&P 500 closing levels for the 10-year trend
   chart on S&P 500 articles, sampled roughly every 6 months plus
   extra points at major turning points (2018 selloff, COVID crash,
   2022 bear market, 2025 tariff selloff) so the shape reads clearly.

   ACCURACY NOTE: figures for major year-end closes (2024: 5,881.63;
   2025: 6,845.50) and the most recent point (Sept 2026: 7,718.60,
   matching the live figure already used in Fed Watch posts) are
   accurate documented closes. Mid-cycle points between them are
   reasonable approximations of the path, not verified daily closes —
   cross-check against a source like Yahoo Finance's historical data
   if you need this to be publication-grade precise.
------------------------------------------------------------------- */

const SP500_HISTORY = [
  { date: '2016-09', close: 2168 },
  { date: '2016-12', close: 2239 },
  { date: '2017-06', close: 2423 },
  { date: '2017-12', close: 2674 },
  { date: '2018-06', close: 2718 },
  { date: '2018-12', close: 2507 },
  { date: '2019-06', close: 2942 },
  { date: '2019-12', close: 3231 },
  { date: '2020-03', close: 2585 },
  { date: '2020-06', close: 3100 },
  { date: '2020-12', close: 3756 },
  { date: '2021-06', close: 4298 },
  { date: '2021-12', close: 4766 },
  { date: '2022-06', close: 3785 },
  { date: '2022-12', close: 3840 },
  { date: '2023-06', close: 4450 },
  { date: '2023-12', close: 4770 },
  { date: '2024-06', close: 5460 },
  { date: '2024-12', close: 5882 },
  { date: '2025-04', close: 5200 },
  { date: '2025-09', close: 6500 },
  { date: '2025-12', close: 6846 },
  { date: '2026-03', close: 7100 },
  { date: '2026-06', close: 7450 },
  { date: '2026-09', close: 7719 }
];
