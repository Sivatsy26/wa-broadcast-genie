
import React, { useState } from 'react';
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
  DialogClose,
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
  Plus,
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
  BarChart3,
  Upload,
  Edit,
  Trash2,
  ClipboardList,
  Clock,
  CalendarCheck,
  Briefcase,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from '@/components/ui/progress';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted';
  source: string;
  created: string;
  lastContact: string;
  nextFollowUp: string;
  assignedTo: string;
}

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  plan: 'starter' | 'professional' | 'enterprise';
  referredBy: string;
  joinDate: string;
  renewalDate: string;
}

const leads: Lead[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    company: 'Acme Corp',
    email: 'michael@acmecorp.com',
    phone: '+1 (555) 123-4567',
    status: 'qualified',
    source: 'Website',
    created: '2023-06-10T14:30:00Z',
    lastContact: '2023-06-15T09:45:00Z',
    nextFollowUp: '2023-06-22T10:00:00Z',
    assignedTo: 'Sarah Miller',
  },
  {
    id: '2',
    name: 'Jennifer Lee',
    company: 'Tech Solutions Inc',
    email: 'jennifer@techsolutions.com',
    phone: '+1 (555) 987-6543',
    status: 'contacted',
    source: 'LinkedIn',
    created: '2023-06-12T11:20:00Z',
    lastContact: '2023-06-14T15:30:00Z',
    nextFollowUp: '2023-06-21T14:00:00Z',
    assignedTo: 'Robert Brown',
  },
  {
    id: '3',
    name: 'David Wilson',
    company: 'Global Industries',
    email: 'david@globalind.com',
    phone: '+1 (555) 456-7890',
    status: 'new',
    source: 'Referral',
    created: '2023-06-16T09:00:00Z',
    lastContact: '',
    nextFollowUp: '2023-06-20T11:30:00Z',
    assignedTo: 'Unassigned',
  },
  {
    id: '4',
    name: 'Emily Parker',
    company: 'Parker Designs',
    email: 'emily@parkerdesigns.com',
    phone: '+1 (555) 789-0123',
    status: 'proposal',
    source: 'Trade Show',
    created: '2023-06-05T16:45:00Z',
    lastContact: '2023-06-18T13:15:00Z',
    nextFollowUp: '2023-06-24T15:30:00Z',
    assignedTo: 'Sarah Miller',
  },
  {
    id: '5',
    name: 'Robert Chen',
    company: 'Innovate Solutions',
    email: 'robert@innovatesol.com',
    phone: '+1 (555) 234-5678',
    status: 'converted',
    source: 'Google Ads',
    created: '2023-05-28T10:30:00Z',
    lastContact: '2023-06-17T11:45:00Z',
    nextFollowUp: '',
    assignedTo: 'Robert Brown',
  },
];

const clients: Client[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    company: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '+1 (555) 111-2233',
    plan: 'professional',
    referredBy: 'Trade Show',
    joinDate: '2023-01-15T00:00:00Z',
    renewalDate: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Global Enterprises',
    company: 'Global Ent',
    email: 'info@globalent.com',
    phone: '+1 (555) 444-5555',
    plan: 'enterprise',
    referredBy: 'Website',
    joinDate: '2023-03-10T00:00:00Z',
    renewalDate: '2024-03-10T00:00:00Z',
  },
  {
    id: '3',
    name: 'Tech Innovations',
    company: 'Tech Innovations Ltd',
    email: 'contact@techinnovations.com',
    phone: '+1 (555) 777-8888',
    plan: 'starter',
    referredBy: 'Robert Chen',
    joinDate: '2023-05-20T00:00:00Z',
    renewalDate: '2024-05-20T00:00:00Z',
  },
];

const LeadsCRM = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('leads');
  const [newLeadDialogOpen, setNewLeadDialogOpen] = useState(false);
  const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);
  
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadDetailsOpen, setLeadDetailsOpen] = useState(false);
  const [editLeadDialogOpen, setEditLeadDialogOpen] = useState(false);
  const [followUpDialogOpen, setFollowUpDialogOpen] = useState(false);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [notesDialogOpen, setNotesDialogOpen] = useState(false);
  const [moveToClientDialogOpen, setMoveToClientDialogOpen] = useState(false);
  const [deleteLeadDialogOpen, setDeleteLeadDialogOpen] = useState(false);
  
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientDetailsOpen, setClientDetailsOpen] = useState(false);
  const [editClientDialogOpen, setEditClientDialogOpen] = useState(false);
  const [clientMessageDialogOpen, setClientMessageDialogOpen] = useState(false);
  const [manageSubscriptionDialogOpen, setManageSubscriptionDialogOpen] = useState(false);
  const [deleteClientDialogOpen, setDeleteClientDialogOpen] = useState(false);

  const handleAddLead = () => {
    toast({
      title: "New lead added",
      description: "Lead has been successfully added to your CRM",
    });
    setNewLeadDialogOpen(false);
  };

  const handleAddClient = () => {
    toast({
      title: "New client added",
      description: "Client has been successfully added to your CRM",
    });
    setNewClientDialogOpen(false);
  };

  const viewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setLeadDetailsOpen(true);
  };
  
  const viewClientDetails = (client: Client) => {
    setSelectedClient(client);
    setClientDetailsOpen(true);
  };

  const handleEditLead = () => {
    toast({
      title: "Lead updated",
      description: "Lead information has been successfully updated",
    });
    setEditLeadDialogOpen(false);
  };

  const handleScheduleFollowUp = () => {
    toast({
      title: "Follow-up scheduled",
      description: "A follow-up has been scheduled for this lead",
    });
    setFollowUpDialogOpen(false);
  };

  const handleSendMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
    setMessageDialogOpen(false);
  };

  const handleAddNote = () => {
    toast({
      title: "Note added",
      description: "Your note has been added to this lead",
    });
    setNotesDialogOpen(false);
  };

  const handleMoveToClient = () => {
    if (selectedLead) {
      toast({
        title: "Lead converted to client",
        description: `${selectedLead.name} has been successfully converted to a client`,
      });
      setMoveToClientDialogOpen(false);
      // In a real application, this would update the database
    }
  };

  const handleDeleteLead = () => {
    if (selectedLead) {
      toast({
        title: "Lead deleted",
        description: `${selectedLead.name} has been successfully deleted`,
      });
      setDeleteLeadDialogOpen(false);
      setLeadDetailsOpen(false);
      // In a real application, this would update the database
    }
  };
  
  const handleEditClient = () => {
    toast({
      title: "Client updated",
      description: "Client information has been successfully updated",
    });
    setEditClientDialogOpen(false);
  };
  
  const handleClientMessage = () => {
    toast({
      title: "Message sent",
      description: "Your message has been sent to the client",
    });
    setClientMessageDialogOpen(false);
  };
  
  const handleManageSubscription = () => {
    toast({
      title: "Subscription updated",
      description: "The client's subscription has been updated",
    });
    setManageSubscriptionDialogOpen(false);
  };
  
  const handleDeleteClient = () => {
    if (selectedClient) {
      toast({
        title: "Client deleted",
        description: `${selectedClient.name} has been successfully deleted`,
      });
      setDeleteClientDialogOpen(false);
      setClientDetailsOpen(false);
      // In a real application, this would update the database
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">New</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50">Contacted</Badge>;
      case 'qualified':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Qualified</Badge>;
      case 'proposal':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-50">Proposal</Badge>;
      case 'converted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Converted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'starter':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Starter</Badge>;
      case 'professional':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">Professional</Badge>;
      case 'enterprise':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Enterprise</Badge>;
      default:
        return <Badge variant="outline">{plan}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads & Clients</h1>
          <p className="text-muted-foreground">
            Manage your leads and clients in one place
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={newLeadDialogOpen} onOpenChange={setNewLeadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the details for your new lead.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-name">Full Name</Label>
                    <Input id="lead-name" placeholder="e.g., John Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-company">Company</Label>
                    <Input id="lead-company" placeholder="e.g., Acme Corp" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lead-email">Email</Label>
                    <Input id="lead-email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lead-phone">Phone</Label>
                    <Input id="lead-phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
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
          
          <Dialog open={newClientDialogOpen} onOpenChange={setNewClientDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>
                  Enter the details for your new client.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="e.g., Acme Corporation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-company">Company</Label>
                    <Input id="client-company" placeholder="e.g., Acme Corp" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="client-email">Email</Label>
                    <Input id="client-email" type="email" placeholder="contact@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client-phone">Phone</Label>
                    <Input id="client-phone" placeholder="+1 (555) 123-4567" />
                  </div>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
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

      <Tabs defaultValue="leads" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="leads" className="relative">
              Leads
              <span className="ml-1 text-xs text-foreground/70">{leads.length}</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="relative">
              Clients
              <span className="ml-1 text-xs text-foreground/70">{clients.length}</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <TabsContent value="leads">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle>All Leads</CardTitle>
                  <CardDescription>
                    View and manage all your leads
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal">Proposal</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Next Follow-up</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div 
                            className="font-medium cursor-pointer hover:text-primary hover:underline"
                            onClick={() => viewLeadDetails(lead)}
                          >
                            {lead.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{lead.email}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {lead.assignedTo !== 'Unassigned' ? (
                              <>
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
                                  {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm">{lead.assignedTo}</span>
                              </>
                            ) : (
                              <span className="text-sm text-muted-foreground">Unassigned</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {lead.nextFollowUp ? (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(lead.nextFollowUp).toLocaleDateString()}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedLead(lead);
                                setEditLeadDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedLead(lead);
                                setMoveToClientDialogOpen(true);
                              }}
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500"
                              onClick={() => {
                                setSelectedLead(lead);
                                setDeleteLeadDialogOpen(true);
                              }}
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle>All Clients</CardTitle>
                  <CardDescription>
                    View and manage all your clients
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Referred By</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Renewal</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div 
                            className="font-medium cursor-pointer hover:text-primary hover:underline"
                            onClick={() => viewClientDetails(client)}
                          >
                            {client.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{client.company}</div>
                        </TableCell>
                        <TableCell>{getPlanBadge(client.plan)}</TableCell>
                        <TableCell>
                          <div className="text-sm">{client.email}</div>
                          <div className="text-xs text-muted-foreground">{client.phone}</div>
                        </TableCell>
                        <TableCell>{client.referredBy}</TableCell>
                        <TableCell>
                          {new Date(client.joinDate).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(client.renewalDate).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedClient(client);
                                setEditClientDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedClient(client);
                                setManageSubscriptionDialogOpen(true);
                              }}
                            >
                              <Briefcase className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-red-500"
                              onClick={() => {
                                setSelectedClient(client);
                                setDeleteClientDialogOpen(true);
                              }}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Lead Details Dialog */}
      <Dialog open={leadDetailsOpen} onOpenChange={setLeadDetailsOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedLead.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge(selectedLead.status)}
                <span className="text-sm text-muted-foreground">
                  Created on {new Date(selectedLead.created).toLocaleDateString()}
                </span>
              </div>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedLead.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Lead Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Source: {selectedLead.source}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Last Contact: {selectedLead.lastContact ? new Date(selectedLead.lastContact).toLocaleDateString() : 'Never'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Next Follow-up: {selectedLead.nextFollowUp ? new Date(selectedLead.nextFollowUp).toLocaleString() : 'Not scheduled'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Assigned To</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {selectedLead.assignedTo !== 'Unassigned'
                          ? selectedLead.assignedTo.split(' ').map(n => n[0]).join('')
                          : '?'}
                      </div>
                      <span>{selectedLead.assignedTo}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="justify-start" 
                        onClick={() => {
                          setFollowUpDialogOpen(true);
                          setLeadDetailsOpen(false);
                        }}
                      >
                        <CalendarCheck className="mr-2 h-4 w-4" />
                        Schedule Follow-up
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => {
                          setMessageDialogOpen(true);
                          setLeadDetailsOpen(false);
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => {
                          setNotesDialogOpen(true);
                          setLeadDetailsOpen(false);
                        }}
                      >
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Add Notes
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => {
                          setMoveToClientDialogOpen(true);
                          setLeadDetailsOpen(false);
                        }}
                      >
                        <UserCheck className="mr-2 h-4 w-4" />
                        Convert to Client
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Pipeline Progress</h3>
                  <span className="text-xs text-muted-foreground">
                    {['new', 'contacted', 'qualified', 'proposal', 'converted'].indexOf(selectedLead.status) + 1}/5
                  </span>
                </div>
                <Progress 
                  className="h-2" 
                  value={(((['new', 'contacted', 'qualified', 'proposal', 'converted'].indexOf(selectedLead.status) + 1) / 5) * 100)} 
                />
              </div>
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setEditLeadDialogOpen(true);
                  setLeadDetailsOpen(false);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Lead
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setDeleteLeadDialogOpen(true);
                  setLeadDetailsOpen(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Client Details Dialog */}
      <Dialog open={clientDetailsOpen} onOpenChange={setClientDetailsOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">{selectedClient.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                {getPlanBadge(selectedClient.plan)}
                <span className="text-sm text-muted-foreground">
                  Client since {new Date(selectedClient.joinDate).toLocaleDateString()}
                </span>
              </div>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedClient.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Subscription Details</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Plan: {selectedClient.plan.charAt(0).toUpperCase() + selectedClient.plan.slice(1)}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Renewal Date: {new Date(selectedClient.renewalDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-4 h-4 mt-0.5">
                          <UserPlus className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span>Referred By: {selectedClient.referredBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => {
                          setManageSubscriptionDialogOpen(true);
                          setClientDetailsOpen(false);
                        }}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        Manage Subscription
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={() => {
                          setClientMessageDialogOpen(true);
                          setClientDetailsOpen(false);
                        }}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={() => {
                  setEditClientDialogOpen(true);
                  setClientDetailsOpen(false);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Client
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setDeleteClientDialogOpen(true);
                  setClientDetailsOpen(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Client
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Edit Lead Dialog */}
      <Dialog open={editLeadDialogOpen} onOpenChange={setEditLeadDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Lead</DialogTitle>
              <DialogDescription>
                Update information for {selectedLead.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-name">Full Name</Label>
                  <Input id="edit-lead-name" defaultValue={selectedLead.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-company">Company</Label>
                  <Input id="edit-lead-company" defaultValue={selectedLead.company} />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-email">Email</Label>
                  <Input id="edit-lead-email" type="email" defaultValue={selectedLead.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-phone">Phone</Label>
                  <Input id="edit-lead-phone" defaultValue={selectedLead.phone} />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-status">Status</Label>
                  <Select defaultValue={selectedLead.status}>
                    <SelectTrigger id="edit-lead-status">
                      <SelectValue />
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
                  <Label htmlFor="edit-lead-source">Source</Label>
                  <Input id="edit-lead-source" defaultValue={selectedLead.source} />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-lead-assigned">Assigned To</Label>
                  <Select defaultValue={selectedLead.assignedTo === 'Unassigned' ? 'unassigned' : 'assigned'}>
                    <SelectTrigger id="edit-lead-assigned">
                      <SelectValue />
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
                  <Label htmlFor="edit-lead-followup">Next Follow-up</Label>
                  <Input 
                    id="edit-lead-followup" 
                    type="datetime-local" 
                    defaultValue={selectedLead.nextFollowUp 
                      ? new Date(selectedLead.nextFollowUp).toISOString().slice(0, 16) 
                      : ''
                    } 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-lead-notes">Notes</Label>
                <Textarea 
                  id="edit-lead-notes" 
                  placeholder="Add any additional information about this lead..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditLeadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditLead}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Schedule Follow-Up Dialog */}
      <Dialog open={followUpDialogOpen} onOpenChange={setFollowUpDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Follow-Up</DialogTitle>
              <DialogDescription>
                Schedule a follow-up with {selectedLead.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="followup-date">Follow-up Date & Time</Label>
                <Input id="followup-date" type="datetime-local" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="followup-type">Follow-up Type</Label>
                <Select defaultValue="call">
                  <SelectTrigger id="followup-type">
                    <SelectValue placeholder="Select follow-up type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="followup-notes">Notes</Label>
                <Textarea 
                  id="followup-notes" 
                  placeholder="Add any notes about this follow-up..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setFollowUpDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleFollowUp}>
                Schedule Follow-up
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Send Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Send a message to {selectedLead.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="message-subject">Subject</Label>
                <Input id="message-subject" placeholder="Enter message subject" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message-content">Message</Label>
                <Textarea 
                  id="message-content" 
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Add Notes Dialog */}
      <Dialog open={notesDialogOpen} onOpenChange={setNotesDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Notes</DialogTitle>
              <DialogDescription>
                Add notes for {selectedLead.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="note-type">Note Type</Label>
                <Select defaultValue="general">
                  <SelectTrigger id="note-type">
                    <SelectValue placeholder="Select note type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Note</SelectItem>
                    <SelectItem value="call">Call Summary</SelectItem>
                    <SelectItem value="meeting">Meeting Notes</SelectItem>
                    <SelectItem value="email">Email Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note-content">Notes</Label>
                <Textarea 
                  id="note-content" 
                  placeholder="Type your notes here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setNotesDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>
                Add Note
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Move to Client Dialog */}
      <Dialog open={moveToClientDialogOpen} onOpenChange={setMoveToClientDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Convert to Client</DialogTitle>
              <DialogDescription>
                Convert {selectedLead.name} from a lead to a client
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
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
                <Label htmlFor="client-join">Join Date</Label>
                <Input id="client-join" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client-renewal">Renewal Date</Label>
                <Input 
                  id="client-renewal" 
                  type="date" 
                  defaultValue={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conversion-notes">Notes</Label>
                <Textarea 
                  id="conversion-notes" 
                  placeholder="Add any notes about this client conversion..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setMoveToClientDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMoveToClient}>
                <UserCheck className="mr-2 h-4 w-4" />
                Convert to Client
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Lead Dialog */}
      <Dialog open={deleteLeadDialogOpen} onOpenChange={setDeleteLeadDialogOpen}>
        {selectedLead && (
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Delete Lead</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedLead.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="delete-reason">Reason (Optional)</Label>
                <Select defaultValue="">
                  <SelectTrigger id="delete-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific reason</SelectItem>
                    <SelectItem value="duplicate">Duplicate lead</SelectItem>
                    <SelectItem value="invalid">Invalid information</SelectItem>
                    <SelectItem value="not-interested">Not interested</SelectItem>
                    <SelectItem value="gone-competitor">Gone with competitor</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteLeadDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteLead}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Lead
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Edit Client Dialog */}
      <Dialog open={editClientDialogOpen} onOpenChange={setEditClientDialogOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>
                Update information for {selectedClient.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-client-name">Client Name</Label>
                  <Input id="edit-client-name" defaultValue={selectedClient.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-client-company">Company</Label>
                  <Input id="edit-client-company" defaultValue={selectedClient.company} />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-client-email">Email</Label>
                  <Input id="edit-client-email" type="email" defaultValue={selectedClient.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-client-phone">Phone</Label>
                  <Input id="edit-client-phone" defaultValue={selectedClient.phone} />
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-client-referred">Referred By</Label>
                  <Input id="edit-client-referred" defaultValue={selectedClient.referredBy} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-client-join">Join Date</Label>
                  <Input 
                    id="edit-client-join" 
                    type="date" 
                    defaultValue={new Date(selectedClient.joinDate).toISOString().split('T')[0]} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-client-notes">Notes</Label>
                <Textarea 
                  id="edit-client-notes" 
                  placeholder="Add any additional information about this client..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditClientDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditClient}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Client Message Dialog */}
      <Dialog open={clientMessageDialogOpen} onOpenChange={setClientMessageDialogOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>
                Send a message to {selectedClient.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client-message-subject">Subject</Label>
                <Input id="client-message-subject" placeholder="Enter message subject" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client-message-content">Message</Label>
                <Textarea 
                  id="client-message-content" 
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setClientMessageDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleClientMessage}>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Manage Subscription Dialog */}
      <Dialog open={manageSubscriptionDialogOpen} onOpenChange={setManageSubscriptionDialogOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Manage Subscription</DialogTitle>
              <DialogDescription>
                Update subscription for {selectedClient.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="manage-plan">Subscription Plan</Label>
                <Select defaultValue={selectedClient.plan}>
                  <SelectTrigger id="manage-plan">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manage-renewal">Renewal Date</Label>
                <Input 
                  id="manage-renewal" 
                  type="date" 
                  defaultValue={new Date(selectedClient.renewalDate).toISOString().split('T')[0]} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manage-notes">Notes</Label>
                <Textarea 
                  id="manage-notes" 
                  placeholder="Add any notes about this subscription change..."
                  className="min-h-[80px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setManageSubscriptionDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleManageSubscription}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Client Dialog */}
      <Dialog open={deleteClientDialogOpen} onOpenChange={setDeleteClientDialogOpen}>
        {selectedClient && (
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>Delete Client</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedClient.name}? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="delete-client-reason">Reason (Optional)</Label>
                <Select defaultValue="">
                  <SelectTrigger id="delete-client-reason">
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific reason</SelectItem>
                    <SelectItem value="duplicate">Duplicate client</SelectItem>
                    <SelectItem value="gone-competitor">Gone with competitor</SelectItem>
                    <SelectItem value="out-of-business">Out of business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteClientDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteClient}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Client
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default LeadsCRM;
