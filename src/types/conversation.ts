
// Type definitions for conversation related components

export type MessageStatus = "sent" | "delivered" | "read";
export type MessageType = "text" | "image" | "video" | "voice" | "document";
export type ConversationStatus = "active" | "waiting" | "resolved" | "new";

export interface Contact {
  name: string;
  phone: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Media {
  url: string;
  type: "image" | "video" | "voice" | "document";
  filename?: string;
  duration?: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  isOutbound: boolean;
  status?: MessageStatus;
  sender?: string;
  type?: MessageType;
  media?: Media;
}

export interface Conversation {
  id: string;
  contact: Contact;
  lastMessage: {
    content: string;
    timestamp: string;
    isOutbound: boolean;
    isRead: boolean;
  };
  assignedTo?: string;
  tags?: string[];
  status: ConversationStatus;
}
