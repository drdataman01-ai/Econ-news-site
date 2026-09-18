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
   Stock Position Desk — the five position styles.

   Everything on this desk (news labels, rankings, the classroom)
   keys off these five ids. Each combines a risk appetite and a
   holding-period discipline into one label, rather than treating
   risk and style as two separate axes — POSITION_STYLES is the
   single source of truth for the label, badge color, and typical
   holding period / return range shown across the desk.
------------------------------------------------------------------- */
const POSITION_STYLES = [
  {id:'core', label:'Conservative / Core', typicalPeriod:'6-12+ months', typicalReturn:'8-15%'},
  {id:'income', label:'Income / Dividend Growth', typicalPeriod:'12+ months', typicalReturn:'6-12% + yield'},
  {id:'swing', label:'Moderate / Swing', typicalPeriod:'2-4 months', typicalReturn:'20-40%'},
  {id:'momentum', label:'Aggressive / Momentum', typicalPeriod:'3-6 weeks', typicalReturn:'40-80%'},
  {id:'catalyst', label:'Speculative / Catalyst', typicalPeriod:'Days-weeks (event-driven)', typicalReturn:'Wide / binary'}
];

/* ------------------------------------------------------------------
   S&P 500 Outlook chart — the four-color forecast scale.

   Every S&P 500 outlook post can carry an `sp500Outlook` object with
   a call for four horizons (three, six, twelve, and twenty-four
   months out). Each call is one of these four ids, ordered worst to
   best — that order also fixes each level's row position on the
   outlook chart's y-axis (renderSP500OutlookChart in charts.js).
   Single source of truth for the label, line/dot color, and the
   color-strip legend shown under the chart.
------------------------------------------------------------------- */
const SP500_OUTLOOK_LEVELS = [
  {id:'down', label:'Down', color:'#A93A2E', textColor:'#F7F5F0'},
  {id:'flat', label:'Flat', color:'#93701F', textColor:'#F7F5F0'},
  {id:'slight_up', label:'Slightly Up', color:'#7FAE8E', textColor:'#14181F'},
  {id:'up', label:'Up', color:'#1E6B45', textColor:'#F7F5F0'}
];
