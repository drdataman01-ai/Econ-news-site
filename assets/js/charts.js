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

/** Short display label for a date, e.g. 'Sep 1'. Accepts an ISO date or full timestamp. */
function shortDateLabel(dateString){
  const d = new Date(dateString.length === 10 ? dateString + 'T00:00:00Z' : dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** Label for a 'YYYY-MM' history entry, e.g. "'16" for 2016, used to keep long axis labels compact. */
function yearLabel(yearMonth){
  const year = yearMonth.slice(0, 4);
  return "'" + year.slice(2);
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

  const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
    ? 'Cut odds' : 'Hike odds';

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

  // --- Recent hike/cut odds, from Fed Watch posts only ---
  const recentPosts = withMetrics.slice(-7);
  const oddsPanel = recentPosts.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">${moveLabel} &middot; last ${recentPosts.length} Fed Watch posts</p>
        ${lineChartSVG(recentPosts.map(a => a.metrics.moveOdds), recentPosts.map(a => shortDateLabel(a.ts)), {label:moveLabel, suffix:'%'})}
      </div>` : '';

  return historyPanel + oddsPanel;
}
