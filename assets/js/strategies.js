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
  },

  rsi_overbought_oversold: {
    name: 'RSI overbought / oversold',
    category: 'Momentum',
    caption: 'RSI oscillates between 0 and 100; readings above roughly 70 are read as overbought, below roughly 30 as oversold, flagging conditions where a pullback or bounce becomes more likely.',
    description: "The Relative Strength Index compares the size of recent gains to recent losses over a lookback period (commonly 14 bars) and compresses the result into a 0–100 oscillator. Above ~70, the move is considered stretched to the upside and vulnerable to a pullback; below ~30, stretched to the downside and vulnerable to a bounce. In a strong trend, though, RSI can sit in 'overbought' or 'oversold' territory for a long stretch without reversing — the levels flag stretched conditions, not a guaranteed turn, which is why they're usually combined with price structure or a trend filter rather than traded in isolation.",
    citation: 'Wilder, J. Welles. New Concepts in Technical Trading Systems. Trend Research, 1978, ch. 6.',
    applications: ['Range-bound markets', 'Pullback/bounce timing', 'Overextension warning'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="RSI diagram: an oscillator moving between overbought territory above 70 and oversold territory below 30">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,60 C100,45 140,70 180,58 C220,48 260,30 340,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="125" x2="360" y2="125" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="330" y="121" font-family="IBM Plex Mono" font-size="9" fill="#A93A2E">70</text>
      <line x1="50" y1="172" x2="360" y2="172" stroke="#1E6B45" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="330" y="168" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">30</text>
      <path d="M60,150 C100,120 140,105 165,112 C190,120 210,175 235,182 C260,186 300,150 340,140" fill="none" stroke="#14181F" stroke-width="2"/>
      <circle cx="165" cy="112" r="3" fill="#A93A2E"/>
      <circle cx="235" cy="182" r="3" fill="#1E6B45"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">RSI</text>
      <text x="170" y="105" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">overbought</text>
      <text x="240" y="200" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">oversold</text>
    </svg>`
  },

  rsi_divergence: {
    name: 'RSI divergence',
    caption: 'Price makes a new high while RSI makes a lower high (or vice versa) — momentum is failing to confirm the price move, often ahead of a reversal.',
    category: 'Momentum',
    description: "Divergence occurs when price and its momentum oscillator disagree: price prints a higher high but RSI prints a lower high (bearish divergence), or price prints a lower low while RSI prints a higher low (bullish divergence). The idea is that momentum often peaks before price does — the move higher is being made on weaker and weaker thrust, which can precede a reversal or at least a stall. Divergence is a warning sign, not a timing signal on its own; it can persist for a while before price actually turns, so it's typically used alongside a price-structure break for entry.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 10.',
    applications: ['Early reversal warning', 'Exit timing on existing positions', 'Confirmation with price structure'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="RSI divergence diagram: price making a higher high while RSI makes a lower high, a bearish divergence warning">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,80 C100,60 140,45 175,40 C230,60 280,50 320,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="175" cy="40" r="3" fill="#14181F"/>
      <circle cx="320" cy="20" r="3" fill="#14181F"/>
      <line x1="175" y1="40" x2="320" y2="20" stroke="#14181F" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="220" y="24" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">higher high (price)</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <path d="M60,165 C100,145 140,115 175,110 C230,140 280,150 320,135" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <circle cx="175" cy="110" r="3" fill="#A93A2E"/>
      <circle cx="320" cy="135" r="3" fill="#A93A2E"/>
      <line x1="175" y1="110" x2="320" y2="135" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">RSI</text>
      <text x="220" y="150" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">lower high (RSI) &#8594; divergence</text>
    </svg>`
  },

  macd_crossover: {
    name: 'MACD crossover',
    category: 'Momentum',
    caption: 'When the MACD line crosses above its signal line, momentum is turning up; a cross below signals momentum turning down.',
    description: "MACD (Moving Average Convergence Divergence) plots the difference between a fast and slow exponential moving average (typically 12 and 26-period) as the 'MACD line,' alongside a further-smoothed 'signal line' (typically a 9-period EMA of the MACD line). A cross of the MACD line above the signal line is read as a shift toward bullish momentum; a cross below, bearish. It reacts faster than a plain moving-average crossover on price since it's derived from the momentum of price rather than price itself, but it's still lagging and prone to whipsaws in a sideways, low-volatility market.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 11.',
    applications: ['Momentum shift confirmation', 'Combining with trend filter', 'Swing trading entries/exits'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="MACD crossover diagram: the MACD line crossing above its signal line, marking a shift to bullish momentum">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="105" x2="360" y2="105" stroke="#D6D0C2" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">MACD</text>
      <path d="M60,130 C110,140 150,150 190,135 C230,110 270,60 340,45" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M60,120 C110,125 150,135 190,140 C230,130 270,95 340,75" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <circle cx="205" cy="122" r="4" fill="#1E6B45"/>
      <text x="212" y="118" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">bullish crossover</text>
      <text x="295" y="42" font-family="IBM Plex Mono" font-size="10" fill="#93701F">MACD line</text>
      <text x="295" y="72" font-family="IBM Plex Mono" font-size="10" fill="#14181F">signal line</text>
    </svg>`
  },

  macd_histogram_divergence: {
    name: 'MACD histogram divergence',
    category: 'Momentum',
    caption: 'The histogram (the gap between the MACD and signal lines) shrinking while price keeps making new highs shows momentum fading before price confirms it.',
    description: "The MACD histogram plots the distance between the MACD line and its signal line as bars, making the moment of a crossover (histogram crosses zero) and the strength of momentum (bar height) easier to read at a glance than the two lines alone. A shrinking histogram — bars getting shorter even as price pushes to new highs — shows the underlying momentum behind the move is fading, similar in spirit to RSI divergence but derived from the crossover indicator itself. It's often used as a heads-up to tighten stops or take partial profits rather than an outright reversal trigger.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 11.',
    applications: ['Early momentum-fade warning', 'Profit-taking / stop-tightening cue', 'Confirming RSI divergence'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="MACD histogram divergence diagram: price making higher highs while the MACD histogram bars shrink, showing fading momentum">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,80 C100,60 140,45 180,38 C230,55 280,45 320,18" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="150" x2="360" y2="150" stroke="#D6D0C2" stroke-width="1"/>
      <rect x="70" y="120" width="10" height="30" fill="#454C56"/>
      <rect x="100" y="105" width="10" height="45" fill="#454C56"/>
      <rect x="130" y="112" width="10" height="38" fill="#454C56"/>
      <rect x="230" y="130" width="10" height="20" fill="#A93A2E"/>
      <rect x="260" y="135" width="10" height="15" fill="#A93A2E"/>
      <rect x="290" y="140" width="10" height="10" fill="#A93A2E"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">Histogram</text>
      <text x="230" y="165" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">shrinking bars &#8594; fading momentum</text>
    </svg>`
  },

  stochastic_oscillator: {
    name: 'Stochastic oscillator',
    category: 'Momentum',
    caption: 'Measures where the close sits within the recent high-low range; the %K line crossing above %D near the oversold zone is a common bounce signal.',
    description: "The stochastic oscillator compares the most recent close to the high-low range over a lookback period (commonly 14 bars), on the idea that closes near the top of the range in an uptrend show strength, and closes near the bottom in a downtrend show weakness. It plots a fast line (%K) and a smoothed line (%D), scaled 0–100 with overbought/oversold zones typically drawn at 80 and 20. It's more sensitive (and choppier) than RSI, so it's often favored for shorter-timeframe, range-bound setups rather than long-horizon trend calls.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 10.',
    applications: ['Short-timeframe range trading', '%K/%D crossover entries', 'Overbought/oversold in choppy markets'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Stochastic oscillator diagram: %K and %D lines oscillating between overbought territory near 80 and oversold territory near 20">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="45" x2="360" y2="45" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="330" y="41" font-family="IBM Plex Mono" font-size="9" fill="#A93A2E">80</text>
      <line x1="50" y1="160" x2="360" y2="160" stroke="#1E6B45" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="330" y="156" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">20</text>
      <path d="M60,150 C90,100 110,50 140,40 C170,50 190,120 220,165 C250,175 270,140 300,60 C315,40 330,35 340,38" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M60,155 C90,115 110,65 140,50 C170,55 190,105 220,155 C250,170 270,150 300,80 C315,55 330,45 340,42" fill="none" stroke="#14181F" stroke-width="1.5" stroke-dasharray="5,3"/>
      <circle cx="145" cy="43" r="3" fill="#A93A2E"/>
      <circle cx="222" cy="163" r="3" fill="#1E6B45"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Stochastic</text>
      <text x="270" y="30" font-family="IBM Plex Mono" font-size="9.5" fill="#93701F">%K (fast)</text>
      <text x="270" y="200" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">%D (smoothed)</text>
    </svg>`
  },

  rate_of_change: {
    name: 'Rate of change (ROC)',
    category: 'Momentum',
    caption: 'Plots the percentage change in price over a fixed lookback; readings pulling away from zero show accelerating momentum, and a cross back through zero flags momentum stalling.',
    description: "Rate of change is one of the simplest momentum measures: the percentage difference between the current price and the price a fixed number of bars ago. Unlike RSI or stochastics, it isn't bounded between 0 and 100 — it can keep extending as momentum accelerates, which makes it useful for spotting the most explosive phase of a move. A cross back through the zero line means price is no longer higher (or lower) than it was N bars ago, i.e. that specific momentum window has stalled, which is often an earlier signal than waiting for price itself to roll over.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 10.',
    applications: ['Momentum acceleration/deceleration', 'Zero-line crossovers', 'Comparing momentum across assets'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Rate of change diagram: an oscillator swinging above and below a zero line, showing momentum accelerating away from zero then crossing back through it">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="105" x2="360" y2="105" stroke="#454C56" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="335" y="101" font-family="IBM Plex Mono" font-size="9" fill="#454C56">0</text>
      <path d="M60,110 C100,95 140,50 180,35 C220,55 260,100 290,120 C310,132 330,128 340,120" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="180" cy="35" r="3" fill="#1E6B45"/>
      <text x="150" y="25" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">momentum peak</text>
      <circle cx="272" cy="105" r="3" fill="#A93A2E"/>
      <text x="225" y="145" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">crosses zero &#8594; momentum stalls</text>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">ROC %</text>
    </svg>`
  },

  support_resistance_breakout: {
    name: 'Support / resistance breakout',
    category: 'Breakout',
    caption: 'Price coils beneath a horizontal resistance level (or above a support floor) and then clears it decisively, often on a pickup in volume, opening the way for a continuation move.',
    description: "Support and resistance are price levels where buying or selling has repeatedly stepped in before, visible as a horizontal ceiling or floor on a chart. A breakout is a decisive close through that level — decisive matters, because a wick that barely pokes through and closes back inside the range is a false breakout, one of the most common failure modes traders watch for. Volume expanding on the break is treated as corroborating evidence that real participation is behind the move, not just a thin, low-conviction poke through the line.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 4.',
    applications: ['Range breakouts', 'Volume confirmation', 'False-breakout avoidance'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Support and resistance breakout diagram: price testing a horizontal resistance level several times before breaking cleanly above it">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="60" y1="90" x2="290" y2="90" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="65" y="82" font-family="IBM Plex Mono" font-size="10" fill="#454C56">resistance</text>
      <path d="M60,160 C90,120 110,95 130,92 C150,90 165,110 180,130 C200,150 215,110 230,92 C245,78 260,90 275,100 C295,75 320,45 340,25" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="130" cy="92" r="3" fill="#14181F"/>
      <circle cx="230" cy="92" r="3" fill="#14181F"/>
      <circle cx="295" cy="75" r="4" fill="#1E6B45"/>
      <text x="235" y="45" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">clean breakout</text>
    </svg>`
  },

  fifty_two_week_breakout: {
    name: '52-week high / low breakout',
    category: 'Breakout',
    caption: 'A stock pushing to a new 52-week high is read as strength attracting further buying (momentum begets momentum); a new 52-week low is read the same way in reverse.',
    description: "Trading off a 52-week high or low leans on the observation that stocks making fresh yearly extremes tend to attract attention and follow-through buying (or selling) precisely because everyone holding the stock is now in a gain (or loss) versus the past year, which shapes their behavior. It's a simple, widely-watched screen — 'new highs list' style scans are a staple of momentum and growth-style trading — but it says nothing about valuation or whether the move is overextended, so it's usually paired with a volume or trend-strength filter.",
    citation: 'O\'Neil, William J. How to Make Money in Stocks. 4th ed., McGraw-Hill, 2009, ch. 3.',
    applications: ['Momentum/growth screens', 'New-highs list scanning', 'Relative strength confirmation'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="52-week high breakout diagram: price consolidating just under its prior 52-week high before breaking through to a fresh yearly high">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="60" y1="60" x2="250" y2="60" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="63" y="52" font-family="IBM Plex Mono" font-size="10" fill="#454C56">prior 52-week high</text>
      <path d="M60,150 C100,110 140,70 175,62 C200,58 220,62 240,60 C270,50 300,35 340,15" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="250" cy="58" r="4" fill="#1E6B45"/>
      <text x="255" y="42" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">fresh 52-week high</text>
    </svg>`
  },

  darvas_box: {
    name: 'Darvas box',
    category: 'Breakout',
    caption: 'Price is boxed in between a defined ceiling and floor as it consolidates; a close above the box top is the buy signal, with the box floor doubling as the stop-loss.',
    description: "The Darvas box method defines a mechanical range: as a stock consolidates, the recent swing high becomes the box top and the recent swing low becomes the box bottom. A new box only forms once price has spent enough time inside a range to confirm it. The entry signal is a close above the box top (ideally on the back of a broader uptrend and rising volume), with a stop placed just under the box floor — turning consolidation itself into a clean, rules-based entry and risk level rather than something read subjectively off the chart.",
    citation: "Darvas, Nicolas. How I Made $2,000,000 in the Stock Market. Lyle Stuart, 1960.",
    applications: ['Rules-based breakout entries', 'Defining stop-loss from consolidation', 'Trend continuation'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Darvas box diagram: price consolidating inside a rectangular box, then breaking above the box top as a buy signal with the box bottom marking the stop-loss">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <rect x="90" y="80" width="150" height="60" fill="none" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="95" y="74" font-family="IBM Plex Mono" font-size="10" fill="#454C56">box top</text>
      <text x="95" y="152" font-family="IBM Plex Mono" font-size="10" fill="#454C56">box bottom (stop)</text>
      <path d="M60,150 C75,120 85,95 100,90 C120,110 130,130 145,120 C165,105 180,90 200,95 C215,98 225,110 240,80 C260,55 290,30 340,18" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="240" cy="80" r="4" fill="#1E6B45"/>
      <text x="248" y="70" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breaks box top &#8594; buy</text>
    </svg>`
  },

  bollinger_squeeze: {
    name: 'Bollinger Band squeeze',
    category: 'Breakout',
    caption: 'Bands narrowing to their tightest point in a while shows volatility compressing; the eventual expansion, whichever direction it breaks, tends to be a sharp move.',
    description: "Bollinger Bands plot a moving average with an upper and lower band set a number of standard deviations away, so band width directly tracks volatility. A 'squeeze' — bands pulling in tight — shows the market coiling in a period of unusually low volatility, which historically precedes a volatility expansion (the exact direction isn't given by the squeeze itself, only that a bigger move is brewing). Traders typically wait for price to close outside a band, or for a clear directional cue from another indicator, before committing to a direction rather than guessing which way the squeeze resolves.",
    citation: 'Bollinger, John. Bollinger on Bollinger Bands. McGraw-Hill, 2001, ch. 8.',
    applications: ['Volatility contraction/expansion', 'Pre-breakout positioning', 'Options volatility plays'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Bollinger Band squeeze diagram: the upper and lower bands narrowing tightly around price, then expanding sharply as price breaks out">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,140 C110,105 160,98 200,100 C230,101 250,99 270,95 C290,60 315,30 340,15" fill="none" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M60,160 C110,125 160,118 200,120 C230,121 250,119 270,125 C290,150 315,175 340,190" fill="none" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M60,150 C110,115 160,108 200,110 C230,111 250,109 270,110 C290,90 315,55 340,30" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="190" y="130" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">squeeze (bands narrow)</text>
      <text x="280" y="55" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">expansion</text>
    </svg>`
  },

  opening_range_breakout: {
    name: 'Opening range breakout',
    category: 'Breakout',
    caption: "The high and low of the first N minutes of a trading session define a range; a break above or below it is traded as the day's directional signal.",
    description: "An intraday strategy: the high and low printed in the first slice of the session (commonly the first 5, 15, or 30 minutes) sets the 'opening range.' A break above that range is treated as bullish for the rest of the session; a break below, bearish. The logic is that the open often reflects overnight order imbalance and early positioning, and once that initial tug-of-war resolves in one direction, it can carry through the day — though the strategy is also prone to false breaks around midday chop, so many variants require confirmation (volume, a retest, or a minimum move size) before entering.",
    citation: 'Toby Crabel, Day Trading with Short Term Price Patterns and Opening Range Breakout, Traders Press, 1990.',
    applications: ['Day trading', 'Intraday directional bias', 'Requires volume/retest confirmation'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Opening range breakout diagram: the high and low of the first part of the session forming a range, followed by a breakout above that range later in the day">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time of day</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <rect x="60" y="95" width="70" height="45" fill="#F1E4C2" stroke="#93701F" stroke-width="1"/>
      <text x="62" y="90" font-family="IBM Plex Mono" font-size="9.5" fill="#93701F">opening range</text>
      <path d="M60,130 C75,105 90,98 105,110 C118,120 125,130 130,120 C160,140 200,138 230,110 C260,80 300,50 340,25" fill="none" stroke="#14181F" stroke-width="2"/>
      <circle cx="230" cy="95" r="4" fill="#1E6B45"/>
      <text x="238" y="90" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breaks above range</text>
    </svg>`
  },

  bollinger_fade: {
    name: 'Bollinger Band fade',
    category: 'Mean reversion',
    caption: 'In a range-bound market, a touch of the upper band is treated as a sell opportunity and a touch of the lower band as a buy, on the expectation price reverts toward the middle band.',
    description: "This is the mean-reversion cousin of the Bollinger squeeze: rather than waiting for a volatility breakout, the fade approach treats the bands themselves as a probabilistic boundary — statistically, price should spend most of its time between them, so a touch or brief poke outside a band is read as overextended and likely to snap back toward the middle (moving-average) band. This only works well in a genuinely range-bound market; in a strong trend, price can 'walk the band' — hugging the upper or lower band for an extended stretch — which is the main way this strategy loses money if applied blindly.",
    citation: 'Bollinger, John. Bollinger on Bollinger Bands. McGraw-Hill, 2001, ch. 6.',
    applications: ['Range-bound markets', 'Counter-trend entries', 'Requires trend filter to avoid band-walking'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Bollinger Band fade diagram: price oscillating between the upper and lower bands in a range-bound market, with reversals occurring at each band touch">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,60 C150,55 250,58 340,60" fill="none" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M60,150 C150,155 250,152 340,150" fill="none" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M60,105 C150,105 250,105 340,105" fill="none" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,110 C80,140 95,150 110,148 C130,145 140,90 160,62 C175,60 190,95 205,140 C220,150 235,140 250,100 C265,65 280,60 295,90 C310,130 325,148 340,120" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="160" cy="62" r="3.5" fill="#A93A2E"/>
      <circle cx="295" cy="90" r="3.5" fill="#A93A2E"/>
      <circle cx="110" cy="148" r="3.5" fill="#1E6B45"/>
      <circle cx="250" cy="100" r="3.5" fill="#1E6B45"/>
      <text x="165" y="48" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">fade at upper band</text>
      <text x="90" y="170" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">fade at lower band</text>
    </svg>`
  },

  rsi_range_extremes: {
    name: 'RSI extremes in range-bound markets',
    category: 'Mean reversion',
    caption: 'The same RSI overbought/oversold readings used as a warning in a trend become an actual entry signal once ADX or price structure confirms the market has no trend to fight.',
    description: "This pairs two tools already in the library rather than introducing a new one: RSI overbought/oversold levels (70/30) are unreliable as standalone entries in a trending market, since a strong trend can pin RSI at an extreme for a long stretch. Confirm first, with a low/falling ADX reading or a clearly horizontal price structure, that the market genuinely lacks a trend — only then does fading RSI extremes become a reasonably favorable-odds trade rather than fighting the dominant direction.",
    citation: 'Wilder, J. Welles. New Concepts in Technical Trading Systems. Trend Research, 1978, ch. 4 and 6.',
    applications: ['Range confirmation via ADX first', 'Counter-trend entries in chop', 'Avoiding trend-fighting mistakes'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="RSI extremes in a range-bound market diagram: price oscillating sideways between support and resistance while RSI repeatedly touches overbought and oversold levels at each turn">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,55 C100,30 140,65 180,60 C220,35 260,68 340,45" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price (sideways)</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="125" x2="360" y2="125" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,4"/>
      <line x1="50" y1="172" x2="360" y2="172" stroke="#1E6B45" stroke-width="1" stroke-dasharray="4,4"/>
      <path d="M60,145 C90,120 105,122 130,175 C160,180 185,120 210,120 C240,178 260,178 290,122 C310,120 325,150 340,145" fill="none" stroke="#14181F" stroke-width="2"/>
      <circle cx="105" cy="122" r="3" fill="#A93A2E"/>
      <circle cx="130" cy="175" r="3" fill="#1E6B45"/>
      <circle cx="210" cy="120" r="3" fill="#A93A2E"/>
      <circle cx="240" cy="178" r="3" fill="#1E6B45"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">RSI</text>
    </svg>`
  },

  vwap_reversion: {
    name: 'VWAP reversion',
    category: 'Mean reversion',
    caption: 'Intraday price stretching well above or below the volume-weighted average price tends to pull back toward it, since VWAP approximates the day\u2019s "fair" average execution level.',
    description: "VWAP (volume-weighted average price) tracks the average price a security has traded at during the session, weighted by volume at each price — institutions use it as a benchmark for whether their own execution was good or bad, which gives it real behavioral weight intraday. When price stretches unusually far from VWAP without a strong catalyst, mean-reversion traders treat the gap as likely to close as the session progresses and volume-weighted trading pulls the average (and often price) back together. It works best in an already range-bound or low-catalyst session; a real news-driven trend day can keep price extended from VWAP the entire session.",
    citation: 'Kissell, Robert. The Science of Algorithmic Trading and Portfolio Management. Academic Press, 2013, ch. 4.',
    applications: ['Intraday mean reversion', 'Institutional benchmark awareness', 'Best in low-catalyst sessions'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="VWAP reversion diagram: intraday price stretching above the VWAP line and then reverting back down toward it">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time of day</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,120 C120,118 200,116 340,112" fill="none" stroke="#454C56" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="290" y="108" font-family="IBM Plex Mono" font-size="10" fill="#454C56">VWAP</text>
      <path d="M60,125 C90,110 110,70 130,50 C145,38 160,45 175,60 C195,85 220,110 250,118 C280,122 310,118 340,116" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="130" cy="50" r="4" fill="#A93A2E"/>
      <text x="140" y="40" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">stretched above VWAP</text>
      <circle cx="250" cy="118" r="4" fill="#1E6B45"/>
      <text x="230" y="135" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">reverts to VWAP</text>
    </svg>`
  },

  pairs_trading: {
    name: 'Pairs trading / statistical arbitrage',
    category: 'Mean reversion',
    caption: 'Two historically correlated securities diverge in price; the strategy shorts the outperformer and buys the underperformer, betting the spread between them reverts to its historical relationship.',
    description: "Pairs trading looks for two securities that normally move together (often same-sector peers, like two airlines or two regional banks) and tracks the spread — or ratio — between their prices. When that spread stretches unusually far from its historical range, the trade shorts the stock that has run up and buys the one that has lagged, wagering the relationship reverts rather than that either stock's absolute direction is predictable. Because it's long one side and short the other, the position is largely hedged against a broad market move and isolates the bet to the relative relationship — though it fails if the divergence reflects a genuine, permanent change in one company's fundamentals rather than a temporary statistical anomaly.",
    citation: 'Vidyamurthy, Ganapathy. Pairs Trading: Quantitative Methods and Analysis. Wiley, 2004, ch. 2-3.',
    applications: ['Market-neutral / hedged exposure', 'Sector-peer relationships', 'Statistical arbitrage'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Pairs trading diagram: two normally correlated stock price lines diverging apart and then converging back together as the spread reverts">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price (indexed)</text>
      <path d="M60,110 C100,100 140,95 175,70 C210,45 250,50 290,85 C315,108 330,112 340,110" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M60,115 C100,120 140,130 175,150 C210,168 250,155 290,120 C315,100 330,105 340,110" fill="none" stroke="#14181F" stroke-width="2" stroke-dasharray="6,4"/>
      <line x1="210" y1="45" x2="210" y2="168" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="216" y="60" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">max divergence</text>
      <text x="290" y="78" font-family="IBM Plex Mono" font-size="10" fill="#93701F">stock A</text>
      <text x="290" y="140" font-family="IBM Plex Mono" font-size="10" fill="#14181F">stock B</text>
      <text x="270" y="105" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">spread converges</text>
    </svg>`
  },

  head_and_shoulders: {
    name: 'Head and shoulders (+ inverse)',
    category: 'Reversal patterns',
    caption: 'Three peaks — a left shoulder, a taller head, and a right shoulder roughly matching the left — with a break of the connecting "neckline" marking a trend reversal; the inverse pattern mirrors this at a bottom.',
    description: "One of the most recognized reversal patterns: an uptrend prints a peak (left shoulder), pulls back, pushes to a higher peak (the head), pulls back again, then rallies to a third peak that fails to exceed the head (right shoulder), roughly matching the height of the first. Connecting the two pullback lows draws the 'neckline'; a close below it is the confirmation signal, with the pattern's height (head to neckline) commonly used as a rough price target projected down from the break. The inverse head and shoulders is the same shape upside down, marking a bottom rather than a top.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 5.',
    applications: ['Major trend reversal', 'Neckline break confirmation', 'Price target projection from pattern height'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Head and shoulders diagram: a left shoulder, a taller head, and a right shoulder of similar height to the left shoulder, with a neckline connecting the two troughs and a break below it confirming the reversal">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="90" y1="120" x2="290" y2="128" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="292" y="132" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">neckline</text>
      <path d="M60,150 C80,110 100,90 120,95 C140,100 145,120 165,125 C180,60 195,40 210,45 C225,50 232,110 250,122 C270,118 280,95 300,92 C315,100 325,130 340,175" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="72" y="82" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">L shoulder</text>
      <text x="180" y="32" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">head</text>
      <text x="280" y="84" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">R shoulder</text>
      <circle cx="330" cy="150" r="4" fill="#A93A2E"/>
      <text x="255" y="185" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">neckline break</text>
    </svg>`
  },

  double_top_bottom: {
    name: 'Double top / double bottom',
    category: 'Reversal patterns',
    caption: 'Price tests the same resistance level twice, failing to break through, then reverses lower through the support between the two peaks (and the mirror image for a double bottom).',
    description: "A double top forms when price rallies to a resistance level, pulls back, rallies again to roughly the same level, and fails a second time — the repeated rejection is read as a sign buyers are exhausted at that price. Confirmation comes from a break below the low of the pullback between the two peaks, sometimes called the pattern's 'confirmation line.' A double bottom is the mirror image at a low, formed by two roughly equal troughs with a rally in between, confirmed by a break above the peak of that middle rally.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 6.',
    applications: ['Reversal at a well-tested level', 'Failed-breakout exhaustion signal', 'Confirmation-line breaks'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Double top diagram: price rallying to the same resistance level twice, failing both times, and then breaking down through the support level between the two peaks">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="90" y1="55" x2="250" y2="55" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="255" y="52" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">resistance (tested twice)</text>
      <line x1="130" y1="115" x2="210" y2="115" stroke="#8B8578" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="215" y="119" font-family="IBM Plex Mono" font-size="9" fill="#8B8578">confirmation line</text>
      <path d="M60,160 C85,110 100,58 115,55 C130,60 145,105 165,115 C180,105 195,60 210,55 C225,60 240,110 260,140 C280,165 300,175 340,180" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="115" cy="55" r="3.5" fill="#14181F"/>
      <circle cx="210" cy="55" r="3.5" fill="#14181F"/>
      <circle cx="290" cy="115" r="4" fill="#A93A2E"/>
      <text x="245" y="200" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">breaks confirmation line</text>
    </svg>`
  },

  triple_top_bottom: {
    name: 'Triple top / triple bottom',
    category: 'Reversal patterns',
    caption: 'A rarer variant of the double top/bottom, with three roughly equal tests of the level instead of two — generally read as a stronger reversal signal precisely because it took longer to form.',
    description: "The triple top/bottom follows the same logic as the double top/bottom but with a third test of the level before it finally gives way. Because it takes longer to complete and shows repeated, sustained failure (or support) at the same price, it's generally treated as carrying more conviction than a double top/bottom when it does confirm — the tradeoff is that it's rarer and takes more patience to identify, since an apparent triple top can also just resolve as an extended trading range rather than a reversal.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 6.',
    applications: ['Higher-conviction reversal (vs. double top/bottom)', 'Extended range/consolidation awareness', 'Patience-dependent pattern'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Triple top diagram: price testing the same resistance level three times before finally breaking down through support">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="75" y1="50" x2="290" y2="50" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="292" y="47" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">resistance (x3)</text>
      <line x1="105" y1="112" x2="260" y2="112" stroke="#8B8578" stroke-width="1" stroke-dasharray="4,3"/>
      <path d="M60,155 C75,105 85,52 95,50 C105,55 115,100 130,112 C140,108 150,55 165,50 C175,55 185,100 200,112 C210,108 220,55 235,50 C250,55 265,100 285,130 C300,155 320,170 340,178" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="95" cy="50" r="3" fill="#14181F"/>
      <circle cx="165" cy="50" r="3" fill="#14181F"/>
      <circle cx="235" cy="50" r="3" fill="#14181F"/>
      <circle cx="285" cy="112" r="4" fill="#A93A2E"/>
      <text x="230" y="200" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">breaks support after 3rd test</text>
    </svg>`
  },

  rounding_bottom: {
    name: 'Rounding bottom ("saucer")',
    category: 'Reversal patterns',
    caption: 'Price traces a gradual, curved "U" shape rather than a sharp V, showing a slow, grinding shift from selling to accumulation to buying rather than a single decisive turn.',
    description: "The rounding bottom (or 'saucer') describes a slow, gradual reversal rather than a sharp V-shaped one: a downtrend decelerates, flattens into a shallow bowl-shaped consolidation as selling pressure fades and accumulation quietly builds, then curves back upward as buying takes over. Because there's no single dramatic low or clean neckline the way there is with a head and shoulders, it's identified more by the overall curved shape over a longer period than by any single price level — and it's often accompanied by declining volume through the bowl and expanding volume as the pattern turns up.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 7.',
    applications: ['Slow accumulation-driven reversals', 'Longer-timeframe basing patterns', 'Volume confirmation on the upturn'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Rounding bottom diagram: price gradually curving down and then back up in a shallow U shape, showing a slow shift from selling to accumulation to buying">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,60 C110,90 150,140 165,150 C200,168 220,168 255,150 C280,138 310,95 340,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="150" y="185" font-family="IBM Plex Mono" font-size="10" fill="#454C56">gradual bowl-shaped base</text>
      <text x="270" y="70" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">accumulation &#8594; markup</text>
    </svg>`
  },

  cup_and_handle: {
    name: 'Cup and handle',
    category: 'Continuation patterns',
    caption: 'A rounded "cup" recovery back to the prior high is followed by a shallow "handle" pullback; a breakout above the handle\u2019s resistance continues the original uptrend.',
    description: "The cup and handle starts from an uptrend that pulls back and rounds out (the cup), recovering to roughly its old high, then digests those gains with a smaller, shallower pullback (the handle) before breaking out to new highs. It's read as bullish continuation rather than reversal — the cup shows sellers gradually losing control and buyers reasserting, and the handle is a lower-risk final shakeout before the move resumes. A common pitfall is treating any rounded dip as a cup; the handle's shallowness (it shouldn't retrace deep into the cup) and a volume pickup on the breakout are the usual quality checks.",
    citation: 'O\u2019Neil, William J. How to Make Money in Stocks. 4th ed., McGraw-Hill, 2009, ch. 2.',
    applications: ['Uptrend continuation', 'Growth-stock basing patterns', 'Volume confirmation on breakout'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Cup and handle diagram: price rounding out in a cup shape back to its prior high, then forming a small handle pullback before breaking out to new highs">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="65" y1="60" x2="250" y2="60" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M65,60 C100,80 130,130 150,140 C180,155 200,155 225,140 C245,130 255,80 260,60 C265,72 268,85 278,90 C288,95 295,88 305,72 C315,58 325,40 340,25" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="130" y="168" font-family="IBM Plex Mono" font-size="10" fill="#454C56">cup</text>
      <text x="272" y="102" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">handle</text>
      <circle cx="305" cy="72" r="4" fill="#1E6B45"/>
      <text x="240" y="42" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breaks handle &#8594; new high</text>
    </svg>`
  },

  flags_pennants: {
    name: 'Flags & pennants',
    category: 'Continuation patterns',
    caption: 'After a sharp, near-vertical move (the "flagpole"), price consolidates briefly in a tight parallel channel (flag) or converging triangle (pennant) before continuing in the same direction.',
    description: "Flags and pennants are short-lived continuation patterns that follow a fast, steep move. A flag consolidates in a small parallel channel that slopes gently against the prior trend; a pennant consolidates in a small symmetrical triangle instead. Both are read the same way: brief profit-taking and consolidation after a sharp move, not a change of mind, with the breakout typically resuming the original direction. Volume is a useful tell — ideally heavy on the flagpole move, drying up during the consolidation, then picking back up on the breakout.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 10.',
    applications: ['Short-term continuation after a sharp move', 'Volume pattern confirmation', 'Measured-move price targets from flagpole height'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Flag pattern diagram: a sharp vertical rally (the flagpole) followed by a brief downward-sloping parallel channel consolidation, then a breakout continuing the original uptrend">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,175 L150,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="70" y="130" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">flagpole</text>
      <line x1="150" y1="55" x2="250" y2="80" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <line x1="150" y1="75" x2="250" y2="100" stroke="#454C56" stroke-width="1.25" stroke-dasharray="4,3"/>
      <path d="M150,60 L180,65 L200,90 L230,88 L250,92" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="175" y="112" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">flag (channel)</text>
      <path d="M250,90 C275,75 300,50 340,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="250" cy="90" r="4" fill="#1E6B45"/>
      <text x="255" y="45" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breakout continues trend</text>
    </svg>`
  },

  triangles: {
    name: 'Triangles (ascending / descending / symmetrical)',
    category: 'Continuation patterns',
    caption: 'Converging trendlines squeeze price into a narrowing range; a flat top with rising lows (ascending) leans bullish, a flat bottom with falling highs (descending) leans bearish, and two converging slopes (symmetrical) are more neutral until the break.',
    description: "Triangles are consolidations bounded by two converging trendlines. An ascending triangle has a flat resistance line and a rising support line — buyers stepping in at progressively higher prices against a fixed ceiling — and is generally read as bullish, expected to break upward. A descending triangle is the mirror image (flat support, falling resistance) and is generally read as bearish. A symmetrical triangle has both lines converging toward each other and is more genuinely neutral. Here, the eventual breakout direction does the real work of the signal, not the shape itself, and it tends to break in line with the prevailing trend.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 9.',
    applications: ['Consolidation before continuation', 'Ascending = bullish lean, descending = bearish lean', 'Breakout direction confirms symmetrical triangles'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Ascending triangle diagram: a flat resistance line at the top and a rising support line underneath, converging toward a breakout above resistance">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="70" y1="70" x2="270" y2="70" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="75" y="63" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">flat resistance</text>
      <line x1="70" y1="150" x2="270" y2="70" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="80" y="165" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">rising support</text>
      <path d="M70,130 L110,70 L140,105 L170,70 L200,95 L230,70 L250,80" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M250,80 C270,65 300,40 340,18" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="270" cy="70" r="4" fill="#1E6B45"/>
      <text x="245" y="40" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breaks resistance</text>
    </svg>`
  },

  wedges: {
    name: 'Rising & falling wedges',
    category: 'Continuation patterns',
    caption: 'Both trendlines slope in the same direction while converging; a rising wedge (both lines up, narrowing) tends to resolve downward, and a falling wedge (both lines down, narrowing) tends to resolve upward.',
    description: "A wedge looks similar to a triangle but both boundary lines slope in the same direction rather than one being flat. A rising wedge still prints higher highs and higher lows, but the highs rise more slowly than the lows, so the range keeps narrowing. That's counterintuitively a bearish pattern: the shrinking range shows buying momentum fading even while price grinds higher, and it typically breaks down. A falling wedge is the mirror image and typically breaks up. Because the direction of the slope doesn't match the eventual breakout direction, wedges are a common source of confusion versus channels, which slope with the trend and don't imply a reversal.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 9.',
    applications: ['Momentum-fade continuation/reversal signal', 'Distinguishing from parallel channels', 'Rising wedge = bearish, falling wedge = bullish'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Rising wedge diagram: two upward-sloping converging trendlines narrowing as price grinds higher, followed by a breakdown below the lower trendline">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="70" y1="150" x2="270" y2="60" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <line x1="70" y1="170" x2="270" y2="90" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <path d="M70,160 L100,140 L120,150 L150,110 L170,120 L200,90 L220,100 L250,80" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M250,80 C265,110 280,140 340,170" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="255" cy="88" r="4" fill="#A93A2E"/>
      <text x="130" y="70" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">rising wedge (narrowing)</text>
      <text x="260" y="130" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">breaks down</text>
    </svg>`
  },

  rectangle_consolidation: {
    name: 'Rectangle / trading range consolidation',
    category: 'Continuation patterns',
    caption: 'Price bounces between a well-defined horizontal ceiling and floor for an extended stretch; the eventual break, usually in the direction of the prior trend, resumes the move.',
    description: "A rectangle is the simplest consolidation shape: two roughly parallel horizontal lines bounding a trading range, with price oscillating between them for a period of weeks to months. It represents a standoff between buyers and sellers at a stable pair of levels rather than a clear directional squeeze the way a triangle or wedge implies. Most often a rectangle following a prior trend resolves by breaking out in the same direction as that trend (continuation), though it can also mark a top or bottom — the breakout direction, confirmed by volume, is what actually resolves the ambiguity, not the shape alone.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 8.',
    applications: ['Range trading within the rectangle', 'Breakout trading at the edges', 'Usually continues the prior trend'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Rectangle consolidation diagram: price bouncing between a horizontal ceiling and floor for an extended period before breaking out above the ceiling to continue the prior uptrend">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,160 C75,130 85,110 95,105" fill="none" stroke="#93701F" stroke-width="2"/>
      <rect x="95" y="75" width="175" height="65" fill="none" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="100" y="70" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">ceiling</text>
      <text x="100" y="152" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">floor</text>
      <path d="M95,110 C115,80 125,135 145,138 C165,80 180,135 200,138 C220,80 235,135 255,138 C265,120 268,90 270,78" fill="none" stroke="#93701F" stroke-width="2"/>
      <path d="M270,78 C290,55 315,30 340,15" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="270" cy="78" r="4" fill="#1E6B45"/>
      <text x="245" y="40" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">breaks ceiling &#8594; continuation</text>
    </svg>`
  },

  obv: {
    name: 'On-Balance Volume (OBV)',
    category: 'Volume-based',
    caption: 'A running total that adds a bar\u2019s volume on up days and subtracts it on down days; OBV rising alongside price confirms the trend, while OBV diverging from price warns it may not hold.',
    description: "On-Balance Volume distills volume into a single cumulative line: add the full day's volume when price closes higher, subtract it when price closes lower. The level of OBV itself doesn't matter — only its trend and how that trend compares to price's trend. When OBV is rising in step with price, volume is confirming the move (real participation behind it). When price makes a new high but OBV fails to make a new high alongside it, that's a volume-based divergence — a similar warning sign to RSI or MACD divergence, but built from raw participation rather than price momentum.",
    citation: 'Granville, Joseph E. Granville\u2019s New Key to Stock Market Profits. Prentice-Hall, 1963, ch. 2.',
    applications: ['Trend confirmation via participation', 'Volume-based divergence', 'Early warning ahead of a price reversal'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="On-Balance Volume diagram: price making a new high while OBV fails to make a corresponding new high, a bearish volume divergence">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,80 C100,60 140,45 175,40 C230,60 280,50 320,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="175" cy="40" r="3" fill="#14181F"/>
      <circle cx="320" cy="20" r="3" fill="#14181F"/>
      <line x1="175" y1="40" x2="320" y2="20" stroke="#14181F" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price: higher high</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <path d="M60,165 C100,145 140,120 175,115 C230,135 280,130 320,128" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <circle cx="175" cy="115" r="3" fill="#A93A2E"/>
      <circle cx="320" cy="128" r="3" fill="#A93A2E"/>
      <line x1="175" y1="115" x2="320" y2="128" stroke="#A93A2E" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">OBV</text>
      <text x="200" y="145" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">OBV fails to confirm &#8594; divergence</text>
    </svg>`
  },

  vwap_benchmark: {
    name: 'VWAP as intraday benchmark',
    category: 'Volume-based',
    caption: 'Price trading and holding above VWAP through the session is read as intraday strength (buyers in control of the average); holding below is read as intraday weakness.',
    description: "Distinct from fading a stretch away from VWAP (the mean-reversion use), this is VWAP used as a running reference line for who's winning the session: As long as price stays above VWAP, the day's average buyer is in profit and the tape is read as constructive. If price falls below and stays there, the average buyer is underwater and the tape reads as weak. Because institutions routinely benchmark their own execution against VWAP, price behavior around the line often reflects real institutional flow rather than just chart geometry, which is why it's watched closely on higher-volume names during the trading day.",
    citation: 'Kissell, Robert. The Science of Algorithmic Trading and Portfolio Management. Academic Press, 2013, ch. 4.',
    applications: ['Intraday strength/weakness read', 'Institutional flow proxy', 'Bias filter for day trades'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="VWAP as intraday benchmark diagram: price trading above the VWAP line for most of the session, read as a constructive intraday bias">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time of day</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,130 C120,124 200,116 340,105" fill="none" stroke="#454C56" stroke-width="1.5" stroke-dasharray="6,3"/>
      <text x="290" y="100" font-family="IBM Plex Mono" font-size="10" fill="#454C56">VWAP</text>
      <path d="M60,140 C90,120 120,95 150,90 C180,85 210,100 240,92 C270,80 300,60 340,45" fill="none" stroke="#1E6B45" stroke-width="2"/>
      <text x="150" y="70" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">holds above VWAP &#8594; constructive tape</text>
    </svg>`
  },

  accumulation_distribution: {
    name: 'Accumulation/distribution line',
    category: 'Volume-based',
    caption: 'Weights each bar\u2019s volume by where the close sits within that bar\u2019s range, so a rising line shows sustained buying pressure even during sideways price action.',
    description: "The accumulation/distribution line is a cousin of OBV that adds more nuance to each bar: rather than assigning a bar's full volume to either up or down, it weights the volume by where the close fell within that bar's high-low range — a close near the high gets counted as more accumulation, a close near the low as more distribution, even on an otherwise unremarkable-looking candle. This lets it pick up quiet accumulation (or distribution) happening underneath a sideways-looking price chart, which a simpler up/down volume measure like OBV can miss.",
    citation: 'Murphy, John J. Technical Analysis of the Financial Markets. New York Institute of Finance, 1999, ch. 8.',
    applications: ['Detecting quiet accumulation/distribution', 'Confirming or questioning a sideways range', 'Volume-based divergence, finer-grained than OBV'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Accumulation distribution line diagram: price moving sideways in a range while the accumulation distribution line steadily rises, showing quiet accumulation underneath a flat-looking chart">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,55 C120,45 180,60 240,50 C280,45 310,55 340,48" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price (sideways)</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <path d="M60,175 C120,155 180,130 240,110 C280,95 310,80 340,65" fill="none" stroke="#1E6B45" stroke-width="2"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">A/D line</text>
      <text x="180" y="145" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">steadily rising &#8594; quiet accumulation</text>
    </svg>`
  },

  volume_climax: {
    name: 'Volume climax / exhaustion',
    category: 'Volume-based',
    caption: 'An extreme volume spike at the end of an extended move (a blow-off top or capitulation bottom) often marks the point where the last buyers or sellers have acted, exhausting the move.',
    description: "A climax is an unusually large volume spike, well above the recent average, occurring after price has already moved a long way in one direction. At a blow-off top, it reflects euphoric, FOMO-driven buying pulling in the last willing buyers; at a capitulation bottom, panic selling flushing out the last willing sellers. In both cases, the idea is that once nearly everyone who was going to act on emotion has already acted, the move runs out of fuel, often followed by a sharp reversal or at minimum a multi-day pause. Because a single climax bar can be hard to distinguish from a real continuation, it's usually confirmed by the next few bars failing to extend the move.",
    citation: 'Wyckoff, Richard D. Studies in Tape Reading. Ticker Publishing, 1910 (as compiled in modern Wyckoff Method texts); Pring, Martin J. Technical Analysis Explained. 5th ed., McGraw-Hill, 2014, ch. 8.',
    applications: ['Blow-off top / capitulation bottom identification', 'Exhaustion-based reversal timing', 'Best confirmed by subsequent price action'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Volume climax diagram: price spiking sharply higher into a blow-off top accompanied by an unusually large volume bar, followed by a reversal">
      <line x1="50" y1="95" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="95" x2="360" y2="95" stroke="#D6D0C2" stroke-width="1"/>
      <path d="M60,85 C120,70 180,50 230,30 C245,24 255,20 265,22 C280,26 300,55 340,80" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="255" cy="21" r="4" fill="#A93A2E"/>
      <text x="55" y="30" font-family="IBM Plex Mono" font-size="10" fill="#454C56">Price</text>
      <line x1="50" y1="190" x2="50" y2="105" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <rect x="70" y="175" width="8" height="15" fill="#454C56"/>
      <rect x="110" y="168" width="8" height="22" fill="#454C56"/>
      <rect x="150" y="160" width="8" height="30" fill="#454C56"/>
      <rect x="190" y="150" width="8" height="40" fill="#454C56"/>
      <rect x="230" y="112" width="8" height="78" fill="#A93A2E"/>
      <rect x="270" y="165" width="8" height="25" fill="#454C56"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="150" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 150)">Volume</text>
      <text x="245" y="105" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">climax volume &#8594; exhaustion</text>
    </svg>`
  },

  gap_and_go: {
    name: 'Gap and go (breakaway gap)',
    category: 'Gaps',
    caption: 'A stock opens sharply away from its prior close, usually on news, and continues in the direction of the gap rather than filling it — traded as a momentum continuation, not a fade.',
    description: "A breakaway gap opens a fresh distance from the prior session's close, typically on a real catalyst (earnings, guidance, an upgrade/downgrade, M&A news). 'Gap and go' treats the gap itself as the start of a new move rather than an anomaly to fade: the strategy waits for the first few minutes to establish that the gap is holding (not immediately filling back toward the prior close) and then trades in the direction of the gap, on the view that a catalyst-driven repricing tends to extend once the market has digested the news. The main risk is a gap that reverses hard once early momentum buyers/sellers are exhausted, which is why confirmation of the gap holding matters more than the gap itself.",
    citation: 'Crabel, Toby. Day Trading with Short Term Price Patterns and Opening Range Breakout. Traders Press, 1990, ch. 6.',
    applications: ['News/catalyst-driven momentum', 'Day trading', 'Requires confirmation the gap is holding'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Gap and go diagram: price gapping up sharply from the prior close and continuing higher in the same direction rather than filling the gap">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,160 C90,155 110,150 130,148" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="130" y1="148" x2="150" y2="80" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="152" y="115" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">gap</text>
      <path d="M150,80 C180,72 220,60 260,48 C290,40 315,30 340,20" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="150" cy="80" r="4" fill="#1E6B45"/>
      <text x="185" y="35" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">gap holds &#8594; continues higher</text>
    </svg>`
  },

  gap_fill_fade: {
    name: 'Gap fill / fade',
    category: 'Gaps',
    caption: 'Many gaps, especially without a strong catalyst, retrace back toward the prior close during the session; fading the gap bets on that fill rather than continuation.',
    description: "Not every gap is a breakaway gap with real news behind it — many are 'common' or exhaustion gaps caused by thin overnight liquidity, order imbalances, or short-term positioning rather than a lasting change in the stock's fundamentals, and these have a well-documented tendency to 'fill' — price retracing back to the prior close (or beyond) as the imbalance resolves during regular trading. The gap-fade strategy trades in the opposite direction of the gap on the expectation of a fill, which is essentially the mirror image of gap-and-go; the two are told apart mainly by whether there's a real catalyst behind the gap and how the gap behaves in the first few minutes of trading.",
    citation: 'Crabel, Toby. Day Trading with Short Term Price Patterns and Opening Range Breakout. Traders Press, 1990, ch. 6.',
    applications: ['No-catalyst / low-conviction gaps', 'Counter-trend day trading', 'Distinguishing from gap-and-go via early price action'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Gap fill diagram: price gapping up at the open and then drifting back down during the session to fill the gap, returning toward the prior close">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,150 C90,148 110,146 130,145" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="130" y1="145" x2="150" y2="70" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="152" y="105" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">gap</text>
      <line x1="130" y1="145" x2="340" y2="145" stroke="#8B8578" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="290" y="140" font-family="IBM Plex Mono" font-size="9" fill="#8B8578">prior close</text>
      <path d="M150,70 C180,90 220,115 260,132 C290,142 315,144 340,145" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="340" cy="145" r="4" fill="#1E6B45"/>
      <text x="200" y="60" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">drifts back &#8594; gap fills</text>
    </svg>`
  },

  island_reversal: {
    name: 'Island reversal',
    category: 'Gaps',
    caption: 'A cluster of price action becomes isolated between two gaps in the same direction (up then down, or down then up), leaving a visual "island" that marks a sharp reversal.',
    description: "An island reversal forms when price gaps away from a trend, trades for a few sessions in a tight cluster, and then gaps again in the opposite direction — the middle cluster of bars is left stranded between two gaps, visually resembling an island cut off on both sides. It's a relatively rare but high-conviction reversal pattern precisely because it requires two separate gaps with a distinct trading range between them, not just a single failed breakout; the second gap (away from the island) is generally treated as the actual reversal trigger.",
    citation: 'Edwards, Robert D., and John Magee. Technical Analysis of Stock Trends. 9th ed., CRC Press, 2007, ch. 11.',
    applications: ['Sharp, high-conviction reversal signal', 'Rare but strong when it forms', 'Second gap = confirmation trigger'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Island reversal diagram: price gapping up into a small isolated cluster of trading, then gapping back down away from it, leaving the cluster stranded as an island reversal">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,160 C85,140 100,120 115,110" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="115" y1="110" x2="135" y2="55" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="3,3"/>
      <path d="M135,55 L155,50 L175,58 L195,52" fill="none" stroke="#14181F" stroke-width="2"/>
      <text x="140" y="40" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">island</text>
      <line x1="195" y1="52" x2="215" y2="115" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="3,3"/>
      <path d="M215,115 C250,135 290,155 340,175" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="215" cy="115" r="4" fill="#A93A2E"/>
      <text x="220" y="135" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">gap away &#8594; reversal confirmed</text>
    </svg>`
  },

  value_screen: {
    name: 'Value investing screen',
    category: 'Fundamentals-adjacent',
    caption: 'Screens for stocks trading cheaply relative to earnings, book value, or cash flow versus their own history or peers, on the premise that price eventually converges toward intrinsic worth.',
    description: "A value screen ranks or filters stocks by valuation multiples — price-to-earnings, price-to-book, price-to-cash-flow, EV/EBITDA — looking for names trading at a discount to their historical average, their sector, or the broader market. The underlying bet is that markets periodically misprice out-of-favor businesses, and that price eventually reverts toward a more reasonable estimate of intrinsic value as sentiment normalizes or the business proves itself. The classic risk is a 'value trap': a stock that looks statistically cheap because the market has correctly priced in genuine, structural deterioration in the business, not because of a temporary mispricing.",
    citation: 'Graham, Benjamin, and David Dodd. Security Analysis. 6th ed., McGraw-Hill, 2008 (originally 1934), ch. 7.',
    applications: ['Longer-horizon investing (not trading)', 'Sector/peer relative valuation', 'Value-trap risk awareness'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Value investing diagram: a stock's valuation multiple sitting well below its historical average band, with price expected to converge back up toward fair value over time">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">P/E multiple</text>
      <line x1="60" y1="80" x2="340" y2="80" stroke="#454C56" stroke-width="1.25" stroke-dasharray="5,3"/>
      <text x="65" y="72" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">historical average P/E</text>
      <path d="M60,90 C100,110 140,140 180,150 C210,155 230,150 250,140" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="185" cy="150" r="4" fill="#A93A2E"/>
      <text x="150" y="170" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">trading at a discount</text>
      <path d="M250,140 C270,120 290,100 340,60" fill="none" stroke="#93701F" stroke-width="2" stroke-dasharray="6,3"/>
      <text x="255" y="95" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">reversion toward fair value</text>
    </svg>`
  },

  growth_investing: {
    name: 'Growth investing',
    category: 'Fundamentals-adjacent',
    caption: 'Favors companies with above-average revenue and earnings growth, often at high valuation multiples, on the view that sustained compounding justifies paying up today.',
    description: "Growth investing prioritizes the rate at which a business is expanding — revenue growth, earnings growth, expanding margins or market share — over how cheap the stock looks on current-year multiples. The premise is that a business compounding earnings quickly for long enough can generate strong returns even from an expensive-looking entry price, since future earnings (not today's) ultimately drive long-run returns. The tradeoff is sensitivity to growth actually materializing: a growth stock that merely meets high expectations, rather than beating them, can still see a large valuation reset, since so much of the current price already assumes strong growth ahead.",
    citation: 'Fisher, Philip A. Common Stocks and Uncommon Profits. Wiley, 1996 (originally 1958), ch. 3.',
    applications: ['High revenue/earnings growth screens', 'Longer-horizon compounding thesis', 'Sensitive to growth disappointments'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Growth investing diagram: a company's earnings compounding at an accelerating rate over time, justifying a higher valuation paid today">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Earnings (log)</text>
      <path d="M60,175 C120,165 170,140 210,105 C250,68 285,40 340,15" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="230" y="65" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">sustained compounding</text>
      <path d="M60,175 C140,150 220,155 340,148" fill="none" stroke="#14181F" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="230" y="163" font-family="IBM Plex Mono" font-size="9.5" fill="#14181F">slower/average-growth peer</text>
    </svg>`
  },

  post_earnings_drift: {
    name: 'Post-earnings-announcement drift',
    category: 'Fundamentals-adjacent',
    caption: 'Stocks that beat (or miss) earnings expectations tend to keep drifting in the direction of the surprise for weeks afterward, rather than the market fully pricing it in on the announcement day.',
    description: "Post-earnings-announcement drift (PEAD) is a well-documented market anomaly: after a company reports earnings meaningfully above or below expectations, its stock tends to continue drifting in that same direction over the following weeks to months, rather than the surprise being fully and immediately reflected in price on the report date. The standard explanation is under-reaction — the market takes time to fully digest and revise estimates based on new information — though the effect has weakened over the decades as more capital has targeted it. Traders using PEAD typically screen for large earnings surprises and take a position in the direction of the surprise shortly after the report, holding for the drift window rather than trading the announcement day itself.",
    citation: 'Bernard, Victor L., and Jacob K. Thomas. "Post-Earnings-Announcement Drift: Delayed Price Response or Risk Premium?" Journal of Accounting Research, vol. 27, 1989.',
    applications: ['Earnings-surprise screens', 'Multi-week holding period after earnings', 'Effect has weakened with more capital targeting it'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Post-earnings drift diagram: price jumping on the day of a positive earnings surprise, then continuing to drift upward over the following weeks rather than immediately flattening out">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,160 C90,158 110,157 125,155" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="125" y1="155" x2="140" y2="105" stroke="#1E6B45" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="142" y="130" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">earnings beat</text>
      <path d="M140,105 C180,95 230,75 280,55 C300,47 320,38 340,30" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="200" y="80" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">continued drift, weeks after report</text>
    </svg>`
  },

  dividend_growth: {
    name: 'Dividend growth / income strategy',
    category: 'Fundamentals-adjacent',
    caption: 'Favors companies with a long history of steadily raising their dividend, on the view that sustained payout growth signals durable cash flow and disciplined capital allocation.',
    description: "This strategy screens for companies with a track record of consistently growing their dividend over many consecutive years — the well-known 'Dividend Aristocrats' (25+ consecutive years of increases within the S&P 500) and 'Dividend Kings' (50+ years) lists are built from exactly this screen. The reasoning is that sustaining and raising a dividend through multiple economic cycles requires durable free cash flow and management discipline, functioning as a real-world quality filter rather than just an income feature. It tends to favor mature, stable-cash-flow sectors (consumer staples, utilities, industrials) and generally lags in fast-growth, low-payout market environments where capital appreciation dominates returns.",
    citation: 'Siegel, Jeremy J. The Future for Investors. Crown Business, 2005, ch. 9.',
    applications: ['Income-focused portfolios', 'Quality/durability screen via payout history', 'Tends to favor mature, stable-cash-flow sectors'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Dividend growth diagram: a company's annual dividend per share rising steadily year after year across multiple economic cycles">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Year</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Dividend / share</text>
      <rect x="65" y="165" width="18" height="25" fill="#454C56"/>
      <rect x="100" y="155" width="18" height="35" fill="#454C56"/>
      <rect x="135" y="145" width="18" height="45" fill="#454C56"/>
      <rect x="170" y="132" width="18" height="58" fill="#454C56"/>
      <rect x="205" y="118" width="18" height="72" fill="#454C56"/>
      <rect x="240" y="100" width="18" height="90" fill="#93701F"/>
      <rect x="275" y="80" width="18" height="110" fill="#93701F"/>
      <rect x="310" y="55" width="18" height="135" fill="#93701F"/>
      <text x="130" y="60" font-family="IBM Plex Mono" font-size="10" fill="#454C56">steady annual increases</text>
    </svg>`
  },

  sector_rotation: {
    name: 'Sector rotation across a macro cycle',
    category: 'Event & catalyst-driven',
    caption: 'Different sectors historically lead or lag at different stages of the business cycle — cyclicals and tech early, staples and utilities late — so allocation shifts sector weight as the cycle turns.',
    description: "Sector rotation allocates toward whichever sectors have historically performed best at a given stage of the business cycle. Early-cycle recovery tends to favor cyclicals, small caps, and financials as credit conditions ease. Mid-cycle expansion broadens out to industrials and technology. Late-cycle tends to favor energy and materials as inflation pressures build, and contraction or recession tends to favor defensives like consumer staples, utilities, and healthcare as growth slows. This ties directly into Fed policy and yield-curve signals, which is a natural link to this desk's Fed Watch coverage. Real cycles rarely follow the textbook sequence exactly, though, and calling the current stage of the cycle in real time is itself the hard part.",
    citation: 'Stovall, Sam. Standard & Poor\u2019s Guide to Sector Investing. 2nd ed., McGraw-Hill, 2011, ch. 1-2.',
    applications: ['Business-cycle-aware allocation', 'Ties to Fed policy and yield curve signals', 'Requires correctly identifying the current cycle stage'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Sector rotation diagram: a circular business cycle showing which sectors historically lead during early cycle, mid cycle, late cycle, and recession phases">
      <circle cx="205" cy="105" r="80" fill="none" stroke="#454C56" stroke-width="1.5"/>
      <text x="205" y="30" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Early cycle</text>
      <text x="205" y="44" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">cyclicals, financials</text>
      <text x="300" y="105" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Mid cycle</text>
      <text x="300" y="119" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">industrials, tech</text>
      <text x="205" y="185" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Late cycle</text>
      <text x="205" y="171" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#93701F">energy, materials</text>
      <text x="110" y="105" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Recession</text>
      <text x="110" y="119" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="#A93A2E">staples, utilities</text>
      <path d="M 235 35 A 80 80 0 0 1 275 75" fill="none" stroke="#14181F" stroke-width="1.5" marker-end="url(#arrow)"/>
      <defs><marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#14181F"/></marker></defs>
    </svg>`
  },

  index_rebalancing: {
    name: 'Index rebalancing effects',
    category: 'Event & catalyst-driven',
    caption: 'Stocks added to a major index like the S&P 500 tend to see a price bump around the effective date as index funds are forced to buy; removals see the mirror effect.',
    description: "When a widely-tracked index adds or removes a constituent, every fund benchmarked to that index has to buy or sell the stock to stay in line, regardless of what it thinks the stock is actually worth. This creates predictable, mechanical demand (or supply) around the announcement and effective dates, historically producing a measurable price effect independent of the company's fundamentals. The effect has become somewhat smaller and more front-run over time as more capital anticipates it ahead of the effective date, but it remains a distinct, well-documented catalyst worth tracking around S&P 500, Russell, and other major index reconstitution events.",
    citation: 'Shleifer, Andrei. "Do Demand Curves for Stocks Slope Down?" Journal of Finance, vol. 41, no. 3, 1986.',
    applications: ['S&P 500 / Russell reconstitution events', 'Mechanical, fundamentals-independent demand', 'Effect has weakened somewhat with front-running'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Index rebalancing effect diagram: a stock's price rising sharply around the announcement and effective date of being added to a major index, then partially settling back afterward">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,160 C90,158 110,157 130,155" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="130" y1="155" x2="130" y2="130" stroke="#8B8578" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="80" y="125" font-family="IBM Plex Mono" font-size="9" fill="#8B8578">announcement</text>
      <path d="M130,155 C160,145 190,120 220,90" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="220" y1="90" x2="220" y2="65" stroke="#1E6B45" stroke-width="1" stroke-dasharray="4,3"/>
      <text x="225" y="60" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">effective date</text>
      <path d="M220,90 C245,78 260,85 280,95 C300,105 320,110 340,108" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="255" y="128" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">partial settle-back</text>
    </svg>`
  },

  merger_arbitrage: {
    name: 'Merger arbitrage',
    category: 'Event & catalyst-driven',
    caption: 'After a merger is announced, the target\u2019s stock trades at a discount to the deal price reflecting deal risk and time value; the strategy captures that spread as the deal closes.',
    description: "When one company agrees to acquire another, the target's stock typically jumps toward — but not fully to — the announced deal price, with the remaining gap reflecting the market's estimate of the probability the deal closes, the time until closing, and financing/regulatory risk. Merger arbitrage buys the target to capture that spread as it narrows toward zero when the deal completes. In a stock-for-stock deal, the trade may also short the acquirer to hedge out that stock's own price risk. The return profile is asymmetric: modest, relatively steady gains if the deal closes as expected, against a large loss if the deal breaks (regulatory blocks, financing falling through, shareholder rejection) and the target's stock falls back toward its pre-announcement level.",
    citation: 'Moore, Keith M., and Mark L. Mitchell. "The Impact of Industry Shocks on Takeover and Restructuring Activity." Journal of Financial Economics, vol. 41, no. 2, 1996; standard treatment in Baker, Guy O., and Halbert S. Kirk. Merger Arbitrage. Wiley, 2018.',
    applications: ['Event-driven, market-neutral-leaning strategy', 'Deal-risk assessment (regulatory, financing, shareholder)', 'Asymmetric payoff: steady gains vs. large break-risk loss'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Merger arbitrage diagram: the target company's stock jumping toward the announced deal price on the merger announcement, then gradually narrowing the remaining spread as the deal closes">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="150" y1="45" x2="340" y2="45" stroke="#454C56" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="155" y="38" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">deal price</text>
      <path d="M60,170 C90,168 110,167 130,166" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="130" y1="166" x2="150" y2="70" stroke="#1E6B45" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="150" y="150" font-family="IBM Plex Mono" font-size="9" fill="#1E6B45">deal announced</text>
      <path d="M150,70 C200,63 260,55 340,48" fill="none" stroke="#93701F" stroke-width="2"/>
      <text x="200" y="65" font-family="IBM Plex Mono" font-size="9.5" fill="#93701F">spread narrows to close</text>
    </svg>`
  },

  stop_loss_placement: {
    name: 'Stop-loss placement',
    category: 'Risk management',
    caption: 'Where a stop is set matters as much as whether one is used at all: fixed-percentage, volatility-based (ATR), and structure-based (below a swing low) methods each answer "how much room does this trade need" differently.',
    description: "A stop-loss exits a losing position automatically at a predetermined price, but the method for choosing that price shapes how well the stop actually fits the trade. A fixed-percentage stop (e.g. always 5% below entry) is simple but ignores how volatile the specific stock is. A volatility-based stop, commonly a multiple of Average True Range (ATR), adapts the distance to the stock's actual recent volatility — a wider stop for a wilder stock. A structure-based stop places the exit just beyond a meaningful chart level (below the last swing low in an uptrend, for instance), so the stop only triggers if the trade's actual technical premise has been invalidated, not just from ordinary noise.",
    citation: 'Elder, Alexander. Trading for a Living. Wiley, 1993, ch. 12.',
    applications: ['Every position should have one', 'Method should match the trade\u2019s premise (structure vs. volatility)', 'Prevents a single loss from becoming outsized'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Stop-loss placement diagram: a stop set just below the most recent swing low, structurally invalidating the uptrend if reached, rather than an arbitrary fixed percentage below entry">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time</text>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <path d="M60,150 L110,100 L150,130 L200,70 L250,105 L300,55 L340,80" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="150" cy="130" r="3.5" fill="#14181F"/>
      <circle cx="250" cy="105" r="3.5" fill="#14181F"/>
      <line x1="230" y1="118" x2="340" y2="118" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="5,3"/>
      <text x="235" y="132" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">stop: just below last swing low</text>
    </svg>`
  },

  position_sizing: {
    name: 'Position sizing / risk-per-trade rules',
    category: 'Risk management',
    caption: 'Fixing the dollar amount risked per trade (commonly 1-2% of account equity) — rather than the same share count or dollar amount invested every time — keeps any single loss from meaningfully damaging the account.',
    description: "Position sizing answers a different question than the stop-loss does: not where to exit, but how large the position should be in the first place given where the stop sits. A common rule fixes risk per trade to a small, consistent percentage of total account equity (often 1-2%) — the position size is then calculated backward from the distance to the stop, so a trade with a tighter stop can take a larger share count than one with a wider stop, for the same dollar risk. This keeps any single trade, even a string of several losing trades in a row, from doing outsized damage to the account, which is a more durable long-run edge than any individual entry signal.",
    citation: 'Tharp, Van K. Trade Your Way to Financial Freedom. 2nd ed., McGraw-Hill, 2006, ch. 10.',
    applications: ['Account preservation through losing streaks', 'Position size derived from stop distance, not conviction alone', 'Foundational to long-run survival, independent of strategy'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Position sizing diagram: a wider stop distance resulting in a smaller position size and a tighter stop distance resulting in a larger position size, both risking the same fixed dollar amount">
      <text x="90" y="35" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Wide stop</text>
      <rect x="55" y="55" width="70" height="130" fill="none" stroke="#454C56" stroke-width="1.25"/>
      <rect x="70" y="150" width="40" height="35" fill="#93701F"/>
      <line x1="55" y1="150" x2="125" y2="150" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="90" y="200" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">smaller size</text>
      <text x="290" y="35" text-anchor="middle" font-family="IBM Plex Sans" font-size="11" font-weight="500" fill="#14181F">Tight stop</text>
      <rect x="255" y="55" width="70" height="130" fill="none" stroke="#454C56" stroke-width="1.25"/>
      <rect x="260" y="150" width="60" height="35" fill="#93701F"/>
      <line x1="255" y1="170" x2="325" y2="170" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="290" y="200" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">larger size</text>
      <text x="190" y="120" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">same fixed $ risk both trades</text>
    </svg>`
  },

  risk_reward_ratio: {
    name: 'Risk-reward ratio framing',
    category: 'Risk management',
    caption: 'Comparing the distance to a stop-loss against the distance to a profit target before entering (e.g. 1:2 or 1:3) determines the win rate needed for the strategy to be profitable over time.',
    description: "Risk-reward framing sets the profit target and the stop-loss distance before entering a trade, expressed as a ratio (risking 1 to potentially make 2, or 1 to make 3). This matters because it directly determines the breakeven win rate: a 1:1 ratio needs to win more than half the time just to break even after typical costs, while a 1:3 ratio can be profitable with a win rate as low as roughly 25-30%. This is why traders often say a strategy doesn't need a high win rate to work. A favorable risk-reward ratio can make an otherwise mediocre hit rate profitable over a large enough sample of trades, as long as the stop and target are both realistic for the setup, not just picked to produce a nice-looking ratio.",
    citation: 'Elder, Alexander. Trading for a Living. Wiley, 1993, ch. 13.',
    applications: ['Setting realistic profit targets and stops together', 'Determines required win rate for profitability', 'A core input alongside position sizing'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Risk-reward ratio diagram: entry price with a stop-loss below and a profit target above, where the distance to the target is roughly triple the distance to the stop, illustrating a 1 to 3 risk-reward ratio">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <text x="20" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 20 105)">Price</text>
      <line x1="90" y1="140" x2="300" y2="140" stroke="#454C56" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="305" y="144" font-family="IBM Plex Mono" font-size="10" fill="#454C56">entry</text>
      <rect x="90" y="140" width="210" height="35" fill="rgba(169,58,46,0.12)"/>
      <line x1="90" y1="175" x2="300" y2="175" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="305" y="179" font-family="IBM Plex Mono" font-size="10" fill="#A93A2E">stop (risk: 1)</text>
      <rect x="90" y="35" width="210" height="105" fill="rgba(30,107,69,0.10)"/>
      <line x1="90" y1="35" x2="300" y2="35" stroke="#1E6B45" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="305" y="39" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">target (reward: 3)</text>
      <text x="130" y="90" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">1:3 risk-reward</text>
    </svg>`
  }

};

function strategyInfo(key){ return key && STRATEGY_LIBRARY[key] ? STRATEGY_LIBRARY[key] : null; }
