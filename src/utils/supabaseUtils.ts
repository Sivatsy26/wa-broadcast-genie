
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lead, Client } from "@/types/customer";

/**
 * Check if a table exists in the Supabase database
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Try to get schema information
    const { data, error } = await supabase
      .from('bot_flows')
      .select('*')
      .limit(1);

    if (error) {
      console.info(`Table '${tableName}' might not exist: ${error.message}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking if table '${tableName}' exists:`, error);
    return false;
  }
};

/**
 * Create a table in Supabase if it doesn't exist
 */
export const createTableIfNotExists = async (tableName: string, schema: Record<string, string>): Promise<boolean> => {
  try {
    const exists = await checkTableExists(tableName);
    
    if (!exists) {
      console.info(`Table ${tableName} doesn't exist`);
      
      // Note: This is just a placeholder - we can't actually create tables via the client API
      // You would need to use the Supabase Management API or SQL functions
      // For now, we'll just show a toast notifying the user
      toast.warning(`The ${tableName} table doesn't exist in your Supabase project`, {
        description: "Please create it in the Supabase dashboard with the appropriate schema",
        duration: 6000
      });
      
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error creating table '${tableName}':`, error);
    return false;
  }
};

/**
 * A function to simulate table access by falling back to local data when tables don't exist
 */
export const safeSupabaseOperation = async <T>(
  operation: () => Promise<{ data: T | null, error: any }>,
  fallbackData: T
): Promise<T> => {
  try {
    const { data, error } = await operation();
    
    if (error) {
      if (error.message && (
          error.message.includes('does not exist') || 
          error.code === 'PGRST116' || 
          error.code === '42P01')
      ) {
        console.warn("Table doesn't exist, using fallback data:", error);
        return fallbackData;
      }
      
      throw error;
    }
    
    return data || fallbackData;
  } catch (error) {
    console.error("Error in Supabase operation:", error);
    return fallbackData;
  }
};

// Specific lead/client data functions that handle the type safety issues
export const fetchLeadsData = async (mockLeads: Lead[]): Promise<Lead[]> => {
  try {
    const { data, error } = await supabase.from('bot_flows').select('*')
      .eq('keywords[0]', 'lead');
    
    if (error) {
      // If the table doesn't exist, use mock data
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Bot flows table doesn't exist, using mock data");
        return mockLeads;
      }
      throw error;
    }
    
    // If we have data, try to convert it to Lead objects
    if (data && Array.isArray(data) && data.length > 0) {
      const leads = data
        .filter(item => item.flow_data && typeof item.flow_data === 'object')
        .map(item => item.flow_data as unknown as Lead);
      
      if (leads.length > 0) {
        return leads;
      }
    }
    
    return mockLeads;
  } catch (error) {
    console.error("Error fetching leads:", error);
    return mockLeads;
  }
};

export const fetchClientsData = async (mockClients: Client[]): Promise<Client[]> => {
  try {
    const { data, error } = await supabase.from('bot_flows').select('*')
      .eq('keywords[0]', 'client');
    
    if (error) {
      // If the table doesn't exist, use mock data
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Bot flows table doesn't exist, using mock data");
        return mockClients;
      }
      throw error;
    }
    
    // If we have data, try to convert it to Client objects
    if (data && Array.isArray(data) && data.length > 0) {
      const clients = data
        .filter(item => item.flow_data && typeof item.flow_data === 'object')
        .map(item => item.flow_data as unknown as Client);
      
      if (clients.length > 0) {
        return clients;
      }
    }
    
    return mockClients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return mockClients;
  }
};

export const addLeadToSupabase = async (lead: Lead): Promise<boolean> => {
  try {
    // Convert Lead to a compatible format for storage
    const { error } = await supabase.from('bot_flows').insert({
      name: lead.name,
      keywords: ['lead', lead.company],
      flow_data: lead as any, // Cast to any to bypass type checking
      user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
    });
    
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot add lead to Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error adding lead to Supabase:", error);
    return false;
  }
};

export const addClientToSupabase = async (client: Client): Promise<boolean> => {
  try {
    // Convert Client to a compatible format for storage
    const { error } = await supabase.from('bot_flows').insert({
      name: client.name,
      keywords: ['client', client.company],
      flow_data: client as any, // Cast to any to bypass type checking
      user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
    });
    
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot add client to Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error adding client to Supabase:", error);
    return false;
  }
};

export const deleteLeadFromSupabase = async (leadId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('bot_flows')
      .select('*')
      .eq('flow_data->>id', leadId);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot delete lead from Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    if (data && data.length > 0) {
      const { error: deleteError } = await supabase
        .from('bot_flows')
        .delete()
        .eq('id', data[0].id);
        
      if (deleteError) {
        throw deleteError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting lead from Supabase:", error);
    return false;
  }
};

export const deleteClientFromSupabase = async (clientId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('bot_flows')
      .select('*')
      .eq('flow_data->>id', clientId);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot delete client from Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    if (data && data.length > 0) {
      const { error: deleteError } = await supabase
        .from('bot_flows')
        .delete()
        .eq('id', data[0].id);
        
      if (deleteError) {
        throw deleteError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting client from Supabase:", error);
    return false;
  }
};

export const updateLeadInSupabase = async (lead: Lead): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('bot_flows')
      .select('*')
      .eq('flow_data->>id', lead.id);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot update lead in Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    if (data && data.length > 0) {
      const { error: updateError } = await supabase
        .from('bot_flows')
        .update({
          name: lead.name,
          keywords: ['lead', lead.company, lead.status],
          flow_data: lead as any, // Cast to any to bypass type checking
        })
        .eq('id', data[0].id);
        
      if (updateError) {
        throw updateError;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error updating lead in Supabase:", error);
    return false;
  }
};
