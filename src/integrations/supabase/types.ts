export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
<<<<<<< HEAD
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          role: "admin" | "owner" | "agent" | "agency" | "user"
          created_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          phone?: string | null
          role?: "admin" | "owner" | "agent" | "agency" | "user"
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          role?: "admin" | "owner" | "agent" | "agency" | "user"
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      properties: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          price: number
          type: "sale" | "rent"
          property_type: "house" | "apartment" | "commercial" | "land"
          city: string
          neighborhood: string
          bedrooms: number | null
          bathrooms: number | null
          parking_spaces: number | null
          size: number | null
          status: "free" | "active" | "premium" | "expired"
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          price: number
          type: "sale" | "rent"
          property_type: "house" | "apartment" | "commercial" | "land"
          city: string
          neighborhood: string
          bedrooms?: number | null
          bathrooms?: number | null
          parking_spaces?: number | null
          size?: number | null
          status?: "free" | "active" | "premium" | "expired"
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          price?: number
          type?: "sale" | "rent"
          property_type?: "house" | "apartment" | "commercial" | "land"
          city?: string
          neighborhood?: string
          bedrooms?: number | null
          bathrooms?: number | null
          parking_spaces?: number | null
          size?: number | null
          status?: "free" | "active" | "premium" | "expired"
          expires_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          position: number
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          position?: number
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          position?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_images_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          id: string
          property_id: string
          owner_id: string
          interested_user_id: string
          status: "locked" | "unlocked"
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          owner_id: string
          interested_user_id: string
          status?: "locked" | "unlocked"
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          owner_id?: string
          interested_user_id?: string
          status?: "locked" | "unlocked"
          created_at?: string
        }
        Relationships: []
      }
=======
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      favorites: {
        Row: {
          created_at: string
          id: string
          property_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          property_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          property_id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
<<<<<<< HEAD
          user_type: "owner" | "agent" | "seeker"
=======
          user_type: Database["public"]["Enums"]["user_type"]
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
<<<<<<< HEAD
          user_type?: "owner" | "agent" | "seeker"
=======
          user_type?: Database["public"]["Enums"]["user_type"]
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
<<<<<<< HEAD
          user_type?: "owner" | "agent" | "seeker"
        }
        Relationships: []
      }
      plans: {
        Row: {
          id: string
          name: string
          price: number
          type: "individual" | "premium"
          duration_days: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          type: "individual" | "premium"
          duration_days: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          type?: "individual" | "premium"
          duration_days?: number
          created_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: "active" | "expired" | "canceled"
          start_date: string
          end_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status?: "active" | "expired" | "canceled"
          start_date?: string
          end_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: "active" | "expired" | "canceled"
          start_date?: string
          end_date?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: "plan" | "lead" | "property"
          status: "pending" | "completed" | "failed"
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: "plan" | "lead" | "property"
          status?: "pending" | "completed" | "failed"
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: "plan" | "lead" | "property"
          status?: "pending" | "completed" | "failed"
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
=======
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
<<<<<<< HEAD
      user_role: "admin" | "owner" | "agent" | "agency" | "user"
=======
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
      user_type: "owner" | "agent" | "seeker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
<<<<<<< HEAD
=======

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      user_type: ["owner", "agent", "seeker"],
    },
  },
} as const
>>>>>>> 0f81bcce03a9fb9ad95633cd4a8d643a5cca32b3
