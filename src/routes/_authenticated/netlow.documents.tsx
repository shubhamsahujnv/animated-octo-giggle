import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Download, Trash2, UploadCloud } from "lucide-react";

import { isManager, useInvalidateNetlow, useMe } from "@/hooks/use-netlow";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/netlow/documents")({
  head: () => ({
    meta: pageMeta(
      "Document upload — Net-Low",
      "Upload utility bills, KPIs, goals and supply chain documents in four guided steps.",
    ),
  }),
  component: DocumentsPage,
});

function pageMeta(title: string, description: string) {
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}

export const DOC_TYPES = [
  {
    key: "utility",
    label: "Utility bills",
    help: "Electricity, gas, water and fuel invoices for every site, one file per bill or a yearly pack.",
  },
  {
    key: "kpi",
    label: "KPIs and performance data",
    help: "Production volumes, floor area, headcount, revenue: anything used to measure intensity.",
  },
  {
    key: "goals",
    label: "Goals and targets",
    help: "Board-approved targets, reduction roadmaps, net zero commitments and policies.",
  },
  {
    key: "supply-chain",
    label: "Supply chain documents",
    help: "Supplier lists, purchase and freight records, and supplier emissions statements.",
  },
  {
    key: "waste-water",
    label: "Waste and water records",
    help: "Waste manifests, recycling certificates and water meter readings.",
  },
  {
    key: "permits",
    label: "Permits and consents",
    help: "Environmental consents, licences and monitoring reports from your regulator.",
  },
  { key: "other", label: "Something else", help: "Anything that supports your numbers." },
] as const;

const MAX_BYTES = 25 * 1024 * 1024;

function prettySize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function DocumentsPage() {
  const { data: me } = useMe();
  const invalidate = useInvalidateNetlow();

  const [docType, setDocType] = useState<string>(DOC_TYPES[0].key);
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");
  const [note, setNote] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const docs = useQuery({
    enabled: !!me,
    queryKey: ["netlow", "documents", me?.profile.company_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_documents")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = useMemo(
    () => (docs.data ?? []).filter((d) => filter === "all" || d.doc_type === filter),
    [docs.data, filter],
  );

  const doneTypes = useMemo(
    () => new Set((docs.data ?? []).map((d) => d.doc_type)),
    [docs.data],
  );

  const chosen = DOC_TYPES.find((d) => d.key === docType)!;

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!me) return;
    setErr(null);
    setOk(null);
    if (files.length === 0) return setErr("Choose at least one file to upload.");
    const tooBig = files.find((f) => f.size > MAX_BYTES);
    if (tooBig) return setErr(`"${tooBig.name}" is larger than 25 MB. Split it and try again.`);

    setBusy(true);
    try {
      for (const file of files) {
        const safe = file.name.replace(/[^\w.-]/g, "_");
        const path = `${me.profile.company_id}/${docType}/${Date.now()}-${safe}`;
        const { error: upErr } = await supabase.storage
          .from("company-documents")
          .upload(path, file);
        if (upErr) throw upErr;
        const { error } = await supabase.from("company_documents").insert({
          company_id: me.profile.company_id,
          uploaded_by: me.userId,
          doc_type: docType,
          title: title.trim() || file.name,
          period_label: period.trim() || null,
          note: note.trim() || null,
          file_name: file.name,
          file_path: path,
          size_bytes: file.size,
          mime_type: file.type || null,
        });
        if (error) throw error;
      }
      setOk(`${files.length} file${files.length > 1 ? "s" : ""} uploaded and stored securely.`);
      setFiles([]);
      setTitle("");
      setNote("");
      invalidate();
      await docs.refetch();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function open(path: string) {
    const { data, error } = await supabase.storage
      .from("company-documents")
      .createSignedUrl(path, 60);
    if (error || !data) return setErr("Could not open that file.");
    window.open(data.signedUrl, "_blank", "noopener");
  }

  async function remove(id: string, path: string) {
    if (!window.confirm("Remove this document?")) return;
    await supabase.storage.from("company-documents").remove([path]);
    const { error } = await supabase.from("company_documents").delete().eq("id", id);
    if (error) return setErr(error.message);
    await docs.refetch();
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="tgs-h1">Documents</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Upload the paperwork behind your numbers. Everything stays private to{" "}
          {me?.company?.name ?? "your company"} and is used when TGS reviews your report.
        </p>
      </header>

      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: 1, t: "Pick the document type", d: "Tell us what the file is, so it lands in the right place." },
          { n: 2, t: "Add the period it covers", d: "For example FY 2025-26, or Jan 2026." },
          { n: 3, t: "Choose your files", d: "PDF, images, Excel or CSV. Up to 25 MB each, several at a time." },
          { n: 4, t: "Upload and check the list", d: "Uploaded files appear below and can be opened or removed." },
        ].map((s) => (
          <li
            key={s.n}
            className="rounded-sm border-2 border-foreground bg-card p-4 shadow-[3px_3px_0_var(--color-signal)]"
          >
            <span className="font-display text-2xl font-bold text-primary">{s.n}</span>
            <p className="mt-1 text-sm font-bold text-foreground">{s.t}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>

      <section className="rounded-sm border-2 border-foreground bg-card p-4">
        <h2 className="tgs-h2">What we still need</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {DOC_TYPES.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setDocType(d.key)}
              className={`min-h-9 rounded-sm border-2 border-foreground px-3 py-1.5 text-xs font-bold ${
                doneTypes.has(d.key)
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-signal hover:text-primary"
              }`}
            >
              {doneTypes.has(d.key) ? "✓ " : "+ "}
              {d.label}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={upload} className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <section className="rounded-sm border-2 border-foreground bg-card p-4">
            <h2 className="tgs-h2">Step 1 and 2 · Describe the document</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Document type
                </span>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="tgs-input"
                >
                  {DOC_TYPES.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Period it covers
                </span>
                <input
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="FY 2025-26"
                  className="tgs-input"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Title (optional)
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Leave blank to use the file name"
                  className="tgs-input"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Note for the reviewer (optional)
                </span>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Site, meter number, anything unusual"
                  className="tgs-input"
                />
              </label>
            </div>
            <p className="mt-3 border-l-4 border-signal bg-background px-3 py-2 text-xs text-muted-foreground">
              {chosen.help}
            </p>
          </section>

          <section className="rounded-sm border-2 border-foreground bg-card p-4">
            <h2 className="tgs-h2">Step 3 · Choose your files</h2>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
              className="mt-3 w-full text-sm text-muted-foreground file:mr-3 file:rounded-sm file:border-2 file:border-foreground file:bg-signal file:px-3 file:py-2 file:text-xs file:font-bold file:text-primary"
            />
            {files.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                {files.map((f) => (
                  <li key={f.name}>
                    {f.name} · {prettySize(f.size)}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-sm border-2 border-foreground bg-card p-4">
            <h2 className="tgs-h2">Step 4 · Upload</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              Files are stored privately for your company. Only your colleagues and the TGS
              reviewers see them.
            </p>
            {err && (
              <p className="mt-3 rounded-sm bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {err}
              </p>
            )}
            {ok && <p className="mt-3 rounded-sm bg-signal px-3 py-2 text-sm text-primary">{ok}</p>}
            <button type="submit" disabled={busy} className="tgs-btn tgs-btn-primary mt-3 w-full">
              <UploadCloud className="size-4" aria-hidden="true" />
              {busy ? "Uploading…" : "Upload documents"}
            </button>
          </div>
        </aside>
      </form>

      <section className="rounded-sm border-2 border-foreground bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="tgs-h2">Uploaded documents</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="tgs-input max-w-56"
          >
            <option value="all">All types</option>
            {DOC_TYPES.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-3">Document</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2 pr-3">Period</th>
                <th className="py-2 pr-3">Size</th>
                <th className="py-2 pr-3">Uploaded</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="py-2 pr-3">
                    <p className="font-medium text-foreground">{d.title}</p>
                    {d.note && <p className="text-xs text-muted-foreground">{d.note}</p>}
                  </td>
                  <td className="py-2 pr-3 text-xs">
                    {DOC_TYPES.find((t) => t.key === d.doc_type)?.label ?? d.doc_type}
                  </td>
                  <td className="py-2 pr-3 text-xs">{d.period_label ?? "—"}</td>
                  <td className="py-2 pr-3 text-xs">{prettySize(Number(d.size_bytes))}</td>
                  <td className="py-2 pr-3 text-xs">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => open(d.file_path)}
                        aria-label={`Open ${d.title}`}
                        className="tgs-btn tgs-btn-sm size-9 p-0"
                      >
                        <Download className="size-4" aria-hidden="true" />
                      </button>
                      {(d.uploaded_by === me?.userId || isManager(me)) && (
                        <button
                          type="button"
                          onClick={() => remove(d.id, d.file_path)}
                          aria-label={`Remove ${d.title}`}
                          className="tgs-btn tgs-btn-sm size-9 p-0"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-sm text-muted-foreground">
                    No documents yet. Start with a utility bill above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
