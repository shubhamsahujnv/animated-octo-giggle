-- ENUMS
CREATE TYPE public.app_role AS ENUM ('employee','admin','reviewer');
CREATE TYPE public.submission_status AS ENUM ('draft','pending','approved','rejected');
CREATE TYPE public.reduction_type AS ENUM ('estimated','measured');

-- COMPANIES
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  reporting_period_start date NOT NULL DEFAULT date_trunc('year', now())::date,
  reporting_period_end date NOT NULL DEFAULT (date_trunc('year', now()) + interval '1 year - 1 day')::date,
  boundary_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  department text,
  facility text,
  data_consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ROLES
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- HELPERS
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.current_company_id()
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT company_id FROM public.profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.is_manager(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','reviewer'));
$$;

-- COMPANY / PROFILE / ROLE POLICIES
CREATE POLICY "read own company" ON public.companies FOR SELECT TO authenticated
  USING (id = public.current_company_id());
CREATE POLICY "admins update company" ON public.companies FOR UPDATE TO authenticated
  USING (id = public.current_company_id() AND public.has_role(auth.uid(),'admin'));

CREATE POLICY "read company profiles" ON public.profiles FOR SELECT TO authenticated
  USING (company_id = public.current_company_id());
CREATE POLICY "update own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "read roles in company" ON public.user_roles FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = user_roles.user_id AND p.company_id = public.current_company_id()));

-- EMISSION FACTORS
CREATE TABLE public.emission_factors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  activity_key text NOT NULL,
  label text NOT NULL,
  unit text NOT NULL,
  kg_co2e_per_unit numeric NOT NULL,
  scope text NOT NULL,
  ghg_category text NOT NULL,
  source text NOT NULL,
  geography text NOT NULL DEFAULT 'Global',
  year integer NOT NULL,
  version text NOT NULL DEFAULT 'v1',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.emission_factors TO authenticated;
GRANT ALL ON public.emission_factors TO service_role;
ALTER TABLE public.emission_factors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read factors" ON public.emission_factors FOR SELECT TO authenticated
  USING (company_id IS NULL OR company_id = public.current_company_id());
CREATE POLICY "admins manage factors" ON public.emission_factors FOR ALL TO authenticated
  USING (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'));

-- CHALLENGES
CREATE TABLE public.challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  team_based boolean NOT NULL DEFAULT false,
  points_per_unit numeric NOT NULL DEFAULT 10,
  target_value numeric,
  target_unit text,
  department text,
  facility text,
  reward text,
  active boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.challenges TO authenticated;
GRANT ALL ON public.challenges TO service_role;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read company challenges" ON public.challenges FOR SELECT TO authenticated
  USING (company_id = public.current_company_id());
CREATE POLICY "admins manage challenges" ON public.challenges FOR ALL TO authenticated
  USING (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'));

-- PARTICIPANTS
CREATE TABLE public.challenge_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  team_name text,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (challenge_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.challenge_participants TO authenticated;
GRANT ALL ON public.challenge_participants TO service_role;
ALTER TABLE public.challenge_participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read company participants" ON public.challenge_participants FOR SELECT TO authenticated
  USING (company_id = public.current_company_id());
CREATE POLICY "join challenges" ON public.challenge_participants FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND company_id = public.current_company_id());
CREATE POLICY "leave challenges" ON public.challenge_participants FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- ACTIVITY SUBMISSIONS
CREATE TABLE public.activity_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  challenge_id uuid REFERENCES public.challenges(id) ON DELETE SET NULL,
  category text NOT NULL,
  activity_date date NOT NULL,
  location text,
  frequency text NOT NULL DEFAULT 'one-off',
  occurrences numeric NOT NULL DEFAULT 1,
  baseline_mode text,
  alternative_mode text,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT 'km',
  baseline_factor_id uuid REFERENCES public.emission_factors(id),
  actual_factor_id uuid REFERENCES public.emission_factors(id),
  factor_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  baseline_kg numeric NOT NULL DEFAULT 0,
  actual_kg numeric NOT NULL DEFAULT 0,
  reduction_kg numeric NOT NULL DEFAULT 0,
  scope text NOT NULL DEFAULT 'Scope 3',
  ghg_category text NOT NULL DEFAULT 'Category 7',
  reduction_type public.reduction_type NOT NULL DEFAULT 'estimated',
  evidence_type text NOT NULL DEFAULT 'self-reported',
  evidence_path text,
  evidence_note text,
  source_system text,
  external_ref text,
  points integer NOT NULL DEFAULT 0,
  status public.submission_status NOT NULL DEFAULT 'pending',
  consent boolean NOT NULL DEFAULT false,
  reviewed_by uuid,
  reviewed_at timestamptz,
  review_note text,
  calc_version text NOT NULL DEFAULT 'calc-2026.1',
  dedupe_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, dedupe_hash)
);
CREATE INDEX activity_company_idx ON public.activity_submissions (company_id, activity_date);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.activity_submissions TO authenticated;
GRANT ALL ON public.activity_submissions TO service_role;
ALTER TABLE public.activity_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own submissions" ON public.activity_submissions FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "managers read company submissions" ON public.activity_submissions FOR SELECT TO authenticated
  USING (company_id = public.current_company_id() AND public.is_manager(auth.uid()));
CREATE POLICY "create own submissions" ON public.activity_submissions FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND company_id = public.current_company_id());
CREATE POLICY "edit own pending submissions" ON public.activity_submissions FOR UPDATE TO authenticated
  USING (user_id = auth.uid() AND status IN ('draft','pending'))
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "delete own pending submissions" ON public.activity_submissions FOR DELETE TO authenticated
  USING (user_id = auth.uid() AND status IN ('draft','pending'));
CREATE POLICY "managers review submissions" ON public.activity_submissions FOR UPDATE TO authenticated
  USING (company_id = public.current_company_id() AND public.is_manager(auth.uid()))
  WITH CHECK (company_id = public.current_company_id() AND public.is_manager(auth.uid()));

-- AUDIT LOG (append only)
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  actor_id uuid,
  actor_name text,
  entity text NOT NULL,
  entity_id uuid,
  action text NOT NULL,
  detail jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read company audit" ON public.audit_log FOR SELECT TO authenticated
  USING (company_id = public.current_company_id());
CREATE POLICY "append audit" ON public.audit_log FOR INSERT TO authenticated
  WITH CHECK (company_id = public.current_company_id() AND actor_id = auth.uid());

-- INTEGRATIONS
CREATE TABLE public.integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  system text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'disconnected',
  inbound_key text NOT NULL DEFAULT encode(gen_random_bytes(18),'hex'),
  default_category text,
  last_sync_at timestamptz,
  last_sync_rows integer NOT NULL DEFAULT 0,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.integrations TO authenticated;
GRANT ALL ON public.integrations TO service_role;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage integrations" ON public.integrations FOR ALL TO authenticated
  USING (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'))
  WITH CHECK (company_id = public.current_company_id() AND public.has_role(auth.uid(),'admin'));

-- SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  cname text := coalesce(nullif(trim(new.raw_user_meta_data->>'company_name'),''), 'My Company');
  cslug text := lower(regexp_replace(coalesce(nullif(trim(new.raw_user_meta_data->>'company_name'),''),'My Company'), '[^a-zA-Z0-9]+', '-', 'g'));
  cid uuid;
  members integer;
BEGIN
  SELECT id INTO cid FROM public.companies WHERE slug = cslug;
  IF cid IS NULL THEN
    INSERT INTO public.companies (name, slug) VALUES (cname, cslug) RETURNING id INTO cid;
  END IF;
  SELECT count(*) INTO members FROM public.profiles WHERE company_id = cid;
  INSERT INTO public.profiles (id, company_id, full_name, email, department, facility)
  VALUES (new.id, cid, coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(new.email,''),
          nullif(new.raw_user_meta_data->>'department',''), nullif(new.raw_user_meta_data->>'facility',''));
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, CASE WHEN members = 0 THEN 'admin'::public.app_role ELSE 'employee'::public.app_role END);
  RETURN new;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- GLOBAL FACTORS
INSERT INTO public.emission_factors (activity_key,label,unit,kg_co2e_per_unit,scope,ghg_category,source,geography,year,version) VALUES
('commute_car_petrol','Car (petrol, single occupancy)','km',0.1704,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_car_diesel','Car (diesel, single occupancy)','km',0.1683,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_car_ev','Car (battery electric)','km',0.0475,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_motorbike','Motorcycle','km',0.1136,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_bus','Bus','km',0.1021,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_rail','Train / metro','km',0.0354,'Scope 3','Category 7','UK DESNZ GHG conversion factors','UK/Global proxy',2025,'2025.1'),
('commute_carpool','Car share (per passenger)','km',0.0568,'Scope 3','Category 7','DESNZ car factor / 3 occupants','UK/Global proxy',2025,'2025.1'),
('commute_walk_cycle','Walk or cycle','km',0,'Scope 3','Category 7','Zero direct combustion','Global',2025,'2025.1'),
('commute_wfh_day','Working from home','day',2.5,'Scope 3','Category 7','EcoAct homeworking methodology','Global',2025,'2025.1'),
('travel_air_short','Air travel, short haul','km',0.1518,'Scope 3','Category 6','UK DESNZ business travel','Global',2025,'2025.1'),
('travel_air_long','Air travel, long haul','km',0.1479,'Scope 3','Category 6','UK DESNZ business travel','Global',2025,'2025.1'),
('travel_rail_intercity','Intercity rail','km',0.0354,'Scope 3','Category 6','UK DESNZ business travel','Global',2025,'2025.1'),
('travel_hotel_night','Hotel night','night',10.4,'Scope 3','Category 6','DESNZ hotel stay, global average','Global',2025,'2025.1'),
('travel_virtual_meeting','Virtual meeting (replaces trip)','hour',0.055,'Scope 3','Category 6','Device + network energy estimate','Global',2025,'2025.1'),
('waste_landfill_mixed','Mixed waste to landfill','kg',0.4587,'Scope 3','Category 5','UK DESNZ waste disposal','Global',2025,'2025.1'),
('waste_recycled_mixed','Mixed recycling','kg',0.0212,'Scope 3','Category 5','UK DESNZ waste disposal','Global',2025,'2025.1'),
('waste_food_landfill','Food waste to landfill','kg',0.6266,'Scope 3','Category 5','UK DESNZ waste disposal','Global',2025,'2025.1'),
('waste_food_compost','Food waste composted','kg',0.0212,'Scope 3','Category 5','UK DESNZ composting','Global',2025,'2025.1'),
('waste_food_anaerobic','Food waste to anaerobic digestion','kg',0.0084,'Scope 3','Category 5','UK DESNZ AD','Global',2025,'2025.1'),
('energy_electricity_grid','Purchased electricity (grid average)','kWh',0.4,'Scope 2','Scope 2 location-based','IEA global average grid intensity','Global',2025,'2025.1'),
('energy_natural_gas','Natural gas burned on site','kWh',0.1829,'Scope 1','Scope 1 stationary combustion','UK DESNZ fuels','Global',2025,'2025.1'),
('paper_virgin','Paper, virgin','kg',0.919,'Scope 3','Category 1','UK DESNZ material use','Global',2025,'2025.1'),
('paper_recycled','Paper, recycled content','kg',0.6968,'Scope 3','Category 1','UK DESNZ material use','Global',2025,'2025.1'),
('paper_sheet_a4','A4 sheet printed','sheet',0.0046,'Scope 3','Category 1','5 g per sheet at virgin paper factor','Global',2025,'2025.1'),
('water_supply','Water supplied','m3',0.149,'Scope 3','Category 1','UK DESNZ water supply','Global',2025,'2025.1'),
('water_treatment','Water treated','m3',0.272,'Scope 3','Category 1','UK DESNZ water treatment','Global',2025,'2025.1');