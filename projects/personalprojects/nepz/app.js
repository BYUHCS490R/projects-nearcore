/* mini-notion: browser-only prototype
   - stores data in localStorage (pages, databases)
   - minimal block editor using contenteditable
   - simple AI integration via POST /api/ai (server proxy recommended)
*/

const STORAGE_KEY = 'mini_notion_v1';

let state = {
  pages: {},      // id -> {id,title,blocks: [{type,content}]}
  dbs: {},        // id -> {id,name,columns:[{key,label}],rows:[{id, ...}]}
  order: []       // list of ids with prefix 'p:' or 'd:' to show in sidebar
};

// ---------- util ----------
const uid = (n=6)=>Math.random().toString(36).slice(2,2+n);
const save = ()=>localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
const load = ()=>{
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw) state = JSON.parse(raw);
};
const el = (sel, root=document)=>root.querySelector(sel);
const create = (tag, cls='', text='')=>{ const e=document.createElement(tag); e.className=cls; e.textContent=text; return e; };

// ---------- rendering ----------
function renderList(filter=''){
  const container = el('#list');
  container.innerHTML = '';
  const q = filter.trim().toLowerCase();
  state.order.forEach(id=>{
    const isPage = id.startsWith('p:');
    const obj = isPage ? state.pages[id.slice(2)] : state.dbs[id.slice(2)];
    if(!obj) return;
    const title = isPage ? obj.title || 'Untitled page' : obj.name || 'Untitled DB';
    if(q && !(title.toLowerCase().includes(q))) return;
    const item = create('div','item');
    const type = create('span','type', isPage ? 'Page' : 'DB');
    const t = create('span','title', title);
    item.appendChild(type); item.appendChild(t);
    item.addEventListener('click', ()=> openItem(id));
    container.appendChild(item);
  });
}

function openItem(listId){
  const canvas = el('#canvas');
  canvas.innerHTML = '';
  if(listId.startsWith('p:')){
    const pid = listId.slice(2);
    const page = state.pages[pid];
    renderPage(page);
  } else {
    const did = listId.slice(2);
    const db = state.dbs[did];
    renderDB(db);
  }
}

function renderPage(page){
  const tpl = el('#page-template').content.cloneNode(true);
  const pageEl = tpl.querySelector('.page');
  const titleInput = tpl.querySelector('.page-title-input');
  const blocksContainer = tpl.querySelector('.blocks');

  titleInput.value = page.title || '';
  function syncTitle(){ page.title = titleInput.value || 'Untitled'; save(); renderList(el('#search').value); }
  titleInput.addEventListener('change', syncTitle);
  tpl.querySelector('.save-page').addEventListener('click', ()=>{ syncTitle(); alert('Saved'); });
  tpl.querySelector('.delete-page').addEventListener('click', ()=>{
    if(!confirm('Delete page?')) return;
    delete state.pages[page.id];
    state.order = state.order.filter(x=>x!=='p:'+page.id);
    save(); renderList(); el('#canvas').innerHTML = '<div class="empty">Page deleted</div>'; el('#page-title').textContent='Select or create a page';
  });

  function makeBlockEl(block){
    const b = create('div','block');
    if(block.type === 'todo'){
      const cb = document.createElement('input'); cb.type='checkbox'; cb.checked = !!block.checked;
      cb.addEventListener('change', ()=>{ block.checked = cb.checked; save(); });
      b.appendChild(cb);
    }
    const content = document.createElement(block.type==='h1' ? 'h1' : 'div');
    content.className = 'block-content';
    content.contentEditable = true;
    content.innerHTML = block.content || '';
    content.addEventListener('input', ()=>{ block.content = content.innerHTML; save(); });
    b.appendChild(content);
    return b;
  }

  blocksContainer.innerHTML = '';
  page.blocks.forEach(b=>{
    blocksContainer.appendChild(makeBlockEl(b));
  });

  tpl.querySelector('.add-text').addEventListener('click', ()=>{
    const nb = {type:'text',content:'New text...'};
    page.blocks.push(nb); save(); blocksContainer.appendChild(makeBlockEl(nb));
  });
  tpl.querySelector('.add-h1').addEventListener('click', ()=>{
    const nb = {type:'h1',content:'Heading'};
    page.blocks.push(nb); save(); blocksContainer.appendChild(makeBlockEl(nb));
  });
  tpl.querySelector('.add-check').addEventListener('click', ()=>{
    const nb = {type:'todo',content:'To-do item',checked:false};
    page.blocks.push(nb); save(); blocksContainer.appendChild(makeBlockEl(nb));
  });

  el('#canvas').appendChild(pageEl);
  el('#page-title').textContent = page.title || 'Untitled';
}

function renderDB(db){
  const tpl = el('#db-template').content.cloneNode(true);
  const dbEl = tpl.querySelector('.db');
  const nameInput = tpl.querySelector('.db-name-input');
  const headersRow = tpl.querySelector('.db-headers');
  const rowsBody = tpl.querySelector('.db-rows');

  nameInput.value = db.name || '';
  nameInput.addEventListener('change', ()=>{ db.name = nameInput.value || 'Untitled DB'; save(); renderList(el('#search').value) });

  tpl.querySelector('.save-db').addEventListener('click', ()=>{ db.name = nameInput.value || 'Untitled DB'; save(); alert('DB saved'); });
  tpl.querySelector('.delete-db').addEventListener('click', ()=>{
    if(!confirm('Delete database?')) return;
    delete state.dbs[db.id];
    state.order = state.order.filter(x=>x!=='d:'+db.id);
    save(); renderList(); el('#canvas').innerHTML = '<div class="empty">DB deleted</div>'; el('#page-title').textContent='Select or create a page';
  });

  function drawTable(){
    headersRow.innerHTML = '';
    rowsBody.innerHTML = '';
    db.columns.forEach(c=>{
      const th = document.createElement('th');
      th.textContent = c.label;
      headersRow.appendChild(th);
    });
    db.rows.forEach(r=>{
      const tr = document.createElement('tr');
      db.columns.forEach(c=>{
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.value = r[c.key] ?? '';
        input.addEventListener('change', ()=>{ r[c.key] = input.value; save(); });
        td.appendChild(input);
        tr.appendChild(td);
      });
      rowsBody.appendChild(tr);
    });
  }

  tpl.querySelector('.add-row').addEventListener('click', ()=>{
    const row = {id: uid(8)};
    db.columns.forEach(c=>row[c.key]='');
    db.rows.push(row); save(); drawTable();
  });

  tpl.querySelector('.export-db').addEventListener('click', ()=>{
    const data = JSON.stringify(db, null, 2);
    const w = window.open();
    w.document.body.innerText = data;
  });

  drawTable();
  el('#canvas').appendChild(dbEl);
  el('#page-title').textContent = db.name || 'Database';
}

// ---------- actions ----------
function createPage(title='Untitled'){
  const id = uid(8);
  state.pages[id] = {id, title, blocks: [{type:'text',content:'Start writing...'}]};
  state.order.unshift('p:'+id);
  save(); renderList(); openItem('p:'+id);
}
function createDB(name='Untitled DB'){
  const id = uid(8);
  // default two columns
  const columns = [{key:'col1',label:'Column 1'},{key:'col2',label:'Column 2'}];
  state.dbs[id] = {id,name,columns,rows:[]};
  state.order.unshift('d:'+id);
  save(); renderList(); openItem('d:'+id);
}

// ---------- AI integration ----------
async function askAI(prompt){
  // gather current page/db context (best-effort)
  const ctx = getCurrentContext();
  const payload = {prompt, context:ctx};
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    if(!res.ok){
      const t = await res.text();
      throw new Error('AI proxy error: '+t);
    }
    const data = await res.json();
    return data;
  } catch(err){
    console.error(err);
    throw err;
  }
}

function getCurrentContext(){
  // return text of current open page or db for AI to use as context
  const title = el('#page-title')?.textContent || '';
  const canvas = el('#canvas');
  if(!canvas) return {title, text:''};
  // aggregate text content
  const text = canvas.innerText || '';
  return {title, text};
}

// ---------- init ----------
function init(){
  load();
  // if empty, create a demo page
  if(!state.order || state.order.length===0){
    createPage('Welcome');
    createDB('Contacts');
    // populate demo db
    const dbId = Object.keys(state.dbs)[0];
    state.dbs[dbId].rows.push({id:uid(6), col1:'Alice', col2:'alice@example.com'});
    save();
  }

  renderList();

  // wire UI
  el('#new-page').addEventListener('click', ()=>createPage('New Page'));
  el('#new-db').addEventListener('click', ()=>createDB('New DB'));
  el('#search').addEventListener('input', (e)=>renderList(e.target.value));
  el('#ai-ask').addEventListener('click', async ()=>{
    const prompt = el('#ai-prompt').value.trim();
    if(!prompt) return alert('Type a prompt for the AI');
    el('#ai-ask').disabled = true;
    el('#ai-response').textContent = 'Thinking...';
    el('#ai-modal').classList.remove('hidden');
    try{
      const reply = await askAI(prompt);
      // reply expected: {text: "..."}
      const text = reply.text || JSON.stringify(reply, null, 2);
      el('#ai-response').textContent = text;
    }catch(err){
      el('#ai-response').textContent = 'Error: ' + err.message;
    }finally{
      el('#ai-ask').disabled = false;
    }
  });

  el('#ai-close').addEventListener('click', ()=>el('#ai-modal').classList.add('hidden'));

  // open first item by default
  const first = state.order[0];
  if(first) openItem(first);
}

document.addEventListener('DOMContentLoaded', init);