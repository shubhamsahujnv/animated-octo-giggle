

/* ================= GHG INVENTORY — ISO 14064-1:2018 / GHG Protocol ================= */
(function(){
  var KEY = 'baseline.ghg.v1';
  var host = document.getElementById('view-ghg');
  if(!host) return;

  // Grid electricity factors, kgCO2e/kWh (location-based) — [code, name, factor, source]
  var GRIDS = [
    ['IN','India, national weighted average',0.716,'CEA CO₂ Baseline Database v20 — use for corporate Scope 2, location-based'],
    ['IN_OM','India, operating margin (project baseline)',0.90,'CEA v20 operating margin — CDM/CCTS project baselines, not corporate Scope 2'],
    ['IN_CM','India, combined margin (project baseline)',0.82,'CEA v20 combined margin — project baselines only'],
    ['US_CAMX','US · CAMX (California)',0.239,'US EPA eGRID subregion'],
    ['US_ERCT','US · ERCOT (Texas)',0.394,'US EPA eGRID subregion'],
    ['US_RFCE','US · RFCE (Mid-Atlantic)',0.324,'US EPA eGRID subregion'],
    ['US_RFCW','US · RFCW (Ohio Valley)',0.436,'US EPA eGRID subregion'],
    ['US_RFCM','US · RFCM (Michigan)',0.500,'US EPA eGRID subregion'],
    ['US_SRSO','US · SRSO (Southeast)',0.366,'US EPA eGRID subregion'],
    ['US_SRVC','US · SRVC (Carolinas)',0.276,'US EPA eGRID subregion'],
    ['US_SRTV','US · SRTV (Tennessee Valley)',0.362,'US EPA eGRID subregion'],
    ['US_SRMV','US · SRMV (Mississippi Valley)',0.365,'US EPA eGRID subregion'],
    ['US_FRCC','US · FRCC (Florida)',0.359,'US EPA eGRID subregion'],
    ['US_NEWE','US · NEWE (New England)',0.243,'US EPA eGRID subregion'],
    ['US_NYUP','US · NYUP (Upstate New York)',0.121,'US EPA eGRID subregion'],
    ['US_NYCW','US · NYCW (NYC / Westchester)',0.252,'US EPA eGRID subregion'],
    ['US_NWPP','US · NWPP (Northwest)',0.290,'US EPA eGRID subregion'],
    ['US_AZNM','US · AZNM (Arizona / New Mexico)',0.396,'US EPA eGRID subregion'],
    ['US_RMPA','US · RMPA (Rockies)',0.485,'US EPA eGRID subregion'],
    ['US_MROW','US · MROW (Upper Midwest)',0.383,'US EPA eGRID subregion'],
    ['US_MROE','US · MROE (Wisconsin)',0.494,'US EPA eGRID subregion'],
    ['US_SPNO','US · SPNO (Kansas)',0.446,'US EPA eGRID subregion'],
    ['US_SPSO','US · SPSO (Oklahoma / N. Texas)',0.415,'US EPA eGRID subregion'],
    ['US','United States (national avg)',0.371,'US EPA eGRID2023'],
    ['UK','United Kingdom',0.17752,'UK DESNZ 2025 conversion factors'],
    ['EU','EU-27 average',0.226,'EEA 2024 (2023 data)'],
    ['DE','Germany',0.363,'EEA / UBA 2024'],
    ['FR','France',0.056,'EEA 2024 (2023 data)'],
    ['CN','China',0.5703,'MEE national grid factor 2024'],
    ['JP','Japan',0.436,'IEA 2024'],
    ['AU','Australia',0.63,'Australia NGA Factors 2024'],
    ['BR','Brazil',0.0996,'IEA 2024'],
    ['ZA','South Africa',0.91,'IEA 2024'],
    ['CA','Canada',0.11,'ECCC NIR 2024'],
    ['AE','United Arab Emirates',0.36,'IEA 2024'],
    ['SG','Singapore',0.4168,'EMA Singapore 2024'],
    ['ID','Indonesia',0.78,'IEA 2024'],
    ['VN','Vietnam',0.68,'IEA 2024'],
    ['MX','Mexico',0.423,'IEA 2024'],
    ['GL','Global average',0.445,'IEA Emissions Factors 2024']
  ];

  // [id, scope, isoCategory, group, name, unit, kgCO2e per unit, biogenicCO2 kg/unit, source]
  var DESNZ='UK DESNZ 2025', EPA='US EPA Emission Factors Hub 2025', AR6='IPCC AR6 GWP100', CEA='CEA India 2024-25', ECOI='Ecoinvent 3.10 / DEFRA material factors';
  var ACTS = [
    // ---- Scope 1 / ISO cat 1 ----
    ['s1_ng',1,1,'1.1 Stationary combustion','Natural gas','m³',2.04653,0,DESNZ],
    ['s1_lpg',1,1,'1.1 Stationary combustion','LPG','litre',1.55709,0,DESNZ],
    ['s1_do',1,1,'1.1 Stationary combustion','Diesel / gas oil','litre',2.75776,0,DESNZ],
    ['s1_fo',1,1,'1.1 Stationary combustion','Furnace / fuel oil','litre',3.17493,0,DESNZ],
    ['s1_coal',1,1,'1.1 Stationary combustion','Coal (industrial)','tonne',2382.94,0,DESNZ],
    ['s1_bio',1,1,'1.1 Stationary combustion','Biomass / wood chips','tonne',47.62,1560,DESNZ],
    ['s1_pet',1,2,'1.2 Mobile combustion','Petrol / gasoline','litre',2.34988,0,DESNZ],
    ['s1_mdo',1,2,'1.2 Mobile combustion','Diesel (vehicles)','litre',2.66155,0,DESNZ],
    ['s1_cng',1,2,'1.2 Mobile combustion','CNG','kg',2.69826,0,DESNZ],
    ['s1_car',1,2,'1.2 Mobile combustion','Owned car (avg)','km',0.16843,0,DESNZ],
    ['s1_hgv',1,2,'1.2 Mobile combustion','Owned HGV (avg laden)','km',0.84987,0,DESNZ],
    ['s1_r134',1,1,'1.3 Fugitive emissions','Refrigerant R-134a leakage','kg',1526,0,AR6],
    ['s1_r410',1,1,'1.3 Fugitive emissions','Refrigerant R-410A leakage','kg',2255,0,AR6],
    ['s1_r32',1,1,'1.3 Fugitive emissions','Refrigerant R-32 leakage','kg',771,0,AR6],
    ['s1_r404',1,1,'1.3 Fugitive emissions','Refrigerant R-404A leakage','kg',4728,0,AR6],
    ['s1_r22',1,1,'1.3 Fugitive emissions','Refrigerant R-22 leakage','kg',1960,0,AR6],
    ['s1_r407',1,1,'1.3 Fugitive emissions','Refrigerant R-407C leakage','kg',1907,0,AR6],
    ['s1_r1234',1,1,'1.3 Fugitive emissions','Refrigerant R-1234yf leakage','kg',0.501,0,AR6],
    ['s1_sf6',1,1,'1.3 Fugitive emissions','SF₆ released (switchgear)','kg',25200,0,AR6],
    ['s1_ch4',1,1,'1.3 Fugitive emissions','Methane (CH₄) released','kg',29.8,0,AR6],
    ['s1_n2o',1,1,'1.3 Fugitive emissions','Nitrous oxide (N₂O) released','kg',273,0,AR6],
    ['s1_proc',1,1,'1.4 Process emissions','Process CO₂e (measured)','tCO₂e',1000,0,'Site measurement'],
    ['s1_clink',1,1,'1.4 Process emissions','Clinker produced (calcination)','tonne',525,0,'IPCC 2006 Vol.3 Ch.2'],
    ['s1_land',1,1,'1.4 Process emissions','Fertiliser N applied (direct N₂O)','kg N',4.42,0,'IPCC 2019 Refinement + AR6'],
    // ---- Scope 2 / ISO cat 2 ----
    ['s2_elec',2,2,'2.1 Purchased electricity','Grid electricity','kWh',0.716,0,CEA],
    ['s2_steam',2,2,'2.2 Purchased heat / steam','Purchased steam or heat','kWh',0.17097,0,DESNZ],
    ['s2_cool',2,2,'2.2 Purchased heat / steam','Purchased cooling','kWh',0.150,0,EPA],
    // ---- Scope 3 ----
    ['s3_1s',3,4,'3.1 Purchased goods & services','Spend-based, general goods','currency unit',0.35,0,'EPA USEEIO v2.1 (spend-based)'],
    ['s3_1st',3,4,'3.1 Purchased goods & services','Steel purchased','tonne',2100,0,'worldsteel 2024 (BF-BOF avg)'],
    ['s3_1cm',3,4,'3.1 Purchased goods & services','Cement purchased','tonne',600,0,'GCCA GNR 2023'],
    ['s3_1al',3,4,'3.1 Purchased goods & services','Aluminium purchased (primary)','tonne',16100,0,'IAI 2024 global avg'],
    ['s3_1pl',3,4,'3.1 Purchased goods & services','Plastics purchased','tonne',3116,0,ECOI],
    ['s3_1pa',3,4,'3.1 Purchased goods & services','Paper / board purchased','tonne',919,0,ECOI],
    ['s3_1w',3,4,'3.1 Purchased goods & services','Purchased water supply','m³',0.177,0,DESNZ],
    ['s3_2',3,4,'3.2 Capital goods','Spend-based, capital equipment','currency unit',0.30,0,'EPA USEEIO v2.1 (spend-based)'],
    ['s3_3e',3,4,'3.3 Fuel & energy-related (not in S1/S2)','Electricity WTT + T&D losses','kWh',0.098,0,DESNZ+' (WTT + T&D)'],
    ['s3_3f',3,4,'3.3 Fuel & energy-related (not in S1/S2)','Fuel WTT (diesel)','litre',0.60986,0,DESNZ+' (WTT)'],
    ['s3_3g',3,4,'3.3 Fuel & energy-related (not in S1/S2)','Fuel WTT (natural gas)','m³',0.34593,0,DESNZ+' (WTT)'],
    ['s3_4r',3,3,'3.4 Upstream transport & distribution','Road freight','tonne-km',0.10749,0,DESNZ],
    ['s3_4s',3,3,'3.4 Upstream transport & distribution','Sea freight','tonne-km',0.01614,0,DESNZ],
    ['s3_4a',3,3,'3.4 Upstream transport & distribution','Air freight','tonne-km',0.60196,0,DESNZ],
    ['s3_4l',3,3,'3.4 Upstream transport & distribution','Rail freight','tonne-km',0.02556,0,DESNZ],
    ['s3_5l',3,4,'3.5 Waste generated in operations','Waste to landfill (mixed)','tonne',446.24,0,DESNZ],
    ['s3_5r',3,4,'3.5 Waste generated in operations','Waste recycled','tonne',21.28,0,DESNZ],
    ['s3_5i',3,4,'3.5 Waste generated in operations','Waste incinerated','tonne',21.28,0,DESNZ],
    ['s3_5c',3,4,'3.5 Waste generated in operations','Organic waste composted','tonne',8.91,0,DESNZ],
    ['s3_5w',3,4,'3.5 Waste generated in operations','Wastewater treated','m³',0.272,0,DESNZ],
    ['s3_6s',3,3,'3.6 Business travel','Air travel, short-haul','passenger-km',0.15102,0,DESNZ+' (economy, with RF)'],
    ['s3_6l',3,3,'3.6 Business travel','Air travel, long-haul','passenger-km',0.14787,0,DESNZ+' (economy, with RF)'],
    ['s3_6r',3,3,'3.6 Business travel','Rail travel','passenger-km',0.03546,0,DESNZ],
    ['s3_6t',3,3,'3.6 Business travel','Taxi / hired car','km',0.14876,0,DESNZ],
    ['s3_6h',3,4,'3.6 Business travel','Hotel nights','night',10.4,0,DESNZ+' (UK avg)'],
    ['s3_7c',3,3,'3.7 Employee commuting','Commute by car','passenger-km',0.16843,0,DESNZ],
    ['s3_7b',3,3,'3.7 Employee commuting','Commute by bus','passenger-km',0.10312,0,DESNZ],
    ['s3_7r',3,3,'3.7 Employee commuting','Commute by rail / metro','passenger-km',0.03546,0,DESNZ],
    ['s3_7h',3,4,'3.7 Employee commuting','Homeworking','employee-day',2.5,0,'EcoAct Homeworking 2024'],
    ['s3_8',3,4,'3.8 Upstream leased assets','Leased asset emissions (measured)','tCO₂e',1000,0,'Site measurement'],
    ['s3_9',3,3,'3.9 Downstream transport & distribution','Distribution road freight','tonne-km',0.10749,0,DESNZ],
    ['s3_10',3,5,'3.10 Processing of sold products','Processing emissions (measured)','tCO₂e',1000,0,'Customer data'],
    ['s3_11e',3,5,'3.11 Use of sold products','Lifetime electricity use of products','kWh',0.716,0,CEA],
    ['s3_11f',3,5,'3.11 Use of sold products','Lifetime fuel use of products','litre',2.66155,0,DESNZ],
    ['s3_12',3,5,'3.12 End-of-life of sold products','Sold products landfilled','tonne',446.24,0,DESNZ],
    ['s3_13',3,5,'3.13 Downstream leased assets','Leased-out asset emissions','tCO₂e',1000,0,'Site measurement'],
    ['s3_14',3,5,'3.14 Franchises','Franchise emissions','tCO₂e',1000,0,'Franchisee data'],
    ['s3_15',3,6,'3.15 Investments','Financed emissions (attributed)','tCO₂e',1000,0,'PCAF Standard 2024'],
    // ---- Fuel by measured energy content (most accurate for coal, biomass and mixed fuels) ----
    ['s1_gj',1,1,'1.1 Stationary combustion','Fuel by energy content (enter GJ, net calorific value)','GJ',96.1,0,'IPCC 2006 default, sub-bituminous coal; edit to your fuel and lab GCV'],
    // ---- Process emissions common to metals, plating, pharma and laboratories ----
    ['s1_lime',1,1,'1.4 Process emissions','Limestone / lime flux consumed','tonne',440,0,'IPCC 2006 Vol.3 Ch.2 (CaCO₃ calcination)'],
    ['s1_carbel',1,1,'1.4 Process emissions','Carbon electrodes, anodes or coke consumed','tonne',3663,0,'IPCC 2006 Vol.3 (carbon fully oxidised)'],
    ['s1_acid',1,1,'1.4 Process emissions','Carbonate used in pickling or neutralisation','tonne',440,0,'IPCC 2006 Vol.3 Ch.2'],
    ['s1_solv',1,1,'1.4 Process emissions','Solvent evaporated (carbon content oxidised)','tonne',2500,0,'IPCC 2006 Vol.3 solvent use (indicative, edit to your solvent)'],
    ['s1_urea',1,1,'1.4 Process emissions','Urea or DEF consumed','tonne',733,0,'IPCC 2006 (CO₂ released from urea)'],
    ['s1_weld',1,1,'1.4 Process emissions','Welding / cutting shielding gas (CO₂) used','kg',1,0,'CO₂ released as supplied'],
    ['s3_5hz',3,4,'3.5 Waste generated in operations','Hazardous / chemical waste incinerated','tonne',1100,0,'IPCC 2006 waste incineration (indicative)'],
    ['s3_5bm',3,4,'3.5 Waste generated in operations','Biomedical waste incinerated','tonne',1200,0,'IPCC 2006 / CPCB practice (indicative)'],
    ['s3_5sl',3,4,'3.5 Waste generated in operations','ETP or STP sludge disposed','tonne',300,0,'IPCC 2006 solid waste (indicative)'],
    ['custom',3,6,'3.15 Investments','Custom activity, set your own factor','unit',1,0,'User-defined']
  ];
  var ACT_BY_ID = {}; ACTS.forEach(function(a){ ACT_BY_ID[a[0]] = a; });
  var GROUPS = []; ACTS.forEach(function(a){ if(GROUPS.indexOf(a[3])<0) GROUPS.push(a[3]); });
  var ISO_NAMES = {1:'Cat 1 · Direct emissions',2:'Cat 2 · Indirect, imported energy',3:'Cat 3 · Indirect, transportation',4:'Cat 4 · Indirect, products used by the organisation',5:'Cat 5 · Indirect, use of products from the organisation',6:'Cat 6 · Other indirect'};
  window.BaselineFactors = { acts: ACTS, groups: GROUPS };

  /* ---------- National factor packs: [label, unit, kgCO2e per unit, source] ---------- */
  var BASE_ACTS = {}; ACTS.forEach(function(a){ BASE_ACTS[a[0]] = a.slice(); });
  var EPA25 = 'US EPA Emission Factors Hub 2025', WARM = 'US EPA WARM (indicative)';
  var INSRC = 'IPCC 2006 defaults with Indian calorific values (indicative, replace with supplier data)';
  var PACKS = {
    US: {
      s1_ng:['Natural gas','therm',5.311,EPA25],
      s1_lpg:['Propane / LPG','gallon',5.76,EPA25],
      s1_do:['Diesel / distillate no.2','gallon',10.21,EPA25],
      s1_fo:['Residual fuel oil no.6','gallon',11.80,EPA25],
      s1_coal:['Coal, bituminous (industrial)','short ton',2325,EPA25],
      s1_bio:['Wood / biomass','short ton',30,EPA25,1640],
      s1_gj:['Fuel by energy content (enter MMBtu, HHV)','MMBtu',53.11,EPA25+' (natural gas; edit to your fuel)'],
      s1_pet:['Gasoline (motor)','gallon',8.78,EPA25],
      s1_mdo:['Diesel (vehicles)','gallon',10.21,EPA25],
      s1_cng:['CNG','gallon equivalent (GGE)',6.86,EPA25],
      s1_car:['Owned passenger car','mile',0.343,EPA25],
      s1_hgv:['Owned heavy-duty truck','mile',1.61,EPA25],
      s2_steam:['Purchased steam or heat','MMBtu',66.33,EPA25],
      s2_cool:['Purchased cooling','MMBtu',52.70,EPA25],
      s3_3e:['Electricity T&D losses','kWh',0.017,EPA25+' (US average line losses)'],
      s3_3f:['Fuel upstream (diesel, well-to-tank)','gallon',2.44,EPA25],
      s3_3g:['Fuel upstream (natural gas, well-to-tank)','therm',1.06,EPA25],
      s3_4r:['Road freight','short ton-mile',0.2088,EPA25],
      s3_4s:['Waterborne freight','short ton-mile',0.0483,EPA25],
      s3_4a:['Air freight','short ton-mile',1.2712,EPA25],
      s3_4l:['Rail freight','short ton-mile',0.0221,EPA25],
      s3_9:['Distribution road freight','short ton-mile',0.2088,EPA25],
      s3_5l:['Waste to landfill (mixed MSW)','short ton',520,WARM],
      s3_5r:['Waste recycled','short ton',40,WARM],
      s3_5i:['Waste incinerated (waste to energy)','short ton',430,WARM],
      s3_5c:['Organic waste composted','short ton',170,WARM],
      s3_6s:['Air travel, short-haul (under 300 miles)','passenger-mile',0.2079,EPA25+' (no radiative forcing uplift)'],
      s3_6l:['Air travel, long-haul','passenger-mile',0.1544,EPA25+' (no radiative forcing uplift)'],
      s3_6r:['Rail travel (intercity)','passenger-mile',0.1137,EPA25],
      s3_6t:['Taxi / hired car','mile',0.343,EPA25],
      s3_7c:['Commute by car','passenger-mile',0.343,EPA25],
      s3_7b:['Commute by bus','passenger-mile',0.0805,EPA25],
      s3_7r:['Commute by rail / transit','passenger-mile',0.117,EPA25],
      s3_1s:['Spend-based, general goods','USD',0.35,'EPA USEEIO v2.1 (spend-based, USD)'],
      s3_2:['Spend-based, capital equipment','USD',0.30,'EPA USEEIO v2.1 (spend-based, USD)'],
      s3_11f:['Lifetime fuel use of products','gallon',10.21,EPA25]
    },
    IN: {
      s1_ng:['Natural gas','SCM',2.10,INSRC],
      s1_lpg:['LPG','kg',2.98,INSRC],
      s1_do:['Diesel / HSD','litre',2.68,INSRC],
      s1_fo:['Furnace oil','litre',3.10,INSRC],
      s1_coal:['Indian non-coking coal','tonne',1750,INSRC+' — GCV varies widely by grade, use the energy-content line with your lab GCV where possible'],
      s1_gj:['Fuel by energy content (enter GJ, net calorific value)','GJ',96.1,'IPCC 2006 default for Indian coal; edit to your fuel and lab GCV'],
      s1_pet:['Petrol / MS','litre',2.30,INSRC],
      s1_mdo:['Diesel (vehicles)','litre',2.68,INSRC],
      s1_cng:['CNG','kg',2.68,INSRC],
      s1_car:['Owned car (avg)','km',0.142,'India GHG Programme (indicative)'],
      s1_hgv:['Owned truck (avg laden)','km',0.75,'India GHG Programme (indicative)'],
      s3_3e:['Electricity T&D losses','kWh',0.121,'CEA — Indian T&D losses (~17% of the grid factor)'],
      s3_3f:['Fuel upstream (diesel, well-to-tank)','litre',0.52,'IPCC / IEA upstream (indicative)'],
      s3_3g:['Fuel upstream (natural gas, well-to-tank)','SCM',0.35,'IPCC / IEA upstream (indicative)'],
      s3_4r:['Road freight','tonne-km',0.085,'India GHG Programme road freight (indicative)'],
      s3_4l:['Rail freight','tonne-km',0.0085,'Indian Railways / India GHG Programme (indicative)'],
      s3_9:['Distribution road freight','tonne-km',0.085,'India GHG Programme (indicative)'],
      s3_6s:['Air travel, short-haul','passenger-km',0.129,'ICAO / India GHG Programme (no radiative forcing uplift)'],
      s3_6l:['Air travel, long-haul','passenger-km',0.115,'ICAO / India GHG Programme (no radiative forcing uplift)'],
      s3_6r:['Rail travel','passenger-km',0.008,'Indian Railways (electrified network, indicative)'],
      s3_6t:['Taxi / hired car','km',0.142,'India GHG Programme (indicative)'],
      s3_7c:['Commute by car','passenger-km',0.142,'India GHG Programme (indicative)'],
      s3_7b:['Commute by bus','passenger-km',0.030,'India GHG Programme (indicative)'],
      s3_7r:['Commute by rail / metro','passenger-km',0.014,'Metro / Indian Railways (indicative)'],
      s3_1s:['Spend-based, general goods','INR',0.00042,'Input-output intensity for Indian manufacturing (indicative, kgCO₂e per rupee)'],
      s3_2:['Spend-based, capital equipment','INR',0.00036,'Input-output intensity for Indian manufacturing (indicative, kgCO₂e per rupee)']
    }
  };
  /* Units differ between packs (m³ vs therm, litre vs gallon, tonne vs short ton).
     Quantities are converted when the pack changes so the numbers stay true. */
  var UNIT_TO = {
    'litre':['vol',1],'litres':['vol',1],'kilolitre':['vol',1000],'gallon':['vol',3.78541],
    'kg':['mass',1],'tonne':['mass',1000],'tonnes':['mass',1000],'short ton':['mass',907.185],'gallon equivalent (GGE)':['mass',5.66],
    'm³':['nrg',37.26],'SCM':['nrg',37.26],'therm':['nrg',105.506],'MMBtu':['nrg',1055.06],'GJ':['nrg',1000],'kWh':['nrg',3.6],'MWh':['nrg',3600],
    'km':['dist',1],'mile':['dist',1.60934],'miles':['dist',1.60934],
    'tonne-km':['frt',1],'short ton-mile':['frt',1.45997],
    'passenger-km':['pax',1],'passenger-mile':['pax',1.60934]
  };
  /* LPG crosses volume and mass, so it carries its own factors (0.54 kg per litre) */
  var UNIT_OVR = { s1_lpg: {'litre':0.54,'litres':0.54,'gallon':2.044,'kg':1} };
  function convQty(id, q, from, to){
    if(!q || !from || !to || from===to) return null;
    var o = UNIT_OVR[id];
    if(o && o[from]!=null && o[to]!=null) return q*o[from]/o[to];
    var a = UNIT_TO[from], b = UNIT_TO[to];
    if(!a || !b || a[0]!==b[0]) return null;
    return q*a[1]/b[1];
  }

  function applyPack(code){
    var before = {}, beforeU = {};
    ACTS.forEach(function(a){ before[a[0]] = a[6]; beforeU[a[0]] = a[5]; });
    ACTS.forEach(function(a){
      var b = BASE_ACTS[a[0]]; if(!b) return;
      a[4] = b[4]; a[5] = b[5]; a[6] = b[6]; a[7] = b[7]; a[8] = b[8];
    });
    var pack = PACKS[code];
    if(pack) Object.keys(pack).forEach(function(id){
      var a = ACT_BY_ID[id], p = pack[id]; if(!a) return;
      a[4] = p[0]; a[5] = p[1]; a[6] = p[2]; a[8] = p[3];
      if(p.length > 4) a[7] = p[4];
    });
    // convert entered quantities into the new pack's units, and keep unedited factors in step
    var moved = 0, stuck = [];
    st.rows.forEach(function(r){
      var a = ACT_BY_ID[r.act]; if(!a) return;
      var from = beforeU[r.act], to = a[5];
      if(from !== to && num(r.qty)){
        var q = convQty(r.act, num(r.qty), from, to);
        if(q != null){
          r.qty = String(parseFloat(q.toFixed(6)));
          r.note = (r.note ? r.note+' · ' : '') + 'converted ' + from + ' to ' + to;
          moved++;
        } else if(stuck.indexOf(a[4]) < 0){ stuck.push(a[4]); }
      }
      if(r.ef==='' || r.ef==null) return;
      if(Math.abs(parseFloat(r.ef) - before[r.act]) < 1e-9) r.ef = a[6];
    });
    return {converted: moved, unconverted: stuck};
  }

  var st = {org:'',year:'',approach:'Operational control',grid:'IN',region:'IN',base:'',recalc:'',excl:'',market:'',rev:'',cur:'',revppp:'',prod:'',produnit:'',fte:'',rows:[]};
  try{ var raw = localStorage.getItem(KEY); if(raw){ var p = JSON.parse(raw); if(p && typeof p==='object'){ st = Object.assign(st, p); } } }catch(e){}
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){} }
  applyPack(st.region);

  var DQ = [
    ['metered','Metered or measured','±5%',0.05],
    ['invoice','Invoice or bill','±10%',0.10],
    ['calc','Calculated from records','±20%',0.20],
    ['est','Estimated','±40%',0.40],
    ['proxy','Proxy or industry average','±60%',0.60]
  ];
  var DQ_BY = {}; DQ.forEach(function(d){ DQ_BY[d[0]] = d; });
  function defaultDq(r){
    var n = String(r.note||'').toLowerCase();
    if(r.act==='custom') return 'est';
    if(/meter|reading|logger|scada|kwh read/.test(n)) return 'metered';
    if(/invoice|bill|receipt|statement|delivery|purchase register|guided setup|imported from document/.test(n)) return 'invoice';
    if(r.freq) return 'metered';
    if(r.act==='s3_1s' || r.act==='s3_2') return 'proxy';
    if(/spend|proxy|industry average|assumed|estimate/.test(n)) return 'proxy';
    if(/^s3_/.test(r.act||'')) return 'calc';
    if(/^s2_/.test(r.act||'')) return 'invoice';
    return 'calc';
  }
  function dqOf(r){ return DQ_BY[r.dq] || DQ_BY[defaultDq(r)] || DQ_BY['est']; }
  function esc2(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function num(v){ var n = parseFloat(v); return isFinite(n)?n:0; }
  function fmt(t){ if(!t) return '0'; var a=Math.abs(t); return t.toLocaleString(undefined,{maximumFractionDigits:a<1?3:(a<100?2:0)}); }
  function uid(){ return 'g'+Date.now().toString(36)+Math.random().toString(36).slice(2,6); }

  function ef(r){ var a = ACT_BY_ID[r.act]; return r.ef===''||r.ef==null ? (a?a[6]:0) : num(r.ef); }
  function tco2e(r){ return num(r.qty)*ef(r)/1000; }
  function bio(r){ var a = ACT_BY_ID[r.act]; return a ? num(r.qty)*a[7]/1000 : 0; }

  function totals(){
    var t = {1:0,2:0,3:0,bio:0,iso:{1:0,2:0,3:0,4:0,5:0,6:0},group:{}};
    st.rows.forEach(function(r){
      var a = ACT_BY_ID[r.act]; if(!a) return;
      var v = tco2e(r), sc = r.act==='custom' ? (num(r.scope)||3) : a[1], ic = r.act==='custom' ? (num(r.iso)||6) : a[2];
      t[sc] += v; t.iso[ic] += v; t.bio += bio(r);
      t.group[r.group] = (t.group[r.group]||0) + v;
    });
    t.total = t[1]+t[2]+t[3];
    t.market = st.market==='' ? null : t[1] + num(st.market) + t[3];
    return t;
  }

  function rowHtml(r){
    var a = ACT_BY_ID[r.act] || ACT_BY_ID['custom'];
    var isCustom = r.act === 'custom';
    var opts = ACTS.filter(function(x){ return x[3]===r.group || x[0]==='custom'; })
      .map(function(x){ return '<option value="'+x[0]+'"'+(x[0]===r.act?' selected':'')+'>'+esc2(x[4])+'</option>'; }).join('');
    return '<div class="ghg-row" data-id="'+r.id+'">'+
      '<div><label>Activity</label><select data-f="act">'+opts+'</select>'+
        (isCustom?'<input type="text" data-f="label" placeholder="Describe the activity" value="'+esc2(r.label||'')+'" style="margin-top:6px;">':'')+'</div>'+
      '<div><label>Date / period</label><input type="date" data-f="period" value="'+esc2(r.period||'')+'"></div>'+
      '<div><label>Quantity ('+esc2(isCustom?(r.unit||'unit'):a[5])+')</label><input type="number" step="any" min="0" data-f="qty" value="'+esc2(r.qty)+'"></div>'+
      '<div><label>Factor kgCO₂e/'+esc2(isCustom?(r.unit||'unit'):a[5])+'</label><input type="number" step="any" min="0" data-f="ef" value="'+esc2(r.ef===''||r.ef==null?a[6]:r.ef)+'">'+
        '<span class="hint" style="display:block;margin-top:4px;font-size:11px;">'+(isCustom?'User-defined factor':'Published: '+a[6]+' · '+esc2(a[8]||'')+(num(r.ef)&&Math.abs(num(r.ef)-a[6])>1e-9?' <strong>(edited)</strong>':''))+'</span></div>'+
      '<div><label>Note / source</label><input type="text" data-f="note" placeholder="Meter, invoice, factor source" value="'+esc2(r.note||'')+'"></div>'+
      '<div><label>Data quality</label><select data-f="dq">'+DQ.map(function(d){ return '<option value="'+d[0]+'"'+(dqOf(r)[0]===d[0]?' selected':'')+'>'+d[1]+' ('+d[2]+')</option>'; }).join('')+'</select>'+
        (r.dq?'':'<span class="hint" style="display:block;margin-top:4px;font-size:11px;">Assumed from how this line was entered. Change it if you know better.</span>')+'</div>'+
      '<div class="ghg-out">'+fmt(tco2e(r))+' t</div>'+
      '<button class="ghg-x" data-del="'+r.id+'" title="Remove line" aria-label="Delete entry">×</button>'+
      '</div>';
  }

  /* ---------- Data quality and uncertainty (ISO 14064-3 expects both) ---------- */
  function dqStats(){
    var t = totals(), by = {}, unc = 0;
    DQ.forEach(function(d){ by[d[0]] = 0; });
    st.rows.forEach(function(r){
      var v = Math.abs(tco2e(r)), d = dqOf(r);
      by[d[0]] += v;
      unc += Math.pow(v * d[3], 2);
    });
    return { by: by, total: t.total, unc: t.total ? (Math.sqrt(unc)/t.total)*100 : 0,
      measured: t.total ? ((by.metered + by.invoice)/t.total)*100 : 0 };
  }
  function intensityHtml(){
    var t = totals(), rev=num(st.rev), ppp=num(st.revppp), fte=num(st.fte), prod=num(st.prod);
    var cur = st.cur||'', unit = st.produnit||'', s12 = t[1]+t[2];
    function row(l, v, u, miss){
      return '<tr><td>'+l+'</td><td class="num">'+(v==null? '<span class="hint">'+miss+'</span>' : fmt(v)+' '+esc2(u))+'</td></tr>';
    }
    var per = cur ? ('tCO\u2082e per '+cur) : 'tCO\u2082e per revenue unit';
    return '<div class="fgroup-title" style="margin-top:16px;">Intensity</div>'+
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Measure</th><th class="num">Value</th></tr></thead><tbody>'+
      row('Gross total per revenue (CSRD / ISSB)', (rev&&cur)?t.total/rev:null, per, 'Enter annual revenue and pick a revenue unit above.')+
      row('Scope 1 + 2 per revenue (BRSR Essential Indicator 7)', (rev&&cur)?s12/rev:null, per, 'Enter annual revenue and pick a revenue unit above.')+
      row('Scope 1 + 2 per PPP-adjusted turnover (BRSR)', (ppp&&cur)?s12/ppp:null, per+' (PPP)', 'Enter PPP-adjusted turnover above, in the same unit as revenue.')+
      row('Scope 3 per revenue (BRSR Leadership Indicator 3)', (rev&&cur)?t[3]/rev:null, per, 'Enter annual revenue and pick a revenue unit above.')+
      row('Gross total per employee', fte?t.total/fte:null, 'tCO\u2082e per FTE', 'Enter employees (FTE) above.')+
      row('Physical intensity', (prod&&unit)?t.total/prod:null, 'tCO\u2082e per '+(unit||'unit'), 'Enter physical output and its unit above.')+
      '</tbody></table></div>';
  }

  /* Map an inventory line onto a Baseline-calculator category */
  function baselineCatKey(r){
    var a = ACT_BY_ID[r.act]; if(!a) return null;
    var g = String(r.group||a[3]||'');
    var m = /^(\d+)\.(\d+)/.exec(g);
    if(m){
      if(m[1]==='1') return {1:'s1_stationary',2:'s1_mobile',3:'s1_fugitive',4:'s1_process'}[+m[2]] || 's1_stationary';
      if(m[1]==='2') return (+m[2]===2) ? 's2_heat' : 's2_loc';
      if(m[1]==='3') return 's3_'+(+m[2]);
    }
    var sc = r.act==='custom' ? (num(r.scope)||3) : a[1];
    return sc===1 ? 's1_process' : (sc===2 ? 's2_loc' : 's3_1');
  }
  function catTotals(){
    var o = {};
    st.rows.forEach(function(r){ var k = baselineCatKey(r); if(!k) return; o[k] = (o[k]||0) + tco2e(r); });
    if(st.market!=='' && st.market!=null) o.s2_mkt = num(st.market);
    return o;
  }
  function hasRows(){ return st.rows.length > 0; }

  function dqTableHtml(){
    var s = dqStats();
    if(!st.rows.length) return '';
    return '<div class="fgroup-title" style="margin-top:16px;">Data quality and uncertainty</div>'+
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Data tier</th><th class="num">tCO₂e</th><th class="num">Share</th></tr></thead><tbody>'+
      DQ.map(function(d){ return '<tr><td>'+d[1]+' <span class="hint">'+d[2]+'</span></td><td class="num">'+fmt(s.by[d[0]])+'</td><td class="num">'+(s.total?((s.by[d[0]]/s.total)*100).toFixed(1):'0.0')+'%</td></tr>'; }).join('')+
      '</tbody></table></div>'+
      '<p class="hint" style="margin:6px 0 0;max-width:74ch;">Metered or invoiced data covers <strong>'+s.measured.toFixed(0)+'%</strong> of the footprint. Combined uncertainty is about <strong>±'+s.unc.toFixed(0)+'%</strong> (tiers combined in quadrature). Assurers look for the bulk of Scope 1 and 2 to be metered or invoiced.</p>';
  }

  /* ---------- Which rules this site is likely to fall under ---------- */
  function flagsHtml(){
    var t = totals(), s12 = t[1]+t[2], out = [];
    var reg = st.region, cur = String(st.cur||''), rev = num(st.rev);
    var revUsdM = /USD million/.test(cur) ? rev : (/USD thousand/.test(cur) ? rev/1000 : null);
    var revInrCr = /INR crore/.test(cur) ? rev : (/INR million/.test(cur) ? rev/10 : null);
    if(reg==='US'){
      if(t[1] >= 25000) out.push(['warn','EPA Greenhouse Gas Reporting Program', 'Direct emissions are '+fmt(t[1])+' tCO₂e, above the 25,000 tCO₂e threshold. If a listed source category applies, an annual facility report to EPA under 40 CFR Part 98 is a separate legal filing from this report.']);
      else out.push(['ok','EPA Greenhouse Gas Reporting Program', 'Direct emissions are '+fmt(t[1])+' tCO₂e, below the 25,000 tCO₂e reporting threshold. Recheck each year and whenever a boiler, furnace or process line is added.']);
      if(revUsdM==null || revUsdM>=500) out.push(['warn','California SB 253 and SB 261','If you do business in California: SB 253 applies above USD 1 billion revenue (Scope 1 and 2 for the 2026 submittal, Scope 3 under the 2027 framework), and SB 261 climate-risk reporting applies above USD 500 million. Enter revenue in USD to narrow this.']);
      out.push(['info','Factors and grid','Use eGRID subregion electricity, EPA Hub fuel factors in US units, and travel factors without a radiative-forcing uplift. The country factor set above does all three.']);
    } else if(reg==='IN'){
      out.push(['info','SEBI BRSR Principle 6','Essential Indicator 7 needs Scope 1 and 2 with intensity per rupee of turnover and per PPP-adjusted turnover. Leadership Indicator 3 adds Scope 3. BRSR Core attributes are reasonably assured for the top listed companies.']);
      if(s12 >= 25000) out.push(['warn','Carbon Credit Trading Scheme','Scope 1 and 2 total '+fmt(s12)+' tCO₂e. Energy-intensive plants in the notified sectors (iron and steel, aluminium, cement, pulp and paper, chlor-alkali, fertiliser, petrochemicals, refineries, textiles) are obligated entities with intensity targets. Confirm your sector notification and any legacy PAT/ESCert position.']);
      else out.push(['ok','Carbon Credit Trading Scheme','Scope 1 and 2 total '+fmt(s12)+' tCO₂e, below the scale at which most obligated entities are notified. The offset mechanism is still open to you on a voluntary basis.']);
      if(revInrCr!=null && revInrCr>=0) out.push(['info','Turnover basis','Turnover recorded as '+esc2(cur)+'. Keep the PPP-adjusted figure filled so both BRSR intensities can be reported.']);
      out.push(['info','Electricity supply','Record DISCOM supply, open access and captive generation on separate lines. Captive and on-site generation is Scope 1, not Scope 2.']);
    } else {
      out.push(['info','Country factor set','Set the country above to United States or India to switch fuels, travel, freight and waste to the national factors and units.']);
    }
    if(!st.recalc) out.push(['warn','Base-year recalculation policy','Not stated yet. The GHG Protocol requires a documented policy and a significance threshold before a base year can be used for targets.']);
    return '<div class="fgroup-title" style="margin-top:4px;">Which rules this site is likely to fall under</div>'+
      out.map(function(f){
        var c = f[0]==='warn' ? 'var(--warn,#b06a00)' : (f[0]==='ok' ? 'var(--good,#1d7a46)' : 'var(--accent)');
        return '<div style="border-left:3px solid '+c+';padding:6px 0 6px 10px;margin:0 0 8px;">'+
          '<div style="font-weight:700;font-size:12.5px;">'+f[1]+'</div>'+
          '<div class="hint" style="margin:2px 0 0;max-width:80ch;">'+f[2]+'</div></div>';
      }).join('')+
      '<p class="hint" style="margin:0;max-width:80ch;">Indicative only. Thresholds and sector notifications change, so confirm with your advisor before relying on this.</p>';
  }

  function render(){
    var t = totals();
    document.getElementById('ghg-stats').innerHTML =
      [['brand','Scope 1', t[1]],['brand','Scope 2 (location)', t[2]],['brand','Scope 3', t[3]],['good','Total tCO₂e', t.total]]
      .map(function(s){ return '<div class="stat '+s[0]+'"><div class="n">'+fmt(s[2])+'</div><div class="l">'+s[1]+'</div></div>'; }).join('');

    document.getElementById('ghg-cats').innerHTML = GROUPS.map(function(g){
      var rows = st.rows.filter(function(r){ return r.group===g; });
      var sum = rows.reduce(function(x,r){ return x+tco2e(r); },0);
      return '<details class="ghg-cat"'+(rows.length?' open':'')+' data-g="'+esc2(g)+'">'+
        '<summary><span>'+esc2(g)+'</span><span class="ghg-sum">'+fmt(sum)+' tCO₂e'+(rows.length?' · '+rows.length+' line'+(rows.length===1?'':'s'):'')+'</span></summary>'+
        '<div class="ghg-body">'+ (rows.length ? rows.map(rowHtml).join('') : '<p class="hint" style="margin:0 0 10px;">No entries yet.</p>') +
        '<button class="btn small" data-add="'+esc2(g)+'">+ Add line</button></div></details>';
    }).join('');

    var isoRows = [1,2,3,4,5,6].map(function(i){
      return '<tr><td>'+ISO_NAMES[i]+'</td><td class="num">'+fmt(t.iso[i])+'</td><td class="num">'+(t.total?((t.iso[i]/t.total)*100).toFixed(1):'0.0')+'%</td></tr>';
    }).join('');
    document.getElementById('ghg-report').innerHTML =
      '<div class="fgroup-title">Inventory report: ISO 14064-1 categories</div>'+
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Category</th><th class="num">tCO₂e</th><th class="num">Share</th></tr></thead><tbody>'+isoRows+
      '<tr><td><strong>Total (all categories)</strong></td><td class="num"><strong>'+fmt(t.total)+'</strong></td><td class="num"><strong>100%</strong></td></tr>'+
      '<tr><td>Biogenic CO₂ (reported separately, not in total)</td><td class="num">'+fmt(t.bio)+'</td><td class="num">—</td></tr>'+
      '</tbody></table></div>'+
      '<div class="frow" style="margin-top:12px;">'+
        '<div class="field"><label for="ghg-market">Scope 2 market-based total (tCO₂e)</label><input type="number" step="any" min="0" id="ghg-market" value="'+esc2(st.market)+'" placeholder="From supplier contracts / RECs">'+
        '<span class="hint">Leave blank if you only report location-based. Dual reporting is required by the GHG Protocol Scope 2 Guidance.</span>'+
        '<details style="margin-top:8px;"><summary style="cursor:pointer;font-size:12.5px;font-weight:600;color:var(--accent);">How do I work this out?</summary>'+
        '<div style="font-size:12.5px;color:var(--ink-muted);line-height:1.5;margin:8px 0 10px;max-width:72ch;">'+
        'Location-based uses the average grid. Market-based uses what you actually bought. Apply the GHG Protocol hierarchy to your electricity, best first:'+
        '<ol style="margin:6px 0 8px 18px;">'+
        '<li><strong>Supplier-specific factor</strong>: on your bill or green tariff contract (certified renewable = 0).</li>'+
        '<li><strong>Energy attribute certificates</strong>: RECs (US), I-RECs (India), GOs (EU) you bought and retired: that kWh counts at 0.</li>'+
        '<li><strong>PPA / contract factor</strong>: the factor written into your power purchase agreement.</li>'+
        '<li><strong>Residual mix</strong>: for everything not covered above. If no residual-mix figure is published for your grid, use the grid average.</li>'+
        '</ol>'+
        'The calculator below does this from the electricity already in your inventory.</div>'+
        '<div class="frow" style="align-items:flex-end;">'+
        '<div class="field"><label for="mb-covered">kWh covered by RECs / PPA / green tariff</label><input type="number" step="any" min="0" id="mb-covered" placeholder="0"></div>'+
        '<div class="field"><label for="mb-cf">Factor for covered kWh (kgCO₂e/kWh)</label><input type="number" step="any" min="0" id="mb-cf" value="0"><span class="hint">0 for certified renewables.</span></div>'+
        '<div class="field"><label for="mb-res">Residual-mix factor for the rest</label><input type="number" step="any" min="0" id="mb-res"><span class="hint">Pre-filled with your grid average; overwrite if a residual mix is published.</span></div>'+
        '<div class="field"><button type="button" class="btn small" id="mb-apply">Calculate &amp; fill</button></div>'+
        '</div>'+
        '<p class="hint" id="mb-out" style="margin:6px 0 0;"></p>'+
        '</details></div>'+
        '<div class="field"><label>Total, market-based basis</label><input type="text" value="'+(t.market==null?'—':fmt(t.market)+' tCO₂e')+'" readonly></div>'+
      '</div>'+
      intensityHtml()+
      dqTableHtml()+
      '<p class="hint" style="margin:6px 0 0;max-width:70ch;">Scope 1 + Scope 2 (location) = <strong>'+fmt(t[1]+t[2])+' tCO₂e</strong>. Scope 3 = <strong>'+fmt(t[3])+' tCO₂e</strong>. GWPs: CH₄ 29.8, N₂O 273 (IPCC AR6, 100-yr). Keep the note field filled for each line so the inventory is verifiable under ISO 14064-3.</p>';

    var fl = document.getElementById('ghg-flags');
    if(fl) fl.innerHTML = flagsHtml();

    var mk = document.getElementById('ghg-market');
    mk.addEventListener('change', function(){ st.market = mk.value; save(); render(); });

    // Market-based helper: contractual instruments at their factor, remainder at residual mix
    var res = document.getElementById('mb-res');
    var gridF = (GRIDS.filter(function(g){ return g[0]===st.grid; })[0] || GRIDS[GRIDS.length-1])[2];
    if(res) res.placeholder = gridF + ' (grid avg)';
    var mbApply = document.getElementById('mb-apply');
    if(mbApply) mbApply.addEventListener('click', function(){
      var elecKwh = 0, otherT = 0;
      st.rows.forEach(function(r){
        if(r.act==='s2_elec') elecKwh += num(r.qty);
        else if(r.act==='s2_steam'||r.act==='s2_cool') otherT += tco2e(r);
      });
      var covered = Math.min(num(document.getElementById('mb-covered').value), elecKwh);
      var cf = num(document.getElementById('mb-cf').value);
      var rf = document.getElementById('mb-res').value==='' ? gridF : num(document.getElementById('mb-res').value);
      var rest = Math.max(elecKwh - covered, 0);
      var mbT = (covered*cf + rest*rf)/1000 + otherT;
      st.market = mbT.toFixed(3); save(); render();
      var out = document.getElementById('mb-out');
      if(out && out.closest('details')) out.closest('details').open = true;
      if(out) out.innerHTML = 'Electricity in inventory: <strong>'+elecKwh.toLocaleString()+' kWh</strong>. Covered: '+covered.toLocaleString()+' kWh at '+cf+'; remaining '+rest.toLocaleString()+' kWh at '+rf+'. Market-based Scope 2 = <strong>'+fmt(mbT)+' tCO₂e</strong>'+(otherT?' (incl. '+fmt(otherT)+' t steam/cooling)':'')+'. Filled in above.';
      if(elecKwh===0) out.innerHTML = 'No grid electricity lines in the inventory yet. Add your kWh under Scope 2 first, then come back.';
    });
    renderLog();
    if(window.__baselineFootprint) window.__baselineFootprint();
  }

  // Shared read-only view of the inventory for the Portfolio dashboard
  function setRegion(code){
    st.region = code;
    var res = applyPack(code) || {converted:0, unconverted:[]};
    if(code==='US' && String(st.grid).indexOf('US')!==0) st.grid = 'US_RFCE';
    if(code==='IN' && String(st.grid).indexOf('IN')!==0) st.grid = 'IN';
    try{ setGridFactor(st.grid); }catch(e){}
    try{ fillGrid(); fillLogActs(); }catch(e){}
    var rg = document.getElementById('ghg-region'); if(rg) rg.value = code;
    save(); render();
    var pm = document.getElementById('ghg-pack-msg');
    if(pm){
      var parts = [];
      if(res.converted) parts.push(res.converted+' line'+(res.converted===1?'':'s')+' converted into the new units, so the quantities still mean the same thing.');
      if(res.unconverted.length) parts.push('Check these by hand, the units are not comparable: '+res.unconverted.join(', ')+'.');
      if(!parts.length) parts.push('Factor set switched. No entered quantity needed converting.');
      pm.textContent = parts.join(' ');
    }
    document.dispatchEvent(new CustomEvent('baseline-region', {detail:code}));
  }

  window.BaselineGHG = {
    catTotals: catTotals, hasRows: hasRows, intensity: function(){ return {rev:num(st.rev), cur:st.cur||'', ppp:num(st.revppp), fte:num(st.fte), prod:num(st.prod), produnit:st.produnit||''}; },
    totals: function(){ return totals(); },
    state: function(){ return st; },
    region: function(){ return st.region || 'GL'; },
    setRegion: setRegion,
    annualReport: function(ap){ annualReport(ap); },
    acts: ACTS, groups: GROUPS,
    groupTotals: function(){ return totals().group; }
  };





  /* ---------- Routine log: periods, roll-ups, annual report ---------- */
  function pKey(r){ var p=r.period||''; return p.length>=7 ? p.slice(0,7) : 'none'; }
  function pName(k){ if(k==='none') return 'No date set';
    var d=new Date(k+'-01T00:00:00'); return isNaN(d.getTime())?k:d.toLocaleDateString(undefined,{month:'short',year:'numeric'}); }
  function byMonth(){
    var m={}, keys=[];
    st.rows.forEach(function(r){
      var a=ACT_BY_ID[r.act]; if(!a) return;
      var k=pKey(r); if(!m[k]){ m[k]={k:k,n:0,s1:0,s2:0,s3:0,bio:0}; keys.push(k); }
      var sc = r.act==='custom' ? (num(r.scope)||3) : a[1];
      m[k].n++; m[k]['s'+sc]+=tco2e(r); m[k].bio+=bio(r);
    });
    keys.sort(function(x,y){ if(x==='none') return 1; if(y==='none') return -1; return x<y?1:-1; });
    return keys.map(function(k){ var o=m[k]; o.total=o.s1+o.s2+o.s3; return o; });
  }
  function renderLog(){
    var box=document.getElementById('log-out'); if(!box) return;
    var ms=byMonth();
    var recent=st.rows.filter(function(r){ return r.period; }).sort(function(a,b){ return a.period<b.period?1:-1; }).slice(0,12);
    var head='<div class="fgroup-title" style="margin-top:14px;">Period roll-up</div>';
    if(!ms.length){ box.innerHTML=head+'<p class="hint" style="margin:0;">Nothing logged yet. Add an entry above, or date-stamp existing lines in the categories below.</p>'; return; }
    box.innerHTML = head +
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Period</th><th class="num">Entries</th><th class="num">Scope 1</th><th class="num">Scope 2</th><th class="num">Scope 3</th><th class="num">Total tCO₂e</th></tr></thead><tbody>'+
      ms.map(function(o){ return '<tr><td>'+esc2(pName(o.k))+'</td><td class="num">'+o.n+'</td><td class="num">'+fmt(o.s1)+'</td><td class="num">'+fmt(o.s2)+'</td><td class="num">'+fmt(o.s3)+'</td><td class="num"><strong>'+fmt(o.total)+'</strong></td></tr>'; }).join('')+
      '</tbody></table></div>'+
      (recent.length ? '<div class="fgroup-title" style="margin-top:14px;">Latest entries</div>'+
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Date</th><th>Activity</th><th class="num">Qty</th><th class="num">tCO₂e</th><th>Note</th><th></th></tr></thead><tbody>'+
      recent.map(function(r){ var a=ACT_BY_ID[r.act]||ACT_BY_ID['custom'];
        return '<tr><td>'+esc2(r.period)+'</td><td>'+esc2(r.act==='custom'?(r.label||'Custom'):a[4])+'</td><td class="num">'+esc2(r.qty)+' '+esc2(r.act==='custom'?(r.unit||'unit'):a[5])+'</td><td class="num">'+fmt(tco2e(r))+'</td><td>'+esc2(r.note||'')+'</td><td class="num"><button class="ghg-x" data-del="'+r.id+'" title="Remove" aria-label="Delete entry">×</button></td></tr>'; }).join('')+
      '</tbody></table></div>' : '');
  }

  function annualReport(approval){
    var ap = approval && approval.status==='approved' ? approval : null;
    var logoEl=document.querySelector('.js-tgs-logo.tgs-logo-light');
    var LOGO=logoEl&&logoEl.src ? logoEl.src : '';
    var t=totals(), ms=byMonth();
    var rev=num(st.rev), fte=num(st.fte);
    var iRev = rev ? (t.total/rev) : null, iFte = fte ? (t.total/fte) : null;
    var row=function(c){ return '<tr>'+c.map(function(x,i){ return '<td'+(i?' class="num"':'')+'>'+x+'</td>'; }).join('')+'</tr>'; };
    var acts = st.rows.map(function(r){ var a=ACT_BY_ID[r.act]; if(!a) return '';
      var d=dqOf(r);
      return row([esc2(r.period||'—')+' · '+esc2(r.group), esc2(r.act==='custom'?(r.label||'Custom'):a[4]), num(r.qty)+' '+esc2(r.act==='custom'?(r.unit||'unit'):a[5]), ef(r), esc2(a[8]||'')+(Math.abs(ef(r)-a[6])>1e-9?' (edited from '+a[6]+')':''), esc2(d[1])+' '+esc2(d[2]), fmt(tco2e(r))]); }).join('');
    var dqs = dqStats();
    var REGION_NAME = {US:'United States (EPA Emission Factors Hub 2025, US units)', IN:'India (IPCC 2006 defaults with Indian calorific values and CEA grid)', GL:'International default set (DESNZ / IEA / IPCC)'};
    var usedSrc=[], seenSrc={};
    st.rows.forEach(function(r){ var a=ACT_BY_ID[r.act]; if(!a) return; var k=a[8]||'—'; if(!seenSrc[k]){ seenSrc[k]=1; usedSrc.push(k); } });
    var disclosure = [
      ['CSRD / ESRS E1-6','Gross Scope 1, Scope 2 (location and market-based) and Scope 3 by category, plus total GHG emissions and GHG intensity per net revenue.','Scope tables and intensity below'],
      ['IFRS S2 (ISSB) para 29','Absolute gross Scope 1, 2 and 3 in tCO₂e, measured per the GHG Protocol Corporate Standard, with the consolidation approach stated.','Boundary and scope tables'],
      ['California SB 253 (CARB)','Annual Scope 1 and 2 disclosure per GHG Protocol with assurance; Scope 3 from the following reporting year.','Scope tables; assurance to be appended'],
      ['India BRSR Principle 6 (SEBI)','Essential Indicator 7: total Scope 1 and Scope 2 with intensity per rupee of turnover. Leadership Indicator 3: Scope 3 and its intensity.','Scope tables and intensity below'],
      ['ISO 14064-1:2018','Categories 1–6, biogenic CO₂ reported separately, exclusions justified, base data traceable to source.','Category table and activity register']
    ].map(function(d){ return '<tr><td><strong>'+d[0]+'</strong></td><td>'+d[1]+'</td><td>'+d[2]+'</td></tr>'; }).join('');
    var html = '<!doctype html><html><head><meta charset="utf-8"><title>Annual GHG report: '+esc2(st.org||'Organisation')+'</title>'+
      '<link rel="stylesheet" href="/assets/baseline-home-3.v1.css"></head><body>'+
      (ap ? '' : '<div class="wm" aria-hidden="true"><span>DRAFT · NOT FOR SUBMISSION</span><span>DRAFT · NOT FOR SUBMISSION</span><span>DRAFT · NOT FOR SUBMISSION</span><span>DRAFT · NOT FOR SUBMISSION</span></div>')+
      (ap ? '<div class="draftbar" style="background:#eaf7ee;border-color:#7fc493;color:#14532d;"><strong>TGS-approved final report, submission ready.</strong> '+
        'Approval reference '+esc2(ap.ref||'—')+' · reviewed by '+esc2(ap.reviewer||'—')+' on '+esc2(ap.date||'—')+'. '+
        'Data reviewed by TGS experts against ISO 14064-1 and the disclosure frameworks listed below.'+
        (ap.comment?' Reviewer note: '+esc2(ap.comment):'')+'</div>'
      : '<div class="draftbar"><strong>Working draft, not a compliant submission report.</strong> '+
      'This export summarises the data collected in Baseline. Submit it to TGS for expert review of the data and any discrepancies. '+
      'Once TGS approves, a final version is sent back for your review; that approved report is the official, submission-ready document.</div>')+
      '<div style="display:flex;align-items:center;gap:10px;margin:0 0 14px;"><img src="'+LOGO+'" alt="TGS" style="height:26px;width:auto;">'+
      '<div style="line-height:1.2;"><div style="font-weight:700;font-size:15px;">TGS Baseline</div><div style="font-size:11px;color:#5d6b65;">Greenhouse gas reporting</div></div></div>'+
      '<h1>Annual greenhouse gas report</h1>'+
      '<p class="meta">'+esc2(st.org||'Organisation')+' · Reporting period '+esc2(st.year||'—')+' · Consolidation approach: '+esc2(st.approach)+' · Prepared '+new Date().toLocaleDateString()+'</p>'+
      '<h2>1. Basis of preparation</h2><table><tbody>'+
      '<tr><td>Standards applied</td><td>ISO 14064-1:2018; GHG Protocol Corporate Standard and Scope 2 Guidance; IPCC AR6 100-year GWPs (CH₄ 29.8 fossil, N₂O 273)</td></tr>'+
      '<tr><td>Disclosure frameworks</td><td>CSRD / ESRS E1, IFRS S2 (ISSB), California SB 253, SEBI BRSR Principle 6</td></tr>'+
      '<tr><td>Country factor set</td><td>'+esc2(REGION_NAME[st.region]||REGION_NAME.GL)+'</td></tr>'+
      '<tr><td>Grid factor set</td><td>'+esc2((GRIDS.filter(function(x){return x[0]===st.grid;})[0]||['','',0,''])[1]||st.grid)+', '+esc2((GRIDS.filter(function(x){return x[0]===st.grid;})[0]||['','',0,''])[3]||'')+'</td></tr>'+
      '<tr><td>Emission factor sources used</td><td>'+esc2(usedSrc.join('; ')||'—')+'</td></tr>'+
      '<tr><td>Base year</td><td>'+esc2(st.base||'Not set')+'</td></tr>'+
      '<tr><td>Base-year recalculation policy</td><td>'+esc2(st.recalc||'Not stated. GHG Protocol requires a documented policy and significance threshold for structural changes (acquisitions, divestments, outsourcing, method changes).')+'</td></tr>'+
      '<tr><td>Exclusions and justification</td><td>'+esc2(st.excl||'None stated')+'</td></tr>'+
      '</tbody></table>'+
      '<h2>2. Gross emissions by scope</h2><table><thead><tr><th>Scope</th><th class="num">tCO₂e</th></tr></thead><tbody>'+
      row(['Scope 1 (direct)',fmt(t[1])])+row(['Scope 2 (location-based)',fmt(t[2])])+
      row(['Scope 2 (market-based)',st.market===''?'not reported':fmt(num(st.market))])+
      row(['Scope 3 (value chain)',fmt(t[3])])+
      row(['<strong>Total gross (location-based)</strong>','<strong>'+fmt(t.total)+'</strong>'])+
      row(['Biogenic CO₂ (reported separately)',fmt(t.bio)])+
      '</tbody></table>'+
      '<h2>3. ISO 14064-1 categories</h2><table><thead><tr><th>Category</th><th class="num">tCO₂e</th><th class="num">Share</th></tr></thead><tbody>'+
      [1,2,3,4,5,6].map(function(i){ return row([ISO_NAMES[i],fmt(t.iso[i]),(t.total?((t.iso[i]/t.total)*100).toFixed(1):'0.0')+'%']); }).join('')+
      '</tbody></table>'+
      '<h2>4. Period breakdown</h2><table><thead><tr><th>Period</th><th class="num">Entries</th><th class="num">Scope 1</th><th class="num">Scope 2</th><th class="num">Scope 3</th><th class="num">Total</th></tr></thead><tbody>'+
      (ms.length ? ms.map(function(o){ return row([pName(o.k),o.n,fmt(o.s1),fmt(o.s2),fmt(o.s3),fmt(o.total)]); }).join('') : '<tr><td colspan="6">No dated entries.</td></tr>')+
      '</tbody></table>'+
      '<h2>5. Intensity</h2><table><tbody>'+
      '<tr><td>Per revenue</td><td class="num">'+(iRev==null?'revenue not entered':fmt(iRev)+' tCO₂e per '+esc2(st.cur||'revenue unit'))+'</td></tr>'+
      '<tr><td>Per PPP-adjusted turnover (SEBI BRSR)</td><td class="num">'+(num(st.revppp)?fmt(t.total/num(st.revppp))+' tCO₂e per '+esc2(st.cur||'unit')+' (PPP)':'PPP turnover not entered')+'</td></tr>'+
      '<tr><td>Physical intensity</td><td class="num">'+(num(st.prod)?fmt(t.total/num(st.prod))+' tCO₂e per '+esc2(st.produnit||'unit of output'):'output volume not entered')+'</td></tr>'+
      '<tr><td>Per employee (FTE)</td><td class="num">'+(iFte==null?'headcount not entered':fmt(iFte)+' tCO₂e / FTE')+'</td></tr>'+
      '</tbody></table>'+
      '<h2>6. Data quality and uncertainty</h2><table><thead><tr><th>Data tier</th><th class="num">tCO₂e</th><th class="num">Share</th></tr></thead><tbody>'+
      DQ.map(function(d){ return row([d[1]+' ('+d[2]+')', fmt(dqs.by[d[0]]), (dqs.total?((dqs.by[d[0]]/dqs.total)*100).toFixed(1):'0.0')+'%']); }).join('')+
      row(['<strong>Metered or invoiced share</strong>','','<strong>'+dqs.measured.toFixed(1)+'%</strong>'])+
      row(['<strong>Combined uncertainty</strong>','','<strong>±'+dqs.unc.toFixed(1)+'%</strong>'])+
      '</tbody></table>'+
      '<h2>7. Disclosure mapping</h2><table><thead><tr><th>Framework</th><th>Requirement</th><th>Where met</th></tr></thead><tbody>'+disclosure+'</tbody></table>'+
      '<h2>8. Activity register</h2><table><thead><tr><th>Period / category</th><th>Activity</th><th class="num">Quantity</th><th class="num">kgCO₂e per unit</th><th class="num">Factor source</th><th>Data quality</th><th class="num">tCO₂e</th></tr></thead><tbody>'+
      (acts||'<tr><td colspan="7">No activity data.</td></tr>')+'</tbody></table>'+
      '<p class="meta" style="margin-top:20px;">Prepared in Baseline. Figures are calculated from the activity data and emission factors listed above. '+
      '<strong>Review workflow:</strong> (1) Client collects and verifies annual data in Baseline and submits this draft to TGS. '+
      '(2) TGS experts review the data, resolve discrepancies and approve. '+
      '(3) TGS issues the final report for client review. '+
      '(4) The TGS-approved report is the official submission-ready document, subject to third-party verification (ISO 14064-3) where assurance is required.</p>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-top:18px;padding-top:10px;border-top:1px solid #d8e0dc;color:#5d6b65;font-size:11px;">A product of <img src="'+LOGO+'" alt="TGS" style="height:14px;width:auto;"></div>'+
      '</body></html>';
    var w=window.open('','_blank');
    if(w){ w.document.write(html); w.document.close(); setTimeout(function(){ try{ w.print(); }catch(e){} },400); }
    else {
      var url=URL.createObjectURL(new Blob([html],{type:'text/html'}));
      var a3=document.createElement('a'); a3.href=url; a3.download='annual-ghg-report.html'; a3.click();
      setTimeout(function(){ URL.revokeObjectURL(url); },1000);
    }
  }

  function fillGrid(){
    var g = document.getElementById('ghg-grid'); if(!g) return;
    var pref = st.region==='US' ? 'US' : (st.region==='IN' ? 'IN' : '');
    var list = GRIDS.filter(function(x){ return !pref || x[0]===pref || x[0].indexOf(pref+'_')===0; });
    if(!list.length) list = GRIDS;
    var rest = GRIDS.filter(function(x){ return list.indexOf(x)<0; });
    var opt = function(x){ return '<option value="'+x[0]+'"'+(x[0]===st.grid?' selected':'')+'>'+esc2(x[1])+' · '+x[2]+' kgCO₂e/kWh · '+esc2(x[3]||'')+'</option>'; };
    g.innerHTML = (pref ? '<optgroup label="'+(pref==='US'?'United States':'India')+'">'+list.map(opt).join('')+'</optgroup><optgroup label="Other countries">'+rest.map(opt).join('')+'</optgroup>' : GRIDS.map(opt).join(''));
    var h = document.getElementById('ghg-grid-hint');
    if(h) h.innerHTML = st.region==='US'
      ? 'Use your eGRID subregion, not the national average. CARB and EPA both expect subregional factors.'
      : (st.region==='IN'
        ? 'Use the national weighted average for corporate Scope 2. The operating and combined margins are project baselines and should not be used for a company inventory.'
        : 'Sets the default location-based factor.');
  }
  function setGridFactor(code){
    var gf = 0.716; GRIDS.forEach(function(x){ if(x[0]===code) gf = x[2]; });
    var old2 = ACT_BY_ID['s2_elec'][6], old11 = ACT_BY_ID['s3_11e'][6];
    ACT_BY_ID['s2_elec'][6] = gf; ACT_BY_ID['s3_11e'][6] = gf;
    st.rows.forEach(function(r){
      if(r.act==='s2_elec' && (r.ef===''||r.ef==null||Math.abs(num(r.ef)-old2)<1e-9)) r.ef = gf;
      if(r.act==='s3_11e' && (r.ef===''||r.ef==null||Math.abs(num(r.ef)-old11)<1e-9)) r.ef = gf;
    });
  }
  function fillLogActs(){
    var la = document.getElementById('log-act'); if(!la) return;
    var keep = la.value, lastG = '';
    la.innerHTML = ACTS.map(function(x){
      var o = '';
      if(x[3]!==lastG){ if(lastG) o+='</optgroup>'; o+='<optgroup label="'+esc2(x[3])+'">'; lastG = x[3]; }
      return o+'<option value="'+x[0]+'">'+esc2(x[4])+' ('+esc2(x[5])+')</option>';
    }).join('')+'</optgroup>';
    if(keep) la.value = keep;
  }

  function bindOnce(){
    var g = document.getElementById('ghg-grid');
    fillGrid();
    ['org','year','approach','excl','base','recalc','revppp','prod','produnit'].forEach(function(f){
      var el = document.getElementById('ghg-'+f);
      if(!el) return;
      el.value = st[f]||'';
      el.addEventListener('change', function(){ st[f] = el.value; save(); render(); });
    });
    var rg = document.getElementById('ghg-region');
    if(rg){
      rg.value = st.region || 'GL';
      rg.addEventListener('change', function(){ setRegion(rg.value); });
    }

    g.addEventListener('change', function(){
      st.grid = g.value;
      setGridFactor(st.grid);
      save(); render();
    });
    setGridFactor(st.grid);

    host.addEventListener('click', function(e){
      var add = e.target.closest('[data-add]');
      if(add){
        var grp = add.getAttribute('data-add');
        var first = ACTS.filter(function(x){ return x[3]===grp; })[0];
        st.rows.push({id:uid(), group:grp, act:first[0], qty:'', ef:first[6], note:'', label:'', unit:'unit', scope:first[1], iso:first[2]});
        save(); render();
        var d = host.querySelector('details[data-g="'+grp+'"]'); if(d) d.open = true;
        return;
      }
      var del = e.target.closest('[data-del]');
      if(del){
        st.rows = st.rows.filter(function(r){ return r.id !== del.getAttribute('data-del'); });
        save(); render();
      }
    });

    host.addEventListener('change', function(e){
      var f = e.target.getAttribute && e.target.getAttribute('data-f');
      if(!f) return;
      var wrap = e.target.closest('.ghg-row'); if(!wrap) return;
      var r = st.rows.filter(function(x){ return x.id===wrap.getAttribute('data-id'); })[0]; if(!r) return;
      if(f==='act'){ r.act = e.target.value; var a = ACT_BY_ID[r.act]; r.ef = a[6]; if(r.act!=='custom'){ r.scope=a[1]; r.iso=a[2]; } }
      else { r[f] = e.target.value; }
      save(); render();
    });

    ['rev','cur','fte'].forEach(function(f){
      var el=document.getElementById('ghg-'+f); if(!el) return;
      el.value = st[f]||'';
      el.addEventListener('change', function(){ st[f]=el.value; save(); render(); });
    });
    var la=document.getElementById('log-act');
    if(la){
      fillLogActs();
      var ld=document.getElementById('log-date');
      var now=new Date(); ld.value = now.toISOString().slice(0,10);
      document.getElementById('log-add').addEventListener('click', function(){
        var act=la.value, a=ACT_BY_ID[act], qty=document.getElementById('log-qty').value;
        if(!a) return;
        if(!qty || num(qty)<=0){ alert('Enter a quantity for this entry.'); return; }
        var freq=document.getElementById('log-freq').value, d=ld.value;
        if(!d){ alert('Pick the date or period this data covers.'); return; }
        if(freq==='Monthly') d = d.slice(0,7)+'-01';
        st.rows.push({id:uid(), group:a[3], act:act, qty:qty, ef:a[6], note:document.getElementById('log-note').value, label:'', unit:a[5], scope:a[1], iso:a[2], period:d, freq:freq});
        document.getElementById('log-qty').value=''; document.getElementById('log-note').value='';
        save(); render();
      });
    }
    document.getElementById('ghg-annual').addEventListener('click', annualReport);

    document.getElementById('ghg-reset').addEventListener('click', function(){
      if(!confirm('Clear every line in this inventory?')) return;
      st.rows = []; st.market=''; save(); render();
    });

    document.getElementById('ghg-csv').addEventListener('click', function(){
      var t = totals();
      var lines = [['Organisation',st.org],['Reporting period',st.year],['Consolidation approach',st.approach],['Country factor set',st.region||'GL'],['Grid factor set',st.grid],['Base year',st.base||''],['Base-year recalculation policy',st.recalc||''],['Standard','ISO 14064-1:2018 / GHG Protocol, IPCC AR6 GWP'],[],
        ['Period','Frequency','Category','Activity','Quantity','Unit','kgCO2e per unit','Factor source','Factor edited','Data quality','Uncertainty','tCO2e','Scope','ISO category','Note']];
      st.rows.forEach(function(r){
        var a = ACT_BY_ID[r.act]; if(!a) return; var d = dqOf(r);
        lines.push([r.period||'', r.freq||'', r.group, r.act==='custom'?(r.label||'Custom'):a[4], num(r.qty), r.act==='custom'?(r.unit||'unit'):a[5], ef(r), a[8]||'', (Math.abs(ef(r)-a[6])>1e-9?'yes':'no'), d[1], d[2], tco2e(r).toFixed(4), a[1], a[2], r.note||'']);
      });
      lines.push([],['Scope 1 total (tCO2e)',t[1].toFixed(3)],['Scope 2 location-based (tCO2e)',t[2].toFixed(3)],
        ['Scope 2 market-based (tCO2e)', st.market===''?'not reported':num(st.market).toFixed(3)],
        ['Scope 3 total (tCO2e)',t[3].toFixed(3)],['Gross total (tCO2e)',t.total.toFixed(3)],['Biogenic CO2 (tCO2, separate)',t.bio.toFixed(3)],[],
        ['Exclusions',st.excl]);
      var csv = lines.map(function(row){ return (row||[]).map(function(c){ return '"'+String(c==null?'':c).replace(/"/g,'""')+'"'; }).join(','); }).join('\n');
      var url = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
      var a2 = document.createElement('a'); a2.href = url; a2.download = 'ghg-inventory-iso14064.csv'; a2.click();
      setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
    });
  }

  /* ---------- Guided setup: plain-language questionnaire ---------- */
  var GUIDE_SECTORS = [
    ['auto','Automotive parts & components','Machining, heat treatment, welding, paint shop'],
    ['metal','Metals, foundry & fabrication','Melting, casting, forging, rolling, galvanising'],
    ['plating','Electroplating & surface finishing','Plating lines, degreasing, pickling, ETP'],
    ['pharma','Pharmaceutical manufacturing','Reactors, solvents, clean utilities, sterile areas'],
    ['lab','Laboratory or testing facility','Fume hoods, analysers, gases, cold storage'],
    ['mfg','Other manufacturing / industrial','Factory, plant, workshop or heavy process'],
    ['textile','Textile, apparel or footwear','Spinning, dyeing, stitching, finishing'],
    ['food','Food, beverage or agri processing','Cold chain, boilers, packaging lines'],
    ['office','Office, retail or services','Stores, branches, IT, back office'],
    ['logistics','Logistics or warehousing','Fleets, distribution centres, cold stores'],
    ['hotel','Hospitality or healthcare','Hotels, hospitals, campuses'],
    ['other','Something else','Show me every question']
  ];

  var GUIDE_QS = [
    {sec:'Fuel you burn on site', q:'Do you burn any fuel on site for heat, steam or hot water?',
      find:'Where to find it: piped gas bills show m³ or SCM. Fuel deliveries show litres or tonnes on the invoice. Add up 12 months.',
      qty:'Amount used in the year', multi:true,
      opts:[['Boiler or heater on natural gas (PNG)','s1_ng',[['m³',1],['SCM',1],['MMSCM',1000000]]],
            ['LPG or propane','s1_lpg',[['litres',1],['kg',1.96],['tonnes',1960],['19 kg cylinders',37.3],['47.5 kg cylinders',93.1]]],
            ['Diesel or gas oil','s1_do',[['litres',1],['kilolitres',1000]]],
            ['Furnace oil or fuel oil','s1_fo',[['litres',1],['kilolitres',1000]]],
            ['Coal or lignite','s1_coal',[['tonnes',1],['kg',0.001]]],
            ['Biomass, briquettes, husk','s1_bio',[['tonnes',1],['kg',0.001]]]]},
    {sec:'Fuel you burn on site', q:'Do you run backup generators (DG sets)?',
      find:'Where to find it: the DG logbook or the fuel purchase register. If you only track running hours, multiply hours by the typical litres per hour on the nameplate.',
      qty:'Generator fuel in the year', multi:true,
      opts:[['Diesel','s1_do',[['litres',1],['kilolitres',1000]]],['Petrol','s1_pet',[['litres',1]]]]},
    {sec:'Vehicles you own', q:'Do you own or lease vehicles: cars, trucks, forklifts?',
      find:'Where to find it: fuel cards or pump slips give litres, which is the more accurate answer. If you only have odometer readings, use the distance option instead.',
      qty:'Amount in the year', multi:true,
      opts:[['Diesel vehicles','s1_mdo',[['litres',1],['kilolitres',1000]]],
            ['Petrol vehicles','s1_pet',[['litres',1]]],
            ['CNG vehicles','s1_cng',[['kg',1]]],
            ['Cars, distance only','s1_car',[['km',1],['miles',1.609]]],
            ['Trucks, distance only','s1_hgv',[['km',1],['miles',1.609]]]]},
    {sec:'Gases that leak', q:'Were your ACs, chillers or cold rooms topped up with refrigerant gas?',
      find:'Where to find it: your AC maintenance (AMC) vendor logs every refill in kg. Only gas added counts, not the gas already sitting in the unit. If nothing was refilled, answer no.',
      qty:'Gas refilled in the year (kg)', multi:true,
      opts:[['R-22, older ACs','s1_r22'],['R-410A, modern split ACs','s1_r410'],['R-134a, chillers and vehicle ACs','s1_r134'],['R-32, newer ACs','s1_r32'],['R-404A, cold storage','s1_r404']]},
    {sec:'Your process', q:'Does your process itself release gases, apart from fuel?',
      find:'Where to find it: this applies to cement kilns, lime, chemicals, metals and fertiliser use on land. Most other sites answer no.',
      qty:'Amount in the year', multi:true, only:['mfg','food','other'],
      opts:[['Clinker produced','s1_clink',[['tonnes',1]]],['Measured process emissions','s1_proc',[['tCO₂e',1]]],['Fertiliser nitrogen applied','s1_land',[['kg N',1]]]]},

    /* ---- process stages: automotive parts, metals, plating, pharma, labs ---- */
    {sec:'Furnaces & heat treatment', q:'Do you run furnaces, ovens or heat treatment lines that burn fuel?',
      find:'Where to find it: the furnace fuel register, the gas meter on the heat treatment bay, or LPG/furnace oil delivery invoices. Electric furnaces are covered by your electricity bill later.',
      qty:'Fuel used in the year', multi:true, only:['auto','metal','plating','pharma'],
      opts:[['Natural gas fired furnace or oven','s1_ng',[['m³',1],['SCM',1],['MMSCM',1000000]]],
            ['LPG fired furnace or oven','s1_lpg',[['litres',1],['kg',1.96],['19 kg cylinders',37.3],['47.5 kg cylinders',93.1]]],
            ['Furnace oil or LDO fired','s1_fo',[['litres',1],['kilolitres',1000]]],
            ['Diesel fired','s1_do',[['litres',1],['kilolitres',1000]]],
            ['Coal, coke or pet coke fired','s1_coal',[['tonnes',1],['kg',0.001]]]]},
    {sec:'Melting & casting', q:'Do you melt metal, use coke, or add carbon or flux to the charge?',
      find:'Where to find it: the cupola or induction furnace charge sheet. Coke and carbon raiser show up as tonnes charged; limestone or dolomite flux drives calcination CO₂ that you can log as measured process emissions.',
      qty:'Amount in the year', multi:true, only:['metal','auto'],
      opts:[['Coke or carbon raiser charged','s1_coal',[['tonnes',1],['kg',0.001]]],
            ['Flux calcination CO₂ (measured)','s1_proc',[['tCO₂e',1],['kg CO₂',0.001]]],
            ['Scrap steel bought in','s3_1st',[['tonnes',1],['kg',0.001]]],
            ['Aluminium ingot bought in','s3_1al',[['tonnes',1],['kg',0.001]]]]},
    {sec:'Welding, cutting & shielding gas', q:'Do you use welding, brazing or cutting gases?',
      find:'Where to find it: the industrial gas vendor invoice, in cylinders or kg. Only CO₂ shielding gas and acetylene carry a carbon number; argon, nitrogen and oxygen do not.',
      qty:'Gas used in the year', multi:true, only:['auto','metal','plating'],
      opts:[['CO₂ shielding gas released','s1_proc',[['kg CO₂',0.001],['tonnes CO₂',1],['tCO₂e',1]]],
            ['LPG for cutting or brazing','s1_lpg',[['litres',1],['kg',1.96]]],
            ['Industrial gases bought (spend)','s3_1s',[['currency unit',1]]]]},
    {sec:'Plating & surface finishing', q:'Do you run plating, anodising, pickling or degreasing lines?',
      find:'Where to find it: the chemical purchase register for the bath house. Log plating salts, acids and solvents by spend, and metal anodes by weight. Rectifier power sits in your electricity bill.',
      qty:'Amount in the year', multi:true, only:['plating','auto','metal'],
      opts:[['Plating chemicals, acids, salts (spend)','s3_1s',[['currency unit',1]]],
            ['Zinc, nickel or chrome anodes','s3_1st',[['tonnes',1],['kg',0.001]]],
            ['Solvents or degreasers (spend)','s3_1s',[['currency unit',1]]],
            ['Effluent treated at ETP','s3_5w',[['m³',1],['kilolitres',1]]],
            ['ETP sludge sent out as hazardous waste','s3_5i',[['tonnes',1],['kg',0.001]]]]},
    {sec:'Reactors, solvents & clean utilities', q:'Do you run reactors, dryers, solvent recovery or clean rooms?',
      find:'Where to find it: the solvent issue and recovery log, and the incinerator or authorised disposal manifest for spent solvent. Clean room HVAC and chillers are counted through electricity and refrigerant top-ups.',
      qty:'Amount in the year', multi:true, only:['pharma','lab'],
      opts:[['Solvents and reagents bought (spend)','s3_1s',[['currency unit',1]]],
            ['Spent solvent incinerated','s3_5i',[['tonnes',1],['kg',0.001]]],
            ['Process CO₂ vented (measured)','s1_proc',[['tCO₂e',1],['kg CO₂',0.001]]],
            ['Process water used','s3_1w',[['m³',1],['kilolitres',1]]]]},
    {sec:'Laboratory & medical gases', q:'Do you release nitrous oxide, methane or other gases from lab or medical use?',
      find:'Where to find it: the gas cylinder issue register. Count the gas actually consumed in the year, not the stock on hand. Nitrous oxide and methane carry a heavy multiplier, so even small kilogrammes matter.',
      qty:'Gas released in the year (kg)', multi:true, only:['pharma','lab','auto','metal','plating'],
      opts:[['Nitrous oxide (N₂O)','s1_n2o'],['Methane (CH₄)','s1_ch4'],['SF₆ from switchgear or equipment','s1_sf6'],['Dry ice or liquid CO₂ used','s1_proc',[['kg CO₂',0.001],['tonnes CO₂',1]]]]},
    {sec:'Hazardous & regulated waste', q:'Do you send out hazardous, chemical or biomedical waste?',
      find:'Where to find it: the authorised handler manifests or Form 10 returns. Split by whether the waste is incinerated, landfilled in a secure cell, or recycled.',
      qty:'Waste in the year', multi:true, only:['plating','pharma','lab','metal','auto'],
      opts:[['Incinerated hazardous or biomedical waste','s3_5i',[['tonnes',1],['kg',0.001]]],
            ['Secure landfill or disposal cell','s3_5l',[['tonnes',1],['kg',0.001]]],
            ['Recycled: metal swarf, drums, solvent','s3_5r',[['tonnes',1],['kg',0.001]]]]},

    {sec:'Energy you buy', q:'How much electricity do you buy from the grid?',
      find:'Where to find it: add the units (kWh) from 12 monthly electricity bills. One "unit" on an Indian bill equals one kWh. If you only know the rupee spend, divide by your average tariff per unit.',
      qty:'Electricity in the year',
      opts:[['Grid electricity','s2_elec',[['kWh',1],['MWh',1000],['million units (MU)',1000000]]]]},
    {sec:'Energy you buy', q:'Do you buy steam, heat or chilled water from another company?',
      find:'Where to find it: only if a third party bills you for steam or district cooling, common on industrial estates. Answer no if you make your own steam in your boiler, that is already covered above.',
      qty:'Purchased in the year', multi:true,
      opts:[['Purchased steam or heat','s2_steam',[['kWh',1],['MWh',1000],['tonnes of steam',700]]],['Purchased cooling','s2_cool',[['kWh',1],['MWh',1000]]]]},
    {sec:'What you buy in', q:'What are your biggest purchased materials?',
      find:'Where to find it: your annual purchase register or stores issue records. Start with the two or three materials you buy most by weight, that usually covers most of the footprint.',
      qty:'Purchased in the year', multi:true,
      opts:[['Steel','s3_1st',[['tonnes',1],['kg',0.001]]],['Cement','s3_1cm',[['tonnes',1],['kg',0.001]]],['Aluminium','s3_1al',[['tonnes',1],['kg',0.001]]],['Plastics or resin','s3_1pl',[['tonnes',1],['kg',0.001]]],['Paper or board','s3_1pa',[['tonnes',1],['kg',0.001]]],['Water supplied','s3_1w',[['m³',1],['kilolitres',1]]]]},
    {sec:'What you buy in', q:'Do goods get shipped to or from your site by someone else?',
      find:'Where to find it: this is measured in tonne-km. A quick estimate: tonnes shipped × average one-way distance in km. Your transporter or freight invoices carry both numbers.',
      qty:'Tonne-km in the year', multi:true,
      opts:[['By road','s3_4r'],['By sea','s3_4s'],['By air','s3_4a'],['By rail','s3_4l']]},
    {sec:'What leaves your site', q:'How much waste does your site send out?',
      find:'Where to find it: weighbridge slips or the monthly invoice from your waste contractor. Split it by where it goes.',
      qty:'Waste in the year', multi:true,
      opts:[['Sent to landfill','s3_5l',[['tonnes',1],['kg',0.001]]],['Recycled','s3_5r',[['tonnes',1],['kg',0.001]]],['Incinerated','s3_5i',[['tonnes',1],['kg',0.001]]],['Composted','s3_5c',[['tonnes',1],['kg',0.001]]]]},
    {sec:'People moving', q:'Do your people travel for work?',
      find:'Where to find it: the travel desk or agency report. For flights, passenger-km = number of travellers × the one-way distance × trips. Hotel stays are counted as room nights.',
      qty:'Amount in the year', multi:true,
      opts:[['Flights under 3 hours','s3_6s',[['passenger-km',1]]],['Flights over 3 hours','s3_6l',[['passenger-km',1]]],['Rail journeys','s3_6r',[['passenger-km',1]]],['Taxi or hired car','s3_6t',[['km',1]]],['Hotel stays','s3_6h',[['room nights',1]]]]},
    {sec:'People moving', q:'How do employees get to work?',
      find:'Where to find it: a short staff survey is enough. Estimate: people using that mode × one-way km × 2 × working days in the year.',
      qty:'Passenger-km in the year', multi:true,
      opts:[['By car or two-wheeler','s3_7c'],['By bus','s3_7b'],['By rail or metro','s3_7r']]}
  ];
  var guideSector = '', guideStage = 'idle', guideIdx = 0, guideAdded = 0, guideOpt = 0, guideLog = [];
  function guideQs(){
    return GUIDE_QS.filter(function(q){ return !q.only || !guideSector || guideSector==='other' || q.only.indexOf(guideSector)>=0; });
  }
  function guideUnits(opt){
    if(opt && opt[2]) return opt[2];
    var a = ACT_BY_ID[opt && opt[1]];
    return [[(a && a[5]) || 'unit', 1]];
  }
  function guideRender(){
    var body = document.getElementById('guide-body'); if(!body) return;
    if(guideStage === 'idle'){
      body.innerHTML = '<button type="button" class="btn small primary" id="guide-start">Start guided setup</button>';
      return;
    }
    if(guideStage === 'intro'){
      body.innerHTML = '<div class="guide-card guide-hero">'+
        '<div class="guide-hero-banner">'+
          '<div class="guide-hero-art"><svg width="150" height="110" viewBox="0 0 150 110" fill="none" aria-hidden="true">'+
            '<circle cx="34" cy="34" r="22" stroke="#9fe3c8" stroke-width="2" fill="none" opacity=".7"/>'+
            '<path d="M34 20v-8M34 56v-8M20 34h-8M56 34h-8" stroke="#9fe3c8" stroke-width="2" stroke-linecap="round" opacity=".7"/>'+
            '<rect x="72" y="52" width="14" height="34" rx="3" fill="#ffffff" opacity=".25"/>'+
            '<rect x="92" y="40" width="14" height="46" rx="3" fill="#ffffff" opacity=".5"/>'+
            '<rect x="112" y="26" width="14" height="60" rx="3" fill="#bff0db"/>'+
            '<path d="M14 92c18-4 30-16 38-30M52 62l-4-8M52 62l8-2" stroke="#bff0db" stroke-width="2" stroke-linecap="round" fill="none"/>'+
            '<circle cx="120" cy="14" r="5" fill="#9fe3c8" opacity=".8"/>'+
          '</svg></div>'+
          '<h3>Build your footprint, question by question</h3>'+
          '<p>No technical jargon. We ask what happens at your site, you type in the numbers from your bills and logbooks, and every answer lands in the right Scope 1, 2 or 3 line with the correct emission factor.</p>'+
        '</div>'+
        '<div class="guide-hero-steps">'+
          '<div class="guide-hero-step"><div class="gh-ic"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M5 7h8M5 10h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div><b>1 · Pick your industry</b><span>Automotive, metals, plating, pharma, labs and more, so you only see questions that apply to you.</span></div>'+
          '<div class="guide-hero-step"><div class="gh-ic"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 0 1 5 5c0 2.5-2 3.5-2 5H6c0-1.5-2-2.5-2-5a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 15h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></div><b>2 · Answer yes or no</b><span>Boilers, furnaces, vehicles, electricity, waste. Each question tells you exactly which bill or register holds the number.</span></div>'+
          '<div class="guide-hero-step"><div class="gh-ic"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15V9M8 15V5M13 15v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></div><b>3 · Get your inventory</b><span>Every entry is converted, categorised to ISO 14064-1, and ready to edit. Takes about ten minutes.</span></div>'+
        '</div>'+
        '<div class="guide-actions"><button type="button" class="btn small primary" id="guide-intro-start">Begin: pick my industry</button>'+
        '<button type="button" class="btn small" id="guide-skip">Skip, I will enter data myself</button></div>'+
      '</div>';
      return;
    }
    if(guideStage === 'sector'){
      body.innerHTML = '<div class="guide-card"><span class="guide-sec">Step 1 of 2</span>'+
        '<p class="guide-q">What kind of site are we measuring?</p>'+
        '<p class="guide-why">This decides which questions you get asked, so you skip the ones that never apply to you.</p>'+
        '<div class="guide-grid">'+GUIDE_SECTORS.map(function(s){
          return '<button type="button" class="guide-chip" data-sector="'+s[0]+'">'+esc2(s[1])+'<small>'+esc2(s[2])+'</small></button>';
        }).join('')+'</div>'+
        '<div class="guide-actions"><button type="button" class="btn small" id="guide-quit">Close</button></div></div>';
      return;
    }
    var QS = guideQs();
    if(guideStage === 'done' || guideIdx >= QS.length){
      var list = guideLog.length ? '<ul class="guide-added">'+guideLog.map(function(l){
        return '<li><span>'+esc2(l.name)+'</span><span>'+esc2(l.qty)+' '+esc2(l.unit)+'</span></li>'; }).join('')+'</ul>' : '';
      body.innerHTML = '<div class="guide-card"><p class="guide-q">That is your first inventory.</p>'+
        '<p class="guide-why">'+guideAdded+' line'+(guideAdded===1?'':'s')+' created with the matching emission factor. Change any quantity or factor below, or run the guide again to add more.</p>'+
        list+
        '<div class="guide-actions"><button type="button" class="btn small primary" id="guide-review">See my inventory ↓</button>'+
        '<button type="button" class="btn small" id="guide-restart">Run the guide again</button></div></div>';
      return;
    }
    var q = QS[guideIdx];
    var dots = QS.map(function(_,i){ return '<span class="guide-dot'+(i<guideIdx?' done':(i===guideIdx?' now':''))+'"></span>'; }).join('');
    var head = '<div class="guide-card"><div class="guide-progress">'+dots+'</div>'+
      '<span class="guide-sec">'+esc2(q.sec)+'</span>'+
      '<p class="guide-q">'+esc2(q.q)+'</p>'+
      '<p class="guide-find">'+esc2(q.find)+'</p>';
    var foot = '<span class="guide-count">Question '+(guideIdx+1)+' of '+QS.length+(guideAdded?' · '+guideAdded+' added':'')+'</span></div></div>';
    if(guideStage === 'ask'){
      body.innerHTML = head+
        '<div class="guide-actions"><button type="button" class="btn small primary" id="guide-yes">Yes</button>'+
        '<button type="button" class="btn small" id="guide-no">No, next question</button>'+
        (guideIdx>0?'<button type="button" class="btn small" id="guide-back">Back</button>':'')+
        '<button type="button" class="btn small" id="guide-quit">Close</button>'+foot;
      return;
    }
    if(guideOpt >= q.opts.length) guideOpt = 0;
    var opts = q.opts.map(function(o,i){ return '<option value="'+i+'"'+(i===guideOpt?' selected':'')+'>'+esc2(o[0])+'</option>'; }).join('');
    var units = guideUnits(q.opts[guideOpt]).map(function(u){ return '<option value="'+esc2(String(u[1]))+'">'+esc2(u[0])+'</option>'; }).join('');
    var mine = guideLog.filter(function(l){ return l.q === guideIdx; });
    var list = mine.length ? '<ul class="guide-added">'+mine.map(function(l){
      return '<li><span>'+esc2(l.name)+'</span><span>'+esc2(l.qty)+' '+esc2(l.unit)+'</span></li>'; }).join('')+'</ul>' : '';
    body.innerHTML = head+
      '<div class="frow" style="align-items:flex-end;">'+
      (q.opts.length>1 ? '<div class="field"><label for="guide-opt">Which one</label><select id="guide-opt">'+opts+'</select></div>' : '<select id="guide-opt" style="display:none;">'+opts+'</select>')+
      '<div class="field"><label for="guide-qty">'+esc2(q.qty)+'</label><input type="number" step="any" min="0" id="guide-qty" placeholder="0"></div>'+
      '<div class="field"><label for="guide-unit">Unit</label><select id="guide-unit">'+units+'</select></div>'+
      '</div>'+
      '<div class="field"><label for="guide-src">Where this number came from (optional)</label><input type="text" id="guide-src" placeholder="e.g. 12 monthly bills, meter A"></div>'+
      list+
      '<div class="guide-actions"><button type="button" class="btn small primary" id="guide-add">'+(q.multi?'Add this':'Add and continue')+'</button>'+
      (q.multi?'<button type="button" class="btn small" id="guide-next">Next question</button>':'')+
      '<button type="button" class="btn small" id="guide-back">Back</button>'+
      '<button type="button" class="btn small" id="guide-quit">Close</button>'+foot;
    var qtyEl = document.getElementById('guide-qty'); if(qtyEl) qtyEl.focus();
  }
  function guideBind(){
    var body = document.getElementById('guide-body'); if(!body) return;
    body.addEventListener('change', function(e){
      if(e.target.id !== 'guide-opt') return;
      var QS = guideQs(), q = QS[guideIdx]; if(!q) return;
      guideOpt = +e.target.value;
      var u = document.getElementById('guide-unit'); if(!u) return;
      u.innerHTML = guideUnits(q.opts[+e.target.value]).map(function(x){ return '<option value="'+x[1]+'">'+esc2(x[0])+'</option>'; }).join('');
    });
    body.addEventListener('click', function(e){
      var chip = e.target.closest('[data-sector]');
      if(chip){ guideSector = chip.getAttribute('data-sector'); guideIdx = 0; guideOpt = 0; guideStage = 'ask'; guideRender(); return; }
      var btn = e.target.closest('button'); var id = btn && btn.id;
      if(!id) return;
      var QS = guideQs(), q = QS[guideIdx];
      if(id==='guide-start'){ guideStage = 'intro'; guideRender(); return; }
      if(id==='guide-intro-start' || id==='guide-restart'){ guideIdx = 0; guideAdded = 0; guideOpt = 0; guideLog = []; guideStage = 'sector'; guideRender(); return; }
      if(id==='guide-skip'){ guideStage = 'idle'; guideRender(); return; }
      if(id==='guide-quit'){ guideStage = guideAdded ? 'done' : 'idle'; guideRender(); return; }
      if(id==='guide-review'){ var c = document.getElementById('ghg-cats'); if(c) c.scrollIntoView({behavior:'smooth'}); return; }
      if(id==='guide-yes'){ guideStage = 'entry'; guideRender(); return; }
      if(id==='guide-no' || id==='guide-next'){ guideIdx++; guideOpt = 0; guideStage = guideIdx >= QS.length ? 'done' : 'ask'; guideRender(); return; }
      if(id==='guide-back'){
        if(guideStage === 'entry'){ guideStage = 'ask'; }
        else if(guideIdx > 0){ guideIdx--; guideStage = 'ask'; }
        else { guideStage = 'sector'; }
        guideRender(); return;
      }
      if(id==='guide-add'){
        if(!q) return;
        var opt = q.opts[+document.getElementById('guide-opt').value];
        var raw = document.getElementById('guide-qty').value;
        var unitSel = document.getElementById('guide-unit');
        var mult = num(unitSel.value) || 1;
        var unitLabel = unitSel.options[unitSel.selectedIndex].text;
        var src = (document.getElementById('guide-src').value || '').trim();
        if(!raw || num(raw) <= 0){ alert('Enter the amount for the year, or choose Next question.'); return; }
        var a = ACT_BY_ID[opt[1]]; if(!a) return;
        st.rows.push({id:uid(), group:a[3], act:opt[1], qty:String(num(raw)*mult), ef:a[6], note:(src?'Guided setup · '+src:'Guided setup'), label:'', unit:a[5], scope:a[1], iso:a[2]});
        guideAdded++;
        guideLog.push({q:guideIdx, name:opt[0], qty:String(num(raw)), unit:unitLabel});
        save(); render();
        if(!q.multi){ guideIdx++; guideStage = guideIdx >= QS.length ? 'done' : 'ask'; }
        guideRender();
      }
    });
  }


  /* ---------- Journey shortcuts ---------- */
  host.addEventListener('click', function(e){
    var j = e.target.closest('[data-jgo]'); if(!j) return;
    var v = j.getAttribute('data-jgo');
    var nav = document.querySelector('[data-view="'+v+'"]');
    if(nav){ nav.click(); window.scrollTo({top:0,behavior:'smooth'}); }
  });

  /* ---------- Document import ---------- */
  var SYN = {
    s1_ng:['natural gas','png','pipeline gas','sng','gas m3'],
    s1_lpg:['lpg','propane','butane','cooking gas'],
    s1_do:['diesel','gas oil','hsd','generator fuel','dg set'],
    s1_fo:['furnace oil','fuel oil','hfo','ldo'],
    s1_coal:['coal','lignite','pet coke','petcoke'],
    s1_bio:['biomass','wood chip','briquette','husk','bagasse'],
    s1_pet:['petrol','gasoline','mogas'],
    s1_mdo:['vehicle diesel','fleet diesel','truck diesel'],
    s1_cng:['cng','compressed natural gas'],
    s1_car:['company car','owned car','pool car'],
    s1_hgv:['hgv','truck km','lorry'],
    s1_r134:['r134','134a'], s1_r410:['r410','410a'], s1_r32:['r32'], s1_r404:['r404','404a'], s1_r22:['r22','hcfc 22'],
    s1_ch4:['methane','ch4'], s1_n2o:['nitrous','n2o'],
    s1_proc:['process emission','calcination','process co2'],
    s1_land:['fertiliser','fertilizer','urea','nitrogen applied'],
    s2_elec:['electricity','grid','power purchased','kwh consumed','energy bill','discom','utility bill'],
    s2_steam:['steam','purchased heat','district heat'],
    s2_cool:['chilled water','purchased cooling','district cooling'],
    s3_1s:['purchased goods','procurement spend','supplier spend'],
    s3_1st:['steel'], s3_1cm:['cement'], s3_1pl:['plastic','polymer','resin'], s3_1pa:['paper','board','carton'],
    s3_1w:['water supply','water consumed','municipal water'],
    s3_2:['capital goods','capex','machinery purchased'],
    s3_3e:['t d loss','transmission loss','wtt electricity'],
    s3_3f:['wtt diesel','upstream diesel'], s3_3g:['wtt gas','upstream gas'],
    s3_4r:['road freight','inbound freight','trucking','tonne km'],
    s3_4s:['sea freight','ocean freight','shipping'],
    s3_4a:['air freight','air cargo'], s3_4l:['rail freight'],
    s3_5l:['landfill','waste disposed','mixed waste'],
    s3_5r:['recycled','recycling'], s3_5i:['incinerat','waste to energy'],
    s3_5w:['wastewater','effluent','etp','sewage'],
    s3_6s:['short haul','domestic flight'], s3_6l:['long haul','international flight','air travel'],
    s3_6r:['rail travel','train travel'], s3_6t:['taxi','cab','hired car'], s3_6h:['hotel','accommodation'],
    s3_7c:['commute car','employee commute'], s3_7b:['commute bus','bus commute'], s3_7r:['commute rail','metro commute'],
    s3_7h:['homeworking','work from home','remote working'],
    s3_8:['leased asset','upstream lease'],
    s3_9:['outbound freight','distribution freight','delivery freight'],
    s3_10:['processing of sold'], s3_11e:['use phase electricity','product electricity'], s3_11f:['use phase fuel','product fuel'],
    s3_12:['end of life','sold product waste'], s3_13:['leased out'], s3_14:['franchise'], s3_15:['investment','financed emission','portfolio']
  };
  var UNITS = [
    [/^(kwh|kw h|units?|kvah)$/,'kWh',1],[/^mwh$/,'kWh',1000],[/^gwh$/,'kWh',1e6],
    [/^(l|lt|ltr|litre|liter|litres|liters)$/,'litre',1],[/^(kl|kilolitre|kilolitres)$/,'litre',1000],
    [/^(gal|gallon|gallons)$/,'litre',3.785],
    [/^(m3|m³|cum|cbm|scm|nm3|sm3|cubic metre|cubic meter)$/,'m³',1],
    [/^(kg|kgs|kilogram|kilograms)$/,'kg',1],[/^(t|mt|te|ton|tons|tonne|tonnes|metric ton)$/,'tonne',1],
    [/^(km|kms|kilometre|kilometres)$/,'km',1],[/^(mi|mile|miles)$/,'km',1.609],
    [/^(tkm|tonne km|ton km|t km)$/,'tonne-km',1],[/^(pkm|passenger km|pax km)$/,'passenger-km',1],
    [/^(night|nights|room night|room nights)$/,'night',1],[/^(day|days|employee day|employee days)$/,'employee-day',1],
    [/^(tco2e|tco₂e|t co2e)$/,'tCO₂e',1],[/^(kg n|kgn)$/,'kg N',1]
  ];
  function normTxt(s){ return String(s==null?'':s).toLowerCase().replace(/[^a-z0-9³²]+/g,' ').trim(); }
  function readUnit(raw){
    var u = normTxt(raw); if(!u) return null;
    for(var i=0;i<UNITS.length;i++){ if(UNITS[i][0].test(u)) return {unit:UNITS[i][1], mult:UNITS[i][2]}; }
    return null;
  }
  function readNum(raw){
    var s = String(raw==null?'':raw).replace(/[^0-9.,\-]/g,'');
    if(!s) return null;
    if(/,\d{3}(\D|$)/.test(s) || (s.indexOf(',')>-1 && s.indexOf('.')>-1)) s = s.replace(/,/g,'');
    else s = s.replace(/,/g,'.');
    var n = parseFloat(s); return isFinite(n) ? n : null;
  }
  function matchAct(text, unitInfo){
    var t = ' '+normTxt(text)+' ', best = null, bestScore = 0;
    ACTS.forEach(function(a){
      if(a[0]==='custom') return;
      var score = 0;
      (SYN[a[0]]||[]).forEach(function(k){ if(t.indexOf(' '+normTxt(k))>-1 || t.indexOf(normTxt(k))>-1) score += 3; });
      normTxt(a[4]).split(' ').forEach(function(w){ if(w.length>3 && t.indexOf(' '+w)>-1) score += 1; });
      if(unitInfo && unitInfo.unit === a[5]) score += 1; else if(unitInfo) score -= 0.5;
      if(score > bestScore){ bestScore = score; best = a; }
    });
    return {act:best, score:bestScore};
  }
  function splitRow(line){
    var d = ['\t','|',';',','].filter(function(c){ return line.indexOf(c)>-1; })[0];
    if(!d) return [line.trim()];
    var out=[], cur='', q=false;
    for(var i=0;i<line.length;i++){
      var c = line[i];
      if(c==='"'){ if(q && line[i+1]==='"'){ cur+='"'; i++; } else q = !q; }
      else if(c===d && !q){ out.push(cur); cur=''; }
      else cur += c;
    }
    out.push(cur);
    return out.map(function(x){ return x.trim(); });
  }
  var pending = [];
  function parseText(text, source){
    var lines = String(text||'').split(/\r?\n/).filter(function(l){ return l.trim().length; });
    if(!lines.length) return;
    var head = splitRow(lines[0]).map(normTxt), map = null;
    var find = function(re){ for(var i=0;i<head.length;i++){ if(re.test(head[i])) return i; } return -1; };
    var iA = find(/activity|description|item|particular|fuel|source|type|category/);
    var iQ = find(/qty|quantity|amount|consumption|usage|volume|value|units consumed|reading/);
    var iU = find(/^unit|uom|measure/);
    var iN = find(/note|remark|invoice|meter|ref|comment/);
    if(iA>-1 && iQ>-1){ map = {a:iA,q:iQ,u:iU,n:iN}; lines = lines.slice(1); }
    lines.forEach(function(line){
      var cells = splitRow(line);
      var label, qty, unitRaw, note;
      if(map){
        label = cells[map.a]||''; qty = readNum(cells[map.q]);
        unitRaw = map.u>-1 ? cells[map.u] : '';
        note = map.n>-1 ? cells[map.n] : '';
      } else {
        label = cells.filter(function(c){ return readNum(c)===null && c; })[0] || cells[0] || '';
        for(var i=0;i<cells.length;i++){ var n = readNum(cells[i]); if(n!==null && qty==null){ qty = n; unitRaw = String(cells[i]).replace(/[0-9.,\s\-]/g,''); } }
        if(!unitRaw){ var m = line.match(/\b(kwh|mwh|litre|liters?|l|kg|tonnes?|t|m3|m³|km|miles?|tkm|pkm|nights?)\b/i); unitRaw = m?m[1]:''; }
        note = '';
      }
      if(qty==null || !label) return;
      var ui = readUnit(unitRaw);
      var mm = matchAct(label+' '+(note||''), ui);
      var a = mm.act || ACT_BY_ID['custom'];
      var q = qty * (ui && a && ui.unit === a[5] ? ui.mult : (ui ? ui.mult : 1));
      pending.push({
        raw: label, qty: q, unit: ui?ui.unit:(unitRaw||''), act: a[0],
        note: (note||'') + (source?(note?' · ':'')+source:''),
        score: mm.score, use: mm.score >= 2
      });
    });
  }
  function confClass(s){ return s>=4?'hi':(s>=2?'mid':'lo'); }
  function confText(s){ return s>=4?'High':(s>=2?'Check':'No match'); }
  function renderReview(){
    var box = document.getElementById('ghg-review');
    if(!pending.length){ box.innerHTML = '<p class="hint" style="margin:0;">Nothing read yet.</p>'; return; }
    var opts = ACTS.map(function(a){ return {v:a[0], l:a[3]+' · '+a[4]}; });
    box.innerHTML = '<div class="fgroup-title" style="margin-top:4px;">Review '+pending.length+' row'+(pending.length===1?'':'s')+' before importing</div>'+
      '<p class="hint" style="margin:0 0 8px;">Untick anything you do not want, and correct any activity we guessed wrong. Quantities are converted to the activity unit.</p>'+
      '<div class="month-table-wrap"><table class="parse-tbl"><thead><tr><th style="width:32px;"></th><th>From your file</th><th style="min-width:220px;">Activity</th><th style="width:110px;">Quantity</th><th style="width:90px;">Match</th></tr></thead><tbody>'+
      pending.map(function(p,i){
        var a = ACT_BY_ID[p.act]||ACT_BY_ID['custom'];
        return '<tr data-i="'+i+'">'+
          '<td><input type="checkbox" data-pf="use"'+(p.use?' checked':'')+'></td>'+
          '<td>'+esc2(p.raw)+(p.unit?' <span class="hint">('+esc2(p.unit)+')</span>':'')+'</td>'+
          '<td><select data-pf="act">'+opts.map(function(o){ return '<option value="'+o.v+'"'+(o.v===p.act?' selected':'')+'>'+esc2(o.l)+'</option>'; }).join('')+'</select></td>'+
          '<td><input type="number" step="any" data-pf="qty" value="'+esc2(p.qty)+'"><span class="hint">'+esc2(a[5])+'</span></td>'+
          '<td><span class="conf '+confClass(p.score)+'">'+confText(p.score)+'</span></td>'+
          '</tr>';
      }).join('')+'</tbody></table></div>'+
      '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">'+
        '<button class="btn small" type="button" id="ghg-import">Add ticked rows to inventory</button>'+
        '<button class="btn small" type="button" id="ghg-discard">Discard</button></div>';
    box.querySelector('#ghg-import').addEventListener('click', function(){
      var added = 0;
      pending.forEach(function(p){
        if(!p.use) return;
        var a = ACT_BY_ID[p.act]; if(!a) return;
        st.rows.push({id:uid(), group:a[3], act:a[0], qty:p.qty, ef:a[6], note:p.note||'Imported from document', label:a[0]==='custom'?p.raw:'', unit:p.unit||'unit', scope:a[1], iso:a[2]});
        added++;
      });
      pending = []; save(); render(); renderReview();
      alert(added ? added+' line'+(added===1?'':'s')+' added to the inventory.' : 'No rows were ticked.');
    });
    box.querySelector('#ghg-discard').addEventListener('click', function(){ pending = []; renderReview(); });
    box.addEventListener('change', function(e){
      var f = e.target.getAttribute && e.target.getAttribute('data-pf'); if(!f) return;
      var tr = e.target.closest('tr'); var p = pending[+tr.getAttribute('data-i')]; if(!p) return;
      if(f==='use') p.use = e.target.checked;
      else if(f==='qty') p.qty = num(e.target.value);
      else { p.act = e.target.value; renderReview(); }
    });
  }
  function readFiles(files){
    var list = Array.prototype.slice.call(files||[]);
    if(!list.length) return;
    var left = list.length;
    list.forEach(function(f){
      var fr = new FileReader();
      fr.onload = function(){ parseText(fr.result, f.name); if(--left===0) renderReview(); };
      fr.onerror = function(){ if(--left===0) renderReview(); };
      fr.readAsText(f);
    });
  }
  (function bindImport(){
    var drop = document.getElementById('ghg-drop'), file = document.getElementById('ghg-file');
    if(!drop) return;
    document.getElementById('ghg-browse').addEventListener('click', function(){ file.click(); });
    file.addEventListener('change', function(){ readFiles(file.files); file.value=''; });
    ['dragenter','dragover'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.add('over'); }); });
    ['dragleave','drop'].forEach(function(ev){ drop.addEventListener(ev, function(e){ e.preventDefault(); drop.classList.remove('over'); }); });
    drop.addEventListener('drop', function(e){ readFiles(e.dataTransfer && e.dataTransfer.files); });
    document.getElementById('ghg-parse').addEventListener('click', function(){
      var ta = document.getElementById('ghg-paste');
      if(!ta.value.trim()){ alert('Paste some rows or choose a file first.'); return; }
      parseText(ta.value, 'Pasted'); renderReview();
    });
  })();

  bindOnce();
  guideBind();

  render();
})();

/* ================= TGS review & approval ================= */
(function(){
  var RKEY='baseline_review_v1';
  var host=document.getElementById('view-review');
  if(!host) return;
  var subs=[];
  try{ var raw=localStorage.getItem(RKEY); if(raw){ var p=JSON.parse(raw); if(Array.isArray(p)) subs=p; } }catch(e){}
  function save(){ try{ localStorage.setItem(RKEY, JSON.stringify(subs)); }catch(e){} }
  function esc3(x){ return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function n3(t){ if(!t) return '0'; var a=Math.abs(t); return t.toLocaleString(undefined,{maximumFractionDigits:a<1?3:(a<100?2:0)}); }
  function when(ts){ return new Date(ts).toLocaleString(); }
  function ghg(){ return window.BaselineGHG || null; }

  function snapshot(){
    var api=ghg(); if(!api) return null;
    var t=api.totals(), st=api.state();
    return { org:st.org||'', year:st.year||'', approach:st.approach||'', grid:st.grid||'',
      s1:t[1], s2:t[2], s2m:(st.market===''||st.market==null)?null:parseFloat(st.market), s3:t[3], total:t.total, bio:t.bio,
      lines:(st.rows||[]).length };
  }

  var STATUS={draft:'Draft',submitted:'Submitted, awaiting TGS',review:'Under TGS review',approved:'Approved by TGS',rejected:'Returned with discrepancies'};
  var CLS={draft:'',submitted:'conditional',review:'conditional',approved:'likely',rejected:'unlikely'};

  function log(sub,status,who,comment){
    sub.status=status;
    sub.history=sub.history||[];
    sub.history.push({status:status, who:who||'', comment:comment||'', at:Date.now()});
  }

  function summary(){
    if(!subs.length) return {label:'No draft submitted yet', detail:''};
    var last=subs[0];
    return {label:STATUS[last.status]||last.status, detail:(last.year||'')+(last.status==='approved'?' · ref '+(last.ref||''):'')};
  }
  window.BaselineReview={ summary:summary, list:function(){ return subs; } };

  function card(sub){
    var h=(sub.history||[]).map(function(e){
      return '<tr><td>'+esc3(STATUS[e.status]||e.status)+'</td><td>'+esc3(e.who||'—')+'</td><td>'+esc3(e.comment||'—')+'</td><td>'+esc3(when(e.at))+'</td></tr>';
    }).join('');
    var s=sub.snapshot||{};
    var actions='';
    if(sub.status==='submitted'||sub.status==='review'){
      actions=
        '<div class="frow" style="margin-top:10px;">'+
          '<div class="field"><label>Reviewer name (TGS)</label><input type="text" data-f="reviewer" value="'+esc3(sub.reviewer||'')+'" placeholder="Reviewer"></div>'+
          '<div class="field"><label>Review comments / discrepancies</label><input type="text" data-f="comment" placeholder="What was checked, or what must be fixed"></div>'+
        '</div>'+
        '<span style="display:flex;gap:8px;flex-wrap:wrap;">'+
          '<button class="btn small primary" data-act="approve">Approve report</button>'+
          '<button class="btn small danger" data-act="reject">Reject, return for correction</button>'+
        '</span>';
    } else if(sub.status==='rejected'){
      actions='<span style="display:flex;gap:8px;flex-wrap:wrap;">'+
        '<button class="btn small primary" data-act="resubmit">Re-submit corrected draft</button>'+
        '<button class="btn small" data-act="draft">Export draft report</button></span>';
    } else if(sub.status==='approved'){
      actions='<span style="display:flex;gap:8px;flex-wrap:wrap;">'+
        '<button class="btn small primary" data-act="final">Export final report for the client</button></span>';
    }
    return '<div class="pcard open" data-id="'+esc3(sub.id)+'" style="margin-bottom:12px;"><div class="pcard-body" style="display:block;">'+
      '<div class="pcard-title"><h3>'+esc3(sub.year||'Reporting period not set')+' · '+esc3(s.org||'Organisation')+'</h3>'+
      '<div class="pcard-chips"><span class="chip '+CLS[sub.status]+'">'+esc3(STATUS[sub.status]||sub.status)+'</span>'+
      (sub.ref?'<span class="chip">Ref '+esc3(sub.ref)+'</span>':'')+'</div></div>'+
      '<div class="month-table-wrap"><table class="month-table"><thead><tr><th>Scope 1</th><th>Scope 2 (location)</th><th>Scope 2 (market)</th><th>Scope 3</th><th>Total</th><th>Lines</th></tr></thead><tbody>'+
      '<tr><td>'+n3(s.s1)+'</td><td>'+n3(s.s2)+'</td><td>'+(s.s2m==null?'—':n3(s.s2m))+'</td><td>'+n3(s.s3)+'</td><td><strong>'+n3(s.total)+'</strong></td><td>'+esc3(s.lines)+'</td></tr>'+
      '</tbody></table></div>'+
      (sub.note?'<div class="notes-box">Submitter note: '+esc3(sub.note)+'</div>':'')+
      '<div class="month-table-wrap" style="margin-top:10px;"><table class="month-table"><thead><tr><th>Status</th><th>By</th><th>Comment</th><th>When</th></tr></thead><tbody>'+h+'</tbody></table></div>'+
      actions+
      '</div></div>';
  }

  function renderSnapshotHint(){
    var el=document.getElementById('rv-snapshot'); if(!el) return;
    var s=snapshot();
    el.innerHTML = (!s || !s.lines)
      ? 'No inventory data yet. Measure your footprint in the GHG inventory before submitting.'
      : 'This submits a snapshot of your current inventory: <strong>'+n3(s.total)+' tCO₂e</strong> across '+s.lines+' activity line'+(s.lines===1?'':'s')+', with the factors and sources used.';
  }

  function render(){
    var list=document.getElementById('rv-list');
    list.innerHTML = subs.length ? subs.map(card).join('')
      : '<p class="hint" style="margin:0;">Nothing submitted yet. Submit a draft above and it appears here for TGS to approve or reject.</p>';
    list.querySelectorAll('[data-act]').forEach(function(b){
      b.addEventListener('click', function(){
        var wrap=b.closest('[data-id]'), id=wrap.getAttribute('data-id');
        var sub=subs.filter(function(x){ return x.id===id; })[0]; if(!sub) return;
        var act=b.getAttribute('data-act');
        var rvEl=wrap.querySelector('[data-f="reviewer"]'), cmEl=wrap.querySelector('[data-f="comment"]');
        var reviewer=rvEl?rvEl.value.trim():'', comment=cmEl?cmEl.value.trim():'';
        if(act==='approve'||act==='reject'){
          if(!reviewer){ alert('Enter the TGS reviewer name.'); return; }
          if(!comment){ alert('Add review comments: what was checked, or what must be corrected.'); return; }
          sub.reviewer=reviewer;
          if(act==='approve'){
            sub.ref='TGS-'+new Date().getFullYear()+'-'+String(subs.length+1).padStart(3,'0');
            sub.approvedOn=new Date().toLocaleDateString();
            sub.approvalComment=comment;
            log(sub,'approved',reviewer,comment);
          } else {
            log(sub,'rejected',reviewer,comment);
          }
        } else if(act==='resubmit'){
          sub.snapshot=snapshot();
          log(sub,'submitted',sub.contact||'Client','Corrected data re-submitted.');
        } else if(act==='draft'){
          if(ghg()) ghg().annualReport();
          return;
        } else if(act==='final'){
          if(ghg()) ghg().annualReport({status:'approved', ref:sub.ref, reviewer:sub.reviewer, date:sub.approvedOn, comment:sub.approvalComment});
          return;
        }
        save(); render();
        if(window.__baselineFootprint) window.__baselineFootprint();
      });
    });
    renderSnapshotHint();
  }

  document.getElementById('rv-submit').addEventListener('click', function(){
    var s=snapshot();
    if(!s || !s.lines){ alert('Add activity data to the GHG inventory first; there is nothing to review yet.'); return; }
    var year=document.getElementById('rv-year').value.trim() || s.year;
    var contact=document.getElementById('rv-contact').value.trim();
    var note=document.getElementById('rv-note').value.trim();
    var sub={ id:'r'+Date.now().toString(36), year:year, contact:contact, note:note, snapshot:s, status:'draft', history:[] };
    log(sub,'draft',contact,'Draft prepared in Baseline.');
    log(sub,'submitted',contact,'Submitted to TGS for expert review.');
    subs.unshift(sub); save();
    document.getElementById('rv-note').value='';
    render();
    if(window.__baselineFootprint) window.__baselineFootprint();
  });

  (function prefill(){
    var s=snapshot();
    if(s){ var y=document.getElementById('rv-year'); if(y && !y.value) y.value=s.year||''; }
  })();
  render();
  if(window.__baselineFootprint) window.__baselineFootprint();
})();

