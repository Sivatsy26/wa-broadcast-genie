
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
  Plus,
  Bot,
  MessageSquare,
  Check,
  Smartphone,
  Facebook,
  Globe,
  Copy,
  Eye,
  Settings,
  Trash2,
  BarChart3,
  Pencil,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ChatbotTemplate {
  id: string;
  name: string;
  description: string;
  type: 'faq' | 'lead-gen' | 'support' | 'custom';
  icon: React.ReactNode;
}

interface Chatbot {
  id: string;
  name: string;
  type: 'faq' | 'lead-gen' | 'support' | 'custom';
  status: 'active' | 'draft' | 'paused';
  channels: string[];
  interactions: number;
  lastModified: string;
}

const templates: ChatbotTemplate[] = [
  {
    id: 'faq',
    name: 'FAQ Bot',
    description: 'Answer common questions automatically',
    type: 'faq',
    icon: <MessageSquare className="h-12 w-12 text-blue-600" />,
  },
  {
    id: 'lead-gen',
    name: 'Lead Generation Bot',
    description: 'Capture and qualify new leads',
    type: 'lead-gen',
    icon: <Users className="h-12 w-12 text-green-600" />,
  },
  {
    id: 'support',
    name: 'Customer Support Bot',
    description: 'Provide support and resolve issues',
    type: 'support',
    icon: <HeadphonesIcon className="h-12 w-12 text-purple-600" />,
  },
  {
    id: 'custom',
    name: 'Custom Flow Bot',
    description: 'Build a custom bot from scratch',
    type: 'custom',
    icon: <Bot className="h-12 w-12 text-gray-600" />,
  },
];

const chatbots: Chatbot[] = [
  {
    id: '1',
    name: 'Product Support Assistant',
    type: 'faq',
    status: 'active',
    channels: ['whatsapp', 'website'],
    interactions: 1258,
    lastModified: '2023-06-18T14:30:00Z',
  },
  {
    id: '2',
    name: 'Sales Inquiry Bot',
    type: 'lead-gen',
    status: 'active',
    channels: ['whatsapp', 'facebook'],
    interactions: 892,
    lastModified: '2023-06-15T09:15:00Z',
  },
  {
    id: '3',
    name: 'Appointment Scheduler',
    type: 'custom',
    status: 'draft',
    channels: ['whatsapp'],
    interactions: 0,
    lastModified: '2023-06-20T11:45:00Z',
  },
  {
    id: '4',
    name: 'Technical Support',
    type: 'support',
    status: 'paused',
    channels: ['website'],
    interactions: 546,
    lastModified: '2023-06-10T16:20:00Z',
  },
];

// Need to import these from lucide-react
const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const HeadphonesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const ChatbotBuilder = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [botName, setBotName] = useState<string>('');
  const [channels, setChannels] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);

  const handleCreateChatbot = () => {
    if (!botName) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your chatbot",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplate) {
      toast({
        title: "Missing template",
        description: "Please select a template type for your chatbot",
        variant: "destructive",
      });
      return;
    }

    if (channels.length === 0) {
      toast({
        title: "Missing channels",
        description: "Please select at least one channel for your chatbot",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Chatbot created",
      description: "Your new chatbot has been created as a draft",
    });

    setCreateDialogOpen(false);
    setBotName('');
    setSelectedTemplate('');
    setChannels([]);
  };

  const toggleChannel = (channel: string) => {
    if (channels.includes(channel)) {
      setChannels(channels.filter(c => c !== channel));
    } else {
      setChannels([...channels, channel]);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return <Smartphone className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'website':
        return <Globe className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'faq':
        return 'FAQ Bot';
      case 'lead-gen':
        return 'Lead Generation';
      case 'support':
        return 'Support Bot';
      case 'custom':
        return 'Custom Flow';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbot Builder</h1>
          <p className="text-muted-foreground">
            Create and manage AI-powered chatbots for WhatsApp and other channels
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Chatbot</DialogTitle>
              <DialogDescription>
                Choose a template and configure your chatbot settings.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Chatbot Name</Label>
                <Input
                  id="bot-name"
                  placeholder="e.g., Product Support Assistant"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Choose a Template</Label>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>{template.icon}</div>
                        {selectedTemplate === template.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <h3 className="font-medium mt-3">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Channel Integration</Label>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={channels.includes('whatsapp') ? 'default' : 'outline'}
                    onClick={() => toggleChannel('whatsapp')}
                    className="flex items-center gap-2"
                  >
                    <Smartphone className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant={channels.includes('facebook') ? 'default' : 'outline'}
                    onClick={() => toggleChannel('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="h-4 w-4" />
                    Facebook Messenger
                  </Button>
                  <Button
                    variant={channels.includes('website') ? 'default' : 'outline'}
                    onClick={() => toggleChannel('website')}
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    Website Widget
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateChatbot}>
                Create Chatbot
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="chatbots">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2">
          <TabsTrigger value="chatbots">My Chatbots</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chatbots" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chatbots.map((chatbot) => (
              <Card key={chatbot.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge
                      variant={
                        chatbot.status === 'active'
                          ? 'default'
                          : chatbot.status === 'paused'
                          ? 'outline'
                          : 'secondary'
                      }
                      className="mb-2"
                    >
                      {chatbot.status === 'active' ? (
                        <>
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1 animate-pulse-subtle"></div>
                          Live
                        </>
                      ) : (
                        chatbot.status.charAt(0).toUpperCase() + chatbot.status.slice(1)
                      )}
                    </Badge>
                    
                    <div className="flex gap-1.5">
                      {chatbot.channels.map((channel) => (
                        <div 
                          key={channel} 
                          className="h-7 w-7 rounded-full bg-muted flex items-center justify-center"
                          title={channel.charAt(0).toUpperCase() + channel.slice(1)}
                        >
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{chatbot.name}</CardTitle>
                  <CardDescription>{getTypeLabel(chatbot.type)}</CardDescription>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interactions</span>
                    <span className="font-medium">{chatbot.interactions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1.5">
                    <span className="text-muted-foreground">Last modified</span>
                    <span>
                      {new Date(chatbot.lastModified).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    Preview
                  </Button>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="px-2">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="px-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex justify-center mb-2">
                    {template.icon}
                  </div>
                  <CardTitle className="text-center">{template.name}</CardTitle>
                  <CardDescription className="text-center">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2 font-medium">Key Features:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {template.type === 'faq' && (
                        <>
                          <li>Intent detection</li>
                          <li>Knowledge base integration</li>
                          <li>Quick reply suggestions</li>
                          <li>Human handoff for complex queries</li>
                        </>
                      )}
                      {template.type === 'lead-gen' && (
                        <>
                          <li>Contact information collection</li>
                          <li>Lead qualification questions</li>
                          <li>CRM integration</li>
                          <li>Follow-up scheduling</li>
                        </>
                      )}
                      {template.type === 'support' && (
                        <>
                          <li>Issue categorization</li>
                          <li>Ticket creation</li>
                          <li>Problem resolution workflows</li>
                          <li>Satisfaction surveys</li>
                        </>
                      )}
                      {template.type === 'custom' && (
                        <>
                          <li>Blank canvas</li>
                          <li>Full customization</li>
                          <li>Advanced logic options</li>
                          <li>All integration capabilities</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setCreateDialogOpen(true);
                    }}
                  >
                    Use This Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotBuilder;
