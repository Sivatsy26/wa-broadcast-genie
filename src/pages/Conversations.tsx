
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Filter,
  MoreHorizontal,
  MessageSquare,
  Smartphone,
  User,
  CornerDownLeft,
  ChevronLeft,
  ChevronRight,
  Image,
  Paperclip,
  Send,
  Mic,
  Bot,
  Archive,
  AlertCircle,
  CheckCircle,
  Trash2,
  Tag,
  UserPlus,
  Clock,
  RefreshCw,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface Conversation {
  id: string;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
    isOnline?: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isOutbound: boolean;
    isRead: boolean;
  };
  assignedTo?: string;
  tags?: string[];
  status: 'new' | 'active' | 'resolved' | 'waiting';
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutbound: boolean;
  status?: 'sent' | 'delivered' | 'read';
  sender?: string;
}

const conversations: Conversation[] = [
  {
    id: '1',
    contact: {
      name: 'Sarah Johnson',
      phone: '+1 555-123-4567',
      avatar: '',
      isOnline: true,
    },
    lastMessage: {
      content: "Yes, I'd like to book an appointment for next week.",
      timestamp: '2023-06-23T10:23:00Z',
      isOutbound: false,
      isRead: true,
    },
    assignedTo: 'Maria Lopez',
    tags: ['appointment', 'new-customer'],
    status: 'active',
  },
  {
    id: '2',
    contact: {
      name: 'David Williams',
      phone: '+1 555-987-6543',
      avatar: '',
    },
    lastMessage: {
      content: "Thanks for the information. I'll check it and get back to you.",
      timestamp: '2023-06-23T09:45:00Z',
      isOutbound: true,
      isRead: true,
    },
    status: 'waiting',
  },
  {
    id: '3',
    contact: {
      name: 'Michael Brown',
      phone: '+1 555-567-8901',
      avatar: '',
    },
    lastMessage: {
      content: 'I have a question about my recent order #45678.',
      timestamp: '2023-06-23T08:30:00Z',
      isOutbound: false,
      isRead: false,
    },
    status: 'new',
  },
  {
    id: '4',
    contact: {
      name: 'Emily Davis',
      phone: '+1 555-345-6789',
      avatar: '',
      isOnline: true,
    },
    lastMessage: {
      content: 'Your appointment has been confirmed for June 25th at 2 PM.',
      timestamp: '2023-06-22T16:15:00Z',
      isOutbound: true,
      isRead: true,
    },
    assignedTo: 'Robert Chen',
    tags: ['appointment', 'follow-up'],
    status: 'resolved',
  },
  {
    id: '5',
    contact: {
      name: 'James Wilson',
      phone: '+1 555-234-5678',
      avatar: '',
    },
    lastMessage: {
      content: 'Do you have this product in blue?',
      timestamp: '2023-06-22T14:50:00Z',
      isOutbound: false,
      isRead: true,
    },
    assignedTo: 'Maria Lopez',
    tags: ['product-inquiry'],
    status: 'active',
  },
];

const messages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm interested in your services.",
    timestamp: '2023-06-23T09:30:00Z',
    isOutbound: false,
  },
  {
    id: '2',
    content: 'Thanks for reaching out! How can we help you today?',
    timestamp: '2023-06-23T09:32:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '3',
    content: "I'd like to book an appointment for a consultation.",
    timestamp: '2023-06-23T09:35:00Z',
    isOutbound: false,
  },
  {
    id: '4',
    content: 'Sure, we have availability next week. What day works best for you?',
    timestamp: '2023-06-23T09:38:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '5',
    content: "I'd prefer Tuesday afternoon if possible.",
    timestamp: '2023-06-23T09:40:00Z',
    isOutbound: false,
  },
  {
    id: '6',
    content: 'Great! We have an opening at 2 PM or 4 PM on Tuesday. Which would you prefer?',
    timestamp: '2023-06-23T09:42:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '7',
    content: '2 PM works perfectly for me.',
    timestamp: '2023-06-23T09:45:00Z',
    isOutbound: false,
  },
  {
    id: '8',
    content: "Excellent! I've reserved Tuesday at 2 PM for your consultation. Could you please provide your name and contact information?",
    timestamp: '2023-06-23T09:47:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '9',
    content: 'My name is Sarah Johnson, and my phone number is +1 555-123-4567.',
    timestamp: '2023-06-23T09:50:00Z',
    isOutbound: false,
  },
  {
    id: '10',
    content: "Thank you, Sarah! Your appointment is confirmed for Tuesday at 2 PM. We'll send you a reminder the day before. Is there anything specific you'd like to discuss during the consultation?",
    timestamp: '2023-06-23T09:53:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '11',
    content: "Yes, I'd like to discuss your premium service options and pricing.",
    timestamp: '2023-06-23T10:00:00Z',
    isOutbound: false,
  },
  {
    id: '12',
    content: "Perfect! We'll make sure to prepare information about our premium services for your consultation. If you have any questions before Tuesday, feel free to reach out.",
    timestamp: '2023-06-23T10:05:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '13',
    content: 'Great, thank you! Looking forward to it.',
    timestamp: '2023-06-23T10:08:00Z',
    isOutbound: false,
  },
  {
    id: '14',
    content: "You're welcome, Sarah! We're looking forward to meeting you on Tuesday. Have a great rest of your day!",
    timestamp: '2023-06-23T10:10:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez'
  },
  {
    id: '15',
    content: "Yes, I'd like to book an appointment for next week.",
    timestamp: '2023-06-23T10:23:00Z',
    isOutbound: false,
  },
];

const Conversations = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // In a real app, you would add the message to the state and send it to the backend
      setMessageInput('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'text-blue-600 bg-blue-50';
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'resolved':
        return 'text-purple-600 bg-purple-50';
      case 'waiting':
        return 'text-amber-600 bg-amber-50';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <MessageSquare className="h-4 w-4 text-blue-600" />;
      case 'active':
        return <RefreshCw className="h-4 w-4 text-green-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case 'waiting':
        return <Clock className="h-4 w-4 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 h-full flex flex-col animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">
          Manage your WhatsApp conversations with customers
        </p>
      </div>

      <div className="flex flex-1 gap-4 h-[calc(100vh-13rem)] overflow-hidden">
        {/* Conversations List */}
        <div className="w-1/3 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
              />
            </div>
            <div className="flex mt-3 gap-1">
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="h-3 w-3 mr-1" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                All Conversations
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Badge className="h-4 w-4 px-1 text-[10px] bg-blue-500">3</Badge>
                <span className="ml-1">Unread</span>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeConversation?.id === conversation.id ? 'bg-gray-50' : ''
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.contact.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.contact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{conversation.contact.name}</div>
                      <div className="text-xs text-muted-foreground">{conversation.contact.phone}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="text-sm line-clamp-1 flex-1 mr-2">
                    {conversation.lastMessage.isOutbound && <span className="text-primary font-medium mr-1">You:</span>}
                    {conversation.lastMessage.content}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {!conversation.lastMessage.isOutbound && !conversation.lastMessage.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    )}
                    <div className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(conversation.status)}`}>
                      {getStatusIcon(conversation.status)}
                      <span className="ml-0.5 capitalize">{conversation.status}</span>
                    </div>
                  </div>
                </div>
                
                {conversation.tags && conversation.tags.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {conversation.tags.map((tag, index) => (
                      <div 
                        key={index}
                        className="bg-gray-100 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Conversation Detail */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={activeConversation.contact.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center gap-1.5">
                    {activeConversation.contact.name}
                    {activeConversation.contact.isOnline && (
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Smartphone className="h-3 w-3" />
                    {activeConversation.contact.phone}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
                  <User className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive conversation
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bot className="mr-2 h-4 w-4" />
                      Transfer to bot
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Tag className="mr-2 h-4 w-4" />
                      Add tags
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Assign to team member
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete conversation
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-gray-50 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOutbound ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isOutbound ? 'bg-primary text-primary-foreground' : 'bg-white border'} rounded-lg p-3 shadow-sm`}>
                      {!message.isOutbound && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px]">
                              {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">{activeConversation.contact.name}</span>
                        </div>
                      )}
                      {message.isOutbound && message.sender && (
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                              {message.sender.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs font-medium">{message.sender}</span>
                        </div>
                      )}
                      <div className="text-sm">{message.content}</div>
                      <div className="text-[10px] mt-1 flex justify-end items-center gap-1 opacity-80">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {message.isOutbound && message.status === 'read' && (
                          <CheckCircle className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Textarea
                  placeholder="Type a message..."
                  className="min-h-[44px] max-h-[120px] resize-none"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button variant="ghost" size="icon">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-lg border">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
            <h3 className="text-xl font-medium">No conversation selected</h3>
            <p className="text-muted-foreground">Select a conversation from the list to view messages</p>
          </div>
        )}
        
        {/* Contact Info Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent className="w-[350px] sm:w-[400px] overflow-auto">
            {activeConversation && (
              <>
                <SheetHeader className="text-left mb-4">
                  <SheetTitle>Contact Information</SheetTitle>
                  <SheetDescription>
                    View and manage customer details
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col items-center mb-4">
                  <Avatar className="h-20 w-20 mb-2">
                    <AvatarImage src={activeConversation.contact.avatar} />
                    <AvatarFallback className="text-xl bg-primary/10 text-primary">
                      {activeConversation.contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium">{activeConversation.contact.name}</h3>
                  <p className="text-muted-foreground">{activeConversation.contact.phone}</p>
                  <div className="flex mt-2 gap-2">
                    <Button variant="outline" size="sm">Edit Contact</Button>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Assigned To</h4>
                    <div className="flex items-center gap-2">
                      {activeConversation.assignedTo ? (
                        <>
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {activeConversation.assignedTo.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{activeConversation.assignedTo}</span>
                        </>
                      ) : (
                        <span className="text-muted-foreground">Unassigned</span>
                      )}
                      <Button variant="ghost" size="sm">Change</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Status</h4>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activeConversation.status)}`}>
                      {getStatusIcon(activeConversation.status)}
                      <span className="ml-1 capitalize">{activeConversation.status}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {activeConversation.tags && activeConversation.tags.length > 0 ? (
                        activeConversation.tags.map((tag, index) => (
                          <div 
                            key={index}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </div>
                        ))
                      ) : (
                        <span className="text-muted-foreground">No tags</span>
                      )}
                      <Button variant="ghost" size="sm" className="ml-1 h-5 px-1">+</Button>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Tabs defaultValue="notes">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="notes" className="space-y-4 py-4">
                    <Textarea
                      placeholder="Add a note about this contact..."
                      className="min-h-[100px]"
                    />
                    <Button size="sm">Save Note</Button>
                    
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-md p-2">
                        <p className="text-sm">Customer prefers afternoon appointments.</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-muted-foreground">
                            Added by Maria Lopez
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Jun 20, 2023
                          </span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="py-4">
                    <div className="space-y-3">
                      <div className="border-l-2 border-primary pl-3 py-1">
                        <p className="text-sm">Conversation marked as active</p>
                        <p className="text-xs text-muted-foreground">
                          Jun 23, 2023 at 10:15 AM
                        </p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-3 py-1">
                        <p className="text-sm">Assigned to Maria Lopez</p>
                        <p className="text-xs text-muted-foreground">
                          Jun 23, 2023 at 09:30 AM
                        </p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-3 py-1">
                        <p className="text-sm">Conversation started</p>
                        <p className="text-xs text-muted-foreground">
                          Jun 23, 2023 at 09:30 AM
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="py-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm">sarah.johnson@example.com</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Added On</p>
                          <p className="text-sm">Jun 15, 2023</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Last Contacted</p>
                          <p className="text-sm">Jun 23, 2023</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Source</p>
                          <p className="text-sm">Website</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Conversations;
