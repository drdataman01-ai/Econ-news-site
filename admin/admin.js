/* ------------------------------------------------------------------
   admin.js — the newsroom desk tool.

   This is a LOCAL EDITING TOOL, not part of the public site. It has
   no backend: it loads a JSON file into the browser, lets you add,
   edit, and delete stories, and then lets you download the updated
   JSON so you (or a deploy script) can drop it into content/ on the
   real site and publish.

   Workflow each week:
     1. Open this page.
     2. Click "Load existing articles.json" and pick the current
        content/articles.json from the live site (or start blank).
     3. Add/edit/retire stories.
     4. Set the "Week of" date.
     5. Click "Download articles.json".
     6. Replace content/articles.json in the site folder with the
        downloaded file and redeploy.
------------------------------------------------------------------- */

let state = {
  articles: [],
  weekOf: new Date().toISOString().slice(0,10),
  editingId: null
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
function sortedArticles(list){
  return [...list].sort((a,b)=> new Date(b.ts) - new Date(a.ts));
}

function renderTool(){
  document.getElementById('weekOfInput').value = state.weekOf;
  document.getElementById('storyCount').textContent = state.articles.length;

  const editing = state.editingId ? state.articles.find(a=>a.id===state.editingId) : null;
  document.getElementById('formTitle').textContent = editing ? 'Edit story' : 'New story';
  document.getElementById('f-section').innerHTML = SECTIONS.map(s=>`<option value="${s.id}" ${editing&&editing.section===s.id?'selected':''}>${s.label}</option>`).join('');
  document.getElementById('f-tier').innerHTML = TIERS.map(t=>`<option value="${t.id}" ${editing&&editing.tier===t.id?'selected':''}>${t.name}</option>`).join('');
  document.getElementById('f-theory-key').innerHTML = `<option value="">No theory attached</option>` +
    Object.keys(THEORY_LIBRARY).map(k=>`<option value="${k}" ${editing&&editing.theoryKey===k?'selected':''}>${THEORY_LIBRARY[k].name}</option>`).join('');
  document.getElementById('f-headline').value = editing ? editing.headline : '';
  document.getElementById('f-dek').value = editing ? editing.dek : '';
  document.getElementById('f-body').value = editing ? editing.body : '';
  document.getElementById('f-author').value = editing ? editing.author : '';
  document.getElementById('f-theory-body').value = editing && editing.theoryBody ? editing.theoryBody : '';
  document.getElementById('submitBtn').textContent = editing ? 'Save changes' : 'Add story';
  document.getElementById('cancelBtn').style.display = editing ? 'inline-block' : 'none';

  renderDeskList();
}

function renderDeskList(){
  const el = document.getElementById('deskList');
  if(state.articles.length === 0){
    el.innerHTML = `<div class="empty-note">No stories loaded yet. Load a JSON file, or start adding stories below.</div>`;
    return;
  }
  let html = '';
  sortedArticles(state.articles).forEach(a=>{
    html += `
      <div class="desk-row">
        <div class="info">
          <p class="h">${escapeHtml(a.headline)}</p>
          <p class="m">${sectionLabel(a.section)} &middot; ${tierInfo(a.tier).name} &middot; ${fmtDate(a.ts)}${theoryInfo(a.theoryKey) ? ' &middot; Theory: '+escapeHtml(theoryInfo(a.theoryKey).name) : ''}</p>
        </div>
        <div class="actions">
          <button class="mini-btn" onclick="editStory('${a.id}')">Edit</button>
          <button class="mini-btn danger" onclick="deleteStory('${a.id}')">Delete</button>
        </div>
      </div>`;
  });
  el.innerHTML = html;
}

function submitStory(){
  const section = document.getElementById('f-section').value;
  const tier = document.getElementById('f-tier').value;
  const headline = document.getElementById('f-headline').value.trim();
  const dek = document.getElementById('f-dek').value.trim();
  const body = document.getElementById('f-body').value.trim();
  const author = document.getElementById('f-author').value.trim() || 'Staff';
  const theoryKey = document.getElementById('f-theory-key').value;
  const theoryBody = document.getElementById('f-theory-body').value.trim();
  const msg = document.getElementById('formMsg');

  if(!headline || !dek || !body){
    msg.style.color = 'var(--loss)';
    msg.textContent = 'Headline, dek, and body are all required.';
    return;
  }
  if(theoryKey && !theoryBody){
    msg.style.color = 'var(--loss)';
    msg.textContent = 'Add the reasoning text, or set the theory back to "No theory attached".';
    return;
  }

  if(state.editingId){
    const a = state.articles.find(x=>x.id===state.editingId);
    a.section=section; a.tier=tier; a.headline=headline; a.dek=dek; a.body=body; a.author=author;
    a.theoryKey=theoryKey; a.theoryBody=theoryBody;
    state.editingId = null;
  } else {
    state.articles.push({
      id: 'a' + Date.now(),
      section, tier, headline, dek, body, author, theoryKey, theoryBody,
      ts: new Date().toISOString()
    });
  }
  msg.style.color = 'var(--gain)';
  msg.textContent = 'Added to this week\'s batch below. Remember to download the JSON when you\'re done.';
  renderTool();
}

function editStory(id){
  state.editingId = id;
  renderTool();
  window.scrollTo({top:0, behavior:'smooth'});
}
function cancelEdit(){
  state.editingId = null;
  renderTool();
}
function deleteStory(id){
  state.articles = state.articles.filter(a=>a.id!==id);
  renderTool();
}

function loadJsonFile(fileInput){
  const file = fileInput.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try{
      const data = JSON.parse(e.target.result);
      state.articles = Array.isArray(data.articles) ? data.articles : [];
      state.weekOf = data.week_of || state.weekOf;
      state.editingId = null;
      renderTool();
      const msg = document.getElementById('loadMsg');
      msg.style.color = 'var(--gain)';
      msg.textContent = `Loaded ${state.articles.length} stories from ${file.name}.`;
    }catch(err){
      const msg = document.getElementById('loadMsg');
      msg.style.color = 'var(--loss)';
      msg.textContent = 'Could not parse that file as JSON: ' + err.message;
    }
  };
  reader.readAsText(file);
}

function downloadJson(){
  state.weekOf = document.getElementById('weekOfInput').value || state.weekOf;
  const out = { week_of: state.weekOf, articles: state.articles };
  const blob = new Blob([JSON.stringify(out, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'articles.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

renderTool();
