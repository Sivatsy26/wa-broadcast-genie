
// Import needed modules
import { supabase } from "@/integrations/supabase/client";
import { safeSupabaseTable, ensureTableExists } from "@/utils/supabaseHelpers";
import { toast } from "sonner";

// Types
export interface Chatbot {
  id: string;
  name: string;
  type: "faq" | "lead-gen" | "support" | "custom";
  user_id: string;
  status: "active" | "draft" | "paused";
  created_at?: string;
  updated_at?: string;
  welcome_message: string;
  primary_color: string;
  show_avatar: boolean;
  channels: string[];
  system_prompt?: string;
  ai_model?: string;
  temperature?: number;
  max_tokens?: number;
  business_hours?: boolean;
  business_hours_start?: string;
  business_hours_end?: string;
  business_days?: string[];
}

export interface ChatbotResponse {
  id: string;
  chatbot_id: string;
  trigger: string;
  response: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatbotAnalyticsData {
  totalConversations: number;
  totalMessages: number;
  dailyConversations: { date: string; value: number }[];
  topQueries: { query: string; count: number }[];
  responseRates: { date: string; value: number }[];
}

// Mock data for when table doesn't exist
const mockChatbots: Chatbot[] = [
  {
    id: "1",
    name: "FAQ Bot",
    type: "faq",
    user_id: "user123",
    status: "active",
    welcome_message: "Hello! How can I help you today?",
    primary_color: "#007bff",
    show_avatar: true,
    channels: ["website"],
  },
  {
    id: "2",
    name: "Lead Generation Bot",
    type: "lead-gen",
    user_id: "user123",
    status: "draft",
    welcome_message: "Hi there! I'd love to learn more about your needs.",
    primary_color: "#28a745",
    show_avatar: true,
    channels: ["website", "whatsapp"],
  }
];

/**
 * Fetch all chatbots for the current user
 */
export const fetchChatbots = async (): Promise<Chatbot[]> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbots');
    if (!tableExists) {
      console.log("Using mock chatbot data");
      return mockChatbots;
    }

    // Use our safe wrapper for fetching data
    const { data, error } = await safeSupabaseTable('chatbots')
      .select();

    if (error) {
      console.error("Error fetching chatbots:", error);
      toast.error("Failed to load chatbots");
      return mockChatbots;
    }

    return (data as Chatbot[]) || mockChatbots;
  } catch (error) {
    console.error("Error in fetchChatbots:", error);
    return mockChatbots;
  }
};

/**
 * Fetch a single chatbot by ID
 */
export const fetchChatbot = async (id: string): Promise<Chatbot | null> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbots');
    if (!tableExists) {
      return mockChatbots.find(bot => bot.id === id) || null;
    }

    // Use our safe wrapper for fetching data
    const { data, error } = await safeSupabaseTable('chatbots')
      .select()
      .eq('id', id);

    if (error) {
      console.error("Error fetching chatbot:", error);
      toast.error("Failed to load chatbot");
      return mockChatbots.find(bot => bot.id === id) || null;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    return (Array.isArray(data) ? data[0] : data) as Chatbot;
  } catch (error) {
    console.error("Error in fetchChatbotById:", error);
    return mockChatbots.find(bot => bot.id === id) || null;
  }
};

/**
 * Create a new chatbot
 */
export const createChatbot = async (chatbot: Partial<Chatbot>): Promise<Chatbot | null> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbots');
    if (!tableExists) {
      toast.error("Cannot create chatbot: Supabase table is not available");
      return null;
    }

    // Use our safe wrapper for inserting data
    const { data, error } = await safeSupabaseTable('chatbots')
      .insert(chatbot);

    if (error) {
      console.error("Error creating chatbot:", error);
      toast.error("Failed to create chatbot");
      return null;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    toast.success("Chatbot created successfully!");
    return (Array.isArray(data) ? data[0] : data) as Chatbot;
  } catch (error) {
    console.error("Error in createChatbot:", error);
    toast.error("Failed to create chatbot due to an unexpected error");
    return null;
  }
};

/**
 * Update an existing chatbot
 */
export const updateChatbot = async (id: string, updates: Partial<Chatbot>): Promise<Chatbot | null> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbots');
    if (!tableExists) {
      toast.error("Cannot update chatbot: Supabase table is not available");
      return null;
    }

    // Use our safe wrapper for updating data
    const { data, error } = await safeSupabaseTable('chatbots')
      .update(updates)
      .eq('id', id);

    if (error) {
      console.error("Error updating chatbot:", error);
      toast.error("Failed to update chatbot");
      return null;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    toast.success("Chatbot updated successfully!");
    return (Array.isArray(data) ? data[0] : data) as Chatbot;
  } catch (error) {
    console.error("Error in updateChatbot:", error);
    toast.error("Failed to update chatbot due to an unexpected error");
    return null;
  }
};

/**
 * Delete a chatbot
 */
export const deleteChatbot = async (id: string): Promise<boolean> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbots');
    if (!tableExists) {
      toast.error("Cannot delete chatbot: Supabase table is not available");
      return false;
    }

    // Use our safe wrapper for deleting data
    const { error } = await safeSupabaseTable('chatbots')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting chatbot:", error);
      toast.error("Failed to delete chatbot");
      return false;
    }

    toast.success("Chatbot deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error in deleteChatbot:", error);
    toast.error("Failed to delete chatbot due to an unexpected error");
    return false;
  }
};

/**
 * Duplicate a chatbot
 */
export const duplicateChatbot = async (id: string): Promise<Chatbot | null> => {
  try {
    // Get the original chatbot
    const original = await fetchChatbot(id);
    
    if (!original) {
      toast.error("Cannot duplicate: Original chatbot not found");
      return null;
    }
    
    // Create a new chatbot based on the original
    const newChatbot: Partial<Chatbot> = {
      ...original,
      id: undefined, // Let Supabase generate a new ID
      name: `${original.name} (Copy)`,
      created_at: undefined,
      updated_at: undefined,
    };
    
    // Save the new chatbot
    return await createChatbot(newChatbot);
  } catch (error) {
    console.error("Error in duplicateChatbot:", error);
    toast.error("Failed to duplicate chatbot");
    return null;
  }
};

/**
 * Update chatbot status
 */
export const updateChatbotStatus = async ({ id, status }: { id: string, status: Chatbot['status'] }): Promise<Chatbot | null> => {
  return updateChatbot(id, { status });
};

// Mock chatbot responses
const mockResponses: ChatbotResponse[] = [
  {
    id: "resp1",
    chatbot_id: "1",
    trigger: "pricing",
    response: "Our pricing starts at $29/month for the Basic plan, $99/month for Professional, and $299/month for Enterprise.",
  },
  {
    id: "resp2",
    chatbot_id: "1",
    trigger: "hours",
    response: "Our business hours are Monday to Friday, 9 AM to 5 PM EST.",
  }
];

/**
 * Fetch chatbot responses
 */
export const fetchChatbotResponses = async (chatbotId: string): Promise<ChatbotResponse[]> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbot_responses');
    if (!tableExists) {
      return mockResponses.filter(r => r.chatbot_id === chatbotId);
    }

    // Use our safe wrapper for fetching data
    const { data, error } = await safeSupabaseTable('chatbot_responses')
      .select()
      .eq('chatbot_id', chatbotId);

    if (error) {
      console.error("Error fetching chatbot responses:", error);
      toast.error("Failed to load responses");
      return mockResponses.filter(r => r.chatbot_id === chatbotId);
    }

    return (data as ChatbotResponse[]) || mockResponses.filter(r => r.chatbot_id === chatbotId);
  } catch (error) {
    console.error("Error in fetchChatbotResponses:", error);
    return mockResponses.filter(r => r.chatbot_id === chatbotId);
  }
};

/**
 * Create a new chatbot response
 */
export const createChatbotResponse = async (response: Partial<ChatbotResponse>): Promise<ChatbotResponse | null> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbot_responses');
    if (!tableExists) {
      toast.error("Cannot create response: Supabase table is not available");
      return null;
    }

    // Use our safe wrapper for inserting data
    const { data, error } = await safeSupabaseTable('chatbot_responses')
      .insert(response);

    if (error) {
      console.error("Error creating chatbot response:", error);
      toast.error("Failed to create response");
      return null;
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return null;
    }

    return (Array.isArray(data) ? data[0] : data) as ChatbotResponse;
  } catch (error) {
    console.error("Error in createChatbotResponse:", error);
    toast.error("Failed to create response");
    return null;
  }
};

/**
 * Update a chatbot response
 */
export const updateChatbotResponse = async (id: string, data: Partial<ChatbotResponse>): Promise<ChatbotResponse | null> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbot_responses');
    if (!tableExists) {
      toast.error("Cannot update response: Supabase table is not available");
      return null;
    }

    // Use our safe wrapper for updating data
    const { data: responseData, error } = await safeSupabaseTable('chatbot_responses')
      .update(data)
      .eq('id', id);

    if (error) {
      console.error("Error updating chatbot response:", error);
      toast.error("Failed to update response");
      return null;
    }

    if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
      return null;
    }

    return (Array.isArray(responseData) ? responseData[0] : responseData) as ChatbotResponse;
  } catch (error) {
    console.error("Error in updateChatbotResponse:", error);
    toast.error("Failed to update response");
    return null;
  }
};

/**
 * Delete a chatbot response
 */
export const deleteChatbotResponse = async (id: string): Promise<boolean> => {
  try {
    // Check if the table exists
    const tableExists = await ensureTableExists('chatbot_responses');
    if (!tableExists) {
      toast.error("Cannot delete response: Supabase table is not available");
      return false;
    }

    // Use our safe wrapper for deleting data
    const { error } = await safeSupabaseTable('chatbot_responses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting chatbot response:", error);
      toast.error("Failed to delete response");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteChatbotResponse:", error);
    toast.error("Failed to delete response");
    return false;
  }
};

// Mock analytics data
const mockAnalytics: ChatbotAnalyticsData = {
  totalConversations: 124,
  totalMessages: 547,
  dailyConversations: Array.from({ length: 14 }).map((_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.floor(Math.random() * 20)
  })),
  topQueries: [
    { query: "pricing", count: 45 },
    { query: "how to sign up", count: 32 },
    { query: "refund policy", count: 18 },
    { query: "contact support", count: 15 }
  ],
  responseRates: Array.from({ length: 14 }).map((_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: 0.7 + Math.random() * 0.25
  }))
};

/**
 * Fetch analytics for a chatbot
 */
export const fetchChatbotAnalytics = async (chatbotId: string): Promise<ChatbotAnalyticsData> => {
  try {
    // In a real application, we would fetch this data from Supabase
    // For now, we'll return mock data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return mockAnalytics;
  } catch (error) {
    console.error("Error fetching chatbot analytics:", error);
    toast.error("Failed to load analytics");
    return mockAnalytics;
  }
};
