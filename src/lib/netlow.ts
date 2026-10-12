// Net-Low domain model: activity categories, accounting treatment and the
// carbon calculation engine. Points are engagement rewards, never carbon credits.

export const CALC_VERSION = "calc-2026.1";

export type EmissionFactor = {
  id: string;
  company_id?: string | null;
  activity_key: string;
  label: string;
  unit: string;
  kg_co2e_per_unit: number;
  scope: string;
  ghg_category: string;
  source: string;
  geography: string;
  year: number;
  version: string;
};

export type CategoryKey =
  | "commuting"
  | "business_travel"
  | "waste"
  | "energy"
  | "materials"
  | "water";

export type CategoryDef = {
  key: CategoryKey;
  label: string;
  treatment: string;
  scope: string;
  ghg_category: string;
  quantityLabel: string;
  units: string[];
  baselineKeys: string[];
  alternativeKeys: string[];
  kpiOnly?: boolean;
  help: string;
};

export const CATEGORIES: CategoryDef[] = [
  {
    key: "commuting",
    label: "Employee commuting",
    treatment: "Scope 3, Category 7",
    scope: "Scope 3",
    ghg_category: "Category 7",
    quantityLabel: "Distance one way",
    units: ["km", "mi"],
    baselineKeys: [
      "commute_car_petrol",
      "commute_car_diesel",
      "commute_motorbike",
      "commute_car_ev",
      "commute_bus",
      "commute_rail",
    ],
    alternativeKeys: [
      "commute_walk_cycle",
      "commute_rail",
      "commute_bus",
      "commute_carpool",
      "commute_car_ev",
      "commute_wfh_day",
    ],
    help: "Your usual way in, and what you did instead.",
  },
  {
    key: "business_travel",
    label: "Business travel reduction",
    treatment: "Scope 3, Category 6",
    scope: "Scope 3",
    ghg_category: "Category 6",
    quantityLabel: "Distance avoided",
    units: ["km", "mi"],
    baselineKeys: [
      "travel_air_short",
      "travel_air_long",
      "travel_rail_intercity",
      "commute_car_petrol",
      "travel_hotel_night",
    ],
    alternativeKeys: ["travel_virtual_meeting", "travel_rail_intercity", "commute_rail"],
    help: "The trip that would have happened, and the lower-carbon option taken.",
  },
  {
    key: "waste",
    label: "Waste and food-waste diversion",
    treatment: "Scope 3, Category 5",
    scope: "Scope 3",
    ghg_category: "Category 5",
    quantityLabel: "Weight diverted",
    units: ["kg", "t"],
    baselineKeys: ["waste_landfill_mixed", "waste_food_landfill"],
    alternativeKeys: ["waste_recycled_mixed", "waste_food_compost", "waste_food_anaerobic"],
    help: "Where the waste would have gone, and where it actually went.",
  },
  {
    key: "energy",
    label: "Workplace energy conservation",
    treatment: "Scope 1 or Scope 2",
    scope: "Scope 2",
    ghg_category: "Scope 2 location-based",
    quantityLabel: "Energy avoided",
    units: ["kWh", "MWh"],
    baselineKeys: ["energy_electricity_grid", "energy_natural_gas"],
    alternativeKeys: [],
    help: "Metered or sub-metered energy not used. Meter evidence makes this measured.",
  },
  {
    key: "materials",
    label: "Paper and office materials",
    treatment: "Scope 3, Category 1",
    scope: "Scope 3",
    ghg_category: "Category 1",
    quantityLabel: "Quantity avoided",
    units: ["kg", "sheet"],
    baselineKeys: ["paper_virgin", "paper_sheet_a4"],
    alternativeKeys: ["paper_recycled"],
    help: "Paper or materials not consumed, or switched to recycled content.",
  },
  {
    key: "water",
    label: "Water conservation",
    treatment: "Environmental KPI (emissions reported separately)",
    scope: "Scope 3",
    ghg_category: "Category 1",
    quantityLabel: "Water saved",
    units: ["m3", "L"],
    baselineKeys: ["water_supply", "water_treatment"],
    alternativeKeys: [],
    kpiOnly: true,
    help: "Tracked as a water KPI. Any associated emissions are shown in a separate line.",
  },
];

export const categoryByKey = (key: string) =>
  (CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0])!;

export const EVIDENCE_TYPES = [
  { key: "self-reported", label: "Self-reported only", verifiable: false },
  { key: "gps", label: "GPS / trip record", verifiable: true },
  { key: "receipt", label: "Receipt or ticket", verifiable: true },
  { key: "photo", label: "Photograph", verifiable: false },
  { key: "meter", label: "Meter or weighbridge reading", verifiable: true },
  { key: "system", label: "System integration feed", verifiable: true },
];

export const isVerifiable = (evidenceType: string) =>
  EVIDENCE_TYPES.find((e) => e.key === evidenceType)?.verifiable ?? false;

export const FREQUENCIES = ["one-off", "daily", "weekly", "monthly"];

// Unit conversion into the factor's native unit.
const CONVERSIONS: Record<string, Record<string, number>> = {
  km: { km: 1, mi: 1.60934 },
  kg: { kg: 1, t: 1000 },
  kWh: { kWh: 1, MWh: 1000 },
  m3: { m3: 1, L: 0.001 },
  sheet: { sheet: 1 },
  day: { day: 1 },
  night: { night: 1 },
  hour: { hour: 1 },
};

export function convert(quantity: number, fromUnit: string, toUnit: string): number {
  if (fromUnit === toUnit) return quantity;
  const table = CONVERSIONS[toUnit];
  if (table && table[fromUnit] != null) return quantity * table[fromUnit]!;
  return quantity;
}

export type CalcInput = {
  category: CategoryKey;
  quantity: number;
  unit: string;
  occurrences: number;
  baselineFactor?: EmissionFactor | null;
  actualFactor?: EmissionFactor | null;
  evidenceType: string;
  pointsPerKg?: number;
};

export type CalcResult = {
  baseline_kg: number;
  actual_kg: number;
  reduction_kg: number;
  scope: string;
  ghg_category: string;
  reduction_type: "estimated" | "measured";
  points: number;
  factor_snapshot: Record<string, unknown>;
};

export function calculate(input: CalcInput): CalcResult {
  const cat = categoryByKey(input.category);
  const occ = Math.max(1, Number(input.occurrences) || 1);
  const qty = Math.max(0, Number(input.quantity) || 0);

  const apply = (f?: EmissionFactor | null) => {
    if (!f) return 0;
    return convert(qty, input.unit, f.unit) * occ * Number(f.kg_co2e_per_unit);
  };

  const baseline_kg = apply(input.baselineFactor);
  const actual_kg = apply(input.actualFactor);
  const reduction_kg = Math.max(0, baseline_kg - actual_kg);
  const measured = isVerifiable(input.evidenceType);
  const pointsPerKg = input.pointsPerKg ?? 10;

  return {
    baseline_kg: round3(baseline_kg),
    actual_kg: round3(actual_kg),
    reduction_kg: round3(reduction_kg),
    scope: input.baselineFactor?.scope ?? cat.scope,
    ghg_category: input.baselineFactor?.ghg_category ?? cat.ghg_category,
    reduction_type: measured ? "measured" : "estimated",
    points: Math.round(reduction_kg * pointsPerKg) + 5,
    factor_snapshot: {
      calc_version: CALC_VERSION,
      calculated_at: new Date().toISOString(),
      quantity: qty,
      unit: input.unit,
      occurrences: occ,
      baseline: input.baselineFactor ? snapshot(input.baselineFactor) : null,
      alternative: input.actualFactor ? snapshot(input.actualFactor) : null,
      kpi_only: !!cat.kpiOnly,
    },
  };
}

const snapshot = (f: EmissionFactor) => ({
  activity_key: f.activity_key,
  label: f.label,
  unit: f.unit,
  kg_co2e_per_unit: Number(f.kg_co2e_per_unit),
  scope: f.scope,
  ghg_category: f.ghg_category,
  source: f.source,
  geography: f.geography,
  year: f.year,
  version: f.version,
});

export const round3 = (n: number) => Math.round(n * 1000) / 1000;

// Deterministic duplicate key — the same activity on the same day cannot be
// submitted twice by the same person.
export function dedupeHash(parts: (string | number | null | undefined)[]): string {
  const raw = parts.map((p) => String(p ?? "")).join("|").toLowerCase();
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < raw.length; i++) {
    h1 = (h1 ^ raw.charCodeAt(i)) >>> 0;
    h1 = (h1 * 0x01000193) >>> 0;
    h2 = (h2 + raw.charCodeAt(i) * (i + 7)) >>> 0;
  }
  return h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0");
}

export const fmt = (n: number, digits = 2) =>
  Number(n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const kgToT = (kg: number) => kg / 1000;

// Badges are engagement rewards only.
export const BADGES = [
  { key: "first-step", label: "First step", test: (s: Stats) => s.approved >= 1 },
  { key: "ten-logs", label: "Ten activities", test: (s: Stats) => s.approved >= 10 },
  { key: "streak-5", label: "5-day streak", test: (s: Stats) => s.streak >= 5 },
  { key: "streak-20", label: "20-day streak", test: (s: Stats) => s.streak >= 20 },
  { key: "quarter-tonne", label: "Quarter tonne saved", test: (s: Stats) => s.reduction_kg >= 250 },
  { key: "tonne", label: "One tonne saved", test: (s: Stats) => s.reduction_kg >= 1000 },
  { key: "evidence-pro", label: "Evidence pro", test: (s: Stats) => s.measured >= 5 },
];

export type Stats = {
  approved: number;
  streak: number;
  reduction_kg: number;
  measured: number;
};

export function streakDays(dates: string[]): number {
  const set = new Set(dates);
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    const key = d.toISOString().slice(0, 10);
    if (set.has(key)) {
      streak++;
    } else if (i > 0) {
      break;
    }
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

export function dataQualityScore(rows: { evidence_type: string; evidence_path: string | null }[]) {
  if (!rows.length) return 0;
  const score = rows.reduce((sum, r) => {
    let s = 0.3;
    if (isVerifiable(r.evidence_type)) s = 0.75;
    if (r.evidence_path) s += 0.25;
    return sum + Math.min(1, s);
  }, 0);
  return Math.round((score / rows.length) * 100);
}

export function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]!);
  const esc = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
}

export function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
