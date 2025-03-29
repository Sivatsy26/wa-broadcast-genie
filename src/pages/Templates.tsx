
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
  FileText, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Eye, 
  Copy, 
  Trash2, 
  Clock, 
  CheckCircle, 
  Filter, 
  MessageSquare,
  Image,
  Video,
  File
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  type: 'text' | 'media' | 'interactive';
  language: string;
  createdAt: string;
  lastUsed: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'Welcome Message',
    status: 'approved',
    type: 'text',
    language: 'English',
    createdAt: '2023-06-10T14:30:00Z',
    lastUsed: '2023-06-20T09:15:00Z'
  },
  {
    id: '2',
    name: 'Appointment Confirmation',
    status: 'approved',
    type: 'interactive',
    language: 'English',
    createdAt: '2023-05-15T11:20:00Z',
    lastUsed: '2023-06-19T16:45:00Z'
  },
  {
    id: '3',
    name: 'Product Showcase',
    status: 'pending',
    type: 'media',
    language: 'English',
    createdAt: '2023-06-18T08:30:00Z',
    lastUsed: ''
  },
  {
    id: '4',
    name: 'Customer Feedback',
    status: 'rejected',
    type: 'interactive',
    language: 'English',
    createdAt: '2023-06-05T10:00:00Z',
    lastUsed: ''
  },
  {
    id: '5',
    name: 'Order Confirmation',
    status: 'approved',
    type: 'text',
    language: 'English',
    createdAt: '2023-04-20T09:45:00Z',
    lastUsed: '2023-06-15T13:30:00Z'
  }
];

const Templates = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('text');

  const handleCreateTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your template",
        variant: "destructive",
      });
      return;
    }

    if (!templateContent.trim()) {
      toast({
        title: "Missing content",
        description: "Please provide content for your template",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Template submitted",
      description: "Your template has been submitted for approval",
    });

    setIsCreateDialogOpen(false);
    setTemplateName('');
    setTemplateContent('');
    setSelectedCategory('text');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-600" />;
      case 'rejected':
        return <Trash2 className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <MessageSquare className="h-4 w-4" />;
      case 'media':
        return <Image className="h-4 w-4" />;
      case 'interactive':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
          <p className="text-muted-foreground">
            Create and manage your WhatsApp Business message templates
          </p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Design your WhatsApp template for business messaging
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  placeholder="e.g., Welcome Message"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Template names can only contain lowercase letters, numbers, and underscores
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Template Category</Label>
                <Tabs defaultValue="text" onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="interactive">Interactive</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-content">Template Content</Label>
                      <Textarea
                        id="text-content"
                        placeholder="Hello {{1}}, thank you for your interest in our services. We're happy to assist you with {{2}}."
                        className="min-h-[120px]"
                        value={templateContent}
                        onChange={(e) => setTemplateContent(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Use {{number}} for variables. Example: Hello {{1}}, your appointment is on {{2}}.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="media" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Media Type</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Image className="h-4 w-4 mr-2" />
                            Image
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Video className="h-4 w-4 mr-2" />
                            Video
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <File className="h-4 w-4 mr-2" />
                            Document
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Image className="h-8 w-8 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Drag and drop your media here, or click to browse
                        </p>
                        <Button variant="outline" size="sm" className="mt-4">
                          Upload Media
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="media-caption">Caption (Optional)</Label>
                        <Textarea
                          id="media-caption"
                          placeholder="Check out our new product lineup!"
                          className="min-h-[80px]"
                          value={templateContent}
                          onChange={(e) => setTemplateContent(e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="interactive" className="pt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="interactive-content">Message Content</Label>
                        <Textarea
                          id="interactive-content"
                          placeholder="Would you like to schedule an appointment with us?"
                          className="min-h-[80px]"
                          value={templateContent}
                          onChange={(e) => setTemplateContent(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Buttons</Label>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Button
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="rounded-md border p-3">
                            <div className="flex justify-between items-center">
                              <div className="font-medium text-sm">Yes, schedule now</div>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="rounded-md border p-3">
                            <div className="flex justify-between items-center">
                              <div className="font-medium text-sm">No, maybe later</div>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Tabs defaultValue="english">
                  <TabsList>
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="spanish">Spanish</TabsTrigger>
                    <TabsTrigger value="more">More...</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>
                Submit for Approval
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative w-full sm:w-64 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8"
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <b>{templates.length}</b> templates
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="py-4">
          <CardTitle>All Templates</CardTitle>
          <CardDescription>
            View and manage your message templates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <div className="font-medium">{template.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                      {getStatusIcon(template.status)}
                      <span className="ml-1 capitalize">{template.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {getTypeIcon(template.type)}
                      <span className="text-sm capitalize">{template.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{template.language}</TableCell>
                  <TableCell>
                    {new Date(template.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    {template.lastUsed ? new Date(template.lastUsed).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
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
    </div>
  );
};

export default Templates;
