import{i as e,n as t,t as n}from"./jsx-runtime-ByaQ0wya.js";import{a as r,c as i,n as a,o,r as s,u as c}from"./use-netlow-L36QXyoH.js";import{d as l,h as u,n as d,p as f,r as p,u as m}from"./netlow-Bw23qW0W.js";var h=e(t()),g=n(),_=[`Activities awaiting approval or rejected are excluded from all reported figures.`,`Self-reported activities without verifiable evidence are reported as estimated avoided emissions and are never combined with measured reductions.`,`Water conservation is reported as an environmental KPI; associated supply and treatment emissions are listed separately.`,`Net-Low points are an engagement reward. They are not carbon credits, are not tradable, and no verified reduction is assigned to an individual employee.`],v=[`Baseline emissions use the employee's stated usual activity for the same distance, weight, energy or volume.`,`Reductions are the difference between baseline and actual emissions, floored at zero.`,`Emission factors are captured as an immutable snapshot on each submission, including source, geography, year and version.`,`Duplicate submissions are blocked by a deterministic activity fingerprint per employee and date.`];function y(){let{data:e}=i(),t=a(e),{data:n=[]}=r(t),{data:y=[]}=c(),{data:S=[]}=o(),{data:C=[]}=s(),[w,T]=(0,h.useState)(e?.company?.reporting_period_start??``),[E,D]=(0,h.useState)(e?.company?.reporting_period_end??``);if(!t)return(0,g.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Reviewers and administrators only.`});let O=n.filter(e=>{let t=String(e.activity_date);return(!w||t>=w)&&(!E||t<=E)}).filter(e=>e.status===`approved`),k=O.filter(e=>e.reduction_type===`measured`),A=O.filter(e=>e.reduction_type===`estimated`),j=e=>e.reduce((e,t)=>e+Number(t.reduction_kg??0),0),M=e=>y.find(t=>t.id===e)?.full_name||`Employee`,N=e=>y.find(t=>t.id===e)?.department||``,P=O.map(e=>{let t=e.factor_snapshot??{};return{employee:M(e.user_id),department:N(e.user_id),date:e.activity_date,category:p.find(t=>t.key===e.category)?.label??e.category,treatment:`${e.scope} ${e.ghg_category}`,location:e.location??``,frequency:e.frequency,occurrences:e.occurrences,baseline_activity:e.baseline_mode??``,alternative_activity:e.alternative_mode??`avoided`,quantity:e.quantity,unit:e.unit,baseline_kgco2e:e.baseline_kg,actual_kgco2e:e.actual_kg,reduction_kgco2e:e.reduction_kg,reduction_type:e.reduction_type,factor_source:t.baseline?.source??``,factor_geography:t.baseline?.geography??``,factor_year:t.baseline?.year??``,factor_version:t.baseline?.version??``,calc_version:e.calc_version,evidence_type:e.evidence_type,evidence_file:e.evidence_path?`attached`:`none`,evidence_note:e.evidence_note??``,source_system:e.source_system??``,status:e.status,reviewed_at:e.reviewed_at??``,submission_id:e.id}}),F=C.map(e=>({timestamp:e.created_at,actor:e.actor_name??``,entity:e.entity,entity_id:e.entity_id??``,action:e.action,detail:JSON.stringify(e.detail??{})})),I=S.map(e=>({activity_key:e.activity_key,label:e.label,unit:e.unit,kg_co2e_per_unit:e.kg_co2e_per_unit,scope:e.scope,ghg_category:e.ghg_category,source:e.source,geography:e.geography,year:e.year,version:e.version})),L=O.filter(e=>e.evidence_path||e.evidence_note).map(e=>({submission_id:e.id,employee:M(e.user_id),date:e.activity_date,evidence_type:e.evidence_type,file_reference:e.evidence_path??``,note:e.evidence_note??``})),R=`netlow-${e?.company?.slug??`company`}-${w||`start`}-${E||`end`}`;function z(){m(`${R}-activity-data.csv`,u(P),`text/csv;charset=utf-8`)}function B(){let t=(e,t)=>{if(!t.length)return`<h3>${e}</h3><p>No rows.</p>`;let n=Object.keys(t[0]);return`<h3>${e}</h3><table border="1"><tr>${n.map(e=>`<th>${e}</th>`).join(``)}</tr>${t.map(e=>`<tr>${n.map(t=>`<td>${b(String(e[t]??``))}</td>`).join(``)}</tr>`).join(``)}</table>`},n=`<html><head><meta charset="utf-8"></head><body>
      <h2>Net-Low report — ${b(e?.company?.name??``)}</h2>
      <p>Reporting period ${w} to ${E} · calculation ${d}</p>
      ${t(`Activity data`,P)}
      ${t(`Emission factors`,I)}
      ${t(`Evidence index`,L)}
      ${t(`Approval and audit history`,F)}
    </body></html>`;m(`${R}.xls`,n,`application/vnd.ms-excel`)}function V(){let e=window.open(``,`_blank`);e&&(e.document.write(H()),e.document.close(),e.focus(),setTimeout(()=>e.print(),400))}function H(){let t=(e,t=500)=>{if(!e.length)return`<p>No rows.</p>`;let n=Object.keys(e[0]);return`<table><thead><tr>${n.map(e=>`<th>${e.replace(/_/g,` `)}</th>`).join(``)}</tr></thead><tbody>${e.slice(0,t).map(e=>`<tr>${n.map(t=>`<td>${b(String(e[t]??``))}</td>`).join(``)}</tr>`).join(``)}</tbody></table>`},n=e=>`<ul>${e.map(e=>`<li>${e}</li>`).join(``)}</ul>`;return`<!doctype html><html><head><meta charset="utf-8"><title>Net-Low report</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;color:#12312f;margin:32px;font-size:12px}
      h1{font-size:20px;margin:0} h2{font-size:14px;margin:22px 0 6px;border-bottom:1px solid #ccc;padding-bottom:4px}
      table{border-collapse:collapse;width:100%;font-size:10px} th,td{border:1px solid #ddd;padding:4px;text-align:left}
      th{background:#f2f6f5} .kpi{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}
      .kpi div{border:1px solid #ddd;border-radius:6px;padding:8px 12px;min-width:150px}
      .muted{color:#667}
    </style></head><body>
      <h1>Net-Low report — ${b(e?.company?.name??``)}</h1>
      <p class="muted">Prepared ${new Date().toISOString().slice(0,10)} · calculation version ${d} · a TGS product</p>

      <h2>Reporting boundary and period</h2>
      <p>Boundary: employee engagement activities of ${b(e?.company?.name??``)}, covering
      ${y.length} registered employees. ${b(e?.company?.boundary_note??``)}</p>
      <p>Reporting period: ${w} to ${E}.</p>

      <h2>Headline results</h2>
      <div class="kpi">
        <div><strong>${l(f(j(k)),3)} tCO₂e</strong><br><span class="muted">Measured reductions</span></div>
        <div><strong>${l(f(j(A)),3)} tCO₂e</strong><br><span class="muted">Estimated avoided (separate)</span></div>
        <div><strong>${O.length}</strong><br><span class="muted">Approved activities</span></div>
        <div><strong>${new Set(O.map(e=>e.user_id)).size}</strong><br><span class="muted">Participating employees</span></div>
      </div>

      <h2>Scope and category allocation</h2>
      ${t(Object.entries(O.reduce((e,t)=>{let n=`${t.scope} · ${t.ghg_category}`;return e[n]=(e[n]??0)+Number(t.reduction_kg??0),e},{})).map(([e,t])=>({allocation:e,reduction_tco2e:l(f(t),3)})))}

      <h2>Calculation methodology</h2>
      <p>Each submission records the employee's baseline activity and the alternative actually taken.
      Baseline emissions and actual emissions are each computed as quantity × occurrences ×
      emission factor, converted to the factor's native unit. The reported reduction is the
      difference, floored at zero. Each submission stores an immutable factor snapshot and the
      calculation version so results can be reproduced.</p>
      ${n(v)}

      <h2>Emission factors and sources</h2>
      ${t(I)}

      <h2>Assumptions and exclusions</h2>
      ${n(_)}

      <h2>Activity data</h2>
      ${t(P)}

      <h2>Supporting evidence index</h2>
      ${t(L)}

      <h2>Approval and audit history</h2>
      ${t(F,300)}

      <p class="muted" style="margin-top:24px">Net-Low points are engagement rewards. They are not
      carbon credits, are not tradable, and no verified carbon credit is assigned to an individual
      employee. Estimated avoided emissions are reported separately from measured reductions.</p>
    </body></html>`}return(0,g.jsxs)(`div`,{className:`space-y-5`,children:[(0,g.jsxs)(`header`,{children:[(0,g.jsx)(`h1`,{className:`tgs-h1`,children:`Reports`}),(0,g.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground`,children:`Audit-ready export of boundary, activity data, methodology, factors, approvals and evidence.`})]}),(0,g.jsxs)(`section`,{className:`flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4`,children:[(0,g.jsxs)(`label`,{className:`text-xs text-muted-foreground`,children:[`Period start`,(0,g.jsx)(`input`,{type:`date`,value:w,onChange:e=>T(e.target.value),className:`tgs-input tgs-input-sm ml-2`})]}),(0,g.jsxs)(`label`,{className:`text-xs text-muted-foreground`,children:[`Period end`,(0,g.jsx)(`input`,{type:`date`,value:E,onChange:e=>D(e.target.value),className:`tgs-input tgs-input-sm ml-2`})]}),(0,g.jsxs)(`div`,{className:`ml-auto flex flex-wrap gap-2`,children:[(0,g.jsx)(`button`,{onClick:V,className:`tgs-btn tgs-btn-primary tgs-btn-sm`,children:`PDF report`}),(0,g.jsx)(`button`,{onClick:B,className:`tgs-btn tgs-btn-sm`,children:`Excel workbook`}),(0,g.jsx)(`button`,{onClick:z,className:`tgs-btn tgs-btn-sm`,children:`CSV activity data`})]})]}),(0,g.jsxs)(`section`,{className:`grid grid-cols-2 gap-3 md:grid-cols-4`,children:[(0,g.jsx)(x,{label:`Measured reductions`,value:`${l(f(j(k)),3)} tCO₂e`}),(0,g.jsx)(x,{label:`Estimated avoided`,value:`${l(f(j(A)),3)} tCO₂e`}),(0,g.jsx)(x,{label:`Approved activities`,value:String(O.length)}),(0,g.jsx)(x,{label:`Evidence records`,value:String(L.length)})]}),(0,g.jsxs)(`section`,{className:`rounded-xl border border-border bg-card p-4`,children:[(0,g.jsx)(`h2`,{className:`tgs-h2`,children:`Included in every export`}),(0,g.jsxs)(`ul`,{className:`mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground`,children:[(0,g.jsx)(`li`,{children:`Reporting boundary and period`}),(0,g.jsx)(`li`,{children:`Activity data with quantities, units and occurrences`}),(0,g.jsx)(`li`,{children:`Calculation methodology and version history`}),(0,g.jsx)(`li`,{children:`Emission factors with source, geography and year`}),(0,g.jsx)(`li`,{children:`Assumptions and exclusions`}),(0,g.jsx)(`li`,{children:`Approval and audit history`}),(0,g.jsx)(`li`,{children:`Scope and category allocation`}),(0,g.jsx)(`li`,{children:`Estimated avoided emissions reported separately`}),(0,g.jsx)(`li`,{children:`Supporting evidence index`})]})]}),(0,g.jsxs)(`section`,{className:`rounded-xl border border-border bg-card p-4`,children:[(0,g.jsx)(`h2`,{className:`tgs-h2`,children:`Audit log (latest)`}),(0,g.jsx)(`div`,{className:`mt-3 overflow-x-auto`,children:(0,g.jsxs)(`table`,{className:`w-full min-w-[560px] text-left text-sm`,children:[(0,g.jsx)(`thead`,{className:`text-xs uppercase tracking-wide text-muted-foreground`,children:(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{className:`py-2`,children:`When`}),(0,g.jsx)(`th`,{children:`Actor`}),(0,g.jsx)(`th`,{children:`Entity`}),(0,g.jsx)(`th`,{children:`Action`})]})}),(0,g.jsxs)(`tbody`,{children:[C.slice(0,15).map(e=>(0,g.jsxs)(`tr`,{className:`border-t border-border`,children:[(0,g.jsx)(`td`,{className:`py-2 whitespace-nowrap`,children:String(e.created_at).slice(0,19).replace(`T`,` `)}),(0,g.jsx)(`td`,{children:e.actor_name}),(0,g.jsx)(`td`,{className:`capitalize`,children:e.entity.replace(/_/g,` `)}),(0,g.jsx)(`td`,{className:`capitalize`,children:e.action})]},e.id)),C.length===0&&(0,g.jsx)(`tr`,{children:(0,g.jsx)(`td`,{colSpan:4,className:`py-3 text-sm text-muted-foreground`,children:`No entries yet.`})})]})]})})]})]})}function b(e){return e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e])}function x({label:e,value:t}){return(0,g.jsxs)(`div`,{className:`rounded-xl border border-border bg-card p-4`,children:[(0,g.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:e}),(0,g.jsx)(`p`,{className:`mt-1 text-lg font-semibold text-foreground`,children:t})]})}export{y as component};