
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { Conversation } from '@/types/conversation';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (conversation: Conversation) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  setActiveConversation,
  statusFilter,
  setStatusFilter,
  searchTerm,
  setSearchTerm
}) => {
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
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
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
  );
};

export default ConversationList;
