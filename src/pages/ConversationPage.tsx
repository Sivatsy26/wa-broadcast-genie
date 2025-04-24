import React, { useState, useEffect } from 'react';
import ConversationLayout from '@/components/conversations/ConversationLayout';
import { Conversation } from '@/types/conversation';
import { toast } from "@/hooks/use-toast";

// Sample conversations data - in a real app, this would come from an API or database
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

const ConversationPage = () => {
  // Main state for the conversation page
  const [activeDevice, setActiveDevice] = useState<string>('whatsapp');
  const [conversationList, setConversationList] = useState<Conversation[]>(conversations);
  
  // Handle notifications
  const handleNotification = (title: string, message: string) => {
    toast({
      title,
      description: message,
    });
  };

  return (
    <div className="space-y-4 h-full flex flex-col animate-fade-in">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
        <p className="text-muted-foreground">
          Manage your {activeDevice === 'whatsapp' ? 'WhatsApp' : 'SMS'} conversations with customers
        </p>
      </div>

      <ConversationLayout 
        conversations={conversationList}
        setConversations={setConversationList}
        activeDevice={activeDevice}
        setActiveDevice={setActiveDevice}
        onNotify={handleNotification}
      />
    </div>
  );
};

export default ConversationPage;
