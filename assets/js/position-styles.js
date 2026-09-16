/* ------------------------------------------------------------------
   position-styles.js
   The Stock Position Classroom's library — one entry per position
   style, same shape and drawing conventions as THEORY_LIBRARY
   (theories.js) and STRATEGY_LIBRARY (strategies.js): a name, a one
   sentence caption, a plain-language description, a citation, a list
   of applications, and a hand-drawn SVG (viewBox 0 0 380 220, same
   axis/color conventions as the other two libraries) illustrating the
   shape of the trade rather than any single real position.

   Keys match the `id`s in POSITION_STYLES (assets/js/config.js) and
   the `styleKey` values used to tag Stock Position Desk articles.
------------------------------------------------------------------- */

const POSITION_STYLE_LIBRARY = {
  core: {
    name: 'Conservative / Core',
    caption: 'A gentle, low-volatility climb held for two quarters or more — the return comes from time in the position, not from timing it.',
    description: "A core position is sized to be held through ordinary market noise: the thesis is about the business (or the index) over the coming year or more, not about the next few weeks of price action. That long horizon is what allows a wide, low stop -- the position only needs to be wrong about the underlying business to fail, not merely early. In practice these are the largest, least-monitored positions in a portfolio, chosen for balance-sheet strength and durable demand rather than a near-term catalyst.",
    citation: 'Graham, Benjamin, and Jason Zweig. The Intelligent Investor. Rev. ed., HarperBusiness, 2003, ch. 8 & 20.',
    applications: ['Blue-chip compounders', 'Index-anchoring positions', 'Portfolio ballast during volatile stretches'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Conservative core diagram: a gently rising position value within a narrow band over six to twelve or more months">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Holding period (6-12+ months)</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Position value</text>
      <polygon points="60,150 340,95 340,65 60,120" fill="rgba(147,112,31,0.12)"/>
      <path d="M60,135 C160,122 260,100 340,80" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="60" cy="135" r="4" fill="#14181F"/>
      <circle cx="340" cy="80" r="4" fill="#1E6B45"/>
      <text x="60" y="168" font-family="IBM Plex Mono" font-size="10" fill="#454C56">entry</text>
      <text x="222" y="58" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">8-15% target zone</text>
    </svg>`
  },

  income: {
    name: 'Income / Dividend Growth',
    caption: 'Modest price appreciation plus a steady stream of dividend payments compounds into the total return over a year or more.',
    description: "An income position is judged on total return -- price change plus dividends received and reinvested -- rather than price alone. The dividend itself is a signal as much as a payment: a company raising its payout year after year is telling shareholders something about the durability of its cash flow, which is why an unbroken raise streak carries weight beyond the yield figure. The tradeoff is pace -- this style rarely produces a fast win, and a sustained move higher in bond yields makes a fixed dividend relatively less attractive to income buyers with alternatives.",
    citation: 'Lichtenfeld, Marc. Get Rich with Dividends: A Proven System for Earning Double-Digit Returns. 2nd ed., Wiley, 2015, ch. 4.',
    applications: ['Dividend aristocrats', 'Portfolio income sleeves', 'Rate-sensitive sector comparisons'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Income and dividend growth diagram: a shallow rising position value with periodic dividend payments marked along the way">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Holding period (12+ months)</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Total return</text>
      <path d="M60,170 C150,160 250,140 340,112" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="110" y1="163" x2="110" y2="148" stroke="#1E6B45" stroke-width="2"/>
      <line x1="180" y1="154" x2="180" y2="139" stroke="#1E6B45" stroke-width="2"/>
      <line x1="250" y1="145" x2="250" y2="130" stroke="#1E6B45" stroke-width="2"/>
      <line x1="320" y1="120" x2="320" y2="105" stroke="#1E6B45" stroke-width="2"/>
      <text x="110" y="143" text-anchor="middle" font-family="IBM Plex Mono" font-size="8.5" fill="#1E6B45">div</text>
      <text x="180" y="134" text-anchor="middle" font-family="IBM Plex Mono" font-size="8.5" fill="#1E6B45">div</text>
      <text x="250" y="125" text-anchor="middle" font-family="IBM Plex Mono" font-size="8.5" fill="#1E6B45">div</text>
      <text x="320" y="100" text-anchor="middle" font-family="IBM Plex Mono" font-size="8.5" fill="#1E6B45">div</text>
      <text x="150" y="188" font-family="IBM Plex Mono" font-size="10" fill="#454C56">price appreciation + quarterly dividends</text>
    </svg>`
  },

  swing: {
    name: 'Moderate / Swing',
    caption: 'A defined setup expected to resolve toward a target over a couple of months, with a stop that caps the loss if the thesis fails early.',
    description: "A swing position sits between a quick trade and a long-term hold: long enough for a specific thesis -- a re-rating, a sector rotation, a post-selloff recovery -- to play out, short enough that the entry, target, and stop-loss are all set in advance rather than left open-ended. The stop is the discipline that makes the style work: it is chosen before entry, at a level that would mean the original thesis was wrong, not just a level that feels uncomfortable to sit through.",
    citation: 'Elder, Alexander. Come Into My Trading Room: A Complete Guide to Trading. Wiley, 2002, ch. 6.',
    applications: ['Post-selloff recovery trades', 'Sector rotation plays', 'Re-rating theses with a defined catalyst window'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Moderate swing diagram: price path from entry toward a target over two to four months, with a stop-loss line below">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Holding period (2-4 months)</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Price</text>
      <line x1="60" y1="175" x2="340" y2="175" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="300" y="170" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">stop-loss</text>
      <path d="M60,140 C130,150 170,120 210,110 C260,98 300,70 340,55" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="60" cy="140" r="4" fill="#14181F"/>
      <circle cx="340" cy="55" r="4" fill="#1E6B45"/>
      <text x="60" y="128" font-family="IBM Plex Mono" font-size="10" fill="#454C56">entry</text>
      <text x="255" y="45" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">target, 20-40%</text>
    </svg>`
  },

  momentum: {
    name: 'Aggressive / Momentum',
    caption: 'A sharp, volatile move expected to resolve in weeks, not months — the tradeoff for a faster, larger target is a wider, noisier path to get there.',
    description: "Momentum positions chase names already moving on strong volume or a fresh catalyst, on the premise that a stock in motion tends to stay in motion longer than the market expects. The higher expected return compresses the timeline, and the timeline compression is exactly what makes the path choppier -- a momentum name can retrace 10-15% within an uptrend without the thesis being wrong, which is why sizing has to be smaller than a core or swing position even before the stop is hit.",
    citation: 'Jegadeesh, Narasimhan, and Sheridan Titman. "Returns to Buying Winners and Selling Losers: Implications for Stock Market Efficiency." Journal of Finance, vol. 48, no. 1, 1993.',
    applications: ['High-beta breakouts', 'Earnings or guidance-driven re-ratings', 'Sector leaders during a sustained theme'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Aggressive momentum diagram: a sharp, volatile rise in price over three to six weeks">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Holding period (3-6 weeks)</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Price</text>
      <line x1="60" y1="165" x2="340" y2="165" stroke="#A93A2E" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="300" y="160" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">stop-loss</text>
      <path d="M60,150 C100,120 130,155 170,110 C210,70 250,95 290,55 C310,35 325,40 340,25" fill="none" stroke="#93701F" stroke-width="2"/>
      <circle cx="60" cy="150" r="4" fill="#14181F"/>
      <circle cx="340" cy="25" r="4" fill="#1E6B45"/>
      <text x="60" y="138" font-family="IBM Plex Mono" font-size="10" fill="#454C56">entry</text>
      <text x="235" y="18" font-family="IBM Plex Mono" font-size="10" fill="#1E6B45">target, 40-80%</text>
    </svg>`
  },

  catalyst: {
    name: 'Speculative / Catalyst',
    caption: 'A flat, quiet price until a single known event date, after which the position resolves sharply in one direction or the other — with no middle outcome.',
    description: "A catalyst position exists to be in front of one specific, dated event -- an FDA decision, a court ruling, a single binary product announcement -- where the outcome is unknown until it happens and the stock reprices immediately once it does. That structure is why this style carries no single expected-return number the way the other four do: the honest way to describe it is two outcomes and roughly how far each one moves the price, not a blended average that implies a false sense of a typical result. Position size should reflect that the loss scenario is the whole position, not a percentage of it.",
    citation: 'Moore, Kenneth C. Merger Arbitrage and Event-Driven Investing: A Practitioner\'s Guide. Wiley, 2020, ch. 1.',
    applications: ['FDA / regulatory decision dates', 'Litigation or ruling outcomes', 'Single binary product or contract announcements'],
    svg: `<svg viewBox="0 0 380 220" role="img" aria-label="Speculative catalyst diagram: a flat price path until a single event date, after which it branches sharply up on a favorable outcome or down on an unfavorable one">
      <line x1="50" y1="190" x2="50" y2="18" stroke="#454C56" stroke-width="1"/>
      <line x1="50" y1="190" x2="360" y2="190" stroke="#454C56" stroke-width="1"/>
      <text x="205" y="212" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56">Time &#8594; single event date</text>
      <text x="18" y="105" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="#454C56" transform="rotate(-90 18 105)">Price</text>
      <path d="M60,140 C120,138 170,142 210,140" fill="none" stroke="#93701F" stroke-width="2"/>
      <line x1="210" y1="190" x2="210" y2="30" stroke="#454C56" stroke-width="1" stroke-dasharray="4,4"/>
      <text x="210" y="24" text-anchor="middle" font-family="IBM Plex Mono" font-size="9.5" fill="#454C56">catalyst date</text>
      <path d="M210,140 C260,120 300,70 340,40" fill="none" stroke="#1E6B45" stroke-width="2"/>
      <path d="M210,140 C260,150 300,175 340,182" fill="none" stroke="#A93A2E" stroke-width="2"/>
      <circle cx="210" cy="140" r="4" fill="#14181F"/>
      <text x="240" y="55" font-family="IBM Plex Mono" font-size="9.5" fill="#1E6B45">favorable outcome</text>
      <text x="240" y="200" font-family="IBM Plex Mono" font-size="9.5" fill="#A93A2E">unfavorable outcome</text>
    </svg>`
  }
};
