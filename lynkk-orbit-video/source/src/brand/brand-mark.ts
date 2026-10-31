// Vendored from the Lynkk repo (apps/decibel-web/src/lib/brand-mark.ts) on 2026-10-29, so the kit runs on its own.
// If the brand changes, copy the file again; never edit it here.
/**
 * The Lynkk brand mark: a striped sphere.
 *
 * One source for every placement — the favicon, the Apple icon, both OG
 * templates, the sidebar, and the Ask Lynkk spinner all read this file. They
 * used to drift apart every time one of them was touched, which is why the
 * geometry lives here and nowhere else.
 *
 * Exported from the brand kit (exports/svg/lynkk-mark-*.svg), stripped of its
 * C2PA metadata and run through svgo. The paths are filled, not stroked, so
 * they scale without a stroke-width to keep in sync.
 */

/** The sphere is drawn around the origin, so it centres without a transform. */
export const MARK_VIEWBOX = "-104 -104 208 208";

/** The stripes, in draw order. Fill them with currentColor. */
export const MARK_PATHS: readonly string[] = [
  "M0 100h7l1-1h2-1v1z",
  "M0 100h1l1-1h3l1-1h2v-1h3l1-1h1l1-1h3l1-1h2l1-1h2l1-1h2l1-1h3l1-1h3v-1h8v1h-1v1h-1l-1 1h-2v1h-1l-20 6 1-1h4v-1h3v-1h-3v1h-5l-1 1h-4l-1 1H6l-1 1z",
  "M0 100v-2h1v-1h1v-1h1v-1h2v-1h1l1-1h1v-1l1-1h1l1-1h1l1-1h1l1-1 1-1h1l1-1h1l2-1 1-1h1l1-1 1-1h1l2-1h1l1-1 1-1h1l2-1h1l1-1 1-1h2l1-1h1l1-1h1l2-1h1l1-1h1l1-1h1l1-1h2l1-1h2l1-1h3l1-1h10v1h1v2h-1v1l-1 1v1h-1v1h-1L50 87l1-1h1v-1h1v-1h1l1-1v-2h-8l-1 1h-3l-1 1h-2l-1 1h-2l-1 1h-2l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-3l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-1l-1 1H8l-1 1H5v1H3v1H1z",
  "M-10 100H0h-6l-1-1h-2v-1l-1-1v-3h1v-1l1-1v-1l1-1 1-1 1-1v-1h1l1-1 1-1v-1h1l1-1 1-1 1-1 1-1h1l1-1 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1h1l2-1 1-1 1-1 2-1 1-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 1-1 2-1 1-1h2l1-1 2-1 1-1 1-1 2-1h1l2-1 1-1 1-1h2l1-1 1-1h1l2-1h1l1-1 1-1h2l1-1h2l1-1h1l1-1h2l1-1h4l1-1h7l1 1h1l1 1 1 1v5l-1 1v1L77 63h1v-1h1v-1l1-1v-3l-1-1-1-1H68l-1 1h-3l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1-1 1h-2l-1 1-1 1-1 1h-2l-1 1-1 1-2 1h-1l-1 1-1 1-1 1h-2l-1 1-1 1-1 1h-1l-1 1-1 1-1 1H7l-1 1-1 1H4v1H3l-1 1-1 1-1 1h-1v1h-1v1l-1 1-1 1v2h1v1h3Z",
  "m-44 90 1 1h1l1 1h2l1 1h3v1h6v-2h1v-3l1-1v-1l1-1v-1l1-1v-1h1v-1l1-1 1-1v-1l1-1h1v-1l1-1 1-1v-1l1-1 1-1 1-1h1l1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-2 1-1 1-1 2-1 1-1 2-2 1-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 2-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-2 2-1 1-1 2-1 1-1h1l2-1 1-1 2-1 1-1 1-1 2-1h1l1-1 1-1 2-1h1l1-1 1-1h1l2-1h1l1-1h1l1-1h1l1-1h2l1-1h3l1-1h9l1 1h1l1 1h1v1h1v2h1v6l-4 20v-7h-1v-1h-1v-1h-1l-1-1h-9l-1 1h-3l-1 1h-1l-1 1h-2l-2 1h-1l-1 1h-1l-1 1-1 1h-2l-1 1-1 1h-2l-1 1-1 1h-2l-1 1-1 1-2 1-1 1-2 1-1 1h-1l-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 2-1 1-1 1-2 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1-1 1-1 1-1 1v1h-1l-1 1-1 1v1l-1 1-1 1v1h-1v1h-1v2h-1v2l-1 1v3h1v1l1 1h1v1h1-5v-1h-5v-1h-2Z",
  "m-73 69 1 1 1 1 1 1 1 1h2v1h2v1h2l1 1h6l1-1h2v-1h1l1-1h1v-1h1l1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1l1-1 1-1h1l1-1 1-1 1-2 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-2 2-1 1-1 1-1 2-1 1-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 2-2 1-1 2-1 1-2 2-1 2-1 1-2 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 1-1 2-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1h1l2-1 1-1 1-1h1l1-1 1-1h1l1-1h1l1-1 1-1h1l1-1h2l1-1h1l1-1h12v1h2v1h1l1 1 1 1 1 1v1h1v2l1 1v1l3 21v-3l-1-1v-2h-1v-1h-1v-1h-1v-1h-1l-1-1h-1l-1-1h-9l-1 1h-3l-1 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1-1 1h-1l-1 1-1 1-2 1h-1l-1 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-1 2-2 1-1 1-2 2-1 1-1 1-2 1-1 2-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1v1h-1v1l-1 1-1 1v1h-1v1l-1 1-1 1v1l-1 1-1 1-1 1-1 1h-1v1h-5l-1-1h-3v-1h-2l-1-1h-1v-1h-2v-1h-1l-1-1Z",
  "M-92 39h1v1l1 1v1h1v1h1v1h1v1h2l1 1h1l1 1h9l1-1h2l1-1h1l1-1h1l1-1h1v-1h1l1-1h1l1-1h1l1-1 1-1 1-1 1-1 1-1 1-1h2l1-1 1-1 1-1 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-2 1-1 2-1 1-1 2-1 1-2 1-1 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 2-1 1-2 2-1 1-1 2-2 1-1 2-2 1-1 2-1 2-2 1-1 2-2 1-1 2-1 1-2 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-1 1-2 2-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1h1v-1h1l1-1 1-1 1-1h1v-1h1l1-1h1v-1h2v-1h2l1-1h9v1h2l1 1h1l1 1h1v1h1v1h1v1h1v1h1v1l10 19v-2l-1-1v-1h-1v-1h-1v-1h-1v-1h-1l-1-1h-1v-1h-3v-1h-8l-1 1h-2l-1 1h-1l-1 1h-2l-1 1-1 1h-1l-1 1h-1l-1 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1h-1l-2 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 2-1 1-2 1-1 1-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-1 2-2 1-1 2-2 1-1 1-2 2-2 1-1 1-2 2-1 1-2 2-1 1-2 2-2 1-1 1-2 2-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 2-1 1-1 1-2 2-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-2 1-1 1-1 2-1 1h-1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1h-1v1l-1 1h-1l-1 1-1 1h-1v1h-1l-1 1h-1v1h-2v1h-2v1h-10l-1-1h-1l-1-1h-1v-1h-1l-1-1h-1v-1h-1v-1h-1v-1l-1-1Z",
  "M-100 4v1l1 1v2h1v1h1v1l1 1h1v1h2v1h10l1-1h3l1-1h2v-1h1l1-1h2l1-1h1l1-1h1l1-1 1-1h1l1-1 2-1h1l1-1 1-1 2-1 1-1 1-1 1-1 2-1h1l2-1 1-1 1-2 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 1-1 2-1 1-2 1-1 2-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1l1-1 1-1 1-1 1-1v-1h1v-1l1-1 1-1v-1h1v-1h1v-1l1-1v-1h1v-1h1v-1l1-1 1-1h1l1-1h4v1h3l1 1h2v1h2v1h2v1h1l1 1 16 14-1-1v-1h-1v-1h-1l-1-1h-1v-1h-1l-1-1h-2v-1h-3v-1h-6l-1 1h-1l-1 1h-1l-1 1h-1v1h-1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-2 2-1 1-1 1-2 1-1 2-2 1-1 1-1 2-2 1-1 1-2 2-1 1-2 2-2 1-1 1-2 2-1 1-2 1-1 2-2 1-1 2-2 1-2 1-1 2-2 1-1 1-2 2-1 1-2 1-1 1-2 2-1 1-2 1-1 1-2 2-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-1 1-1 1h-1l-1 1-2 1h-1l-1 1-1 1h-1l-1 1h-1v1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-5v1h-2l-1-1h-4v-1h-2v-1h-1l-1-1h-1v-1l-1-1v-1h-1v-2l-1-1v-1Z",
  "M-95-32v6h1v1l1 1h1v1h11l1-1h3l1-1h2l1-1h1l2-1h1l1-1h1l1-1h2l1-1 1-1h1l2-1 1-1 1-1h2l1-1 1-1 2-1 1-1 2-1h1l2-1 1-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-2 2-1 1-1 2-1 1-1 1-1 2-1 1-1 2-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1h1l1-1 1-1v-1h1v-1l1-1h1v-2h1v-1l1-1v-2h1v-4h-1v-1h-1v-1h-1v-1h-1 4l1 1h5l1 1h1l20 7h-1l-1-1h-2v-1h-3v-1h-3l-1-1h-4v1h-1v2h-1v2l-1 1v2h-1v1l-1 1v1l-1 1-1 1v1h-1v1l-1 1v1h-1l-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 2-2 1-1 1-1 1-2 1-1 1-1 2-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 2-1 1-2 1-2 1-1 1-2 2-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1h-1l-2 1-1 1-1 1-2 1-1 1h-1l-1 1-2 1h-1l-1 1-1 1h-1l-2 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-3l-1 1h-9l-1-1h-2v-1h-1v-1l-1-1-1-1v-5Z",
  "M-77-63v1l-1 1v1h-1v4h1l1 1h10l1-1h3l1-1h2l1-1h1l1-1h2l1-1h1l2-1h1l1-1 1-1h2l1-1h1l1-1 2-1h1l1-1 2-1h1l1-1 2-1 1-1h1l2-1 1-1 1-1h2l1-1 1-1 1-1 2-1h1l1-1 1-1 2-1h1l1-1 1-1 1-1h1l1-1 1-1h1l1-1 1-1h1l1-1 1-1 1-1h1v-1l1-1h1v-1h1v-1h1v-1l1-1v-2H3v-1H0l10 1-1-1H0h6v1h2l1 1h1v4l-1 1v1l-1 1-1 1-1 1v1H5v1l-1 1H3v1l-1 1H1l-1 1-1 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 1-1 1h-2l-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1h-2l-1 1-1 1-2 1-1 1-2 1h-1l-1 1-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-1 1h-1l-2 1h-1l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-9v-1h-2v-1l-1-1v-5l1-1v-1Z",
  "M-50-86h-1v1h-1v1h-1v1h-1v2h9v-1h3l1-1h2l1-1h2l1-1h2l1-1h2l1-1h1l1-1h3l1-1h1l1-1h1l1-1h2l1-1h1l1-1h1l1-1h1l1-1h1l1-1h2v-1h2v-1h2v-1h2l1-1h1l1 1H1v1H0v1l-1 1h-1v1h-1l-1 1-1 1h-1v1h-1l-1 1h-1l-1 1h-1l-1 1h-1l-1 1-1 1h-1l-1 1-1 1h-1l-2 1h-1l-1 1-1 1h-1l-1 1-2 1h-1l-1 1h-1l-2 1-1 1h-1l-1 1h-1l-2 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-5v1h-2v-1h-3v-1h-1v-1l1-1v-1l1-1 1-1v-1h1Z",
  "m-16-99-1 1h-5v1h-2v1h-1 3l1-1h5l1-1h4l1-1h5l1-1h4-2v1h-3l-1 1h-3v1h-2l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-1l-1 1h-3l-1 1h-2l-1 1h-4v1h-8v-1h1v-1h2v-1h2v-1h1Z",
  "M0-100h-7v1h-4 2v-1h7Z",
];

/** Brand purple, from the kit. Same value as --lk-violet. */
export const BRAND_PURPLE = "#7063BE";

/** The tile behind the mark at favicon sizes.
 *
 *  The bare sphere turns to grey mush below ~32px: the stripes fall under a
 *  pixel each and average out. Rendered at 16/20/24/32/48, a white sphere on a
 *  dark tile was the only variant that kept its shape, so small placements get
 *  the tile and large ones get the bare mark. */
export const MARK_TILE_BG = "#141414";
export const MARK_ON_TILE = "#FFFFFF";
/** Tile corner radius, as a fraction of the tile's side. */
export const MARK_TILE_RADIUS_RATIO = 0.225;
/** How much of the tile the sphere occupies (the kit's app-icon proportion). */
export const MARK_TILE_INSET_RATIO = 0.17;
