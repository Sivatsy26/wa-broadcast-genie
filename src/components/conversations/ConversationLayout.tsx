
import React, { useState, useRef } from 'react';
import ContactSidebar from './ContactSidebar';
import MessagePanel from './MessagePanel';
import { Conversation, Message } from '@/types/conversation';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NoConversation from './NoConversation';
import { Smartphone, MessageSquare } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface ConversationLayoutProps {
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeDevice: string;
  setActiveDevice: (device: string) => void;
  onNotify: (title: string, message: string) => void;
}

// Sample messages - in a real app, this would come from an API or database
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

const ConversationLayout: React.FC<ConversationLayoutProps> = ({
  conversations,
  setConversations,
  activeDevice,
  setActiveDevice,
  onNotify
}) => {
  // State for the conversation layout
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(conversations[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle device type change
  const handleDeviceChange = (value: string) => {
    setActiveDevice(value);
    setActiveConversation(null);
    // In a real app, you would fetch conversations for the selected device
  };

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-13rem)] overflow-hidden">
      <div className="mb-4">
        <Tabs defaultValue="whatsapp" onValueChange={handleDeviceChange} className="w-fit">
          <TabsList>
            <TabsTrigger value="whatsapp" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              SMS
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-1 gap-4 overflow-hidden">
        <ContactSidebar 
          conversations={conversations}
          activeConversation={activeConversation}
          setActiveConversation={setActiveConversation}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateRange={dateRange}
          setDateRange={setDateRange}
          assigneeFilter={assigneeFilter}
          setAssigneeFilter={setAssigneeFilter}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
        />
        
        {activeConversation ? (
          <MessagePanel
            conversation={activeConversation}
            messages={localMessages}
            setMessages={setLocalMessages}
            setActiveConversation={setActiveConversation}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            messagesEndRef={messagesEndRef}
            onNotify={onNotify}
            setConversations={setConversations}
          />
        ) : (
          <NoConversation />
        )}
      </div>
    </div>
  );
};

export default ConversationLayout;
