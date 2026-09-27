
-- 1) Private schema for helper functions so they are no longer callable via the Data API
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated;

ALTER FUNCTION public.has_role(uuid, public.app_role) SET SCHEMA private;
ALTER FUNCTION public.is_manager(uuid) SET SCHEMA private;
ALTER FUNCTION public.current_company_id() SET SCHEMA private;
ALTER FUNCTION public.handle_new_user() SET SCHEMA private;

-- Keep EXECUTE for authenticated (RLS policies evaluate as the querying user), remove blanket grants
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION private.is_manager(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION private.current_company_id() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION private.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_manager(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION private.current_company_id() TO authenticated;

-- 2) Managers can delete evidence files belonging to members of their own company
CREATE POLICY "evidence delete managers" ON storage.objects
FOR DELETE TO authenticated
USING (
  bucket_id = 'evidence'
  AND private.is_manager(auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id::text = (storage.foldername(objects.name))[1]
      AND p.company_id = private.current_company_id()
  )
);

-- 3) Admins can manage roles for users in their own company (client-safe path, RLS enforced)
CREATE POLICY "admins add roles in company" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (
  private.has_role(auth.uid(), 'admin')
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = user_roles.user_id
      AND p.company_id = private.current_company_id()
  )
);

CREATE POLICY "admins remove roles in company" ON public.user_roles
FOR DELETE TO authenticated
USING (
  private.has_role(auth.uid(), 'admin')
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = user_roles.user_id
      AND p.company_id = private.current_company_id()
  )
);
