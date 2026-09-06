const THEORY_LIBRARY = {
  phillips: {
    name: 'New Keynesian Phillips curve',
    caption: 'Inflation rises with the output gap; a higher expected inflation path shifts the whole curve up.',
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
  }
};
function theoryInfo(key){ return key && THEORY_LIBRARY[key] ? THEORY_LIBRARY[key] : null; }
