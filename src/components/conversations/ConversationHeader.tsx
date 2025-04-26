
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  MoreHorizontal, 
  Smartphone,
  Archive,
  Bot,
  Tag,
  UserPlus,
  Trash2
} from 'lucide-react';
import { Conversation } from '@/types/conversation';
import { toast } from "@/hooks/use-toast";

interface ConversationHeaderProps {
  conversation: Conversation;
  onOpenContactInfo: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onOpenContactInfo
}) => {
  const teamMembers = [
    { id: '1', name: 'Maria Lopez' },
    { id: '2', name: 'Robert Chen' },
    { id: '3', name: 'Sarah Johnson' },
  ];

  const tags = [
    'appointment',
    'follow-up',
    'new-customer',
    'product-inquiry',
    'support',
  ];

  const handleArchive = () => {
    toast({
      title: "Conversation archived",
      description: "The conversation has been moved to archives."
    });
  };

  const handleTransferToBot = () => {
    toast({
      title: "Transferred to bot",
      description: "Future messages will be handled by the AI assistant."
    });
  };

  const handleAssignToTeam = (memberId: string, memberName: string) => {
    toast({
      title: "Team member assigned",
      description: `Conversation assigned to ${memberName}`
    });
  };

  const handleAddTag = (tag: string) => {
    toast({
      title: "Tag added",
      description: `Tag "${tag}" has been added to the conversation`
    });
  };

  const handleDelete = () => {
    toast({
      title: "Conversation deleted",
      description: "The conversation has been permanently deleted",
      variant: "destructive"
    });
  };

  return (
    <div className="p-3 border-b flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage src={conversation.contact.avatar} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {conversation.contact.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium flex items-center gap-1.5">
            {conversation.contact.name}
            {conversation.contact.isOnline && (
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            )}
            <Badge variant={conversation.contact.type === 'client' ? "default" : "secondary"}>
              {conversation.contact.type}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Smartphone className="h-3 w-3" />
            {conversation.contact.phone}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={onOpenContactInfo}>
          <User className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleArchive}>
              <Archive className="mr-2 h-4 w-4" />
              Archive conversation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleTransferToBot}>
              <Bot className="mr-2 h-4 w-4" />
              Transfer to bot
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Tag className="mr-2 h-4 w-4" />
                Add tags
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {tags.map(tag => (
                  <DropdownMenuItem key={tag} onClick={() => handleAddTag(tag)}>
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                Assign to team member
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {teamMembers.map(member => (
                  <DropdownMenuItem 
                    key={member.id}
                    onClick={() => handleAssignToTeam(member.id, member.name)}
                  >
                    {member.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
