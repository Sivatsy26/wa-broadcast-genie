
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  FileText,
  Users,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
  Search,
  Upload,
  Image,
  File,
  Video,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DateTimePicker } from "@/components/broadcast/DateTimePicker";
import { AudienceUploader } from "@/components/broadcast/AudienceUploader";
import { CampaignDetail } from "@/components/broadcast/CampaignDetail";
import FilePreview from "@/components/conversations/message-input/FilePreview";
import { Badge } from "@/components/ui/badge";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";

export interface BroadcastCampaign {
  id: string;
  name: string;
  status: 'scheduled' | 'sending' | 'completed' | 'draft';
  template?: string;
  audience: string;
  sent: number;
  delivered: number;
  read: number;
  responded: number;
  scheduled: string;
  tags?: string[];
}

const initialCampaigns: BroadcastCampaign[] = [
  {
    id: '1',
    name: 'Summer Promotion',
    status: 'completed',
    template: 'Summer_Promo_2023',
    audience: 'All Customers',
    sent: 2500,
    delivered: 2450,
    read: 1890,
    responded: 312,
    scheduled: '2023-06-15T09:00:00Z',
    tags: ['promotion', 'summer'],
  },
  {
    id: '2',
    name: 'Product Launch Announcement',
    status: 'sending',
    template: 'New_Product_2023',
    audience: 'Premium Customers',
    sent: 1200,
    delivered: 1150,
    read: 800,
    responded: 95,
    scheduled: '2023-06-20T14:30:00Z',
    tags: ['product', 'launch'],
  },
  {
    id: '3',
    name: 'Customer Feedback Survey',
    status: 'scheduled',
    template: 'Feedback_Survey_Q2',
    audience: 'Active Users',
    sent: 0,
    delivered: 0,
    read: 0,
    responded: 0,
    scheduled: '2023-06-25T10:00:00Z',
    tags: ['survey', 'feedback'],
  },
  {
    id: '4',
    name: 'Holiday Campaign Draft',
    status: 'draft',
    audience: 'No audience selected',
    sent: 0,
    delivered: 0,
    read: 0,
    responded: 0,
    scheduled: '',
    tags: ['holiday'],
  },
];

const BroadcastCampaigns = () => {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<BroadcastCampaign[]>(initialCampaigns);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<string>('');
  const [campaignName, setCampaignName] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');
  const [showAudienceDialog, setShowAudienceDialog] = useState<boolean>(false);
  const [scheduleType, setScheduleType] = useState<string>('now');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [audienceName, setAudienceName] = useState<string>('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [detailCampaign, setDetailCampaign] = useState<BroadcastCampaign | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState<boolean>(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<BroadcastCampaign | null>(null);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Tag management states
  const [campaignIdForTag, setCampaignIdForTag] = useState<string | null>(null);
  const [showTagDialog, setShowTagDialog] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');
  const [campaignTags, setCampaignTags] = useState<string[]>([]);
  const [newCampaignTags, setNewCampaignTags] = useState<string[]>([]);

  const handleCreateCampaign = () => {
    if (!campaignName) {
      toast({
        title: "Missing information",
        description: "Please provide a campaign name",
        variant: "destructive",
      });
      return;
    }

    if (!selectedTemplate && !messageContent) {
      toast({
        title: "Missing content",
        description: "Please select a template or create a custom message",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAudience) {
      toast({
        title: "Missing audience",
        description: "Please select an audience for your broadcast",
        variant: "destructive",
      });
      return;
    }

    const statusValue: 'sending' | 'scheduled' | 'draft' = 
      scheduleType === 'now' ? 'sending' : 
      scheduledDate ? 'scheduled' : 'draft';

    const newCampaign: BroadcastCampaign = {
      id: Math.random().toString(36).substring(2, 11),
      name: campaignName,
      status: statusValue,
      template: selectedTemplate || undefined,
      audience: selectedAudience === 'all-customers' 
        ? 'All Customers' 
        : selectedAudience === 'new-customers'
        ? 'New Customers'
        : selectedAudience === 'premium'
        ? 'Premium Members'
        : 'Inactive Users',
      sent: scheduleType === 'now' ? Math.floor(Math.random() * 500) : 0,
      delivered: 0,
      read: 0,
      responded: 0,
      scheduled: scheduledDate?.toISOString() || '',
      tags: newCampaignTags.length > 0 ? [...newCampaignTags] : undefined,
    };

    setCampaigns([newCampaign, ...campaigns]);
    resetForm();

    toast({
      title: scheduleType === 'now' ? "Campaign sending" : "Campaign created",
      description: scheduleType === 'now' 
        ? "Your broadcast campaign is now being sent to the selected audience" 
        : scheduledDate 
        ? `Your campaign is scheduled for ${scheduledDate.toLocaleString()}` 
        : "Your broadcast campaign has been created as a draft",
    });
  };

  const resetForm = () => {
    setCampaignName('');
    setSelectedTemplate('');
    setSelectedAudience('');
    setMessageContent('');
    setScheduleType('now');
    setScheduledDate(undefined);
    setMediaFile(null);
    setNewCampaignTags([]);
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateAudience = () => {
    if (!audienceName) {
      toast({
        title: "Missing information",
        description: "Please provide an audience name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Audience created",
      description: `${audienceName} has been created successfully`,
    });
    
    setShowAudienceDialog(false);
    setAudienceName('');
  };

  const handleViewCampaignDetails = (campaign: BroadcastCampaign) => {
    setDetailCampaign(campaign);
    setShowDetailDialog(true);
  };

  const handleEditCampaign = (campaign: BroadcastCampaign) => {
    setEditingCampaign(campaign);
    // Set form values based on the campaign
    setCampaignName(campaign.name);
    setSelectedTemplate(campaign.template || '');
    setSelectedAudience(
      campaign.audience === 'All Customers' 
        ? 'all-customers' 
        : campaign.audience === 'New Customers'
        ? 'new-customers'
        : campaign.audience === 'Premium Members'
        ? 'premium'
        : 'inactive'
    );
    setScheduleType(campaign.scheduled ? 'schedule' : 'now');
    setScheduledDate(campaign.scheduled ? new Date(campaign.scheduled) : undefined);
    setNewCampaignTags(campaign.tags || []);
    setShowEditDialog(true);
  };

  const handleUpdateCampaign = () => {
    if (!editingCampaign) return;
    
    const statusValue: 'sending' | 'scheduled' | 'draft' = 
      scheduleType === 'now' ? 'sending' : 
      scheduledDate ? 'scheduled' : 'draft';
    
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === editingCampaign.id) {
        return {
          ...campaign,
          name: campaignName,
          template: selectedTemplate || undefined,
          audience: selectedAudience === 'all-customers' 
            ? 'All Customers' 
            : selectedAudience === 'new-customers'
            ? 'New Customers'
            : selectedAudience === 'premium'
            ? 'Premium Members'
            : 'Inactive Users',
          status: statusValue,
          scheduled: scheduledDate?.toISOString() || '',
          tags: newCampaignTags.length > 0 ? [...newCampaignTags] : undefined,
        };
      }
      return campaign;
    });
    
    setCampaigns(updatedCampaigns);
    setShowEditDialog(false);
    resetForm();
    setEditingCampaign(null);
    
    toast({
      title: "Campaign updated",
      description: "Your campaign has been updated successfully",
    });
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaignToDelete(campaignId);
  };

  const confirmDeleteCampaign = () => {
    if (campaignToDelete) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignToDelete));
      setCampaignToDelete(null);
      
      toast({
        title: "Campaign deleted",
        description: "The campaign has been deleted successfully",
      });
    }
  };

  const handleSendNow = (campaignId: string) => {
    const updatedCampaigns = campaigns.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: 'sending' as const,
          scheduled: '',
          sent: Math.floor(Math.random() * 500),
        };
      }
      return campaign;
    });
    
    setCampaigns(updatedCampaigns);
    
    toast({
      title: "Campaign sending",
      description: "Your campaign is now being sent to the selected audience",
    });
  };

  // Tag management functions
  const openTagDialog = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      setCampaignIdForTag(campaignId);
      setCampaignTags(campaign.tags || []);
      setShowTagDialog(true);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setCampaignTags([...campaignTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddNewCampaignTag = () => {
    if (tagInput.trim()) {
      setNewCampaignTags([...newCampaignTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setCampaignTags(campaignTags.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveNewTag = (tagToRemove: string) => {
    setNewCampaignTags(newCampaignTags.filter(tag => tag !== tagToRemove));
  };

  const handleSaveTags = () => {
    if (campaignIdForTag) {
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.id === campaignIdForTag) {
          return {
            ...campaign,
            tags: campaignTags.length > 0 ? [...campaignTags] : undefined
          };
        }
        return campaign;
      });
      
      setCampaigns(updatedCampaigns);
      setShowTagDialog(false);
      setCampaignIdForTag(null);
      setCampaignTags([]);
      
      toast({
        title: "Tags updated",
        description: "Campaign tags have been updated successfully",
      });
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.audience.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (campaign.tags && campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'sending':
        return 'text-blue-600 bg-blue-50';
      case 'scheduled':
        return 'text-yellow-600 bg-yellow-50';
      case 'draft':
        return 'text-gray-600 bg-gray-50';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'sending':
        return <Send className="h-4 w-4 text-blue-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'draft':
        return <FileText className="h-4 w-4 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Broadcasts</h1>
          <p className="text-muted-foreground">
            Create and manage your WhatsApp broadcast campaigns
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Broadcast
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Broadcast Campaign</DialogTitle>
              <DialogDescription>
                Set up your campaign details, select a template or create a custom message.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input
                  id="campaign-name"
                  placeholder="e.g., Summer Promotion 2023"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Message Content</Label>
                <Tabs defaultValue="template">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="template">Use Template</TabsTrigger>
                    <TabsTrigger value="custom">Custom Message</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="template" className="space-y-4 py-4">
                    <Select 
                      value={selectedTemplate} 
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Message</SelectItem>
                        <SelectItem value="promotion">Promotion Announcement</SelectItem>
                        <SelectItem value="feedback">Feedback Request</SelectItem>
                        <SelectItem value="reminder">Appointment Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {selectedTemplate && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Template Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">
                                {selectedTemplate === 'welcome' 
                                  ? 'Welcome Message' 
                                  : selectedTemplate === 'promotion' 
                                  ? 'Promotion Announcement' 
                                  : selectedTemplate === 'feedback' 
                                  ? 'Feedback Request' 
                                  : 'Appointment Reminder'}
                              </span>
                            </div>
                            <p className="text-sm">
                              {selectedTemplate === 'welcome' 
                                ? "Hello {{1}}, welcome to our service! We're excited to have you onboard."
                                : selectedTemplate === 'promotion' 
                                ? "Great news, {{1}}! We have a special offer just for you: {{2}} off your next purchase."
                                : selectedTemplate === 'feedback' 
                                ? "Hi {{1}}, we'd love to hear your feedback about your recent experience with us."
                                : "Reminder: You have an appointment scheduled for {{1}} at {{2}}. Reply YES to confirm."}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="custom" className="space-y-4 py-4">
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-[120px]"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                    
                    <div className="flex gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleMediaUpload}
                        className="hidden"
                        accept="image/*,video/*,application/pdf"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Image className="h-4 w-4 mr-2" />
                        Add Media
                      </Button>
                    </div>
                    
                    {mediaFile && (
                      <FilePreview 
                        file={mediaFile}
                        type={mediaFile.type.startsWith('image/') ? 'image' : 'file'}
                        onRemove={handleRemoveMedia}
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="audience">Audience</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAudienceDialog(true)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Create New
                  </Button>
                </div>
                <Select
                  value={selectedAudience}
                  onValueChange={setSelectedAudience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-customers">All Customers (2,548)</SelectItem>
                    <SelectItem value="new-customers">New Customers (489)</SelectItem>
                    <SelectItem value="premium">Premium Members (356)</SelectItem>
                    <SelectItem value="inactive">Inactive Users (712)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags (optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newCampaignTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1 gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveNewTag(tag)}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNewCampaignTag();
                      }
                    }}
                  />
                  <Button variant="outline" onClick={handleAddNewCampaignTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp-account">Send From</Label>
                <Select defaultValue="business-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select WhatsApp account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business-1">Business Account 1 (+1 555-123-4567)</SelectItem>
                    <SelectItem value="marketing">Marketing Account (+1 555-987-6543)</SelectItem>
                    <SelectItem value="support">Support Account (+1 555-456-7890)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <div className="space-y-2">
                  <Select 
                    value={scheduleType}
                    onValueChange={setScheduleType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send immediately</SelectItem>
                      <SelectItem value="schedule">Schedule for later</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {scheduleType === 'schedule' && (
                    <DateTimePicker 
                      date={scheduledDate} 
                      setDate={setScheduledDate}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={showAudienceDialog} onOpenChange={setShowAudienceDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Audience</DialogTitle>
              <DialogDescription>
                Upload contacts or define criteria for your new audience.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="upload">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                <TabsTrigger value="criteria">Define Criteria</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4 py-4">
                <AudienceUploader />
              </TabsContent>
              
              <TabsContent value="criteria" className="space-y-4 py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="audience-name">Audience Name</Label>
                    <Input 
                      id="audience-name" 
                      placeholder="e.g., Active Premium Customers" 
                      value={audienceName}
                      onChange={(e) => setAudienceName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Filter by tags</Label>
                    <AudienceUploader />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Filter by activity</Label>
                    <Select defaultValue="active-90">
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active-30">Active in last 30 days</SelectItem>
                        <SelectItem value="active-90">Active in last 90 days</SelectItem>
                        <SelectItem value="inactive-90">Inactive for 90+ days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAudienceDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAudience}>Create Audience</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Tag management dialog */}
        <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Manage Tags</DialogTitle>
              <DialogDescription>
                Add or remove tags for this campaign.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {campaignTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-1 gap-1">
                    {tag}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
                {campaignTags.length === 0 && (
                  <p className="text-sm text-muted-foreground">No tags yet. Add some below.</p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button variant="outline" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowTagDialog(false);
                setCampaignIdForTag(null);
                setCampaignTags([]);
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveTags}>Save Tags</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Campaign Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Campaign</DialogTitle>
              <DialogDescription>
                Modify your campaign details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Same content as create dialog, but for editing */}
              <div className="space-y-2">
                <Label htmlFor="campaign-name-edit">Campaign Name</Label>
                <Input
                  id="campaign-name-edit"
                  placeholder="e.g., Summer Promotion 2023"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Message Content</Label>
                <Tabs defaultValue="template">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="template">Use Template</TabsTrigger>
                    <TabsTrigger value="custom">Custom Message</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="template" className="space-y-4 py-4">
                    <Select 
                      value={selectedTemplate} 
                      onValueChange={setSelectedTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="welcome">Welcome Message</SelectItem>
                        <SelectItem value="promotion">Promotion Announcement</SelectItem>
                        <SelectItem value="feedback">Feedback Request</SelectItem>
                        <SelectItem value="reminder">Appointment Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {selectedTemplate && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">Template Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">
                                {selectedTemplate === 'welcome' 
                                  ? 'Welcome Message' 
                                  : selectedTemplate === 'promotion' 
                                  ? 'Promotion Announcement' 
                                  : selectedTemplate === 'feedback' 
                                  ? 'Feedback Request' 
                                  : 'Appointment Reminder'}
                              </span>
                            </div>
                            <p className="text-sm">
                              {selectedTemplate === 'welcome' 
                                ? "Hello {{1}}, welcome to our service! We're excited to have you onboard."
                                : selectedTemplate === 'promotion' 
                                ? "Great news, {{1}}! We have a special offer just for you: {{2}} off your next purchase."
                                : selectedTemplate === 'feedback' 
                                ? "Hi {{1}}, we'd love to hear your feedback about your recent experience with us."
                                : "Reminder: You have an appointment scheduled for {{1}} at {{2}}. Reply YES to confirm."}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="custom" className="space-y-4 py-4">
                    <Textarea
                      placeholder="Type your message here..."
                      className="min-h-[120px]"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audience-edit">Audience</Label>
                <Select
                  value={selectedAudience}
                  onValueChange={setSelectedAudience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-customers">All Customers (2,548)</SelectItem>
                    <SelectItem value="new-customers">New Customers (489)</SelectItem>
                    <SelectItem value="premium">Premium Members (356)</SelectItem>
                    <SelectItem value="inactive">Inactive Users (712)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags (optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newCampaignTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1 gap-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveNewTag(tag)}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNewCampaignTag();
                      }
                    }}
                  />
                  <Button variant="outline" onClick={handleAddNewCampaignTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-edit">Schedule</Label>
                <div className="space-y-2">
                  <Select 
                    value={scheduleType}
                    onValueChange={setScheduleType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When to send" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send immediately</SelectItem>
                      <SelectItem value="schedule">Schedule for later</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {scheduleType === 'schedule' && (
                    <DateTimePicker 
                      date={scheduledDate} 
                      setDate={setScheduledDate}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdateCampaign}>Update Campaign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <b>{filteredCampaigns.length}</b> of <b>{campaigns.length}</b> campaigns
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            View and manage all your broadcast campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Metrics</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{campaign.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {campaign.template || 'Custom Message'} • {' '}
                        {campaign.scheduled ? 
                          new Date(campaign.scheduled).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }) : 
                          'Not scheduled'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1 capitalize">{campaign.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{campaign.audience}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {campaign.tags && campaign.tags.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {campaign.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {campaign.tags.length > 2 && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Badge variant="outline" className="text-xs cursor-pointer">
                                +{campaign.tags.length - 2} more
                              </Badge>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                              <div className="flex flex-wrap gap-1">
                                {campaign.tags.slice(2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">No tags</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-sm">
                      {campaign.status !== 'draft' ? (
                        <>
                          <div className="font-medium">{campaign.sent} sent</div>
                          <div className="text-xs text-muted-foreground">
                            {Math.round((campaign.read / campaign.sent) * 100) || 0}% read rate
                          </div>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">No metrics yet</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewCampaignDetails(campaign)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditCampaign(campaign)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Campaign
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openTagDialog(campaign.id)}>
                          <Tag className="mr-2 h-4 w-4" />
                          Manage Tags
                        </DropdownMenuItem>
                        {campaign.status === 'scheduled' && (
                          <DropdownMenuItem onClick={() => handleSendNow(campaign.id)}>
                            <Send className="mr-2 h-4 w-4" />
                            Send Now
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600" 
                          onClick={() => handleDeleteCampaign(campaign.id)}
                        >
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

      <CampaignDetail 
        campaign={detailCampaign} 
        open={showDetailDialog} 
        onClose={() => setShowDetailDialog(false)} 
      />

      <AlertDialog open={!!campaignToDelete} onOpenChange={() => setCampaignToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCampaign}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BroadcastCampaigns;
