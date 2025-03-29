import React, { useState, useRef, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";
import ConversationList from '@/components/conversations/ConversationList';
import MessageList from '@/components/conversations/MessageList';
import MessageInput from '@/components/conversations/MessageInput';
import ContactInfoSidebar from '@/components/conversations/ContactInfoSidebar';
import ConversationHeader from '@/components/conversations/ConversationHeader';
import NoConversation from '@/components/conversations/NoConversation';
import { Conversation, Message } from '@/types/conversation';
import { FileText, Mic } from 'lucide-react';

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

const Conversations = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [conversationList, setConversationList] = useState<Conversation[]>(conversations);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSendMessage = (content: string, file: File | null) => {
    const newMessageId = `new-${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    let newMessage: Message = {
      id: newMessageId,
      content: content.trim(),
      timestamp: timestamp,
      isOutbound: true,
      status: 'sent',
      sender: 'You',
      type: 'text'
    };
    
    if (file) {
      const fileType = file.type.split('/')[0];
      let mediaType: 'image' | 'video' | 'document' | null = null;
      
      if (fileType === 'image') mediaType = 'image';
      else if (fileType === 'video') mediaType = 'video';
      else mediaType = 'document';
      
      newMessage = {
        ...newMessage,
        type: mediaType,
        media: {
          url: URL.createObjectURL(file),
          type: mediaType,
          filename: file.name
        }
      };
    }
    
    setLocalMessages(prev => [...prev, newMessage]);
    
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
  };

  const handleVoiceMessageSent = (durationInSeconds: number) => {
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
        duration: durationInSeconds
      }
    };
    
    setLocalMessages(prev => [...prev, voiceMessage]);
    
    toast({
      title: "Voice message sent",
      description: `Voice message (${durationInSeconds}s) has been sent.`,
    });
    
    if (activeConversation) {
      const updatedConvo = {
        ...activeConversation,
        lastMessage: {
          content: 'Voice message',
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
        <ConversationList 
          conversations={conversationList}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
            <ConversationHeader 
              conversation={activeConversation}
              onOpenContactInfo={() => setIsSidebarOpen(true)}
            />
            
            <MessageList 
              messages={localMessages}
              contactName={activeConversation.contact.name}
              messagesEndRef={messagesEndRef}
            />
            
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        ) : (
          <NoConversation />
        )}
        
        {activeConversation && (
          <ContactInfoSidebar 
            conversation={activeConversation}
            isOpen={isSidebarOpen}
            onOpenChange={setIsSidebarOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Conversations;
