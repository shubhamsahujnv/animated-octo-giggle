
/* ================= Carbon credit calculator ================= */
(function(){
  var host=document.getElementById('view-calc');
  if(!host) return;
  var KEY='baseline_calc_v1';
  function esc(x){ return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function n(t,d){ if(t==null||isNaN(t)) return '—'; return Number(t).toLocaleString(undefined,{maximumFractionDigits:d==null?0:d}); }
  function money(v){ return '$'+Number(v).toLocaleString(undefined,{maximumFractionDigits:0}); }
  function val(id){ var e=document.getElementById(id); return e?parseFloat(e.value):NaN; }
  function num(v){ return isNaN(v)?0:v; }

  // Standard rules. buffer = non-permanence pool held back; sop = share of proceeds /
  // levies deducted at issuance; price = typical traded range per credit (USD).
  var STANDARDS=[
    {id:'ccts', name:'India CCTS offset mechanism', reg:'Bureau of Energy Efficiency',
     buffer:{nature:0.15,tech:0,removal:0.05,household:0},
     sop:0.02, price:[4,12],
     note:'Offset track under the Carbon Credit Trading Scheme. Certificates trade on Indian power exchanges; compliance entities are the main buyers.',
     types:['tech','nature','removal','household']},
    {id:'verra', name:'Verra VCS', reg:'Verra registry',
     buffer:{nature:0.20,tech:0,removal:0.10,household:0},
     sop:0.0, price:[4,20],
     note:'Largest voluntary registry. Nature based projects post to the AFOLU non-permanence buffer pool; issuance fees apply per credit.',
     types:['tech','nature','removal','household']},
    {id:'gs', name:'Gold Standard', reg:'Gold Standard Foundation',
     buffer:{nature:0.20,tech:0,removal:0.10,household:0},
     sop:0.0, price:[8,25],
     note:'Premium pricing for household and community projects with verified co-benefits. Cookstove and clean water methodologies are well established.',
     types:['tech','nature','household','removal']},
    {id:'a64', name:'Article 6.4 / PACM (UN)', reg:'UNFCCC supervisory body',
     buffer:{nature:0.20,tech:0,removal:0.10,household:0},
     sop:0.07, price:[6,20],
     note:'Successor to the CDM. 5% share of proceeds for adaptation plus 2% mandatory cancellation, taken at issuance.',
     types:['tech','nature','removal','household']},
    {id:'acr', name:'American Carbon Registry', reg:'Winrock ACR',
     buffer:{nature:0.18,tech:0,removal:0.08,household:0},
     sop:0.0, price:[5,22],
     note:'US focused registry, used for both voluntary sales and some compliance programmes.',
     types:['tech','nature','removal']},
    {id:'car', name:'Climate Action Reserve', reg:'CAR',
     buffer:{nature:0.18,tech:0,removal:0.08,household:0},
     sop:0.0, price:[5,18],
     note:'Strong livestock, landfill and agricultural nitrogen protocols in the US.',
     types:['tech','nature','removal']},
    {id:'carb', name:'California compliance offsets (CARB)', reg:'CARB',
     buffer:{nature:0.20,tech:0.02,removal:0.10,household:0},
     sop:0.0, price:[12,30],
     note:'Compliance grade credits with the highest prices, but only a short list of approved protocols and US project locations qualify.',
     types:['tech','nature','removal']}
  ];

  function projReduction(){
    try{
      var ps=JSON.parse(localStorage.getItem('baseline_projects_v1')||'[]');
      if(!Array.isArray(ps)) return 0;
      return ps.reduce(function(a,p){ return a + ((p.fin&&p.fin.reduction)||0); },0);
    }catch(e){ return 0; }
  }
  function footprint(){
    var api=window.BaselineGHG; if(!api) return null;
    try{ return api.totals(); }catch(e){ return null; }
  }

  var saved={};
  try{ var raw=localStorage.getItem(KEY); if(raw) saved=JSON.parse(raw)||{}; }catch(e){}
  function persist(){
    var o={};
    ['cc-reduction','cc-years','cc-type','cc-uncert','cc-leak','cc-price','cc-price-val','cc-std','cc-sell','cc-fwd','cc-bank','cc-retire'].forEach(function(id){
      var e=document.getElementById(id); if(e) o[id]=e.value;
    });
    try{ localStorage.setItem(KEY, JSON.stringify(o)); }catch(e){}
  }
  Object.keys(saved).forEach(function(id){ var e=document.getElementById(id); if(e && saved[id]!=='') e.value=saved[id]; });

  function compute(std){
    var annual=num(val('cc-reduction'));
    var years=Math.max(1, num(val('cc-years'))||1);
    var type=document.getElementById('cc-type').value;
    var unc=num(parseFloat(document.getElementById('cc-uncert').value));
    var leak=num(val('cc-leak'))/100;
    var gross=annual*years;
    var afterLeak=gross*(1-leak);
    var afterUnc=afterLeak*(1-unc);
    var buf=(std.buffer[type]!=null?std.buffer[type]:0);
    var afterBuf=afterUnc*(1-buf);
    var net=afterBuf*(1-std.sop);
    var eligible=std.types.indexOf(type)>-1;
    return {gross:gross, annual:annual, years:years, leak:leak, unc:unc, buffer:buf,
      bufferT:afterUnc*buf, sopT:afterBuf*std.sop, net:eligible?net:0, perYear:eligible?net/years:0, eligible:eligible};
  }
  function priceRange(std){
    if(document.getElementById('cc-price').value==='custom'){
      var v=num(val('cc-price-val'));
      return [v,v];
    }
    return std.price;
  }

  function render(){
    var out=document.getElementById('cc-results');
    var annual=num(val('cc-reduction'));
    if(!annual){
      out.innerHTML='<p class="hint" style="margin:0;">Enter an annual reduction above, or use the figure carried over from your projects, to see estimated credits.</p>';
    } else {
      out.innerHTML=STANDARDS.map(function(s){
        var r=compute(s), pr=priceRange(s);
        var lo=r.net*pr[0], hi=r.net*pr[1];
        var chip=!r.eligible?'<span class="chip unlikely">Not applicable to this activity</span>'
          :(r.net/r.gross>=0.9?'<span class="chip likely">Low deductions</span>':'<span class="chip conditional">Deductions apply</span>');
        return '<div class="oppo-card">'+
          '<div class="oppo-head"><div><div class="oppo-title">'+esc(s.name)+'</div>'+
            '<div class="oppo-tags"><span class="tag country">'+esc(s.reg)+'</span></div></div>'+chip+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:18px;margin:10px 0 6px;">'+
            '<div><div style="font-size:20px;font-weight:700;">'+n(r.net)+'</div><div class="hint" style="margin:0;">credits over '+n(r.years)+' yr</div></div>'+
            '<div><div style="font-size:20px;font-weight:700;">'+n(r.perYear)+'</div><div class="hint" style="margin:0;">credits per year</div></div>'+
            '<div><div style="font-size:20px;font-weight:700;">'+(r.eligible?(pr[0]===pr[1]?money(lo):money(lo)+' – '+money(hi)):'—')+'</div><div class="hint" style="margin:0;">indicative gross value</div></div>'+
          '</div>'+
          '<p class="hint" style="margin:0 0 6px;">From '+n(r.gross)+' t gross: less '+n(r.gross*r.leak)+' t leakage, '+n(r.gross*(1-r.leak)*r.unc)+' t data uncertainty, '+
            n(r.bufferT)+' t buffer pool ('+n(r.buffer*100,0)+'%), '+n(r.sopT)+' t levies.</p>'+
          '<p class="hint" style="margin:0;">'+esc(s.note)+'</p>'+
        '</div>';
      }).join('');
    }
    renderPath();
  }

  function renderPath(){
    var sel=document.getElementById('cc-std');
    var std=STANDARDS.filter(function(s){ return s.id===sel.value; })[0]||STANDARDS[0];
    var r=compute(std), pr=priceRange(std);
    var box=document.getElementById('cc-path');
    var sell=num(val('cc-sell')), fwd=num(val('cc-fwd')), bank=num(val('cc-bank')), ret=num(val('cc-retire'));
    var tot=sell+fwd+bank+ret;
    if(!r.net){ box.innerHTML='<p class="hint" style="margin:0;">No eligible credits to allocate yet.</p>'; return; }
    var warn = Math.abs(tot-100)>0.5 ? '<p class="hint" style="color:var(--bad-ink);margin:0 0 8px;">Allocation adds up to '+n(tot,1)+'%. Adjust to 100%.</p>' : '';
    var t=footprint();
    var mid=(pr[0]+pr[1])/2;
    var rows=[
      ['Sell on the spot market', sell, mid, 'Cash now at prevailing prices. Best for standard vintages with an active bid; expect a broker or platform fee of roughly 3–8%.'],
      ['Forward / offtake contract', fwd, mid*1.1, 'Price locked with a buyer before issuance, often at a premium for guaranteed supply, but you carry delivery risk if verification falls short.'],
      ['Bank for later vintages', bank, mid*1.15, 'Hold in the registry account. Useful where prices are trending up or a compliance obligation is coming, though older vintages can discount.'],
      ['Retire against your own footprint', ret, 0, 'Cancelled in the registry and claimed as your own reduction. No revenue, but it lowers your reported residual emissions.']
    ];
    var retT=r.net*ret/100;
    var resid = t ? Math.max(0, t.total - retT/Math.max(1,r.years)) : null;
    box.innerHTML = warn +
      '<div class="table-wrap"><table><thead><tr><th>Pathway</th><th class="num">Credits</th><th class="num">Indicative value</th><th>What it means</th></tr></thead><tbody>'+
      rows.map(function(x){
        var c=r.net*x[1]/100;
        return '<tr><td>'+esc(x[0])+'</td><td class="num">'+n(c)+'</td><td class="num">'+(x[2]?money(c*x[2]):'—')+'</td><td>'+esc(x[3])+'</td></tr>';
      }).join('')+
      '<tr><td><strong>Total</strong></td><td class="num"><strong>'+n(r.net*Math.min(tot,100)/100)+'</strong></td><td class="num"><strong>'+
        money(rows.reduce(function(a,x){ return a + r.net*x[1]/100*x[2]; },0))+'</strong></td><td>Before verification, registry and brokerage costs.</td></tr>'+
      '</tbody></table></div>'+
      (t ? '<p class="hint" style="margin:10px 0 0;">Retiring '+n(retT)+' credits covers about '+n(retT/Math.max(1,r.years))+' tCO₂e a year against a measured footprint of '+n(t.total)+' tCO₂e, leaving roughly '+n(resid)+' tCO₂e residual.</p>' : '')+
      '<p class="hint" style="margin:8px 0 0;">Next step: get the figures reviewed under <button type="button" class="linklike" data-goto="review">TGS review</button> before approaching a registry or buyer.</p>';
  }

  // populate standard picker
  var sel=document.getElementById('cc-std');
  sel.innerHTML=STANDARDS.map(function(s){ return '<option value="'+s.id+'">'+esc(s.name)+'</option>'; }).join('');
  if(saved['cc-std']) sel.value=saved['cc-std'];

  function prefill(){
    var f=document.getElementById('cc-reduction');
    var p=projReduction();
    var src=document.getElementById('cc-source');
    if(!f.value && p) f.value=p;
    src.textContent = p ? 'Carried over from your projects: '+n(p,1)+' tCO₂e a year planned.' : 'No project reductions logged yet. Add a project to carry the figure over automatically.';
  }

  host.addEventListener('input', function(e){
    if(e.target.id==='cc-price'){ document.getElementById('cc-price-custom').style.display = e.target.value==='custom' ? '' : 'none'; }
    persist(); render();
  });
  host.addEventListener('change', function(e){
    if(e.target.id==='cc-price'){ document.getElementById('cc-price-custom').style.display = e.target.value==='custom' ? '' : 'none'; }
    persist(); render();
  });

  if(document.getElementById('cc-price').value==='custom') document.getElementById('cc-price-custom').style.display='';
  prefill();
  render();
  document.querySelectorAll('[data-view="calc"]').forEach(function(b){
    b.addEventListener('click', function(){ prefill(); render(); });
  });
})();
