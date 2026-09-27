CREATE TABLE public.company_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  uploaded_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  doc_type text NOT NULL,
  title text NOT NULL,
  period_label text,
  note text,
  file_name text NOT NULL,
  file_path text NOT NULL,
  size_bytes bigint NOT NULL DEFAULT 0,
  mime_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX company_documents_company_idx ON public.company_documents (company_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_documents TO authenticated;
GRANT ALL ON public.company_documents TO service_role;

ALTER TABLE public.company_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents read own company" ON public.company_documents
FOR SELECT TO authenticated
USING (company_id = private.current_company_id());

CREATE POLICY "documents insert own company" ON public.company_documents
FOR INSERT TO authenticated
WITH CHECK (company_id = private.current_company_id() AND uploaded_by = auth.uid());

CREATE POLICY "documents delete own or manager" ON public.company_documents
FOR DELETE TO authenticated
USING (
  company_id = private.current_company_id()
  AND (uploaded_by = auth.uid() OR private.is_manager(auth.uid()))
);

CREATE POLICY "company documents upload" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = private.current_company_id()::text
);

CREATE POLICY "company documents read" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = private.current_company_id()::text
);

CREATE POLICY "company documents delete" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'company-documents'
  AND (storage.foldername(name))[1] = private.current_company_id()::text
);