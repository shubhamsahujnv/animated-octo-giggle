
/* ---------- Contact us form ---------- */
(function(){
  var KEY = 'baseline_contact_v1';
  var form = document.getElementById('contact-form');
  var listEl = document.getElementById('contact-list');
  var savedEl = document.getElementById('contact-saved');
  if(!form) return;
  function load(){
    try{ var raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : []; }catch(e){ return []; }
  }
  function save(list){
    try{ localStorage.setItem(KEY, JSON.stringify(list.slice(-10))); }catch(e){}
  }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function render(){
    var list = load();
    if(!list.length){ savedEl.style.display='none'; return; }
    savedEl.style.display='';
    listEl.innerHTML = list.slice().reverse().map(function(m){
      return '<div style="padding:10px 0;border-top:1px solid var(--border);">'+
        '<div><strong>'+esc(m.name)+'</strong> · '+esc(m.company)+' · '+esc(m.email)+'</div>'+
        '<div class="hint" style="margin:2px 0 0;">'+esc(m.ts)+'</div>'+
        '<p style="margin:6px 0 0;white-space:pre-wrap;">'+esc(m.message)+'</p></div>';
    }).join('');
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('contact-name').value.trim();
    var email = document.getElementById('contact-email').value.trim();
    var company = document.getElementById('contact-company').value.trim();
    var sector = document.getElementById('contact-sector').value.trim();
    var message = document.getElementById('contact-message').value.trim();
    if(!name || !email || !company || !message){
      document.getElementById('contact-error').style.display='';
      return;
    }
    document.getElementById('contact-error').style.display='none';
    var list = load();
    list.push({ name:name, email:email, company:company, sector:sector, message:message, ts:new Date().toLocaleString() });
    save(list);
    form.reset();
    document.getElementById('contact-success').style.display='';
    setTimeout(function(){ document.getElementById('contact-success').style.display='none'; }, 5000);
    render();
  });
  render();
})();
