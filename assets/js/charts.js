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

  // x-axis labels: for short series show every point; for longer
  // series (like 10-year history) space out up to 5 labels evenly.
  let xLabelIdxs;
  if (values.length <= 3){
    xLabelIdxs = points.map((_, i) => i);
  } else {
    const labelCount = Math.min(5, values.length);
    xLabelIdxs = Array.from({length: labelCount}, (_, i) =>
      Math.round(i * (values.length - 1) / (labelCount - 1))
    );
  }
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
 * Builds the Fed Watch trend panel. Fed funds rate, 2Y yield, and 10Y
 * yield draw from FED_HISTORY (assets/js/fed-history-data.js) for a
 * true 10-year view, with the most recent Fed Watch post's snapshot
 * appended if it's newer than the last history point. Hike/cut odds
 * has no meaningful 10-year equivalent (it's a forward-looking
 * snapshot ahead of each specific meeting), so that panel stays on
 * the recent per-post view.
 */
function renderFedWatchChart(currentArticle){
  const withMetrics = sortedArticles(
    state.articles.filter(a => a.section === 'fedwatch' && a.metrics)
  ).reverse(); // oldest -> newest

  const moveLabel = currentArticle.metrics && currentArticle.metrics.moveDirection === 'cut'
    ? 'Cut odds' : 'Hike odds';

  // --- 10-year history for the three macro series ---
  let history = typeof FED_HISTORY !== 'undefined' ? FED_HISTORY.slice() : [];
  const latestPost = withMetrics[withMetrics.length - 1];
  if (latestPost){
    const latestMonth = latestPost.ts.slice(0, 7); // 'YYYY-MM'
    const lastHistoryMonth = history.length ? history[history.length - 1].date : null;
    if (latestMonth > lastHistoryMonth){
      history.push({
        date: latestMonth,
        fedFundsRate: latestPost.metrics.fedFundsRate,
        yield2y: latestPost.metrics.yield2y,
        yield10y: latestPost.metrics.yield10y
      });
    } else if (latestMonth === lastHistoryMonth){
      // Replace the placeholder same-month entry with the live snapshot.
      history[history.length - 1] = {
        date: latestMonth,
        fedFundsRate: latestPost.metrics.fedFundsRate,
        yield2y: latestPost.metrics.yield2y,
        yield10y: latestPost.metrics.yield10y
      };
    }
  }

  const historyLabels = history.map(h => yearLabel(h.date));
  const historyPanel = history.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">Fed funds rate &amp; Treasury yields &middot; 10-year history</p>
        <div class="fedwatch-linecharts">
          ${lineChartSVG(history.map(h => h.fedFundsRate), historyLabels, {label:'Fed funds rate', suffix:'%'})}
          ${lineChartSVG(history.map(h => h.yield2y), historyLabels, {label:'2Y Treasury', suffix:'%'})}
          ${lineChartSVG(history.map(h => h.yield10y), historyLabels, {label:'10Y Treasury', suffix:'%'})}
        </div>
      </div>` : '';

  // --- Recent hike/cut odds, from Fed Watch posts only ---
  const recentPosts = withMetrics.slice(-7);
  const oddsPanel = recentPosts.length >= 2 ? `
      <div class="fedwatch-chart-panel">
        <p class="apps-label">${moveLabel} &middot; last ${recentPosts.length} Fed Watch posts</p>
        <div class="fedwatch-linecharts fedwatch-linecharts-single">
          ${lineChartSVG(recentPosts.map(a => a.metrics.moveOdds), recentPosts.map(a => shortDateLabel(a.ts)), {label:moveLabel, suffix:'%'})}
        </div>
      </div>` : '';

  return historyPanel + oddsPanel;
}
