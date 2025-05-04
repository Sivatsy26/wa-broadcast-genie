export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bot_flows: {
        Row: {
          created_at: string
          flow_data: Json
          id: string
          keywords: string[] | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          flow_data?: Json
          id?: string
          keywords?: string[] | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          flow_data?: Json
          id?: string
          keywords?: string[] | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chatbot_conversations: {
        Row: {
          channel: string
          chatbot_id: string
          id: string
          last_message_at: string
          messages: Json[]
          metadata: Json
          session_id: string
          started_at: string
        }
        Insert: {
          channel: string
          chatbot_id: string
          id?: string
          last_message_at?: string
          messages?: Json[]
          metadata?: Json
          session_id: string
          started_at?: string
        }
        Update: {
          channel?: string
          chatbot_id?: string
          id?: string
          last_message_at?: string
          messages?: Json[]
          metadata?: Json
          session_id?: string
          started_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_conversations_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_responses: {
        Row: {
          chatbot_id: string
          created_at: string
          id: string
          response: string
          trigger: string
          updated_at: string
        }
        Insert: {
          chatbot_id: string
          created_at?: string
          id?: string
          response: string
          trigger: string
          updated_at?: string
        }
        Update: {
          chatbot_id?: string
          created_at?: string
          id?: string
          response?: string
          trigger?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_responses_chatbot_id_fkey"
            columns: ["chatbot_id"]
            isOneToOne: false
            referencedRelation: "chatbots"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbots: {
        Row: {
          ai_model: string | null
          business_days: string[] | null
          business_hours: boolean | null
          business_hours_end: string | null
          business_hours_start: string | null
          channels: string[]
          created_at: string
          id: string
          max_tokens: number | null
          name: string
          primary_color: string
          show_avatar: boolean
          status: string
          system_prompt: string | null
          temperature: number | null
          type: string
          updated_at: string
          user_id: string
          welcome_message: string
        }
        Insert: {
          ai_model?: string | null
          business_days?: string[] | null
          business_hours?: boolean | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          channels?: string[]
          created_at?: string
          id?: string
          max_tokens?: number | null
          name: string
          primary_color?: string
          show_avatar?: boolean
          status?: string
          system_prompt?: string | null
          temperature?: number | null
          type: string
          updated_at?: string
          user_id: string
          welcome_message?: string
        }
        Update: {
          ai_model?: string | null
          business_days?: string[] | null
          business_hours?: boolean | null
          business_hours_end?: string | null
          business_hours_start?: string | null
          channels?: string[]
          created_at?: string
          id?: string
          max_tokens?: number | null
          name?: string
          primary_color?: string
          show_avatar?: boolean
          status?: string
          system_prompt?: string | null
          temperature?: number | null
          type?: string
          updated_at?: string
          user_id?: string
          welcome_message?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
