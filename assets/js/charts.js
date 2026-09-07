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
 * Builds the small Fed Watch trend panel from the last few Fed Watch
 * articles that carry a `metrics` snapshot. Returns '' if there isn't
 * enough history yet (fewer than 2 posts with metrics).
 */
function renderFedWatchChart(currentArticle){
  const history = sortedArticles(
    state.articles.filter(a => a.section === 'fedwatch' && a.metrics)
  ).slice(0, 7).reverse(); // oldest -> newest, capped at last 7 posts

  if (history.length < 2) return '';

  const fedFunds = history.map(a => a.metrics.fedFundsRate);
  const yield2y  = history.map(a => a.metrics.yield2y);
  const yield10y = history.map(a => a.metrics.yield10y);
  const moveOdds = history.map(a => a.metrics.moveOdds);
  const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
    ? 'Cut odds' : 'Hike odds';

  return `
    <div class="fedwatch-chart-panel">
      <p class="apps-label">Fed Watch trend &middot; last ${history.length} posts</p>
      <div class="fedwatch-sparklines">
        ${sparklineSVG(fedFunds, {label:'Fed funds rate', suffix:'%'})}
        ${sparklineSVG(yield2y,  {label:'2Y Treasury', suffix:'%'})}
        ${sparklineSVG(yield10y, {label:'10Y Treasury', suffix:'%'})}
        ${sparklineSVG(moveOdds, {label:moveLabel, suffix:'%'})}
      </div>
    </div>`;
}
