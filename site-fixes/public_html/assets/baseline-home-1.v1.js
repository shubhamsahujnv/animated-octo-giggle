
(function(){
  "use strict";

  // ---------- TGS logo: populate every header/footer mark from one shared source ----------
  (function(){
    var TEAL = "data:image/png;base64,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";
    var CREAM = "data:image/png;base64,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";
    document.querySelectorAll('.js-tgs-logo.tgs-logo-light').forEach(function(img){ img.src = TEAL; });
    document.querySelectorAll('.js-tgs-logo.tgs-logo-dark').forEach(function(img){ img.src = CREAM; });
  })();

  // ---------- Public home, gated tools (client-side only) ----------
  // Home page is open to everyone (lead capture). Tool tabs ask for visitor
  // details once. Staff sign-in (username/password) is optional, via header link.
  (function(){
    var GATE_USER = 'ankita.patwa';
    var GATE_PASS = 'jarvis';
    var GATE_KEY = 'baseline_gate_ok';
    var gate = document.getElementById('login-gate');
    var app = document.querySelector('.app');
    var vgate = document.getElementById('visitor-gate');
    var vform = document.getElementById('visitor-form');
    var pendingView = null;
    function showApp(){
      gate.style.display = 'none';
      vgate.style.display = 'none';
      app.style.display = '';
    }
    function askVisitor(pending){
      pendingView = pending || null;
      gate.style.display = 'none';
      vgate.style.display = 'flex';
      try{
        var last = JSON.parse(localStorage.getItem('baseline_visitor_last') || '{}');
        if(last.name) document.getElementById('visitor-name').value = last.name;
        if(last.email) document.getElementById('visitor-email').value = last.email;
        if(last.org) document.getElementById('visitor-org').value = last.org;
      }catch(e){}
      document.getElementById('visitor-name').focus();
    }
    window.BaselineAskVisitor = askVisitor;
    vform.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('visitor-name').value.trim();
      var email = document.getElementById('visitor-email').value.trim();
      var org = document.getElementById('visitor-org').value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      var domain = emailOk ? email.split('@')[1].toLowerCase() : '';
      var personalDomains = ['gmail.com','googlemail.com','yahoo.com','yahoo.co.in','yahoo.co.uk','hotmail.com','outlook.com','live.com','aol.com','icloud.com','me.com','mac.com','protonmail.com','proton.me','zoho.com','yandex.com','mail.com','gmx.com','gmx.net','qq.com','163.com','126.com','sina.com','foxmail.com','rediffmail.com','inbox.com','lycos.com','hushmail.com','tutanota.com','tutanota.de','fastmail.com','runbox.com','hey.com','pm.me'];
      var CALC_OWNER = 'ankitapatwa.09@gmail.com';
      var isOwner = email.toLowerCase() === CALC_OWNER;
      var isPersonal = personalDomains.indexOf(domain) !== -1 && !isOwner;
      if(name.length < 2 || org.length < 2 || !emailOk || isPersonal){
        document.getElementById('visitor-error').style.display = 'block';
        return;
      }
      document.getElementById('visitor-error').style.display = 'none';
      var rec = {name:name, email:email, org:org, at:new Date().toISOString()};
      try{
        localStorage.setItem('baseline_visitor_last', JSON.stringify(rec));
        var log = JSON.parse(localStorage.getItem('baseline_visitor_log') || '[]');
        log.push(rec);
        localStorage.setItem('baseline_visitor_log', JSON.stringify(log.slice(-200)));
      }catch(err){}
      window.BaselineVisitor = rec;
      document.querySelectorAll('[data-view="calc"]').forEach(function(b){ b.hidden = !isOwner; });
      showApp();
      var pv = pendingView; pendingView = null;
      if(pv && window.BaselineGoto) window.BaselineGoto(pv);
    });
    // Staff sign-in state
    var staffLink = document.getElementById('gate-signout');
    function isStaff(){ try{ return localStorage.getItem(GATE_KEY) === '1'; }catch(e){ return false; } }
    function paintStaffLink(){ if(staffLink) staffLink.textContent = isStaff() ? 'Sign out' : 'Sign in'; }
    document.getElementById('gate-form').addEventListener('submit', function(e){
      e.preventDefault();
      var u = document.getElementById('gate-user').value.trim();
      var p = document.getElementById('gate-pass').value;
      if(u === GATE_USER && p === GATE_PASS){
        try{ localStorage.setItem(GATE_KEY, '1'); }catch(e2){}
        document.getElementById('gate-error').style.display = 'none';
        window.BaselineVisitor = {name:'TGS staff', email:'ankitapatwa.09@gmail.com', org:'TheGreensolve', at:new Date().toISOString()};
        document.querySelectorAll('[data-view="calc"]').forEach(function(b){ b.hidden = false; });
        showApp(); paintStaffLink();
      } else {
        document.getElementById('gate-error').style.display = 'block';
      }
    });
    if(staffLink){
      staffLink.addEventListener('click', function(e){
        e.preventDefault();
        if(isStaff()){
          try{ localStorage.removeItem(GATE_KEY); }catch(e2){}
          paintStaffLink();
          return;
        }
        vgate.style.display = 'none';
        gate.style.display = 'flex';
        document.getElementById('gate-user').value = '';
        document.getElementById('gate-pass').value = '';
        document.getElementById('gate-user').focus();
      });
    }
    // Home page is public: always open the app on load.
    showApp(); paintStaffLink();
    if(isStaff()){
      document.querySelectorAll('[data-view="calc"]').forEach(function(b){ b.hidden = false; });
    }
  })();

  // ---------- Data: sector / technology taxonomy ----------
  var SECTORS = [
    { id:'energy', label:'Energy & Power', techs:[
      {id:'solar-pv', label:'Solar PV (grid-connected)'},
      {id:'wind-onshore', label:'Onshore wind'},
      {id:'wind-offshore', label:'Offshore wind'},
      {id:'small-hydro', label:'Small / mini hydro'},
      {id:'pumped-hydro-storage', label:'Pumped hydro / RE + storage'},
      {id:'biomass-power', label:'Biomass / bagasse power'},
      {id:'waste-to-energy-power', label:'Waste-to-energy power'},
      {id:'green-hydrogen', label:'Green hydrogen'},
      {id:'energy-efficiency-generation', label:'Generation-side energy efficiency'}
    ]},
    { id:'industry', label:'Heavy Industry', techs:[
      {id:'low-carbon-cement', label:'Low-carbon cement / clinker substitution'},
      {id:'steel-fuel-switch', label:'Steel fuel switching / EAF'},
      {id:'industrial-energy-efficiency', label:'Industrial process energy efficiency'},
      {id:'boiler-efficiency', label:'Boiler / thermal efficiency upgrade'},
      {id:'petrochem-process-efficiency', label:'Petrochemical / fertiliser process efficiency'},
      {id:'ccus', label:'Carbon capture, utilisation & storage (CCUS)'},
      {id:'ods-hfc-destruction', label:'ODS / HFC refrigerant destruction'},
      {id:'nitric-adipic-acid-abatement', label:'Nitric / adipic acid N₂O abatement'},
      {id:'pavement-materials-recycling', label:'Recycled pavement materials (foamed base / asphalt emulsion)'},
      {id:'co2-utilization-concrete', label:'CO2 utilisation in concrete production'},
      {id:'fugitive-industrial-gas-recovery', label:'Fugitive industrial gas recovery (PFC/CF4, oil & gas systems)'}
    ]},
    { id:'waste', label:'Waste & Agriculture', techs:[
      {id:'landfill-gas', label:'Landfill gas capture'},
      {id:'organic-waste-composting', label:'Organic waste composting'},
      {id:'organic-waste-digestion', label:'Organic waste anaerobic digestion'},
      {id:'compressed-biogas', label:'Compressed biogas (CBG)'},
      {id:'wastewater-methane', label:'Wastewater methane capture'},
      {id:'livestock-management', label:'Livestock manure management'},
      {id:'rice-cultivation', label:'Rice cultivation methane reduction'},
      {id:'coal-mine-methane', label:'Coal / trona mine methane capture'},
      {id:'agroforestry-biochar', label:'Agroforestry / biochar'},
      {id:'mangrove-restoration', label:'Mangrove afforestation / restoration'},
      {id:'nitrogen-management', label:'Agricultural nitrogen management'},
      {id:'ewaste-recycling', label:'E-waste materials recovery & recycling'},
      {id:'msw-recycling', label:'Municipal solid waste materials recovery & recycling'}
    ]},
    { id:'transport', label:'Transport & Buildings', techs:[
      {id:'ev-fleet-charging', label:'EV fleet / charging infrastructure'},
      {id:'green-building-retrofit', label:'Green building retrofit'},
      {id:'energy-efficient-lighting-hvac', label:'Efficient lighting / HVAC retrofit'},
      {id:'modal-shift-transit', label:'Modal shift / public transit'},
      {id:'efficient-cookstoves', label:'Efficient cookstoves'},
      {id:'fleet-efficiency-retrofit', label:'Vehicle fleet efficiency retrofit (non-EV)'},
      {id:'ev-hybrid-fleet-vehicles', label:'Electric/hybrid fleet vehicles & mobile machinery'},
      {id:'marine-alt-fuels', label:'Alternative low-carbon marine fuels'},
      {id:'marine-shore-power', label:'Shore power / electricity supply for ships'}
    ]}
  ];
  function sectorLabel(id){ var s=SECTORS.find(function(x){return x.id===id;}); return s?s.label:id; }
  function techLabel(sectorId, techId){
    if(techId==='custom') return 'Other / custom technology';
    var s=SECTORS.find(function(x){return x.id===sectorId;});
    if(!s) return techId;
    var t=s.techs.find(function(x){return x.id===techId;});
    return t?t.label:techId;
  }
  // A project's own tech label — unlike techLabel(), this knows about a project's free-text
  // "custom technology" entry, which isn't part of the shared SECTORS list.
  function projectTechLabel(p){
    if(p.tech==='custom') return p.techCustom || 'Other / custom technology';
    return techLabel(p.sector, p.tech);
  }
  var PROJECT_TYPE_LABEL = {
    greenfield:'New build / greenfield', retrofit:'Retrofit or upgrade of an existing asset', expansion:'Expansion of an existing asset'
  };

  // ---------- Data: methodology library ----------
  var CCTS_LINK = 'https://icapcarbonaction.com/en/news/india-notifies-emission-intensity-targets-nine-sectors-under-carbon-credit-trading-scheme';
  var CCTS_LABEL = "ICAP: India's CCTS sector notification";
  var M = [
    // ---- INDIA ----
    { id:'in-ccts-off-re', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Renewable Energy (offset methodology)', sector:'energy',
      techs:['solar-pv','wind-onshore','small-hydro','biomass-power','waste-to-energy-power'],
      summary:"One of eight BEE-approved offset methodologies under India's Carbon Credit Trading Scheme. Grid-connected renewable generation displacing grid electricity can register for offset credits outside the compliance mechanism.",
      additionality:'Regulatory-surplus test plus BEE technology/investment screening; mature, subsidy-free utility solar increasingly faces common-practice scrutiny even in India.',
      monitoring:'Digital MRV via metered generation data, verified annually by a BEE-accredited auditor, issued through the Grid-India registry.',
      crediting:"Crediting period set at registration, typically aligned to project life with periodic reassessment.",
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-gh2', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Green hydrogen', sector:'energy', techs:['green-hydrogen'],
      summary:'Green hydrogen production displacing fossil-based hydrogen or fuel is one of the eight approved CCTS offset categories, aligned with the National Green Hydrogen Mission.',
      additionality:'Still capital-intensive and price-uncompetitive with grey hydrogen in most applications, so additionality is generally straightforward to demonstrate today.',
      monitoring:'Electrolyser input/output metering and grid-emission-factor accounting for the electricity source, verified under BEE MRV rules.',
      crediting:'Fixed crediting period set at registration, subject to Grid-India review.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-storage', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'RE with storage / pumped hydro', sector:'energy', techs:['pumped-hydro-storage'],
      summary:'Pumped hydro and firmed renewable-plus-storage projects are separately listed among the eight approved CCTS offset methodologies, reflecting their role in grid decarbonisation.',
      additionality:'Storage economics remain marginal without policy support in most Indian states, so additionality is generally defensible.',
      monitoring:'Metered charge/discharge cycles and displaced-generation accounting via Grid-India MRV.',
      crediting:'Set at registration, revalidated periodically.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-offwind', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Offshore wind', sector:'energy', techs:['wind-offshore'],
      summary:'Offshore wind is separately recognised among the eight CCTS offset methodologies given its early-stage cost profile in India.',
      additionality:'Pre-commercial in India, which makes for a strong additionality case at present.',
      monitoring:'Metered generation, verified through Grid-India MRV.',
      crediting:'Set at registration.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-indeff', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Industrial energy efficiency', sector:'industry',
      techs:['industrial-energy-efficiency','boiler-efficiency','petrochem-process-efficiency'],
      summary:"Efficiency retrofits at facilities not already obligated under CCTS/PAT can register under the offset mechanism's industrial-efficiency category.",
      additionality:'Facilities already under PAT targets cannot double-count the same savings; non-designated consumers face a genuine financial-barrier test.',
      monitoring:'Sub-metering of the retrofit boundary plus BEE-accredited verification against a documented baseline.',
      crediting:'Set at registration.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-methane', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Methane recovery (landfill / biomethane)', sector:'waste',
      techs:['landfill-gas','organic-waste-digestion','wastewater-methane'],
      summary:'Methane capture and destruction or utilisation from landfills, wastewater and organic waste streams is an approved CCTS offset category.',
      additionality:'Uncontrolled methane venting is still common practice at most Indian landfills, so additionality is generally strong.',
      monitoring:'Flow-metered gas capture with periodic composition sampling, BEE MRV verification.',
      crediting:'Set at registration.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-cbg', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Compressed biogas (SATAT)', sector:'waste', techs:['compressed-biogas'],
      summary:'Compressed biogas production under the SATAT programme is separately listed among the eight approved CCTS offset methodologies.',
      additionality:'A nascent value chain: viability-gap funding is still typically required, supporting additionality.',
      monitoring:'Feedstock and CBG output metering, BEE MRV verification.',
      crediting:'Set at registration.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-mangrove', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Mangrove afforestation & restoration', sector:'waste', techs:['mangrove-restoration'],
      summary:'Blue-carbon mangrove restoration is one of the eight CCTS offset methodologies, alongside agroforestry.',
      additionality:'Land-use and tenure barriers typically support an additionality case; permanence and reversal risk require buffer-pool treatment.',
      monitoring:'Remote-sensing plus ground-plot biomass surveys, periodic BEE-accredited verification.',
      crediting:'Long-dated, multi-decadal crediting period with periodic reassessment.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-agro', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Agroforestry, biochar & sustainable farming', sector:'waste',
      techs:['agroforestry-biochar','rice-cultivation','livestock-management','nitrogen-management'],
      summary:'Agroforestry, biochar soil amendment and sustainable/regenerative farming practices round out the eight approved CCTS offset categories.',
      additionality:'Smallholder economics rarely support these practices without external revenue, so additionality is generally strong, but aggregation and MRV cost are the binding constraint.',
      monitoring:'Sampling-based soil-carbon/biochar accounting or activity-based default factors, BEE MRV verification.',
      crediting:'Set at registration; periodic reassessment for soil-carbon claims.',
      link:CCTS_LINK, linkLabel:CCTS_LABEL },
    { id:'in-ccts-off-transport', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Transport: modal shift & electric vehicles/buses', sector:'transport',
      techs:['ev-hybrid-fleet-vehicles','modal-shift-transit'],
      summary:'Modal-shift projects and electric vehicle/bus deployment are listed as an approved CCTS offset sector (Transport) in BEE\'s September 2024 sectoral-scope notification, alongside the energy, industry, waste, agriculture and forestry categories already covered elsewhere in this India section.',
      additionality:'Regulatory-surplus test plus BEE technology/investment screening, consistent with the other CCTS offset categories; EV/bus penetration outside a handful of metro fleets is still low enough that additionality is generally defensible today.',
      monitoring:'Activity-based data (route km, passenger-km displaced, or electricity/fuel consumption per vehicle) verified by a BEE-accredited Carbon Verification Agency, issued through the ICM registry.',
      crediting:'Set at registration under the offset mechanism; periodic reassessment per standard CCTS offset rules.',
      link:'https://beeindia.gov.in/', linkLabel:'BEE: Approved Sectors in Offset Mechanism under CCTS (20 Sep 2024)' },
    { id:'in-ccts-off-ccus', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'CCUS (post-combustion capture)', sector:'industry', techs:['ccus'],
      summary:'Carbon capture, utilisation and storage is listed as an approved CCTS offset sector, with post-combustion CCS named as the illustrative technology in BEE\'s September 2024 sectoral-scope notification. This was added in Phase 2 of the offset mechanism\'s sector rollout, alongside construction, fugitive emissions and solvent use.',
      additionality:'CCUS remains capital-intensive and largely uncommon in Indian industry outside pilot projects, so additionality is generally straightforward to demonstrate today, subject to the standard regulatory-surplus and common-practice screening.',
      monitoring:'Metered captured CO2, net of capture-process energy use, verified by a BEE-accredited Carbon Verification Agency against a documented monitoring plan.',
      crediting:'Set at registration under the offset mechanism; a specific quantification methodology for this Phase-2 category was not detailed in the sectoral-scope notification itself, so confirm one has been published before relying on this pathway.',
      link:'https://beeindia.gov.in/', linkLabel:'BEE: Approved Sectors in Offset Mechanism under CCTS (20 Sep 2024)' },
    { id:'in-ccts-off-fugitive', country:'IN', scheme:'CCTS Offset Mechanism', type:'offset', name:'Fugitive industrial gas recovery (semiconductor CF4, oil & gas systems)', sector:'industry', techs:['fugitive-industrial-gas-recovery'],
      summary:'Fugitive emissions from industrial gases (halocarbons and sulphur hexafluoride) and from fuel systems are an approved CCTS offset sector, added in Phase 2. BEE\'s notification names two specific illustrative technologies: CF4 emission reduction at a semiconductor manufacturing facility, and recovery and utilisation of gas from oil fields.',
      additionality:'Standard regulatory-surplus and common-practice screening; fugitive-gas abatement at this level of precision is not yet routine in most Indian facilities outside a few semiconductor and oil & gas operators, which generally supports an additionality case.',
      monitoring:'Direct metering or engineering-calculation-based estimation of the specific fugitive gas recovered/destroyed (CF4/PFCs for semiconductor fabs, methane/associated gas for oil field recovery), verified by a BEE-accredited Carbon Verification Agency.',
      crediting:'Set at registration under the offset mechanism; a specific quantification methodology for this Phase-2 category was not detailed in the sectoral-scope notification itself, so confirm one has been published before relying on this pathway.',
      link:'https://beeindia.gov.in/', linkLabel:'BEE: Approved Sectors in Offset Mechanism under CCTS (20 Sep 2024)' },
    { id:'in-ccts-compliance', country:'IN', scheme:'CCTS Compliance Mechanism', type:'compliance',
      name:'Obligated-sector intensity targets (aluminium, cement, chlor-alkali, pulp & paper, petroleum refining, petrochemicals, textiles)', sector:'industry',
      techs:['low-carbon-cement','steel-fuel-switch','industrial-energy-efficiency','petrochem-process-efficiency'],
      summary:'Facilities in the notified obligated sectors receive an annual GHG-intensity target (tCO2e per tonne of equivalent product, e.g. cement, crude steel, paper, olefin). A facility that beats its target earns tradeable Carbon Credit Certificates (CCCs); a shortfall requires purchasing and surrendering CCCs. Nine sectors are defined as compliance-mechanism scope for verifier accreditation (aluminium, cement, chlor-alkali, fertiliser, iron & steel, petrochemical, petroleum refining, pulp & paper, textiles), but as of the most recent sectoral notification only seven have live, entity-specific targets in force: aluminium, cement, chlor-alkali, pulp & paper, petroleum refining, petrochemicals and textiles, covering roughly 490 facilities. Iron & steel targets were still pending notification as of early 2026; fertiliser\'s status wasn\'t confirmed in the sources reviewed here, so don\'t assume it\'s live without checking.',
      additionality:'Not applicable in the voluntary sense: this is a regulatory intensity-based baseline-and-credit system, not an additionality test. Offsets from the separate CCTS voluntary offset mechanism cannot be used to meet a compliance shortfall; only CCCs earned or purchased within the compliance mechanism itself count.',
      monitoring:'Annual facility-level GHG monitoring on a "gate-to-gate" boundary (direct fuel/process emissions plus purchased electricity and heat), verified by a BEE-accredited Carbon Verification Agency against a BEE-approved monitoring plan. The GHG Emissions Report and verification are due within 4 months of the compliance-year end (by 31 July). The verifying agency must be independently accredited for the facility\'s specific sector and cannot also have advised on that facility\'s monitoring plan, a direct advisor/verifier firewall.',
      crediting:"CCCs are issued or surrendered based on the gap between the notified GEI target and the achieved GEI, multiplied by output. Targets are fixed for a 3-year trajectory period; a capex event that changes the facility's emissions boundary (capacity expansion, plant merger or split) must be notified to BEE, which decides case by case whether and how it factors into the target, rather than through any pre-set formula or automatic baseline reset. Unlimited banking of CCCs across compliance years is allowed; borrowing against future years is not. Targets were first set using FY2024 data as baseline, covering compliance years FY2026-FY2027, with the first CCC trading expected around mid-2026. A shortfall carries an environmental compensation penalty equal to twice the average CCC trading price for that compliance year.",
      link:'https://icapcarbonaction.com/en/ets/indian-carbon-credit-trading-scheme', linkLabel:'ICAP: Indian Carbon Credit Trading Scheme factsheet' },
    { id:'in-pat', country:'IN', scheme:'PAT Scheme (BEE)', type:'compliance-adjacent', name:'Energy Saving Certificates (ESCerts)', sector:'industry',
      techs:['industrial-energy-efficiency','boiler-efficiency','energy-efficiency-generation'],
      summary:'Designated Consumers across thermal power, cement, iron & steel, fertiliser, aluminium, pulp & paper, chlor-alkali, railways, textiles, refineries and DISCOMs receive specific-energy-consumption targets; over-achievement earns tradeable ESCerts (1 ESCert = 1 tonne of oil equivalent saved). ESCerts are a distinct instrument from CCTS carbon credits, but a facility often carries both.',
      additionality:'Not applicable: this is a regulatory target-and-trade design, not an additionality test.',
      monitoring:'BEE-accredited energy auditor verification against the notified baseline specific energy consumption.',
      crediting:'Annual PAT cycles; ESCerts traded on power exchanges.',
      link:'https://beeindia.gov.in/', linkLabel:'BEE: Perform, Achieve and Trade' },
    { id:'in-voluntary', country:'IN', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Cross-sector voluntary registration', sector:'transport',
      techs:['ev-fleet-charging','green-building-retrofit','energy-efficient-lighting-hvac','efficient-cookstoves'],
      summary:'Activities not yet covered by a CCTS offset category (EV charging, building efficiency, cookstoves) can still register with an international voluntary registry operating in India. Modal shift and EV/bus fleets now have their own dedicated CCTS offset category, listed separately below.',
      additionality:'Standard VCS/Gold Standard additionality tests apply (regulatory surplus, investment or barrier analysis, common-practice analysis); confirm an active, non-retired methodology exists for the specific activity before proceeding.',
      monitoring:"Per the specific registry methodology's MRV requirements, independently validated and verified.",
      crediting:'Methodology-specific; typically 7–10 years, renewable.',
      link:'https://verra.org/programs/verified-carbon-standard/', linkLabel:'Verra: VCS Program' },
    { id:'in-ecbc', country:'IN', scheme:'ECBC / BEE Star Rating', type:'regulatory-only', name:'Building energy code compliance', sector:'transport',
      techs:['green-building-retrofit','energy-efficient-lighting-hvac'],
      summary:'The Energy Conservation Building Code and BEE star-rating schemes set efficiency requirements or ratings for buildings but are not, by themselves, a carbon-credit-issuing methodology.',
      additionality:'Not applicable: a code-compliance and labelling pathway, not a credit mechanism.',
      monitoring:'Design and as-built energy audits against ECBC benchmarks.',
      crediting:'None directly. Route qualifying building-efficiency capex to a voluntary-market methodology if tradeable credits are the objective.',
      link:'https://beeindia.gov.in', linkLabel:'BEE: building energy programmes' },

    // ---- USA ----
    { id:'us-carb-livestock', country:'US', scheme:'CARB Compliance Offset Protocol', type:'compliance', name:'Livestock projects', sector:'waste', techs:['livestock-management'],
      summary:'California Air Resources Board-approved protocol for manure-management methane destruction on livestock operations, usable as a California Cap-and-Trade compliance offset.',
      additionality:'Embedded performance-standard test; anaerobic digesters remain uncommon on most operations without incentive revenue.',
      monitoring:"Metered biogas destruction, third-party verification under CARB's offset program.",
      crediting:'Standard CARB crediting period, updated periodically with protocol revisions.',
      link:'https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/compliance-offset-protocols', linkLabel:'CARB: Compliance Offset Protocols' },
    { id:'us-carb-mmc', country:'US', scheme:'CARB Compliance Offset Protocol', type:'compliance', name:'Mine methane capture', sector:'waste', techs:['coal-mine-methane'],
      summary:"CARB-approved protocol for capturing and destroying methane from coal and trona mines, usable as a compliance offset in California's Cap-and-Trade programme.",
      additionality:"Ventilation-air methane is otherwise vented, making for a strong additionality case where destruction isn't already legally required.",
      monitoring:'Continuous flow and concentration metering, third-party verification.',
      crediting:'Standard CARB crediting period.',
      link:'https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/compliance-offset-protocols', linkLabel:'CARB: Compliance Offset Protocols' },
    { id:'us-carb-ods', country:'US', scheme:'CARB Compliance Offset Protocol', type:'compliance', name:'Ozone depleting substances', sector:'industry', techs:['ods-hfc-destruction'],
      summary:'CARB-approved protocol crediting destruction of ODS banked in old refrigeration, foam and fire-suppression equipment instead of allowing high-GWP release.',
      additionality:'No general legal requirement to destroy banked ODS, which makes for a strong additionality case.',
      monitoring:'Chain-of-custody tracking from collection to certified destruction facility, third-party verification.',
      crediting:'One-time credit issuance at verified destruction.',
      link:'https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/compliance-offset-protocols', linkLabel:'CARB: Compliance Offset Protocols' },
    { id:'us-carb-rice', country:'US', scheme:'CARB Compliance Offset Protocol', type:'compliance', name:'Rice cultivation projects', sector:'waste', techs:['rice-cultivation'],
      summary:'CARB-approved protocol crediting water-management practices (e.g. alternate wetting and drying) that cut methane from flooded rice cultivation.',
      additionality:'Practice change usually needs upfront capex (water control structures, levelling) that is uneconomic without credit revenue.',
      monitoring:'Field-level water-management records plus remote sensing, third-party verification.',
      crediting:'Standard CARB crediting period.',
      link:'https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/compliance-offset-protocols', linkLabel:'CARB: Compliance Offset Protocols' },
    { id:'us-car-landfill', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'U.S. Landfill Protocol', sector:'waste', techs:['landfill-gas'],
      summary:'CAR protocol for landfill gas collection and destruction or beneficial use beyond regulatory requirements.',
      additionality:"Confirm the site isn't already mandated to collect gas under EPA/state rules before claiming additionality.",
      monitoring:'Metered gas flow and methane content, CAR-accredited verification body.',
      crediting:'Standard CAR crediting period, renewable.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-car-orgwaste', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'Organic waste composting & digestion', sector:'waste',
      techs:['organic-waste-composting','organic-waste-digestion'],
      summary:'CAR protocols crediting diversion of organic waste from landfill into composting or anaerobic digestion.',
      additionality:"Strong case where local landfill-diversion mandates don't yet apply; weaker in states with organics-diversion laws already in force. Check state rules first.",
      monitoring:'Tonnage-in/tonnage-out records and methane-avoidance calculation per protocol, third-party verification.',
      crediting:'Standard CAR crediting period.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-car-nitrogen', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'U.S. Nitrogen Management', sector:'waste', techs:['nitrogen-management'],
      summary:'CAR protocol crediting reduced N2O emissions from more precise on-farm nitrogen fertiliser application.',
      additionality:'Precision-application equipment capex is typically uneconomic on fertiliser-cost savings alone.',
      monitoring:'Field-level application records against a documented baseline rate, third-party verification.',
      crediting:'Standard CAR crediting period.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-car-cmm', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'U.S. Coal Mine Methane', sector:'waste', techs:['coal-mine-methane'],
      summary:'CAR protocol for methane destruction from active or abandoned coal mines, parallel to the CARB compliance version.',
      additionality:"Strong case for ventilation-air methane not already required to be destroyed.",
      monitoring:'Continuous metering, third-party verification.',
      crediting:'Standard CAR crediting period.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-car-cement', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'Low-Carbon Cement Protocol', sector:'industry', techs:['low-carbon-cement'],
      summary:'CAR protocol crediting reduced-clinker or alternative-binder cement that cuts process emissions against a conventional-cement baseline.',
      additionality:'Alternative binders often carry a cost or performance penalty, and genuine barrier analysis usually supports additionality.',
      monitoring:"Mix-design and production-volume records against the protocol's baseline formula, third-party verification.",
      crediting:'Standard CAR crediting period.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-car-nitricadipic', country:'US', scheme:'Climate Action Reserve', type:'voluntary', name:'Nitric & adipic acid production', sector:'industry', techs:['nitric-adipic-acid-abatement'],
      summary:'CAR protocols crediting N2O abatement equipment (e.g. catalytic reduction) on nitric and adipic acid production lines.',
      additionality:'Abatement equipment is not universally mandated at existing US plants. Confirm current state/federal requirements at the specific facility first.',
      monitoring:'Continuous emissions monitoring, third-party verification.',
      crediting:'Standard CAR crediting period.',
      link:'https://climateactionreserve.org/', linkLabel:'Climate Action Reserve' },
    { id:'us-acr-refrigerants', country:'US', scheme:'American Carbon Registry', type:'voluntary', name:'Advanced refrigeration systems & reclaimed HFC', sector:'industry', techs:['ods-hfc-destruction'],
      summary:'ACR methodologies crediting low-GWP refrigerant retrofits and certified reclamation of HFC refrigerants, propellants and fire suppressants.',
      additionality:'Retrofits typically cost more than continued servicing of existing systems, and barrier analysis usually supports additionality.',
      monitoring:'Refrigerant tracking and leak-rate records per ACR MRV, third-party verification.',
      crediting:'10-year ACR crediting period, renewable with no cap on the number of renewals, provided additionality and the baseline are reassessed against then-current conditions at each renewal (per the ACR Standard, v8.0).',
      link:'https://acrcarbon.org/methodologies/approved-methodologies/', linkLabel:'ACR: Approved Methodologies' },
    { id:'us-acr-ods', country:'US', scheme:'American Carbon Registry', type:'voluntary', name:'Destruction of ODS & high-GWP foam', sector:'industry', techs:['ods-hfc-destruction'],
      summary:'ACR methodology crediting certified destruction of banked ODS recovered from old equipment and foam, including from international sources.',
      additionality:'No general requirement to destroy banked ODS, which makes for a strong additionality case.',
      monitoring:'Chain-of-custody to a certified destruction facility, third-party verification.',
      crediting:'One-time issuance at verified destruction.',
      link:'https://acrcarbon.org/methodologies/approved-methodologies/', linkLabel:'ACR: Approved Methodologies' },
    { id:'us-acr-ccs', country:'US', scheme:'American Carbon Registry', type:'voluntary', name:'Carbon capture and storage projects', sector:'industry', techs:['ccus'],
      summary:'ACR methodology crediting geologic CO2 storage from capture projects; usable alongside, but distinct from, the federal 45Q tax credit.',
      additionality:'Capture-and-storage capex is rarely economic on its own; model it together with 45Q to assess overall project viability.',
      monitoring:'Metered captured/injected CO2 under an MRV plan aligned with 40 CFR Part 98 Subpart RR or ACR\'s own protocol.',
      crediting:'10-year ACR crediting period, renewable with no cap on the number of renewals (per the ACR Standard, v8.0); storage permanence monitored long-term separately.',
      link:'https://acrcarbon.org/methodologies/approved-methodologies/', linkLabel:'ACR: Approved Methodologies' },
    { id:'us-acr-coaltrona', country:'US', scheme:'American Carbon Registry', type:'voluntary', name:'Coal & trona mine methane', sector:'waste', techs:['coal-mine-methane'],
      summary:'ACR methodology crediting methane capture and destruction from coal and trona mines in North America.',
      additionality:'Strong case for ventilation-air methane not already required to be destroyed.',
      monitoring:'Continuous metering, third-party verification.',
      crediting:'10-year ACR crediting period, renewable with no cap on the number of renewals, provided additionality and the baseline are reassessed against then-current conditions at each renewal (per the ACR Standard, v8.0).',
      link:'https://acrcarbon.org/methodologies/approved-methodologies/', linkLabel:'ACR: Approved Methodologies' },
    { id:'us-acr-landfill', country:'US', scheme:'American Carbon Registry', type:'voluntary', name:'Landfill gas destruction & beneficial use', sector:'waste', techs:['landfill-gas'],
      summary:"ACR methodology parallel to CAR's, crediting landfill gas collection and destruction or beneficial use beyond regulatory requirements.",
      additionality:"Confirm the site isn't already subject to an EPA/state gas-collection mandate before claiming additionality.",
      monitoring:'Metered gas flow and methane content, third-party verification.',
      crediting:'10-year ACR crediting period, renewable with no cap on the number of renewals, provided additionality and the baseline are reassessed against then-current conditions at each renewal (per the ACR Standard, v8.0).',
      link:'https://acrcarbon.org/methodologies/approved-methodologies/', linkLabel:'ACR: Approved Methodologies' },
    { id:'us-voluntary-wastewater', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Wastewater treatment methane avoidance', sector:'waste', techs:['wastewater-methane'],
      summary:"Verra's consolidated methodology ACM0014 (Treatment of Wastewater) and the small-scale AMS-III.I (replacing anaerobic treatment with aerobic) both credit reduced methane from wastewater handling. No CARB, CAR, or ACR protocol covers this in the US today, so the voluntary market is the realistic route.",
      additionality:'Both methodologies started life under the CDM, built around developing-country grids and baselines, so a US facility faces a tougher regulatory-surplus and common-practice test than the context they were designed for. Aerobic treatment is already standard at most US industrial sites, which weakens the case unless the project specifically replaces an anaerobic lagoon or another uncontrolled methane source, not just an efficiency upgrade to an already-aerobic system.',
      monitoring:"Flow-metered influent/effluent with periodic composition or methane-generation-potential sampling, verified by a Verra-approved validation/verification body.",
      crediting:'Methodology-specific crediting period. Confirm ACM0014 and AMS-III.I (plus its 2024 clarification) are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/treatment-of-wastewater/', linkLabel:'Verra: ACM0014 Treatment of Wastewater' },
    { id:'us-voluntary-wastewater-solids', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Methane avoidance via solids separation (wastewater/manure)', sector:'waste', techs:['wastewater-methane'],
      summary:"A more specific, equipment-based alternative to the aerobic-conversion pathway above: Verra's AMS-III.Y credits mechanical removal of solids (screens, centrifuges, hydrocyclones, presses, or biofiltration) from an anaerobic wastewater or manure system, where the separated solids are then composted, dried, or otherwise treated to cut methane. No capacity limit for manure projects; wastewater projects are capped at 60,000 tCO2e/yr in reductions.",
      additionality:'Same CDM-origin, three-step test as the aerobic pathway (regulatory surplus, investment analysis, common-practice analysis), with no simplified procedure available. The baseline anaerobic system must generally have been operating at least three years, and manure-management applicability conditions (confined animals, lagoon depth and retention time, site temperature) are specific enough that this is worth checking in detail before assuming fit.',
      monitoring:'Direct weighing and dry-matter/volatile-solids lab testing of the separated solids stream, to a 10% error at 90% confidence, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.Y is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/methane-avoidance-through-separation-of-solids-from-wastewater-or-manure-treatment-systems/', linkLabel:'Verra: AMS-III.Y Methane Avoidance via Solids Separation' },
    { id:'us-voluntary-ewaste', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'E-waste materials recovery & recycling', sector:'waste', techs:['ewaste-recycling'],
      summary:"Verra's AMS-III.BA credits dedicated E-waste collection and recycling facilities that recover ferrous metals, non-ferrous metals, and plastics, displacing production of the equivalent virgin materials. No CARB/CAR/ACR protocol covers this in the US today.",
      additionality:'Additionality is demonstrated under the source methodology AMS-III.BA itself, not a separate VMR-specified test; a facility already operating profitably on scrap-metal and materials revenue alone will struggle to make the case. The methodology also applies a 30% discount factor to the baseline emissions credited, to account for uncertainty in how much virgin-material production is actually displaced, so model conservatively.',
      monitoring:'Metered/weighed inputs and recovered-material outputs by material stream, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.BA and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/revision-to-ams-iii-ba-small-scale-methodology-recovery-and-recycling-of-materials-from-e-waste/', linkLabel:'Verra: AMS-III.BA E-waste Recovery & Recycling' },
    { id:'us-voluntary-msw-recycling', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Municipal solid waste materials recovery & recycling', sector:'waste', techs:['msw-recycling'],
      summary:"Verra's AMS-III.AJ credits recovery of plastics, glass, and metals from municipal solid waste at a dedicated facility, displacing virgin-material production; paper/cardboard recycling can also claim avoided landfill methane where relevant. No CARB/CAR/ACR protocol covers general MSW recycling in the US today.",
      additionality:'Deferred to the source methodology AMS-III.AJ, with the same 30% discount factor on baseline emissions applied here as in the E-waste methodology above, to account for how much virgin-material production is genuinely displaced.',
      monitoring:'Metered/weighed inputs and recovered-material outputs by material stream (plastics, glass, metals), verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.AJ and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vmr0007-revision-to-ams-iii-aj-recovery-and-recycling-of-materials-from-solid-wastes-v1-0/', linkLabel:'Verra: AMS-III.AJ MSW Materials Recovery' },
    { id:'us-voluntary-indeff', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Industrial energy efficiency & fuel switching', sector:'industry', techs:['industrial-energy-efficiency','boiler-efficiency'],
      summary:"Verra's small-scale methodology AMS-II.D (energy efficiency and fuel-switching measures for industrial facilities) is the closest active pathway for a boiler, process-heat, or plant-wide efficiency retrofit. No CARB, CAR, or ACR protocol covers general industrial efficiency in the US today.",
      additionality:"Another CDM-origin, small-scale methodology built around developing-country baselines, so it applies a stricter test to an already-efficient US facility. A retrofit driven by a permit condition, an insurance requirement, or routine equipment replacement at end of life is unlikely to clear the regulatory-surplus or common-practice test. The strongest case is one the facility would clearly skip without credit revenue.",
      monitoring:'Sub-metered energy use across the retrofit boundary against a documented pre-retrofit baseline, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-II.D is still active on the Verra registry and check its scale cap before relying on it.',
      link:'https://verra.org/methodologies/energy-efficiency-and-fuel-switching-measures-for-industrial-facilities/', linkLabel:'Verra: AMS-II.D Industrial Energy Efficiency' },
    { id:'us-voluntary-geopolymer', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Geopolymer cement production', sector:'industry', techs:['low-carbon-cement'],
      summary:"Verra's AM0125 credits geopolymer cement, a genuinely clinker-free binder (not just a reduced-clinker blend), displacing Ordinary Portland Cement. This sits alongside, and is more specific than, the CAR Low-Carbon Cement Protocol listed elsewhere in this sector; check which one actually matches the binder chemistry in question.",
      additionality:'Uses an Activity Method rather than a full investment/barrier test, per the source methodology AM0125. A 30% discount factor is applied to the OPC-displacement baseline to account for uncertainty in how much conventional cement production is actually avoided.',
      monitoring:'Metered production volume of geopolymer cement against the displaced-OPC baseline formula, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AM0125 and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vmr0012-production-of-geopolymer-cement-v1-0/', linkLabel:'Verra: AM0125 Geopolymer Cement' },
    { id:'us-voluntary-beccs', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'CO2 capture from bioenergy (BECCS)', sector:'industry', techs:['ccus'],
      summary:"A distinct CCUS route from the ACR and 45Q pathways listed elsewhere in this sector: Verra's modular VM0049 (Carbon Capture and Storage) methodology, combined with the VMD0059 bioenergy-capture module, credits CO2 captured from the flue gas of a biomass heat/power facility, then transported and stored under separate Verra transport/storage modules. Only sustainably sourced, traceable biomass can be credited as a removal; captured CO2 from non-traceable biomass is credited as a reduction instead.",
      additionality:'Assessed at the parent VM0049 level, not within the capture module itself, using a financial-barrier analysis after excluding scenarios the facility is already legally required to pursue. Model this alongside 45Q, since both can apply to the same capture project if structured to avoid double-claiming the same tonnes.',
      monitoring:'Metered captured CO2 net of fuel-combustion and fugitive project emissions, plus a biomass-supply-chain leakage calculation covering cultivation, transport, and processing, verified by a Verra-approved validation/verification body. Biomass sourcing must be independently traceable (e.g. FSC, PEFC, SBP, ISCC, RSB, RenovaBio certification) to qualify as a removal rather than a reduction.',
      crediting:'Methodology-specific crediting period, set at the parent VM0049 level. Confirm VM0049 and the VMD0059 module are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vm0049-carbon-capture-and-storage/', linkLabel:'Verra: VM0049 Carbon Capture and Storage' },
    { id:'us-vm0039-pavement', country:'US', scheme:'Verra VCS', type:'voluntary', name:'Recycled pavement materials (foamed base / asphalt emulsion)', sector:'industry', techs:['pavement-materials-recycling'],
      summary:"VM0039 credits the emissions avoided when a road project uses full-depth reclamation or cold in-place recycling with a foamed-asphalt or asphalt-emulsion base, instead of quarrying, hauling, and hot-mixing virgin aggregate and binder. It's one of the few methodologies in this database with an explicit US-only geographic scope, so it's a genuine, direct fit rather than an adaptation.",
      additionality:'Performance-standard test against a regional baseline of conventional (virgin-material, hot-mix) pavement construction practice for comparable roads, rather than a project-specific financial test.',
      monitoring:'Baseline and project emissions are calculated from material quantities, haul distances, and equipment fuel use for both the conventional and recycled construction scenarios, verified against contractor and quarry records.',
      crediting:'Methodology-specific crediting period. Confirm VM0039 is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/vm0039-methodology-for-us-of-fsb-in-pavement-application-v1-1/', linkLabel:'Verra: VM0039 Recycled Pavement Materials' },
    { id:'us-vm0043-co2-concrete', country:'US', scheme:'Verra VCS', type:'voluntary', name:'CO2 utilisation in concrete production', sector:'industry', techs:['co2-utilization-concrete'],
      summary:'VM0043 credits captured CO2 that is injected into fresh concrete or used to cure concrete products, where it mineralises and stays permanently bound in the material rather than being released. This is a standalone utilisation pathway distinct from geologic storage, and it pairs naturally with a US grid-electricity baseline (eGRID subregion factors) for the capture and processing energy involved.',
      additionality:'Project-specific barrier or common-practice analysis for adopting CO2 mineralisation equipment at the concrete plant, plus a check that the CO2 source itself is not double-counted against a separate capture-project claim.',
      monitoring:'Metered CO2 injected and verified as mineralised (bound) in the cured product, net of the capture, transport, and injection energy footprint; independent verification against concrete mix-design and batch records.',
      crediting:'Methodology-specific crediting period. Confirm VM0043 is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/vm0043-co2-utilization-in-concrete-production-v1-1/', linkLabel:'Verra: VM0043 CO2 Utilization in Concrete Production' },
    { id:'us-vm0044-biochar', country:'US', scheme:'Verra VCS', type:'voluntary', name:'Biochar utilisation in soil and non-soil applications', sector:'waste', techs:['agroforestry-biochar'],
      summary:'VM0044 credits the carbon permanently sequestered when biomass residues (e.g. wood waste, crop residue, other sustainably sourced feedstock) are pyrolyzed into biochar and applied to soil or used in a durable non-soil product, instead of being left to decompose or burn. This is the only US-eligible pathway in this tool for a biochar production or application project.',
      additionality:'Performance-standard test against regional biomass-residue fate baselines (open burning, field decomposition, landfilling), plus a permanence discount tied to biochar feedstock and pyrolysis-condition class under the methodology\'s stability tables.',
      monitoring:'Feedstock mass and biochar yield metered at the pyrolysis facility, biochar carbon content and H:Corg ratio lab-tested to assign a permanence class, and application or end-use tracked to confirm the biochar is not subsequently combusted.',
      crediting:'Methodology-specific crediting period. Confirm VM0044 is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/vm0044-biochar-utilization-in-soil-and-non-soil-applications-v1-2/', linkLabel:'Verra: VM0044 Biochar Utilization' },
    { id:'us-45q', country:'US', scheme:'IRC Section 45Q (federal tax credit)', type:'tax-credit', name:'Credit for carbon oxide sequestration', sector:'industry', techs:['ccus'],
      summary:'A federal per-tonne tax credit, not a tradeable carbon offset, for CO2 captured and geologically stored, used for enhanced oil recovery, or utilised in qualifying products, including direct air capture.',
      additionality:'Statutory eligibility test (minimum annual capture thresholds by facility type, a construction-start deadline) rather than a registry-style additionality test. The One Big Beautiful Bill Act (2025) added a Foreign Entity of Concern restriction, effective Jan 1 2026: a facility owned or controlled above set thresholds by a covered nation (China, Iran, North Korea, Russia) cannot claim the credit. Check ownership structure before modelling this pathway.',
      monitoring:'MRV plan under 40 CFR Part 98 Subpart RR (or Subpart UU for utilisation), reported annually on IRS Form 8933.',
      crediting:"12-year credit period from the date equipment is placed in service. Under the One Big Beautiful Bill Act (2025), the credit is now a flat $85/tonne for industrial and power capture (storage or utilisation paid the same rate) and $180/tonne for direct air capture, up from the prior use-dependent $60–$130 range. Confirm these figures haven't shifted further against the Form 8933 instructions before modelling project economics.",
      link:'https://www.irs.gov/instructions/i8933', linkLabel:'IRS: Form 8933 instructions' },
    { id:'us-rggi', country:'US', scheme:'RGGI (Regional Greenhouse Gas Initiative)', type:'compliance', name:'Northeast / Mid-Atlantic power-sector cap-and-trade', sector:'energy', techs:['energy-efficiency-generation'],
      summary:'A regional CO2 Budget Trading Program covering fossil-fuel power plants across 11 Northeast/Mid-Atlantic states as of this review. Compliance runs on auctioned allowances, not project-based offsets, and the offset provision has seen negligible use since the early 2010s. Membership has shifted recently: Pennsylvania exited via a Nov 2025 budget action, while Virginia, out since 2023, resumed participation on Jul 1 2026; check current membership before assuming a specific state facility is covered.',
      additionality:'Not applicable: allowance-based cap-and-trade with no active project-crediting pathway for capex today.',
      monitoring:'CEMS-based emissions reporting to RGGI states.',
      crediting:"No practical offset-crediting route; a covered plant's own reductions show up as fewer allowances needed, not a saleable credit.",
      link:'https://www.rggi.org/', linkLabel:'RGGI' },
    { id:'us-voluntary', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Cross-sector voluntary registration', sector:'transport',
      techs:['green-building-retrofit','energy-efficient-lighting-hvac','modal-shift-transit'],
      summary:'US building-efficiency and modal-shift projects generally have no dedicated CARB/CAR/ACR compliance protocol today; the voluntary market is the realistic pathway. EV charging infrastructure now has its own dedicated methodology listed separately below.',
      additionality:'Standard VCS/Gold Standard additionality tests apply (regulatory surplus, investment or barrier analysis, common-practice analysis); these activities face activity-specific, methodology-dependent tests, so confirm an active, non-retired methodology exists for the exact activity before proceeding.',
      monitoring:"Per the specific registry methodology's MRV requirements.",
      crediting:'Methodology-specific. Confirm an active, non-retired methodology exists for the exact activity before proceeding.',
      link:'https://verra.org/programs/verified-carbon-standard/', linkLabel:'Verra: VCS Program' },
    { id:'us-voluntary-energy', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Grid-tied solar & onshore wind (voluntary market)', sector:'energy',
      techs:['solar-pv','wind-onshore'],
      summary:"With no CARB/CAR/ACR compliance protocol crediting grid-tied solar or onshore wind in the US, the voluntary market is the only tracked pathway for this technology, and it is a weak one in most cases today. Confirmed directly from Verra's main renewable-electricity methodology, ACM0002: onshore wind and terrestrial solar PV are restricted to low-, lower-middle-, and upper-middle-income countries only, which excludes the US by World Bank income classification. Only floating solar, wave, and tidal remain globally applicable there; hydro is capped at 15 MW and restricted to Least Developed Countries.",
      additionality:'Grid-tied solar and onshore wind in mature US markets increasingly fail common-practice and financial-additionality tests, and as of ACM0002 the two technologies are not even eligible for US registration in the first place, not just hard to clear. Most major registries have restricted or retired renewable-energy methodologies for these technologies domestically. Expect this to be hard to clear outside unusual local circumstances (e.g. a genuinely underserved grid or an isolated microgrid), and check whether a US project can even register under an eligible technology (floating solar, wave, tidal) before modelling this pathway at all.',
      monitoring:"Per the specific registry methodology's MRV requirements, where an active methodology can still be found.",
      crediting:'Methodology-specific. Most standard grid-tied solar/wind methodologies in mature US markets have been retired, restricted, or made ineligible by income classification; confirm one is still active and open to a US project before proceeding.',
      link:'https://verra.org/methodologies/revision-to-acm0002-grid-connected-electricity-generation-from-renewable-sources/', linkLabel:'Verra: ACM0002 Grid-Connected Renewable Electricity' },
    { id:'us-voluntary-fleet-efficiency', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Vehicle fleet efficiency retrofit (non-EV)', sector:'transport', techs:['fleet-efficiency-retrofit'],
      summary:"Verra's AMS-III.BC credits fuel savings from fleet-wide efficiency measures, such as idling-stop devices, eco-drive/telematics systems, low-rolling-resistance tires, aerodynamic add-ons and engine retrofits, on trucks, buses, cars, taxis, or mobile machinery like excavators and forklifts. It does not cover vehicle replacement or fuel switching; an EV/hybrid fleet swap falls under the separate methodology below instead.",
      additionality:'Requires regulatory surplus, an investment analysis or one of two named barriers (a commercial/legal barrier such as a leased or rented fleet, or the cost of setting up an aggregation mechanism), and a common-practice test: each individual measure must have under 20% market penetration among the relevant vehicle types. A retrofit program a fleet would run anyway for fuel-cost savings alone is unlikely to clear this.',
      monitoring:'Telematics-based fuel/electricity consumption and activity-level tracking (minimum 5,000 km or 200 hours pre-implementation baseline), or a comparable control-group of vehicles, verified by a Verra-approved validation/verification body. From 1 January 2035 no new fossil-fuel vehicles may be added to a project fleet.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.BC and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vmr0004-improved-efficiency-of-fleet-vehicles-v2-0/', linkLabel:'Verra: AMS-III.BC Fleet Vehicle Efficiency' },
    { id:'us-voluntary-ev-fleet', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Electric/hybrid fleet vehicles & mobile machinery', sector:'transport', techs:['ev-hybrid-fleet-vehicles'],
      summary:"Verra's AMS-III.C credits introducing new electric or hybrid vehicles, or electric mobile machinery (forklifts, excavators, airport ground-support equipment), to displace fossil-fuel equivalents. This is about the vehicles/equipment themselves, not the charging infrastructure covered under the EV fleet/charging infrastructure tech elsewhere in this sector.",
      additionality:'Requires regulatory surplus, then either a barrier/investment analysis with common-practice check, or an annual-sales-based test carried over from the original methodology. A fleet electrification driven mainly by total-cost-of-ownership economics (increasingly common for light-duty EVs) will face real scrutiny on the financial-additionality step.',
      monitoring:'Specific fuel and electricity consumption per vehicle/machine (km or operating hours) against a documented baseline, plus a grid emission factor for electricity displacement, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.C and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vmr0014-electric-and-hybrid-vehicles-and-mobile-machinery-ams-iii-c-revision-v1-0/', linkLabel:'Verra: AMS-III.C Electric & Hybrid Vehicles' },
    { id:'us-voluntary-marine-fuels', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Alternative low-carbon marine fuels', sector:'transport', techs:['marine-alt-fuels'],
      summary:'Verra\'s VM0053 credits ships running on green/e-hydrogen, green/e-ammonia, or e-fuels (e-LNG, e-LPG, e-diesel, e-methanol) in place of conventional fossil bunker fuel. Biofuels are explicitly excluded from the eligible fuel list (they show up only as an alternative baseline scenario), and eligibility runs through a positive list rather than a full additionality test.',
      additionality:"Uses an Activity Method: a project is deemed additional simply by meeting the methodology's applicability conditions, since Verra's own analysis found under 0.3% market penetration of these fuels in global shipping as of 2023, well under the 5% common-practice benchmark. This is a genuinely easy additionality case today, unlike most of the other pathways in this library, precisely because the technology is still this rare.",
      monitoring:'Fuel consumption per type, reported through the IMO Ship Fuel Consumption Database (mandatory for ships ≥5,000 GT), and an emissions-intensity factor from IMO life-cycle GHG guidance or the Argonne GREET model, confirmed by an accredited third party at each fuel delivery.',
      crediting:'Methodology-specific crediting period. Confirm VM0053 is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/methodology-for-alternative-low-carbon-fuels-in-shipping/', linkLabel:'Verra: VM0053 Alternative Low-Carbon Marine Fuels' },
    { id:'us-voluntary-marine-shorepower', country:'US', scheme:'Verra VCS / Gold Standard (voluntary market)', type:'voluntary', name:'Shore power / electricity supply for ships', sector:'transport', techs:['marine-shore-power'],
      summary:"Verra's AMS-III.BP credits shore-side electricity supply to docked ships (displacing their onboard fossil-fuel generators), and now also off-shore power buoys supplying ships waiting to dock. The prior restriction to domestic-only shipping routes has been removed, widening this to international calls at a US port.",
      additionality:'Shore-side supply follows the standard small-scale additionality test in the source methodology. Off-shore power buoys use a positive-list Activity Method instead, valid as long as under 5% of eligible ships worldwide use one annually; adoption was effectively at zero when this revision was published, so it currently clears easily, but check current uptake before relying on that.',
      monitoring:'Metered electricity supplied to each ship by source, cross-checked against unique ship IDs to avoid double-counting, verified by a Verra-approved validation/verification body.',
      crediting:'Methodology-specific crediting period. Confirm AMS-III.BP and this revision are still active on the Verra registry before relying on either.',
      link:'https://verra.org/methodologies/vmr0010-electricity-supply-for-ships-v1-0/', linkLabel:'Verra: AMS-III.BP Electricity Supply for Ships' },
    { id:'us-vm0038-ev-charging', country:'US', scheme:'Verra VCS', type:'voluntary', name:'EV charging systems', sector:'transport', techs:['ev-fleet-charging'],
      summary:"VM0038 is a dedicated methodology for EV charging infrastructure itself (L1/L2 AC and DC fast charging, plus any on-site battery storage or dedicated renewables tied to the chargers), crediting the gasoline/diesel miles displaced by the electricity delivered. This replaces the generic cross-sector voluntary pathway previously listed here with a methodology built specifically for charging infrastructure.",
      additionality:'Two routes: meeting a positive list of low-EV-penetration markets/charger types (VMD0049), which is deemed automatically additional, or the standard project route (regulatory surplus plus an investment or barrier analysis, plus a common-practice check). Confirm which route applies before assuming automatic eligibility.',
      monitoring:'Metered electricity delivered per charger, tracked per charging session or at minimum annually, with default US emission and fuel-economy factors available as an alternative to project-specific data. Requires accurately tracing all electricity flows between the grid, any on-site battery or renewables, and the vehicles themselves, which is a real data-infrastructure lift, not just a single utility meter.',
      crediting:'Methodology-specific crediting period. Confirm VM0038 is still active on the Verra registry before relying on it.',
      link:'https://verra.org/methodologies/vm0038-methodology-for-electric-vehicle-charging-systems-v1-0/', linkLabel:'Verra: VM0038 Electric Vehicle Charging Systems' }
  ];

  var REFS = [
    {t:"ICAP: India notifies emission intensity targets for nine sectors under CCTS", u:CCTS_LINK},
    {t:"Indian Carbon Market: CCTS 2026, the complete guide for businesses", u:"https://www.indiancarbonmarket.com/ccts-2026-complete-guide-india"},
    {t:"Bureau of Energy Efficiency: Perform, Achieve and Trade (PAT)", u:"https://beeindia.gov.in/"},
    {t:"California Air Resources Board: Compliance Offset Protocols", u:"https://ww2.arb.ca.gov/our-work/programs/compliance-offset-program/compliance-offset-protocols"},
    {t:"Climate Action Reserve: approved project protocols", u:"https://climateactionreserve.org/"},
    {t:"American Carbon Registry: approved methodologies", u:"https://acrcarbon.org/methodologies/approved-methodologies/"},
    {t:"Verra: Verified Carbon Standard (VCS) Program", u:"https://verra.org/programs/verified-carbon-standard/"},
    {t:"IRS: Instructions for Form 8933 (Section 45Q)", u:"https://www.irs.gov/instructions/i8933"},
    {t:"IEA: Section 45Q credit for carbon oxide sequestration", u:"https://www.iea.org/policies/4986-section-45q-credit-for-carbon-oxide-sequestration"},
    {t:"RGGI: Regional Greenhouse Gas Initiative", u:"https://www.rggi.org/"},
    {t:"Global CCS Institute: 45Q credit changes under the One Big Beautiful Bill Act (2025)", u:"https://www.globalccsinstitute.com/u-s-preserves-and-increases-45q-credit-in-one-big-beautiful-bill-act/"},
    {t:"RGGI: New Participation (state membership updates)", u:"https://www.rggi.org/program-overview-and-design/new-participation"}
  ];

  // ---------- Storage ----------
  var STORAGE_KEY = 'baseline_projects_v1';
  function loadProjects(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(raw) return JSON.parse(raw);
    }catch(e){}
    return null;
  }
  function saveProjects(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); }catch(e){}
  }

  function sampleProjects(){
    var p1 = {
      id:'sample-1', name:'Bellary 42 MW grid-connected solar plant', sector:'energy', tech:'solar-pv',
      countries:['IN'], capex:500000000, currency:'INR', capacity:'42 MW, ~78 GWh/yr', projectType:'greenfield',
      stage:'planning', mandate:'no', financial:'no', common:'somewhat', baseline:'yes', baselineYear:'2026', baselineFile:null,
      monitor:'planned', monitorCal:'unsure', monitorPlan:'in-progress',
      notes:'Greenfield site, PPA under negotiation with a state DISCOM.',
      fin:{ life:25, discount:9, om:5000000, savings:0, reduction:0, price:0 },
      createdAt: Date.now()-1000*60*60*24*3
    };
    var p2 = {
      id:'sample-2', name:'Austin metro 40-port DC fast-charging depot', sector:'transport', tech:'ev-fleet-charging',
      countries:['US'], capex:2500000, currency:'USD', capacity:'40 ports, 500 kW peak load', projectType:'greenfield',
      stage:'construction', mandate:'no', financial:'unsure', common:'somewhat', baseline:'partial', baselineYear:'2025', baselineFile:null,
      monitor:'planned', monitorCal:'unsure', monitorPlan:'no',
      notes:'Depot serving a regional last-mile delivery fleet transition.',
      fin:{ life:10, discount:8, om:100000, savings:0, reduction:0, price:0 },
      createdAt: Date.now()-1000*60*60*24
    };
    var p3 = {
      id:'sample-3', name:'Vadodara ammonia plant CO2 capture retrofit', sector:'industry', tech:'ccus',
      countries:['IN','US'], capex:850000000, currency:'INR', capacity:'~95,000 tCO2e/yr captured, co-fed to urea unit', projectType:'retrofit',
      stage:'planning', mandate:'no', financial:'no', common:'no', baseline:'yes', baselineYear:'2025',
      baselineFile:{name:'reformer-flue-gas-baseline.xlsx', size:84213, type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
      monitor:'planned', monitorCal:'installed-uncertified', monitorPlan:'in-progress',
      notes:'Amine-scrubbing retrofit on existing ammonia reformer flue gas; captured CO2 displaces purchased CO2 for the co-located urea plant. Screened against both jurisdictions on purpose, as a teaching comparison: India’s CCTS has no dedicated industrial-CCUS offset methodology yet, while the same technology has an established voluntary-registry and 45Q tax-credit pathway in the US. Illustrative example for a process-economics / CCUS case study, not a real project.',
      fin:{ life:15, discount:11, om:45000000, savings:20000000, reduction:95000, price:1800 },
      createdAt: Date.now()-1000*60*60*24*6
    };
    p1.results = { IN: assess(p1,'IN') };
    p2.results = { US: assess(p2,'US') };
    p3.results = { IN: assess(p3,'IN'), US: assess(p3,'US') };
    return [p1,p2,p3];
  }

  // ---------- Assessment engine ----------
  function matchMethodologies(sector, tech, country){
    return M.filter(function(m){
      return m.country===country && m.sector===sector && m.techs.indexOf(tech)>-1;
    });
  }

  function assess(p, country){
    var matches = matchMethodologies(p.sector, p.tech, country);
    var noPathway = matches.length===0;

    var reasoning = [];
    if(noPathway){
      reasoning.push('No approved methodology or protocol was found for "'+projectTechLabel(p)+'" in the '+sectorLabel(p.sector)+' sector, for '+countryName(country)+', among the programmes tracked here. That doesn\'t rule out a pathway under a registry not yet covered; it just means none of the tracked programmes currently cover this exact combination. The additionality, baseline and monitoring assessment below still applies, so it isn\'t wasted work if a matching methodology gets added later.');
    }
    var addl = 0;

    if(p.mandate==='no'){ addl+=15; reasoning.push('Not already mandated by existing regulation, which supports a regulatory-surplus additionality claim.'); }
    else if(p.mandate==='yes'){ reasoning.push('Already required by existing law or regulation. This typically disqualifies additionality-based crediting, though it may still generate compliance-mechanism credits (e.g. CCTS/PAT).'); }
    else { addl+=5; reasoning.push('Regulatory status is unsure. Confirm whether this activity is already mandated before relying on additionality.'); }

    var forcedCommonPractice = (country==='US' && (p.tech==='solar-pv' || p.tech==='wind-onshore'));
    if(forcedCommonPractice){
      reasoning.push('Grid-tied solar/onshore wind is now common practice in most US markets. Most registries have restricted or retired additionality for this technology domestically, regardless of project-specific answers.');
    } else {
      if(p.common==='no'){ addl+=10; reasoning.push('Not yet common practice in this sector/region, which supports additionality.'); }
      else if(p.common==='somewhat'){ addl+=5; reasoning.push('Partially established in the sector. Additionality is defensible but not automatic.'); }
      else { reasoning.push('Already common practice in this sector/region: a weak additionality signal.'); }
    }

    if(p.financial==='no'){ addl+=15; reasoning.push('Project is not financially viable without credit revenue, a strong additionality signal.'); }
    else if(p.financial==='yes'){ reasoning.push("Project is financially viable on its own, so registries will scrutinise additionality closely."); }
    else { addl+=5; reasoning.push('Financial viability without credit revenue is unclear. A bankable investment analysis will be needed.'); }

    var bm = 0;
    if(p.baseline==='yes'){ bm+=15; reasoning.push('Quantifiable baseline data is available.'); }
    else if(p.baseline==='partial'){ bm+=8; reasoning.push('Baseline data is only partially available. Close this gap before validation.'); }
    else if(!p.baseline){ reasoning.push("Baseline availability wasn't specified. That's normal for a pilot or academic design at this stage, but treat the score below as provisional until it's answered."); }
    else { reasoning.push('No quantifiable baseline yet, and this is required before any methodology can be applied.'); }

    if(p.baseline==='yes' || p.baseline==='partial'){
      var baselineYearLabel = fmtBaselineYear(p.baselineYear);
      if(baselineYearLabel) reasoning.push('Baseline data is dated to '+baselineYearLabel+'. Confirm it still reflects current operating conditions before it anchors the crediting baseline.');
      if(p.baselineFile && p.baselineFile.name) reasoning.push('Baseline evidence on file: "'+p.baselineFile.name+'" (kept as a filename reference only, so verify the source document itself before relying on it).');
    }

    if(p.monitor==='yes'){ bm+=15; reasoning.push('Metering / MRV capability is already in place.'); }
    else if(p.monitor==='planned'){ bm+=8; reasoning.push('Metering / MRV capability is planned but not yet installed.'); }
    else if(!p.monitor){ reasoning.push("Metering / MRV status wasn't specified. That's normal for a pilot or academic design at this stage, but treat the score below as provisional until it's answered."); }
    else { reasoning.push('No metering / MRV capability identified yet, and this is required for any of the matched pathways.'); }

    if(p.monitor==='yes' || p.monitor==='planned'){
      if(p.monitorCal==='certified'){ reasoning.push('Metering is calibrated/certified to a recognised standard, the level of rigour a verifier will look for.'); }
      else if(p.monitorCal==='installed-uncertified'){ reasoning.push("Metering is installed but not yet calibrated or certified. An uncalibrated meter rarely satisfies a verifier, so this is worth closing before treating MRV as complete."); }
      else if(p.monitorCal==='unsure'){ reasoning.push('Calibration/certification status of the metering is unclear. Confirm it, since this usually decides whether MRV counts as "complete."'); }
      if(p.monitorPlan==='yes'){ reasoning.push('A written monitoring/QA-QC plan exists alongside the metering, and that combination is what most methodologies mean by MRV readiness.'); }
      else if(p.monitorPlan==='in-progress'){ reasoning.push("A monitoring/QA-QC plan is being drafted. The meter alone isn't sufficient without it."); }
      else if(p.monitorPlan==='no'){ reasoning.push('No written monitoring/QA-QC plan yet. A meter is necessary but not sufficient; document who reads it, how often, and how errors get caught.'); }
    }

    if(p.projectType==='retrofit'){
      reasoning.push("Flagged as a retrofit of an existing asset. The baseline is normally the asset's own pre-retrofit performance, not a hypothetical new build, so keep pre-installation readings to support it.");
    } else if(p.projectType==='expansion'){
      reasoning.push('Flagged as an expansion of an existing asset. Scope the baseline and monitoring to the marginal capacity being added, not the whole facility.');
    } else if(p.projectType==='greenfield'){
      reasoning.push("New-build / greenfield project. The whole facility is what's being assessed for additionality, so there's no prior on-site performance to lean on for the baseline.");
    }

    var stagePts = {planning:15, construction:12, 'operational-1':8, 'operational-1plus':2}[p.stage];
    if(stagePts===undefined) stagePts = 8;
    if(p.stage==='planning'){ reasoning.push('Still at planning stage, the strongest position for establishing additionality before an irreversible investment decision.'); }
    else if(p.stage==='operational-1plus'){ reasoning.push('Operating for over a year already. Most methodologies require crediting to start at or before implementation, so a retroactive claim faces added scrutiny.'); }

    var onlyRegulatory = false;
    var fitPts = 0;
    if(!noPathway){
      onlyRegulatory = matches.every(function(m){ return m.type==='regulatory-only'; });
      var hasDedicated = matches.some(function(m){ return m.type!=='voluntary' && m.type!=='regulatory-only'; });
      if(onlyRegulatory){
        fitPts = 0;
        reasoning.push('The only match found is a code-compliance or labelling pathway, not a credit-issuing methodology. Route this activity to a voluntary-market methodology if tradeable credits are the goal.');
      } else if(hasDedicated){
        fitPts = 15;
        reasoning.push('A dedicated, sector-specific methodology or protocol exists for this activity.');
      } else {
        fitPts = 8;
        reasoning.push('Only a general cross-sector voluntary-market pathway was found. Confirm an active, non-retired methodology covers this exact activity before proceeding.');
      }

      if(country==='US' && p.tech==='ccus'){
        reasoning.push('CCUS in the US can potentially stack a Section 45Q federal tax credit with a voluntary-registry claim on the same tonnes, but only if structured to avoid double-claiming. Model both pathways together.');
      }
    }

    var score, category;
    if(noPathway){
      score = 0;
      category = 'no-pathway';
    } else {
      score = Math.min(100, addl + bm + stagePts + fitPts);
      if(onlyRegulatory) category='no-credit-pathway';
      else if(score>=75) category='likely';
      else if(score>=50) category='conditional';
      else category='unlikely';
    }

    // Pilot fit: a structural yes/no independent of the pilot's own (often missing) baseline and
    // monitoring data — "is there a real pathway to credits at all if this were built at industrial
    // scale," not "does this specific pilot's paperwork qualify today." Used to shorten the pilot-mode
    // result to a verdict + a few bullets when the answer is no, instead of the full reasoning list.
    var pilotFit = true, pilotFitBullets = [];
    if(noPathway){
      pilotFit = false;
      pilotFitBullets = [
        'No approved methodology or protocol currently covers "'+projectTechLabel(p)+'" in the '+sectorLabel(p.sector)+' sector, for '+countryName(country)+', among the programmes tracked here.',
        "That doesn't rule it out permanently. It means none of the tracked programmes cover this exact combination today.",
        'Worth re-checking once a matching methodology is added, or comparing against a closely related technology in the Methodology library.'
      ];
    } else if(onlyRegulatory){
      pilotFit = false;
      pilotFitBullets = [
        'The only match found is a code-compliance or labelling pathway, not a credit-issuing methodology.',
        'That earns regulatory compliance, not tradeable carbon credits, at any scale.',
        'A voluntary-market methodology would be the path to actual credits, if one exists for this activity.'
      ];
    } else if(forcedCommonPractice){
      pilotFit = false;
      pilotFitBullets = [
        'Grid-tied solar/onshore wind is now common practice in most US markets.',
        'Most registries have restricted or retired additionality for this technology domestically.',
        'Scaling this pilot to industrial size in the US is unlikely to qualify for additionality-based credits on its own.'
      ];
    } else if(p.mandate==='yes'){
      pilotFit = false;
      pilotFitBullets = [
        'This activity is already required by existing law or regulation.',
        'That typically disqualifies additionality-based crediting at any scale.',
        'A compliance mechanism (e.g. CCTS/PAT) may still apply; that\'s a different pathway than voluntary credits.'
      ];
    }

    return {score:score, category:category, matches:matches, reasoning:reasoning, pilotFit:pilotFit, pilotFitBullets:pilotFitBullets};
  }

  var CATEGORY_LABEL = {
    likely:'Likely eligible', conditional:'Conditionally eligible', unlikely:'Unlikely eligible',
    'no-pathway':'No pathway found', 'no-credit-pathway':'Not a credit pathway'
  };
  var STAGE_LABEL = {
    'planning':'Concept / planning, not yet started', 'construction':'Under construction',
    'operational-1':'Operational, under 1 year', 'operational-1plus':'Operational, over 1 year'
  };
  var MANDATE_LABEL = {
    no:'No, nothing in force requires it', yes:'Yes, a specific rule already mandates it', unsure:'Unsure, not yet checked'
  };
  var FINANCIAL_LABEL = {
    no:'No, needs credit revenue to pencil out', yes:'Yes, viable on its own', unsure:'Unsure, numbers not yet run'
  };
  var COMMON_LABEL = {
    no:'No, still rare', somewhat:'Somewhat established among peers', yes:'Yes, most peers already do this'
  };
  var BASELINE_LABEL = {
    yes:'Available: before/after data exists or can be modelled', partial:'Partial: some data, real gaps remain', no:'Not yet available'
  };
  var MONITOR_LABEL = {
    yes:'In place: metering already installed', planned:'Planned: budgeted or specified, not installed', no:'Not yet identified'
  };
  var MONITOR_CAL_LABEL = {
    certified:'Calibrated / certified to a recognised standard', 'installed-uncertified':'Installed, not yet calibrated or certified', unsure:'Not sure'
  };
  var MONITOR_PLAN_LABEL = {
    yes:'Written monitoring/QA-QC plan exists', 'in-progress':'Being drafted', no:'No written plan yet'
  };
  function fmtBaselineYear(y){
    if(!y) return '';
    if(y==='older') return 'earlier than '+(new Date().getFullYear()-15);
    return String(y);
  }

  // ---------- State ----------
  var projects = loadProjects();
  if(projects===null){ projects = sampleProjects(); saveProjects(); }
  var editingProjectId = null;

  // ---------- Formatting ----------
  function fmtMoney(amount, currency){
    if(amount===null || amount===undefined || amount==='' || isNaN(amount)) return '—';
    try{
      var loc = currency==='INR' ? 'en-IN' : 'en-US';
      return new Intl.NumberFormat(loc, {style:'currency', currency:currency, maximumFractionDigits:0}).format(amount);
    }catch(e){ return currency+' '+amount; }
  }
  function countryName(c){ return c==='IN' ? 'India' : (c==='US' ? 'United States' : c); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }

  // Makes a click-to-expand header (project cards, methodology rows, accordions) keyboard-operable:
  // focusable, announced as a toggle button, and Enter/Space trigger the same click handler the
  // caller already attached. Call after wiring the element's own 'click' listener.
  function bindExpandHead(head){
    head.setAttribute('tabindex', '0');
    head.setAttribute('role', 'button');
    head.setAttribute('aria-expanded', head.parentElement.classList.contains('open') ? 'true' : 'false');
    head.addEventListener('keydown', function(e){
      if(e.key==='Enter' || e.key===' ' || e.key==='Spacebar'){
        e.preventDefault();
        head.click();
      }
    });
  }

  var EMPTY_ICON = '<svg class="empty-icon" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">'+
    '<line x1="4" y1="30" x2="36" y2="30" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/>'+
    '<rect x="9" y="20" width="4" height="10" rx="1" fill="currentColor" opacity="0.35"/>'+
    '<rect x="18" y="14" width="4" height="16" rx="1" fill="currentColor" opacity="0.55"/>'+
    '<rect x="27" y="8" width="4" height="22" rx="1" fill="currentColor"/>'+
    '</svg>';

  // ---------- Render: tabs ----------
  var views = ['home','dashboard','new','credits','calc','permits','ghg','baseline','docs','review','library','about'];
  function showView(id){
    if(id!=='home' && !window.BaselineVisitor && window.BaselineAskVisitor){
      window.BaselineAskVisitor(id);
      return;
    }
    if(id==='calc'){
      var bv = window.BaselineVisitor;
      if(!bv || !bv.email || bv.email.toLowerCase() !== 'ankitapatwa.09@gmail.com') id = 'dashboard';
    }
    views.forEach(function(v){
      document.getElementById('view-'+v).classList.toggle('active', v===id);
    });
    document.querySelectorAll('nav.tabs button').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-view')===id);
    });
    if(id==='permits'){ showPermitList(); }
    if(id==='credits'){ renderCredits(); }
    if(id==='ghg'){
      var gs = document.getElementById('guide-start');
      if(gs) gs.click();
    }
    window.scrollTo({top:0, behavior:'auto'});
    if(typeof centerActiveTab === 'function'){ setTimeout(centerActiveTab, 30); }
  }
  function gotoView(id){
    if(id==='new') setAddMode();
    showView(id);
  }
  window.BaselineGoto = gotoView;
  document.querySelectorAll('nav.tabs button').forEach(function(b){
    b.addEventListener('click', function(){ gotoView(b.getAttribute('data-view')); });
  });
  document.querySelectorAll('[data-goto][data-anchor]').forEach(function(b){
    b.addEventListener('click', function(){
      var a = b.getAttribute('data-anchor');
      setTimeout(function(){
        var el = document.getElementById(a);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }, 60);
    });
  });
  document.querySelectorAll('[data-goto]').forEach(function(b){
    b.addEventListener('click', function(){ gotoView(b.getAttribute('data-goto')); });
  });

  // ---------- Tab bar scroll-fade affordance ----------
  var tabsWrap = document.getElementById('tabsWrap');
  var tabsNav = document.getElementById('tabsNav');
  function updateTabsFade(){
    if(!tabsWrap || !tabsNav) return;
    var maxScroll = tabsNav.scrollWidth - tabsNav.clientWidth;
    tabsWrap.classList.toggle('can-scroll-left', tabsNav.scrollLeft > 4);
    tabsWrap.classList.toggle('can-scroll-right', tabsNav.scrollLeft < maxScroll - 4);
  }
  if(tabsNav){
    tabsNav.addEventListener('scroll', updateTabsFade);
    window.addEventListener('resize', updateTabsFade);
    updateTabsFade();
  }

  // Keep the selected tab visible on narrow screens
  function centerActiveTab(){
    if(!tabsNav) return;
    var a = tabsNav.querySelector('button.active');
    if(a && a.scrollIntoView){
      try{ a.scrollIntoView({inline:'center', block:'nearest', behavior:'smooth'}); }catch(e){ a.scrollIntoView(); }
    }
    updateTabsFade();
  }
  if(tabsNav){
    tabsNav.addEventListener('click', function(){ setTimeout(centerActiveTab, 30); });
    setTimeout(centerActiveTab, 60);
  }

  // Compact the header once the page scrolls
  (function(){
    var ticking = false;
    function onScroll(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){
        document.body.classList.toggle('is-scrolled', window.scrollY > 12);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  })();
  document.getElementById('cancel-new').addEventListener('click', function(){ setAddMode(); showView('dashboard'); });

  // ---------- Render: dashboard ----------
  function bestCategoryRank(cat){
    var order = {likely:4, conditional:3, unlikely:2, 'no-credit-pathway':1, 'no-pathway':0};
    return order[cat]===undefined ? 0 : order[cat];
  }

  function renderStats(){
    var total = projects.length;
    var likely=0, needsAttention=0, noPathway=0;
    projects.forEach(function(p){
      var cats = Object.keys(p.results||{}).map(function(c){ return p.results[c].category; });
      if(cats.length===0) return;
      var best = cats.reduce(function(a,b){ return bestCategoryRank(b)>bestCategoryRank(a) ? b : a; }, cats[0]);
      if(best==='likely') likely++;
      else if(best==='conditional' || best==='unlikely') needsAttention++;
      else noPathway++;
    });
    var stats = [
      {n:total, l:'Total projects', cls:'brand'},
      {n:likely, l:'Likely eligible', cls:'good'},
      {n:needsAttention, l:'Needs attention', cls:'warn'},
      {n:noPathway, l:'No pathway found', cls:'bad'}
    ];
    document.getElementById('stats').innerHTML = stats.map(function(s){
      return '<div class="stat '+s.cls+'"><div class="n num">'+s.n+'</div><div class="l">'+s.l+'</div></div>';
    }).join('');
  }

  // ---------- Footprint & pipeline summary (top of Portfolio) ----------
  function fmtT(t){ if(!t) return '0'; var a=Math.abs(t); return t.toLocaleString(undefined,{maximumFractionDigits:a<1?3:(a<100?2:0)}); }
  function renderFootprint(){
    var el = document.getElementById('dashFootprint');
    if(!el) return;
    var api = window.BaselineGHG;
    var t = api ? api.totals() : null;
    var st = api ? api.state() : null;
    var hasGhg = !!(st && st.rows && st.rows.length);
    var hasProjects = projects.length > 0;
    var screened = projects.some(function(p){ return p.results && Object.keys(p.results).length; });

    var head = hasGhg
      ? '<div class="fp-total"><div class="n">'+fmtT(t.total)+'</div><div class="l">tCO₂e gross · '+esc(st.year||'period not set')+(st.org?' · '+esc(st.org):'')+'</div></div>'
      : '<div class="fp-total"><div class="n">—</div><div class="l">No footprint measured yet</div></div>';

    var scopes = hasGhg
      ? '<div class="stats" style="margin:0;">'+
          [['brand','Scope 1',t[1]],['brand','Scope 2 (location)',t[2]],['brand','Scope 3',t[3]],
           ['good','Scope 2 (market)', st.market===''||st.market==null ? null : parseFloat(st.market)]]
          .map(function(s){ return '<div class="stat '+s[0]+'"><div class="n">'+(s[2]==null?'—':fmtT(s[2]))+'</div><div class="l">'+s[1]+'</div></div>'; }).join('')+
        '</div>'
      : '<p class="hint" style="margin:0;max-width:66ch;">Enter your Scope 1, 2 and 3 activity data to see your footprint here, then export a CSRD / ISSB / SB 253 / BRSR-ready annual report.</p>';

    var steps = [
      {n:'1', label:'Measure the footprint', done:hasGhg, view:'ghg', note: hasGhg ? st.rows.length+' activity line'+(st.rows.length===1?'':'s')+' logged' : 'Not started'},
      {n:'2', label:'Add improvement projects', done:hasProjects, view:'new', note: hasProjects ? projects.length+' project'+(projects.length===1?'':'s')+' in the portfolio' : 'Not started'},
      {n:'3', label:'Screen for carbon credits', done:screened, view:'credits', note: screened ? 'Screening results available' : 'Not started'}
    ];
    var pipeline = '<div class="fp-steps">'+steps.map(function(s){
      return '<button type="button" class="fp-step'+(s.done?' done':'')+'" data-goto="'+s.view+'">'+
        '<span class="fp-num">'+(s.done?'✓':s.n)+'</span>'+
        '<span><span class="fp-lab">'+s.label+'</span><span class="fp-note">'+esc(s.note)+'</span></span></button>';
    }).join('')+'</div>';

    // Coverage: planned reductions vs measured hotspots
    var g = ghgGroupTotals();
    var planned = projects.reduce(function(a,p){ return a + ((p.fin&&p.fin.reduction)||0); }, 0);
    var covered = {};
    projects.forEach(function(p){ (p.ghgLinks||[]).forEach(function(x){ covered[x]=1; }); });
    var hotspots = g.groups.filter(function(x){ return (g.totals[x]||0) > 0; })
      .sort(function(a,b){ return (g.totals[b]||0)-(g.totals[a]||0); });
    var uncovered = hotspots.filter(function(x){ return !covered[x]; });
    var residual = hasGhg ? Math.max((t.total||0) - planned, 0) : null;
    var rev = (window.BaselineReview && window.BaselineReview.summary) ? window.BaselineReview.summary() : null;
    var coverage = !hasGhg ? '' :
      '<div class="fp-cover" style="margin-top:12px;padding-top:12px;border-top:1px solid var(--line);">'+
        '<p class="hint" style="margin:0 0 8px;max-width:76ch;">Planned annual reduction across '+projects.length+' project'+(projects.length===1?'':'s')+': <strong>'+fmtT(planned)+' tCO₂e/yr</strong>'+
          (planned&&t.total ? ' ('+((planned/t.total)*100).toFixed(1)+'% of your footprint)' : '')+
          '. Residual footprint after these projects: <strong>'+fmtT(residual)+' tCO₂e</strong>.</p>'+
        (uncovered.length
          ? '<p class="hint" style="margin:0;max-width:76ch;">'+uncovered.length+(uncovered.length===1?' measured category has':' measured categories have')+' no project yet: '+
              uncovered.slice(0,4).map(function(x){ return '<button type="button" class="linklike" data-newlink="'+esc(x)+'">'+esc(x)+' ('+fmtT(g.totals[x])+' t)</button>'; }).join(', ')+
              (uncovered.length>4?' and '+(uncovered.length-4)+' more':'')+'.</p>'
          : '<p class="hint" style="margin:0;">Every measured category has at least one project against it.</p>')+
        (rev ? '<p class="hint" style="margin:8px 0 0;">Report review status: <strong>'+esc(rev.label)+'</strong>'+(rev.detail?' · '+esc(rev.detail):'')+' · <button type="button" class="linklike" data-goto="review">Open TGS review</button></p>' : '')+
      '</div>';

    el.innerHTML = '<div class="fp-panel">'+
      '<div class="fp-head"><div><div class="gc-title">Current footprint</div>'+head+'</div>'+
      '<div class="fp-actions">'+
        '<button type="button" class="btn small" data-goto="ghg">Open GHG inventory</button>'+
        '<button type="button" class="btn small primary" id="fp-annual"'+(hasGhg?'':' disabled')+'>Export annual report</button>'+
      '</div></div>'+
      scopes + pipeline + coverage +
      (hasGhg?'<p class="hint" style="margin:10px 0 0;max-width:74ch;">The annual report covers CSRD/ESRS E1-6, IFRS S2 (ISSB), California SB 253 and SEBI BRSR Principle 6.</p>':'')+
    '</div>';

    el.querySelectorAll('[data-goto]').forEach(function(b){
      b.addEventListener('click', function(){ gotoView(b.getAttribute('data-goto')); });
    });
    el.querySelectorAll('[data-newlink]').forEach(function(b){
      b.addEventListener('click', function(){
        var grp = b.getAttribute('data-newlink');
        gotoView('new'); setAddMode();
        renderGhgLinkOptions([grp]);
        var wrap = document.getElementById('f-ghg-link-wrap');
        if(wrap) wrap.scrollIntoView({behavior:'smooth', block:'center'});
      });
    });
    var ab = document.getElementById('fp-annual');
    if(ab && hasGhg) ab.addEventListener('click', function(){ window.BaselineGHG.annualReport(); });
  }
  window.__baselineFootprint = renderFootprint;


  function renderGlance(){
    var el = document.getElementById('glanceRow');
    if(!el) return;

    // --- Permits & consent card ---
    var permitsBody, permitsCta;
    if(typeof permits === 'undefined' || permits.length===0){
      permitsBody = 'No permits or consents added yet. Upload one or enter limits manually to start tracking your monthly readings against them.';
      permitsCta = '+ Add a permit or consent';
    } else {
      var counts = {ok:0, approaching:0, exceeded:0, 'no-data':0};
      permits.forEach(function(pm){ counts[permitOverallStatus(pm)]++; });
      var parts = [];
      if(counts.exceeded>0) parts.push(counts.exceeded+' exceeding a limit');
      if(counts.approaching>0) parts.push(counts.approaching+' approaching a limit');
      if(counts['no-data']>0) parts.push(counts['no-data']+' with no readings logged yet');
      var okOnly = counts.ok>0 && parts.length===0;
      if(okOnly){
        permitsBody = permits.length===1 ? 'Your 1 permit is currently within all confirmed limits.' : 'All '+permits.length+' permits are currently within their confirmed limits.';
      } else if(parts.length){
        permitsBody = permits.length+' permit'+(permits.length===1?'':'s')+' tracked: '+parts.join(', ')+'.';
      } else {
        permitsBody = permits.length+' permit'+(permits.length===1?'':'s')+' tracked. Confirm extracted parameters to start seeing status here.';
      }
      permitsCta = 'Review permits & consent →';
    }
    var permitsChipClass = 'no-pathway';
    if(typeof permits !== 'undefined' && permits.length>0){
      var anyExceeded = permits.some(function(pm){ return permitOverallStatus(pm)==='exceeded'; });
      var anyApproaching = permits.some(function(pm){ return permitOverallStatus(pm)==='approaching'; });
      permitsChipClass = anyExceeded ? 'unlikely' : (anyApproaching ? 'conditional' : 'likely');
    }

    // --- Credit opportunities card ---
    var creditsBody, creditsCta;
    var sectorsInPortfolio = [];
    projects.forEach(function(p){
      if(sectorsInPortfolio.indexOf(p.sector)===-1) sectorsInPortfolio.push(p.sector);
    });
    if(sectorsInPortfolio.length===0){
      creditsBody = 'Pick a sector (or screen as a private individual) to see project types that typically qualify for carbon credits in India and the US.';
    } else {
      var labels = sectorsInPortfolio.slice(0,2).map(sectorLabel);
      var extra = sectorsInPortfolio.length>2 ? ' and '+(sectorsInPortfolio.length-2)+' more' : '';
      creditsBody = 'Based on your portfolio (' + labels.join(', ') + extra + '), see which project types under government-approved methodologies could earn credits next.';
    }
    creditsCta = 'Browse credit opportunities →';

    el.innerHTML =
      '<button type="button" class="glance-card" data-goto="permits">'+
        '<div class="gc-head"><span class="gc-title">Permits &amp; consent</span><span class="chip '+permitsChipClass+'" style="font-size:11px;padding:2px 8px;">'+ (typeof permits!=='undefined' && permits.length>0 ? 'Status' : 'Not started') +'</span></div>'+
        '<div class="gc-body">'+esc(permitsBody)+'</div>'+
        '<div class="gc-cta">'+permitsCta+'</div>'+
      '</button>'+
      '<button type="button" class="glance-card" data-goto="credits">'+
        '<div class="gc-head"><span class="gc-title">Credit opportunities</span></div>'+
        '<div class="gc-body">'+esc(creditsBody)+'</div>'+
        '<div class="gc-cta">'+creditsCta+'</div>'+
      '</button>';

    el.querySelectorAll('[data-goto]').forEach(function(b){
      b.addEventListener('click', function(){ gotoView(b.getAttribute('data-goto')); });
    });
  }

  function renderMatch(m){
    return '<div class="match">'+
      '<div class="mscheme">'+esc(m.scheme)+'</div>'+
      '<div class="mname">'+esc(m.name)+'</div>'+
      '<div class="msummary">'+esc(m.summary)+'</div>'+
      '<div style="margin-top:6px;"><a href="'+esc(m.link)+'" target="_blank" rel="noopener">'+esc(m.linkLabel)+' ↗</a></div>'+
    '</div>';
  }

  function renderJurisdictionResult(country, r, isPilot){
    var body;
    if(isPilot && !r.pilotFit){
      // Pilot, and not a structural fit for credits at any scale — a short verdict beats
      // walking through baseline/monitoring detail the pilot doesn't have yet anyway.
      body =
        '<div class="pilot-fit-banner not-fit">Not a fit for carbon credits at industrial scale</div>'+
        '<ul class="reasoning pilot-short">'+r.pilotFitBullets.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>';
    } else {
      body =
        (isPilot ? '<div class="pilot-fit-banner fit">Structurally a fit for carbon credits at industrial scale. The detail below reflects pilot-stage data, so expect the score to firm up once baseline and monitoring are in place.</div>' : '')+
        (r.matches.length ? '<div class="matchlist">'+r.matches.map(renderMatch).join('')+'</div>' : '')+
        '<ul class="reasoning">'+r.reasoning.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>';
    }
    return '<div class="jresult">'+
      '<div class="jresult-head">'+
        '<span class="country">'+countryName(country)+'</span>'+
        '<span class="chip '+r.category+'">'+CATEGORY_LABEL[r.category]+'</span>'+
      '</div>'+
      '<div class="jresult-body">'+body+'</div>'+
    '</div>';
  }

  // ---------- Financial feasibility ----------
  function annuityFactor(r, n){ return r===0 ? n : (1-Math.pow(1+r,-n))/r; }
  function computeNPV(capex, cf, r, n){ return -capex + cf*annuityFactor(r,n); }
  function computeIRR(capex, cf, n){
    // null: cash flow never recovers the capex within the project life — IRR is undefined/negative.
    if(!(cf>0) || cf*n<=capex) return null;
    var f = function(r){ return computeNPV(capex, cf, r, n); };
    var lo=0, hi=5;
    // Infinity: still NPV-positive even at a 500% discount rate — capex is recovered so fast the
    // bisection search can't bracket a rate. This is the opposite of "no result": IRR is off the chart,
    // not undefined, so it must not be reported the same way as the case above.
    if(f(hi)>0) return Infinity;
    for(var i=0;i<60;i++){
      var mid=(lo+hi)/2;
      if(f(mid)>0) lo=mid; else hi=mid;
    }
    return (lo+hi)/2;
  }
  function feasVerdict(cf, npv, payback){
    if(!(cf>0)) return {label:'Not viable at these assumptions', cls:'unlikely'};
    if(npv>0 && payback!==null && payback<=3) return {label:'Strong: fast payback, positive NPV', cls:'likely'};
    if(npv>0 && payback!==null && payback<=7) return {label:'Attractive: positive NPV', cls:'likely'};
    if(npv>0) return {label:'Marginal: positive NPV, long payback', cls:'conditional'};
    return {label:'Weak: negative NPV at this discount rate', cls:'unlikely'};
  }
  function computeFeasibility(p){
    if(!p.capex || p.capex<=0) return null;
    var fin = p.fin || {};
    var life = fin.life;
    var discount = fin.discount;
    if(!life || life<=0 || discount===null || discount===undefined || isNaN(discount)) return null;
    var r = discount/100;
    var om = fin.om||0, savings = fin.savings||0, reduction = fin.reduction||0, price = fin.price||0;
    var creditRevenue = reduction*price;
    function scenario(includeCredits){
      var cf = savings - om + (includeCredits ? creditRevenue : 0);
      var payback = cf>0 ? p.capex/cf : null;
      var npv = computeNPV(p.capex, cf, r, life);
      var irr = computeIRR(p.capex, cf, life);
      return {cf:cf, payback:payback, npv:npv, irr:irr, verdict:feasVerdict(cf,npv,payback)};
    }
    return {
      life:life, discount:discount, om:om, savings:savings, reduction:reduction, price:price, creditRevenue:creditRevenue,
      base: scenario(false), credited: scenario(true)
    };
  }
  function renderFeasibilitySection(p){
    if(!p.capex || p.capex<=0) return '';
    var feas = computeFeasibility(p);
    if(!feas){
      return '<div class="feas-box"><div class="feas-head"><span class="feas-title">Financial feasibility</span></div>'+
        '<div class="feas-body"><div class="feas-empty">Add a project economic life and discount rate (edit the project under "Financial feasibility") to see payback period, NPV and the value of carbon credit revenue.</div></div></div>';
    }
    function fmtYears(y){ return y===null ? 'Never pays back' : (Math.round(y*10)/10)+' yrs'; }
    function fmtPct(x){
      if(x===null) return 'Never recovers capex within the project life';
      if(x===Infinity) return '>500% (capex recovered almost immediately; treat as directional, not literal)';
      return (Math.round(x*1000)/10)+'%';
    }
    function scenarioHtml(label, s, credited){
      return '<div class="feas-scenario'+(credited?' credited':'')+'">'+
        '<div class="fs-label">'+esc(label)+'</div>'+
        '<div class="fs-rows">'+
          '<div class="fs-row"><span class="fs-k">Net annual cash flow</span><span class="fs-v">'+fmtMoney(s.cf,p.currency)+'</span></div>'+
          '<div class="fs-row"><span class="fs-k">Simple payback</span><span class="fs-v">'+fmtYears(s.payback)+'</span></div>'+
          '<div class="fs-row"><span class="fs-k">NPV over '+feas.life+' yrs</span><span class="fs-v">'+fmtMoney(s.npv,p.currency)+'</span></div>'+
          '<div class="fs-row"><span class="fs-k">IRR</span><span class="fs-v">'+fmtPct(s.irr)+'</span></div>'+
        '</div>'+
        '<span class="chip '+s.verdict.cls+'" style="margin-top:8px;display:inline-block;">'+esc(s.verdict.label)+'</span>'+
      '</div>';
    }
    var note = feas.reduction>0
      ? 'At '+feas.reduction+' tCO2e/yr and '+fmtMoney(feas.price,p.currency)+' per tCO2e, carbon credits add '+fmtMoney(feas.creditRevenue,p.currency)+' a year to cash flow. Compare the two scenarios to see how much that shifts payback and NPV. These are scenario numbers from the assumptions entered above, not an audited financial appraisal, and they carry the same "likely/conditional/unlikely" caution as the eligibility screen: credit revenue should only be assumed for years the project is actually generating and selling verified credits.'
      : 'No emission-reduction estimate was entered, so both scenarios below are identical. Add tCO2e/yr and a credit price under "Financial feasibility" on the project form to see the effect of carbon credit revenue on the numbers.';
    return '<div class="feas-box">'+
      '<div class="feas-head"><span class="feas-title">Financial feasibility</span></div>'+
      '<div class="feas-body">'+
        '<div class="feas-scenarios">'+
          scenarioHtml('Without carbon credit revenue', feas.base, false)+
          scenarioHtml('With carbon credit revenue', feas.credited, true)+
        '</div>'+
        '<div class="feas-note">'+esc(note)+'</div>'+
      '</div>'+
    '</div>';
  }

  function renderProjectCard(p){
    var chips = Object.keys(p.results||{}).map(function(c){
      var r = p.results[c];
      return '<span class="chip '+r.category+'">'+countryName(c)+' · '+CATEGORY_LABEL[r.category]+'</span>';
    }).join('');
    var jresults = Object.keys(p.results||{}).map(function(c){ return renderJurisdictionResult(c, p.results[c], p.context==='pilot'); }).join('');
    var feasSection = renderFeasibilitySection(p);
    var notes = p.notes ? '<div class="notes-box">'+esc(p.notes)+'</div>' : '';
    return (
      '<div class="pcard" data-id="'+esc(p.id)+'">'+
        '<div class="pcard-head">'+
          '<div class="pcard-title">'+
            '<h3>'+esc(p.name)+'</h3>'+
            '<div class="pcard-meta">'+
              '<span>'+esc(sectorLabel(p.sector))+' · '+esc(projectTechLabel(p))+'</span>'+
              '<span class="num">'+fmtMoney(p.capex, p.currency)+'</span>'+
              (p.capacity ? '<span>'+esc(p.capacity)+'</span>' : '')+
              (p.projectType ? '<span>'+esc(PROJECT_TYPE_LABEL[p.projectType]||p.projectType)+'</span>' : '')+
              ((p.fin&&p.fin.reduction) ? '<span class="num">'+fmtT(p.fin.reduction)+' tCO₂e/yr cut</span>' : '')+
              ((function(){ var c=costPerTonne(p); return c==null?'':'<span class="num">'+fmtMoney(Math.round(c), p.currency)+' / tCO₂e abated</span>'; })())+
            '</div>'+
            '<div class="pcard-chips">'+chips+
              ((p.ghgLinks&&p.ghgLinks.length) ? p.ghgLinks.map(function(g){ return '<span class="chip">Cuts: '+esc(g)+'</span>'; }).join('') : '')+
            '</div>'+
          '</div>'+
          '<span class="caret">▸</span>'+
        '</div>'+
        '<div class="pcard-body">'+
          jresults+
          feasSection+
          notes+
          '<div class="pcard-foot">'+
            '<span class="hint" style="font-size:11.5px;color:var(--ink-faint);">Added '+new Date(p.createdAt).toLocaleDateString()+'</span>'+
            '<span style="display:flex;gap:8px;">'+
              '<button class="btn small" data-edit="'+esc(p.id)+'">Edit project</button>'+
              '<button class="btn small" data-export="'+esc(p.id)+'">Export PDF</button>'+
              '<button class="btn small danger" data-remove="'+esc(p.id)+'">Remove project</button>'+
            '</span>'+
          '</div>'+
        '</div>'+
      '</div>'
    );
  }

  function renderPortfolio(){
    renderStats();
    renderFootprint();
    renderGlance();
    var list = document.getElementById('plist');
    if(projects.length===0){
      list.innerHTML = '<div class="empty">'+EMPTY_ICON+'<h3>No projects yet</h3><p>Start by measuring your footprint, then add a project for each hotspot and screen it for carbon-credit pathways.</p><button class="btn primary" data-goto="ghg">1 · Measure your footprint</button> <button class="btn" data-goto="new">2 · Add capex project</button></div>';
      list.querySelectorAll('[data-goto]').forEach(function(b){ b.addEventListener('click', function(){ gotoView(b.getAttribute('data-goto')); }); });
      return;
    }
    var sorted = projects.slice().sort(function(a,b){ return b.createdAt - a.createdAt; });
    list.innerHTML = sorted.map(renderProjectCard).join('');
    list.querySelectorAll('.pcard-head').forEach(function(head){
      head.addEventListener('click', function(){
        var open = head.parentElement.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      bindExpandHead(head);
    });
    list.querySelectorAll('[data-remove]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var id = btn.getAttribute('data-remove');
        projects = projects.filter(function(p){ return p.id!==id; });
        saveProjects();
        renderPortfolio();
      });
    });
    list.querySelectorAll('[data-export]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        exportProjectPdf(btn.getAttribute('data-export'));
      });
    });
    list.querySelectorAll('[data-edit]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var proj = projects.find(function(pr){ return pr.id===btn.getAttribute('data-edit'); });
        if(proj) populateFormForEdit(proj);
      });
    });
  }

  // ---------- Business-case export ----------
  var ELIG_RANK = {likely:3, conditional:2, unlikely:1, 'no-credit-pathway':0, 'no-pathway':0};
  function bestEligibility(p){
    var cats = Object.keys(p.results||{}).map(function(c){ return p.results[c].category; });
    if(!cats.length) return null;
    return cats.reduce(function(a,b){ return ELIG_RANK[b]>ELIG_RANK[a] ? b : a; }, cats[0]);
  }
  function overallRecommendation(p, feas){
    var countries = Object.keys(p.results||{});
    var jcount = countries.length;
    var best = bestEligibility(p);
    var likelyCount = countries.filter(function(c){ return p.results[c].category==='likely'; }).length;
    var noPathway = best==='no-pathway' || best==='no-credit-pathway';
    var finVerdict = feas ? feas.credited.verdict.cls : null;

    if(noPathway){
      return {
        cls:'neutral',
        label:'No credit pathway identified',
        headline:'No tracked credit-issuing methodology currently covers this activity.',
        body:'Across the '+jcount+' jurisdiction'+(jcount===1?'':'s')+' screened, no approved carbon-credit pathway was found for this '+
          'sector/technology combination'+(best==='no-credit-pathway' ? ', or only a code-compliance pathway that does not itself issue tradeable credits' : '')+
          '. Evaluate the investment on its standalone economics'+(feas?' (see the feasibility scenarios below)':'')+
          ' and revisit credit eligibility if the regulatory or registry landscape changes.'
      };
    }
    if(best==='likely' && (finVerdict==='likely' || !feas)){
      return {
        cls:'likely',
        label:'Recommended: proceed to baseline development',
        headline:'The project screens as likely eligible'+(likelyCount>1?' in '+likelyCount+' of '+jcount+' jurisdictions':'')+
          (finVerdict==='likely' ? ', and clears an attractive financial bar once credit revenue is included.' : '.'),
        body:'Next step is to commission the mass/energy balance and MRV plan needed to formalise the baseline'+
          (finVerdict==='likely' ? ', then move to methodology registration. The credited-revenue scenario below supports the investment case on its own terms.' : ', then move to methodology registration.')+
          ' Confirm the additionality answers below against the final project design before filing, since registries will test them directly.'
      };
    }
    if(best==='unlikely' || finVerdict==='unlikely'){
      return {
        cls:'unlikely',
        label:'Hold: close the gaps before proceeding',
        headline: best==='unlikely'
          ? 'The eligibility screen scores this project weak. The additionality or MRV case is not yet strong enough to support a credit claim.'
          : 'Eligibility is workable, but the credited-revenue financial case is weak at the assumptions modelled.',
        body:'Address the lowest-scoring inputs below (commonly baseline data, metering/MRV, or an unresolved "already common practice" answer) '+
          'before committing capital on the strength of credit revenue'+(feas ? ', and treat the "without carbon credits" feasibility scenario as the one to underwrite against.' : '.')
      };
    }
    return {
      cls:'conditional',
      label:'Proceed with conditions: further diligence needed',
      headline:'The project is conditionally eligible'+(finVerdict==='conditional'?', and financially marginal even with credit revenue.':'.'),
      body:'This is a defensible but not yet bankable case. Firm up the additionality and MRV answers below, get a second opinion on the matched methodology'+
        (feas ? ', and stress-test the financial feasibility numbers against a lower credit-price scenario' : '')+
        ' before this goes to a capital committee.'
    };
  }

  function buildExportDoc(p){
    var feas = computeFeasibility(p);
    var reco = overallRecommendation(p, feas);
    var countries = Object.keys(p.results||{});

    var metaParts = [sectorLabel(p.sector)+' · '+projectTechLabel(p)];
    if(p.capacity) metaParts.push(p.capacity);
    if(p.projectType) metaParts.push(PROJECT_TYPE_LABEL[p.projectType] || p.projectType);
    metaParts.push(STAGE_LABEL[p.stage] || p.stage);

    var stats = [
      {k:'Capital investment', v: fmtMoney(p.capex, p.currency)},
      {k:'Jurisdictions screened', v: countries.length+': '+(countries.map(countryName).join(', ') || '—')}
    ];
    if(feas && feas.reduction>0){
      stats.push({k:'Est. annual emission reduction', v: feas.reduction.toLocaleString()+' tCO2e/yr'});
      stats.push({k:'Assumed credit price', v: fmtMoney(feas.price, p.currency)+' / tCO2e'});
      stats.push({k:'Annual credit revenue', v: fmtMoney(feas.creditRevenue, p.currency)});
      stats.push({k:'Payback with credits', v: feas.credited.payback===null ? 'never' : (Math.round(feas.credited.payback*10)/10)+' yrs'});
    }

    var isPilot = p.context==='pilot';
    var eligHtml = countries.map(function(c){
      var r = p.results[c];
      if(isPilot && !r.pilotFit){
        return '<div class="ed-juris">'+
          '<div class="ed-juris-head"><span class="country">'+esc(countryName(c))+'</span>'+
          '<span class="chip '+r.category+'">'+esc(CATEGORY_LABEL[r.category])+'</span>'+
          '</div>'+
          '<p style="font-size:11.5px;font-weight:600;margin:0 0 4px;">Not a fit for carbon credits at industrial scale</p>'+
          '<ul class="ed-reasons">'+r.pilotFitBullets.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>'+
        '</div>';
      }
      var methodsHtml = r.matches.length
        ? '<div class="ed-methods">'+r.matches.map(function(m){
            return '<div class="em-item"><span class="em-scheme">'+esc(m.scheme)+'</span>: '+esc(m.name)+'</div>';
          }).join('')+'</div>'
        : '';
      return '<div class="ed-juris">'+
        '<div class="ed-juris-head"><span class="country">'+esc(countryName(c))+'</span>'+
        '<span class="chip '+r.category+'">'+esc(CATEGORY_LABEL[r.category])+'</span>'+
        (r.matches.length ? '<span class="score">score '+r.score+'/100</span>' : '')+
        '</div>'+
        (isPilot ? '<p style="font-size:11.5px;font-weight:600;margin:0 0 4px;">Structurally a fit for carbon credits at industrial scale; detail below reflects pilot-stage data.</p>' : '')+
        '<ul class="ed-reasons">'+r.reasoning.map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul>'+
        methodsHtml+
      '</div>';
    }).join('');

    var feasHtml;
    if(!feas){
      feasHtml = '<p style="font-size:12px;color:#666;">Economic life and discount rate were not supplied for this project, so no payback/NPV/IRR scenario could be modelled.</p>';
    } else {
      function fmtYears(y){ return y===null ? 'never' : (Math.round(y*10)/10)+' yrs'; }
      function fmtPct(x){ return x===null ? 'never' : x===Infinity ? '>500%' : (Math.round(x*1000)/10)+'%'; }
      feasHtml =
        '<table class="ed-table"><thead><tr><th>Metric</th><th class="num">Without credits</th><th class="num">With credits</th></tr></thead><tbody>'+
          '<tr><td>Net annual cash flow</td><td class="num">'+fmtMoney(feas.base.cf,p.currency)+'</td><td class="num">'+fmtMoney(feas.credited.cf,p.currency)+'</td></tr>'+
          '<tr><td>Simple payback</td><td class="num">'+fmtYears(feas.base.payback)+'</td><td class="num">'+fmtYears(feas.credited.payback)+'</td></tr>'+
          '<tr><td>NPV over '+feas.life+' yrs</td><td class="num">'+fmtMoney(feas.base.npv,p.currency)+'</td><td class="num">'+fmtMoney(feas.credited.npv,p.currency)+'</td></tr>'+
          '<tr><td>IRR</td><td class="num">'+fmtPct(feas.base.irr)+'</td><td class="num">'+fmtPct(feas.credited.irr)+'</td></tr>'+
          '<tr class="credited"><td>Verdict</td><td class="num">'+esc(feas.base.verdict.label)+'</td><td class="num">'+esc(feas.credited.verdict.label)+'</td></tr>'+
        '</tbody></table>'+
        '<p style="font-size:11px;color:#666;margin-top:8px;line-height:1.6;">'+esc(
          feas.reduction>0
            ? 'At '+feas.reduction.toLocaleString()+' tCO2e/yr and '+fmtMoney(feas.price,p.currency)+' per tCO2e, carbon credits add '+fmtMoney(feas.creditRevenue,p.currency)+' a year to cash flow. These are scenario numbers from the assumptions below, not an audited financial appraisal; credit revenue should only be underwritten for years the project is actually generating and selling verified credits.'
            : 'No emission-reduction estimate was entered, so both scenarios above are identical.'
        )+'</p>';
    }

    var assumptions = [
      ['Project type', PROJECT_TYPE_LABEL[p.projectType] || p.projectType || '—'],
      ['Project stage', STAGE_LABEL[p.stage] || p.stage],
      ['Already legally required?', MANDATE_LABEL[p.mandate] || p.mandate],
      ['Viable without carbon credits?', FINANCIAL_LABEL[p.financial] || p.financial],
      ['Already common practice here?', COMMON_LABEL[p.common] || p.common],
      ['Baseline data available?', BASELINE_LABEL[p.baseline] || p.baseline],
      ['Metering / MRV in place?', MONITOR_LABEL[p.monitor] || p.monitor]
    ];
    var baselineYearLabel = fmtBaselineYear(p.baselineYear);
    if(baselineYearLabel) assumptions.push(['Baseline data year', baselineYearLabel]);
    if(p.baselineFile && p.baselineFile.name) assumptions.push(['Baseline evidence on file', p.baselineFile.name+' (filename reference only)']);
    if(p.monitorCal) assumptions.push(['Metering calibration / standard', MONITOR_CAL_LABEL[p.monitorCal] || p.monitorCal]);
    if(p.monitorPlan) assumptions.push(['Monitoring / QA-QC plan documented?', MONITOR_PLAN_LABEL[p.monitorPlan] || p.monitorPlan]);
    if(feas){
      assumptions.push(['Project economic life', feas.life+' years']);
      assumptions.push(['Discount rate / cost of capital', feas.discount+'%']);
      assumptions.push(['Extra annual O&M cost', fmtMoney(feas.om,p.currency)]);
      assumptions.push(['Expected annual savings (excl. credits)', fmtMoney(feas.savings,p.currency)]);
      assumptions.push(['Est. annual emission reduction', feas.reduction>0 ? feas.reduction.toLocaleString()+' tCO2e/yr' : 'Not yet estimated']);
      assumptions.push(['Assumed carbon credit price', feas.reduction>0 ? fmtMoney(feas.price,p.currency)+' / tCO2e' : 'Not yet estimated']);
    }
    var assumpHtml = '<table class="ed-assump">'+assumptions.map(function(row){
      return '<tr><td class="k">'+esc(row[0])+'</td><td class="v">'+esc(String(row[1]))+'</td></tr>';
    }).join('')+'</table>';

    var notesHtml = p.notes
      ? '<div class="ed-section"><h2>Notes</h2><p style="font-size:12px;color:#444;white-space:pre-wrap;line-height:1.6;">'+esc(p.notes)+'</p></div>'
      : '';

    return (
      '<div class="ed-cover">'+
        '<div class="ed-eyebrow">Capital project: carbon credit business case</div>'+
        '<h1 class="ed-title">'+esc(p.name)+'</h1>'+
        '<div class="ed-meta">'+esc(metaParts.join(' · '))+'</div>'+
        '<div class="ed-prepared">Prepared '+esc(new Date().toLocaleString())+' from Baseline\'s screening data. Screening aid, not a legal, '+
        'regulatory or financial determination. Verify every result against the primary source links before it informs a capital decision.</div>'+
      '</div>'+
      '<div class="ed-reco '+reco.cls+'">'+
        '<div class="ed-reco-label">Recommendation</div>'+
        '<div class="ed-reco-head">'+esc(reco.label)+'</div>'+
        '<div class="ed-reco-body">'+esc(reco.headline)+' '+esc(reco.body)+'</div>'+
      '</div>'+
      '<div class="ed-stats">'+stats.map(function(s){
        return '<div class="ed-stat"><div class="ed-stat-k">'+esc(s.k)+'</div><div class="ed-stat-v">'+esc(s.v)+'</div></div>';
      }).join('')+'</div>'+
      '<div class="ed-section"><h2>Carbon credit eligibility by jurisdiction</h2>'+eligHtml+'</div>'+
      '<div class="ed-section"><h2>Financial feasibility</h2>'+feasHtml+'</div>'+
      '<div class="ed-section"><h2>Basis of the assessment</h2>'+assumpHtml+'</div>'+
      notesHtml+
      '<div class="ed-footer"><strong>Basis of preparation.</strong> This document is generated by Baseline, an internal capex screening tool, '+
      'from the project inputs and researched methodology data on file. Eligibility scores and financial scenarios are indicative screening outputs, '+
      'not a legal opinion, a registry pre-assessment, or an audited financial appraisal. Confirm every result against the underlying programme rules '+
      'and current market pricing before it informs a capital allocation decision.</div>'
    );
  }

  // ---------- PDF export (browser print, no library/network needed) ----------
  function exportProjectPdf(id){
    var p = projects.find(function(x){ return x.id===id; });
    if(!p) return;
    document.body.classList.add('printing');
    var doc = document.createElement('div');
    doc.id = 'export-doc';
    doc.className = 'export-doc';
    doc.innerHTML = buildExportDoc(p);
    document.body.insertBefore(doc, document.body.firstChild);
    function cleanup(){
      document.body.classList.remove('printing');
      if(doc.parentNode) doc.parentNode.removeChild(doc);
      window.removeEventListener('afterprint', cleanup);
    }
    window.addEventListener('afterprint', cleanup);
    setTimeout(function(){
      window.print();
      setTimeout(cleanup, 1000); // fallback in case afterprint doesn't fire (some mobile browsers)
    }, 50);
  }

  // ---------- Render: new project form ----------
  var sectorSel = document.getElementById('f-sector');
  var techSel = document.getElementById('f-tech');
  var techCustomWrap = document.getElementById('f-tech-custom-wrap');
  var techCustomInput = document.getElementById('f-tech-custom');
  var CUSTOM_TECH_OPTION = '<option value="custom">Other / custom technology…</option>';
  sectorSel.innerHTML = SECTORS.map(function(s){ return '<option value="'+s.id+'">'+esc(s.label)+'</option>'; }).join('');
  function refreshTechOptions(){
    var s = SECTORS.find(function(x){ return x.id===sectorSel.value; });
    techSel.innerHTML = (s?s.techs:[]).map(function(t){ return '<option value="'+t.id+'">'+esc(t.label)+'</option>'; }).join('') + CUSTOM_TECH_OPTION;
    updateTechCustomVisibility();
  }
  function updateTechCustomVisibility(){
    var isCustom = techSel.value === 'custom';
    techCustomWrap.style.display = isCustom ? '' : 'none';
    techCustomInput.required = isCustom;
    if(!isCustom) techCustomInput.value = '';
  }
  sectorSel.addEventListener('change', refreshTechOptions);
  techSel.addEventListener('change', updateTechCustomVisibility);
  refreshTechOptions();

  // ---------- Project context: pilot mode relaxes required fields ----------
  var contextSel = document.getElementById('f-context');
  var PILOT_OPTIONAL_IDS = ['f-baseline', 'f-monitor', 'f-fin-life', 'f-fin-discount'];
  function updateRequiredForContext(){
    var isPilot = contextSel.value === 'pilot';
    document.getElementById('pform').classList.toggle('pilot-mode', isPilot);
    PILOT_OPTIONAL_IDS.forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.required = !isPilot;
    });
  }
  contextSel.addEventListener('change', updateRequiredForContext);
  updateRequiredForContext();

  // ---------- Capacity / output: value + unit dropdown ----------
  var capacityUnitSel = document.getElementById('f-capacity-unit');
  var capacityUnitCustom = document.getElementById('f-capacity-unit-custom');
  function updateCapacityUnitVisibility(){
    capacityUnitCustom.style.display = capacityUnitSel.value==='other' ? '' : 'none';
  }
  capacityUnitSel.addEventListener('change', updateCapacityUnitVisibility);
  function composeCapacity(){
    var value = document.getElementById('f-capacity-value').value.trim();
    var unit = capacityUnitSel.value==='other' ? capacityUnitCustom.value.trim() : capacityUnitSel.value;
    var detail = document.getElementById('f-capacity-detail').value.trim();
    var parts = [];
    if(value) parts.push(value+(unit ? ' '+unit : ''));
    else if(unit) parts.push(unit);
    if(detail) parts.push(detail);
    return parts.join(', ');
  }

  // ---------- Currency sync: capex currency <-> Financial feasibility currency ----------
  var currencySel = document.getElementById('f-currency');
  var finCurrencySel = document.getElementById('f-fin-currency');
  currencySel.addEventListener('change', function(){ finCurrencySel.value = currencySel.value; refreshPricePresets(); });
  finCurrencySel.addEventListener('change', function(){ currencySel.value = finCurrencySel.value; refreshPricePresets(); });

  // ---------- Baseline data: year + evidence file (progressive disclosure) ----------
  var baselineSel = document.getElementById('f-baseline');
  var baselineDetailWrap = document.getElementById('f-baseline-detail-wrap');
  var baselineYearSel = document.getElementById('f-baseline-year');
  var baselineFileInput = document.getElementById('f-baseline-file');
  (function populateBaselineYears(){
    var thisYear = new Date().getFullYear();
    var opts = ['<option value="" selected>Not specified</option>'];
    for(var y=thisYear; y>=thisYear-15; y--){ opts.push('<option value="'+y+'">'+y+'</option>'); }
    opts.push('<option value="older">Earlier than '+(thisYear-15)+'</option>');
    baselineYearSel.innerHTML = opts.join('');
  })();
  function updateBaselineDetailVisibility(){
    baselineDetailWrap.style.display = (baselineSel.value==='yes' || baselineSel.value==='partial') ? '' : 'none';
  }
  baselineSel.addEventListener('change', updateBaselineDetailVisibility);
  updateBaselineDetailVisibility();

  // ---------- Metering / MRV: what "complete" means (progressive disclosure) ----------
  var monitorSel = document.getElementById('f-monitor');
  var monitorDetailWrap = document.getElementById('f-monitor-detail-wrap');
  function updateMonitorDetailVisibility(){
    monitorDetailWrap.style.display = (monitorSel.value==='yes' || monitorSel.value==='planned') ? '' : 'none';
  }
  monitorSel.addEventListener('change', updateMonitorDetailVisibility);
  updateMonitorDetailVisibility();

  // ---------- Credit price: reference-point presets for "I don't know a number" ----------
  var pricePresetSel = document.getElementById('f-fin-price-preset');
  var priceInput = document.getElementById('f-fin-price');
  function refreshPricePresets(){
    var currency = currencySel.value;
    // Illustrative anchors spanning the real spread of voluntary-market prices: cheap nature-based/
    // avoidance credits at one end, scarce engineered-removal credits at the other, not a single flat
    // guess. USD figures are the anchors; INR figures are those same anchors FX-converted (~₹90/$1,
    // rounded), not a separately sourced India price, since CCTS/PAT don't yet have a liquid reference price.
    var opts = ['<option value="" selected>Pick a reference point, or type your own below</option>'];
    if(currency==='USD'){
      opts.push('<option value="5">Nature-based / avoidance (illustrative, ~$5/tCO2e)</option>');
      opts.push('<option value="20">Mainstream voluntary-market technology (illustrative, ~$20/tCO2e)</option>');
      opts.push('<option value="120">Engineered removal / DAC-adjacent (illustrative, ~$120/tCO2e)</option>');
    } else {
      opts.push('<option value="450">Nature-based / avoidance (illustrative, ~₹450/tCO2e)</option>');
      opts.push('<option value="1800">Mainstream voluntary-market technology (illustrative, ~₹1,800/tCO2e)</option>');
      opts.push('<option value="10800">Engineered removal / DAC-adjacent (illustrative, ~₹10,800/tCO2e)</option>');
    }
    var isCCUS = techSel.value==='ccus';
    var usChecked = document.querySelector('input[name=country][value=US]');
    if(isCCUS && currency==='USD' && usChecked && usChecked.checked){
      opts.push('<option value="85">US 45Q, industrial/power capture ($85/tonne, 2025 statutory rate)</option>');
      opts.push('<option value="180">US 45Q, direct air capture ($180/tonne, 2025 statutory rate)</option>');
    }
    pricePresetSel.innerHTML = opts.join('');
  }
  pricePresetSel.addEventListener('change', function(){
    if(pricePresetSel.value) priceInput.value = pricePresetSel.value;
  });
  [sectorSel, techSel].forEach(function(el){ el.addEventListener('change', refreshPricePresets); });
  document.querySelectorAll('input[name=country]').forEach(function(cb){ cb.addEventListener('change', refreshPricePresets); });
  refreshPricePresets();

  // ---------- Add-project form: jump-nav + section progress ----------
  (function initFormJumpNav(){
    var nav = document.getElementById('form-jumpnav');
    if(!nav) return;
    var buttons = Array.prototype.slice.call(nav.querySelectorAll('[data-jump]'));
    var sections = buttons.map(function(btn){ return document.getElementById(btn.getAttribute('data-jump')); });

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var target = document.getElementById(btn.getAttribute('data-jump'));
        if(!target) return;
        var header = document.querySelector('header.top');
        var headerH = header ? header.offsetHeight : 0;
        var y = target.getBoundingClientRect().top + window.pageYOffset - headerH - 14;
        window.scrollTo({top: Math.max(0,y), behavior:'smooth'});
      });
    });

    if('IntersectionObserver' in window){
      var header = document.querySelector('header.top');
      var headerH = header ? header.offsetHeight : 80;
      var observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var idx = sections.indexOf(entry.target);
          if(idx===-1) return;
          if(entry.isIntersecting){
            buttons.forEach(function(b,i){ b.classList.toggle('active', i===idx); });
          }
        });
      }, {rootMargin: '-'+(headerH+16)+'px 0px -70% 0px', threshold: 0});
      sections.forEach(function(s){ if(s) observer.observe(s); });
    }
  })();

  document.getElementById('pform').addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('f-name').value.trim();
    var sector = sectorSel.value;
    var tech = techSel.value;
    var techCustom = techCustomInput.value.trim();
    var countries = Array.prototype.slice.call(document.querySelectorAll('input[name=country]:checked')).map(function(c){ return c.value; });
    if(!name || countries.length===0){
      alert('Give the project a name and select at least one jurisdiction to screen.');
      return;
    }
    if(tech==='custom' && !techCustom){
      alert('Name the custom technology / activity, or pick one from the list.');
      return;
    }
    var isEdit = !!editingProjectId;
    var existing = isEdit ? projects.find(function(pr){ return pr.id===editingProjectId; }) : null;
    if(isEdit && !existing) isEdit = false; // edited project was removed elsewhere — fall back to adding new
    var p = {
      id: isEdit ? existing.id : 'p-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),
      name: name, context: contextSel.value || 'industrial', sector: sector, tech: tech, techCustom: tech==='custom' ? techCustom : '', countries: countries,
      capex: parseFloat(document.getElementById('f-capex').value) || null,
      currency: document.getElementById('f-currency').value,
      capacity: composeCapacity(),
      stage: document.getElementById('f-stage').value,
      projectType: document.getElementById('f-projtype').value,
      mandate: document.getElementById('f-mandate').value,
      financial: document.getElementById('f-financial').value,
      common: document.getElementById('f-common').value,
      baseline: document.getElementById('f-baseline').value,
      baselineYear: document.getElementById('f-baseline-year').value,
      baselineFile: (function(){
        var f = baselineFileInput.files && baselineFileInput.files[0];
        if(f) return { name: f.name, size: f.size, type: f.type };
        return (isEdit && existing.baselineFile) ? existing.baselineFile : null;
      })(),
      monitor: document.getElementById('f-monitor').value,
      monitorCal: document.getElementById('f-monitor-cal').value,
      monitorPlan: document.getElementById('f-monitor-plan').value,
      notes: document.getElementById('f-notes').value.trim(),
      fin: {
        life: parseFloat(document.getElementById('f-fin-life').value) || null,
        discount: parseFloat(document.getElementById('f-fin-discount').value),
        om: parseFloat(document.getElementById('f-fin-om').value) || 0,
        savings: parseFloat(document.getElementById('f-fin-savings').value) || 0,
        reduction: parseFloat(document.getElementById('f-fin-reduction').value) || 0,
        price: parseFloat(document.getElementById('f-fin-price').value) || 0
      },
      ghgLinks: selectedGhgLinks(),
      createdAt: isEdit ? existing.createdAt : Date.now()
    };
    if(isNaN(p.fin.discount)) p.fin.discount = null;
    p.results = {};
    countries.forEach(function(c){ p.results[c] = assess(p, c); });
    if(isEdit){
      var idx = projects.findIndex(function(pr){ return pr.id===existing.id; });
      projects[idx] = p;
    } else {
      projects.push(p);
    }
    saveProjects();
    setAddMode();
    renderPortfolio();
    showView('dashboard');
  });

  // ---------- Link projects to measured emissions ----------
  function ghgGroupTotals(){
    var api = window.BaselineGHG;
    if(!api) return {groups:[], totals:{}, total:0};
    var t = api.totals(), gt = t.group||{};
    var groups = (api.groups||[]).slice();
    return {groups:groups, totals:gt, total:t.total||0};
  }
  function renderGhgLinkOptions(selected){
    var box = document.getElementById('f-ghg-links');
    if(!box) return;
    var g = ghgGroupTotals();
    selected = selected || [];
    var measured = g.groups.filter(function(x){ return (g.totals[x]||0) > 0; });
    var rest = g.groups.filter(function(x){ return !(g.totals[x]>0); });
    var order = measured.concat(rest);
    if(!order.length){
      box.innerHTML = '<span class="hint">Measure your footprint first; the GHG inventory categories will appear here.</span>';
      return;
    }
    box.innerHTML = order.map(function(x){
      var v = g.totals[x]||0;
      return '<label><input type="checkbox" name="ghglink" value="'+esc(x)+'"'+(selected.indexOf(x)>-1?' checked':'')+'> '+esc(x)+
        (v>0 ? ' <span style="color:var(--ink-faint);">· '+fmtT(v)+' tCO₂e</span>' : ' <span style="color:var(--ink-faint);">· no data</span>')+'</label>';
    }).join('');
    box.querySelectorAll('input[name=ghglink]').forEach(function(cb){ cb.addEventListener('change', updateGhgLinkOut); });
    var red = document.getElementById('f-fin-reduction');
    if(red && !red.__ghgBound){ red.__ghgBound = true; red.addEventListener('input', updateGhgLinkOut); }
    updateGhgLinkOut();
  }
  function selectedGhgLinks(){
    return Array.prototype.slice.call(document.querySelectorAll('input[name=ghglink]:checked')).map(function(cb){ return cb.value; });
  }
  function updateGhgLinkOut(){
    var out = document.getElementById('f-ghg-link-out');
    if(!out) return;
    var g = ghgGroupTotals(), sel = selectedGhgLinks();
    if(!sel.length){ out.innerHTML = ''; return; }
    var base = sel.reduce(function(a,x){ return a + (g.totals[x]||0); }, 0);
    var red = parseFloat((document.getElementById('f-fin-reduction')||{}).value) || 0;
    var msg = 'Selected categories emit <strong>'+fmtT(base)+' tCO₂e</strong> today';
    if(g.total) msg += ' ('+((base/g.total)*100).toFixed(1)+'% of your footprint)';
    msg += '.';
    if(red>0 && base>0){
      var share = (red/base)*100;
      msg += ' Your '+fmtT(red)+' tCO₂e/yr reduction is <strong>'+share.toFixed(1)+'%</strong> of that.';
      if(red > base) msg += ' <span style="color:var(--bad,#b4232a);font-weight:600;">The reduction is larger than the measured emissions in these categories. Check the figure or the category selection.</span>';
    } else if(red>0 && base===0){
      msg += ' No measured emissions in these categories yet, so the reduction cannot be checked against data.';
    }
    out.innerHTML = msg;
  }
  function costPerTonne(p){
    var life = p.fin && p.fin.life, red = p.fin && p.fin.reduction, cap = p.capex;
    if(!life || !red || !cap) return null;
    return cap / (life * red);
  }

  // ---------- Add/edit form mode ----------
  function setAddMode(){
    editingProjectId = null;
    document.getElementById('pform-heading').textContent = 'Add a capex project';
    document.getElementById('pform-submit-btn').textContent = 'Run eligibility assessment';
    document.getElementById('pform').reset();
    refreshTechOptions();
    document.querySelector('input[name=country][value=IN]').checked = true;
    updateRequiredForContext();
    updateBaselineDetailVisibility();
    updateMonitorDetailVisibility();
    updateCapacityUnitVisibility();
    refreshPricePresets();
    renderGhgLinkOptions([]);
  }

  function populateFormForEdit(p){
    editingProjectId = p.id;
    document.getElementById('pform-heading').textContent = 'Edit capex project';
    document.getElementById('pform-submit-btn').textContent = 'Save changes';

    document.getElementById('f-name').value = p.name || '';
    contextSel.value = p.context || 'industrial';
    updateRequiredForContext();
    sectorSel.value = p.sector || '';
    refreshTechOptions();
    techSel.value = p.tech || '';
    updateTechCustomVisibility();
    if(p.tech==='custom') techCustomInput.value = p.techCustom || '';
    document.getElementById('f-projtype').value = p.projectType || '';
    document.querySelectorAll('input[name=country]').forEach(function(cb){
      cb.checked = (p.countries||[]).indexOf(cb.value) > -1;
    });
    currencySel.value = p.currency || 'INR';
    document.getElementById('f-capex').value = (p.capex!==null && p.capex!==undefined) ? p.capex : '';
    document.getElementById('f-stage').value = p.stage || '';
    // Capacity was stored as a single composed string — restore it into the free-text detail
    // field rather than guessing how to split it back into value/unit.
    document.getElementById('f-capacity-value').value = '';
    capacityUnitSel.value = '';
    capacityUnitCustom.value = '';
    document.getElementById('f-capacity-detail').value = p.capacity || '';
    updateCapacityUnitVisibility();
    document.getElementById('f-mandate').value = p.mandate || '';
    document.getElementById('f-financial').value = p.financial || '';
    document.getElementById('f-common').value = p.common || '';
    document.getElementById('f-baseline').value = p.baseline || '';
    updateBaselineDetailVisibility();
    baselineYearSel.value = p.baselineYear || '';
    document.getElementById('f-monitor').value = p.monitor || '';
    updateMonitorDetailVisibility();
    document.getElementById('f-monitor-cal').value = p.monitorCal || '';
    document.getElementById('f-monitor-plan').value = p.monitorPlan || '';
    finCurrencySel.value = p.currency || 'INR';
    document.getElementById('f-fin-life').value = (p.fin && p.fin.life!=null) ? p.fin.life : '';
    document.getElementById('f-fin-discount').value = (p.fin && p.fin.discount!=null) ? p.fin.discount : '';
    document.getElementById('f-fin-om').value = (p.fin && p.fin.om) ? p.fin.om : '';
    document.getElementById('f-fin-savings').value = (p.fin && p.fin.savings) ? p.fin.savings : '';
    document.getElementById('f-fin-reduction').value = (p.fin && p.fin.reduction) ? p.fin.reduction : '';
    document.getElementById('f-fin-price').value = (p.fin && p.fin.price) ? p.fin.price : '';
    refreshPricePresets();
    document.getElementById('f-notes').value = p.notes || '';
    renderGhgLinkOptions(p.ghgLinks || []);

    showView('new');
  }

  // ---------- Credit opportunities ----------
  var creditEntityMode = 'industry';

  function classifyOpportunity(m){
    var text = ((m.additionality||'')+' '+(m.crediting||'')).toLowerCase();
    if(/common practice|restricted or retired|increasingly fail|already common|no active|negligible use|not applicable|no practical/.test(text)) return 'caution';
    if(m.type==='voluntary' || m.type==='compliance-adjacent') return 'moderate';
    return 'strong';
  }
  var STRENGTH_LABEL = {strong:'Strong opportunity', moderate:'Worth pursuing', caution:'Proceed with caution'};
  var STRENGTH_CHIP = {strong:'likely', moderate:'conditional', caution:'unlikely'};
  var STRENGTH_RANK = {strong:2, moderate:1, caution:0};

  function industryRecommendations(sector, countries){
    var relevant = M.filter(function(m){
      return m.sector===sector && countries.indexOf(m.country)>-1 && m.type!=='regulatory-only' && m.id!=='us-rggi';
    });
    // First, group by country+tech (one bucket of methodology entries per tech)...
    var byTech = {};
    relevant.forEach(function(m){
      m.techs.forEach(function(t){
        var key = m.country+'|'+t;
        if(!byTech[key]) byTech[key] = {country:m.country, tech:t, entries:[]};
        byTech[key].entries.push(m);
      });
    });
    // ...then merge techs that resolve to the exact same set of methodologies into one card,
    // so e.g. 8 Energy & Power techs all covered by the same CCTS entry don't render as 8 near-identical cards.
    var byMethodSet = {};
    Object.keys(byTech).forEach(function(k){
      var te = byTech[k];
      var sig = te.country+'|'+te.entries.map(function(e){ return e.id; }).sort().join(',');
      if(!byMethodSet[sig]) byMethodSet[sig] = {country:te.country, techs:[], entries:te.entries};
      byMethodSet[sig].techs.push(te.tech);
    });
    var list = Object.keys(byMethodSet).map(function(k){ return byMethodSet[k]; });
    list.forEach(function(item){
      item.techs.sort(function(a,b){ return techLabel(sector,a) < techLabel(sector,b) ? -1 : 1; });
      var strengths = item.entries.map(classifyOpportunity);
      item.strength = strengths.reduce(function(a,b){ return STRENGTH_RANK[b]>STRENGTH_RANK[a] ? b : a; }, 'caution');
    });
    list.sort(function(a,b){
      var d = STRENGTH_RANK[b.strength]-STRENGTH_RANK[a.strength];
      if(d!==0) return d;
      return techLabel(sector,a.techs[0]) < techLabel(sector,b.techs[0]) ? -1 : 1;
    });
    return list;
  }

  function renderIndustryOppoCard(item){
    var sector = item.sector||document.getElementById('cr-sector').value;
    var schemeTags = item.entries.map(function(e){ return '<span class="tag">'+esc(e.scheme)+'</span>'; })
      .filter(function(v,i,a){ return a.indexOf(v)===i; }).join('');
    var multi = item.techs.length>1;
    var title = multi ? (item.techs.length+' matching activities') : techLabel(sector, item.techs[0]);
    var techTags = multi ? item.techs.map(function(t){ return '<span class="tag">'+esc(techLabel(sector,t))+'</span>'; }).join('') : '';
    return (
      '<div class="oppo-card">'+
        '<div class="oppo-head">'+
          '<div><div class="oppo-title">'+esc(title)+'</div>'+
            '<div class="oppo-tags"><span class="tag country">'+countryName(item.country)+'</span>'+techTags+schemeTags+'</div>'+
          '</div>'+
          '<span class="chip '+STRENGTH_CHIP[item.strength]+'">'+STRENGTH_LABEL[item.strength]+'</span>'+
        '</div>'+
        '<div class="matchlist">'+item.entries.map(renderMatch).join('')+'</div>'+
        '<div class="oppo-foot"><button class="btn primary small" data-screen-sector="'+esc(sector)+'" data-screen-tech="'+esc(item.techs[0])+'" data-screen-country="'+esc(item.country)+'">Screen this project →</button></div>'+
      '</div>'
    );
  }

  var PRIVATE_OPPORTUNITIES = [
    {mid:'in-ccts-off-re', scaleHint:'Individual rooftop / small commercial solar', privateNote:'Technically covered by the CCTS renewable energy offset category, but a single home or small rooftop system rarely produces enough volume to justify registration and verification costs alone. The realistic path is a solar aggregator or a discom-run pooled programme that bundles many small rooftops into one project.'},
    {mid:'in-voluntary', scaleHint:'Household cookstoves, EV charging, building retrofits', privateNote:'Household-scale cookstove and efficiency programmes are the most realistic individual-level entry point in the voluntary market. Gold Standard in particular has a track record crediting cookstove distribution at scale through an implementing organisation, not single households applying alone.'},
    {mid:'in-ccts-off-agro', scaleHint:'Private farmland / smallholder plots', privateNote:'Agroforestry and biochar are explicitly listed CCTS offset categories, but smallholders almost always need to aggregate through a farmer-producer organisation (FPO) or project developer to reach a viable registration scale.'},
    {mid:'in-ccts-off-mangrove', scaleHint:'Private or community coastal land', privateNote:'Blue-carbon restoration on private coastal land is eligible, but permanence and buffer-pool requirements make this a multi-decade commitment best entered through a community or NGO-run aggregation project.'},
    {mid:'us-carb-livestock', scaleHint:'Small or medium dairy / livestock operation', privateNote:'A digester big enough to matter is real capex for a small operation. Check whether a state or cooperative-run digester aggregation programme is available before building a stand-alone system.'},
    {mid:'us-car-nitrogen', scaleHint:'Small or medium farm', privateNote:'Precision nitrogen application is credited at the field level, and most small farms reach viable scale only by enrolling through a farm-services co-op or an aggregator that bundles many fields into one project.'},
    {mid:'us-voluntary', scaleHint:'Home EV charger or home energy retrofit', privateNote:'A single home EV charger or retrofit essentially never clears registration costs on its own. This only works at individual scale through a utility- or state-run aggregation programme that batches many homes into one registry project.'},
    {mid:'us-voluntary-energy', scaleHint:'Home rooftop solar', privateNote:"Worth setting expectations on: a single home's rooftop solar essentially never qualifies for tradeable carbon credits in the US today. The technology is common practice and most registries have retired or restricted methodologies for it. Net metering or a state incentive programme is the realistic financial benefit here, not a carbon credit."}
  ];

  function renderPrivateOppoCard(po){
    var m = M.find(function(x){ return x.id===po.mid; });
    if(!m) return '';
    return (
      '<div class="oppo-card">'+
        '<div class="oppo-head">'+
          '<div><div class="oppo-title">'+esc(po.scaleHint)+'</div>'+
            '<div class="oppo-tags"><span class="tag country">'+countryName(m.country)+'</span><span class="tag">'+esc(m.scheme)+'</span></div>'+
          '</div>'+
        '</div>'+
        '<p class="oppo-note">'+esc(po.privateNote)+'</p>'+
        '<div class="oppo-foot"><button class="btn primary small" data-screen-sector="'+esc(m.sector)+'" data-screen-tech="'+esc(m.techs[0])+'" data-screen-country="'+esc(m.country)+'">Screen this project →</button></div>'+
      '</div>'
    );
  }

  function bindScreenButtons(){
    document.querySelectorAll('[data-screen-sector]').forEach(function(btn){
      btn.addEventListener('click', function(){
        setAddMode();
        var sector = btn.getAttribute('data-screen-sector');
        var tech = btn.getAttribute('data-screen-tech');
        var country = btn.getAttribute('data-screen-country');
        sectorSel.value = sector;
        refreshTechOptions();
        techSel.value = tech;
        updateTechCustomVisibility();
        document.querySelectorAll('input[name=country]').forEach(function(cb){ cb.checked = (cb.value===country); });
        showView('new');
      });
    });
  }

  function renderCredits(){
    var results = document.getElementById('credits-results');
    var countries = [];
    if(document.getElementById('cr-country-in').checked) countries.push('IN');
    if(document.getElementById('cr-country-us').checked) countries.push('US');
    if(countries.length===0){
      results.innerHTML = '<p class="hint">Select at least one jurisdiction above.</p>';
      return;
    }
    if(creditEntityMode==='industry'){
      var sector = document.getElementById('cr-sector').value;
      var list = industryRecommendations(sector, countries);
      if(list.length===0){
        results.innerHTML = '<div class="empty"><h3>No tracked pathway yet</h3><p>No tracked pathways cover '+esc(sectorLabel(sector))+' in the selected jurisdictions. Try another jurisdiction or check the Methodology library.</p></div>';
        return;
      }
      results.innerHTML = list.map(renderIndustryOppoCard).join('');
    } else {
      var filtered = PRIVATE_OPPORTUNITIES.filter(function(po){
        var m = M.find(function(x){ return x.id===po.mid; });
        return m && countries.indexOf(m.country)>-1;
      });
      if(filtered.length===0){
        results.innerHTML = '<p class="hint">No individual-scale opportunities tracked for the selected jurisdiction(s) yet.</p>';
        return;
      }
      results.innerHTML = filtered.map(renderPrivateOppoCard).join('');
    }
    bindScreenButtons();
  }

  (function initCredits(){
    var crSector = document.getElementById('cr-sector');
    crSector.innerHTML = SECTORS.map(function(s){ return '<option value="'+s.id+'">'+esc(s.label)+'</option>'; }).join('');
    document.querySelectorAll('#cr-mode-toggle .seg-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        creditEntityMode = btn.getAttribute('data-mode');
        document.querySelectorAll('#cr-mode-toggle .seg-btn').forEach(function(b){ b.classList.toggle('active', b===btn); });
        document.getElementById('cr-sector-field').style.display = (creditEntityMode==='industry') ? 'flex' : 'none';
        document.getElementById('cr-private-note').style.display = (creditEntityMode==='private') ? 'block' : 'none';
        renderCredits();
      });
    });
    crSector.addEventListener('change', renderCredits);
    document.getElementById('cr-country-in').addEventListener('change', renderCredits);
    document.getElementById('cr-country-us').addEventListener('change', renderCredits);
  })();

  // ---------- Render: methodology library ----------
  var libSector = document.getElementById('lib-sector');
  libSector.innerHTML = '<option value="all">All sectors</option>' + SECTORS.map(function(s){ return '<option value="'+s.id+'">'+esc(s.label)+'</option>'; }).join('');
  var libCountry = document.getElementById('lib-country');
  var libType = document.getElementById('lib-type');

  function typeLabel(t){
    return {compliance:'Compliance', offset:'Offset mechanism', voluntary:'Voluntary registry',
      'tax-credit':'Tax credit', 'compliance-adjacent':'Compliance-adjacent', 'regulatory-only':'Regulatory / code only'}[t] || t;
  }

  function renderLibrary(){
    var c = libCountry.value, s = libSector.value, t = libType.value;
    var rows = M.filter(function(m){
      return (c==='all'||m.country===c) && (s==='all'||m.sector===s) && (t==='all'||m.type===t);
    });
    var list = document.getElementById('mlib-list');
    if(rows.length===0){
      list.innerHTML = '<div class="empty"><h3>No matches</h3><p>Try widening the filters.</p></div>';
      return;
    }
    list.innerHTML = rows.map(function(m){
      return (
        '<div class="mrow" data-id="'+m.id+'">'+
          '<div class="mrow-head">'+
            '<div>'+
              '<div class="mscheme" style="font-size:11px;color:var(--accent-ink);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">'+esc(m.scheme)+'</div>'+
              '<div style="font-weight:600;margin-top:2px;">'+esc(m.name)+'</div>'+
              '<div class="mrow-tags">'+
                '<span class="tag country">'+countryName(m.country)+'</span>'+
                '<span class="tag">'+esc(sectorLabel(m.sector))+'</span>'+
                '<span class="tag">'+esc(typeLabel(m.type))+'</span>'+
              '</div>'+
            '</div>'+
            '<span class="caret">▸</span>'+
          '</div>'+
          '<div class="mrow-body">'+
            '<div>'+esc(m.summary)+'</div>'+
            '<dl style="margin:0;">'+
              '<dt>Additionality</dt><dd>'+esc(m.additionality)+'</dd>'+
              '<dt>Monitoring &amp; verification</dt><dd>'+esc(m.monitoring)+'</dd>'+
              '<dt>Crediting</dt><dd>'+esc(m.crediting)+'</dd>'+
              '<dt>Applies to</dt><dd>'+m.techs.map(function(tc){ return esc(techLabel(m.sector,tc)); }).join(', ')+'</dd>'+
            '</dl>'+
            '<div><a href="'+esc(m.link)+'" target="_blank" rel="noopener">'+esc(m.linkLabel)+' ↗</a></div>'+
          '</div>'+
        '</div>'
      );
    }).join('');
    list.querySelectorAll('.mrow-head').forEach(function(head){
      head.addEventListener('click', function(){
        var open = head.parentElement.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      bindExpandHead(head);
    });
  }
  [libCountry, libSector, libType].forEach(function(sel){ sel.addEventListener('change', renderLibrary); });

  // ---------- Render: about / refs ----------
  document.getElementById('refs-list').innerHTML = REFS.map(function(r){
    return '<li><a href="'+esc(r.u)+'" target="_blank" rel="noopener">'+esc(r.t)+' ↗</a></li>';
  }).join('');
  document.querySelectorAll('#about-accordion .mrow-head').forEach(function(head){
    head.addEventListener('click', function(){
      var open = head.parentElement.classList.toggle('open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    bindExpandHead(head);
  });

  // =====================================================================
  // PERMITS & CONSENT COMPLIANCE
  // =====================================================================

  function uid(prefix){ return prefix+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,7); }
  function todayStr(){ var d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function titleCase(s){ return String(s||'').replace(/\w\S*/g, function(t){ return t.charAt(0).toUpperCase()+t.slice(1).toLowerCase(); }); }
  function avg(arr){ if(!arr.length) return 0; return arr.reduce(function(a,b){return a+b;},0)/arr.length; }

  var CATEGORY_OPTIONS = [
    {v:'water', l:'Water discharge'}, {v:'air', l:'Air emissions'}, {v:'waste', l:'Waste'},
    {v:'ghg', l:'GHG / energy'}, {v:'noise', l:'Noise'}, {v:'other', l:'Other'}
  ];
  var CATEGORY_LABELS = {water:'Water discharge', air:'Air emissions', waste:'Waste', ghg:'GHG / energy', noise:'Noise', other:'Other'};

  var UNIT_OPTIONS = [
    'mg/l', 'mg/L', 'µg/m³', 'mg/Nm³', 'ppm', 'ppb', '%',
    'kg/day', 'kg/hr', 'kg/tonne product', 'tonnes/yr', 'tCO2e/yr',
    'MLD', 'm³/day', 'litres/day', 'NTU', 'MPN/100ml',
    '°C', 'dB(A)', 'Nm³/hr'
  ];
  var FREQUENCY_OPTIONS = [
    'Continuous', 'Hourly', '8-hour average', '24-hour average',
    'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Half-yearly', 'Annual',
    'Per batch / campaign', 'Instantaneous / grab sample'
  ];
  var OTHER_OPTION = '__other__';

  // Reusable "pick from a list, or choose Other to type your own" control for table cells.
  function comboFieldHtml(cssClass, options, currentValue, otherPlaceholder){
    var val = currentValue || '';
    var isKnown = options.indexOf(val) > -1;
    var selHtml = '<select class="'+cssClass+'-select">' +
      '<option value="">Choose…</option>' +
      options.map(function(o){ return '<option value="'+esc(o)+'"'+(val===o?' selected':'')+'>'+esc(o)+'</option>'; }).join('') +
      '<option value="'+OTHER_OPTION+'"'+((val && !isKnown)?' selected':'')+'>Other (type your own)</option>' +
      '</select>';
    var customHtml = '<input type="text" class="'+cssClass+'-custom" value="'+esc((val && !isKnown)?val:'')+'" placeholder="'+esc(otherPlaceholder||'')+'" style="margin-top:4px;'+((val && !isKnown)?'':'display:none;')+'">';
    return '<div class="combo-field">'+selHtml+customHtml+'</div>';
  }
  function bindComboField(tr, cssClass){
    var sel = tr.querySelector('.'+cssClass+'-select');
    var custom = tr.querySelector('.'+cssClass+'-custom');
    if(!sel || !custom) return;
    sel.addEventListener('change', function(){
      if(sel.value===OTHER_OPTION){ custom.style.display='block'; custom.focus(); }
      else { custom.style.display='none'; }
    });
  }
  function readComboField(tr, cssClass){
    var sel = tr.querySelector('.'+cssClass+'-select');
    var custom = tr.querySelector('.'+cssClass+'-custom');
    if(!sel) return '';
    if(sel.value===OTHER_OPTION) return (custom?custom.value:'').trim();
    return sel.value;
  }

  var PARAM_DICTIONARY = [
    {name:'BOD', aliases:['bod','biochemical oxygen demand'], category:'water'},
    {name:'COD', aliases:['cod','chemical oxygen demand'], category:'water'},
    {name:'TSS', aliases:['tss','total suspended solids','suspended solids'], category:'water'},
    {name:'TDS', aliases:['tds','total dissolved solids'], category:'water'},
    {name:'pH', aliases:['ph'], category:'water'},
    {name:'Oil & Grease', aliases:['oil and grease','oil & grease','o&g'], category:'water'},
    {name:'Ammonical Nitrogen', aliases:['ammonical nitrogen','ammoniacal nitrogen','nh3-n','nh3 n'], category:'water'},
    {name:'Total Coliform', aliases:['total coliform','fecal coliform','faecal coliform'], category:'water'},
    {name:'Total Discharge', aliases:['total discharge','discharge volume','effluent quantity','wastewater discharge','flow rate'], category:'water'},
    {name:'Chlorides', aliases:['chloride','chlorides'], category:'water'},
    {name:'Sulphates', aliases:['sulphate','sulfate','sulphates','sulfates'], category:'water'},
    {name:'Fluoride', aliases:['fluoride'], category:'water'},
    {name:'Phenolic Compounds', aliases:['phenolic compound','phenol'], category:'water'},
    {name:'Heavy Metals (Total)', aliases:['heavy metal','heavy metals'], category:'water'},
    {name:'Hexavalent Chromium', aliases:['hexavalent chromium','cr6+','cr(vi)'], category:'water'},
    {name:'Particulate Matter', aliases:['particulate matter','pm10','pm2.5','pm 2.5','pm 10','spm',' pm '], category:'air'},
    {name:'SO2', aliases:['so2','sulphur dioxide','sulfur dioxide'], category:'air'},
    {name:'Carbon Monoxide', aliases:['carbon monoxide',' co '], category:'air'},
    {name:'NOx', aliases:['nox','oxides of nitrogen','nitrogen oxides'], category:'air'},
    {name:'VOC', aliases:['voc','volatile organic compound'], category:'air'},
    {name:'Ammonia (Air)', aliases:['ammonia emission','nh3 emission'], category:'air'},
    {name:'Hydrogen Sulphide', aliases:['hydrogen sulphide','hydrogen sulfide','h2s'], category:'air'},
    {name:'Stack Opacity', aliases:['stack opacity','opacity'], category:'air'},
    {name:'Noise Level', aliases:['noise level','noise limit','db(a)','dba'], category:'noise'},
    {name:'Hazardous Waste', aliases:['hazardous waste'], category:'waste'},
    {name:'GHG / CO2e', aliases:['co2e','ghg emission','carbon dioxide equivalent','greenhouse gas'], category:'ghg'}
  ];
  var PARAM_NAME_OPTIONS = PARAM_DICTIONARY.map(function(d){ return d.name; });
  function matchParamDictionary(nameText){
    var low = ' '+String(nameText||'').toLowerCase()+' ';
    for(var i=0;i<PARAM_DICTIONARY.length;i++){
      var d = PARAM_DICTIONARY[i];
      for(var j=0;j<d.aliases.length;j++){
        if(low.indexOf(d.aliases[j])>-1) return {canonicalName:d.name, category:d.category};
      }
    }
    return {canonicalName:null, category:'other'};
  }

  // ---- Automated (pattern-matching, non-AI) extraction from pasted text ----
  function extractParametersFromText(text){
    var lines = String(text||'').split(/\r?\n/);
    var results = [];
    function pushParam(nameRaw, limitType, limit, low, high, unit, freq, sourceLine){
      var nameClean = String(nameRaw||'').replace(/[:\-–]+$/,'').trim();
      if(!nameClean) nameClean = 'Unnamed condition';
      var match = matchParamDictionary(nameClean);
      results.push({
        id: uid('param'),
        name: match.canonicalName || titleCase(nameClean),
        limitType: limitType, limit: limit, limitLow: low, limitHigh: high,
        unit: String(unit||'').trim(), frequency: freq||'', category: match.category||'other',
        confirmed:false, sourceLine: sourceLine
      });
    }
    lines.forEach(function(line){
      var raw = line.trim();
      if(raw.length<4 || !/\d/.test(raw)) return;
      var freqMatch = raw.match(/daily|monthly|weekly|annual(?:ly)?|hourly|24[- ]?hour(?:ly)?|quarterly|continuous/i);
      var frequency = freqMatch ? titleCase(freqMatch[0]) : '';

      var segs = raw.split(/\t|\|/).map(function(s){return s.trim();}).filter(Boolean);
      if(segs.length>=3 && /\d/.test(segs[1])){
        var numMatch = segs[1].match(/[\d.]+/);
        if(numMatch){ pushParam(segs[0], 'max', parseFloat(numMatch[0]), null, null, segs[2]||'', segs[3]||frequency, raw); return; }
      }

      var rangeM = raw.match(/^(.*?)(?:\bshall\b.*?)?\bbetween\s+([\d.]+)\s*(?:and|to|-|–)\s*([\d.]+)\s*([A-Za-zµ°%\/0-9()]*)/i);
      if(rangeM){ pushParam(rangeM[1], 'range', null, parseFloat(rangeM[2]), parseFloat(rangeM[3]), rangeM[4], frequency, raw); return; }

      var toRangeM = raw.match(/^(.*?)[:\-–]\s*([\d.]+)\s*(?:to|-|–)\s*([\d.]+)\s*([A-Za-zµ°%\/0-9()]*)/);
      if(toRangeM && /\bph\b/i.test(toRangeM[1])){ pushParam(toRangeM[1], 'range', null, parseFloat(toRangeM[2]), parseFloat(toRangeM[3]), toRangeM[4], frequency, raw); return; }

      var maxM = raw.match(/^(.{2,50}?)\s*[:\-–]?\s*(?:shall not exceed|not to exceed|not exceeding|not more than|maximum permissible limit of|maximum limit of|max(?:imum)?(?: permissible)?(?: limit)?(?: of)?|limit(?:s)?(?: of)?|≤|<=)\s*[:\-–]?\s*([\d.]+)\s*([A-Za-zµ°%\/0-9()]*)/i);
      if(maxM){ pushParam(maxM[1], 'max', parseFloat(maxM[2]), null, null, maxM[3], frequency, raw); return; }

      var simpleM = raw.match(/^([A-Za-z][A-Za-z0-9 ()\/&.\-]{1,48}?)\s*[:\-–]\s*([\d.]+)\s*([A-Za-zµ°%\/0-9()]*)/);
      if(simpleM){ pushParam(simpleM[1], 'max', parseFloat(simpleM[2]), null, null, simpleM[3], frequency, raw); return; }
    });
    return results;
  }

  function describeLimit(param){
    if(param.limitType==='max') return 'maximum '+param.limit+(param.unit?' '+param.unit:'');
    if(param.limitType==='min') return 'minimum '+param.limit+(param.unit?' '+param.unit:'');
    if(param.limitType==='range') return 'range of '+param.limitLow+'–'+param.limitHigh+(param.unit?' '+param.unit:'');
    return 'limit';
  }
  function describeLimitPhrase(param){
    if(param.limitType==='max') return 'must stay at or below '+param.limit+(param.unit?' '+param.unit:'')+(param.frequency?' ('+param.frequency+')':'');
    if(param.limitType==='min') return 'must stay at or above '+param.limit+(param.unit?' '+param.unit:'')+(param.frequency?' ('+param.frequency+')':'');
    if(param.limitType==='range') return 'must stay between '+param.limitLow+'–'+param.limitHigh+(param.unit?' '+param.unit:'')+(param.frequency?' ('+param.frequency+')':'');
    return '';
  }
  function paramStatus(param, value){
    if(param.limitType==='max'){ if(value>param.limit) return 'exceeded'; if(value>=0.85*param.limit) return 'approaching'; return 'ok'; }
    if(param.limitType==='min'){ if(value<param.limit) return 'exceeded'; if(value<=1.15*param.limit) return 'approaching'; return 'ok'; }
    if(param.limitType==='range'){
      if(value<param.limitLow || value>param.limitHigh) return 'exceeded';
      var span=param.limitHigh-param.limitLow, buf=span*0.15;
      if(value<=param.limitLow+buf || value>=param.limitHigh-buf) return 'approaching';
      return 'ok';
    }
    return 'ok';
  }
  function pctOfLimit(param, value){
    if(param.limitType==='max') return (value/param.limit)*100;
    if(param.limitType==='min') return (param.limit/value)*100;
    if(param.limitType==='range'){
      var mid=(param.limitLow+param.limitHigh)/2, half=(param.limitHigh-param.limitLow)/2;
      return 100 - (Math.abs(value-mid)/half)*100 + 0; // rough "headroom" style number, informational only
    }
    return 0;
  }
  function computeSeriesForParam(param, readings){
    var sorted = readings.slice().sort(function(a,b){ return a.date<b.date?-1:(a.date>b.date?1:0); });
    return sorted.map(function(r,i){
      var status = paramStatus(param, r.value);
      var spike = false;
      if(i>0){
        var prior = sorted.slice(Math.max(0,i-3), i).map(function(x){return x.value;});
        var priorAvg = avg(prior);
        if(priorAvg>0 && r.value > priorAvg*1.25) spike = true;
      }
      return {id:r.id, date:r.date, value:r.value, note:r.note, status:status, spike:spike};
    });
  }

  function buildSummaryFromParams(paramsArr){
    var confirmed = paramsArr.filter(function(p){ return p.confirmed; });
    if(confirmed.length===0) return '';
    var byCat = {};
    confirmed.forEach(function(p){ (byCat[p.category]=byCat[p.category]||[]).push(p); });
    var catKeys = Object.keys(byCat);
    var parts = catKeys.map(function(cat){
      var list = byCat[cat].map(function(p){ return p.name+' '+describeLimitPhrase(p); }).join('; ');
      return (CATEGORY_LABELS[cat]||'Other')+': '+list+'.';
    });
    return "This consent sets "+confirmed.length+' condition'+(confirmed.length===1?'':'s')+' across '+catKeys.length+' area'+(catKeys.length===1?'':'s')+' tracked here. '+parts.join(' ');
  }

  function permitOverallStatus(permit){
    var confirmed = permit.parameters.filter(function(p){ return p.confirmed; });
    if(confirmed.length===0) return 'no-data';
    var rank={ok:0, approaching:1, exceeded:2};
    var worst='ok', anyData=false;
    confirmed.forEach(function(param){
      var readings = permit.monthlyData.filter(function(r){ return r.parameterId===param.id; });
      if(readings.length===0) return;
      anyData=true;
      var series = computeSeriesForParam(param, readings);
      var last = series[series.length-1];
      if(rank[last.status]>rank[worst]) worst=last.status;
    });
    return anyData ? worst : 'no-data';
  }

  function generatePlan(permit){
    var items=[];
    var confirmed = permit.parameters.filter(function(p){ return p.confirmed; });
    var unconfirmedCount = permit.parameters.length - confirmed.length;
    confirmed.forEach(function(param){
      var readings = permit.monthlyData.filter(function(r){ return r.parameterId===param.id; });
      if(readings.length===0){
        items.push({sev:'info', text: 'No readings logged yet for '+param.name+'. Add at least one to start tracking it against its '+describeLimit(param)+' limit.'});
        return;
      }
      var series = computeSeriesForParam(param, readings);
      var last = series[series.length-1];
      var exceedances = series.filter(function(s){ return s.status==='exceeded'; });
      var spikes = series.filter(function(s){ return s.spike; });
      if(exceedances.length>0){
        var dates = exceedances.slice(-3).map(function(e){ return e.date; }).join(', ');
        items.push({sev:'critical', text: param.name+' exceeded its '+describeLimit(param)+' limit on '+exceedances.length+' reading'+(exceedances.length===1?'':'s')+' (most recently '+dates+'). Investigate the cause and document corrective steps before your next inspection or filing.'});
      } else if(last.status==='approaching'){
        items.push({sev:'monitor', text: param.name+' is currently approaching its limit (latest reading '+last.value+(param.unit?' '+param.unit:'')+'). Schedule a review before it crosses the line.'});
      }
      if(spikes.length>0 && exceedances.indexOf(spikes[spikes.length-1])===-1){
        items.push({sev:'monitor', text: param.name+' jumped sharply on '+spikes[spikes.length-1].date+' compared to its recent readings. Confirm this wasn’t a one-off measurement or process upset.'});
      }
    });
    if(unconfirmedCount>0){
      items.push({sev:'info', text: unconfirmedCount+' extracted limit'+(unconfirmedCount===1?'':'s')+' still unconfirmed and excluded from this plan. Review '+(unconfirmedCount===1?'it':'them')+' in the limits table above.'});
    }
    if(items.length===0){
      items.push({sev:'ok', text: 'All confirmed parameters are currently within limits. Keep logging readings on schedule to catch drift early.'});
    }
    var order={critical:0, monitor:1, info:2, ok:3};
    items.sort(function(a,b){ return order[a.sev]-order[b.sev]; });
    return items;
  }

  function buildParamChartSVG(param, series){
    var W=300,H=84,padL=8,padR=8,padT=10,padB=16;
    var vals = series.map(function(s){return s.value;});
    var bounds = param.limitType==='range' ? [param.limitLow,param.limitHigh] : (param.limit!=null?[param.limit]:[]);
    var all = vals.concat(bounds);
    var min=Math.min.apply(null,all), max=Math.max.apply(null,all);
    if(min===max){ min-=1; max+=1; }
    var pad=(max-min)*0.15; min-=pad; max+=pad;
    function xAt(i){ return series.length<=1 ? (W/2) : padL+(i/(series.length-1))*(W-padL-padR); }
    function yAt(v){ return H-padB - ((v-min)/(max-min))*(H-padT-padB); }
    var svg='<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" role="img" aria-label="'+esc(param.name)+' readings over time">';
    function limitLine(v){ var y=yAt(v); return '<line x1="'+padL+'" y1="'+y.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+y.toFixed(1)+'" style="stroke:var(--ink-faint);stroke-width:1;stroke-dasharray:3,3"/>'; }
    if(param.limitType==='range'){ svg+=limitLine(param.limitLow); svg+=limitLine(param.limitHigh); }
    else if(param.limit!=null){ svg+=limitLine(param.limit); }
    var pts = series.map(function(s,i){ return xAt(i).toFixed(1)+','+yAt(s.value).toFixed(1); }).join(' ');
    svg+='<polyline points="'+pts+'" style="fill:none;stroke:var(--accent);stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round"/>';
    series.forEach(function(s,i){
      var cx=xAt(i), cy=yAt(s.value);
      var color = s.status==='exceeded' ? 'var(--bad)' : (s.status==='approaching' ? 'var(--warn)' : 'var(--good)');
      var r = (i===series.length-1) ? 3.6 : 2.6;
      svg+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+r+'" style="fill:'+color+';'+(s.spike?'stroke:var(--ink);stroke-width:1':'')+'">';
      svg+='<title>'+esc(s.date)+': '+s.value+' '+esc(param.unit||'')+', '+esc(s.status)+(s.spike?' (spike)':'')+'</title>';
      svg+='</circle>';
    });
    svg+='</svg>';
    return svg;
  }

  // ---- Storage ----
  var PERMIT_STORAGE_KEY = 'baseline_permits_v1';
  function loadPermits(){
    try{ var raw=localStorage.getItem(PERMIT_STORAGE_KEY); if(raw) return JSON.parse(raw); }catch(e){}
    return null;
  }
  function savePermits(){ try{ localStorage.setItem(PERMIT_STORAGE_KEY, JSON.stringify(permits)); }catch(e){} }

  function samplePermits(){
    var bodId=uid('param'), codId=uid('param'), phId=uid('param'), so2Id=uid('param'), dischargeId=uid('param');
    var permit = {
      id:'sample-permit-1', name:'Vapi Specialty Chemicals, Unit 3', sector:'industry', jurisdiction:'IN',
      ref:'GPCB Consent Order No. GPCB/CCA-ID/12345/2024',
      parameters:[
        {id:bodId, name:'BOD', limitType:'max', limit:30, limitLow:null, limitHigh:null, unit:'mg/l', frequency:'Monthly', category:'water', confirmed:true},
        {id:codId, name:'COD', limitType:'max', limit:250, limitLow:null, limitHigh:null, unit:'mg/l', frequency:'Monthly', category:'water', confirmed:true},
        {id:phId, name:'pH', limitType:'range', limit:null, limitLow:5.5, limitHigh:9.0, unit:'', frequency:'Continuous', category:'water', confirmed:true},
        {id:so2Id, name:'SO2', limitType:'max', limit:100, limitLow:null, limitHigh:null, unit:'mg/Nm3', frequency:'Monthly', category:'air', confirmed:true},
        {id:dischargeId, name:'Total Discharge', limitType:'max', limit:500, limitLow:null, limitHigh:null, unit:'KLD', frequency:'Daily', category:'water', confirmed:false}
      ],
      monthlyData:[
        {id:uid('read'), parameterId:bodId, date:'2026-06-05', value:18, note:''},
        {id:uid('read'), parameterId:bodId, date:'2026-06-18', value:22, note:''},
        {id:uid('read'), parameterId:bodId, date:'2026-07-05', value:24, note:''},
        {id:uid('read'), parameterId:bodId, date:'2026-07-15', value:34, note:'After monsoon overflow'},
        {id:uid('read'), parameterId:bodId, date:'2026-07-27', value:27, note:''},
        {id:uid('read'), parameterId:codId, date:'2026-06-10', value:180, note:''},
        {id:uid('read'), parameterId:codId, date:'2026-07-10', value:190, note:''},
        {id:uid('read'), parameterId:codId, date:'2026-07-24', value:215, note:''},
        {id:uid('read'), parameterId:phId, date:'2026-06-12', value:7.2, note:''},
        {id:uid('read'), parameterId:phId, date:'2026-07-12', value:8.9, note:''},
        {id:uid('read'), parameterId:phId, date:'2026-07-26', value:9.4, note:'Effluent pH drift'}
      ],
      createdAt: Date.now()-1000*60*60*24*10
    };
    permit.summary = buildSummaryFromParams(permit.parameters);
    return [permit];
  }

  var permits = loadPermits();
  if(permits===null){ permits = samplePermits(); savePermits(); }
  var openPermitId = null;
  var pfSource = 'paste';

  // ---------- PDF text extraction (in-browser, via pdf.js — no server involved) ----------
  var PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js';
  // pdf.js is loaded only when a PDF is actually uploaded, not on every page view
  var PDF_LIB_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
  var pdfLibPromise = null;
  function loadPdfJs(){
    if(window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if(pdfLibPromise) return pdfLibPromise;
    pdfLibPromise = new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = PDF_LIB_SRC;
      s.onload = function(){
        try{ pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC; }catch(e){}
        resolve(window.pdfjsLib);
      };
      s.onerror = function(){ pdfLibPromise = null; reject(new Error('pdf-lib-unavailable')); };
      document.head.appendChild(s);
    });
    return pdfLibPromise;
  }
  function extractTextFromPdfFile(file){
    return loadPdfJs().then(function(){ return new Promise(function(resolve, reject){
      if(!window.pdfjsLib){ reject(new Error('pdf-lib-unavailable')); return; }
      var reader = new FileReader();
      reader.onerror = function(){ reject(new Error('file-read-failed')); };
      reader.onload = function(){
        try{
          var typedArray = new Uint8Array(reader.result);
          // disableWorker avoids spawning a separate Worker thread (and the network
          // fetch that requires) — parsing runs on the main thread instead, which is
          // slower but far more likely to work inside a restricted/sandboxed page.
          pdfjsLib.getDocument({data: typedArray, disableWorker: true}).promise.then(function(pdf){
            var maxPages = Math.min(pdf.numPages, 40);
            var pagePromises = [];
            for(var i=1;i<=maxPages;i++){
              pagePromises.push(pdf.getPage(i).then(function(page){
                return page.getTextContent().then(function(tc){
                  return tc.items.map(function(it){ return it.str; }).join(' ');
                });
              }));
            }
            Promise.all(pagePromises).then(function(pageTexts){
              resolve({ text: pageTexts.join('\n'), pageCount: pdf.numPages, scannedPages: maxPages });
            }, reject);
          }, reject);
        }catch(e){ reject(e); }
      };
      reader.readAsArrayBuffer(file);
    }); });
  }

  function renderPermitStats(){
    var total=permits.length, ok=0, attention=0, noData=0;
    permits.forEach(function(p){
      var s = permitOverallStatus(p);
      if(s==='ok') ok++; else if(s==='approaching'||s==='exceeded') attention++; else noData++;
    });
    var stats=[
      {n:total, l:'Total permits', cls:'brand'},
      {n:ok, l:'Within limits', cls:'good'},
      {n:attention, l:'Needs attention', cls:'warn'},
      {n:noData, l:'No data yet', cls:'bad'}
    ];
    document.getElementById('permit-stats').innerHTML = stats.map(function(s){
      return '<div class="stat '+s.cls+'"><div class="n num">'+s.n+'</div><div class="l">'+s.l+'</div></div>';
    }).join('');
  }

  function renderLimitsList(permit){
    if(permit.parameters.length===0) return '<p class="hint">No limits added yet.</p>';
    var rows = permit.parameters.map(function(p){
      var typeText = p.limitType==='range' ? (p.limitLow+'–'+p.limitHigh+(p.unit?' '+p.unit:'')) : (p.limit+(p.unit?' '+p.unit:''));
      return '<div class="plimit-row">'+
        '<div><div class="pname">'+esc(p.name)+(p.confirmed?'':' <span style="font-weight:400;color:var(--warn-ink);">(unconfirmed)</span>')+'</div>'+
        '<div class="pmeta">'+esc(CATEGORY_LABELS[p.category]||'Other')+(p.frequency?' · '+esc(p.frequency):'')+'</div></div>'+
        '<div class="num" style="white-space:nowrap;">'+esc(typeText)+'</div>'+
      '</div>';
    }).join('');
    return '<div class="plimit-list">'+rows+'</div>';
  }

  function renderReadingsSection(permit){
    var confirmed = permit.parameters.filter(function(p){ return p.confirmed; });
    if(confirmed.length===0){
      return '<p class="hint">Confirm at least one limit above to start logging monthly readings against it.</p>';
    }
    var formHtml = '<p class="hint" style="margin:0;">One reading per date; add a few across the month to see spikes.</p>'+
      '<div class="reading-form">'+
        '<div class="field"><label>Parameter</label><select class="rd-param">'+confirmed.map(function(p){return '<option value="'+p.id+'">'+esc(p.name)+'</option>';}).join('')+'</select></div>'+
        '<div class="field"><label>Date</label><input type="date" class="rd-date" value="'+todayStr()+'"></div>'+
        '<div class="field"><label>Value</label><input type="number" step="any" class="rd-value" placeholder="e.g. 27.4"></div>'+
        '<div class="field" style="flex:2;"><label>Note (optional)</label><input type="text" class="rd-note" placeholder="e.g. after equipment change"></div>'+
        '<button type="button" class="btn primary small rd-add-btn">Add reading</button>'+
      '</div>';

    var blocks = confirmed.map(function(param){
      var readings = permit.monthlyData.filter(function(r){ return r.parameterId===param.id; });
      if(readings.length===0){
        return '<div class="paramblock"><div class="paramblock-head"><span class="pname">'+esc(param.name)+'</span><span class="chip no-pathway">No readings yet</span></div></div>';
      }
      var series = computeSeriesForParam(param, readings);
      var last = series[series.length-1];
      var chipClass = {ok:'likely', approaching:'conditional', exceeded:'unlikely'}[last.status];
      var chipLabel = {ok:'Within limit', approaching:'Approaching limit', exceeded:'Exceeded'}[last.status];
      var exceedCount = series.filter(function(s){return s.status==='exceeded';}).length;
      var spikeCount = series.filter(function(s){return s.spike;}).length;
      var chipsHtml = series.slice().reverse().map(function(s){
        return '<span class="tag" style="cursor:pointer;" data-remove-reading="'+s.id+'" title="Click to remove this reading">'+
          '<span class="status-dot '+s.status+'"></span>'+esc(s.date)+': '+s.value+(param.unit?esc(' '+param.unit):'')+(s.spike?' ⚡':'')+' ✕</span>';
      }).join(' ');
      return '<div class="paramblock">'+
        '<div class="paramblock-head"><span class="pname">'+esc(param.name)+'</span><span class="chip '+chipClass+'">'+chipLabel+'</span></div>'+
        '<div class="paramblock-body">'+
          buildParamChartSVG(param, series)+
          '<div class="readings-mini">'+series.length+' reading'+(series.length===1?'':'s')+' logged · '+exceedCount+' exceedance'+(exceedCount===1?'':'s')+' · '+spikeCount+' spike'+(spikeCount===1?'':'s')+'</div>'+
          '<div style="display:flex;flex-wrap:wrap;gap:5px;">'+chipsHtml+'</div>'+
        '</div>'+
      '</div>';
    }).join('');

    return formHtml+'<div style="display:flex;flex-direction:column;gap:10px;margin-top:12px;">'+blocks+'</div>';
  }

  // ---- Monthly compliance tracking ----
  function currentMonthKey(){ var d=new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0'); }
  function monthKeyOf(reading){ return reading.month || String(reading.date||'').slice(0,7); }
  function monthLabel(mk){
    var p = String(mk).split('-');
    var d = new Date(parseInt(p[0],10), parseInt(p[1],10)-1, 1);
    if(isNaN(d.getTime())) return mk;
    return d.toLocaleDateString(undefined, {month:'short', year:'numeric'});
  }
  function monthEntry(permit, paramId, mk){
    return permit.monthlyData.filter(function(r){ return r.parameterId===paramId && r.month===mk; })[0] || null;
  }
  function permitMonthKeys(permit){
    var seen={};
    permit.monthlyData.forEach(function(r){ if(r.month) seen[r.month]=true; });
    return Object.keys(seen).sort().reverse();
  }
  function monthAlertsFor(permit){
    var confirmed = permit.parameters.filter(function(p){ return p.confirmed; });
    var out=[];
    permitMonthKeys(permit).forEach(function(mk){
      confirmed.forEach(function(param){
        var e = monthEntry(permit, param.id, mk);
        if(!e) return;
        var st = paramStatus(param, e.value);
        if(st==='ok') return;
        out.push({
          month: mk, sev: st, param: param.name,
          text: param.name+' logged '+e.value+(param.unit?' '+param.unit:'')+' for '+monthLabel(mk)+
                ' against a '+describeLimit(param)+' limit: '+
                (st==='exceeded' ? 'this is an exceedance. Record the cause and the corrective action taken.'
                                 : 'this is close to the limit. Tighten monitoring before it breaches.')
        });
      });
    });
    return out;
  }

  function renderMonthlySection(permit){
    var confirmed = permit.parameters.filter(function(p){ return p.confirmed; });
    if(confirmed.length===0){
      return '<p class="hint">Confirm at least one limit above to start logging monthly actuals against it.</p>';
    }
    var mk = currentMonthKey();
    var inputs = confirmed.map(function(p){
      var e = monthEntry(permit, p.id, mk);
      return '<div class="field"><label>'+esc(p.name)+(p.unit?' <span style="font-weight:400;color:var(--ink-faint);">('+esc(p.unit)+')</span>':'')+'</label>'+
        '<input type="number" step="any" class="mf-value" data-param="'+p.id+'" value="'+(e?esc(e.value):'')+'" placeholder="'+esc(describeLimit(p))+'"></div>';
    }).join('');

    var formHtml = '<p class="hint" style="margin:0;">Enter this month\'s values. Saving replaces that month; blank fields are cleared.</p>'+
      '<div class="month-form">'+
        '<div class="field" style="max-width:170px;"><label>Month</label><input type="month" class="mf-month" value="'+mk+'"></div>'+
        inputs+
        '<div class="field" style="flex:2;min-width:170px;"><label>Note (optional)</label><input type="text" class="mf-note" placeholder="e.g. scrubber offline for 3 days"></div>'+
        '<button type="button" class="btn primary small mf-save-btn">Save month</button>'+
      '</div>';

    var alerts = monthAlertsFor(permit);
    var alertsHtml;
    if(alerts.length===0){
      alertsHtml = '<p class="hint" style="margin:0;">No monthly exceedances recorded'+(permitMonthKeys(permit).length?'; every logged month is within its limits.':' yet.')+'</p>';
    } else {
      alertsHtml = '<div class="month-alerts">'+alerts.map(function(a){
        return '<div class="month-alert'+(a.sev==='approaching'?' warn':'')+'">'+
          '<span class="ma-tag">'+(a.sev==='exceeded'?'Exceeded':'Approaching')+'</span>'+
          '<span>'+esc(a.text)+'</span>'+
        '</div>';
      }).join('')+'</div>';
    }

    var months = permitMonthKeys(permit);
    var tableHtml = '';
    if(months.length>0){
      var head = '<tr><th>Month</th>'+confirmed.map(function(p){
        return '<th>'+esc(p.name)+(p.unit?' <span style="font-weight:400;color:var(--ink-faint);">'+esc(p.unit)+'</span>':'')+'</th>';
      }).join('')+'<th>Note</th><th></th></tr>';
      var body = months.map(function(m){
        var note='';
        var cells = confirmed.map(function(p){
          var e = monthEntry(permit, p.id, m);
          if(!e) return '<td class="num" style="color:var(--ink-faint);">—</td>';
          if(e.note && !note) note = e.note;
          var st = paramStatus(p, e.value);
          return '<td class="num"><span class="mcell"><span class="status-dot '+st+'"></span>'+esc(e.value)+'</span></td>';
        }).join('');
        return '<tr>'+
          '<td style="font-weight:600;">'+esc(monthLabel(m))+'</td>'+cells+
          '<td style="white-space:normal;color:var(--ink-faint);">'+esc(note)+'</td>'+
          '<td><button type="button" class="btn small danger" data-remove-month="'+esc(m)+'">Clear</button></td>'+
        '</tr>';
      }).join('');
      tableHtml = '<div class="month-table-wrap"><table class="month-table"><thead>'+head+'</thead><tbody>'+body+'</tbody></table></div>';
    }

    return formHtml+
      '<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;">'+alertsHtml+tableHtml+'</div>';
  }

  function renderPlanSection(permit){
    var items = generatePlan(permit);
    return '<ul class="plan-list">'+items.map(function(it){
      var sevLabel = {critical:'Act now', monitor:'Monitor', info:'Info', ok:'On track'}[it.sev];
      return '<li class="plan-item '+it.sev+'"><span class="sev">'+sevLabel+'</span><span>'+esc(it.text)+'</span></li>';
    }).join('')+'</ul>';
  }

  function renderPermitBody(permit){
    var summaryHtml = permit.summary ? '<div class="summary-box">'+esc(permit.summary)+'</div>' : '<p class="hint">No summary generated for this permit yet.</p>';
    return (
      '<div><div class="fgroup-title" style="border:none;padding-bottom:6px;">Confirmed &amp; pending limits</div>'+renderLimitsList(permit)+'</div>'+
      '<div><div class="fgroup-title" style="border:none;padding-bottom:6px;">Plain-English summary</div>'+summaryHtml+'</div>'+
      '<div><div class="fgroup-title" style="border:none;padding-bottom:6px;">Monthly monitoring &amp; spikes</div>'+renderReadingsSection(permit)+'</div>'+
      '<div><div class="fgroup-title" style="border:none;padding-bottom:6px;">Monthly compliance log &amp; alerts</div>'+renderMonthlySection(permit)+'</div>'+
      '<div><div class="fgroup-title" style="border:none;padding-bottom:6px;">Proactive plan to stay compliant</div>'+renderPlanSection(permit)+'</div>'+
      '<div class="pcard-foot">'+
        '<span style="font-size:11.5px;color:var(--ink-faint);">Added '+new Date(permit.createdAt).toLocaleDateString()+'</span>'+
        '<button class="btn small danger" data-remove-permit="'+permit.id+'">Remove permit</button>'+
      '</div>'
    );
  }

  function renderPermitCard(permit){
    var overall = permitOverallStatus(permit);
    var statusLabel = {ok:'Within limits', approaching:'Approaching limit', exceeded:'Exceedance found', 'no-data':'No data yet'}[overall];
    var chipClass = {ok:'likely', approaching:'conditional', exceeded:'unlikely', 'no-data':'no-pathway'}[overall];
    var confirmedCount = permit.parameters.filter(function(p){return p.confirmed;}).length;
    var unconfirmedCount = permit.parameters.length-confirmedCount;
    return (
      '<div class="pcard'+(openPermitId===permit.id?' open':'')+'" data-pid="'+permit.id+'">'+
        '<div class="pcard-head">'+
          '<div class="pcard-title">'+
            '<h3>'+esc(permit.name)+'</h3>'+
            '<div class="pcard-meta">'+
              '<span>'+esc(sectorLabel(permit.sector))+' · '+countryName(permit.jurisdiction)+'</span>'+
              (permit.ref?'<span>'+esc(permit.ref)+'</span>':'')+
              '<span>'+confirmedCount+' confirmed limit'+(confirmedCount===1?'':'s')+(unconfirmedCount>0?' · '+unconfirmedCount+' unconfirmed':'')+'</span>'+
            '</div>'+
            '<div class="pcard-chips"><span class="chip '+chipClass+'">'+statusLabel+'</span></div>'+
          '</div>'+
          '<span class="caret">▸</span>'+
        '</div>'+
        '<div class="pcard-body">'+renderPermitBody(permit)+'</div>'+
      '</div>'
    );
  }

  function bindPermitCardEvents(){
    var list = document.getElementById('permits-list');
    list.querySelectorAll('.pcard-head').forEach(function(head){
      head.addEventListener('click', function(){
        var card = head.parentElement;
        var pid = card.getAttribute('data-pid');
        openPermitId = (openPermitId===pid) ? null : pid;
        var open = card.classList.toggle('open');
        head.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      bindExpandHead(head);
    });
    list.querySelectorAll('[data-remove-permit]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var id = btn.getAttribute('data-remove-permit');
        permits = permits.filter(function(p){ return p.id!==id; });
        if(openPermitId===id) openPermitId=null;
        savePermits(); renderPermitList();
      });
    });
    list.querySelectorAll('[data-remove-reading]').forEach(function(el){
      el.addEventListener('click', function(e){
        e.stopPropagation();
        var rid = el.getAttribute('data-remove-reading');
        var card = el.closest('.pcard');
        var pid = card.getAttribute('data-pid');
        var permit = permits.find(function(p){return p.id===pid;});
        if(!permit) return;
        permit.monthlyData = permit.monthlyData.filter(function(r){ return r.id!==rid; });
        savePermits(); renderPermitList();
      });
    });
    list.querySelectorAll('.mf-month').forEach(function(sel){
      sel.addEventListener('click', function(e){ e.stopPropagation(); });
      sel.addEventListener('change', function(e){
        e.stopPropagation();
        var card = sel.closest('.pcard');
        var pid = card.getAttribute('data-pid');
        var permit = permits.find(function(p){return p.id===pid;});
        if(!permit) return;
        var mk = sel.value;
        sel.closest('.month-form').querySelectorAll('.mf-value').forEach(function(inp){
          var e2 = mk ? monthEntry(permit, inp.getAttribute('data-param'), mk) : null;
          inp.value = e2 ? e2.value : '';
        });
      });
    });
    list.querySelectorAll('[data-remove-month]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var mk = btn.getAttribute('data-remove-month');
        var card = btn.closest('.pcard');
        var permit = permits.find(function(p){return p.id===card.getAttribute('data-pid');});
        if(!permit) return;
        permit.monthlyData = permit.monthlyData.filter(function(r){ return r.month!==mk; });
        savePermits(); renderPermitList();
      });
    });
    list.querySelectorAll('.mf-save-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var card = btn.closest('.pcard');
        var permit = permits.find(function(p){return p.id===card.getAttribute('data-pid');});
        if(!permit) return;
        var scope = btn.closest('.month-form');
        var mk = scope.querySelector('.mf-month').value;
        if(!mk){ alert('Pick the month these values belong to.'); return; }
        var note = scope.querySelector('.mf-note').value.trim();
        var entered = 0, breaches = [], nearMisses = [];
        scope.querySelectorAll('.mf-value').forEach(function(inp){
          var paramId = inp.getAttribute('data-param');
          var param = permit.parameters.filter(function(p){return p.id===paramId;})[0];
          var raw = inp.value;
          permit.monthlyData = permit.monthlyData.filter(function(r){ return !(r.month===mk && r.parameterId===paramId); });
          if(raw==='' || isNaN(parseFloat(raw))) return;
          var value = parseFloat(raw);
          entered++;
          permit.monthlyData.push({id:uid('read'), parameterId:paramId, month:mk, date:mk+'-01', value:value, note:note});
          if(param){
            var st = paramStatus(param, value);
            if(st==='exceeded') breaches.push(param.name+' '+value+(param.unit?' '+param.unit:'')+' vs '+describeLimit(param));
            else if(st==='approaching') nearMisses.push(param.name);
          }
        });
        savePermits(); renderPermitList();
        if(breaches.length>0){
          alert('Limit exceeded for '+monthLabel(mk)+':\n\n• '+breaches.join('\n• ')+'\n\nRecord the cause and the corrective action taken.');
        } else if(nearMisses.length>0){
          alert(monthLabel(mk)+' saved. Approaching the limit on: '+nearMisses.join(', ')+'.');
        } else if(entered===0){
          alert('Cleared all values for '+monthLabel(mk)+'.');
        }
      });
    });
    list.querySelectorAll('.rd-add-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var card = btn.closest('.pcard');
        var pid = card.getAttribute('data-pid');
        var permit = permits.find(function(p){return p.id===pid;});
        if(!permit) return;
        var scope = btn.closest('.reading-form');
        var paramId = scope.querySelector('.rd-param').value;
        var date = scope.querySelector('.rd-date').value || todayStr();
        var valueRaw = scope.querySelector('.rd-value').value;
        var note = scope.querySelector('.rd-note').value.trim();
        if(valueRaw==='' || isNaN(parseFloat(valueRaw))){
          alert('Enter a numeric value for this reading before adding it.');
          return;
        }
        permit.monthlyData.push({id:uid('read'), parameterId:paramId, date:date, value:parseFloat(valueRaw), note:note});
        savePermits(); renderPermitList();
      });
    });
  }

  function renderPermitList(){
    renderPermitStats();
    var list = document.getElementById('permits-list');
    if(permits.length===0){
      list.innerHTML = '<div class="empty">'+EMPTY_ICON+'<h3>No permits added yet</h3><p>Add a consent or permit to extract its limits and start tracking monthly compliance.</p><button class="btn primary" id="permit-empty-add-btn">+ Add permit / consent</button></div>';
      var b = document.getElementById('permit-empty-add-btn');
      if(b) b.addEventListener('click', showPermitForm);
      return;
    }
    var sorted = permits.slice().sort(function(a,b){ return b.createdAt-a.createdAt; });
    list.innerHTML = sorted.map(renderPermitCard).join('');
    bindPermitCardEvents();
  }

  function showPermitList(){
    document.getElementById('permit-form-wrap').style.display='none';
    document.getElementById('permits-list-wrap').style.display='block';
    renderPermitList();
  }

  function resetPermitForm(){
    document.getElementById('permit-form').reset();
    document.getElementById('pf-param-tbody').innerHTML='';
    document.getElementById('pf-summary').value='';
    document.getElementById('pf-ai-response').value='';
    document.getElementById('pf-import-status').textContent='';
    document.getElementById('pf-copy-status').textContent='';
    document.getElementById('pf-pdf-status').textContent='';
    document.getElementById('pf-prompt-field').style.display='none';
    pfSource='paste';
    document.querySelectorAll('#pf-source-toggle .seg-btn').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-source')==='paste'); });
    document.getElementById('pf-paste-panel').style.display='block';
    document.getElementById('pf-manual-hint').style.display='none';
  }

  function showPermitForm(){
    resetPermitForm();
    document.getElementById('permits-list-wrap').style.display='none';
    document.getElementById('permit-form-wrap').style.display='block';
  }

  function addParamRow(param){
    var tbody = document.getElementById('pf-param-tbody');
    var p = param || {name:'', limitType:'max', limit:'', limitLow:'', limitHigh:'', unit:'', frequency:'', category:'other', confirmed:(pfSource==='manual')};
    var limitVal = p.limitType==='range' ? ((p.limitLow!=null&&p.limitLow!=='')?(p.limitLow+'-'+p.limitHigh):'') : (p.limit!=null?p.limit:'');
    var tr = document.createElement('tr');
    if(p.id) tr.setAttribute('data-id', p.id);
    tr.innerHTML =
      '<td><input type="checkbox" class="rf-confirm"'+(p.confirmed?' checked':'')+'></td>'+
      '<td>'+comboFieldHtml('rf-name', PARAM_NAME_OPTIONS, p.name, 'e.g. Total Kjeldahl Nitrogen')+'</td>'+
      '<td><select class="rf-type">'+
        '<option value="max"'+(p.limitType==='max'?' selected':'')+'>Max</option>'+
        '<option value="min"'+(p.limitType==='min'?' selected':'')+'>Min</option>'+
        '<option value="range"'+(p.limitType==='range'?' selected':'')+'>Range</option>'+
      '</select></td>'+
      '<td><input type="text" class="rf-limit limitnum" value="'+esc(limitVal)+'" placeholder="30 or 5.5-9.0"></td>'+
      '<td>'+comboFieldHtml('rf-unit', UNIT_OPTIONS, p.unit, 'e.g. kg/tonne')+'</td>'+
      '<td>'+comboFieldHtml('rf-freq', FREQUENCY_OPTIONS, p.frequency, 'e.g. Every campaign')+'</td>'+
      '<td><select class="rf-category">'+CATEGORY_OPTIONS.map(function(c){return '<option value="'+c.v+'"'+(p.category===c.v?' selected':'')+'>'+c.l+'</option>';}).join('')+'</select></td>'+
      '<td><button type="button" class="btn small ghost rf-remove" title="Remove row">✕</button></td>';
    tbody.appendChild(tr);
    tr.querySelector('.rf-remove').addEventListener('click', function(){ tr.remove(); });
    bindComboField(tr, 'rf-name');
    bindComboField(tr, 'rf-unit');
    bindComboField(tr, 'rf-freq');
  }

  function collectParamRows(){
    var rows = document.querySelectorAll('#pf-param-tbody tr');
    var out=[];
    rows.forEach(function(tr){
      var name = readComboField(tr, 'rf-name');
      if(!name) return;
      var type = tr.querySelector('.rf-type').value;
      var limitRaw = tr.querySelector('.rf-limit').value.trim();
      var limit=null, low=null, high=null;
      if(type==='range'){
        var m = limitRaw.match(/([\d.]+)\s*(?:-|–|to)\s*([\d.]+)/);
        if(m){ low=parseFloat(m[1]); high=parseFloat(m[2]); }
      } else {
        var n = parseFloat(limitRaw);
        if(!isNaN(n)) limit=n;
      }
      out.push({
        id: tr.getAttribute('data-id') || uid('param'),
        name:name, limitType:type, limit:limit, limitLow:low, limitHigh:high,
        unit: readComboField(tr, 'rf-unit'),
        frequency: readComboField(tr, 'rf-freq'),
        category: tr.querySelector('.rf-category').value,
        confirmed: tr.querySelector('.rf-confirm').checked
      });
    });
    return out;
  }

  var AI_PROMPT_TEMPLATE =
"I'm going to paste an environmental permit/consent document below. Read it and reply with ONLY a JSON array "+
"(no extra prose before it) where each item is exactly:\n"+
'{"name": string, "limitType": "max"|"min"|"range", "limit": number|null, "limitLow": number|null, '+
'"limitHigh": number|null, "unit": string, "frequency": string, "category": "water"|"air"|"waste"|"ghg"|"noise"|"other"}\n\n'+
"Include every numeric limit or condition you find, using the parameter name as written in the document. "+
"After the JSON array, on new lines, add a 2-3 sentence plain-English summary of what the facility must do to "+
"stay compliant. Here is the permit text:\n\n[PASTE YOUR PERMIT TEXT HERE]";

  function initPermitForm(){
    var sectorSel = document.getElementById('pf-sector');
    sectorSel.innerHTML = SECTORS.map(function(s){ return '<option value="'+s.id+'">'+esc(s.label)+'</option>'; }).join('');

    document.getElementById('permit-add-btn').addEventListener('click', showPermitForm);
    document.getElementById('permit-cancel-btn').addEventListener('click', showPermitList);

    document.querySelectorAll('#pf-source-toggle .seg-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        pfSource = btn.getAttribute('data-source');
        document.querySelectorAll('#pf-source-toggle .seg-btn').forEach(function(b){ b.classList.toggle('active', b===btn); });
        document.getElementById('pf-paste-panel').style.display = (pfSource==='paste') ? 'block' : 'none';
        document.getElementById('pf-manual-hint').style.display = (pfSource==='manual') ? 'block' : 'none';
      });
    });

    document.getElementById('pf-scan-btn').addEventListener('click', function(){
      var text = document.getElementById('pf-pastetext').value;
      var found = extractParametersFromText(text);
      if(found.length===0){
        alert('No numeric limits were recognised in that text. Try pasting shorter, one-condition-per-line text, or add rows manually below.');
        return;
      }
      found.forEach(addParamRow);
    });

    document.getElementById('pf-pdf-file').addEventListener('change', function(e){
      var file = e.target.files && e.target.files[0];
      var statusEl = document.getElementById('pf-pdf-status');
      if(!file) return;
      statusEl.textContent = 'Reading ' + file.name + '…';
      var timeout = new Promise(function(_, reject){ setTimeout(function(){ reject(new Error('timeout')); }, 20000); });
      Promise.race([extractTextFromPdfFile(file), timeout]).then(function(res){
        var text = (res.text || '').trim();
        if(!text){
          statusEl.textContent = 'No selectable text found. Use OCR to copy the text, or enter limits manually.';
          return;
        }
        document.getElementById('pf-pastetext').value = text;
        var pageNote = res.pageCount > res.scannedPages ? (' Read the first ' + res.scannedPages + ' of ' + res.pageCount + ' pages.') : '';
        statusEl.textContent = 'Extracted text from ' + res.scannedPages + ' page' + (res.scannedPages===1?'':'s') + '. Review it, then click "Scan for limits →".' + pageNote;
      }).catch(function(){
        statusEl.textContent = 'Couldn\'t read this PDF. Copy its conditions into the box below.';
      });
    });

    document.getElementById('pf-addrow-btn').addEventListener('click', function(){ addParamRow(null); });

    document.getElementById('pf-gensummary-btn').addEventListener('click', function(){
      var rows = collectParamRows();
      var text = buildSummaryFromParams(rows);
      document.getElementById('pf-summary').value = text || 'Confirm at least one row above, then generate the summary again.';
    });

    document.getElementById('pf-copy-prompt-btn').addEventListener('click', function(){
      var status = document.getElementById('pf-copy-status');
      var field = document.getElementById('pf-prompt-field');
      var ta = document.getElementById('pf-prompt-display');
      field.style.display = 'block';
      ta.value = AI_PROMPT_TEMPLATE;
      ta.focus(); ta.select();
      var manualLabel = 'Selected below. Copy it (Ctrl/Cmd+C), then paste it into Claude along with your permit text.';
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(AI_PROMPT_TEMPLATE).then(function(){
          status.textContent = 'Copied to clipboard.';
        }).catch(function(){ status.textContent = manualLabel; });
      } else {
        status.textContent = manualLabel;
      }
    });

    document.getElementById('pf-import-ai-btn').addEventListener('click', function(){
      var raw = document.getElementById('pf-ai-response').value;
      var statusEl = document.getElementById('pf-import-status');
      var m = raw.match(/\[[\s\S]*\]/);
      if(!m){ statusEl.textContent = "Couldn't find a JSON array in that reply. Check it matches the format from the copied prompt."; return; }
      var arr;
      try{ arr = JSON.parse(m[0]); }catch(e){ statusEl.textContent = 'That JSON could not be parsed. Check it was copied in full.'; return; }
      if(!Array.isArray(arr) || arr.length===0){ statusEl.textContent = 'No entries found in that JSON array.'; return; }
      var added=0;
      arr.forEach(function(item){
        if(!item || !item.name) return;
        addParamRow({
          name:item.name, limitType:item.limitType||'max', limit:item.limit,
          limitLow:item.limitLow, limitHigh:item.limitHigh, unit:item.unit||'',
          frequency:item.frequency||'', category:item.category||'other', confirmed:false
        });
        added++;
      });
      var trailing = raw.slice(raw.indexOf(m[0])+m[0].length).trim();
      var summaryBox = document.getElementById('pf-summary');
      if(trailing && !summaryBox.value.trim()) summaryBox.value = trailing;
      statusEl.textContent = 'Imported '+added+' row'+(added===1?'':'s')+'. Review and tick "confirmed" for each before saving.';
    });

    document.getElementById('permit-form').addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('pf-name').value.trim();
      if(!name){ alert('Give the facility a name before saving.'); return; }
      var rows = collectParamRows();
      var permit = {
        id: uid('permit'),
        name:name,
        sector: document.getElementById('pf-sector').value,
        jurisdiction: document.getElementById('pf-jurisdiction').value,
        ref: document.getElementById('pf-ref').value.trim(),
        parameters: rows,
        monthlyData: [],
        summary: document.getElementById('pf-summary').value.trim() || buildSummaryFromParams(rows),
        createdAt: Date.now()
      };
      permits.push(permit);
      savePermits();
      openPermitId = permit.id;
      showPermitList();
    });
  }

  // ---------- Backup: export / import ----------
  function exportBackup(){
    var payload = {
      app: 'Baseline', version: 1, exportedAt: new Date().toISOString(),
      projects: projects, permits: permits,
      review: (function(){ try{ return JSON.parse(localStorage.getItem('baseline_review_v1')||'[]'); }catch(e){ return []; } })()
    };
    var blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'baseline-backup-'+new Date().toISOString().slice(0,10)+'.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  }
  document.getElementById('export-data-btn').addEventListener('click', exportBackup);

  (function initImportHintPopover(){
    var btn = document.getElementById('import-data-btn');
    var popover = document.getElementById('import-hint-popover');
    var fileInput = document.getElementById('import-data-file');
    if(!btn || !popover || !fileInput) return;
    var hideTimer = null;
    function showPopover(){
      popover.classList.add('show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hidePopover, 4000);
    }
    function hidePopover(){
      popover.classList.remove('show');
      clearTimeout(hideTimer);
    }
    btn.addEventListener('click', function(){
      showPopover();
      // Let the hint render a beat before the OS file picker takes over the screen.
      setTimeout(function(){ fileInput.click(); }, 220);
    });
    // The native file dialog blurs the window; hide the hint shortly after focus returns,
    // whether the user picked a file or cancelled.
    window.addEventListener('focus', function(){ setTimeout(hidePopover, 300); });
    fileInput.addEventListener('change', hidePopover);
  })();

  document.getElementById('import-data-file').addEventListener('change', function(e){
    var input = e.target;
    var file = input.files && input.files[0];
    if(!file) return;
    var reader = new FileReader();
    reader.onload = function(){
      var data;
      try{ data = JSON.parse(reader.result); }
      catch(err){
        alert("That file isn't valid JSON. The export may be corrupted, or this isn't a Baseline backup file.");
        input.value = '';
        return;
      }
      var importedProjects = Array.isArray(data.projects) ? data.projects : [];
      var importedPermits = Array.isArray(data.permits) ? data.permits : [];
      if(importedProjects.length===0 && importedPermits.length===0){
        alert('No projects or permits were found in that file.');
        input.value = '';
        return;
      }
      if(Array.isArray(data.review) && data.review.length){
        try{
          var cur = JSON.parse(localStorage.getItem('baseline_review_v1')||'[]');
          var have = {}; cur.forEach(function(r){ have[r.id]=true; });
          data.review.forEach(function(r){ if(r && r.id && !have[r.id]) cur.push(r); });
          localStorage.setItem('baseline_review_v1', JSON.stringify(cur));
        }catch(e){}
      }
      var existingProjectIds = {}; projects.forEach(function(p){ existingProjectIds[p.id]=true; });
      var existingPermitIds = {}; permits.forEach(function(p){ existingPermitIds[p.id]=true; });
      var newProjects = importedProjects.filter(function(p){ return p && p.id && !existingProjectIds[p.id]; });
      var newPermits = importedPermits.filter(function(p){ return p && p.id && !existingPermitIds[p.id]; });
      if(newProjects.length===0 && newPermits.length===0){
        alert('This portfolio already contains everything in that file.');
        input.value = '';
        return;
      }
      var skipped = (importedProjects.length-newProjects.length) + (importedPermits.length-newPermits.length);
      var msg = 'Import '+newProjects.length+' project'+(newProjects.length===1?'':'s')+' and '+
        newPermits.length+' permit'+(newPermits.length===1?'':'s')+
        (skipped>0 ? ' ('+skipped+' already present here, skipped)' : '')+'? This adds to your current portfolio; it does not overwrite anything.';
      if(!confirm(msg)){ input.value = ''; return; }
      projects = projects.concat(newProjects);
      permits = permits.concat(newPermits);
      saveProjects();
      savePermits();
      renderPortfolio();
      if(document.getElementById('view-permits').classList.contains('active')) showPermitList();
      alert('Imported '+newProjects.length+' project'+(newProjects.length===1?'':'s')+' and '+newPermits.length+' permit'+(newPermits.length===1?'':'s')+'.');
      input.value = '';
    };
    reader.onerror = function(){ alert('Could not read that file.'); input.value = ''; };
    reader.readAsText(file);
  });

  // ---------- Init ----------
  initPermitForm();
  renderPortfolio();
  renderLibrary();
})();
