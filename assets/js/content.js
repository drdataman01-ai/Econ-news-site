/* ------------------------------------------------------------------
   content.js
   Loads the WEEKLY CONTENT from /content/articles.json and tracks
   the visitor's membership selection. Depends on config.js being
   loaded first (SECTIONS, TIERS, TIER_RANK).

   This is the file to look at if you're wiring up a real backend or
   CMS later: replace loadData()'s fetch call with an API call and
   nothing else in the site needs to change.
------------------------------------------------------------------- */

// Where this week's content lives. Swap this file weekly (or point it
// at an API endpoint) to publish new stories without touching any code.
const CONTENT_URL = 'content/articles.json';
const MEMBERSHIP_STORAGE_KEY = 'meridiandesk_membership_tier';

let state = {
  view: 'home',
  sectionId: null,
  articleId: null,
  articles: [],
  weekOf: null,
  membership: 'free',
  loaded: false,
  loadError: false,
  theoryOpen: false,
  classroomOpen: null
};

function sectionLabel(id){
  const s = SECTIONS.find(s=>s.id===id);
  return s ? s.label : id;
}
function tierInfo(id){ return TIERS.find(t=>t.id===id) || TIERS[0]; }
function fmtDate(ts){
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
}
function canRead(article){
  return TIER_RANK[state.membership] >= TIER_RANK[article.tier];
}
function sortedArticles(list){
  return [...list].sort((a,b)=> new Date(b.ts) - new Date(a.ts));
}

/**
 * Loads this week's content from CONTENT_URL and the visitor's saved
 * membership tier from localStorage. Called once on page load.
 *
 * NOTE: fetch() of a local file only works when the site is served
 * over http(s) (e.g. `npx serve`, `python3 -m http.server`, or real
 * hosting) — opening index.html directly via file:// will fail this
 * fetch in most browsers due to CORS restrictions on local files.
 */
async function loadData(){
  try{
    const res = await fetch(CONTENT_URL, {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    state.articles = Array.isArray(data.articles) ? data.articles : [];
    state.weekOf = data.week_of || null;
    state.loadError = false;
  }catch(e){
    console.error('Could not load content/articles.json', e);
    state.articles = [];
    state.loadError = true;
  }

  try{
    const saved = localStorage.getItem(MEMBERSHIP_STORAGE_KEY);
    state.membership = saved || 'free';
  }catch(e){
    state.membership = 'free';
  }

  state.loaded = true;
  render();
}

function persistMembership(){
  try{
    localStorage.setItem(MEMBERSHIP_STORAGE_KEY, state.membership);
  }catch(e){
    console.error('Could not save membership tier', e);
  }
}
