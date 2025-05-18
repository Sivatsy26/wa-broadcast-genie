
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Define the basic database types for better type safety
interface GenericTable {
  [key: string]: any;
}

/**
 * Create a more flexible type-safe wrapper for Supabase operations
 */
export const safeSupabaseTable = (tableName: string) => {
  return {
    select: (columns: string = '*') => {
      return supabase.from(tableName).select(columns);
    },
    insert: (values: any) => {
      return supabase.from(tableName).insert(values);
    },
    update: (values: any) => {
      return supabase.from(tableName).update(values);
    },
    upsert: (values: any) => {
      return supabase.from(tableName).upsert(values);
    },
    delete: () => {
      return supabase.from(tableName).delete();
    }
  };
};

/**
 * Check if a table exists in the Supabase database
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Try to get schema information
    const { data, error } = await supabase.from(tableName).select().limit(1);

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
export const ensureTableExists = async (tableName: string): Promise<boolean> => {
  try {
    const exists = await checkTableExists(tableName);
    
    if (!exists) {
      console.info(`Table ${tableName} doesn't exist`);
      
      // Show a toast notifying the user
      toast.warning(`The ${tableName} table doesn't exist in your Supabase project`, {
        description: "Please create it in the Supabase dashboard with the appropriate schema",
        duration: 6000
      });
      
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking table '${tableName}':`, error);
    return false;
  }
};

/**
 * A function to get data from a table with handling for the table not existing
 */
export const getTableData = async <T>(
  tableName: string,
  query: Record<string, any> = {},
  fallbackData: T[] = []
): Promise<T[]> => {
  try {
    await ensureTableExists(tableName);
    
    let queryBuilder = supabase.from(tableName).select('*');
    
    // Apply filters if any are provided
    Object.entries(query).forEach(([key, value]) => {
      queryBuilder = queryBuilder.eq(key, value);
    });
    
    const { data, error } = await queryBuilder;
    
    if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      return fallbackData;
    }
    
    return (data as T[]) || fallbackData;
  } catch (error) {
    console.error(`Error in getTableData for ${tableName}:`, error);
    return fallbackData;
  }
};

// Function to subscribe to real-time updates for a table
export const subscribeToTable = (
  tableName: string, 
  eventType: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*', 
  callback: (payload: any) => void
) => {
  const channel = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: eventType,
        schema: 'public',
        table: tableName
      },
      callback
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
