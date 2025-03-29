
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Filter, 
  Eye, 
  MessageSquare, 
  AlertCircle,
  CheckCircle, 
  Clock, 
  Tag, 
  Users, 
  UserPlus, 
  PlusCircle, 
  Edit, 
  Trash2, 
  ArrowUpRight,
  Calendar,
  File,
  Link2,
  BarChart2,
  ChevronRight,
  XCircle,
  ArrowDownUp,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  assignedTo?: string;
  tags?: string[];
}

interface TicketComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    name: string;
    avatar?: string;
    role: string;
  };
  isInternal: boolean;
}

const tickets: Ticket[] = [
  {
    id: 'TICKET-1001',
    title: 'Unable to connect WhatsApp Business account',
    description: 'I\'m trying to connect my WhatsApp Business account but getting an authentication error. I\'ve verified my phone number multiple times but still facing issues.',
    status: 'open',
    priority: 'high',
    category: 'Account Setup',
    createdAt: '2023-06-20T10:30:00Z',
    updatedAt: '2023-06-20T10:30:00Z',
    customer: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 555-123-4567',
    },
    tags: ['authentication', 'whatsapp-connection'],
  },
  {
    id: 'TICKET-1002',
    title: 'Broadcast messages not being delivered',
    description: 'I scheduled a broadcast campaign yesterday but only about 60% of the messages were delivered. There were no error notifications.',
    status: 'in_progress',
    priority: 'medium',
    category: 'Broadcasts',
    createdAt: '2023-06-19T15:45:00Z',
    updatedAt: '2023-06-20T09:15:00Z',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 555-987-6543',
    },
    assignedTo: 'Robert Chen',
    tags: ['broadcast', 'delivery-issues'],
  },
  {
    id: 'TICKET-1003',
    title: 'Need help setting up a chatbot',
    description: 'I\'m new to the platform and looking for guidance on how to set up a chatbot for frequently asked questions. Can someone provide documentation or assistance?',
    status: 'resolved',
    priority: 'low',
    category: 'Chatbots',
    createdAt: '2023-06-18T11:20:00Z',
    updatedAt: '2023-06-19T14:30:00Z',
    customer: {
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1 555-456-7890',
    },
    assignedTo: 'Maria Lopez',
    tags: ['chatbot', 'onboarding', 'documentation'],
  },
  {
    id: 'TICKET-1004',
    title: 'Template approval taking too long',
    description: 'I submitted a message template for approval three days ago but haven\'t received any updates. This is delaying our marketing campaign launch.',
    status: 'open',
    priority: 'urgent',
    category: 'Templates',
    createdAt: '2023-06-17T09:00:00Z',
    updatedAt: '2023-06-17T09:00:00Z',
    customer: {
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1 555-789-0123',
    },
    tags: ['template', 'approval', 'urgent'],
  },
  {
    id: 'TICKET-1005',
    title: 'Billing question regarding subscription',
    description: 'I was charged twice for my monthly subscription. Can someone from the billing department look into this and provide a refund?',
    status: 'closed',
    priority: 'medium',
    category: 'Billing',
    createdAt: '2023-06-15T13:10:00Z',
    updatedAt: '2023-06-16T10:25:00Z',
    customer: {
      name: 'Lisa Wilson',
      email: 'lisa.wilson@example.com',
      phone: '+1 555-321-6547',
    },
    assignedTo: 'Sophia Williams',
    tags: ['billing', 'refund', 'subscription'],
  },
];

const ticketComments: TicketComment[] = [
  {
    id: '1',
    content: 'I\'ve investigated this issue and it appears to be related to the WhatsApp Business API rate limits. I\'ve increased your account limits and the broadcasts should now deliver correctly.',
    createdAt: '2023-06-20T09:15:00Z',
    user: {
      name: 'Robert Chen',
      role: 'Support Agent',
    },
    isInternal: false,
  },
  {
    id: '2',
    content: 'Checked the logs and confirmed this was a rate limiting issue. Customer was hitting the new account restrictions.',
    createdAt: '2023-06-20T09:10:00Z',
    user: {
      name: 'Robert Chen',
      role: 'Support Agent',
    },
    isInternal: true,
  },
  {
    id: '3',
    content: 'Thanks for looking into this. Can you tell me what I need to do to prevent this from happening with future campaigns?',
    createdAt: '2023-06-20T09:30:00Z',
    user: {
      name: 'Sarah Johnson',
      role: 'Customer',
    },
    isInternal: false,
  },
  {
    id: '4',
    content: 'I\'ve sent this to our tech team to see if we need to adjust anything on the backend. Will keep monitoring.',
    createdAt: '2023-06-20T09:35:00Z',
    user: {
      name: 'Robert Chen',
      role: 'Support Agent',
    },
    isInternal: true,
  },
];

const TicketManagement = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [isInternalComment, setIsInternalComment] = useState(false);
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleCreateTicket = () => {
    if (!ticketTitle) {
      toast({
        title: "Missing information",
        description: "Please provide a ticket title",
        variant: "destructive",
      });
      return;
    }

    if (!ticketDescription) {
      toast({
        title: "Missing information",
        description: "Please provide a ticket description",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ticket created",
      description: "Your ticket has been created successfully",
    });

    setIsCreateDialogOpen(false);
    setTicketTitle('');
    setTicketDescription('');
    setTicketCategory('');
    setTicketPriority('medium');
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Comment added",
      description: isInternalComment ? "Internal note added" : "Reply sent to customer",
    });

    setCommentInput('');
    setIsInternalComment(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-blue-600 bg-blue-50';
      case 'in_progress':
        return 'text-amber-600 bg-amber-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      case 'closed':
        return 'text-gray-600 bg-gray-50';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-blue-600 bg-blue-50';
      case 'high':
        return 'text-amber-600 bg-amber-50';
      case 'urgent':
        return 'text-red-600 bg-red-50';
      default:
        return '';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'low':
        return <ArrowDown className="h-4 w-4 text-green-600" />;
      case 'medium':
        return <ArrowDownUp className="h-4 w-4 text-blue-600" />;
      case 'high':
        return <ArrowUp className="h-4 w-4 text-amber-600" />;
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage and respond to customer support tickets
          </p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Filter Tickets</DialogTitle>
                <DialogDescription>
                  Apply filters to narrow down your ticket view
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority-filter">Priority</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-filter">Category</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="account">Account Setup</SelectItem>
                      <SelectItem value="broadcasts">Broadcasts</SelectItem>
                      <SelectItem value="chatbots">Chatbots</SelectItem>
                      <SelectItem value="templates">Templates</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignee-filter">Assigned To</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      <SelectItem value="unassigned">Unassigned</SelectItem>
                      <SelectItem value="me">Assigned to Me</SelectItem>
                      <SelectItem value="robert">Robert Chen</SelectItem>
                      <SelectItem value="maria">Maria Lopez</SelectItem>
                      <SelectItem value="sophia">Sophia Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-filter">Date Range</Label>
                  <Select defaultValue="all-time">
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-time">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
                  Reset Filters
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Support Ticket</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new support ticket
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-title">Ticket Title</Label>
                  <Input
                    id="ticket-title"
                    placeholder="Brief description of the issue"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-description">Description</Label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Provide detailed information about the issue..."
                    className="min-h-[120px]"
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ticket-category">Category</Label>
                    <Select value={ticketCategory} onValueChange={setTicketCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="account">Account Setup</SelectItem>
                        <SelectItem value="broadcasts">Broadcasts</SelectItem>
                        <SelectItem value="chatbots">Chatbots</SelectItem>
                        <SelectItem value="templates">Templates</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical Issues</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ticket-priority">Priority</Label>
                    <Select value={ticketPriority} onValueChange={setTicketPriority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ticket-attachments">Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <File className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Select Files
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTicket}>
                  Create Ticket
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              className="pl-8"
            />
          </div>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <b>{tickets.length}</b> tickets
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            View and respond to support tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="font-medium px-0 hover:bg-transparent"
                    onClick={() => handleSort('id')}
                  >
                    ID
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? <ArrowUp className="inline h-3 w-3 ml-1" /> : <ArrowDown className="inline h-3 w-3 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="font-medium px-0 hover:bg-transparent"
                    onClick={() => handleSort('title')}
                  >
                    Subject
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <ArrowUp className="inline h-3 w-3 ml-1" /> : <ArrowDown className="inline h-3 w-3 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    className="font-medium px-0 hover:bg-transparent"
                    onClick={() => handleSort('createdAt')}
                  >
                    Created
                    {sortField === 'createdAt' && (
                      sortDirection === 'asc' ? <ArrowUp className="inline h-3 w-3 ml-1" /> : <ArrowDown className="inline h-3 w-3 ml-1" />
                    )}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow 
                  key={ticket.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setIsTicketDetailOpen(true);
                  }}
                >
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>
                    <div className="font-medium line-clamp-1">{ticket.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {getPriorityIcon(ticket.priority)}
                      <span className="ml-1 capitalize">{ticket.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.customer.avatar} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {ticket.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="whitespace-nowrap">{ticket.customer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {ticket.assignedTo.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{ticket.assignedTo}</span>
                      </div>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100 border-0">
                        Unassigned
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTicket(ticket);
                          setIsTicketDetailOpen(true);
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Users className="mr-2 h-4 w-4" />
                          Change Assignee
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Edit className="mr-2 h-4 w-4" />
                          Change Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <ArrowUpRight className="mr-2 h-4 w-4" />
                          Escalate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Ticket Detail Sheet */}
      <Sheet open={isTicketDetailOpen} onOpenChange={setIsTicketDetailOpen}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl overflow-auto">
          {selectedTicket && (
            <>
              <SheetHeader className="text-left">
                <div className="flex justify-between">
                  <SheetTitle className="text-xl font-bold">Ticket {selectedTicket.id}</SheetTitle>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {getStatusIcon(selectedTicket.status)}
                    <span className="ml-1 capitalize">{selectedTicket.status.replace('_', ' ')}</span>
                  </div>
                </div>
                <SheetDescription className="line-clamp-1">{selectedTicket.title}</SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedTicket.customer.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {selectedTicket.customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedTicket.customer.name}</div>
                        <div className="text-xs text-muted-foreground">{selectedTicket.customer.email}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(selectedTicket.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <p className="text-sm">{selectedTicket.description}</p>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Priority</p>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {getPriorityIcon(selectedTicket.priority)}
                      <span className="ml-1 capitalize">{selectedTicket.priority}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Category</p>
                    <p className="text-sm">{selectedTicket.category}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Assigned To</p>
                    {selectedTicket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {selectedTicket.assignedTo.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{selectedTicket.assignedTo}</span>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <UserPlus className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    )}
                  </div>
                </div>
                
                {selectedTicket.tags && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Tags</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTicket.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-100 border-0">
                          {tag}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <PlusCircle className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Conversation History</h3>
                    <Tabs defaultValue="all" className="w-[320px]">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="customer" className="text-xs">Customer</TabsTrigger>
                        <TabsTrigger value="internal" className="text-xs">Internal</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="space-y-4">
                    {ticketComments.map((comment) => (
                      <div key={comment.id} className={`p-4 rounded-lg ${comment.isInternal ? 'bg-amber-50 border border-amber-100' : 'bg-gray-50'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={comment.user.avatar} />
                              <AvatarFallback className={`text-xs ${comment.isInternal ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                                {comment.user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{comment.user.name}</div>
                              <div className="text-xs text-muted-foreground">{comment.user.role}</div>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                        
                        <p className="text-sm">{comment.content}</p>
                        
                        {comment.isInternal && (
                          <div className="flex items-center mt-2">
                            <Badge variant="outline" className="bg-amber-100 text-amber-700 border-0">
                              Internal Note
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="comment">Add Reply</Label>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm" htmlFor="internal-note">
                          Internal note
                        </label>
                        <input
                          type="checkbox"
                          id="internal-note"
                          className="h-4 w-4 rounded border-gray-300"
                          checked={isInternalComment}
                          onChange={(e) => setIsInternalComment(e.target.checked)}
                        />
                      </div>
                    </div>
                    <Textarea
                      id="comment"
                      placeholder="Type your reply here..."
                      className={`min-h-[100px] ${isInternalComment ? 'bg-amber-50' : ''}`}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <File className="h-4 w-4 mr-2" />
                          Attach
                        </Button>
                        <Button variant="outline" size="sm">
                          <Link2 className="h-4 w-4 mr-2" />
                          Templates
                        </Button>
                      </div>
                      <Button size="sm" onClick={handleAddComment}>
                        {isInternalComment ? 'Add Internal Note' : 'Send Reply'}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve Ticket
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Reassign
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4 mr-2" />
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TicketManagement;
