const THEORY_LIBRARY = {
  phillips: {
    name: 'New Keynesian Phillips curve',
    caption: 'Inflation rises with the output gap; a higher expected inflation path shifts the whole curve up.',
    description: "The New Keynesian Phillips curve explains inflation through firms that only reset prices occasionally, not every period. Because just a fraction of firms can adjust prices at any given time, current inflation depends on two things: how much slack or tightness there is in the economy (often measured by the output gap), and how much inflation firms expect going forward. That's different from older versions of the curve, which leaned mainly on past inflation to explain the present.",
    citation: 'Galí, Jordi. Monetary Policy, Inflation, and the Business Cycle: An Introduction to the New Keynesian Framework. 2nd ed., Princeton University Press, 2015, ch. 3.',
    applications: ['Inflation reports', 'Fed policy meetings', 'Inflation forecasting'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Phillips curve diagram: inflation rising with the output gap, with a dashed curve shifted upward for higher expected inflation">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Output gap</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Inflation, &#960;</text>
      <path d="M70,175 C140,165 190,140 240,110 C280,85 310,65 335,42" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M70,145 C140,135 190,110 240,80 C280,55 310,35 335,15" fill="none" stroke="#93701F" stroke-width="1.5" stroke-dasharray="5,5"/>
      <circle cx="240" cy="110" r="4" fill="#14181F"/>
      <text x="248" y="106" font-family="IBM Plex Mono" font-size="10" fill="#14181F">current reading</text>
      <text x="290" y="30" font-family="IBM Plex Mono" font-size="10" fill="#93701F">higher &#960;e (shifted)</text>
      <text x="270" y="98" font-family="IBM Plex Mono" font-size="10" fill="#93701F">current &#960;e</text>
    </svg>`
  },
  okun: {
    name: "Okun's law",
    caption: 'Growth above trend associates with falling unemployment; growth below trend associates with rising unemployment.',
    description: "Okun's law is an observed pattern, not a strict law: when the economy grows faster than its long-run trend, unemployment tends to fall, and when growth slows or the economy contracts, unemployment tends to rise. The exact ratio between growth and unemployment shifts across countries and time periods, partly because firms also respond to slowdowns by cutting hours or slowing hiring rather than laying people off outright.",
    citation: "Okun, Arthur M. \"Potential GNP: Its Measurement and Significance.\" Proceedings of the Business and Economic Statistics Section, American Statistical Association, 1962; textbook treatment in Mankiw, N. Gregory. Macroeconomics. 10th ed., Worth Publishers, 2019, ch. 9.",
    applications: ['Jobs reports', 'GDP releases', 'Recession calls'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Okun's law scatter diagram: a downward sloping line relating GDP growth relative to trend to the change in the unemployment rate">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="205" y1="18" x2="205" y2="190" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="50" y1="105" x2="360" y2="105" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">GDP growth vs. trend</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">&#916; Unemployment rate</text>
      <line x1="70" y1="40" x2="340" y2="175" stroke="#93701F" stroke-width="2"/>
      <circle cx="110" cy="55" r="3.5" fill="#14181F"/>
      <circle cx="150" cy="75" r="3.5" fill="#14181F"/>
      <circle cx="230" cy="118" r="3.5" fill="#14181F"/>
      <circle cx="280" cy="145" r="3.5" fill="#14181F"/>
      <circle cx="310" cy="160" r="3.5" fill="#14181F"/>
      <text x="60" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">weak growth</text>
      <text x="270" y="185" font-family="IBM Plex Mono" font-size="10" fill="#454C56">strong growth</text>
    </svg>`
  },
  uip: {
    name: 'Uncovered interest parity & the policy trilemma',
    caption: 'A country can hold any two of the three corners below, but not all three at once.',
    description: "Uncovered interest parity says that if one country's interest rates are higher than another's, its currency is expected to weaken by roughly the same amount, so investors end up with similar expected returns either way. Combine that with the policy trilemma, and you get a hard constraint: a country can fix its exchange rate, keep capital flowing freely across its borders, or run its own independent monetary policy, but not all three at once. Picking two of the three means giving up the other.",
    citation: 'Krugman, Paul, Maurice Obstfeld, and Marc J. Melitz. International Economics: Theory and Policy. 11th ed., Pearson, 2018, ch. 18-19.',
    applications: ['Currency pegs', 'Capital controls', 'Central bank independence', 'Open economies'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="The Mundell-Fleming trilemma triangle: fixed exchange rate, free capital mobility, and independent monetary policy as three corners of which only two can be held at once">
      <polygon points="190,22 50,188 330,188" fill="none" stroke="#14181F" stroke-width="1.5"/>
      <text x="190" y="14" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Independent monetary policy</text>
      <text x="50" y="204" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Fixed exchange rate</text>
      <text x="330" y="204" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Free capital mobility</text>
      <circle cx="120" cy="105" r="3" fill="#93701F"/>
      <text x="126" y="102" font-family="IBM Plex Mono" font-size="9.5" fill="#93701F">capital controls</text>
      <circle cx="260" cy="105" r="3" fill="#93701F"/>
      <text x="196" y="102" text-anchor="end" font-family="IBM Plex Mono" font-size="9.5" fill="#93701F">currency board</text>
      <circle cx="190" cy="188" r="3" fill="#1E6B45"/>
      <text x="190" y="176" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">floating rate (this desk's case)</text>
    </svg>`
  },
  passthrough: {
    name: 'Exchange-rate pass-through',
    caption: 'Prices rarely absorb the full currency move; the observed path settles below full pass-through.',
    description: "Exchange-rate pass-through measures how much of a currency move actually shows up in the prices people pay for imports and everyday goods. In practice, pass-through is usually partial and slow rather than immediate and complete: exporters often absorb some of the currency move themselves to stay competitive in the local market, and sticky prices mean it takes time for the rest to show up.",
    citation: 'Campa, José M., and Linda S. Goldberg. "Exchange Rate Pass-Through into Import Prices." Review of Economics and Statistics, vol. 87, no. 4, 2005; textbook treatment in Krugman, Obstfeld, and Melitz, International Economics, ch. 16.',
    applications: ['Currency depreciation stories', 'Import price inflation', 'Tariff impact'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Exchange rate pass-through chart: a step function for full pass-through versus a slower curve that settles below 100 percent for observed pass-through">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Months since FX move</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Share of move in price</text>
      <path d="M60,180 L60,32 L340,32" fill="none" stroke="#D6D0C2" stroke-width="2" stroke-dasharray="5,5"/>
      <text x="270" y="26" font-family="IBM Plex Mono" font-size="10" fill="#454C56">full pass-through (100%)</text>
      <path d="M60,180 C120,170 160,140 200,120 C260,95 300,90 340,85" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="60" y1="85" x2="340" y2="85" stroke="#93701F" stroke-width="1" stroke-dasharray="3,4"/>
      <text x="200" y="78" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#93701F">observed, long-run &#8776; 60%</text>
    </svg>`
  },
  schumpeter: {
    name: 'Creative destruction & capital reallocation',
    caption: 'Capital shifts within the sector, from incumbents toward the firms holding the technological frontier.',
    description: "Creative destruction describes how new firms and technologies constantly erode the value of what came before. As new entrants build better ways of doing things, capital, workers, and market share shift away from older incumbent firms toward whoever is closest to the technological frontier, reshaping an industry from the inside as it happens, not just as an aftermath.",
    citation: 'Schumpeter, Joseph A. Capitalism, Socialism and Democracy. Harper & Brothers, 1942, pt. II, ch. 7; formalized in Aghion, Philippe, and Peter Howitt. Endogenous Growth Theory. MIT Press, 1998, ch. 2.',
    applications: ['Industry disruption', 'AI displacing incumbents', 'Tech sector coverage'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Bar chart showing capital share shifting from incumbent firms toward frontier firms between an earlier and later period">
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <rect x="90" y="54" width="26" height="136" fill="#14181F"/>
      <rect x="120" y="136" width="26" height="54" fill="#93701F"/>
      <rect x="240" y="117" width="26" height="73" fill="#14181F"/>
      <rect x="270" y="63" width="26" height="127" fill="#93701F"/>
      <text x="118" y="204" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">t0 (pre-shift)</text>
      <text x="268" y="204" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">t1 (post-shift)</text>
      <rect x="60" y="15" width="10" height="10" fill="#14181F"/>
      <text x="75" y="24" font-family="IBM Plex Mono" font-size="10" fill="#454C56">incumbent (legacy tech)</text>
      <rect x="220" y="15" width="10" height="10" fill="#93701F"/>
      <text x="235" y="24" font-family="IBM Plex Mono" font-size="10" fill="#454C56">frontier firm (new tech)</text>
    </svg>`
  },
  tobinq: {
    name: "Tobin's Q investment model",
    caption: 'Investment accelerates once market value exceeds the replacement cost of capital, at Q = 1.',
    description: "Tobin's Q compares what a company is worth in the market to what it would cost to rebuild its capital, like factories and equipment, from scratch. When Q is above one, it's cheaper to build new capital than buy it on the market, so firms have an incentive to invest; when Q is below one, existing capital is worth more than building new, and investment tends to slow. In general, higher Q means more investment.",
    citation: 'Tobin, James. "A General Equilibrium Approach to Monetary Theory." Journal of Money, Credit and Banking, vol. 1, no. 1, 1969; textbook treatment in Blanchard, Olivier. Macroeconomics. 8th ed., Pearson, 2021, ch. 15.',
    applications: ['Corporate investment', 'Capex cycles', 'M&A activity'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Tobin's Q diagram: investment rate rising with Q, with a threshold line at Q equals 1 separating disinvest and invest regions">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="200" y1="18" x2="200" y2="190" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="200" y="14" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Q = 1</text>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Q (market value / replacement cost)</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Investment rate, I/K</text>
      <path d="M60,170 C120,165 170,160 200,150 C240,135 290,90 340,40" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="110" y="182" font-family="IBM Plex Mono" font-size="10" fill="#454C56">disinvest / hold</text>
      <text x="255" y="182" font-family="IBM Plex Mono" font-size="10" fill="#454C56">invest</text>
    </svg>`
  },
  accelerator: {
    name: 'Leading indicators & the inventory accelerator',
    caption: 'New orders (leading) turn ahead of production and shipments (coincident) by roughly one cycle phase.',
    description: "Economic indicators get sorted by how they line up with the business cycle: leading indicators turn before the broader economy does, and coincident indicators move roughly in step with it. New orders are a classic leading indicator, tending to pick up or fall off before production and shipments actually change, which is part of why composite gauges like the Conference Board's Leading Economic Index lean heavily on order data.",
    citation: 'Zarnowitz, Victor. Business Cycles: Theory, History, Indicators, and Forecasting. University of Chicago Press, 1992, ch. 5; conceptual origins in Burns, Arthur F., and Wesley C. Mitchell. Measuring Business Cycles. NBER, 1946.',
    applications: ['Manufacturing PMI', 'Business cycle turning points', 'Supply chain stories'],
    svg: `<svg viewBox="0 0 400 220" role="img" aria-label="Two wavy lines over time, with new orders leading production by a phase shift, illustrating a leading indicator relationship">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="380" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="215" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Index level</text>
      <path d="M60,110 C90,65 120,65 150,110 C180,155 210,155 240,110 C270,65 300,65 330,110" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M90,110 C120,65 150,65 180,110 C210,155 240,155 270,110 C300,65 330,65 360,110" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="62" y="55" font-family="IBM Plex Mono" font-size="10" fill="#93701F">new orders (leading)</text>
      <text x="260" y="205" font-family="IBM Plex Mono" font-size="10" fill="#14181F">production (coincident, lagged)</text>
    </svg>`
  },
  islm: {
    name: 'IS-LM model',
    caption: 'The IS curve traces goods-market equilibrium, the LM curve money-market equilibrium; their crossing pins down output and the interest rate together.',
    description: "The IS-LM model explains short-run output and interest rates as where two markets balance out at once. The IS curve traces every combination of output and interest rates where spending matches production, the goods market; the LM curve traces every combination where money demand matches money supply, the money market. Wherever the two curves cross is where output and the interest rate land, and it's the standard tool for tracing how fiscal or monetary policy moves push each curve around.",
    citation: 'Hicks, John R. "Mr. Keynes and the \'Classics\': A Suggested Interpretation." Econometrica, vol. 5, no. 2, 1937; textbook treatment in Mankiw, Macroeconomics, ch. 11.',
    applications: ['Fed rate decisions', 'Fiscal stimulus', 'Monetary-fiscal interaction'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="IS-LM diagram: a downward sloping IS curve and an upward sloping LM curve crossing at the equilibrium output and interest rate">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Output, Y</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Interest rate, r</text>
      <path d="M70,50 C150,90 220,120 335,170" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M70,170 C150,140 220,100 335,50" fill="none" stroke="#14181F" stroke-width="2"/>
      <circle cx="205" cy="108" r="4" fill="#A93A2E"/>
      <text x="213" y="104" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">Y*, r*</text>
      <text x="290" y="165" font-family="IBM Plex Mono" font-size="10" fill="#93701F">IS</text>
      <text x="290" y="55" font-family="IBM Plex Mono" font-size="10" fill="#14181F">LM</text>
    </svg>`
  },
  adas: {
    name: 'Aggregate demand & aggregate supply',
    caption: 'Short-run equilibrium sits where aggregate demand meets short-run aggregate supply; the vertical line marks potential output.',
    description: "The AD-AS model explains short-run swings in output and prices as the meeting point of two curves: aggregate demand, which slopes down, and short-run aggregate supply, which slopes up. A vertical line marks the economy's long-run potential output. A demand or supply shock can knock the economy away from that potential level temporarily, but wages and prices eventually adjust and pull output back toward it.",
    citation: 'Mankiw, Macroeconomics, ch. 14-15; Blanchard, Macroeconomics, ch. 7.',
    applications: ['Supply shocks', 'Demand shocks', 'Inflation vs. output tradeoffs'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="AD-AS diagram: a downward sloping aggregate demand curve, an upward sloping short run aggregate supply curve, and a vertical long run aggregate supply line at potential output">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Real output, Y</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price level, P</text>
      <line x1="205" y1="18" x2="205" y2="190" stroke="#D6D0C2" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="205" y="14" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">LRAS (potential output)</text>
      <path d="M70,50 C150,90 250,130 335,170" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M70,170 C150,140 250,90 335,40" fill="none" stroke="#14181F" stroke-width="2"/>
      <circle cx="205" cy="105" r="4" fill="#A93A2E"/>
      <text x="120" y="165" font-family="IBM Plex Mono" font-size="10" fill="#93701F">AD</text>
      <text x="280" y="60" font-family="IBM Plex Mono" font-size="10" fill="#14181F">SRAS</text>
    </svg>`
  },
  solow: {
    name: 'Solow-Swan growth model',
    caption: 'Capital per worker converges to the steady state where investment per worker exactly offsets depreciation and population growth.',
    description: "The Solow-Swan model says that, if technology stays fixed, an economy's capital per worker eventually settles at a steady level, the point where new investment exactly covers wear-and-tear on existing capital plus the capital needed for a growing population. Because returns to capital diminish as you add more of it, simply building more capital can't keep output per worker growing forever. In this model, permanent growth in living standards only comes from improvements in technology.",
    citation: 'Solow, Robert M. "A Contribution to the Theory of Economic Growth." Quarterly Journal of Economics, vol. 70, no. 1, 1956; textbook treatment in Romer, David. Advanced Macroeconomics. 5th ed., McGraw-Hill, 2019, ch. 1-2.',
    applications: ['Long-run growth comparisons', 'Capital deepening', 'Emerging market catch-up'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Solow growth model diagram: a concave output-per-worker curve, a scaled-down investment curve, and a straight depreciation line, crossing at the steady state capital per worker">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Capital per worker, k</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Output / investment</text>
      <path d="M60,182 C120,80 220,42 340,25" fill="none" stroke="#454C56" stroke-width="1.5"/>
      <text x="300" y="35" font-family="IBM Plex Mono" font-size="10" fill="#454C56">f(k)</text>
      <path d="M60,182 C120,148 220,120 340,105" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="300" y="118" font-family="IBM Plex Mono" font-size="10" fill="#93701F">s &middot; f(k)</text>
      <line x1="60" y1="182" x2="340" y2="60" stroke="#14181F" stroke-width="2"/>
      <text x="290" y="70" font-family="IBM Plex Mono" font-size="10" fill="#14181F">(n+&#948;) k</text>
      <circle cx="215" cy="113" r="4" fill="#A93A2E"/>
      <line x1="215" y1="113" x2="215" y2="190" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="215" y="205" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">k*</text>
    </svg>`
  },
  qtm: {
    name: 'Quantity theory of money',
    caption: 'In the long run, sustained money growth in excess of real output growth passes one-for-one into inflation.',
    description: "The quantity theory of money says that, over the long run, money doesn't affect how much an economy actually produces, it just affects prices. If the money supply grows faster than real output, and the speed money changes hands stays roughly stable, that excess money growth shows up almost one-for-one as inflation. This shows up most clearly in extreme cases like hyperinflations, where money growth is so large it swamps every other factor driving prices.",
    citation: 'Friedman, Milton. "The Quantity Theory of Money: A Restatement," in Studies in the Quantity Theory of Money, University of Chicago Press, 1956; textbook treatment in Mishkin, Frederic S. The Economics of Money, Banking, and Financial Markets. 12th ed., Pearson, 2019, ch. 24.',
    applications: ['Money supply growth', 'Hyperinflation cases', 'Central bank balance sheets'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Quantity theory of money diagram: a 45 degree line showing inflation rising one for one with money supply growth in excess of output growth">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Money supply growth, &#916;m</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Inflation, &#960;</text>
      <line x1="60" y1="180" x2="340" y2="40" stroke="#93701F" stroke-width="2"/>
      <text x="230" y="70" font-family="IBM Plex Mono" font-size="10" fill="#93701F">&#960; = &#916;m &minus; &#916;y (long run)</text>
      <circle cx="230" cy="90" r="3.5" fill="#14181F"/>
      <circle cx="170" cy="120" r="3.5" fill="#14181F"/>
      <circle cx="290" cy="60" r="3.5" fill="#14181F"/>
    </svg>`
  },
  fisher: {
    name: 'Fisher equation',
    caption: 'The nominal rate tracks the roughly stable real rate plus expected inflation; the gap between the two lines is the expected inflation premium.',
    description: "The Fisher equation splits the nominal interest rate, the rate you actually see quoted, into two pieces: the real interest rate and expected inflation. Since the real rate tends to move much less than inflation expectations do, most of the swings in nominal rates over time come from changing inflation expectations. This is also how markets back out an implied inflation forecast, by comparing regular bond yields to inflation-protected bond yields.",
    citation: 'Fisher, Irving. The Theory of Interest. Macmillan, 1930, ch. 2; textbook treatment in Mishkin, The Economics of Money, Banking, and Financial Markets, ch. 4.',
    applications: ['Real vs. nominal rates', 'Bond yields', 'TIPS / breakeven inflation'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Fisher equation diagram: a flat real interest rate line and a rising nominal interest rate line, with the vertical gap between them equal to expected inflation">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Expected inflation, &#960;e</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Interest rate</text>
      <line x1="60" y1="140" x2="340" y2="140" stroke="#14181F" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="65" y="132" font-family="IBM Plex Mono" font-size="10" fill="#14181F">real rate, r (roughly stable)</text>
      <line x1="60" y1="140" x2="340" y2="40" stroke="#93701F" stroke-width="2"/>
      <text x="230" y="55" font-family="IBM Plex Mono" font-size="10" fill="#93701F">nominal rate, i = r + &#960;e</text>
      <line x1="260" y1="140" x2="260" y2="65" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="2,3"/>
      <text x="266" y="105" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">&#960;e</text>
    </svg>`
  },
  taylorrule: {
    name: 'Taylor rule',
    caption: 'The rule recommends raising the policy rate by more than one-for-one with inflation above target, so the real rate rises when inflation runs hot.',
    description: "The Taylor rule is a guideline for how a central bank should set its policy interest rate based on two things: how far inflation is from its target, and how far output is from its potential. Its key feature, the \"Taylor principle,\" is that when inflation rises above target, the central bank should raise rates by more than the increase in inflation itself, so real, inflation-adjusted rates actually go up and cool off demand instead of just keeping pace with rising prices.",
    citation: 'Taylor, John B. "Discretion versus Policy Rules in Practice." Carnegie-Rochester Conference Series on Public Policy, vol. 39, 1993; textbook treatment in Mishkin, The Economics of Money, Banking, and Financial Markets, ch. 17.',
    applications: ['Fed policy rate decisions', 'Rate-hike / cut debates', 'Central bank credibility'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Taylor rule diagram: an upward sloping line with slope greater than one relating the inflation gap to the recommended policy rate">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Inflation gap, &#960; &minus; &#960;*</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Recommended policy rate</text>
      <line x1="205" y1="18" x2="205" y2="190" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="205" y="14" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">&#960; = &#960;*</text>
      <line x1="70" y1="150" x2="330" y2="45" stroke="#93701F" stroke-width="2"/>
      <circle cx="205" cy="98" r="4" fill="#14181F"/>
      <text x="213" y="94" font-family="IBM Plex Mono" font-size="10" fill="#14181F">neutral rate</text>
      <text x="240" y="60" font-family="IBM Plex Mono" font-size="10" fill="#93701F">slope &gt; 1 (Taylor principle)</text>
    </svg>`
  },
  ricardian: {
    name: 'Ricardian equivalence',
    caption: 'A deficit-financed tax cut leaves Ricardian consumption unchanged, since households save the windfall against a future tax bill.',
    description: "Ricardian equivalence makes a strong claim: if a tax cut is paid for with borrowed money rather than spending cuts, it won't actually boost how much people spend. The idea is that households see the debt coming and realize the government will eventually need to raise taxes to pay it off, so instead of spending the tax-cut windfall, they save it to cover that future tax bill, leaving their overall spending unchanged. This relies on fairly strict assumptions about how forward-looking and rational households actually are.",
    citation: 'Barro, Robert J. "Are Government Bonds Net Wealth?" Journal of Political Economy, vol. 82, no. 6, 1974; textbook treatment in Mankiw, Macroeconomics, ch. 17.',
    applications: ['Deficit-financed tax cuts', 'Stimulus effectiveness debates', 'Fiscal policy skepticism'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Ricardian equivalence diagram: private consumption stays flat across a debt-financed tax cut under the Ricardian view, versus a temporary bump and reversal under the naive view">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Private consumption</text>
      <line x1="180" y1="18" x2="180" y2="190" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="180" y="14" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#454C56">debt-financed tax cut</text>
      <line x1="60" y1="110" x2="340" y2="110" stroke="#93701F" stroke-width="2"/>
      <text x="240" y="102" font-family="IBM Plex Mono" font-size="10" fill="#93701F">Ricardian: unchanged</text>
      <path d="M60,110 L180,110 C210,70 250,70 280,95 C310,112 330,110 340,110" fill="none" stroke="#14181F" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="185" y="60" font-family="IBM Plex Mono" font-size="10" fill="#14181F">naive: rises, then reverses</text>
    </svg>`
  },
  yieldcurve: {
    name: 'Term structure of interest rates',
    caption: 'A normal curve rises with maturity; an inversion, where short rates exceed long rates, has historically preceded recessions.',
    description: "The yield curve plots interest rates against how long a bond takes to mature. Normally, it slopes upward: investors demand more yield to lock up their money for longer, and markets expect short-term rates to rise over time. When it inverts, with short-term yields rising above long-term ones, that's historically been one of the more reliable early warning signs of a U.S. recession.",
    citation: 'Estrella, Arturo, and Frederic S. Mishkin. "The Yield Curve as a Predictor of U.S. Recessions." Current Issues in Economics and Finance, Federal Reserve Bank of New York, 1996; textbook treatment in Mishkin, The Economics of Money, Banking, and Financial Markets, ch. 6.',
    applications: ['Recession signals', 'Bond market coverage', 'Fed policy expectations'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Yield curve diagram: an upward sloping normal yield curve versus a downward sloping inverted yield curve across bond maturities">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Maturity (3mo &#8594; 30y)</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Yield</text>
      <path d="M60,150 C130,120 220,90 340,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="250" y="70" font-family="IBM Plex Mono" font-size="10" fill="#93701F">normal (expansion)</text>
      <path d="M60,70 C130,90 220,120 340,150" fill="none" stroke="#A93A2E" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="230" y="150" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">inverted (recession signal)</text>
    </svg>`
  },
  loanablefunds: {
    name: 'Loanable funds market',
    caption: 'Saving supplies loanable funds and investment demands them; the real interest rate clears the market where the two curves cross.',
    description: "In the loanable funds model, savings from households and businesses supply the pool of money available to borrow, while investment spending, plus any government borrowing, creates the demand for it. The real interest rate is whatever level balances the two: enough saving supplied to match how much borrowers want to borrow. When the government borrows more, it adds to that demand, pushing the real interest rate up and crowding out some private investment.",
    citation: 'Mankiw, N. Gregory. Principles of Economics. 8th ed., Cengage, 2018, ch. 26.',
    applications: ['Savings and investment', 'Real interest rate moves', 'Government borrowing crowding out'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Loanable funds diagram: an upward sloping supply of savings curve and a downward sloping investment demand curve crossing at the equilibrium real interest rate">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Quantity of loanable funds</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Real interest rate</text>
      <path d="M70,170 C150,140 220,100 335,50" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="270" y="65" font-family="IBM Plex Mono" font-size="10" fill="#93701F">supply (saving)</text>
      <path d="M70,50 C150,90 220,120 335,170" fill="none" stroke="#14181F" stroke-width="2"/>
      <text x="260" y="160" font-family="IBM Plex Mono" font-size="10" fill="#14181F">demand (investment)</text>
      <circle cx="205" cy="108" r="4" fill="#A93A2E"/>
    </svg>`
  },
  rbc: {
    name: 'Real business cycle theory',
    caption: 'A technology shock propagates through output, investment, and consumption together, with investment moving most and consumption least.',
    description: "Real business cycle theory explains booms and busts as the economy's efficient, rational response to real shocks, especially changes in productivity, rather than to sticky prices or wages. Because households prefer smooth, steady consumption over time, a positive productivity shock triggers a response where investment swings the most, overall output moves by a bit less, and consumption barely moves at all.",
    citation: 'Kydland, Finn E., and Edward C. Prescott. "Time to Build and Aggregate Fluctuations." Econometrica, vol. 50, no. 6, 1982; textbook treatment in Romer, Advanced Macroeconomics, ch. 5.',
    applications: ['Productivity shocks', 'Tech-driven expansions', 'Supply-side recessions'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Real business cycle impulse response diagram: output, investment, and consumption all rising after a technology shock then decaying back to trend, with investment moving the most and consumption the least">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="150" x2="360" y2="150" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time after technology shock</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Deviation from trend</text>
      <path d="M60,150 C90,20 130,10 170,20 C220,45 280,110 340,145" fill="none" stroke="#1E6B45" stroke-width="2"/>
      <text x="90" y="30" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">investment</text>
      <path d="M60,150 C90,60 130,50 170,55 C220,65 280,100 340,130" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="240" y="90" font-family="IBM Plex Mono" font-size="10" fill="#93701F">output</text>
      <path d="M60,150 C90,120 130,110 170,115 C220,125 280,140 340,148" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="260" y="140" font-family="IBM Plex Mono" font-size="10" fill="#14181F">consumption</text>
    </svg>`
  },
  nairu: {
    name: 'NAIRU (non-accelerating inflation rate of unemployment)',
    caption: 'Below the NAIRU, inflation keeps accelerating year after year rather than settling at a higher level.',
    description: "NAIRU is the unemployment rate at which inflation neither speeds up nor slows down. Because people adjust their inflation expectations based on recent experience, holding unemployment below the NAIRU doesn't just lock in a slightly higher inflation rate, it keeps pushing inflation higher year after year, since the tradeoff between unemployment and inflation continually shifts. It's the main argument against trying to permanently trade higher inflation for lower unemployment.",
    citation: 'Friedman, Milton. "The Role of Monetary Policy." American Economic Review, vol. 58, no. 1, 1968; Phelps, Edmund S. "Phillips Curves, Expectations of Inflation and Optimal Unemployment over Time." Economica, vol. 34, no. 135, 1967; textbook treatment in Blanchard, Macroeconomics, ch. 8.',
    applications: ['Labor market stories', 'Wage growth', 'Fed decisions'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="NAIRU diagram: a vertical line marking the non-accelerating inflation rate of unemployment, with inflation spiraling upward for unemployment held below it and flat above it">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Unemployment rate</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Inflation, &#960;</text>
      <line x1="210" y1="18" x2="210" y2="190" stroke="#14181F" stroke-width="1.5" stroke-dasharray="5,5"/>
      <text x="210" y="14" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" fill="#14181F">NAIRU</text>
      <path d="M100,175 C130,150 160,120 180,95 C195,75 200,55 208,32" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <text x="100" y="185" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">held below NAIRU: &#960; keeps rising</text>
      <line x1="212" y1="150" x2="340" y2="150" stroke="#93701F" stroke-width="2"/>
      <text x="240" y="167" font-family="IBM Plex Mono" font-size="10" fill="#93701F">at/above NAIRU: &#960; stabilizes</text>
    </svg>`
  },
  financial_accelerator: {
    name: 'Financial accelerator',
    caption: 'A shock to borrower net worth widens the external finance premium, which amplifies and propagates the initial shock through investment.',
    description: "The financial accelerator explains how trouble in credit markets can make an ordinary shock much worse. When a borrower's net worth drops, lenders see them as riskier and charge a bigger premium to lend to them. That higher cost of borrowing cuts into investment, which can push net worth down even further, a feedback loop that amplifies and drags out whatever shock started it.",
    citation: 'Bernanke, Ben S., Mark Gertler, and Simon Gilchrist. "The Financial Accelerator in a Quantitative Business Cycle Framework," in Handbook of Macroeconomics, vol. 1C, edited by John B. Taylor and Michael Woodford, Elsevier, 1999, ch. 21.',
    applications: ['Credit crises', 'Bank lending', 'Commercial real estate', 'Private credit'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Financial accelerator diagram: a downward sloping curve showing the external finance premium rising as borrower net worth falls, feeding back into a larger drop in investment">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Borrower net worth</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">External finance premium</text>
      <path d="M60,25 C110,45 150,80 200,120 C250,155 290,172 340,180" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="230" cy="112" r="4" fill="#14181F"/>
      <text x="150" y="60" font-family="IBM Plex Mono" font-size="10" fill="#454C56">net worth shock &#8594;</text>
      <path d="M230,112 L260,150" stroke="#A93A2E" stroke-width="1.5" marker-end="none"/>
      <text x="245" y="170" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">premium rises &#8594; investment falls further</text>
    </svg>`
  },
  minsky: {
    name: "Minsky's financial instability hypothesis",
    caption: 'Stability breeds risk-taking: balance sheets drift from hedge to speculative to Ponzi finance over the expansion, setting up the "Minsky moment."',
    description: "Minsky's financial instability hypothesis argues that long stretches of calm actually breed more risk-taking, not less. As an expansion goes on, borrowers drift from \"hedge finance,\" where cash flow easily covers both interest and principal, to \"speculative finance,\" where cash flow only covers the interest, and eventually to \"Ponzi finance,\" where they depend on rising asset prices or fresh borrowing just to stay afloat. By that point the system is fragile enough that almost any shock can trigger a sudden, painful unwind, the \"Minsky moment.\"",
    citation: 'Minsky, Hyman P. Stabilizing an Unstable Economy. Yale University Press, 1986, ch. 8; "The Financial Instability Hypothesis." Levy Economics Institute of Bard College, Working Paper No. 74, 1992.',
    applications: ['Bubbles', 'Leverage', 'Housing markets', 'Crypto'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Minsky financial instability diagram: leverage rising over the expansion from hedge finance through speculative finance to Ponzi finance, followed by a sharp deleveraging collapse">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time (expansion &#8594; bust)</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Leverage / risk-taking</text>
      <path d="M60,175 C110,160 150,140 190,110 C220,88 250,65 275,45" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M275,45 C295,80 315,130 335,175" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <circle cx="275" cy="45" r="4" fill="#A93A2E"/>
      <text x="240" y="35" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">Minsky moment</text>
      <text x="65" y="185" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">hedge</text>
      <text x="150" y="150" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">speculative</text>
      <text x="215" y="100" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">Ponzi</text>
    </svg>`
  },
  behavioral_finance: {
    name: 'Behavioral finance & prospect theory',
    caption: 'The value function is steeper for losses than for equivalent gains, so a loss hurts more than a same-sized gain feels good.',
    description: "Prospect theory replaces the classic idea that people rationally maximize expected value with something closer to how people actually feel about gains and losses relative to some reference point. People tend to get less excited about each additional dollar gained, which makes them risk-averse with gains, but they'll take on real risk to avoid locking in a loss. And because losses just hurt more than equivalent gains feel good, a pattern called loss aversion, a $100 loss feels worse than a $100 gain feels good.",
    citation: 'Kahneman, Daniel, and Amos Tversky. "Prospect Theory: An Analysis of Decision under Risk." Econometrica, vol. 47, no. 2, 1979; textbook treatment in Shefrin, Hersh. Beyond Greed and Fear: Understanding Behavioral Finance and the Psychology of Investing. Oxford University Press, 2002, ch. 2-3.',
    applications: ['Meme stocks', 'Retail investing', 'Market bubbles'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Prospect theory value function diagram: an S shaped curve that is concave for gains and steeper convex for losses, kinked at a reference point">
      <line x1="50" y1="105" x2="360" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="205" y1="18" x2="205" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Losses &#8592;   Gains &#8594;</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Perceived value</text>
      <path d="M205,105 C240,75 280,60 335,50" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M205,105 C175,140 130,175 65,188" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <circle cx="205" cy="105" r="3.5" fill="#14181F"/>
      <text x="212" y="118" font-family="IBM Plex Mono" font-size="10" fill="#14181F">reference point</text>
      <text x="270" y="55" font-family="IBM Plex Mono" font-size="10" fill="#93701F">gains: diminishing sensitivity</text>
      <text x="70" y="175" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">losses loom larger</text>
    </svg>`
  },
  comparative_advantage: {
    name: 'Comparative advantage & gains from trade',
    caption: 'Trade lets each country push consumption beyond its own production frontier by specializing where its opportunity cost is lowest.',
    description: "Comparative advantage shows that a country can gain from trade by specializing in whatever it gives up the least to produce, even if another country is better at making literally everything. What matters isn't who's more productive overall, it's who has the lower opportunity cost at each good. When both countries specialize this way and trade, they can each end up consuming more than either could produce entirely on its own.",
    citation: 'Ricardo, David. On the Principles of Political Economy and Taxation. John Murray, 1817, ch. 7; textbook treatment in Krugman, Obstfeld, and Melitz, International Economics, ch. 3.',
    applications: ['Trade wars', 'Tariffs', 'Manufacturing'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Comparative advantage diagram: a country's production possibility frontier compared with an outward-shifted consumption possibility line achievable through trade">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Good A</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Good B</text>
      <path d="M60,175 C140,165 220,140 300,80 C315,68 325,58 335,45" fill="none" stroke="#14181F" stroke-width="2"/>
      <text x="130" y="192" font-family="IBM Plex Mono" font-size="10" fill="#14181F">PPF (autarky)</text>
      <line x1="60" y1="185" x2="350" y2="35" stroke="#93701F" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="290" y="55" font-family="IBM Plex Mono" font-size="10" fill="#93701F">consumption via trade</text>
      <circle cx="230" cy="98" r="4" fill="#A93A2E"/>
      <text x="238" y="94" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">post-trade bundle (outside PPF)</text>
    </svg>`
  },
  endogenous_growth: {
    name: 'Endogenous growth (AK / R&D-based)',
    caption: 'Unlike Solow, growth here does not converge to zero: sustained investment in ideas or capital keeps output growing without diminishing returns.',
    description: "Endogenous growth models treat a country's long-run growth rate as something that comes out of real economic choices, like how much people invest in capital, education, or research, rather than something handed down externally the way the Solow model treats technology. Because these models sidestep the diminishing returns that eventually cap growth in the Solow model, sustained investment in capital or new ideas can keep output per worker rising indefinitely instead of leveling off.",
    citation: 'Romer, Paul M. "Increasing Returns and Long-Run Growth." Journal of Political Economy, vol. 94, no. 5, 1986; "Endogenous Technological Change." Journal of Political Economy, vol. 98, no. 5, part 2, 1990; textbook treatment in Barro, Robert J., and Xavier Sala-i-Martin. Economic Growth. 2nd ed., MIT Press, 2004, ch. 4 and 6.',
    applications: ['AI', 'Education', 'R&D', 'Innovation policy'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Endogenous growth diagram: output per worker rising exponentially without bound, contrasted with a Solow-style path that flattens out at a steady state">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Output per worker (log)</text>
      <path d="M60,180 C120,168 180,140 240,90 C280,58 310,35 340,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="230" y="55" font-family="IBM Plex Mono" font-size="10" fill="#93701F">endogenous: growth sustained</text>
      <path d="M60,180 C120,140 180,110 240,98 C280,92 310,90 340,89" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="255" y="105" font-family="IBM Plex Mono" font-size="10" fill="#14181F">Solow: converges, flattens</text>
    </svg>`
  },
  credit_cycle: {
    name: 'Credit cycle',
    caption: 'Credit growth and asset prices tend to reinforce each other on the way up and the way down, producing a boom-bust cycle around the real economy.',
    description: "The credit cycle describes how borrowing and asset prices tend to feed off each other. During a boom, rising asset prices support more lending, and that additional lending pushes asset prices up even further. During a bust, the same thing runs in reverse: falling prices weaken collateral, forcing borrowers to pay down debt, which pushes prices down more. Because of this feedback loop, credit and asset prices tend to swing much harder over the cycle than the underlying economy actually does.",
    citation: 'Bernanke, Ben S., and Mark Gertler. "Agency Costs, Net Worth, and Business Fluctuations." American Economic Review, vol. 79, no. 1, 1989; Kindleberger, Charles P., and Robert Z. Aliber. Manias, Panics, and Crashes: A History of Financial Crises. 7th ed., Palgrave Macmillan, 2015, ch. 2.',
    applications: ['Bank lending', 'Housing', 'Recessions'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Credit cycle diagram: credit growth and asset prices rising together in a boom then falling together in a bust, oscillating around a flatter real economic activity line">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Deviation from trend</text>
      <line x1="50" y1="120" x2="360" y2="120" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <path d="M60,140 C110,90 150,70 190,80 C230,95 250,150 290,170 C310,178 330,165 340,150" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="90" y="65" font-family="IBM Plex Mono" font-size="10" fill="#93701F">asset prices</text>
      <path d="M60,150 C110,115 150,100 190,105 C230,112 250,140 290,155 C310,160 330,150 340,140" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="270" y="185" font-family="IBM Plex Mono" font-size="10" fill="#14181F">credit growth</text>
      <path d="M60,122 C150,118 250,120 340,121" fill="none" stroke="#454C56" stroke-width="1.5"/>
      <text x="245" y="130" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">real activity (steadier)</text>
    </svg>`
  },
  debt_sustainability: {
    name: 'Debt sustainability (r &minus; g dynamics)',
    caption: 'The debt-to-GDP ratio is stable when the primary balance offsets (interest rate &minus; growth rate) times existing debt; when r exceeds g, debt compounds without a primary surplus.',
    description: "Whether a government's debt-to-GDP ratio stays stable comes down to two things: its primary budget balance (revenue minus spending, not counting interest) and the gap between the interest rate it pays on its debt and how fast the economy is growing. If the interest rate is higher than growth (r > g), the debt ratio keeps climbing unless the government runs a large enough primary surplus to offset it. If growth outpaces the interest rate (g > r), the debt ratio can hold steady or even shrink, even without a surplus.",
    citation: 'Blanchard, Olivier. "Public Debt and Low Interest Rates." American Economic Review, vol. 109, no. 4, 2019 (Presidential Address to the American Economic Association); textbook treatment in Blanchard, Macroeconomics, ch. 22.',
    applications: ['U.S. debt', 'Sovereign debt crises', 'Fiscal policy'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Debt sustainability diagram: debt to GDP ratio exploding upward when the interest rate exceeds the growth rate, versus stabilizing when growth exceeds the interest rate">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Debt / GDP</text>
      <path d="M60,160 C120,150 180,130 230,95 C270,68 300,45 335,25" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <text x="235" y="55" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">r &gt; g: ratio compounds up</text>
      <path d="M60,160 C120,155 180,150 230,148 C270,146 300,145 335,144" fill="none" stroke="#1E6B45" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="240" y="165" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">g &gt; r: ratio stabilizes/falls</text>
    </svg>`
  }
};
function theoryInfo(key){ return key && THEORY_LIBRARY[key] ? THEORY_LIBRARY[key] : null; }
