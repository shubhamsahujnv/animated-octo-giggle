CREATE POLICY "evidence upload own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "evidence read own" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "evidence read managers" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'evidence' AND public.is_manager(auth.uid()) AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id::text = (storage.foldername(storage.objects.name))[1]
      AND p.company_id = public.current_company_id()));
CREATE POLICY "evidence delete own" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);