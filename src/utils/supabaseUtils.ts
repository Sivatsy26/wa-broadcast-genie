
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lead, Client } from "@/types/customer";

/**
 * Check if a table exists in the Supabase database
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Try to get the schema information
    const { error } = await supabase
      .from('_metadata')
      .select('*')
      .limit(1)
      .eq('table', tableName);

    // If there's an error like "relation does not exist", the table doesn't exist
    if (error && error.message.includes('does not exist')) {
      console.info(`Table '${tableName}' does not exist`);
      return false;
    }
    
    // No error means table might exist, but we should verify by trying to select from it
    const { error: selectError } = await supabase
      .rpc('test_table_exists', { table_name: tableName });

    if (selectError) {
      console.info(`Unable to verify table '${tableName}' exists: ${selectError.message}`);
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
      console.info(`Creating ${tableName} table...`);
      
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
    const { data, error } = await supabase.from('bot_flows').select('*');
    
    if (error) {
      // If the table doesn't exist, use mock data
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Leads table doesn't exist, using mock data");
        return mockLeads;
      }
      throw error;
    }
    
    // If we somehow got data but the schema doesn't match our needs, use mock data
    if (data && Array.isArray(data) && data.length > 0) {
      // Check if the first item has the necessary lead properties
      const firstItem = data[0];
      if (!('company' in firstItem) || !('email' in firstItem)) {
        console.warn("Retrieved data doesn't match Lead schema, using mock data");
        return mockLeads;
      }
      
      // If we got here, the data might be usable as Leads
      return data as unknown as Lead[];
    }
    
    return mockLeads;
  } catch (error) {
    console.error("Error fetching leads:", error);
    return mockLeads;
  }
};

export const fetchClientsData = async (mockClients: Client[]): Promise<Client[]> => {
  try {
    const { data, error } = await supabase.from('bot_flows').select('*');
    
    if (error) {
      // If the table doesn't exist, use mock data
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Clients table doesn't exist, using mock data");
        return mockClients;
      }
      throw error;
    }
    
    // If we somehow got data but the schema doesn't match our needs, use mock data
    if (data && Array.isArray(data) && data.length > 0) {
      const firstItem = data[0];
      if (!('customerId' in firstItem) || !('plan' in firstItem)) {
        console.warn("Retrieved data doesn't match Client schema, using mock data");
        return mockClients;
      }
      
      return data as unknown as Client[];
    }
    
    return mockClients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return mockClients;
  }
};

export const addLeadToSupabase = async (lead: Lead): Promise<boolean> => {
  try {
    // Try to use a table that exists in the schema
    const { error } = await supabase.from('bot_flows').insert([
      {
        name: lead.name,
        keywords: [lead.company, lead.status],
        flow_data: lead, // Store the full lead object as JSON
        user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
      }
    ]);
    
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
    // Try to use a table that exists in the schema
    const { error } = await supabase.from('bot_flows').insert([
      {
        name: client.name,
        keywords: [client.company, client.plan],
        flow_data: client, // Store the full client object as JSON
        user_id: '00000000-0000-0000-0000-000000000000', // Mock user ID
      }
    ]);
    
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
    const { error } = await supabase
      .from('bot_flows')
      .delete()
      .eq('id', leadId);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot delete lead from Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting lead from Supabase:", error);
    return false;
  }
};

export const deleteClientFromSupabase = async (clientId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bot_flows')
      .delete()
      .eq('id', clientId);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot delete client from Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting client from Supabase:", error);
    return false;
  }
};

export const updateLeadInSupabase = async (lead: Lead): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bot_flows')
      .update({
        name: lead.name,
        keywords: [lead.company, lead.status],
        flow_data: lead,
      })
      .eq('id', lead.id);
      
    if (error) {
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.warn("Cannot update lead in Supabase: table doesn't exist");
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error("Error updating lead in Supabase:", error);
    return false;
  }
};
