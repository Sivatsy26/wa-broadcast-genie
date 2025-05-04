
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface Chatbot {
  id: string;
  name: string;
  type: 'faq' | 'lead-gen' | 'support' | 'custom';
  status: 'active' | 'draft' | 'paused';
  welcome_message: string;
  primary_color: string;
  show_avatar: boolean;
  channels: string[];
  created_at: string;
  updated_at: string;
  user_id: string;
  system_prompt?: string;
  temperature?: number;
  ai_model?: string;
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
  created_at: string;
  updated_at: string;
}

export interface ChatbotConversation {
  id: string;
  chatbot_id: string;
  session_id: string;
  started_at: string;
  last_message_at: string;
  channel: string;
  messages: any[];
  metadata: any;
}

export const fetchChatbots = async () => {
  try {
    const { data, error } = await supabase
      .from('chatbots')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data as Chatbot[];
  } catch (error: any) {
    console.error('Error fetching chatbots:', error);
    toast({
      title: "Failed to fetch chatbots",
      description: error.message,
      variant: "destructive"
    });
    return [];
  }
};

export const fetchChatbot = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('chatbots')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as Chatbot;
  } catch (error: any) {
    console.error('Error fetching chatbot:', error);
    toast({
      title: "Failed to fetch chatbot",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const createChatbot = async (chatbotData: Partial<Chatbot>) => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      throw userError;
    }
    
    if (!userData.user) {
      throw new Error("User not authenticated");
    }
    
    // Ensure required fields are present
    if (!chatbotData.name || !chatbotData.type) {
      throw new Error("Missing required chatbot fields");
    }

    const chatbot = {
      ...chatbotData,
      user_id: userData.user.id
    };

    const { data, error } = await supabase
      .from('chatbots')
      .insert(chatbot)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0] as Chatbot;
  } catch (error: any) {
    console.error('Error creating chatbot:', error);
    toast({
      title: "Failed to create chatbot",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const updateChatbot = async (id: string, chatbot: Partial<Chatbot>) => {
  try {
    const { data, error } = await supabase
      .from('chatbots')
      .update({
        ...chatbot,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0] as Chatbot;
  } catch (error: any) {
    console.error('Error updating chatbot:', error);
    toast({
      title: "Failed to update chatbot",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const deleteChatbot = async (id: string) => {
  try {
    const { error } = await supabase
      .from('chatbots')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    console.error('Error deleting chatbot:', error);
    toast({
      title: "Failed to delete chatbot",
      description: error.message,
      variant: "destructive"
    });
    return false;
  }
};

export const duplicateChatbot = async (id: string) => {
  try {
    // Fetch original chatbot
    const chatbot = await fetchChatbot(id);
    if (!chatbot) {
      throw new Error("Chatbot not found");
    }

    // Create a duplicate with a new ID
    const { id: originalId, created_at, updated_at, ...chatbotData } = chatbot;
    const duplicatedChatbot = {
      ...chatbotData,
      name: `${chatbot.name} (Copy)`,
    };
    
    // Create the duplicate
    const newChatbot = await createChatbot(duplicatedChatbot);
    
    if (!newChatbot) {
      throw new Error("Failed to duplicate chatbot");
    }
    
    // Fetch responses from original chatbot
    const { data: responses, error: responsesError } = await supabase
      .from('chatbot_responses')
      .select('*')
      .eq('chatbot_id', id);
    
    if (responsesError) {
      throw responsesError;
    }
    
    // If there are responses, duplicate them for the new chatbot
    if (responses && responses.length > 0) {
      const newResponses = responses.map((response) => {
        const { id, created_at, updated_at, ...responseData } = response;
        return {
          ...responseData,
          chatbot_id: newChatbot.id
        };
      });
      
      const { error: insertError } = await supabase
        .from('chatbot_responses')
        .insert(newResponses);
      
      if (insertError) {
        throw insertError;
      }
    }
    
    return newChatbot;
  } catch (error: any) {
    console.error('Error duplicating chatbot:', error);
    toast({
      title: "Failed to duplicate chatbot",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const updateChatbotStatus = async (params: { id: string, status: 'active' | 'draft' | 'paused' }) => {
  try {
    const { id, status } = params;
    const { data, error } = await supabase
      .from('chatbots')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0] as Chatbot;
  } catch (error: any) {
    console.error('Error updating chatbot status:', error);
    toast({
      title: "Failed to update status",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const fetchChatbotResponses = async (chatbotId: string) => {
  try {
    const { data, error } = await supabase
      .from('chatbot_responses')
      .select('*')
      .eq('chatbot_id', chatbotId);
    
    if (error) {
      throw error;
    }
    
    return data as ChatbotResponse[];
  } catch (error: any) {
    console.error('Error fetching chatbot responses:', error);
    toast({
      title: "Failed to fetch responses",
      description: error.message,
      variant: "destructive"
    });
    return [];
  }
};

export const createChatbotResponse = async (response: Partial<ChatbotResponse>) => {
  try {
    // Ensure required fields
    if (!response.chatbot_id || !response.trigger || !response.response) {
      throw new Error("Missing required response fields");
    }
    
    const { data, error } = await supabase
      .from('chatbot_responses')
      .insert(response)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0] as ChatbotResponse;
  } catch (error: any) {
    console.error('Error creating chatbot response:', error);
    toast({
      title: "Failed to create response",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const updateChatbotResponse = async (id: string, response: Partial<ChatbotResponse>) => {
  try {
    const { data, error } = await supabase
      .from('chatbot_responses')
      .update({
        ...response,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    return data[0] as ChatbotResponse;
  } catch (error: any) {
    console.error('Error updating chatbot response:', error);
    toast({
      title: "Failed to update response",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

export const deleteChatbotResponse = async (id: string) => {
  try {
    const { error } = await supabase
      .from('chatbot_responses')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error: any) {
    console.error('Error deleting chatbot response:', error);
    toast({
      title: "Failed to delete response",
      description: error.message,
      variant: "destructive"
    });
    return false;
  }
};

export const fetchChatbotAnalytics = async (chatbotId: string) => {
  try {
    // Get conversations count
    const { data: conversations, error: conversationsError } = await supabase
      .from('chatbot_conversations')
      .select('id')
      .eq('chatbot_id', chatbotId);
    
    if (conversationsError) {
      throw conversationsError;
    }
    
    // Get message count
    const { data: messagesCount, error: messagesError } = await supabase
      .from('chatbot_conversations')
      .select('messages')
      .eq('chatbot_id', chatbotId);
    
    if (messagesError) {
      throw messagesError;
    }
    
    const totalMessages = messagesCount.reduce((acc, conversation) => acc + (conversation.messages?.length || 0), 0);
    
    // Get daily stats for the last 14 days
    const lastTwoWeeks = new Date();
    lastTwoWeeks.setDate(lastTwoWeeks.getDate() - 14);
    
    const { data: dailyConversations, error: dailyError } = await supabase
      .from('chatbot_conversations')
      .select('started_at, id')
      .eq('chatbot_id', chatbotId)
      .gte('started_at', lastTwoWeeks.toISOString());
    
    if (dailyError) {
      throw dailyError;
    }
    
    // Process daily data
    const dailyData = Array.from({ length: 14 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (13 - i));
      return {
        date: date.toISOString().split('T')[0],
        value: 0
      };
    });
    
    if (dailyConversations) {
      dailyConversations.forEach((conversation) => {
        const date = new Date(conversation.started_at).toISOString().split('T')[0];
        const day = dailyData.find(d => d.date === date);
        if (day) {
          day.value += 1;
        }
      });
    }
    
    return {
      totalConversations: conversations?.length || 0,
      totalMessages,
      dailyConversations: dailyData
    };
  } catch (error: any) {
    console.error('Error fetching chatbot analytics:', error);
    toast({
      title: "Failed to fetch analytics",
      description: error.message,
      variant: "destructive"
    });
    return {
      totalConversations: 0,
      totalMessages: 0,
      dailyConversations: []
    };
  }
};
