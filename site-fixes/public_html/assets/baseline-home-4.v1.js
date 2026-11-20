
/* ---------- Baseline calculator: reported emissions vs inventory ---------- */
(function(){
  var host = document.getElementById('view-baseline'); if(!host) return;
  var KEY = 'baseline_scope_baseline_v1';
  var CATS = [
    {s:1, k:'s1_stationary', n:'Stationary combustion (boilers, furnaces, ovens, DG sets)'},
    {s:1, k:'s1_mobile',     n:'Mobile combustion (owned or leased vehicles)'},
    {s:1, k:'s1_fugitive',   n:'Fugitive emissions (refrigerants, process gases)'},
    {s:1, k:'s1_process',    n:'Process emissions (chemical or physical reactions)'},
    {s:1, k:'s1_land',       n:'Land use, agriculture, other direct'},
    {s:2, k:'s2_loc',        n:'Purchased electricity, location based'},
    {s:2, k:'s2_mkt',        n:'Purchased electricity, market based'},
    {s:2, k:'s2_heat',       n:'Purchased steam, heat or cooling'},
    {s:3, k:'s3_1',  n:'Cat 1 Purchased goods and services'},
    {s:3, k:'s3_2',  n:'Cat 2 Capital goods'},
    {s:3, k:'s3_3',  n:'Cat 3 Fuel and energy related activities'},
    {s:3, k:'s3_4',  n:'Cat 4 Upstream transport and distribution'},
    {s:3, k:'s3_5',  n:'Cat 5 Waste generated in operations'},
    {s:3, k:'s3_6',  n:'Cat 6 Business travel'},
    {s:3, k:'s3_7',  n:'Cat 7 Employee commuting'},
    {s:3, k:'s3_8',  n:'Cat 8 Upstream leased assets'},
    {s:3, k:'s3_9',  n:'Cat 9 Downstream transport and distribution'},
    {s:3, k:'s3_10', n:'Cat 10 Processing of sold products'},
    {s:3, k:'s3_11', n:'Cat 11 Use of sold products'},
    {s:3, k:'s3_12', n:'Cat 12 End of life treatment of sold products'},
    {s:3, k:'s3_13', n:'Cat 13 Downstream leased assets'},
    {s:3, k:'s3_14', n:'Cat 14 Franchises'},
    {s:3, k:'s3_15', n:'Cat 15 Investments'}
  ];
  var st = {year:'', source:'', v:{}};
  try{ var raw=localStorage.getItem(KEY); if(raw){ var p=JSON.parse(raw); if(p&&typeof p==='object') st=Object.assign(st,p); } }catch(e){}
  if(!st.v || typeof st.v!=='object') st.v={};
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){} }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function n(v){ var x=parseFloat(v); return isFinite(x)?x:0; }
  function fmt(t){ if(!t) return '0'; var a=Math.abs(t); return t.toLocaleString(undefined,{maximumFractionDigits:a<1?3:(a<100?2:0)}); }
  function sum(sc){ var s=0; CATS.forEach(function(c){ if(c.s===sc && c.k!=='s2_mkt') s+=n(st.v[c.k]); }); return s; }
  function b(){
    var s1=sum(1), s2loc=n(st.v.s2_loc)+n(st.v.s2_heat), s2mkt=n(st.v.s2_mkt)+n(st.v.s2_heat), s3=sum(3);
    return {s1:s1, s2loc:s2loc, s2mkt:s2mkt, s3:s3, total:s1+s2loc+s3};
  }
  function inv(){
    var api = window.BaselineGHG;
    if(!api || !api.totals || (api.hasRows && !api.hasRows())) return null;
    var t = api.totals();
    if(!t) return null;
    return {s1:t[1]||0, s2loc:t[2]||0, s2mkt:(t.market==null?null:t.market-(t[1]||0)-(t[3]||0)), s3:t[3]||0, total:t.total||0,
      cats:(api.catTotals?api.catTotals():{})};
  }

  function form(){
    var out='';
    [1,2,3].forEach(function(sc){
      out += '<div class="fgroup bl-group"><div class="fgroup-title">'+(sc===1?'Scope 1 · direct emissions':sc===2?'Scope 2 · imported energy':'Scope 3 · value chain')+'</div>'+
        '<div class="bl-grid">'+
        CATS.filter(function(c){ return c.s===sc; }).map(function(c){
          return '<label class="bl-cell"><span>'+esc(c.n)+'</span>'+
            '<input type="number" step="any" min="0" inputmode="decimal" data-k="'+c.k+'" value="'+esc(st.v[c.k]==null?'':st.v[c.k])+'" placeholder="0"><em>tCO₂e</em></label>';
        }).join('')+
        '</div></div>';
    });
    document.getElementById('bl-form').innerHTML = out;
  }

  function delta(base, invv){
    if(invv==null) return '<span class="bl-pill">not reported in inventory</span>';
    var d = base - invv, pct = invv ? (d/invv)*100 : (base?100:0);
    var cls = Math.abs(pct)<5 ? 'ok' : (Math.abs(pct)<20 ? 'warn' : 'bad');
    return '<span class="bl-pill '+cls+'">'+(d>=0?'+':'')+fmt(d)+' t · '+(d>=0?'+':'')+pct.toFixed(1)+'%</span>';
  }

  function render(){
    var base=b(), iv=inv();
    document.getElementById('bl-stats').innerHTML =
      '<div class="stat brand"><div class="n">'+fmt(base.total)+'</div><div class="l">Reported baseline tCO₂e (Scope 1+2 location+3)</div></div>'+
      '<div class="stat"><div class="n">'+(iv?fmt(iv.total):'—')+'</div><div class="l">Inventory tCO₂e from activity data</div></div>'+
      '<div class="stat '+(iv && Math.abs(base.total-iv.total) > 0.05*Math.max(iv.total,1) ? 'warn':'good')+'"><div class="n">'+(iv?((base.total-iv.total>=0?'+':'')+fmt(base.total-iv.total)):'—')+'</div><div class="l">Gap to close before assurance</div></div>'+
      '<div class="stat"><div class="n">'+fmt(base.s2mkt)+'</div><div class="l">Scope 2 market based tCO₂e</div></div>';

    var rows = [
      ['Scope 1 direct', base.s1, iv?iv.s1:null],
      ['Scope 2 location based', base.s2loc, iv?iv.s2loc:null],
      ['Scope 2 market based', base.s2mkt, iv?iv.s2mkt:null],
      ['Scope 3 value chain', base.s3, iv?iv.s3:null],
      ['Total (location based)', base.total, iv?iv.total:null]
    ];
    var max = Math.max.apply(null, rows.slice(0,4).map(function(r){ return Math.max(r[1], r[2]||0); }).concat([1]));
    document.getElementById('bl-compare').innerHTML =
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Scope</th><th class="num">Your baseline</th><th class="num">Inventory</th><th>Difference</th><th>Share</th></tr></thead><tbody>'+
      rows.map(function(r,i){
        var w = Math.min(100, (r[1]/max)*100), wi = r[2]==null?0:Math.min(100,(r[2]/max)*100);
        return '<tr'+(i===4?' class="bl-total"':'')+'><td>'+esc(r[0])+'</td><td class="num">'+fmt(r[1])+'</td><td class="num">'+(r[2]==null?'—':fmt(r[2]))+'</td><td>'+delta(r[1], r[2])+'</td>'+
          '<td><div class="bl-bar"><i style="width:'+w+'%"></i><u style="width:'+wi+'%"></u></div></td></tr>';
      }).join('')+
      '</tbody></table></div>'+
      '<p class="hint" style="margin-top:10px;">Solid bar is your reported baseline, outline bar is what the inventory calculates from activity data. A gap above 5% usually means missing activity lines, a different boundary, or an out of date emission factor. Resolve it before submitting the annual report for TGS review.</p>';
  }

  host.addEventListener('input', function(e){
    var t=e.target;
    if(t.id==='bl-year'){ st.year=t.value; save(); return; }
    if(t.id==='bl-source'){ st.source=t.value; save(); return; }
    var k=t.getAttribute('data-k'); if(!k) return;
    st.v[k]=t.value; save(); render();
  });

  function importInventory(){
    var iv=inv(); if(!iv) return false;
    var c = iv.cats||{};
    CATS.forEach(function(cat){
      var v = c[cat.k];
      st.v[cat.k] = (v && Math.abs(v)>0.0005) ? String(v.toFixed(3)) : '';
    });
    if(!st.v.s2_mkt && iv.s2mkt!=null && iv.s2mkt) st.v.s2_mkt = String(iv.s2mkt.toFixed(3));
    if(!st.source) st.source = 'Imported from the GHG inventory on this device';
    if(!st.year && window.BaselineGHG && window.BaselineGHG.state){
      var gs = window.BaselineGHG.state(); if(gs && gs.year) st.year = gs.year;
    }
    save(); form(); fill(); render();
    return true;
  }
  document.getElementById('bl-copy').addEventListener('click', function(){
    if(!importInventory()) alert('Add activity data in the GHG inventory first, then bring it across here.');
  });
  function anyEntered(){ return CATS.some(function(c){ return String(st.v[c.k]||'')!==''; }); }
  document.querySelectorAll('[data-view="baseline"]').forEach(function(b){
    b.addEventListener('click', function(){
      if(!anyEntered()) importInventory();
      setTimeout(render, 0);
    });
  });
  document.getElementById('bl-clear').addEventListener('click', function(){
    if(!confirm('Clear the reported baseline?')) return;
    st={year:'',source:'',v:{}}; save(); form(); fill(); render();
  });

  function fill(){
    document.getElementById('bl-year').value = st.year||'';
    document.getElementById('bl-source').value = st.source||'';
  }

  /* ---- Region factor pack ---- */
  var PACK_HINT = {
    GL:'UK DESNZ conversion factors with global defaults. Units in kWh, litres, tonnes and km.',
    US:'EPA Emission Factors Hub 2025 with eGRID subregional electricity. Units in therms, gallons, short tons and miles.',
    IN:'Indian fuel values with CEA grid factors. Units in SCM, litres, kg, tonnes and km.'
  };
  var packSel = document.getElementById('bl-pack'), packHint = document.getElementById('bl-pack-hint');
  function syncPack(){
    var code = (window.BaselineGHG && window.BaselineGHG.region) ? window.BaselineGHG.region() : 'GL';
    if(packSel) packSel.value = code;
    if(packHint) packHint.textContent = PACK_HINT[code] || '';
  }
  if(packSel) packSel.addEventListener('change', function(){
    if(window.BaselineGHG && window.BaselineGHG.setRegion) window.BaselineGHG.setRegion(packSel.value);
    syncPack(); render();
  });
  document.addEventListener('baseline-region', function(){ syncPack(); render(); });

  /* ---- Industry reference points ---- */
  // Indicative intensity ranges (tCO2e per USD 1M revenue), compiled from public
  // CDP disclosures and sector benchmark studies. Orientation only, not a target.
  var BENCH = {
    auto:   {n:'Automotive parts and components', lo:120, hi:400, note:'Machining and stamping sit low; casting, forging and heat treatment push toward the top.'},
    metals: {n:'Metals, foundry and fabrication', lo:300, hi:900, note:'Melting and heat treatment dominate. Gas-fired melting is materially lower than coal or coke.'},
    plating:{n:'Electroplating and surface finishing', lo:250, hi:700, note:'Electrically intensive (rectifiers, bath heating, ventilation) plus chemical and wastewater lines.'},
    pharma: {n:'Pharmaceutical manufacturing', lo:150, hi:500, note:'HVAC and cleanroom energy, steam and solvents drive the range; formulation sits below API synthesis.'},
    lab:    {n:'Laboratories and R&D facilities', lo:100, hi:350, note:'Per-revenue figures vary widely for labs; treat this as a rough orientation only.'},
    mfg:    {n:'General manufacturing', lo:150, hi:450, note:'A broad cross-industry band for orientation when no closer fit exists.'}
  };
  var CUR_TO_USDM = {'USD million':1, 'USD thousand':0.001, 'INR crore':10/83, 'INR million':1/83, 'EUR million':1.08, 'GBP million':1.27};
  var benchSel = document.getElementById('bl-sector'), benchOut = document.getElementById('bl-bench');
  function renderBench(){
    if(!benchOut) return;
    var k = st.sector || (benchSel ? benchSel.value : '');
    var bm = BENCH[k];
    if(!bm){ benchOut.innerHTML = ''; return; }
    var inrLo = Math.round(bm.lo*0.12), inrHi = Math.round(bm.hi*0.12);
    var html = '<div class="fgroup" style="margin-bottom:14px;"><div class="fgroup-title">'+esc(bm.n)+'</div>'+
      '<div class="stats">'+
      '<div class="stat"><div class="n">'+bm.lo+' to '+bm.hi+'</div><div class="l">tCO₂e per USD 1M revenue (typical range)</div></div>'+
      '<div class="stat"><div class="n">'+inrLo+' to '+inrHi+'</div><div class="l">tCO₂e per INR crore revenue (approx.)</div></div>';
    var api = window.BaselineGHG, mine = null, cur = '';
    if(api && api.totals && api.intensity && api.hasRows && api.hasRows()){
      var it = api.intensity();
      var f = CUR_TO_USDM[it.cur];
      if(it.rev && f){
        var usdM = it.rev * f;
        mine = usdM > 0 ? api.totals().total / usdM : null;
        cur = it.cur;
      }
    }
    if(mine != null && isFinite(mine)){
      var pos = mine < bm.lo ? 'below the typical range. Check the boundary: low intensity often means uncounted lines, especially purchased goods or fugitive emissions.'
        : mine > bm.hi ? 'above the typical range. That points to energy-intensive processes, an out of date factor, or strong reduction and credit potential.'
        : 'within the typical range for this industry.';
      var cls = mine < bm.lo ? 'warn' : (mine > bm.hi ? 'warn' : 'good');
      html += '<div class="stat '+cls+'"><div class="n">'+fmt(Math.round(mine))+'</div><div class="l">Your inventory, tCO₂e per USD 1M (from '+esc(cur)+' entry)</div></div>';
      html += '</div><p class="hint" style="margin-top:8px;">Your calculated intensity is '+pos+'</p>';
    } else {
      html += '</div><p class="hint" style="margin-top:8px;">Enter activity data plus annual revenue and a revenue unit in the GHG inventory to compare your own intensity against this range.</p>';
    }
    html += '<p class="hint" style="margin-top:6px;">'+esc(bm.note)+' Ranges are indicative, from public disclosures and sector studies. Use them to sense check your baseline, not as a compliance figure.</p></div>';
    benchOut.innerHTML = html;
  }
  if(benchSel) benchSel.addEventListener('change', function(){ st.sector = benchSel.value; save(); renderBench(); });
  if(benchSel && st.sector) benchSel.value = st.sector;
  document.addEventListener('baseline-region', renderBench);
  renderBench();
  document.addEventListener('baseline-ghg-updated', renderBench);

  /* ---- AI insights ---- */
  var aiBtn = document.getElementById('bl-ai'), aiOut = document.getElementById('bl-ai-out');
  if(aiBtn) aiBtn.addEventListener('click', function(){
    var base=b(), iv=inv();
    if(!base.total && !iv){ alert('Enter your baseline numbers first.'); return; }
    var cats = CATS.filter(function(c){ return n(st.v[c.k])>0; })
      .map(function(c){ return {name:c.n, scope:c.s, tco2e:n(st.v[c.k])}; });
    aiOut.style.display=''; aiOut.textContent='Thinking…'; aiBtn.disabled=true;
    fetch('/api/public/baseline-insights', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({
        region: (window.BaselineGHG && window.BaselineGHG.region) ? window.BaselineGHG.region() : 'GL',
        year: st.year||'', baseline: base, inventory: iv, categories: cats
      })
    }).then(function(res){
      if(!res.ok || !res.body) return res.text().then(function(t){ throw new Error(t||('Error '+res.status)); });
      var reader = res.body.getReader(), dec = new TextDecoder(); aiOut.textContent='';
      (function pump(){
        reader.read().then(function(r){
          if(r.done){ aiBtn.disabled=false; return; }
          var chunk = dec.decode(r.value, {stream:true});
          var end = chunk.indexOf('\u0000');
          if(end >= 0){
            aiOut.textContent += chunk.slice(0, end);
            aiBtn.disabled=false;
            try{ reader.cancel(); }catch(e){}
            return;
          }
          aiOut.textContent += chunk;
          pump();
        }, function(){ aiBtn.disabled=false; });
      })();

    }).catch(function(err){
      aiOut.textContent = 'Could not generate insights right now. '+(err && err.message ? err.message : '');
      aiBtn.disabled=false;
    });
  });

  form(); fill(); syncPack(); render();
  document.querySelectorAll('[data-view="baseline"]').forEach(function(bt){
    bt.addEventListener('click', function(){ syncPack(); render(); });
  });
})();


/* ---------- DOCUMENTS ---------- */
(function(){
  var KEY='baseline_documents_v1', MAX_INLINE=2*1024*1024;
  var TYPES=[
    {k:'utility',l:'Utility bills',h:'Electricity, gas, water and fuel invoices for every site.'},
    {k:'kpi',l:"KPIs and performance data",h:'Production volumes, floor area, headcount, revenue: whatever your intensity is measured against.'},
    {k:'goals',l:'Goals and targets',h:'Approved targets, reduction roadmaps, net zero commitments, policies.'},
    {k:'supply',l:'Supply chain documents',h:'Supplier lists, purchase and freight records, supplier emissions statements.'},
    {k:'waste',l:'Waste and water records',h:'Waste manifests, recycling certificates, water meter readings.'},
    {k:'permits',l:'Permits and consents',h:'Environmental consents, licences, regulator monitoring reports.'},
    {k:'other',l:'Something else',h:'Anything else that supports your numbers.'}
  ];
  var STEPS=[
    ['1','Pick the document type','So each file lands against the right part of your footprint.'],
    ['2','Say which period it covers','A year, a quarter or a month keeps bills matched to the inventory.'],
    ['3','Choose your files','PDF, images, spreadsheets. Several at a time.'],
    ['4','Add and review','The list below shows what is collected and what is still missing.']
  ];
  var list=[];
  try{ list=JSON.parse(localStorage.getItem(KEY)||'[]')||[]; }catch(e){ list=[]; }
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(list)); }catch(e){ msg('Saved without the file contents: this browser is out of storage space.'); } }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function size(b){ return b<1024? b+' B' : b<1048576? Math.round(b/1024)+' KB' : (b/1048576).toFixed(1)+' MB'; }
  function msg(t){ var e=document.getElementById('doc-msg'); if(e){ e.textContent=t||''; } }
  function label(k){ for(var i=0;i<TYPES.length;i++){ if(TYPES[i].k===k) return TYPES[i].l; } return k; }

  var sel=document.getElementById('doc-type');
  if(!sel) return;
  sel.innerHTML=TYPES.map(function(t){ return '<option value="'+t.k+'">'+esc(t.l)+'</option>'; }).join('');
  function help(){
    var t=TYPES.filter(function(x){ return x.k===sel.value; })[0];
    document.getElementById('doc-help').textContent=t?t.h:'';
  }
  sel.addEventListener('change', help); help();

  function steps(){
    document.getElementById('docs-steps').innerHTML=STEPS.map(function(s){
      return '<div class="stat"><div class="n">'+s[0]+'</div><div class="l"><strong>'+esc(s[1])+'</strong><br>'+esc(s[2])+'</div></div>';
    }).join('');
  }
  function checklist(){
    document.getElementById('docs-checklist').innerHTML=TYPES.map(function(t){
      var n=list.filter(function(d){ return d.type===t.k; }).length;
      return '<button class="btn small'+(n?' primary':'')+'" data-doctype="'+t.k+'">'+(n?'✓ ':'+ ')+esc(t.l)+(n?' ('+n+')':'')+'</button>';
    }).join('');
    document.querySelectorAll('[data-doctype]').forEach(function(b){
      b.addEventListener('click', function(){ sel.value=b.getAttribute('data-doctype'); help(); sel.focus(); });
    });
  }
  function table(){
    var el=document.getElementById('docs-table');
    if(!list.length){ el.innerHTML='<p class="hint">No documents yet. Start with a recent utility bill.</p>'; return; }
    var rows=list.map(function(d,i){
      return '<tr><td>'+esc(d.name)+(d.note?'<div class="hint">'+esc(d.note)+'</div>':'')+'</td><td>'+esc(label(d.type))+'</td><td>'+esc(d.period||'—')+'</td><td>'+size(d.size||0)+'</td><td>'+esc(d.added||'')+'</td>'+
        '<td style="text-align:right;white-space:nowrap;">'+(d.data?'<button class="btn small" data-docopen="'+i+'">Open</button> ':'')+'<button class="btn small danger" data-docdel="'+i+'" aria-label="Remove document">Remove</button></td></tr>';
    }).join('');
    el.innerHTML='<div class="table-wrap"><table class="table"><thead><tr><th>Document</th><th>Type</th><th>Period</th><th>Size</th><th>Added</th><th></th></tr></thead><tbody>'+rows+'</tbody></table></div>';
    el.querySelectorAll('[data-docopen]').forEach(function(b){
      b.addEventListener('click', function(){
        var d=list[+b.getAttribute('data-docopen')];
        var w=window.open(); if(w) w.document.write('<iframe src="'+d.data+'" style="border:0;position:fixed;inset:0;width:100%;height:100%"></iframe>');
      });
    });
    el.querySelectorAll('[data-docdel]').forEach(function(b){
      b.addEventListener('click', function(){
        if(!confirm('Remove this document from the list?')) return;
        list.splice(+b.getAttribute('data-docdel'),1); save(); render();
      });
    });
  }
  function render(){ steps(); checklist(); table(); }

  document.getElementById('doc-add').addEventListener('click', function(){
    var input=document.getElementById('doc-file');
    var files=input.files? Array.prototype.slice.call(input.files):[];
    if(!files.length){ msg('Choose at least one file first.'); return; }
    var period=document.getElementById('doc-period').value.trim();
    var note=document.getElementById('doc-note').value.trim();
    var type=sel.value, pending=files.length;
    msg('Adding…');
    files.forEach(function(f){
      function push(data){
        list.unshift({name:f.name,type:type,period:period,note:note,size:f.size,added:new Date().toISOString().slice(0,10),data:data||''});
        if(--pending===0){ save(); render(); input.value=''; document.getElementById('doc-note').value=''; msg(files.length+' file'+(files.length>1?'s':'')+' added.'); }
      }
      if(f.size<=MAX_INLINE){
        var r=new FileReader();
        r.onload=function(){ push(r.result); };
        r.onerror=function(){ push(''); };
        r.readAsDataURL(f);
      } else { push(''); }
    });
  });

  document.getElementById('docs-clear').addEventListener('click', function(){
    if(!confirm('Clear the whole document list?')) return;
    list=[]; save(); render(); msg('');
  });

  document.getElementById('docs-export').addEventListener('click', function(){
    var csv=[['Document','Type','Period','Size (bytes)','Added','Note']].concat(list.map(function(d){
      return [d.name,label(d.type),d.period||'',d.size||0,d.added||'',d.note||''];
    })).map(function(r){ return r.map(function(c){ return '"'+String(c).replace(/"/g,'""')+'"'; }).join(','); }).join('\n');
    var a=document.createElement('a');
    a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
    a.download='baseline-documents.csv'; a.click(); URL.revokeObjectURL(a.href);
  });

  render();
})();
