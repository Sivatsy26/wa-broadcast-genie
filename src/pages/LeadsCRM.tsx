import React, { useState, useEffect } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, Users, FileSpreadsheet, Phone, Mail, Calendar, MapPin, Building, Flag } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import CustomerDetailsModal from "@/components/CustomerDetailsModal";
import { 
  createTableIfNotExists, 
  fetchLeadsData, 
  fetchClientsData,
  addLeadToSupabase,
  addClientToSupabase,
  deleteLeadFromSupabase,
  deleteClientFromSupabase,
  updateLeadInSupabase
} from "@/utils/supabaseUtils";
import { subscribeToTable } from "@/utils/supabaseHelpers";
import { Lead, Client } from "@/types/customer"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CountryCodeSelect } from "@/components/ui/country-code-select";
import { ImageUpload } from "@/components/ui/image-upload";

const LeadsCRM = () => {
  const [activeTab, setActiveTab] = useState("leads");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form state for adding a new lead/client
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    phoneCountry: '1', // Default to US
    city: '',
    street: '',
    district: '',
    state: '',
    postalCode: '',
    country: 'USA',
    source: 'website',
    assignedTo: 'Jane Smith',
    status: 'new',
    plan: 'starter',
    referredBy: '',
    avatar: '',
    nextFollowUp: '',
    customerId: '',
    notes: '',
    joinDate: '',
    renewalDate: '',
  });

  // State for customer details modal
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Lead | Client | null>(null);

  // Mock data for leads and clients
  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'ABC Corp',
      email: 'john@abccorp.com',
      phone: '555-1234',
      phoneCountry: '1',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      source: 'Website',
      status: 'new',
      assignedTo: 'Jane Smith',
      notes: 'Interested in our enterprise plan',
      created: new Date(2025, 3, 15).toISOString(),
      nextFollowUp: new Date(2025, 5, 20).toISOString(),
    },
    {
      id: '2',
      name: 'Alice Johnson',
      company: 'Tech Solutions',
      email: 'alice@techsolutions.com',
      phone: '555-5678',
      phoneCountry: '1',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      source: 'Referral',
      status: 'contacted',
      assignedTo: 'Bob Williams',
      created: new Date(2025, 4, 1).toISOString(),
      nextFollowUp: new Date(2025, 5, 15).toISOString(),
    },
  ];

  const mockClients: Client[] = [
    {
      id: '101',
      customerId: 'CLIENT001',
      name: 'Acme Industries',
      company: 'Acme Industries',
      email: 'contact@acme.com',
      phone: '555-9876',
      phoneCountry: '1',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      plan: 'professional',
      referredBy: 'Partner Network',
      created: new Date(2025, 1, 10).toISOString(),
      joinDate: new Date(2025, 1, 15).toISOString(),
      renewalDate: new Date(2026, 1, 15).toISOString(),
    },
    {
      id: '102',
      customerId: 'CLIENT002',
      name: 'Global Services',
      company: 'Global Services Inc',
      email: 'info@globalservices.com',
      phone: '555-4321',
      phoneCountry: '1',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      plan: 'enterprise',
      created: new Date(2024, 11, 5).toISOString(),
      joinDate: new Date(2024, 11, 10).toISOString(),
      renewalDate: new Date(2025, 11, 10).toISOString(),
    },
  ];

  useEffect(() => {
    const initializeApp = async () => {
      console.info('Checking if leads table exists...');
      await createTableIfNotExists('bot_flows', {
        id: 'uuid primary key',
        name: 'text not null',
        keywords: 'text[]',
        flow_data: 'jsonb',
        // Add other fields as needed
      });

      console.info('Checking if clients table exists...');
      await createTableIfNotExists('clients', {
        id: 'uuid primary key',
        customerId: 'text not null',
        name: 'text not null',
        // Add other fields as needed
      });

      // Fetch data
      await fetchData();
      setIsLoading(false);
    };

    initializeApp();

    // Subscribe to real-time updates for leads and clients
    const leadsUnsubscribe = subscribeToTable('bot_flows', '*', (payload) => {
      // Only refresh if it's a lead-related update (check keywords)
      if ((payload.new && Array.isArray(payload.new.keywords) && payload.new.keywords.includes('lead')) || 
          (payload.old && Array.isArray(payload.old.keywords) && payload.old.keywords.includes('lead'))) {
        console.log('Real-time lead update received:', payload);
        fetchData();
        
        // Show toast notification
        if (payload.eventType === 'INSERT') {
          toast.info('New lead added');
        } else if (payload.eventType === 'UPDATE') {
          toast.info('Lead updated');
        } else if (payload.eventType === 'DELETE') {
          toast.info('Lead removed');
        }
      }
    });
    
    const clientsUnsubscribe = subscribeToTable('bot_flows', '*', (payload) => {
      // Only refresh if it's a client-related update (check keywords)
      if ((payload.new && Array.isArray(payload.new.keywords) && payload.new.keywords.includes('client')) || 
          (payload.old && Array.isArray(payload.old.keywords) && payload.old.keywords.includes('client'))) {
        console.log('Real-time client update received:', payload);
        fetchData();
        
        // Show toast notification
        if (payload.eventType === 'INSERT') {
          toast.info('New client added');
        } else if (payload.eventType === 'UPDATE') {
          toast.info('Client updated');
        } else if (payload.eventType === 'DELETE') {
          toast.info('Client removed');
        }
      }
    });

    return () => {
      leadsUnsubscribe();
      clientsUnsubscribe();
    };
  }, []);

  const fetchData = async () => {
    // Use our utility functions to fetch data and handle fallbacks
    const leadsData = await fetchLeadsData(mockLeads);
    const clientsData = await fetchClientsData(mockClients);

    setLeads(leadsData);
    setClients(clientsData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCustomer = async () => {
    try {
      if (activeTab === "leads") {
        const newLead: Lead = {
          id: uuidv4(),
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          phoneCountry: formData.phoneCountry,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          source: formData.source,
          status: formData.status as Lead['status'],
          assignedTo: formData.assignedTo,
          created: new Date().toISOString(),
          nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
        };

        // Try to add to Supabase
        await addLeadToSupabase(newLead);

        // Update local state regardless of Supabase operation result
        setLeads([...leads, newLead]);
        toast.success("New lead added successfully!");
      } else {
        const newClient: Client = {
          id: uuidv4(),
          customerId: `CLIENT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          phoneCountry: formData.phoneCountry,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          plan: formData.plan as Client['plan'],
          referredBy: formData.referredBy,
          created: new Date().toISOString(),
          joinDate: new Date().toISOString(),
          renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
        };

        // Try to add to Supabase
        await addClientToSupabase(newClient);

        // Update local state regardless of Supabase operation result
        setClients([...clients, newClient]);
        toast.success("New client added successfully!");
      }

      // Reset form and close dialog
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        phoneCountry: '1',
        city: '',
        street: '',
        district: '',
        state: '',
        postalCode: '',
        country: 'USA',
        source: 'website',
        assignedTo: 'Jane Smith',
        status: 'new',
        plan: 'starter',
        referredBy: '',
        avatar: '',
        nextFollowUp: '',
        customerId: '',
        notes: '',
        joinDate: '',
        renewalDate: '',
      });
      setAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding customer:', error);
      toast.error(`Failed to add ${activeTab === "leads" ? "lead" : "client"}`);
    }
  };

  const handleDeleteCustomer = async () => {
    if (!selectedCustomer) return;

    try {
      if (activeTab === "leads") {
        const leadToDelete = selectedCustomer as Lead;
        
        // Try to delete from Supabase
        await deleteLeadFromSupabase(leadToDelete.id);

        // Update local state regardless of Supabase operation result
        setLeads(leads.filter(lead => lead.id !== leadToDelete.id));
        toast.success("Lead deleted successfully!");
      } else {
        const clientToDelete = selectedCustomer as Client;
        
        // Try to delete from Supabase
        await deleteClientFromSupabase(clientToDelete.id);

        // Update local state regardless of Supabase operation result
        setClients(clients.filter(client => client.id !== clientToDelete.id));
        toast.success("Client deleted successfully!");
      }

      setSelectedCustomer(null);
      setDetailsModalOpen(false);
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast.error(`Failed to delete ${activeTab === "leads" ? "lead" : "client"}`);
    }
  };

  const handleEditCustomer = () => {
    // For now, just show a toast notification
    toast.info("Edit functionality will be implemented soon");
    setDetailsModalOpen(false);
  };

  const handleConvertToClient = async (leadData: Lead, clientData: any) => {
    try {
      // Create new client from lead data
      const newClient: Client = {
        id: uuidv4(),
        customerId: clientData.customerId,
        name: leadData.name,
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        phoneCountry: leadData.phoneCountry,
        city: leadData.city,
        state: leadData.state,
        country: leadData.country,
        plan: clientData.plan as Client['plan'],
        referredBy: clientData.referredBy,
        joinDate: clientData.joinDate,
        renewalDate: clientData.renewalDate,
        created: new Date().toISOString(),
      };

      // Update lead status to converted
      const updatedLead: Lead = {
        ...leadData,
        status: 'converted'
      };

      // Try to update lead in Supabase
      await updateLeadInSupabase(updatedLead);
      
      // Try to add new client to Supabase
      await addClientToSupabase(newClient);

      // Update local state
      setLeads(leads.map(lead => lead.id === leadData.id ? updatedLead : lead));
      setClients([...clients, newClient]);

      toast.success("Lead converted to client successfully!");
    } catch (error) {
      console.error('Error converting lead to client:', error);
      toast.error("Failed to convert lead to client");
    }
  };

  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    return lead.name?.toLowerCase().includes(query) || 
           lead.company?.toLowerCase().includes(query) || 
           lead.email?.toLowerCase().includes(query);
  });

  const filteredClients = clients.filter(client => {
    const query = searchQuery.toLowerCase();
    return client.name?.toLowerCase().includes(query) || 
           client.company?.toLowerCase().includes(query) || 
           client.email?.toLowerCase().includes(query) || 
           client.customerId?.toLowerCase().includes(query);
  });

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Manage your leads and clients</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add {activeTab === "leads" ? "Lead" : "Client"}
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="leads" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="leads" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Clients
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
              <CardDescription>
                Manage your sales pipeline and track lead progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">Loading...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No leads found. Add your first lead to get started.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Next Follow-up</TableHead>
                        <TableHead>Assigned To</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} onClick={() => {
                          setSelectedCustomer(lead);
                          setDetailsModalOpen(true);
                        }} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.company}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                              {lead.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                              {lead.phoneCountry && `+${lead.phoneCountry}`} {lead.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString() : 'N/A'}
                            </div>
                          </TableCell>
                          <TableCell>{lead.assignedTo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Clients</CardTitle>
              <CardDescription>
                Manage your existing clients and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">Loading...</div>
              ) : filteredClients.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No clients found. Add your first client to get started.
                </div>
              ) : (
                <div className="rounded-md border">
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id} onClick={() => {
                          setSelectedCustomer(client);
                          setDetailsModalOpen(true);
                        }} className="cursor-pointer hover:bg-muted/50">
                          <TableCell className="font-medium">{client.customerId}</TableCell>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.company}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                              {client.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                              {client.phoneCountry && `+${client.phoneCountry}`} {client.phone}
                            </div>
                          </TableCell>
                          <TableCell>{client.referredBy || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {client.renewalDate ? new Date(client.renewalDate).toLocaleDateString() : 'N/A'}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Customer Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {activeTab === "leads" ? "Lead" : "Client"}</DialogTitle>
            <DialogDescription>
              Enter the details for the new {activeTab === "leads" ? "lead" : "client"} below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ImageUpload 
              value={formData.avatar}
              onChange={(value) => handleSelectChange('avatar', value)}
              className="mb-4"
            />
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <div className="col-span-3 flex gap-2">
                <div className="w-24">
                  <CountryCodeSelect
                    value={formData.phoneCountry}
                    onValueChange={(value) => handleSelectChange('phoneCountry', value)}
                  />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="street" className="text-right">
                Street
              </Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="district" className="text-right">
                District
              </Label>
              <Input
                id="district"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state" className="text-right">
                State
              </Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right">
                Postal Code
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            {activeTab === "leads" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="source" className="text-right">
                    Source
                  </Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => handleSelectChange('source', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="cold_call">Cold Call</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="assignedTo" className="text-right">
                    Assigned To
                  </Label>
                  <Select
                    value={formData.assignedTo}
                    onValueChange={(value) => handleSelectChange('assignedTo', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Bob Williams">Bob Williams</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nextFollowUp" className="text-right">
                    Next Follow-up
                  </Label>
                  <Input
                    id="nextFollowUp"
                    name="nextFollowUp"
                    type="date"
                    value={formData.nextFollowUp?.split('T')[0] || ''}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}

            {activeTab === "clients" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customerId" className="text-right">
                    Customer ID
                  </Label>
                  <Input
                    id="customerId"
                    name="customerId"
                    value={formData.customerId || `CLIENT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan" className="text-right">
                    Plan
                  </Label>
                  <Select
                    value={formData.plan}
                    onValueChange={(value) => handleSelectChange('plan', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="referredBy" className="text-right">
                    Referred By
                  </Label>
                  <Input
                    id="referredBy"
                    name="referredBy"
                    value={formData.referredBy}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="joinDate" className="text-right">
                    Join Date
                  </Label>
                  <Input
                    id="joinDate"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate?.split('T')[0] || new Date().toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="renewalDate" className="text-right">
                    Renewal Date
                  </Label>
                  <Input
                    id="renewalDate"
                    name="renewalDate"
                    type="date"
                    value={formData.renewalDate?.split('T')[0] || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes || ""}
                  onChange={(e) => handleSelectChange('notes', e.target.value)}
                  placeholder="Add notes here..."
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleAddCustomer}>Add {activeTab === "leads" ? "Lead" : "Client"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          customerType={activeTab === "leads" ? "lead" : "client"}
          customerData={selectedCustomer}
          onEdit={handleEditCustomer}
          onDelete={handleDeleteCustomer}
          onConvertToClient={activeTab === "leads" ? handleConvertToClient : undefined}
        />
      )}
    </div>
  );
};

export default LeadsCRM;
