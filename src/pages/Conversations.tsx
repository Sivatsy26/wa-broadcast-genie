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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
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
  Video,
  FileText,
  Smile,
  StopCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

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
  type?: 'text' | 'image' | 'video' | 'document' | 'voice';
  media?: {
    url: string;
    type: 'image' | 'video' | 'document' | 'voice';
    filename?: string;
    duration?: number;
  };
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
  {
    id: '16',
    content: 'Here is a photo of the location',
    timestamp: '2023-06-23T10:25:00Z',
    isOutbound: true,
    status: 'read',
    sender: 'Maria Lopez',
    type: 'image',
    media: {
      url: '/placeholder.svg',
      type: 'image',
      filename: 'location.jpg'
    }
  },
  {
    id: '17',
    content: '',
    timestamp: '2023-06-23T10:27:00Z',
    isOutbound: false,
    type: 'voice',
    media: {
      url: '#',
      type: 'voice',
      duration: 12
    }
  },
];

const emojis = ['😀', '😂', '😊', '😍', '🥰', '😘', '😎', '👍', '🙏', '❤️', '🔥', '⭐', '🎉', '✅', '🤔', '👏', '🌟', '💯', '🤣', '😢'];

const Conversations = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [conversationList, setConversationList] = useState<Conversation[]>(conversations);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFilePreview, setShowFilePreview] = useState(false);
  const [activeAttachmentType, setActiveAttachmentType] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let filtered = [...conversations];
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(convo => convo.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(convo => 
        convo.contact.name.toLowerCase().includes(term) || 
        convo.contact.phone.includes(term) ||
        convo.lastMessage.content.toLowerCase().includes(term)
      );
    }
    
    setConversationList(filtered);
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    if (isRecording) {
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
      setRecordingTime(0);
    }

    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    };
  }, [isRecording]);

  const handleSendMessage = () => {
    if (messageInput.trim() || selectedFile) {
      const newMessageId = `new-${Date.now()}`;
      const timestamp = new Date().toISOString();
      
      let newMessage: Message = {
        id: newMessageId,
        content: messageInput.trim(),
        timestamp: timestamp,
        isOutbound: true,
        status: 'sent',
        sender: 'You',
        type: 'text'
      };
      
      if (selectedFile) {
        const fileType = selectedFile.type.split('/')[0];
        let mediaType: 'image' | 'video' | 'document' | null = null;
        
        if (fileType === 'image') mediaType = 'image';
        else if (fileType === 'video') mediaType = 'video';
        else mediaType = 'document';
        
        newMessage = {
          ...newMessage,
          type: mediaType,
          media: {
            url: URL.createObjectURL(selectedFile),
            type: mediaType,
            filename: selectedFile.name
          }
        };
      }
      
      setLocalMessages(prev => [...prev, newMessage]);
      setMessageInput('');
      setSelectedFile(null);
      setShowFilePreview(false);
      setActiveAttachmentType(null);
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
      
      if (activeConversation) {
        const updatedConvo = {
          ...activeConversation,
          lastMessage: {
            content: newMessage.content || 'Attachment',
            timestamp: timestamp,
            isOutbound: true,
            isRead: false
          }
        };
        setActiveConversation(updatedConvo);
        
        setConversationList(prev => 
          prev.map(convo => 
            convo.id === activeConversation.id ? updatedConvo : convo
          )
        );
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowFilePreview(true);
    }
  };

  const initiateFileUpload = (type: string) => {
    setActiveAttachmentType(type);
    if (fileInputRef.current) {
      switch (type) {
        case 'image':
          fileInputRef.current.accept = 'image/*';
          break;
        case 'video':
          fileInputRef.current.accept = 'video/*';
          break;
        case 'document':
          fileInputRef.current.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt';
          break;
      }
      fileInputRef.current.click();
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      const timestamp = new Date().toISOString();
      const newMessageId = `voice-${Date.now()}`;
      
      const voiceMessage: Message = {
        id: newMessageId,
        content: '',
        timestamp: timestamp,
        isOutbound: true,
        status: 'sent',
        sender: 'You',
        type: 'voice',
        media: {
          url: '#',
          type: 'voice',
          duration: recordingTime
        }
      };
      
      setLocalMessages(prev => [...prev, voiceMessage]);
      
      toast({
        title: "Voice message sent",
        description: `Voice message (${recordingTime}s) has been sent.`,
      });
    } else {
      toast({
        title: "Recording started",
        description: "Voice recording has started. Click the stop button when finished.",
      });
    }
    
    setIsRecording(!isRecording);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addEmoji = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
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

  const renderMessageContent = (message: Message) => {
    if (message.type === 'image' && message.media) {
      return (
        <div className="mt-2">
          <img 
            src={message.media.url} 
            alt="Image attachment" 
            className="rounded-md max-h-60 object-cover"
          />
          {message.content && <p className="mt-1 text-sm">{message.content}</p>}
        </div>
      );
    } else if (message.type === 'video' && message.media) {
      return (
        <div className="mt-2">
          <video 
            src={message.media.url} 
            className="rounded-md max-h-60 w-full" 
            controls
          />
          {message.content && <p className="mt-1 text-sm">{message.content}</p>}
        </div>
      );
    } else if (message.type === 'document' && message.media) {
      return (
        <div className="mt-2 flex items-center p-2 bg-gray-100 rounded-md">
          <FileText className="h-8 w-8 text-blue-600 mr-2" />
          <div>
            <p className="text-sm font-medium">{message.media.filename || "Document"}</p>
            {message.content && <p className="text-xs text-gray-500">{message.content}</p>}
          </div>
        </div>
      );
    } else if (message.type === 'voice' && message.media) {
      return (
        <div className="mt-2 flex items-center p-2 bg-gray-100 rounded-md">
          <div className="flex items-center space-x-2 w-full">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-primary text-primary-foreground">
              <Mic className="h-4 w-4" />
            </Button>
            <div className="w-full max-w-[120px]">
              <Progress value={50} className="h-1" />
            </div>
            <span className="text-xs">{message.media.duration}s</span>
          </div>
        </div>
      );
    } else {
      return <div className="text-sm">{message.content}</div>;
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
        <div className="w-1/3 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex mt-3 gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="h-3 w-3 mr-1" />
                    {statusFilter === 'all' ? 'All Statuses' : `Status: ${statusFilter}`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                    <DropdownMenuRadioItem value="all">All Conversations</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="new">
                      <MessageSquare className="h-4 w-4 text-blue-600 mr-2" />
                      New
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="active">
                      <RefreshCw className="h-4 w-4 text-green-600 mr-2" />
                      Active
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="resolved">
                      <CheckCircle className="h-4 w-4 text-purple-600 mr-2" />
                      Resolved
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="waiting">
                      <Clock className="h-4 w-4 text-amber-600 mr-2" />
                      Waiting
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
            {conversationList.length > 0 ? (
              conversationList.map((conversation) => (
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
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No conversations found with the current filters</p>
                <Button 
                  variant="link" 
                  onClick={() => {
                    setStatusFilter('all');
                    setSearchTerm('');
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
        
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
                {localMessages.map((message) => (
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
                      
                      {renderMessageContent(message)}
                      
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
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="p-3 border-t">
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => initiateFileUpload('image')}>
                      <Image className="mr-2 h-4 w-4" />
                      Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => initiateFileUpload('video')}>
                      <Video className="mr-2 h-4 w-4" />
                      Video
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => initiateFileUpload('document')}>
                      <FileText className="mr-2 h-4 w-4" />
                      Document
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-2">
                    <div className="grid grid-cols-10 gap-1">
                      {emojis.map((emoji, index) => (
                        <button
                          key={index}
                          className="h-7 w-7 flex items-center justify-center hover:bg-gray-100 rounded"
                          onClick={() => addEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
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
                  disabled={isRecording}
                />
                
                {!isRecording ? (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={toggleVoiceRecording}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-red-500"
                    onClick={toggleVoiceRecording}
                  >
                    <StopCircle className="h-5 w-5" />
                  </Button>
                )}
                
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={(!messageInput.trim() && !selectedFile) || isRecording}
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
        
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
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
        </Sheet>
      </div>
    </div>
  );
};

export default Conversations;
