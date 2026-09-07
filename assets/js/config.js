/* ------------------------------------------------------------------
   config.js — the site's fixed structure. Shared by the public site
   (index.html) and the newsroom desk tool (admin/index.html) so both
   always agree on which sections and membership tiers exist.

   Add a new section or change a price here and it updates everywhere.
------------------------------------------------------------------- */

const SECTIONS = [
  {id:'sp500', label:'S&P 500 outlook'},
  {id:'us', label:'US outlook'},
  {id:'asia', label:'Asian outlook'},
  {id:'tech', label:'Tech stocks outlook'},
  {id:'fedwatch', label:'Fed Watch'}
];
const TIERS = [
  {id:'free', name:'Free', price:0, cadence:'', blurb:'Headlines and the daily lead story.'},
  {id:'plus', name:'Plus', price:15, cadence:'/month', blurb:'Extended coverage across all four desks.'},
  {id:'pro', name:'Pro', price:55, cadence:'/month', blurb:'Everything in Plus, plus dedicated analyst notes.'}
];
const TIER_RANK = {free:0, plus:1, pro:2};
