/* ------------------------------------------------------------------
   charts.js
   Dependency-free SVG line charts. No chart library is loaded on
   this site, so this draws everything by hand from plain numbers.
   All text carries its own inline font-size/fill so the chart looks
   right even if the site's CSS hasn't deployed yet (this has bitten
   us before) — external CSS can still restyle it, but nothing
   depends on that CSS loading to be legible.
   Used today by the Fed Watch trend panel.
------------------------------------------------------------------- */

const CHART_AXIS_STYLE = 'font-family:sans-serif; font-size:8px;';
const CHART_AXIS_FILL = '#9a917f';
const CHART_GRID_STROKE = '#e3ddd2';

/**
 * Renders one single-series line chart (used for the hike/cut odds panel).
 * values: array of numbers, oldest first.
 * dates: array of short display labels (e.g. 'Sep 1'), same length as values.
 */
function lineChartSVG(values, dates, opts){
  opts = opts || {};
  const width = opts.width || 480;
  const height = opts.height || 170;
  const color = opts.color || '#7a4d1f';
  const fillColor = opts.fillColor || 'rgba(122, 77, 31, 0.10)';
  const suffix = opts.suffix || '';

  const padLeft = 44;
  const padRight = 14;
  const padTop = 14;
  const padBottom = 22;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const span = (rawMax - rawMin) || Math.max(1, Math.abs(rawMax) * 0.1) || 1;
  const margin = span * 0.15;
  const min = rawMin - margin;
  const max = rawMax + margin;
  const range = (max - min) || 1;

  const stepX = plotW / ((values.length - 1) || 1);
  const points = values.map((v, i) => {
    const x = padLeft + i * stepX;
    const y = padTop + plotH * (1 - (v - min) / range);
    return [x, y];
  });

  // Event bands (e.g. "COVID crash", "2022 bear market") shade a
  // range of data points, like the gray recession bars on a FRED
  // chart. opts.events: [{startIndex, endIndex, label}], indices
  // referring to positions in the values/dates arrays.
  let eventBands = '';
  (opts.events || []).forEach(ev => {
    const xStart = padLeft + ev.startIndex * stepX;
    const xEnd = padLeft + ev.endIndex * stepX;
    const bandW = Math.max(1, xEnd - xStart);
    eventBands += `
      <rect x="${xStart.toFixed(1)}" y="${padTop}" width="${bandW.toFixed(1)}" height="${plotH.toFixed(1)}" fill="#8a8a86" fill-opacity="0.14"/>
      <text x="${(xStart + bandW / 2).toFixed(1)}" y="${(padTop + 10).toFixed(1)}" text-anchor="middle" style="font-family:sans-serif; font-size:8px;" fill="#6b6b66">${ev.label}</text>`;
  });

  const linePath = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const baseline = padTop + plotH;
  const areaPath = `M${points[0][0].toFixed(1)},${baseline.toFixed(1)} ` +
    points.map(p => `L${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') +
    ` L${points[points.length - 1][0].toFixed(1)},${baseline.toFixed(1)} Z`;

  const gridCount = 4;
  let gridlines = '';
  for (let i = 0; i <= gridCount; i++){
    const val = min + (range * i / gridCount);
    const y = padTop + plotH * (1 - i / gridCount);
    gridlines += `
      <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}" stroke="${CHART_GRID_STROKE}" stroke-width="1"/>
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" style="${CHART_AXIS_STYLE}" fill="${CHART_AXIS_FILL}">${val.toFixed(1)}${suffix}</text>`;
  }

  const xLabelIdxs = pickLabelIndices(values.length);
  let xLabels = '';
  xLabelIdxs.forEach(i => {
    xLabels += `<text x="${points[i][0].toFixed(1)}" y="${height - 5}" text-anchor="middle" style="${CHART_AXIS_STYLE}" fill="${CHART_AXIS_FILL}">${dates[i] || ''}</text>`;
  });

  const lastPoint = points[points.length - 1];
  const last = values[values.length - 1];
  const first = values[0];
  const delta = last - first;
  const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(2) + suffix;
  const deltaClass = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');

  return `
    <div class="linechart">
      <div class="linechart-header">
        <p class="linechart-label">${opts.label || ''}</p>
        <p class="linechart-value">${last}${suffix} <span class="linechart-delta ${deltaClass}">${deltaStr}</span></p>
      </div>
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" overflow="visible" role="img" aria-label="${opts.label || 'chart'} trend, currently ${last}${suffix}">
        ${eventBands}
        ${gridlines}
        <path d="${areaPath}" fill="${fillColor}" stroke="none"/>
        <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.75"/>
        <circle cx="${lastPoint[0].toFixed(1)}" cy="${lastPoint[1].toFixed(1)}" r="3" fill="${color}"/>
        ${xLabels}
      </svg>
    </div>`;
}

/**
 * Renders multiple series on ONE shared chart (used for Fed funds rate +
 * 2Y + 10Y together, since they're all percentages on a comparable
 * scale). Each series: {name, values, color}. `dates` applies to all
 * series and must match each series' values length. Current values
 * are shown in an HTML legend below the chart rather than as on-chart
 * labels, which avoids any risk of overlapping or oversized callouts.
 */
function multiLineChartSVG(seriesList, dates, opts){
  opts = opts || {};
  const width = opts.width || 480;
  const height = opts.height || 190;
  const suffix = opts.suffix || '%';

  const padLeft = 44;
  const padRight = 14;
  const padTop = 14;
  const padBottom = 22;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const allValues = seriesList.flatMap(s => s.values);
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const span = (rawMax - rawMin) || 1;
  const margin = span * 0.12;
  const min = rawMin - margin;
  const max = rawMax + margin;
  const range = (max - min) || 1;

  const n = seriesList[0].values.length;
  const stepX = plotW / ((n - 1) || 1);
  function toXY(v, i){
    return [padLeft + i * stepX, padTop + plotH * (1 - (v - min) / range)];
  }

  const gridCount = 4;
  let gridlines = '';
  for (let i = 0; i <= gridCount; i++){
    const val = min + (range * i / gridCount);
    const y = padTop + plotH * (1 - i / gridCount);
    gridlines += `
      <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}" stroke="${CHART_GRID_STROKE}" stroke-width="1"/>
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" style="${CHART_AXIS_STYLE}" fill="${CHART_AXIS_FILL}">${val.toFixed(1)}${suffix}</text>`;
  }

  const xLabelIdxs = pickLabelIndices(n);
  let xLabels = '';
  xLabelIdxs.forEach(i => {
    const x = padLeft + i * stepX;
    xLabels += `<text x="${x.toFixed(1)}" y="${height - 5}" text-anchor="middle" style="${CHART_AXIS_STYLE}" fill="${CHART_AXIS_FILL}">${dates[i] || ''}</text>`;
  });

  let paths = '';
  let dots = '';
  seriesList.forEach(s => {
    const pts = s.values.map((v, i) => toXY(v, i));
    const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    paths += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="1.75"/>`;
    const last = pts[pts.length - 1];
    dots += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="${s.color}"/>`;
  });

  const legendHtml = seriesList.map(s => {
    const last = s.values[s.values.length - 1];
    const first = s.values[0];
    const delta = last - first;
    const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(2) + suffix;
    const deltaClass = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');
    return `
      <span class="chart-legend-item">
        <span class="chart-legend-swatch" style="background:${s.color};"></span>
        ${s.name}: <strong>${last}${suffix}</strong>
        <span class="linechart-delta ${deltaClass}">${deltaStr}</span>
      </span>`;
  }).join('');

  return `
    <div class="linechart linechart-combined">
      <div class="chart-legend">${legendHtml}</div>
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" overflow="visible" role="img" aria-label="Fed funds rate and Treasury yields, 10-year history">
        ${gridlines}
        ${paths}
        ${dots}
        ${xLabels}
      </svg>
    </div>`;
}

/** Picks which point indices get an x-axis label: all points if 3 or fewer, else up to 5 evenly spaced. */
function pickLabelIndices(count){
  if (count <= 3) return Array.from({length: count}, (_, i) => i);
  const labelCount = Math.min(5, count);
  return Array.from({length: labelCount}, (_, i) => Math.round(i * (count - 1) / (labelCount - 1)));
}

/** Full display label for a date, e.g. 'Sep 7, 2026'. Accepts an ISO date or full timestamp. */
function shortDateLabel(dateString){
  const d = new Date(dateString.length === 10 ? dateString + 'T00:00:00Z' : dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/**
 * Builds x-axis labels for a list of Fed Watch posts. Normally each
 * label is a full date ('Sep 7, 2026'). But if multiple posts landed
 * on the same calendar day (as can happen with same-day updates), a
 * date alone can't tell them apart, so this falls back to time-of-day
 * ('2:00 PM UTC') for that set instead.
 */
function postDateLabels(posts){
  const dayKeys = posts.map(a => a.ts.slice(0, 10));
  const allSameDay = dayKeys.every(k => k === dayKeys[0]);
  if (!allSameDay) return posts.map(a => shortDateLabel(a.ts));
  return posts.map(a => {
    const d = new Date(a.ts);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }) + ' UTC';
  });
}

/** Label for a 'YYYY-MM' history entry, e.g. "'16" for 2016, used to keep long axis labels compact. */
function yearLabel(yearMonth){
  const year = yearMonth.slice(0, 4);
  return "'" + year.slice(2);
}

/** Finds the index in a history array (sorted by 'date') closest to the given 'YYYY-MM', for positioning event bands. */
function historyIndexForMonth(history, yearMonth){
  const exact = history.findIndex(h => h.date === yearMonth);
  if (exact !== -1) return exact;
  for (let i = 0; i < history.length; i++){
    if (history[i].date > yearMonth) return Math.max(0, i - 1);
  }
  return history.length - 1;
}

/**
 * Builds the Fed Watch trend panel. Fed funds rate, 2Y, and 10Y yield
 * are combined into ONE multi-line chart from FED_HISTORY (assets/js/
 * fed-history-data.js) for a true 10-year view, with the most recent
 * Fed Watch post's snapshot appended if it's newer than the last
 * history point. Hike/cut odds has no meaningful 10-year equivalent
 * (it's a forward-looking snapshot ahead of each specific meeting),
 * so that panel stays on its own recent per-post view.
 */
function renderFedWatchChart(currentArticle){
  const withMetrics = sortedArticles(
    state.articles.filter(a => a.section === 'fedwatch' && a.metrics)
  ).reverse(); // oldest -> newest

  // --- 10-year combined history for the three macro series ---
  let history = typeof FED_HISTORY !== 'undefined' ? FED_HISTORY.slice() : [];
  const latestPost = withMetrics[withMetrics.length - 1];
  if (latestPost){
    const latestMonth = latestPost.ts.slice(0, 7); // 'YYYY-MM'
    const lastHistoryMonth = history.length ? history[history.length - 1].date : null;
    const snapshot = {
      date: latestMonth,
      fedFundsRate: latestPost.metrics.fedFundsRate,
      yield2y: latestPost.metrics.yield2y,
      yield10y: latestPost.metrics.yield10y
    };
    if (latestMonth > lastHistoryMonth) history.push(snapshot);
    else if (latestMonth === lastHistoryMonth) history[history.length - 1] = snapshot;
  }

  const historyLabels = history.map(h => yearLabel(h.date));
  const historyPanel = history.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">Fed funds rate &amp; Treasury yields &middot; 10-year history</p>
        ${multiLineChartSVG([
          { name: 'Fed funds rate', values: history.map(h => h.fedFundsRate), color: '#7a4d1f' },
          { name: '2Y Treasury',    values: history.map(h => h.yield2y),      color: '#2f6b4f' },
          { name: '10Y Treasury',   values: history.map(h => h.yield10y),     color: '#4a5d8a' }
        ], historyLabels, { suffix: '%' })}
      </div>` : '';

  return historyPanel;
}

/**
 * Risk Manager Desk chart — same merge pattern as renderFedWatchChart
 * (a static multi-year history file, with the current month's value
 * overwritten or appended from the latest article's own `metrics`
 * snapshot), but split into TWO panels rather than one combined
 * chart. Yield (~4-5%) and credit spreads (~80-300 basis points)
 * cannot share one y-axis without the yield line flattening to
 * nothing, so this renders a single-line yield panel (reusing
 * FED_HISTORY's yield10y, since it's the same underlying rate Fed
 * Watch already tracks) and a separate two-line spread panel from
 * CREDIT_SPREAD_HISTORY.
 */
function renderRiskManagerChart(currentArticle){
  const withMetrics = sortedArticles(
    state.articles.filter(a => a.section === 'riskmanager' && a.metrics)
  ).reverse(); // oldest -> newest
  const latestPost = withMetrics[withMetrics.length - 1];
  const latestMonth = latestPost ? latestPost.ts.slice(0, 7) : null; // 'YYYY-MM'

  // --- Panel 1: 10-year Treasury yield, reusing FED_HISTORY ---
  let yieldHistory = typeof FED_HISTORY !== 'undefined' ? FED_HISTORY.slice() : [];
  if (latestPost && latestPost.metrics.yield10y !== undefined){
    const lastMonth = yieldHistory.length ? yieldHistory[yieldHistory.length - 1].date : null;
    const snapshot = { date: latestMonth, yield10y: latestPost.metrics.yield10y };
    if (latestMonth > lastMonth) yieldHistory.push(snapshot);
    else if (latestMonth === lastMonth) yieldHistory[yieldHistory.length - 1] = { ...yieldHistory[yieldHistory.length - 1], ...snapshot };
  }
  const yieldLabels = yieldHistory.map(h => yearLabel(h.date));
  const yieldPanel = yieldHistory.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">10-year Treasury yield &middot; ALM anchor rate &middot; 10-year history</p>
        ${lineChartSVG(yieldHistory.map(h => h.yield10y), yieldLabels, {
          label: '10Y Treasury',
          suffix: '%',
          color: '#4a5d8a',
          fillColor: 'rgba(74, 93, 138, 0.10)'
        })}
      </div>` : '';

  // --- Panel 2: IG vs. HY credit spreads ---
  let spreadHistory = typeof CREDIT_SPREAD_HISTORY !== 'undefined' ? CREDIT_SPREAD_HISTORY.slice() : [];
  if (latestPost && latestPost.metrics.igSpread !== undefined && latestPost.metrics.hySpread !== undefined){
    const lastMonth = spreadHistory.length ? spreadHistory[spreadHistory.length - 1].date : null;
    const snapshot = { date: latestMonth, igSpread: latestPost.metrics.igSpread, hySpread: latestPost.metrics.hySpread };
    if (latestMonth > lastMonth) spreadHistory.push(snapshot);
    else if (latestMonth === lastMonth) spreadHistory[spreadHistory.length - 1] = snapshot;
  }
  const spreadLabels = spreadHistory.map(h => yearLabel(h.date));
  const spreadPanel = spreadHistory.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">Investment-grade vs. high-yield OAS &middot; 10-year history</p>
        ${multiLineChartSVG([
          { name: 'IG OAS', values: spreadHistory.map(h => h.igSpread), color: '#2f6b4f' },
          { name: 'HY OAS', values: spreadHistory.map(h => h.hySpread), color: '#A93A2E' }
        ], spreadLabels, { suffix: 'bps' })}
      </div>` : '';

  return yieldPanel + spreadPanel;
}

/**
 * Fallback chart per section, used when an article either has no
 * "chart" field or references a key that isn't (yet) registered in
 * MARKET_HISTORY. Rather than showing no chart at all, we show the
 * section's benchmark index — still real registered data, just not
 * the specific instrument the article was about. Tech has no single
 * benchmark index in the registry (articles reference varied
 * individual stocks), so it's intentionally left out here; add one
 * (e.g. a semiconductor index) if that becomes worth tracking.
 */
const DEFAULT_CHART_BY_SECTION = {
  japan: 'nikkei225',
  taiwan: 'taiex',
  sea: 'vnindex'
};

/**
 * Builds a trend chart for any index, stock, exchange rate, or
 * commodity in MARKET_HISTORY, driven by the article's own "chart"
 * field:
 *   article.chart = { key: "nikkei225" }   // or "INTC", "usdjpy", "wti_crude", etc.
 * Looks up the series by key. If the article has no chart field, or
 * the key isn't found in the registry, falls back to the section's
 * default benchmark chart (DEFAULT_CHART_BY_SECTION) instead of
 * showing nothing — so every article in a chart-eligible section gets
 * *a* chart, even if the specific instrument wasn't registered by
 * whatever generated the article. Still never fabricates data: the
 * fallback is always a real, already-registered series, never an
 * invented one. Returns '' only if neither the requested key nor any
 * section fallback resolves to real data.
 */
function renderMarketChart(article){
  const registry = typeof MARKET_HISTORY !== 'undefined' ? MARKET_HISTORY : {};
  let key = article.chart && article.chart.key;
  let series = key ? registry[key] : null;

  if (!series || !series.data || series.data.length < 2){
    const fallbackKey = DEFAULT_CHART_BY_SECTION[article.section];
    if (fallbackKey && registry[fallbackKey]){
      key = fallbackKey;
      series = registry[fallbackKey];
    }
  }

  if (!series || !series.data || series.data.length < 2) return '';

  const labels = series.data.map(d => yearLabel(d.date));
  const values = series.data.map(d => d.value);

  let lookback, color, fillColor;
  if (series.type === 'stock'){
    lookback = '5-year'; color = '#6b4a8a'; fillColor = 'rgba(107, 74, 138, 0.10)';
  } else if (series.type === 'fx'){
    lookback = '10-year'; color = '#8a5a2f'; fillColor = 'rgba(138, 90, 47, 0.10)';
  } else if (series.type === 'commodity'){
    lookback = '10-year'; color = '#2f6b6b'; fillColor = 'rgba(47, 107, 107, 0.10)';
  } else {
    lookback = '10-year'; color = '#2f5d8a'; fillColor = 'rgba(47, 93, 138, 0.10)';
  }

  return `
    <div class="fedwatch-chart-panel">
      <p class="apps-label">${escapeHtml(series.label)} &middot; ${lookback} history</p>
      ${lineChartSVG(values, labels, {
        label: series.label,
        suffix: '',
        color: color,
        fillColor: fillColor
      })}
    </div>`;
}


function renderSP500Chart(currentArticle){
  let history = typeof SP500_HISTORY !== 'undefined' ? SP500_HISTORY.slice() : [];
  if (history.length < 2) return '';

  const latestPost = sortedArticles(
    state.articles.filter(a => a.section === 'sp500' && a.metrics && typeof a.metrics.close === 'number')
  )[0]; // sortedArticles is newest-first, so [0] is the latest

  if (latestPost){
    const latestMonth = latestPost.ts.slice(0, 7); // 'YYYY-MM'
    const lastHistoryMonth = history[history.length - 1].date;
    const snapshot = { date: latestMonth, close: latestPost.metrics.close };
    if (latestMonth > lastHistoryMonth) history.push(snapshot);
    else if (latestMonth === lastHistoryMonth) history[history.length - 1] = snapshot;
  }

  const labels = history.map(h => yearLabel(h.date));

  // Known market events, marked as shaded bands like FRED's recession
  // bars. Index ranges are based on the data points that bracket each
  // event in SP500_HISTORY, not exact daily dates, since the history
  // here is sampled every few months rather than daily.
  const events = [
    { start: '2019-12', end: '2020-06', label: 'COVID crash' },
    { start: '2021-12', end: '2022-12', label: '2022 bear market' },
    { start: '2024-12', end: '2025-09', label: 'Tariff selloff' }
  ].map(ev => ({
    startIndex: historyIndexForMonth(history, ev.start),
    endIndex: historyIndexForMonth(history, ev.end),
    label: ev.label
  }));

  return `
    <div class="fedwatch-chart-panel">
      <p class="apps-label">S&amp;P 500 &middot; 10-year history</p>
      ${lineChartSVG(history.map(h => h.close), labels, {
        label: 'S&P 500',
        suffix: '',
        color: '#2f5d8a',
        fillColor: 'rgba(47, 93, 138, 0.10)',
        events: events
      })}
    </div>`;
}
