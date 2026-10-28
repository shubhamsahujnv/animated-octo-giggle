/* Lynkk post kit · runtime
   Fills in everything a slide repeats so a post file only holds its content.

   <section class="post" data-size="portrait" data-count="01 / 05" data-next="Swipe">
     <main class="post-body"> ...content... </main>
   </section>

   becomes: rails, ruled column, top bar (mark + Lynkk + count), the body, and
   a foot (lynkk.ai + the "next" hint). Also expands:
     <i data-icon="mic"></i>      inline Lucide icon (see ICONS below)
     <i data-mark></i>            the Lynkk sphere, in currentColor
     <img data-logo="zoom">       a platform logo from kit/assets/logos
     data-rings on a .plate       the three concentric rings behind glass
   Load it at the end of <body>: <script src="../../kit/post.js"></script> */
(() => {
  const BASE = new URL(".", document.currentScript.src).href; // .../kit/

  const MARK = "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-104 -104 208 208\" fill=\"currentColor\"><path d=\"M0 100h7l1-1h2-1v1z\"/><path d=\"M0 100h1l1-1h3l1-1h2v-1h3l1-1h1l1-1h3l1-1h2l1-1h2l1-1h2l1-1h3l1-1h3v-1h8v1h-1v1h-1l-1 1h-2v1h-1l-20 6 1-1h4v-1h3v-1h-3v1h-5l-1 1h-4l-1 1H6l-1 1z\"/><path d=\"M0 100v-2h1v-1h1v-1h1v-1h2v-1h1l1-1h1v-1l1-1h1l1-1h1l1-1h1l1-1 1-1h1l1-1h1l2-1 1-1h1l1-1 1-1h1l2-1h1l1-1 1-1h1l2-1h1l1-1 1-1h2l1-1h1l1-1h1l2-1h1l1-1h1l1-1h1l1-1h2l1-1h2l1-1h3l1-1h10v1h1v2h-1v1l-1 1v1h-1v1h-1L50 87l1-1h1v-1h1v-1h1l1-1v-2h-8l-1 1h-3l-1 1h-2l-1 1h-2l-1 1h-2l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-3l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-1l-1 1H8l-1 1H5v1H3v1H1z\"/><path d=\"M-10 100H0h-6l-1-1h-2v-1l-1-1v-3h1v-1l1-1v-1l1-1 1-1 1-1v-1h1l1-1 1-1v-1h1l1-1 1-1 1-1 1-1h1l1-1 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1h1l2-1 1-1 1-1 2-1 1-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 1-1 2-1 1-1h2l1-1 2-1 1-1 1-1 2-1h1l2-1 1-1 1-1h2l1-1 1-1h1l2-1h1l1-1 1-1h2l1-1h2l1-1h1l1-1h2l1-1h4l1-1h7l1 1h1l1 1 1 1v5l-1 1v1L77 63h1v-1h1v-1l1-1v-3l-1-1-1-1H68l-1 1h-3l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1-1 1h-2l-1 1-1 1-1 1h-2l-1 1-1 1-2 1h-1l-1 1-1 1-1 1h-2l-1 1-1 1-1 1h-1l-1 1-1 1-1 1H7l-1 1-1 1H4v1H3l-1 1-1 1-1 1h-1v1h-1v1l-1 1-1 1v2h1v1h3Z\"/><path d=\"m-44 90 1 1h1l1 1h2l1 1h3v1h6v-2h1v-3l1-1v-1l1-1v-1l1-1v-1h1v-1l1-1 1-1v-1l1-1h1v-1l1-1 1-1v-1l1-1 1-1 1-1h1l1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-2 1-1 1-1 2-1 1-1 2-2 1-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 2-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-2 2-1 1-1 2-1 1-1h1l2-1 1-1 2-1 1-1 1-1 2-1h1l1-1 1-1 2-1h1l1-1 1-1h1l2-1h1l1-1h1l1-1h1l1-1h2l1-1h3l1-1h9l1 1h1l1 1h1v1h1v2h1v6l-4 20v-7h-1v-1h-1v-1h-1l-1-1h-9l-1 1h-3l-1 1h-1l-1 1h-2l-2 1h-1l-1 1h-1l-1 1-1 1h-2l-1 1-1 1h-2l-1 1-1 1h-2l-1 1-1 1-2 1-1 1-2 1-1 1h-1l-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 2-1 1-1 1-2 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1-1 1-1 1-1 1v1h-1l-1 1-1 1v1l-1 1-1 1v1h-1v1h-1v2h-1v2l-1 1v3h1v1l1 1h1v1h1-5v-1h-5v-1h-2Z\"/><path d=\"m-73 69 1 1 1 1 1 1 1 1h2v1h2v1h2l1 1h6l1-1h2v-1h1l1-1h1v-1h1l1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1l1-1 1-1h1l1-1 1-1 1-2 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-2 2-1 1-1 1-1 2-1 1-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 2-2 1-1 2-1 1-2 2-1 2-1 1-2 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 1-1 2-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1h1l2-1 1-1 1-1h1l1-1 1-1h1l1-1h1l1-1 1-1h1l1-1h2l1-1h1l1-1h12v1h2v1h1l1 1 1 1 1 1v1h1v2l1 1v1l3 21v-3l-1-1v-2h-1v-1h-1v-1h-1v-1h-1l-1-1h-1l-1-1h-9l-1 1h-3l-1 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1-1 1h-1l-1 1-1 1-2 1h-1l-1 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-1 2-2 1-1 1-2 2-1 1-1 1-2 1-1 2-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1v1h-1v1l-1 1-1 1v1h-1v1l-1 1-1 1v1l-1 1-1 1-1 1-1 1h-1v1h-5l-1-1h-3v-1h-2l-1-1h-1v-1h-2v-1h-1l-1-1Z\"/><path d=\"M-92 39h1v1l1 1v1h1v1h1v1h1v1h2l1 1h1l1 1h9l1-1h2l1-1h1l1-1h1l1-1h1v-1h1l1-1h1l1-1h1l1-1 1-1 1-1 1-1 1-1 1-1h2l1-1 1-1 1-1 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-2 1-1 2-1 1-1 2-1 1-2 1-1 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 2-1 1-2 2-1 1-1 2-2 1-1 2-2 1-1 2-1 2-2 1-1 2-2 1-1 2-1 1-2 2-1 1-2 2-1 1-1 2-2 1-1 2-1 1-1 1-2 2-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1h1v-1h1l1-1 1-1 1-1h1v-1h1l1-1h1v-1h2v-1h2l1-1h9v1h2l1 1h1l1 1h1v1h1v1h1v1h1v1h1v1l10 19v-2l-1-1v-1h-1v-1h-1v-1h-1v-1h-1l-1-1h-1v-1h-3v-1h-8l-1 1h-2l-1 1h-1l-1 1h-2l-1 1-1 1h-1l-1 1h-1l-1 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1h-1l-2 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 2-1 1-2 1-1 1-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 1-1 2-2 1-1 2-2 1-1 1-2 2-2 1-1 1-2 2-1 1-2 2-1 1-2 2-2 1-1 1-2 2-1 1-2 2-1 1-2 1-1 2-2 1-1 1-2 2-1 1-1 1-2 2-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-2 1-1 1-1 2-1 1h-1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1h-1v1l-1 1h-1l-1 1-1 1h-1v1h-1l-1 1h-1v1h-2v1h-2v1h-10l-1-1h-1l-1-1h-1v-1h-1l-1-1h-1v-1h-1v-1h-1v-1l-1-1Z\"/><path d=\"M-100 4v1l1 1v2h1v1h1v1l1 1h1v1h2v1h10l1-1h3l1-1h2v-1h1l1-1h2l1-1h1l1-1h1l1-1 1-1h1l1-1 2-1h1l1-1 1-1 2-1 1-1 1-1 1-1 2-1h1l2-1 1-1 1-2 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-1 2-2 2-1 1-1 2-2 1-1 2-1 1-1 2-2 1-1 2-1 1-2 2-1 1-1 2-2 1-1 1-1 2-1 1-2 1-1 2-1 1-1 1-1 2-2 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1l1-1 1-1 1-1 1-1v-1h1v-1l1-1 1-1v-1h1v-1h1v-1l1-1v-1h1v-1h1v-1l1-1 1-1h1l1-1h4v1h3l1 1h2v1h2v1h2v1h1l1 1 16 14-1-1v-1h-1v-1h-1l-1-1h-1v-1h-1l-1-1h-2v-1h-3v-1h-6l-1 1h-1l-1 1h-1l-1 1h-1v1h-1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1h-1l-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 2-2 1-1 1-1 1-2 2-1 1-1 1-2 1-1 2-2 1-1 1-1 2-2 1-1 1-2 2-1 1-2 2-2 1-1 1-2 2-1 1-2 1-1 2-2 1-1 2-2 1-2 1-1 2-2 1-1 1-2 2-1 1-2 1-1 1-2 2-1 1-2 1-1 1-2 2-1 1-2 1-1 1-1 1-2 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-1 1-1 1h-1l-1 1-2 1h-1l-1 1-1 1h-1l-1 1h-1v1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-5v1h-2l-1-1h-4v-1h-2v-1h-1l-1-1h-1v-1l-1-1v-1h-1v-2l-1-1v-1Z\"/><path d=\"M-95-32v6h1v1l1 1h1v1h11l1-1h3l1-1h2l1-1h1l2-1h1l1-1h1l1-1h2l1-1 1-1h1l2-1 1-1 1-1h2l1-1 1-1 2-1 1-1 2-1h1l2-1 1-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-1 2-1 1-2 2-1 1-1 2-1 1-1 1-1 2-1 1-1 2-1 1-1 1-1 2-1 1-1 1-1 1-1 2-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1v-1h1l1-1 1-1v-1h1v-1l1-1h1v-2h1v-1l1-1v-2h1v-4h-1v-1h-1v-1h-1v-1h-1 4l1 1h5l1 1h1l20 7h-1l-1-1h-2v-1h-3v-1h-3l-1-1h-4v1h-1v2h-1v2l-1 1v2h-1v1l-1 1v1l-1 1-1 1v1h-1v1l-1 1v1h-1l-1 1-1 1v1l-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 2-2 1-1 1-1 1-2 1-1 1-1 2-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 2-1 1-2 1-2 1-1 1-2 2-1 1-2 1-1 1-2 1-1 1-2 1-1 2-2 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1h-1l-2 1-1 1-1 1-2 1-1 1h-1l-1 1-2 1h-1l-1 1-1 1h-1l-2 1h-1l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-3l-1 1h-9l-1-1h-2v-1h-1v-1l-1-1-1-1v-5Z\"/><path d=\"M-77-63v1l-1 1v1h-1v4h1l1 1h10l1-1h3l1-1h2l1-1h1l1-1h2l1-1h1l2-1h1l1-1 1-1h2l1-1h1l1-1 2-1h1l1-1 2-1h1l1-1 2-1 1-1h1l2-1 1-1 1-1h2l1-1 1-1 1-1 2-1h1l1-1 1-1 2-1h1l1-1 1-1 1-1h1l1-1 1-1h1l1-1 1-1h1l1-1 1-1 1-1h1v-1l1-1h1v-1h1v-1h1v-1l1-1v-2H3v-1H0l10 1-1-1H0h6v1h2l1 1h1v4l-1 1v1l-1 1-1 1-1 1v1H5v1l-1 1H3v1l-1 1H1l-1 1-1 1-1 1-1 1-1 1h-1l-1 1-1 1-1 1-1 1-1 1-2 1-1 1-1 1-1 1-2 1-1 1-1 1h-2l-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1-1 1-2 1-1 1-2 1-1 1h-2l-1 1-1 1-2 1-1 1-2 1h-1l-1 1-2 1-1 1h-1l-2 1-1 1h-1l-2 1-1 1h-1l-1 1h-1l-2 1h-1l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-9v-1h-2v-1l-1-1v-5l1-1v-1Z\"/><path d=\"M-50-86h-1v1h-1v1h-1v1h-1v2h9v-1h3l1-1h2l1-1h2l1-1h2l1-1h2l1-1h1l1-1h3l1-1h1l1-1h1l1-1h2l1-1h1l1-1h1l1-1h1l1-1h1l1-1h2v-1h2v-1h2v-1h2l1-1h1l1 1H1v1H0v1l-1 1h-1v1h-1l-1 1-1 1h-1v1h-1l-1 1h-1l-1 1h-1l-1 1h-1l-1 1-1 1h-1l-1 1-1 1h-1l-2 1h-1l-1 1-1 1h-1l-1 1-2 1h-1l-1 1h-1l-2 1-1 1h-1l-1 1h-1l-2 1h-1l-1 1h-1l-1 1h-2l-1 1h-1l-1 1h-1l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-5v1h-2v-1h-3v-1h-1v-1l1-1v-1l1-1 1-1v-1h1Z\"/><path d=\"m-16-99-1 1h-5v1h-2v1h-1 3l1-1h5l1-1h4l1-1h5l1-1h4-2v1h-3l-1 1h-3v1h-2l-1 1h-2l-1 1h-2l-1 1h-3l-1 1h-1l-1 1h-3l-1 1h-2l-1 1h-4v1h-8v-1h1v-1h2v-1h2v-1h1Z\"/><path d=\"M0-100h-7v1h-4 2v-1h7Z\"/></svg>";

  const ICONS = {
    "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/>',
    "audio-lines": '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    "list-checks": '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    "shield-check": '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    "message-square": '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    play: '<path d="M6 3 20 12 6 21Z"/>',
    laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>',
    video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    keyboard: '<path d="M10 8h.01"/><path d="M12 12h.01"/><path d="M14 8h.01"/><path d="M16 12h.01"/><path d="M18 8h.01"/><path d="M6 8h.01"/><path d="M7 16h10"/><path d="M8 12h.01"/><rect width="20" height="16" x="2" y="4" rx="2"/>',
  };

  const svg = (inner, attrs = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${attrs}>${inner}</svg>`;

  for (const post of document.querySelectorAll("section.post")) {
    post.classList.add("gr");
    if (!post.dataset.band) post.dataset.band = "night";
    const body = post.querySelector(":scope > .post-body");
    if (!body) { console.warn(`#${post.id}: a .post needs a <main class="post-body">`); continue; }

    const count = post.dataset.count ?? "";
    const [now, total] = count.split("/").map((s) => s.trim());
    const next = post.dataset.next ?? "";
    const site = post.dataset.site ?? "lynkk.ai";

    const col = document.createElement("div");
    col.className = "post-col";
    col.innerHTML =
      `<header class="post-top"><span class="brand"><i data-mark></i>Lynkk</span>` +
      (count ? `<span class="count"><b>${now}</b>${total ? ` / ${total}` : ""}</span>` : "") +
      `</header>`;
    col.append(body);
    const foot = document.createElement("footer");
    foot.className = "post-foot";
    foot.innerHTML = `<span class="ink-2">${site}</span>` + (next ? `<span class="next">${next} <i data-icon="arrow-right"></i></span>` : "");
    col.append(foot);

    const rail = () => Object.assign(document.createElement("div"), { className: "post-rail" });
    post.replaceChildren(rail(), col, rail());
  }

  for (const el of document.querySelectorAll("[data-rings]")) {
    const r = document.createElement("div");
    r.className = "gr-rings";
    r.innerHTML = "<i></i><i></i><i></i>";
    el.prepend(r);
  }
  for (const el of document.querySelectorAll("i[data-mark]")) el.innerHTML = MARK;
  for (const el of document.querySelectorAll("i[data-icon]")) {
    const name = el.dataset.icon;
    if (!ICONS[name]) { console.warn(`unknown icon "${name}". Known: ${Object.keys(ICONS).join(", ")}`); continue; }
    el.innerHTML = svg(ICONS[name]);
  }
  for (const img of document.querySelectorAll("img[data-logo]")) {
    img.src = `${BASE}assets/logos/${img.dataset.logo}.svg`;
    if (!img.alt) img.alt = img.dataset.logo;
  }

  window.__LYNKK_ICONS__ = Object.keys(ICONS);
  document.documentElement.dataset.ready = "1";
})();
