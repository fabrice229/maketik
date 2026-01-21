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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      campaign_applications: {
        Row: {
          campaign_id: string
          created_at: string
          creator_id: string
          id: string
          message: string | null
          proposed_price: number | null
          status: string | null
          tiktok_video_url: string | null
          updated_at: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          creator_id: string
          id?: string
          message?: string | null
          proposed_price?: number | null
          status?: string | null
          tiktok_video_url?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          creator_id?: string
          id?: string
          message?: string | null
          proposed_price?: number | null
          status?: string | null
          tiktok_video_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_applications_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          budget: number
          created_at: string
          currency: string | null
          deadline: string | null
          description: string | null
          id: string
          product_category: string | null
          product_image_url: string | null
          product_name: string
          requirements: string | null
          seller_id: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget: number
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          product_category?: string | null
          product_image_url?: string | null
          product_name: string
          requirements?: string | null
          seller_id: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number
          created_at?: string
          currency?: string | null
          deadline?: string | null
          description?: string | null
          id?: string
          product_category?: string | null
          product_image_url?: string | null
          product_name?: string
          requirements?: string | null
          seller_id?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          application_id: string | null
          campaign_id: string | null
          created_at: string
          creator_id: string
          current_price: number
          id: string
          seller_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          application_id?: string | null
          campaign_id?: string | null
          created_at?: string
          creator_id: string
          current_price?: number
          id?: string
          seller_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          application_id?: string | null
          campaign_id?: string | null
          created_at?: string
          creator_id?: string
          current_price?: number
          id?: string
          seller_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "campaign_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string | null
          price_change: number | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          price_change?: number | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string | null
          price_change?: number | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          base_price: number | null
          bio: string | null
          company_name: string | null
          company_type: string | null
          country: string | null
          created_at: string
          facebook_followers: number | null
          facebook_username: string | null
          full_name: string | null
          id: string
          instagram_followers: number | null
          instagram_username: string | null
          is_verified: boolean | null
          missions_completed: number | null
          missions_won: number | null
          phone: string | null
          rating_avg: number | null
          rating_count: number | null
          tiktok_avg_views: number | null
          tiktok_followers: number | null
          tiktok_username: string | null
          total_earned: number | null
          total_spent: number | null
          twitter_followers: number | null
          twitter_username: string | null
          updated_at: string
          user_id: string
          youtube_subscribers: number | null
          youtube_username: string | null
        }
        Insert: {
          avatar_url?: string | null
          base_price?: number | null
          bio?: string | null
          company_name?: string | null
          company_type?: string | null
          country?: string | null
          created_at?: string
          facebook_followers?: number | null
          facebook_username?: string | null
          full_name?: string | null
          id?: string
          instagram_followers?: number | null
          instagram_username?: string | null
          is_verified?: boolean | null
          missions_completed?: number | null
          missions_won?: number | null
          phone?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          tiktok_avg_views?: number | null
          tiktok_followers?: number | null
          tiktok_username?: string | null
          total_earned?: number | null
          total_spent?: number | null
          twitter_followers?: number | null
          twitter_username?: string | null
          updated_at?: string
          user_id: string
          youtube_subscribers?: number | null
          youtube_username?: string | null
        }
        Update: {
          avatar_url?: string | null
          base_price?: number | null
          bio?: string | null
          company_name?: string | null
          company_type?: string | null
          country?: string | null
          created_at?: string
          facebook_followers?: number | null
          facebook_username?: string | null
          full_name?: string | null
          id?: string
          instagram_followers?: number | null
          instagram_username?: string | null
          is_verified?: boolean | null
          missions_completed?: number | null
          missions_won?: number | null
          phone?: string | null
          rating_avg?: number | null
          rating_count?: number | null
          tiktok_avg_views?: number | null
          tiktok_followers?: number | null
          tiktok_username?: string | null
          total_earned?: number | null
          total_spent?: number | null
          twitter_followers?: number | null
          twitter_username?: string | null
          updated_at?: string
          user_id?: string
          youtube_subscribers?: number | null
          youtube_username?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          campaign_id: string
          comment: string | null
          created_at: string
          from_user_id: string
          id: string
          rating: number
          to_user_id: string
        }
        Insert: {
          campaign_id: string
          comment?: string | null
          created_at?: string
          from_user_id: string
          id?: string
          rating: number
          to_user_id: string
        }
        Update: {
          campaign_id?: string
          comment?: string | null
          created_at?: string
          from_user_id?: string
          id?: string
          rating?: number
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          application_id: string | null
          campaign_id: string | null
          created_at: string
          description: string | null
          fee_amount: number | null
          fee_percentage: number | null
          from_user_id: string
          id: string
          status: string | null
          to_user_id: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          application_id?: string | null
          campaign_id?: string | null
          created_at?: string
          description?: string | null
          fee_amount?: number | null
          fee_percentage?: number | null
          from_user_id: string
          id?: string
          status?: string | null
          to_user_id?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          application_id?: string | null
          campaign_id?: string | null
          created_at?: string
          description?: string | null
          fee_amount?: number | null
          fee_percentage?: number | null
          from_user_id?: string
          id?: string
          status?: string | null
          to_user_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "campaign_applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
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
      wallets: {
        Row: {
          available_balance: number | null
          created_at: string
          currency: string | null
          id: string
          locked_balance: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          locked_balance?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          locked_balance?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_senior_creator: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "seller" | "creator"
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
      app_role: ["seller", "creator"],
    },
  },
} as const
