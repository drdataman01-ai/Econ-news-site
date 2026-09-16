/* ------------------------------------------------------------------
   config.js — the site's fixed structure. Shared by the public site
   (index.html) and the newsroom desk tool (admin/index.html) so both
   always agree on which sections and membership tiers exist.

   Add a new section or change a price here and it updates everywhere.
------------------------------------------------------------------- */

const SECTIONS = [
  {id:'sp500', label:'S&P 500 outlook'},
  {id:'japan', label:'Japan outlook'},
  {id:'taiwan', label:'Taiwan outlook'},
  {id:'sea', label:'Southeast Asia outlook'},
  {id:'tech', label:'Tech stocks outlook'},
  {id:'riskmanager', label:'Risk Manager Desk'},
  {id:'fedwatch', label:'Fed Watch'},
  {id:'stockposition', label:'Stock Position Desk'}
];
const TIERS = [
  {id:'free', name:'Free', price:0, cadence:'', blurb:'Headlines and the daily lead story.'},
  {id:'plus', name:'Plus', price:15, cadence:'/month', blurb:'Extended coverage across all four desks.'},
  {id:'pro', name:'Pro', price:55, cadence:'/month', blurb:'Everything in Plus, plus dedicated analyst notes.'}
];
const TIER_RANK = {free:0, plus:1, pro:2};

/* ------------------------------------------------------------------
   Stock Position Desk — trading styles and risk tiers.

   Every article in the "stockposition" section carries a `position`
   object (see content/schema.md) whose `tradingStyle` and `riskTier`
   values must be one of the ids below. Holding period and expected
   return are stored per-article (they're real numbers tied to that
   specific idea), but TRADING_STYLES gives each style a fixed label
   and a *typical* range shown in the filter UI — editing an article's
   own numbers never requires a change here.
------------------------------------------------------------------- */
const TRADING_STYLES = [
  {id:'core', label:'Conservative Core', typicalPeriod:'6-12+ months', typicalReturn:'8-15%'},
  {id:'income', label:'Income / Dividend Growth', typicalPeriod:'12+ months', typicalReturn:'6-12% + yield'},
  {id:'swing', label:'Moderate Swing', typicalPeriod:'2-4 months', typicalReturn:'20-40%'},
  {id:'momentum', label:'Aggressive Momentum', typicalPeriod:'3-6 weeks', typicalReturn:'40-80%'},
  {id:'catalyst', label:'Speculative Catalyst', typicalPeriod:'Days-weeks (event-driven)', typicalReturn:'Wide / binary'}
];
const RISK_TIERS = [
  {id:'conservative', label:'Conservative'},
  {id:'moderate', label:'Moderate'},
  {id:'aggressive', label:'Aggressive'},
  {id:'speculative', label:'Speculative'}
];
