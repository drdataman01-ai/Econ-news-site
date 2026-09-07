/* ------------------------------------------------------------------
   charts.js
   Small, dependency-free SVG sparkline charts. No chart library is
   loaded on this site, so this draws simple line sparklines by hand
   from an array of numbers. Used today by the Fed Watch trend panel,
   but sparklineSVG() is generic and safe to reuse elsewhere.
------------------------------------------------------------------- */

function sparklinePoints(values, width, height, padding){
  padding = padding || 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = (max - min) || 1; // avoid divide-by-zero on flat series
  const stepX = (width - padding * 2) / ((values.length - 1) || 1);
  return values.map((v, i) => {
    const x = padding + i * stepX;
    const y = padding + (height - padding * 2) * (1 - (v - min) / range);
    return [x, y];
  });
}

/**
 * Renders one small labeled sparkline as an HTML string.
 * values: array of numbers, oldest first.
 * opts: {label, suffix, width, height, color}
 */
function sparklineSVG(values, opts){
  opts = opts || {};
  const width = opts.width || 140;
  const height = opts.height || 36;
  const color = opts.color || '#7a4d1f';
  const suffix = opts.suffix || '';
  const points = sparklinePoints(values, width, height);
  const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const lastPoint = points[points.length - 1];
  const first = values[0];
  const last = values[values.length - 1];
  const delta = last - first;
  const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(2) + suffix;
  const deltaClass = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');

  return `
    <div class="sparkline">
      <p class="sparkline-label">${opts.label || ''}</p>
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-hidden="true">
        <path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"/>
        <circle cx="${lastPoint[0].toFixed(1)}" cy="${lastPoint[1].toFixed(1)}" r="2.5" fill="${color}"/>
      </svg>
      <p class="sparkline-value">${last}${suffix} <span class="sparkline-delta ${deltaClass}">${deltaStr}</span></p>
    </div>`;
}

/**
 * Returns the Monday (UTC, YYYY-MM-DD) of the week containing the
 * given timestamp. Used to bucket daily Fed Watch posts into weeks.
 */
function weekStartKey(tsString){
  const d = new Date(tsString);
  const day = d.getUTCDay(); // 0 = Sunday ... 6 = Saturday
  const diffToMonday = (day === 0 ? -6 : 1 - day);
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() + diffToMonday);
  monday.setUTCHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

/** Short display label for a week-start date, e.g. 'Sep 1'. */
function shortDateLabel(isoDateString){
  const d = new Date(isoDateString + 'T00:00:00Z');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Builds the small Fed Watch trend panel, aggregated by week. Each
 * week's value is the most recent Fed Watch post's `metrics` snapshot
 * within that week (i.e. "where things stood as of that week"), not
 * an average. Returns '' if there isn't enough history yet (fewer
 * than 2 distinct weeks with data).
 */
function renderFedWatchChart(currentArticle){
  const withMetrics = sortedArticles(
    state.articles.filter(a => a.section === 'fedwatch' && a.metrics)
  ).reverse(); // oldest -> newest

  // Bucket into weeks, keeping the latest post's metrics per week.
  const byWeek = {};
  withMetrics.forEach(a => {
    byWeek[weekStartKey(a.ts)] = a.metrics;
  });

  const weekKeys = Object.keys(byWeek).sort(); // ascending, e.g. '2026-09-01'
  const recentWeeks = weekKeys.slice(-8); // cap at last 8 weeks

  // Not enough distinct weeks yet (e.g. a new Fed Watch section with only
  // a few same-week posts) — fall back to per-post trend so the chart
  // doesn't just disappear while weekly history builds up.
  if (recentWeeks.length < 2){
    const recentPosts = withMetrics.slice(-7); // last 7 posts, oldest -> newest
    if (recentPosts.length < 2) return '';

    const fedFunds = recentPosts.map(a => a.metrics.fedFundsRate);
    const yield2y  = recentPosts.map(a => a.metrics.yield2y);
    const yield10y = recentPosts.map(a => a.metrics.yield10y);
    const moveOdds = recentPosts.map(a => a.metrics.moveOdds);
    const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
      ? 'Cut odds' : 'Hike odds';

    return `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">Fed Watch trend &middot; last ${recentPosts.length} posts &middot; weekly view starts once history spans 2+ weeks</p>
        <div class="fedwatch-sparklines">
          ${sparklineSVG(fedFunds, {label:'Fed funds rate', suffix:'%'})}
          ${sparklineSVG(yield2y,  {label:'2Y Treasury', suffix:'%'})}
          ${sparklineSVG(yield10y, {label:'10Y Treasury', suffix:'%'})}
          ${sparklineSVG(moveOdds, {label:moveLabel, suffix:'%'})}
        </div>
      </div>`;
  }

  const fedFunds = recentWeeks.map(k => byWeek[k].fedFundsRate);
  const yield2y  = recentWeeks.map(k => byWeek[k].yield2y);
  const yield10y = recentWeeks.map(k => byWeek[k].yield10y);
  const moveOdds = recentWeeks.map(k => byWeek[k].moveOdds);
  const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
    ? 'Cut odds' : 'Hike odds';
  const rangeLabel = `${shortDateLabel(recentWeeks[0])} \u2013 ${shortDateLabel(recentWeeks[recentWeeks.length - 1])}`;

  return `
    <div class="fedwatch-chart-panel">
      <p class="apps-label">Fed Watch trend &middot; weekly &middot; ${rangeLabel}</p>
      <div class="fedwatch-sparklines">
        ${sparklineSVG(fedFunds, {label:'Fed funds rate', suffix:'%'})}
        ${sparklineSVG(yield2y,  {label:'2Y Treasury', suffix:'%'})}
        ${sparklineSVG(yield10y, {label:'10Y Treasury', suffix:'%'})}
        ${sparklineSVG(moveOdds, {label:moveLabel, suffix:'%'})}
      </div>
    </div>`;
}
