/* ------------------------------------------------------------------
   market-history-data.js

   A registry of historical price/level series for indices and
   individual stocks referenced in Japan/Taiwan/Southeast Asia/Tech
   outlook articles. Indices get a longer look-back (10 years, same
   convention as the S&P 500 chart); individual stocks get 5 years.

   Structure: MARKET_HISTORY[key] = { label, type, data: [{date, value}] }
   - key: a short identifier referenced from an article's "chart" field
     (e.g. "nikkei225", "INTC")
   - type: "index" or "stock" (informational, used for chart styling/labels)
   - data: [{date: 'YYYY-MM', value: number}], oldest first

   ACCURACY NOTE: current/recent points (2026) match figures already
   verified in published articles. Earlier points are built from
   well-documented market history and major turning points (2018
   selloff, COVID crash, 2022 declines, 2024-2025 rallies/corrections)
   — directionally accurate, not verified point-by-point against a
   data vendor. Cross-check before treating as publication-grade.
------------------------------------------------------------------- */

const MARKET_HISTORY = {

  nikkei225: {
    label: 'Nikkei 225',
    type: 'index',
    data: [
      { date: '2016-09', value: 16700 },
      { date: '2017-03', value: 19200 },
      { date: '2017-09', value: 20300 },
      { date: '2018-03', value: 21500 },
      { date: '2018-09', value: 23400 },
      { date: '2019-03', value: 21200 },
      { date: '2019-09', value: 21400 },
      { date: '2020-03', value: 19100 },
      { date: '2020-09', value: 23200 },
      { date: '2021-03', value: 29200 },
      { date: '2021-09', value: 30200 },
      { date: '2022-03', value: 27800 },
      { date: '2022-09', value: 27100 },
      { date: '2023-03', value: 28000 },
      { date: '2023-09', value: 32400 },
      { date: '2024-03', value: 40200 },
      { date: '2024-08', value: 31500 },
      { date: '2024-12', value: 39800 },
      { date: '2025-06', value: 42000 },
      { date: '2025-12', value: 48000 },
      { date: '2026-03', value: 55000 },
      { date: '2026-06', value: 62000 },
      { date: '2026-09', value: 66400 }
    ]
  },

  taiex: {
    label: 'TAIEX',
    type: 'index',
    data: [
      { date: '2016-09', value: 9200 },
      { date: '2017-09', value: 10500 },
      { date: '2018-09', value: 10900 },
      { date: '2019-09', value: 10800 },
      { date: '2020-09', value: 12500 },
      { date: '2021-09', value: 16900 },
      { date: '2022-09', value: 13700 },
      { date: '2023-09', value: 16600 },
      { date: '2024-09', value: 22600 },
      { date: '2025-03', value: 21500 },
      { date: '2025-09', value: 30000 },
      { date: '2026-03', value: 40000 },
      { date: '2026-06', value: 44000 },
      { date: '2026-09', value: 47414 }
    ]
  },

  vnindex: {
    label: 'VN-Index',
    type: 'index',
    data: [
      { date: '2016-09', value: 670 },
      { date: '2017-09', value: 800 },
      { date: '2018-09', value: 990 },
      { date: '2018-12', value: 890 },
      { date: '2019-09', value: 985 },
      { date: '2020-03', value: 660 },
      { date: '2020-09', value: 905 },
      { date: '2021-09', value: 1350 },
      { date: '2022-09', value: 1150 },
      { date: '2023-09', value: 1220 },
      { date: '2024-09', value: 1270 },
      { date: '2025-01', value: 1250 },
      { date: '2025-04', value: 1100 },
      { date: '2025-10', value: 1690 },
      { date: '2026-01', value: 1918 },
      { date: '2026-03', value: 1673 },
      { date: '2026-09', value: 1853 }
    ]
  },

  INTC: {
    label: 'Intel (INTC)',
    type: 'stock',
    data: [
      { date: '2021-09', value: 54.00 },
      { date: '2022-03', value: 47.00 },
      { date: '2022-09', value: 26.00 },
      { date: '2023-03', value: 27.00 },
      { date: '2023-09', value: 36.00 },
      { date: '2024-03', value: 43.00 },
      { date: '2024-08', value: 19.50 },
      { date: '2025-01', value: 20.00 },
      { date: '2025-07', value: 23.43 },
      { date: '2025-09', value: 24.50 },
      { date: '2025-12', value: 45.00 },
      { date: '2026-03', value: 70.00 },
      { date: '2026-06', value: 140.94 },
      { date: '2026-09', value: 95.80 }
    ]
  }

};
