/* ------------------------------------------------------------------
   strategies.js
   Library backing the "Trading strategy classroom" page — a static,
   non-article reference page (same pattern as THEORY_LIBRARY /
   Economics classroom in theories.js / render.js).

   STRATEGY_CATEGORIES fixes the display order of category headers.
   Each entry in STRATEGY_LIBRARY carries a `category` field that must
   match one of these strings exactly, or it won't be grouped/shown.

   Adding a new strategy later = add one entry below. No render.js
   changes needed as long as its `category` already exists here.
------------------------------------------------------------------- */

const STRATEGY_CATEGORIES = [
  'Trend structure & following',
  'Momentum',
  'Breakout',
  'Mean reversion',
  'Reversal patterns',
  'Continuation patterns',
  'Volume-based',
  'Gaps',
  'Fundamentals-adjacent',
  'Event & catalyst-driven',
  'Risk management'
];

const STRATEGY_LIBRARY = {

  trend_structure: {
    name: 'Higher highs & higher lows',
    category: 'Trend structure & following',
    caption: 'An uptrend prints each pullback low above the prior low, and each rally high above the prior high; a downtrend mirrors this in reverse.',
    description: "This is the basic definition of trend used underneath almost every other trend-following tool: an uptrend is a sequence of swing highs and swing lows that both step upward over time, and a downtrend is the mirror image (lower highs, lower lows). Note the terminology carefully — a 'new low' on its own means price has fallen to the lowest point of a given window, which is a bearish signal; it is the pullback low sitting above the previous pullback low (a 'higher low') that confirms an uptrend is intact. The structure breaks, and a reversal becomes possible, the first time a pullback prints a lower low than the one before it.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 3.',
    applications: ['Trend confirmation', 'Swing trading', 'Entry timing after a pullback'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Higher highs and higher lows chart: each pullback low sits above the prior low, and each rally high exceeds the prior high, confirming an uptrend">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="70" y1="168" x2="360" y2="168" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="130" y1="120" x2="360" y2="120" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <path d="M70,168 L130,120 L175,145 L225,90 L270,112 L330,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="70" cy="168" r="3.5" fill="#14181F"/>
      <circle cx="130" cy="120" r="3.5" fill="#14181F"/>
      <circle cx="175" cy="145" r="3.5" fill="#1E6B45"/>
      <circle cx="225" cy="90" r="3.5" fill="#1E6B45"/>
      <circle cx="270" cy="112" r="3.5" fill="#1E6B45"/>
      <circle cx="330" cy="55" r="3.5" fill="#1E6B45"/>
      <text x="55" y="182" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">low</text>
      <text x="118" y="108" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">high</text>
      <text x="160" y="160" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">HL</text>
      <text x="212" y="80" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">HH</text>
      <text x="255" y="126" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">HL</text>
      <text x="316" y="45" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">HH</text>
    </svg>`
  },

  ma_crossover: {
    name: 'Moving average crossover',
    category: 'Trend structure & following',
    caption: 'A faster moving average crossing above a slower one (a "golden cross") is read as a fresh uptrend signal; crossing below (a "death cross") is read as a fresh downtrend signal.',
    description: "The crossover of two moving averages of different lengths — commonly the 50-day and 200-day for a longer-horizon signal — is one of the oldest mechanical trend signals: when the faster average overtakes the slower one, recent prices are outpacing the longer-run average, taken as confirmation an uptrend has become established. It's a lagging signal by construction (it reacts to price that has already moved) and tends to whipsaw in a sideways market, which is why it is usually paired with a trend-strength filter such as ADX rather than used alone.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 9.',
    applications: ['Golden cross / death cross', 'Longer-horizon trend confirmation', 'Position trading'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Moving average crossover diagram: a faster moving average crossing above a slower moving average, marking a golden cross buy signal">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,150 C120,155 180,145 230,115 C270,92 300,70 340,50" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M60,120 C120,118 180,120 230,118 C270,116 300,108 340,95" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <circle cx="230" cy="117" r="4" fill="#1E6B45"/>
      <text x="236" y="112" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">golden cross</text>
      <text x="288" y="65" font-family="IBM Plex Mono" font-size="10" fill="#93701F">50-day MA</text>
      <text x="288" y="130" font-family="IBM Plex Mono" font-size="10" fill="#14181F">200-day MA</text>
    </svg>`
  },

  ma_ribbon: {
    name: 'Moving average ribbon',
    category: 'Trend structure & following',
    caption: 'Several moving averages of different lengths, stacked in order and fanning apart, describe a strong and accelerating trend; a tangled, converging ribbon describes a weak or transitioning one.',
    description: "Plotting a whole stack of moving averages (e.g. 10, 20, 50, 100, 200-day) instead of just two turns the crossover idea into a spectrum: when every average is stacked in order and spreading apart, the trend is strong and broad-based across timeframes. When the lines start converging or crossing each other, momentum is fading even if price hasn't reversed yet — often an earlier warning than waiting for a single slow crossover.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 9.',
    applications: ['Trend strength (visual)', 'Early warning of trend fatigue', 'Multi-timeframe confirmation'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Moving average ribbon diagram: several moving averages of different lengths stacked in order and fanning apart, showing a strong established uptrend">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,170 C140,150 220,110 335,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M60,175 C140,160 220,125 335,75" fill="none" stroke="#B08A2E" stroke-width="1.75"/>
      <path d="M60,178 C140,168 220,140 335,95" fill="none" stroke="#454C56" stroke-width="1.5"/>
      <path d="M60,180 C140,174 220,152 335,115" fill="none" stroke="#8B8578" stroke-width="1.25" stroke-dasharray="5,3"/>
      <text x="338" y="58" font-family="IBM Plex Mono" font-size="9" fill="#93701F">10-day</text>
      <text x="338" y="78" font-family="IBM Plex Mono" font-size="9" fill="#B08A2E">20-day</text>
      <text x="338" y="98" font-family="IBM Plex Mono" font-size="9" fill="#454C56">50-day</text>
      <text x="338" y="118" font-family="IBM Plex Mono" font-size="9" fill="#8B8578">200-day</text>
      <text x="110" y="100" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">ribbon fanning &#8594; trend strengthening</text>
    </svg>`
  },

  adx_trend_strength: {
    name: 'ADX trend-strength filter',
    category: 'Trend structure & following',
    caption: 'ADX measures how strong a trend is, not its direction; a rising ADX above roughly 25 favors trend-following tactics, while a low or falling ADX favors range/mean-reversion tactics instead.',
    description: "The Average Directional Index answers a different question than most indicators: not 'which way is price going' but 'how strong is whatever move is happening.' A low, flat ADX describes a choppy, range-bound market where trend-following signals (crossovers, breakouts) tend to whipsaw. A rising ADX crossing above roughly 25 is read as confirmation a real trend is underway, which is why it's commonly used as a filter layered on top of a directional signal rather than a signal by itself.",
    citation: 'Wilder, J. Welles. New Concepts in Technical Trading Systems. Trend Research, 1978, ch. 4.',
    applications: ['Filtering trend signals', 'Choosing trend-following vs. mean-reversion regime', 'Avoiding chop'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="ADX diagram: price consolidating while ADX is low, then trending strongly while ADX rises above the 25 threshold">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,60 C100,50 140,68 180,55 C220,42 260,25 340,15" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="150" x2="360" y2="150" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="330" y="146" font-family="IBM Plex Mono" font-size="9" fill="#A93A2E">25</text>
      <path d="M60,175 C100,178 140,170 180,160 C220,140 260,110 340,120" fill="none" stroke="#14181F" stroke-width="2"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">ADX</text>
      <text x="200" y="130" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">rising ADX &#8594; trend strengthening</text>
    </svg>`
  },

  trendline_break_retest: {
    name: 'Trendline break & retest',
    category: 'Trend structure & following',
    caption: 'Price often returns to "kiss" a broken trendline from the opposite side before continuing in the new direction, giving a lower-risk confirmation entry than acting on the break alone.',
    description: "Drawing a line under a series of rising swing lows (or over falling swing highs) gives a visual support/resistance level for the trend itself. A break of that line is the market's first hint the trend is losing control, but breaks alone produce a lot of false signals; many traders wait for a retest — price returning to touch the broken line from the other side and failing to reclaim it — as tighter confirmation before entering, since the former support has now flipped to resistance (or vice versa).",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 4.',
    applications: ['Trend-reversal entries', 'Reducing false-breakout risk', 'Stop placement above/below the retest'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Trendline break and retest diagram: price bouncing off a rising trendline several times, then breaking below it and retesting the line from underneath before continuing lower">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="65" y1="175" x2="300" y2="70" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <path d="M65,175 L100,150 L120,168 L160,130 L180,150 L220,105 L245,120 L280,90 L305,115 L330,145" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="305" cy="115" r="4" fill="#A93A2E"/>
      <text x="240" y="182" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">retest as resistance</text>
      <text x="130" y="188" font-family="IBM Plex Mono" font-size="10" fill="#454C56">rising trendline (support)</text>
    </svg>`
  },

  parabolic_sar: {
    name: 'Parabolic SAR',
    category: 'Trend structure & following',
    caption: 'Dots trail below price during an uptrend as a rising stop level; once price trades through the dot, it flips to the other side, signaling a potential trend reversal.',
    description: "Parabolic SAR ('stop and reverse') plots a series of dots that trail price at an accelerating pace as a trend matures — below price in an uptrend, above it in a downtrend — functioning simultaneously as a trailing stop-loss and a reversal signal. When price crosses through the dot, SAR flips to the other side of the price, which traders read either as an exit for the existing position or an entry for the opposite one. Like most trend tools, it works well in sustained trends and generates frequent false flips in choppy, sideways markets.",
    citation: 'Wilder, J. Welles. New Concepts in Technical Trading Systems. Trend Research, 1978, ch. 3.',
    applications: ['Trailing stop-loss', 'Reversal/exit signal', 'Best in sustained trends'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Parabolic SAR diagram: dots trailing below price during an uptrend, flipping to above price once the trend reverses">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,170 C110,150 150,110 200,80 C230,62 250,55 270,60 C300,68 320,100 340,130" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="80" cy="185" r="2.5" fill="#1E6B45"/>
      <circle cx="110" cy="178" r="2.5" fill="#1E6B45"/>
      <circle cx="140" cy="160" r="2.5" fill="#1E6B45"/>
      <circle cx="170" cy="135" r="2.5" fill="#1E6B45"/>
      <circle cx="200" cy="105" r="2.5" fill="#1E6B45"/>
      <circle cx="230" cy="80" r="2.5" fill="#1E6B45"/>
      <circle cx="270" cy="42" r="2.5" fill="#A93A2E"/>
      <circle cx="300" cy="50" r="2.5" fill="#A93A2E"/>
      <circle cx="330" cy="70" r="2.5" fill="#A93A2E"/>
      <text x="120" y="200" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">dots below &#8594; uptrend</text>
      <text x="250" y="30" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">flip above &#8594; reversal</text>
    </svg>`
  }

};

function strategyInfo(key){ return key && STRATEGY_LIBRARY[key] ? STRATEGY_LIBRARY[key] : null; }
