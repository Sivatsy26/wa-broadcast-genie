
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
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

interface ConversationHeaderProps {
  conversation: Conversation;
  onOpenContactInfo: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  conversation,
  onOpenContactInfo
}) => {
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
  );
};

export default ConversationHeader;
