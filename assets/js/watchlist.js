/* ------------------------------------------------------------------
   watchlist.js
   Client-side stock watchlist panel for the front page.

   STORAGE: this site has no backend, so watchlists are stored in the
   browser's localStorage — per-browser, not synced across devices.
   Same approach already used for the membership tier in content.js.

   PRICE DATA: fetched through a Cloudflare Worker proxy (see
   cloudflare-worker.js), NOT called directly against Finnhub from
   the browser. This keeps the real Finnhub API key entirely
   server-side — it never appears in this file, in your GitHub repo,
   or in anything a site visitor can inspect via view-source or the
   Network tab. The worker attaches the real key and forwards the
   request; this file only ever talks to your own worker URL.

   ** SETUP REQUIRED **
   1. Deploy cloudflare-worker.js as a Cloudflare Worker (see setup
      instructions in that file) and set your Finnhub key there as a
      secret — free at https://finnhub.io/register for the key,
      https://dash.cloudflare.com/sign-up for the worker.
   2. Paste your worker's URL below.
------------------------------------------------------------------- */

const QUOTE_PROXY_URL = 'https://kuonomics-quote-proxy.drdataman01.workers.dev';

const WATCHLISTS_STORAGE_KEY = 'kuonomics_watchlists';
const ACTIVE_WATCHLIST_STORAGE_KEY = 'kuonomics_active_watchlist';
const QUOTE_CACHE_STORAGE_KEY = 'kuonomics_quote_cache';
const WATCHLIST_REFRESH_MS = 60000; // 1 minute — matches Finnhub's free-tier rate limit
const QUOTE_STALE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // beyond this, show Unavailable instead of a stale price

const DEFAULT_WATCHLIST_NAME = 'Default';
const DEFAULT_WATCHLIST_SYMBOLS = ['AAPL', 'MSFT', 'NVDA', 'TSM', 'INTC'];

let watchlistState = {
  lists: {},      // { "listName": ["AAPL", "MSFT", ...] }
  active: null,   // name of the currently selected watchlist
  quotes: {}      // { "AAPL": {price, change, changePercent, loading, error} }
};
let watchlistRefreshTimer = null;

function loadWatchlists(){
  try {
    const saved = localStorage.getItem(WATCHLISTS_STORAGE_KEY);
    watchlistState.lists = saved ? JSON.parse(saved) : {};
  } catch(e){
    watchlistState.lists = {};
  }
  if (Object.keys(watchlistState.lists).length === 0){
    watchlistState.lists[DEFAULT_WATCHLIST_NAME] = DEFAULT_WATCHLIST_SYMBOLS.slice();
  }
  try {
    const savedActive = localStorage.getItem(ACTIVE_WATCHLIST_STORAGE_KEY);
    watchlistState.active = (savedActive && watchlistState.lists[savedActive])
      ? savedActive
      : Object.keys(watchlistState.lists)[0];
  } catch(e){
    watchlistState.active = Object.keys(watchlistState.lists)[0];
  }
}

function saveWatchlists(){
  try {
    localStorage.setItem(WATCHLISTS_STORAGE_KEY, JSON.stringify(watchlistState.lists));
    localStorage.setItem(ACTIVE_WATCHLIST_STORAGE_KEY, watchlistState.active);
  } catch(e){
    console.error('Could not save watchlists', e);
  }
}

/* ---- last-known-price cache, independent of which watchlist a symbol is on ----
   Keyed by symbol so a price survives switching watchlists, renaming, or a
   fetch failure. Each entry is { price, change, changePercent, ts }. */
function loadQuoteCache(){
  try {
    const saved = localStorage.getItem(QUOTE_CACHE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch(e){
    return {};
  }
}

function saveQuoteToCache(symbol, quote){
  try {
    const cache = loadQuoteCache();
    cache[symbol] = {
      price: quote.price,
      change: quote.change,
      changePercent: quote.changePercent,
      ts: Date.now()
    };
    localStorage.setItem(QUOTE_CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch(e){
    console.error('Could not save quote cache', e);
  }
}

/** Pre-fills watchlistState.quotes from the cache so the panel shows the last
 * known price immediately on load (marked stale) instead of "Loading..."
 * flashing to "Unavailable" before the first fetch resolves. Call this once,
 * right after loadWatchlists(), before the first render(). */
function primeQuotesFromCache(){
  const cache = loadQuoteCache();
  const symbols = watchlistState.lists[watchlistState.active] || [];
  symbols.forEach(symbol => {
    const cached = cache[symbol];
    if (cached && (Date.now() - cached.ts) < QUOTE_STALE_MAX_AGE_MS){
      watchlistState.quotes[symbol] = {
        price: cached.price,
        change: cached.change,
        changePercent: cached.changePercent,
        loading: false,
        error: null,
        stale: true,
        staleTs: cached.ts
      };
    }
  });
}

/** Switches the active watchlist and persists it — this is what makes
 * "most recently touched" become the default on the next visit. */
function touchActiveWatchlist(name){
  watchlistState.active = name;
  saveWatchlists();
  render();
  fetchAllWatchlistQuotes();
}

function createWatchlist(){
  const name = prompt('Name your new watchlist:');
  if (!name || !name.trim()) return;
  const trimmed = name.trim();
  if (watchlistState.lists[trimmed]){
    alert('A watchlist with that name already exists.');
    return;
  }
  watchlistState.lists[trimmed] = [];
  touchActiveWatchlist(trimmed);
}

function renameActiveWatchlist(){
  const oldName = watchlistState.active;
  const newName = prompt('Rename watchlist:', oldName);
  if (!newName || !newName.trim() || newName.trim() === oldName) return;
  const trimmed = newName.trim();
  if (watchlistState.lists[trimmed]){
    alert('A watchlist with that name already exists.');
    return;
  }
  watchlistState.lists[trimmed] = watchlistState.lists[oldName];
  delete watchlistState.lists[oldName];
  watchlistState.active = trimmed;
  saveWatchlists();
  render();
}

function deleteActiveWatchlist(){
  const name = watchlistState.active;
  if (Object.keys(watchlistState.lists).length <= 1){
    alert("You need at least one watchlist — create another before deleting this one.");
    return;
  }
  if (!confirm(`Delete watchlist "${name}"? This can't be undone.`)) return;
  delete watchlistState.lists[name];
  watchlistState.active = Object.keys(watchlistState.lists)[0];
  saveWatchlists();
  render();
  fetchAllWatchlistQuotes();
}

function addSymbolToActiveWatchlist(){
  const input = document.getElementById('watchlistSymbolInput');
  if (!input) return;
  const symbol = input.value.trim().toUpperCase();
  input.value = '';
  if (!symbol) return;
  const list = watchlistState.lists[watchlistState.active];
  if (list.includes(symbol)){
    render();
    return;
  }
  list.push(symbol);
  saveWatchlists();
  render();
  fetchWatchlistQuote(symbol);
}

function removeSymbolFromActiveWatchlist(symbol){
  const list = watchlistState.lists[watchlistState.active];
  watchlistState.lists[watchlistState.active] = list.filter(s => s !== symbol);
  saveWatchlists();
  render();
}

async function fetchWatchlistQuote(symbol){
  watchlistState.quotes[symbol] = { ...(watchlistState.quotes[symbol] || {}), loading: true, error: null };
  try {
    if (!QUOTE_PROXY_URL || QUOTE_PROXY_URL.includes('YOUR-WORKER-NAME')){
      throw new Error('No proxy configured');
    }
    const res = await fetch(`${QUOTE_PROXY_URL}/?symbol=${encodeURIComponent(symbol)}`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (data.error){
      throw new Error(data.error);
    }
    if (data.c === undefined || data.c === 0){
      throw new Error('No data for this symbol');
    }
    const quote = {
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      loading: false,
      error: null,
      stale: false
    };
    watchlistState.quotes[symbol] = quote;
    saveQuoteToCache(symbol, quote);
  } catch(e){
    const cached = loadQuoteCache()[symbol];
    if (cached && (Date.now() - cached.ts) < QUOTE_STALE_MAX_AGE_MS){
      // Fetch failed (rate limit, worker down, market closed, etc.) but we
      // have a recent price — show it instead of wiping the row to "Unavailable".
      watchlistState.quotes[symbol] = {
        price: cached.price,
        change: cached.change,
        changePercent: cached.changePercent,
        loading: false,
        error: null,
        stale: true,
        staleTs: cached.ts
      };
    } else {
      watchlistState.quotes[symbol] = {
        loading: false,
        error: e.message === 'No proxy configured' ? 'Proxy not set up' : 'Unavailable',
        stale: false
      };
    }
  }
  render();
}

function fetchAllWatchlistQuotes(){
  const list = watchlistState.lists[watchlistState.active] || [];
  list.forEach(symbol => fetchWatchlistQuote(symbol));
}

function startWatchlistAutoRefresh(){
  if (watchlistRefreshTimer) clearInterval(watchlistRefreshTimer);
  watchlistRefreshTimer = setInterval(fetchAllWatchlistQuotes, WATCHLIST_REFRESH_MS);
}

function fmtWatchlistNum(n){
  return typeof n === 'number' ? n.toFixed(2) : '--';
}

function fmtWatchlistStaleTime(ts){
  if (!ts) return '';
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  return `${hrs}h ago`;
}

function renderWatchlistPanel(){
  const names = Object.keys(watchlistState.lists);
  const active = watchlistState.active;
  const symbols = watchlistState.lists[active] || [];

  const optionsHtml = names.map(n =>
    `<option value="${escapeHtml(n)}" ${n === active ? 'selected' : ''}>${escapeHtml(n)}</option>`
  ).join('');

  let rowsHtml = '';
  if (symbols.length === 0){
    rowsHtml = `<div class="watchlist-empty">No symbols yet — add one below.</div>`;
  } else {
    symbols.forEach(symbol => {
      const q = watchlistState.quotes[symbol];
      let priceHtml;
      if (!q || q.loading){
        priceHtml = `<span class="watchlist-loading">Loading&hellip;</span>`;
      } else if (q.error){
        priceHtml = `<span class="watchlist-error">${escapeHtml(q.error)}</span>`;
      } else {
        const dir = q.change > 0 ? 'up' : (q.change < 0 ? 'down' : 'flat');
        const sign = q.change >= 0 ? '+' : '';
        const staleHtml = q.stale
          ? `<span class="watchlist-stale" title="Last live price — updated ${fmtWatchlistStaleTime(q.staleTs)}">&#9203; ${fmtWatchlistStaleTime(q.staleTs)}</span>`
          : '';
        priceHtml = `
          <span class="watchlist-price">${fmtWatchlistNum(q.price)}</span>
          <span class="watchlist-change ${dir}">${sign}${fmtWatchlistNum(q.change)} (${sign}${fmtWatchlistNum(q.changePercent)}%)</span>
          ${staleHtml}`;
      }
      rowsHtml += `
        <div class="watchlist-row">
          <span class="watchlist-symbol">${escapeHtml(symbol)}</span>
          <div class="watchlist-quote">${priceHtml}</div>
          <button class="watchlist-remove" onclick="removeSymbolFromActiveWatchlist('${escapeHtml(symbol)}')" title="Remove ${escapeHtml(symbol)}">&times;</button>
        </div>`;
    });
  }

  return `
    <aside class="watchlist-panel">
      <div class="watchlist-header">
        <h3>Watchlist</h3>
      </div>
      <div class="watchlist-controls">
        <select id="watchlistSelector" onchange="touchActiveWatchlist(this.value)">
          ${optionsHtml}
        </select>
        <button class="watchlist-icon-btn" onclick="createWatchlist()" title="New watchlist">+</button>
        <button class="watchlist-icon-btn" onclick="renameActiveWatchlist()" title="Rename this watchlist">&#9998;</button>
        <button class="watchlist-icon-btn" onclick="deleteActiveWatchlist()" title="Delete this watchlist">&#128465;</button>
      </div>
      <div class="watchlist-rows">${rowsHtml}</div>
      <div class="watchlist-add">
        <input type="text" id="watchlistSymbolInput" placeholder="Add symbol (e.g. AAPL)"
          onkeydown="if(event.key==='Enter'){ addSymbolToActiveWatchlist(); }">
        <button onclick="addSymbolToActiveWatchlist()">Add</button>
      </div>
      <p class="watchlist-disclaimer">Prices via Finnhub, refreshed every minute. Free-tier data may be delayed — not for trading decisions.</p>
    </aside>`;
}
