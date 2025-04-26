
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Star,
  BellOff,
  Blocks,
  Tag,
  Pencil,
} from "lucide-react";
import { Conversation } from '@/types/conversation';
import { toast } from "@/hooks/use-toast";

interface ContactInfoSidebarProps {
  conversation: Conversation;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactInfoSidebar: React.FC<ContactInfoSidebarProps> = ({
  conversation,
  isOpen,
  onOpenChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = () => {
    if (newTagInput.trim()) {
      // Add tag logic here
      setNewTagInput('');
      toast({
        title: "Tag added",
        description: `Tag "${newTagInput}" has been added successfully.`,
      });
    }
  };

  const handleToggleBlock = () => {
    // Toggle block logic here
    toast({
      title: conversation.contact.isBlocked ? "Contact unblocked" : "Contact blocked",
      description: `${conversation.contact.name} has been ${conversation.contact.isBlocked ? 'unblocked' : 'blocked'}.`,
    });
  };

  const handleToggleMute = () => {
    // Toggle mute logic here
    toast({
      title: conversation.contact.isMuted ? "Notifications unmuted" : "Notifications muted",
      description: `Notifications for ${conversation.contact.name} have been ${conversation.contact.isMuted ? 'unmuted' : 'muted'}.`,
    });
  };

  const handleToggleStar = () => {
    // Toggle star logic here
    toast({
      title: conversation.contact.isStarred ? "Contact unstarred" : "Contact starred",
      description: `${conversation.contact.name} has been ${conversation.contact.isStarred ? 'removed from' : 'added to'} starred contacts.`,
    });
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

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="text-left mb-4">
          <SheetTitle>Contact Information</SheetTitle>
          <SheetDescription>
            View and manage contact details
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6">
          {/* Contact Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <Avatar className="h-24 w-24">
              <AvatarImage src={conversation.contact.avatar} />
              <AvatarFallback>{conversation.contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{conversation.contact.name}</h2>
              <p className="text-muted-foreground">{conversation.contact.phone}</p>
              {conversation.contact.email && (
                <p className="text-muted-foreground">{conversation.contact.email}</p>
              )}
              <Badge className="mt-2" variant="outline">
                {conversation.contact.type.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={conversation.contact.isStarred ? "bg-yellow-50" : ""}
              onClick={handleToggleStar}
            >
              <Star className={`h-4 w-4 mr-1 ${conversation.contact.isStarred ? "text-yellow-500 fill-yellow-500" : ""}`} />
              {conversation.contact.isStarred ? "Starred" : "Star"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={conversation.contact.isMuted ? "bg-red-50" : ""}
              onClick={handleToggleMute}
            >
              <BellOff className={`h-4 w-4 mr-1 ${conversation.contact.isMuted ? "text-red-500" : ""}`} />
              {conversation.contact.isMuted ? "Muted" : "Mute"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={conversation.contact.isBlocked ? "bg-red-50" : ""}
              onClick={handleToggleBlock}
            >
              <Blocks className={`h-4 w-4 mr-1 ${conversation.contact.isBlocked ? "text-red-500" : ""}`} />
              {conversation.contact.isBlocked ? "Blocked" : "Block"}
            </Button>
          </div>

          <Separator />

          {/* Status and Assignment */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Status</h3>
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                {conversation.status.toUpperCase()}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Assigned To</h3>
              <div className="flex items-center gap-2">
                {conversation.assignedTo ? (
                  <>
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {conversation.assignedTo.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{conversation.assignedTo}</span>
                  </>
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Tags</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      placeholder="Add new tag"
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    <Button size="sm" onClick={handleAddTag}>
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {conversation.tags && conversation.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-destructive/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {conversation.tags && conversation.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Tabs Section */}
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes" className="space-y-4">
              <Textarea
                placeholder="Add a note about this contact..."
                className="min-h-[100px]"
              />
              <Button size="sm">Save Note</Button>
              
              <div className="space-y-2">
                <div className="bg-muted/50 rounded-md p-3">
                  <p className="text-sm">Customer prefers afternoon appointments.</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground">Added by Maria Lopez</span>
                    <span className="text-xs text-muted-foreground">Jun 20, 2023</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <div className="space-y-3">
                {/* Activity Timeline */}
                <div className="border-l-2 border-muted pl-4 py-2">
                  <p className="text-sm font-medium">Status changed to Active</p>
                  <p className="text-xs text-muted-foreground">Today at 2:34 PM</p>
                </div>
                <div className="border-l-2 border-muted pl-4 py-2">
                  <p className="text-sm font-medium">Tag added: VIP Customer</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 4:15 PM</p>
                </div>
                <div className="border-l-2 border-muted pl-4 py-2">
                  <p className="text-sm font-medium">Assigned to Maria Lopez</p>
                  <p className="text-xs text-muted-foreground">Jun 23, 2023 at 09:30 AM</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">First Contact</h4>
                  <p className="text-sm text-muted-foreground">Jun 15, 2023</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Last Contact</h4>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Total Messages</h4>
                  <p className="text-sm text-muted-foreground">156</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Response Rate</h4>
                  <p className="text-sm text-muted-foreground">95%</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ContactInfoSidebar;
