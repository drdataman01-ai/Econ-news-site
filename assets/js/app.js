function goHome(){ state.view='home'; state.sectionId=null; state.articleId=null; render(); window.scrollTo({top:0}); }
function goView(v){ state.view=v; state.articleId=null; if(v!=='section') state.sectionId=null; render(); window.scrollTo({top:0}); }
function goSection(id){ state.view='section'; state.sectionId=id; state.articleId=null; render(); window.scrollTo({top:0}); }
function goArticle(id){ state.view='article'; state.articleId=id; state.theoryOpen=false; render(); window.scrollTo({top:0}); }
function toggleTheory(){ state.theoryOpen = !state.theoryOpen; render(); }
function toggleClassroomTheory(key){ state.classroomOpen = (state.classroomOpen === key ? null : key); render(); }
async function setTier(id){
  state.membership = id;
  await persistMembership();
  render();
}

document.getElementById('clockLine').textContent = 'Markets desk \u00b7 ' + new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric', year:'numeric'});
loadData();
