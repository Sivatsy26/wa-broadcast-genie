
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
