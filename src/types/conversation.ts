
export interface Conversation {
  id: string;
  contact: {
    name: string;
    phone: string;
    avatar?: string;
    isOnline?: boolean;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    isOutbound: boolean;
    isRead: boolean;
  };
  assignedTo?: string;
  tags?: string[];
  status: 'new' | 'active' | 'resolved' | 'waiting';
  createdAt?: string; // Adding this for date filtering
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutbound: boolean;
  status?: 'sent' | 'delivered' | 'read';
  sender?: string;
  type?: 'text' | 'image' | 'video' | 'document' | 'voice';
  media?: {
    url: string;
    type: 'image' | 'video' | 'document' | 'voice';
    filename?: string;
    duration?: number;
  };
}
