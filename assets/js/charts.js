/* ------------------------------------------------------------------
   charts.js
   Dependency-free SVG line charts, styled after a FRED-style chart:
   gridlines, axis labels, a filled area under the line, and a small
   callout box on the latest point. No chart library is loaded on
   this site, so this draws everything by hand from plain numbers.
   Used today by the Fed Watch trend panel.
------------------------------------------------------------------- */

/**
 * Renders one labeled line chart as an HTML string.
 * values: array of numbers, oldest first.
 * dates: array of short display labels (e.g. 'Sep 1'), same length as values.
 * opts: {label, suffix, width, height, color, fillColor}
 */
function lineChartSVG(values, dates, opts){
  opts = opts || {};
  const width = opts.width || 320;
  const height = opts.height || 160;
  const color = opts.color || '#7a4d1f';
  const fillColor = opts.fillColor || 'rgba(122, 77, 31, 0.10)';
  const suffix = opts.suffix || '';

  const padLeft = 38;
  const padRight = 14;
  const padTop = 14;
  const padBottom = 24;
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

  // 4 horizontal gridlines with y-axis labels, evenly spaced by value
  const gridCount = 4;
  let gridlines = '';
  for (let i = 0; i <= gridCount; i++){
    const val = min + (range * i / gridCount);
    const y = padTop + plotH * (1 - i / gridCount);
    gridlines += `
      <line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}" class="chart-gridline"/>
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" class="chart-axis-label" text-anchor="end">${val.toFixed(1)}${suffix}</text>`;
  }

  // x-axis labels: first, middle, last point (avoids crowding on longer series)
  const xLabelIdxs = values.length <= 3
    ? points.map((_, i) => i)
    : [0, Math.round((values.length - 1) / 2), values.length - 1];
  let xLabels = '';
  xLabelIdxs.forEach(i => {
    xLabels += `<text x="${points[i][0].toFixed(1)}" y="${height - 6}" class="chart-axis-label" text-anchor="middle">${dates[i] || ''}</text>`;
  });

  // Callout box on the latest point, FRED-style
  const lastPoint = points[points.length - 1];
  const last = values[values.length - 1];
  const first = values[0];
  const delta = last - first;
  const deltaStr = (delta >= 0 ? '+' : '') + delta.toFixed(2) + suffix;
  const deltaClass = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');
  const calloutText = `${dates[dates.length - 1] || ''}: ${last}${suffix}`;
  const calloutW = 14 + calloutText.length * 5.6;
  const calloutOnLeft = lastPoint[0] + calloutW + 10 > width - padRight;
  const calloutX = calloutOnLeft ? lastPoint[0] - calloutW - 8 : lastPoint[0] + 8;
  const calloutY = Math.max(padTop, Math.min(lastPoint[1] - 12, height - padBottom - 20));

  return `
    <div class="linechart">
      <div class="linechart-header">
        <p class="linechart-label">${opts.label || ''}</p>
        <p class="linechart-value">${last}${suffix} <span class="linechart-delta ${deltaClass}">${deltaStr}</span></p>
      </div>
      <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-label="${opts.label || 'chart'} trend, currently ${last}${suffix}">
        ${gridlines}
        <path d="${areaPath}" fill="${fillColor}" stroke="none"/>
        <path d="${linePath}" fill="none" stroke="${color}" stroke-width="1.75"/>
        <circle cx="${lastPoint[0].toFixed(1)}" cy="${lastPoint[1].toFixed(1)}" r="3" fill="${color}"/>
        ${xLabels}
        <g class="chart-callout">
          <rect x="${calloutX.toFixed(1)}" y="${calloutY.toFixed(1)}" width="${calloutW.toFixed(1)}" height="20" rx="3"/>
          <text x="${(calloutX + calloutW / 2).toFixed(1)}" y="${(calloutY + 14).toFixed(1)}" text-anchor="middle">${calloutText}</text>
        </g>
      </svg>
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

/** Short display label for a date, e.g. 'Sep 1'. Accepts an ISO date or full timestamp. */
function shortDateLabel(dateString){
  const d = new Date(dateString.length === 10 ? dateString + 'T00:00:00Z' : dateString);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Builds the Fed Watch trend panel, aggregated by week once enough
 * history exists. Each week's value is the most recent Fed Watch
 * post's `metrics` snapshot within that week (i.e. "where things
 * stood as of that week"), not an average. Falls back to a per-post
 * view when fewer than 2 distinct weeks of data exist yet, so the
 * chart doesn't just disappear while weekly history builds up.
 * Returns '' if there isn't enough history at all (fewer than 2 posts).
 */
function renderFedWatchChart(currentArticle){
  const withMetrics = sortedArticles(
    state.articles.filter(a => a.section === 'fedwatch' && a.metrics)
  ).reverse(); // oldest -> newest

  const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
    ? 'Cut odds' : 'Hike odds';

  function panel(values2d, labels, subtitle){
    return `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">Fed Watch trend &middot; ${subtitle}</p>
        <div class="fedwatch-linecharts">
          ${lineChartSVG(values2d.fedFunds, labels, {label:'Fed funds rate', suffix:'%'})}
          ${lineChartSVG(values2d.yield2y,  labels, {label:'2Y Treasury', suffix:'%'})}
          ${lineChartSVG(values2d.yield10y, labels, {label:'10Y Treasury', suffix:'%'})}
          ${lineChartSVG(values2d.moveOdds, labels, {label:moveLabel, suffix:'%'})}
        </div>
      </div>`;
  }

  // Bucket into weeks, keeping the latest post's metrics per week.
  const byWeek = {};
  withMetrics.forEach(a => { byWeek[weekStartKey(a.ts)] = a.metrics; });
  const weekKeys = Object.keys(byWeek).sort();
  const recentWeeks = weekKeys.slice(-8);

  if (recentWeeks.length >= 2){
    const labels = recentWeeks.map(shortDateLabel);
    return panel({
      fedFunds: recentWeeks.map(k => byWeek[k].fedFundsRate),
      yield2y:  recentWeeks.map(k => byWeek[k].yield2y),
      yield10y: recentWeeks.map(k => byWeek[k].yield10y),
      moveOdds: recentWeeks.map(k => byWeek[k].moveOdds)
    }, labels, `weekly &middot; ${labels[0]} \u2013 ${labels[labels.length - 1]}`);
  }

  // Not enough distinct weeks yet — fall back to per-post trend.
  const recentPosts = withMetrics.slice(-7);
  if (recentPosts.length < 2) return '';
  const labels = recentPosts.map(a => shortDateLabel(a.ts));
  return panel({
    fedFunds: recentPosts.map(a => a.metrics.fedFundsRate),
    yield2y:  recentPosts.map(a => a.metrics.yield2y),
    yield10y: recentPosts.map(a => a.metrics.yield10y),
    moveOdds: recentPosts.map(a => a.metrics.moveOdds)
  }, labels, `last ${recentPosts.length} posts &middot; weekly view starts once history spans 2+ weeks`);
}
