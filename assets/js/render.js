function renderNav(){
  const nav = document.getElementById('sectionNav');
  let html = `<button class="${state.view==='home'?'active':''}" onclick="goHome()">Front page</button>`;
  SECTIONS.forEach(s=>{
    html += `<button class="${state.view==='section' && state.sectionId===s.id ? 'active':''}" onclick="goSection('${s.id}')">${s.label}</button>`;
  });
  html += `<button class="${state.view==='classroom'?'active':''}" onclick="goView('classroom')">Economics classroom</button>`;
  nav.innerHTML = html;
}
function lockTag(article){
  if(article.tier === 'free') return '';
  const label = article.tier === 'plus' ? 'Plus' : 'Pro';
  return `<span class="lock-tag">${canRead(article) ? '&#10003;' : '&#128274;'} ${label}</span>`;
}
function theoryTag(article){
  return article.theoryKey && theoryInfo(article.theoryKey) ? `<span class="theory-tag">&#0952; Theory</span>` : '';
}

function renderHome(){
  const all = sortedArticles(state.articles);
  if(all.length === 0){
    return `<div class="empty-note">No stories published yet this week.</div>`;
  }
  const lead = all[0];
  const rest = all.slice(1, 5);

  let sideHtml = `<div class="side-list"><h2>Latest across the desk</h2>`;
  rest.forEach(a=>{
    sideHtml += `
      <div class="side-item" onclick="goArticle('${a.id}')">
        <p class="headline">${escapeHtml(a.headline)}</p>
        <div class="meta-row"><span>${sectionLabel(a.section)}</span><span>&middot;</span><span>${fmtDate(a.ts)}</span>${lockTag(a)}${theoryTag(a)}</div>
      </div>`;
  });
  sideHtml += `</div>`;

  let heroHtml = `
    <div>
      <div class="kicker">${sectionLabel(lead.section)}</div>
      <h1 onclick="goArticle('${lead.id}')">${escapeHtml(lead.headline)}</h1>
      <p class="dek">${escapeHtml(lead.dek)}</p>
      <div class="byline">By ${escapeHtml(lead.author)} &middot; ${fmtDate(lead.ts)} ${lockTag(lead)}${theoryTag(lead)}</div>
    </div>`;

  let gridHtml = `<div class="section-grid">`;
  SECTIONS.forEach(s=>{
    const items = sortedArticles(state.articles.filter(a=>a.section===s.id)).slice(0,3);
    gridHtml += `<div class="section-col">
      <h3 onclick="goSection('${s.id}')">${s.label}</h3>`;
    if(items.length === 0){
      gridHtml += `<div class="empty-note">No stories yet in this section.</div>`;
    } else {
      items.forEach(a=>{
        gridHtml += `
          <div class="col-item" onclick="goArticle('${a.id}')">
            <p class="headline">${escapeHtml(a.headline)}</p>
            <div class="meta-row"><span>${fmtDate(a.ts)}</span>${lockTag(a)}${theoryTag(a)}</div>
          </div>`;
      });
    }
    gridHtml += `<button class="see-all" onclick="goSection('${s.id}')">All ${s.label.toLowerCase()} &rarr;</button></div>`;
  });
  gridHtml += `</div>`;

  return `<div class="hero">${heroHtml}${sideHtml}</div>${gridHtml}`;
}

function renderSectionView(){
  const items = sortedArticles(state.articles.filter(a=>a.section===state.sectionId));
  let html = `<div class="section-head" style="margin-bottom:26px;">
    <div class="kicker">Desk</div>
    <h2>${sectionLabel(state.sectionId)}</h2>
  </div>`;
  if(items.length === 0){
    html += `<div class="empty-note">No stories yet in this section.</div>`;
    return html;
  }
  html += `<div style="max-width:760px;">`;
  items.forEach(a=>{
    html += `
      <div class="side-item" onclick="goArticle('${a.id}')" style="padding:18px 0;">
        <p class="headline" style="font-size:19px;">${escapeHtml(a.headline)}</p>
        <p style="font-family:var(--font-serif); color:var(--ink-soft); font-size:14.5px; margin:4px 0 8px;">${escapeHtml(a.dek)}</p>
        <div class="meta-row"><span>By ${escapeHtml(a.author)}</span><span>&middot;</span><span>${fmtDate(a.ts)}</span>${lockTag(a)}${theoryTag(a)}</div>
      </div>`;
  });
  html += `</div>`;
  return html;
}

function renderArticleView(){
  const a = state.articles.find(x=>x.id===state.articleId);
  if(!a) return `<div class="empty-note">That story is no longer available.</div><button class="back-link" onclick="goHome()">&larr; Back to front page</button>`;
  const bodyParas = a.body.split('\n').filter(p=>p.trim().length);
  const allowed = canRead(a);
  let html = `<div class="article-view">
    <button class="back-link" onclick="goSection('${a.section}')">&larr; ${sectionLabel(a.section)}</button>
    <div class="kicker">${sectionLabel(a.section)}</div>
    <h1>${escapeHtml(a.headline)}</h1>
    <p class="dek">${escapeHtml(a.dek)}</p>
    <div class="byline">By ${escapeHtml(a.author)} &middot; ${fmtDate(a.ts)} ${lockTag(a)}</div>
    <div class="article-body">`;

  if(allowed){
    bodyParas.forEach(p=>{ html += `<p>${escapeHtml(p)}</p>`; });
  } else {
    html += `<p>${escapeHtml(bodyParas[0] || '')}</p>`;
    const need = tierInfo(a.tier);
    html += `
      <div class="paywall">
        <h4>Continue reading with ${need.name}</h4>
        <p>This story is part of ${need.name} coverage. Join for $${need.price}${need.cadence} to read the rest and unlock every story at this level or below.</p>
        <button class="btn solid tier-cta" onclick="setTier('${a.tier}')">Join ${need.name} &mdash; $${need.price}${need.cadence}</button>
      </div>`;
  }
  html += `</div>`;

  const theory = theoryInfo(a.theoryKey);
  if(theory && allowed){
    html += `
      <div class="theory-block">
        <button class="theory-toggle" aria-expanded="${state.theoryOpen}" onclick="toggleTheory()">
          Macroeconomic reasoning &mdash; <span class="label-name">${escapeHtml(theory.name)}</span>
          <span class="caret">${state.theoryOpen ? 'Hide &uarr;' : 'Dig deeper &darr;'}</span>
        </button>
        ${state.theoryOpen ? `
        <div class="theory-panel">
          <p class="eyebrow">Framework applied to this story</p>
          <h4>${escapeHtml(theory.name)}</h4>
          <div class="theory-graph">${theory.svg}</div>
          <p class="theory-caption">${escapeHtml(theory.caption)} Illustrative schematic, not fitted to data.</p>
          <div class="theory-body">${a.theoryBody.split('\n').filter(p=>p.trim().length).map(p=>`<p>${escapeHtml(p)}</p>`).join('')}</div>
        </div>` : ''}
      </div>`;
  } else if(theory && !allowed){
    html += `
      <div class="theory-block">
        <button class="theory-toggle" onclick="setTier('${a.tier}')">
          Macroeconomic reasoning &mdash; <span class="label-name">${escapeHtml(theory.name)}</span>
          <span class="caret">&#128274; ${tierInfo(a.tier).name} only</span>
        </button>
      </div>`;
  }

  html += `</div>`;
  return html;
}

function renderClassroomView(){
  const keys = Object.keys(THEORY_LIBRARY).sort((a,b)=> THEORY_LIBRARY[a].name.localeCompare(THEORY_LIBRARY[b].name));
  let html = `<div class="section-head" style="margin-bottom:26px;">
    <div class="kicker">Reference</div>
    <h2>Economics classroom</h2>
    <p>The frameworks our analysts reach for most often, gathered in one place with the underlying diagram and a plain-language walkthrough &mdash; independent of whatever story they're attached to this week.</p>
  </div>`;

  html += `<div class="classroom-list">`;
  keys.forEach(key=>{
    const t = THEORY_LIBRARY[key];
    const open = state.classroomOpen === key;
    const apps = Array.isArray(t.applications) ? t.applications : [];
    html += `
      <div class="classroom-row">
        <div class="theory-block classroom-item">
          <button class="theory-toggle" aria-expanded="${open}" onclick="toggleClassroomTheory('${key}')">
            <span class="label-name">${escapeHtml(t.name)}</span>
            <span class="caret">${open ? 'Hide &uarr;' : 'Dig deeper &darr;'}</span>
          </button>
          ${open ? `
          <div class="theory-panel">
            <div class="theory-graph">${t.svg}</div>
            <p class="theory-caption">${escapeHtml(t.caption)} Illustrative schematic, not fitted to data.</p>
          </div>` : ''}
        </div>
        ${apps.length ? `
        <div class="classroom-apps">
          <p class="apps-label">Use for</p>
          <ul>${apps.map(a=>`<li>${escapeHtml(a)}</li>`).join('')}</ul>
        </div>` : ''}
      </div>`;
  });
  html += `</div>`;

  return html;
}

function renderMembershipView(){
  let head = `<div class="section-head">
    <div class="kicker">Membership</div>
    <h2>Choose your coverage level</h2>
    <p>Free access covers the daily lead story and headlines across all four desks. Paid tiers unlock the full text of extended coverage and dedicated analyst notes.</p>
  </div>`;

  let table = `<table class="ledger"><thead><tr>
    <th style="width:22%;">&nbsp;</th>`;
  TIERS.forEach(t=>{
    table += `<th>
      <p class="tier-name">${t.name}</p>
      <p class="tier-price">$${t.price}<small>${t.cadence || ' one time'}</small></p>
      <p style="font-family:var(--font-sans); font-size:12.5px; color:var(--ink-soft); font-weight:400; margin:6px 0 10px;">${t.blurb}</p>
      ${state.membership===t.id ? '<span class="current-badge">Current plan</span>' : `<button class="btn solid tier-cta" onclick="setTier('${t.id}')">${t.price===0?'Read free':'Join '+t.name}</button>`}
    </th>`;
  });
  table += `</tr></thead><tbody>`;

  const rows = [
    {label:'Front-page lead story', vals:[true,true,true]},
    {label:'Headlines, all four desks', vals:[true,true,true]},
    {label:'Full extended coverage', vals:[false,true,true]},
    {label:'Dedicated analyst notes', vals:[false,false,true]}
  ];
  rows.forEach(r=>{
    table += `<tr><td class="feat">${r.label}</td>`;
    r.vals.forEach(v=>{
      table += `<td class="check">${v ? '<span class="yes">&#10003;</span>' : '<span class="no">&mdash;</span>'}</td>`;
    });
    table += `</tr>`;
  });
  table += `</tbody></table>`;

  return head + table;
}

function render(){
  renderNav();
  document.getElementById('memberLine').textContent = 'Reading as ' + tierInfo(state.membership).name;
  const app = document.getElementById('app');
  if(!state.loaded){
    app.innerHTML = `<div class="empty-note">Loading this week's desk...</div>`;
    return;
  }
  if(state.loadError){
    app.innerHTML = `<div class="empty-note">Could not load content/articles.json. If you're opening this file directly from disk, serve the folder with a local web server instead (see README.md) &mdash; browsers block local file fetches otherwise.</div>`;
    return;
  }
  if(state.view === 'home') app.innerHTML = renderHome();
  else if(state.view === 'section') app.innerHTML = renderSectionView();
  else if(state.view === 'article') app.innerHTML = renderArticleView();
  else if(state.view === 'membership') app.innerHTML = renderMembershipView();
  else if(state.view === 'classroom') app.innerHTML = renderClassroomView();
}
