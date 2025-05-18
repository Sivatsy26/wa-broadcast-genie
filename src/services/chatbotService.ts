
// Import needed modules
import { supabase } from "@/integrations/supabase/client";
import { safeSupabaseTable, ensureTableExists } from "@/utils/supabaseHelpers";
import { toast } from "sonner";

// Types
interface Chatbot {
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

    return data as Chatbot[] || mockChatbots;
  } catch (error) {
    console.error("Error in fetchChatbots:", error);
    return mockChatbots;
  }
};

/**
 * Fetch a single chatbot by ID
 */
export const fetchChatbotById = async (id: string): Promise<Chatbot | null> => {
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

    return (data && data.length > 0) ? data[0] as Chatbot : null;
  } catch (error) {
    console.error("Error in fetchChatbotById:", error);
    return mockChatbots.find(bot => bot.id === id) || null;
  }
};

/**
 * Create a new chatbot
 */
export const createChatbot = async (chatbot: Omit<Chatbot, 'id'>): Promise<Chatbot | null> => {
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

    toast.success("Chatbot created successfully!");
    return data && data.length > 0 ? data[0] as Chatbot : null;
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

    toast.success("Chatbot updated successfully!");
    return data && data.length > 0 ? data[0] as Chatbot : null;
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
