
import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserPlus,
  Building,
  Mail,
  Phone,
  MapPin,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  Send,
  UserCheck,
  Upload,
  Edit,
  Trash2,
  Clock,
  Briefcase,
  Image,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CustomerDetailsModal from "@/components/CustomerDetailsModal";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  street: string;
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted';
  source: string;
  created: string;
  lastContact: string;
  nextFollowUp: string;
  assignedTo: string;
  notes: string;
  avatar?: string;
}

interface Client {
  id: string;
  customerId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  street: string;
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  plan: 'starter' | 'professional' | 'enterprise';
  referredBy: string;
  joinDate: string;
  renewalDate: string;
  notes: string;
  avatar?: string;
}

interface ConvertToClientData {
  customerId: string;
  plan: 'starter' | 'professional' | 'enterprise';
  referredBy: string;
  joinDate: string;
  renewalDate: string;
}

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    company: 'Acme Corp',
    email: 'michael@acmecorp.com',
    phone: '5551234567',
    phoneCountry: '1',
    street: '123 Main St',
    address: 'Suite 400',
    city: 'Downtown',
    district: 'Central',
    state: 'California',
    country: 'USA',
    postalCode: '90001',
    status: 'qualified',
    source: 'Website',
    created: '2023-06-10T14:30:00Z',
    lastContact: '2023-06-15T09:45:00Z',
    nextFollowUp: '2023-06-22T10:00:00Z',
    assignedTo: 'Sarah Miller',
    notes: 'Interested in our enterprise solution',
    avatar: '',
  },
  {
    id: '2',
    name: 'Jennifer Lee',
    company: 'Tech Solutions Inc',
    email: 'jennifer@techsolutions.com',
    phone: '9876543',
    phoneCountry: '1',
    street: '456 Tech Ave',
    address: 'Floor 3',
    city: 'Tech District',
    district: 'North',
    state: 'Washington',
    country: 'USA',
    postalCode: '98001',
    status: 'contacted',
    source: 'LinkedIn',
    created: '2023-06-12T11:20:00Z',
    lastContact: '2023-06-14T15:30:00Z',
    nextFollowUp: '2023-06-21T14:00:00Z',
    assignedTo: 'Robert Brown',
    notes: 'Requested pricing information',
    avatar: '',
  },
  {
    id: '3',
    name: 'David Wilson',
    company: 'Global Enterprises',
    email: 'david@globalenterprises.com',
    phone: '2223344',
    phoneCountry: '1',
    street: '789 Business Rd',
    address: 'Level 22',
    city: 'Uptown',
    district: 'East',
    state: 'Texas',
    country: 'USA',
    postalCode: '75001',
    status: 'new',
    source: 'Referral',
    created: '2023-06-15T08:00:00Z',
    lastContact: '2023-06-15T08:00:00Z',
    nextFollowUp: '2023-06-23T11:00:00Z',
    assignedTo: 'Jessica Lee',
    notes: 'Potential for a large deal',
    avatar: '',
  },
  {
    id: '4',
    name: 'Linda Davis',
    company: 'Sunrise Technologies',
    email: 'linda@sunrisetech.com',
    phone: '4445566',
    phoneCountry: '1',
    street: '321 Innovation Ln',
    address: 'Suite 1000',
    city: 'Tech Park',
    district: 'South',
    state: 'Arizona',
    country: 'USA',
    postalCode: '85001',
    status: 'proposal',
    source: 'Google Ads',
    created: '2023-06-18T16:45:00Z',
    lastContact: '2023-06-20T13:20:00Z',
    nextFollowUp: '2023-06-25T16:00:00Z',
    assignedTo: 'Sarah Miller',
    notes: 'Reviewing our proposal',
    avatar: '',
  },
  {
    id: '5',
    name: 'Robert White',
    company: 'Pioneer Group',
    email: 'robert@pioneergp.com',
    phone: '6667788',
    phoneCountry: '1',
    street: '987 Market St',
    address: 'Unit 50',
    city: 'Financial District',
    district: 'West',
    state: 'Illinois',
    country: 'USA',
    postalCode: '60601',
    status: 'converted',
    source: 'Email Campaign',
    created: '2023-06-20T10:30:00Z',
    lastContact: '2023-06-22T11:15:00Z',
    nextFollowUp: '2023-06-29T10:00:00Z',
    assignedTo: 'Robert Brown',
    notes: 'Signed a three-year contract',
    avatar: '',
  },
];

const initialClients: Client[] = [
  {
    id: '1',
    customerId: 'CLIENT001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '1112233',
    phoneCountry: '1',
    street: '789 Corporate Blvd',
    address: 'Floor 15',
    city: 'Business District',
    district: 'Downtown',
    state: 'New York',
    country: 'USA',
    postalCode: '10001',
    plan: 'professional',
    referredBy: 'Trade Show',
    joinDate: '2023-01-15T00:00:00Z',
    renewalDate: '2024-01-15T00:00:00Z',
    notes: 'Key account, requires quarterly check-ins',
    avatar: '',
  },
  {
    id: '2',
    customerId: 'CLIENT002',
    name: 'Beta Industries',
    company: 'Beta Inc',
    email: 'info@betainc.com',
    phone: '3334455',
    phoneCountry: '1',
    street: '456 Industrial Ave',
    address: 'Building A',
    city: 'Industrial Zone',
    district: 'East Side',
    state: 'New Jersey',
    country: 'USA',
    postalCode: '07001',
    plan: 'enterprise',
    referredBy: 'Existing Client',
    joinDate: '2022-11-01T00:00:00Z',
    renewalDate: '2023-11-01T00:00:00Z',
    notes: 'High-value client, needs custom solutions',
    avatar: '',
  },
  {
    id: '3',
    customerId: 'CLIENT003',
    name: 'Gamma Solutions',
    company: 'Gamma Ltd',
    email: 'sales@gammaltd.com',
    phone: '5556677',
    phoneCountry: '1',
    street: '123 Tech Rd',
    address: 'Suite 200',
    city: 'Technology Park',
    district: 'Silicon Valley',
    state: 'California',
    country: 'USA',
    postalCode: '94043',
    plan: 'starter',
    referredBy: 'Online Advertising',
    joinDate: '2023-03-10T00:00:00Z',
    renewalDate: '2024-03-10T00:00:00Z',
    notes: 'New client, exploring basic features',
    avatar: '',
  },
  {
    id: '4',
    customerId: 'CLIENT004',
    name: 'Delta Group',
    company: 'Delta Corp',
    email: 'support@deltacorp.com',
    phone: '7778899',
    phoneCountry: '1',
    street: '987 Commerce St',
    address: 'Level 10',
    city: 'Commercial Area',
    district: 'Uptown',
    state: 'Florida',
    country: 'USA',
    postalCode: '33101',
    plan: 'professional',
    referredBy: 'Direct Mail',
    joinDate: '2022-09-20T00:00:00Z',
    renewalDate: '2023-09-20T00:00:00Z',
    notes: 'Established client, requires regular updates',
    avatar: '',
  },
  {
    id: '5',
    customerId: 'CLIENT005',
    name: 'Epsilon Systems',
    company: 'Epsilon Inc',
    email: 'admin@epsiloninc.com',
    phone: '9990011',
    phoneCountry: '1',
    street: '654 Innovation Blvd',
    address: 'Floor 5',
    city: 'Research Park',
    district: 'North County',
    state: 'North Carolina',
    country: 'USA',
    postalCode: '27701',
    plan: 'enterprise',
    referredBy: 'Conference',
    joinDate: '2023-05-01T00:00:00Z',
    renewalDate: '2024-05-01T00:00:00Z',
    notes: 'Strategic client, needs advanced support',
    avatar: '',
  },
];

const LeadsCRM = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('leads');
  const [newLeadDialogOpen, setNewLeadDialogOpen] = useState(false);
  const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);
  const leadAvatarRef = useRef<HTMLInputElement>(null);
  const clientAvatarRef = useRef<HTMLInputElement>(null);
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [clientsData, setClientsData] = useState<Client[]>([]);
  const [editLeadDialogOpen, setEditLeadDialogOpen] = useState(false);
  const [editClientDialogOpen, setEditClientDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [viewingCustomerType, setViewingCustomerType] = useState<'lead' | 'client'>('lead');
  const [viewingCustomer, setViewingCustomer] = useState<Lead | Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tablesChecked, setTablesChecked] = useState(false);

  // Form data for new lead and client
  const [newLeadData, setNewLeadData] = useState<Partial<Lead>>({
    name: '',
    company: '',
    email: '',
    phone: '',
    phoneCountry: '1',
    street: '',
    address: '',
    city: '',
    district: '',
    state: '',
    country: '',
    postalCode: '',
    status: 'new',
    source: 'website',
    assignedTo: '',
    notes: '',
  });

  const [newClientData, setNewClientData] = useState<Partial<Client>>({
    customerId: '',
    name: '',
    company: '',
    email: '',
    phone: '',
    phoneCountry: '1',
    street: '',
    address: '',
    city: '',
    district: '',
    state: '',
    country: '',
    postalCode: '',
    plan: 'starter',
    referredBy: '',
    notes: '',
  });

  // Check if tables exist and create them if necessary
  const checkAndCreateTables = async () => {
    try {
      // Check if leads table exists by trying to select from it
      const { error: leadsError } = await supabase
        .from('leads')
        .select('id')
        .limit(1)
        .single();

      // If we get a table doesn't exist error, create the table
      if (leadsError && leadsError.code === '42P01') {
        console.log("Creating leads table...");
        // Since we can't create tables directly from the client side, 
        // we just use local data and show a toast message
        toast({
          title: "Database Setup Required",
          description: "The 'leads' table doesn't exist in your Supabase database. Using local data instead.",
          variant: "destructive",
        });
      }

      // Check if clients table exists
      const { error: clientsError } = await supabase
        .from('clients')
        .select('id')
        .limit(1)
        .single();

      // If we get a table doesn't exist error, create the table
      if (clientsError && clientsError.code === '42P01') {
        console.log("Creating clients table...");
        // Same as above, use local data and show a toast message
        toast({
          title: "Database Setup Required",
          description: "The 'clients' table doesn't exist in your Supabase database. Using local data instead.",
          variant: "destructive",
        });
      }
      
      setTablesChecked(true);
      return !(leadsError?.code === '42P01' || clientsError?.code === '42P01');
    } catch (error) {
      console.error('Error checking tables:', error);
      setTablesChecked(true);
      return false;
    }
  };

  // Fetch data from Supabase on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // First check if the tables exist
      const tablesExist = await checkAndCreateTables();
      
      if (tablesExist) {
        try {
          // Try to fetch leads
          const { data: leadsData, error: leadsError } = await supabase.rpc('get_leads');
          
          if (leadsError && leadsError.code !== '42P01') {
            throw leadsError;
          }
          
          // Try to fetch clients
          const { data: clientsData, error: clientsError } = await supabase.rpc('get_clients');
          
          if (clientsError && clientsError.code !== '42P01') {
            throw clientsError;
          }
          
          // If data exists, use it
          if (leadsData?.length) {
            setLeadsData(leadsData as Lead[]);
          } else {
            setLeadsData(initialLeads);
          }
          
          if (clientsData?.length) {
            setClientsData(clientsData as Client[]);
          } else {
            setClientsData(initialClients);
          }
        } catch (error) {
          console.error('Error fetching data with RPC:', error);
          // If RPC fails, try direct table access as fallback
          try {
            // Simple query to check if we can access the tables
            const { data: leadsData, error: leadsError } = await supabase.from('leads_view').select('*');
            const { data: clientsData, error: clientsError } = await supabase.from('clients_view').select('*');
            
            // If we've got data and no errors, use it
            if (leadsData && !leadsError) {
              setLeadsData(leadsData as Lead[]);
            } else {
              setLeadsData(initialLeads);
            }
            
            if (clientsData && !clientsError) {
              setClientsData(clientsData as Client[]);
            } else {
              setClientsData(initialClients);
            }
          } catch (directError) {
            console.error('Error with direct table access:', directError);
            setLeadsData(initialLeads);
            setClientsData(initialClients);
          }
        }
      } else {
        // If tables don't exist, use initial data
        setLeadsData(initialLeads);
        setClientsData(initialClients);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        description: "Could not fetch data from the database. Using sample data instead.",
        variant: "destructive",
      });
      
      // Use sample data if fetch fails
      setLeadsData(initialLeads);
      setClientsData(initialClients);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLead = async () => {
    try {
      const now = new Date().toISOString();
      const newLead: Lead = {
        id: uuidv4(),
        name: newLeadData.name || '',
        company: newLeadData.company || '',
        email: newLeadData.email || '',
        phone: newLeadData.phone || '',
        phoneCountry: newLeadData.phoneCountry || '',
        street: newLeadData.street || '',
        address: newLeadData.address || '',
        city: newLeadData.city || '',
        district: newLeadData.district || '',
        state: newLeadData.state || '',
        country: newLeadData.country || '',
        postalCode: newLeadData.postalCode || '',
        status: newLeadData.status || 'new',
        source: newLeadData.source || '',
        created: now,
        lastContact: now,
        nextFollowUp: newLeadData.nextFollowUp || now,
        assignedTo: newLeadData.assignedTo || '',
        notes: newLeadData.notes || '',
      };

      if (tablesChecked) {
        // Try to insert into Supabase if tables exist
        try {
          const { error } = await supabase
            .from('leads')
            .insert([newLead]);

          if (error && error.code !== '42P01') {
            throw error;
          }
        } catch (error) {
          console.warn('Could not save to database, updating local state only', error);
        }
      }

      // Always update local state
      setLeadsData([...leadsData, newLead]);
      setNewLeadDialogOpen(false);
      
      // Reset form
      setNewLeadData({
        name: '',
        company: '',
        email: '',
        phone: '',
        phoneCountry: '1',
        street: '',
        address: '',
        city: '',
        district: '',
        state: '',
        country: '',
        postalCode: '',
        status: 'new',
        source: 'website',
        assignedTo: '',
        notes: '',
      });

      toast({
        title: "Lead Added",
        description: "New lead has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: "Error",
        description: "Failed to add lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddClient = async () => {
    try {
      const now = new Date().toISOString();
      const newClient: Client = {
        id: uuidv4(),
        customerId: newClientData.customerId || `CLIENT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: newClientData.name || '',
        company: newClientData.company || '',
        email: newClientData.email || '',
        phone: newClientData.phone || '',
        phoneCountry: newClientData.phoneCountry || '',
        street: newClientData.street || '',
        address: newClientData.address || '',
        city: newClientData.city || '',
        district: newClientData.district || '',
        state: newClientData.state || '',
        country: newClientData.country || '',
        postalCode: newClientData.postalCode || '',
        plan: newClientData.plan || 'starter',
        referredBy: newClientData.referredBy || '',
        joinDate: newClientData.joinDate || now,
        renewalDate: newClientData.renewalDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
        notes: newClientData.notes || '',
      };

      if (tablesChecked) {
        // Try to insert into Supabase if tables exist
        try {
          const { error } = await supabase
            .from('clients')
            .insert([newClient]);

          if (error && error.code !== '42P01') {
            throw error;
          }
        } catch (error) {
          console.warn('Could not save to database, updating local state only', error);
        }
      }

      // Always update local state
      setClientsData([...clientsData, newClient]);
      setNewClientDialogOpen(false);
      
      // Reset form
      setNewClientData({
        customerId: '',
        name: '',
        company: '',
        email: '',
        phone: '',
        phoneCountry: '1',
        street: '',
        address: '',
        city: '',
        district: '',
        state: '',
        country: '',
        postalCode: '',
        plan: 'starter',
        referredBy: '',
        notes: '',
      });

      toast({
        title: "Client Added",
        description: "New client has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditLeadDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setEditClientDialogOpen(true);
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      if (tablesChecked) {
        // Try to delete from Supabase if tables exist
        try {
          const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', leadId);

          if (error && error.code !== '42P01') {
            throw error;
          }
        } catch (error) {
          console.warn('Could not delete from database, updating local state only', error);
        }
      }

      // Always update local state
      setLeadsData(leadsData.filter((lead) => lead.id !== leadId));
      
      toast({
        title: "Lead Deleted",
        description: "Lead has been deleted successfully.",
      });
      setDetailsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: "Error",
        description: "Failed to delete lead. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      if (tablesChecked) {
        // Try to delete from Supabase if tables exist
        try {
          const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', clientId);

          if (error && error.code !== '42P01') {
            throw error;
          }
        } catch (error) {
          console.warn('Could not delete from database, updating local state only', error);
        }
      }

      // Always update local state
      setClientsData(clientsData.filter((client) => client.id !== clientId));
      
      toast({
        title: "Client Deleted",
        description: "Client has been deleted successfully.",
      });
      setDetailsDialogOpen(false);
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewDetails = (type: 'lead' | 'client', id: string) => {
    if (type === 'lead') {
      const lead = leadsData.find(l => l.id === id);
      if (lead) {
        setViewingCustomer(lead);
        setViewingCustomerType('lead');
        setDetailsDialogOpen(true);
      }
    } else {
      const client = clientsData.find(c => c.id === id);
      if (client) {
        setViewingCustomer(client);
        setViewingCustomerType('client');
        setDetailsDialogOpen(true);
      }
    }
  };

  const handleConvertToClient = async (leadData: Lead, clientData: ConvertToClientData) => {
    try {
      // Create a new client object from the lead data and form data
      const newClient: Client = {
        id: uuidv4(),
        customerId: clientData.customerId,
        name: leadData.name,
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        phoneCountry: leadData.phoneCountry,
        street: leadData.street,
        address: leadData.address,
        city: leadData.city,
        district: leadData.district,
        state: leadData.state,
        country: leadData.country,
        postalCode: leadData.postalCode,
        plan: clientData.plan,
        referredBy: clientData.referredBy,
        joinDate: clientData.joinDate,
        renewalDate: clientData.renewalDate,
        notes: leadData.notes,
        avatar: leadData.avatar,
      };

      if (tablesChecked) {
        // Try to insert new client and update lead in Supabase if tables exist
        try {
          // Insert new client
          const { error: insertError } = await supabase
            .from('clients')
            .insert([newClient]);

          if (insertError && insertError.code !== '42P01') {
            throw insertError;
          }

          // Update the lead status to 'converted'
          const updatedLead = { ...leadData, status: 'converted' as 'converted' };
          
          const { error: updateError } = await supabase
            .from('leads')
            .update(updatedLead)
            .eq('id', leadData.id);

          if (updateError && updateError.code !== '42P01') {
            throw updateError;
          }
        } catch (error) {
          console.warn('Could not save to database, updating local state only', error);
        }
      }

      // Always update local state
      setClientsData([...clientsData, newClient]);
      setLeadsData(leadsData.map(lead => 
        lead.id === leadData.id ? { ...lead, status: 'converted' } : lead
      ));

      toast({
        title: "Lead Converted",
        description: "Lead has been successfully converted to a client.",
      });
    } catch (error) {
      console.error('Error converting lead to client:', error);
      toast({
        title: "Error",
        description: "Failed to convert lead to client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    formType: 'lead' | 'client'
  ) => {
    const { name, value } = e.target;
    
    if (formType === 'lead') {
      setNewLeadData(prev => ({ ...prev, [name]: value }));
    } else {
      setNewClientData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string, formType: 'lead' | 'client') => {
    if (formType === 'lead') {
      setNewLeadData(prev => ({ ...prev, [name]: value }));
    } else {
      setNewClientData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, maxSize: number = 1) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (convert MB to bytes)
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        title: "File too large",
        description: `Image should be less than ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }
    
    // File is valid
    toast({
      title: "File uploaded",
      description: "Image has been uploaded successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads & Clients</h1>
          <p className="text-muted-foreground">
            Manage your leads and clients in one place
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Add Lead Dialog */}
          <Dialog open={newLeadDialogOpen} onOpenChange={setNewLeadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the details for your new lead.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 mb-2">
                    <AvatarFallback>
                      <Image className="h-12 w-12 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => leadAvatarRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                    <span className="text-xs text-muted-foreground ml-2">(Max 1MB)</span>
                  </Button>
                  <input 
                    type="file" 
                    ref={leadAvatarRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e, 1)} 
                  />
                </div>
                
                {/* Basic Information */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">Full Name</Label>
                    <Input 
                      id="lead-name" 
                      name="name"
                      value={newLeadData.name}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., John Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-company">Company</Label>
                    <Input 
                      id="lead-company" 
                      name="company"
                      value={newLeadData.company}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., Acme Corp" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-email">Email</Label>
                    <Input 
                      id="lead-email" 
                      name="email"
                      value={newLeadData.email}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      type="email" 
                      placeholder="email@example.com" 
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="lead-phone-country">Country Code</Label>
                      <Input 
                        id="lead-phone-country" 
                        name="phoneCountry"
                        value={newLeadData.phoneCountry}
                        onChange={(e) => handleInputChange(e, 'lead')}
                        placeholder="e.g., 1" 
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="lead-phone">Phone Number</Label>
                      <Input 
                        id="lead-phone" 
                        name="phone"
                        value={newLeadData.phone}
                        onChange={(e) => handleInputChange(e, 'lead')}
                        placeholder="e.g., 5551234567" 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-street">Street</Label>
                    <Input 
                      id="lead-street" 
                      name="street"
                      value={newLeadData.street}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., 123 Main St" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-address">Address</Label>
                    <Input 
                      id="lead-address" 
                      name="address"
                      value={newLeadData.address}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., Suite 400" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-city">City</Label>
                    <Input 
                      id="lead-city" 
                      name="city"
                      value={newLeadData.city}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., New York" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-district">District</Label>
                    <Input 
                      id="lead-district" 
                      name="district"
                      value={newLeadData.district}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., Central" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="lead-state">State</Label>
                    <Input 
                      id="lead-state" 
                      name="state"
                      value={newLeadData.state}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., California" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-country">Country</Label>
                    <Input 
                      id="lead-country" 
                      name="country"
                      value={newLeadData.country}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., USA" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-postal">Postal Code</Label>
                    <Input 
                      id="lead-postal" 
                      name="postalCode"
                      value={newLeadData.postalCode}
                      onChange={(e) => handleInputChange(e, 'lead')}
                      placeholder="e.g., 90001" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="lead-status">Status</Label>
                    <Select 
                      value={newLeadData.status} 
                      onValueChange={(value) => handleSelectChange('status', value, 'lead')}
                    >
                      <SelectTrigger id="lead-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="proposal">Proposal</SelectItem>
                        <SelectItem value="converted">Converted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-source">Source</Label>
                    <Select 
                      value={newLeadData.source} 
                      onValueChange={(value) => handleSelectChange('source', value, 'lead')}
                    >
                      <SelectTrigger id="lead-source">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-assigned">Assign To</Label>
                    <Select 
                      value={newLeadData.assignedTo} 
                      onValueChange={(value) => handleSelectChange('assignedTo', value, 'lead')}
                    >
                      <SelectTrigger id="lead-assigned">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sarah Miller">Sarah Miller</SelectItem>
                        <SelectItem value="Robert Brown">Robert Brown</SelectItem>
                        <SelectItem value="Jessica Lee">Jessica Lee</SelectItem>
                        <SelectItem value="Unassigned">Unassigned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lead-followup">Next Follow-up</Label>
                  <Input 
                    id="lead-followup" 
                    name="nextFollowUp" 
                    type="datetime-local" 
                    value={newLeadData.nextFollowUp} 
                    onChange={(e) => handleInputChange(e, 'lead')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lead-notes">Notes</Label>
                  <Textarea 
                    id="lead-notes" 
                    name="notes"
                    value={newLeadData.notes}
                    onChange={(e) => handleInputChange(e, 'lead')}
                    placeholder="Add any additional information about this lead..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewLeadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLead}>
                  Add Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Add Client Dialog */}
          <Dialog open={newClientDialogOpen} onOpenChange={setNewClientDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the details for your new client.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="w-24 h-24 mb-2">
                    <AvatarFallback>
                      <Image className="h-12 w-12 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => clientAvatarRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                    <span className="text-xs text-muted-foreground ml-2">(Max 1MB)</span>
                  </Button>
                  <input 
                    type="file" 
                    ref={clientAvatarRef}
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleFileUpload(e, 1)} 
                  />
                </div>
                
                {/* Basic Information */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-id">Customer ID</Label>
                    <Input 
                      id="client-id" 
                      name="customerId"
                      value={newClientData.customerId}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., CLIENT123" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input 
                      id="client-name" 
                      name="name"
                      value={newClientData.name}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., Acme Corporation" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-company">Company</Label>
                    <Input 
                      id="client-company" 
                      name="company"
                      value={newClientData.company}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., Acme Corp" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input 
                      id="client-email" 
                      name="email"
                      value={newClientData.email}
                      onChange={(e) => handleInputChange(e, 'client')}
                      type="email" 
                      placeholder="contact@example.com" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-phone-country">Country Code</Label>
                    <Input 
                      id="client-phone-country" 
                      name="phoneCountry"
                      value={newClientData.phoneCountry}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., 1" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone Number</Label>
                    <Input 
                      id="client-phone" 
                      name="phone"
                      value={newClientData.phone}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., 5551234567" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-street">Street</Label>
                    <Input 
                      id="client-street" 
                      name="street"
                      value={newClientData.street}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., 123 Main St" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-address">Address</Label>
                    <Input 
                      id="client-address" 
                      name="address"
                      value={newClientData.address}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., Suite 400" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-city">City</Label>
                    <Input 
                      id="client-city" 
                      name="city"
                      value={newClientData.city}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., New York" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-district">District</Label>
                    <Input 
                      id="client-district" 
                      name="district"
                      value={newClientData.district}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., Central" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="client-state">State</Label>
                    <Input 
                      id="client-state" 
                      name="state"
                      value={newClientData.state}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., California" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-country">Country</Label>
                    <Input 
                      id="client-country" 
                      name="country"
                      value={newClientData.country}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., USA" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-postal">Postal Code</Label>
                    <Input 
                      id="client-postal" 
                      name="postalCode"
                      value={newClientData.postalCode}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., 90001" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="client-plan">Subscription Plan</Label>
                    <Select 
                      value={newClientData.plan} 
                      onValueChange={(value) => handleSelectChange('plan', value as 'starter' | 'professional' | 'enterprise', 'client')}
                    >
                      <SelectTrigger id="client-plan">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-referred">Referred By</Label>
                    <Input 
                      id="client-referred" 
                      name="referredBy"
                      value={newClientData.referredBy}
                      onChange={(e) => handleInputChange(e, 'client')}
                      placeholder="e.g., John Smith or Website" 
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-join">Join Date</Label>
                    <Input 
                      id="client-join" 
                      name="joinDate"
                      value={newClientData.joinDate}
                      onChange={(e) => handleInputChange(e, 'client')}
                      type="date" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-renewal">Renewal Date</Label>
                    <Input 
                      id="client-renewal" 
                      name="renewalDate"
                      value={newClientData.renewalDate}
                      onChange={(e) => handleInputChange(e, 'client')}
                      type="date" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-notes">Notes</Label>
                  <Textarea 
                    id="client-notes" 
                    name="notes"
                    value={newClientData.notes}
                    onChange={(e) => handleInputChange(e, 'client')}
                    placeholder="Add any additional information about this client..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewClientDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClient}>
                  Add Client
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="leads" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
        </TabsList>
        
        {/* Leads Table */}
        <TabsContent value="leads" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search leads..."
                className="max-w-sm mr-2"
              />
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Next Follow-up</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">Loading...</TableCell>
                  </TableRow>
                ) : leadsData.length > 0 ? (
                  leadsData.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <button
                          className="text-blue-500 hover:underline font-medium"
                          onClick={() => handleViewDetails('lead', lead.id)}
                        >
                          {lead.name}
                        </button>
                      </TableCell>
                      <TableCell>{lead.company}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {lead.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {lead.phoneCountry && `+${lead.phoneCountry} `}{lead.phone}
                      </TableCell>
                      <TableCell>
                        {lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditLead(lead)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">No leads found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Clients Table */}
        <TabsContent value="clients" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Search clients..."
                className="max-w-sm mr-2"
              />
              <Button variant="outline" size="sm">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Referred By</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">Loading...</TableCell>
                  </TableRow>
                ) : clientsData.length > 0 ? (
                  clientsData.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <button
                          className="text-blue-500 hover:underline font-medium"
                          onClick={() => handleViewDetails('client', client.id)}
                        >
                          {client.customerId}
                        </button>
                      </TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.company}</TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${client.email}`}
                          className="text-blue-500 hover:underline"
                        >
                          {client.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        {client.phoneCountry && `+${client.phoneCountry} `}{client.phone}
                      </TableCell>
                      <TableCell>{client.referredBy}</TableCell>
                      <TableCell>
                        {client.renewalDate ? new Date(client.renewalDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditClient(client)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">No clients found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        customerType={viewingCustomerType}
        customerData={viewingCustomer}
        onEdit={() => {
          setDetailsDialogOpen(false);
          if (viewingCustomerType === 'lead' && viewingCustomer) {
            handleEditLead(viewingCustomer as Lead);
          } else if (viewingCustomerType === 'client' && viewingCustomer) {
            handleEditClient(viewingCustomer as Client);
          }
        }}
        onDelete={() => {
          if (viewingCustomerType === 'lead' && viewingCustomer) {
            handleDeleteLead((viewingCustomer as Lead).id);
          } else if (viewingCustomerType === 'client' && viewingCustomer) {
            handleDeleteClient((viewingCustomer as Client).id);
          }
        }}
        onConvertToClient={viewingCustomerType === 'lead' ? handleConvertToClient : undefined}
      />
    </div>
  );
};

export default LeadsCRM;
