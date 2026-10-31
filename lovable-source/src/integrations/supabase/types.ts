export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_submissions: {
        Row: {
          activity_date: string
          actual_factor_id: string | null
          actual_kg: number
          alternative_mode: string | null
          baseline_factor_id: string | null
          baseline_kg: number
          baseline_mode: string | null
          calc_version: string
          category: string
          challenge_id: string | null
          company_id: string
          consent: boolean
          created_at: string
          dedupe_hash: string
          evidence_note: string | null
          evidence_path: string | null
          evidence_type: string
          external_ref: string | null
          factor_snapshot: Json
          frequency: string
          ghg_category: string
          id: string
          location: string | null
          occurrences: number
          points: number
          quantity: number
          reduction_kg: number
          reduction_type: Database["public"]["Enums"]["reduction_type"]
          review_note: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scope: string
          source_system: string | null
          status: Database["public"]["Enums"]["submission_status"]
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_date: string
          actual_factor_id?: string | null
          actual_kg?: number
          alternative_mode?: string | null
          baseline_factor_id?: string | null
          baseline_kg?: number
          baseline_mode?: string | null
          calc_version?: string
          category: string
          challenge_id?: string | null
          company_id: string
          consent?: boolean
          created_at?: string
          dedupe_hash: string
          evidence_note?: string | null
          evidence_path?: string | null
          evidence_type?: string
          external_ref?: string | null
          factor_snapshot?: Json
          frequency?: string
          ghg_category?: string
          id?: string
          location?: string | null
          occurrences?: number
          points?: number
          quantity?: number
          reduction_kg?: number
          reduction_type?: Database["public"]["Enums"]["reduction_type"]
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scope?: string
          source_system?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          unit?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          actual_factor_id?: string | null
          actual_kg?: number
          alternative_mode?: string | null
          baseline_factor_id?: string | null
          baseline_kg?: number
          baseline_mode?: string | null
          calc_version?: string
          category?: string
          challenge_id?: string | null
          company_id?: string
          consent?: boolean
          created_at?: string
          dedupe_hash?: string
          evidence_note?: string | null
          evidence_path?: string | null
          evidence_type?: string
          external_ref?: string | null
          factor_snapshot?: Json
          frequency?: string
          ghg_category?: string
          id?: string
          location?: string | null
          occurrences?: number
          points?: number
          quantity?: number
          reduction_kg?: number
          reduction_type?: Database["public"]["Enums"]["reduction_type"]
          review_note?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scope?: string
          source_system?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_submissions_actual_factor_id_fkey"
            columns: ["actual_factor_id"]
            isOneToOne: false
            referencedRelation: "emission_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_submissions_baseline_factor_id_fkey"
            columns: ["baseline_factor_id"]
            isOneToOne: false
            referencedRelation: "emission_factors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_submissions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_submissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          company_id: string
          created_at: string
          detail: Json
          entity: string
          entity_id: string | null
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          company_id: string
          created_at?: string
          detail?: Json
          entity: string
          entity_id?: string | null
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          company_id?: string
          created_at?: string
          detail?: Json
          entity?: string
          entity_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_participants: {
        Row: {
          challenge_id: string
          company_id: string
          id: string
          joined_at: string
          team_name: string | null
          user_id: string
        }
        Insert: {
          challenge_id: string
          company_id: string
          id?: string
          joined_at?: string
          team_name?: string | null
          user_id: string
        }
        Update: {
          challenge_id?: string
          company_id?: string
          id?: string
          joined_at?: string
          team_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_participants_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "challenge_participants_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          active: boolean
          category: string
          company_id: string
          created_at: string
          created_by: string
          department: string | null
          description: string | null
          end_date: string
          facility: string | null
          id: string
          points_per_unit: number
          reward: string | null
          start_date: string
          target_unit: string | null
          target_value: number | null
          team_based: boolean
          title: string
        }
        Insert: {
          active?: boolean
          category: string
          company_id: string
          created_at?: string
          created_by: string
          department?: string | null
          description?: string | null
          end_date: string
          facility?: string | null
          id?: string
          points_per_unit?: number
          reward?: string | null
          start_date: string
          target_unit?: string | null
          target_value?: number | null
          team_based?: boolean
          title: string
        }
        Update: {
          active?: boolean
          category?: string
          company_id?: string
          created_at?: string
          created_by?: string
          department?: string | null
          description?: string | null
          end_date?: string
          facility?: string | null
          id?: string
          points_per_unit?: number
          reward?: string | null
          start_date?: string
          target_unit?: string | null
          target_value?: number | null
          team_based?: boolean
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenges_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          boundary_note: string | null
          created_at: string
          id: string
          name: string
          reporting_period_end: string
          reporting_period_start: string
          slug: string
        }
        Insert: {
          boundary_note?: string | null
          created_at?: string
          id?: string
          name: string
          reporting_period_end?: string
          reporting_period_start?: string
          slug: string
        }
        Update: {
          boundary_note?: string | null
          created_at?: string
          id?: string
          name?: string
          reporting_period_end?: string
          reporting_period_start?: string
          slug?: string
        }
        Relationships: []
      }
      company_documents: {
        Row: {
          company_id: string
          created_at: string
          doc_type: string
          file_name: string
          file_path: string
          id: string
          mime_type: string | null
          note: string | null
          period_label: string | null
          size_bytes: number
          title: string
          uploaded_by: string
        }
        Insert: {
          company_id: string
          created_at?: string
          doc_type: string
          file_name: string
          file_path: string
          id?: string
          mime_type?: string | null
          note?: string | null
          period_label?: string | null
          size_bytes?: number
          title: string
          uploaded_by: string
        }
        Update: {
          company_id?: string
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          mime_type?: string | null
          note?: string | null
          period_label?: string | null
          size_bytes?: number
          title?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      emission_factors: {
        Row: {
          active: boolean
          activity_key: string
          company_id: string | null
          created_at: string
          geography: string
          ghg_category: string
          id: string
          kg_co2e_per_unit: number
          label: string
          scope: string
          source: string
          unit: string
          version: string
          year: number
        }
        Insert: {
          active?: boolean
          activity_key: string
          company_id?: string | null
          created_at?: string
          geography?: string
          ghg_category: string
          id?: string
          kg_co2e_per_unit: number
          label: string
          scope: string
          source: string
          unit: string
          version?: string
          year: number
        }
        Update: {
          active?: boolean
          activity_key?: string
          company_id?: string | null
          created_at?: string
          geography?: string
          ghg_category?: string
          id?: string
          kg_co2e_per_unit?: number
          label?: string
          scope?: string
          source?: string
          unit?: string
          version?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "emission_factors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          company_id: string
          config: Json
          created_at: string
          default_category: string | null
          id: string
          inbound_key: string
          last_sync_at: string | null
          last_sync_rows: number
          name: string
          status: string
          system: string
        }
        Insert: {
          company_id: string
          config?: Json
          created_at?: string
          default_category?: string | null
          id?: string
          inbound_key?: string
          last_sync_at?: string | null
          last_sync_rows?: number
          name: string
          status?: string
          system: string
        }
        Update: {
          company_id?: string
          config?: Json
          created_at?: string
          default_category?: string | null
          id?: string
          inbound_key?: string
          last_sync_at?: string | null
          last_sync_rows?: number
          name?: string
          status?: string
          system?: string
        }
        Relationships: [
          {
            foreignKeyName: "integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_id: string
          created_at: string
          data_consent: boolean
          department: string | null
          email: string
          facility: string | null
          full_name: string
          id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          data_consent?: boolean
          department?: string | null
          email?: string
          facility?: string | null
          full_name?: string
          id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          data_consent?: boolean
          department?: string | null
          email?: string
          facility?: string | null
          full_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      app_role: "employee" | "admin" | "reviewer"
      reduction_type: "estimated" | "measured"
      submission_status: "draft" | "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["employee", "admin", "reviewer"],
      reduction_type: ["estimated", "measured"],
      submission_status: ["draft", "pending", "approved", "rejected"],
    },
  },
} as const
