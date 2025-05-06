
import React, { useState, useRef } from 'react';
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

interface Lead {
  id: string;
  customerId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  street: string;
  address: string;
  area: string;
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
  street: string;
  address: string;
  area: string;
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

const leads: Lead[] = [
  {
    id: '1',
    customerId: 'LEAD001',
    name: 'Michael Johnson',
    company: 'Acme Corp',
    email: 'michael@acmecorp.com',
    phone: '5551234567',
    street: '123 Main St',
    address: 'Suite 400',
    area: 'Downtown',
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
    customerId: 'LEAD002',
    name: 'Jennifer Lee',
    company: 'Tech Solutions Inc',
    email: 'jennifer@techsolutions.com',
    phone: '5559876543',
    street: '456 Tech Ave',
    address: 'Floor 3',
    area: 'Tech District',
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
    customerId: 'LEAD003',
    name: 'David Wilson',
    company: 'Global Enterprises',
    email: 'david@globalenterprises.com',
    phone: '5552223344',
    street: '789 Business Rd',
    address: 'Level 22',
    area: 'Uptown',
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
    customerId: 'LEAD004',
    name: 'Linda Davis',
    company: 'Sunrise Technologies',
    email: 'linda@sunrisetech.com',
    phone: '5554445566',
    street: '321 Innovation Ln',
    address: 'Suite 1000',
    area: 'Tech Park',
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
    customerId: 'LEAD005',
    name: 'Robert White',
    company: 'Pioneer Group',
    email: 'robert@pioneergp.com',
    phone: '5556667788',
    street: '987 Market St',
    address: 'Unit 50',
    area: 'Financial District',
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

const clients: Client[] = [
  {
    id: '1',
    customerId: 'CLIENT001',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '5551112233',
    street: '789 Corporate Blvd',
    address: 'Floor 15',
    area: 'Business District',
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
    phone: '5553334455',
    street: '456 Industrial Ave',
    address: 'Building A',
    area: 'Industrial Zone',
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
    phone: '5555556677',
    street: '123 Tech Rd',
    address: 'Suite 200',
    area: 'Technology Park',
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
    phone: '5557778899',
    street: '987 Commerce St',
    address: 'Level 10',
    area: 'Commercial Area',
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
    phone: '5559990011',
    street: '654 Innovation Blvd',
    address: 'Floor 5',
    area: 'Research Park',
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
  const [leadsData, setLeadsData] = useState(leads);
  const [clientsData, setClientsData] = useState(clients);
  const [editLeadDialogOpen, setEditLeadDialogOpen] = useState(false);
  const [editClientDialogOpen, setEditClientDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleAddLead = () => {
    toast({
      title: "Lead Added",
      description: "New lead has been added successfully.",
    });
    setNewLeadDialogOpen(false);
  };

  const handleAddClient = () => {
    toast({
      title: "Client Added",
      description: "New client has been added successfully.",
    });
    setNewClientDialogOpen(false);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setEditLeadDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setEditClientDialogOpen(true);
  };

  const handleDeleteLead = (leadId: string) => {
    setLeadsData(leadsData.filter((lead) => lead.id !== leadId));
    toast({
      title: "Lead Deleted",
      description: "Lead has been deleted successfully.",
    });
  };

  const handleDeleteClient = (clientId: string) => {
    setClientsData(clientsData.filter((client) => client.id !== clientId));
    toast({
      title: "Client Deleted",
      description: "Client has been deleted successfully.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="secondary">New</Badge>;
      case 'contacted':
        return <Badge variant="outline">Contacted</Badge>;
      case 'qualified':
        return <Badge>Qualified</Badge>;
      case 'proposal':
        return <Badge variant="ghost">Proposal</Badge>;
      case 'converted':
        return <Badge variant="success">Converted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'starter':
        return <Badge variant="secondary">Starter</Badge>;
      case 'professional':
        return <Badge>Professional</Badge>;
      case 'enterprise':
        return <Badge variant="success">Enterprise</Badge>;
      default:
        return <Badge>{plan}</Badge>;
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
                    <Label htmlFor="lead-id">Customer ID</Label>
                    <Input id="lead-id" placeholder="e.g., LEAD123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">Full Name</Label>
                    <Input id="lead-name" placeholder="e.g., John Smith" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-company">Company</Label>
                    <Input id="lead-company" placeholder="e.g., Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-email">Email</Label>
                    <Input id="lead-email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-phone">Phone</Label>
                    <Input id="lead-phone" placeholder="e.g., 5551234567 (no country code)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-street">Street</Label>
                    <Input id="lead-street" placeholder="e.g., 123 Main St" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-address">Address</Label>
                    <Input id="lead-address" placeholder="e.g., Suite 400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-area">Area</Label>
                    <Input id="lead-area" placeholder="e.g., Downtown" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="lead-district">District</Label>
                    <Input id="lead-district" placeholder="e.g., Central" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-state">State</Label>
                    <Input id="lead-state" placeholder="e.g., California" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-country">Country</Label>
                    <Input id="lead-country" placeholder="e.g., USA" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="lead-postal">Postal Code</Label>
                    <Input id="lead-postal" placeholder="e.g., 90001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-status">Status</Label>
                    <Select defaultValue="new">
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
                    <Select defaultValue="website">
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
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-assigned">Assign To</Label>
                    <Select defaultValue="sarah">
                      <SelectTrigger id="lead-assigned">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Miller</SelectItem>
                        <SelectItem value="robert">Robert Brown</SelectItem>
                        <SelectItem value="jessica">Jessica Lee</SelectItem>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-followup">Next Follow-up</Label>
                    <Input id="lead-followup" type="datetime-local" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lead-notes">Notes</Label>
                  <Textarea 
                    id="lead-notes" 
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
                    <Input id="client-id" placeholder="e.g., CLIENT123" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="e.g., Acme Corporation" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-company">Company</Label>
                    <Input id="client-company" placeholder="e.g., Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="contact@example.com" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone</Label>
                    <Input id="client-phone" placeholder="e.g., 5551234567 (no country code)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-street">Street</Label>
                    <Input id="client-street" placeholder="e.g., 123 Main St" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-address">Address</Label>
                    <Input id="client-address" placeholder="e.g., Suite 400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-area">Area</Label>
                    <Input id="client-area" placeholder="e.g., Downtown" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="client-district">District</Label>
                    <Input id="client-district" placeholder="e.g., Central" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-state">State</Label>
                    <Input id="client-state" placeholder="e.g., California" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-country">Country</Label>
                    <Input id="client-country" placeholder="e.g., USA" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="client-postal">Postal Code</Label>
                    <Input id="client-postal" placeholder="e.g., 90001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-plan">Subscription Plan</Label>
                    <Select defaultValue="starter">
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
                    <Input id="client-referred" placeholder="e.g., John Smith or Website" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-join">Join Date</Label>
                    <Input id="client-join" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-renewal">Renewal Date</Label>
                    <Input id="client-renewal" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-notes">Notes</Label>
                  <Textarea 
                    id="client-notes" 
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
                  <TableHead className="w-[50px]">
                    <Users className="h-4 w-4" />
                  </TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead>Next Follow-up</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadsData.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage src={lead.avatar || ""} alt={lead.name} />
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{lead.customerId}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.company}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell>{getStatusBadge(lead.status)}</TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>{new Date(lead.created).toLocaleDateString()}</TableCell>
                    <TableCell>{lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'N/A'}</TableCell>
                    <TableCell>{lead.nextFollowUp ? new Date(lead.nextFollowUp).toLocaleDateString() : 'N/A'}</TableCell>
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
                ))}
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
                  <TableHead className="w-[50px]">
                    <Users className="h-4 w-4" />
                  </TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Referred By</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Renewal Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientsData.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <Avatar>
                        <AvatarImage src={client.avatar || ""} alt={client.name} />
                        <AvatarFallback>
                          <Users className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{client.customerId}</TableCell>
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
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>{getPlanBadge(client.plan)}</TableCell>
                    <TableCell>{client.referredBy}</TableCell>
                    <TableCell>{new Date(client.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(client.renewalDate).toLocaleDateString()}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadsCRM;
