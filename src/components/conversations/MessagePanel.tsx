
import React from 'react';
import { Conversation, Message } from '@/types/conversation';
import ConversationHeader from './ConversationHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ContactInfoSidebar from './ContactInfoSidebar';

interface MessagePanelProps {
  conversation: Conversation;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setActiveConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  onNotify: (title: string, message: string) => void;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  conversation,
  messages,
  setMessages,
  setActiveConversation,
  isSidebarOpen,
  setIsSidebarOpen,
  messagesEndRef,
  onNotify,
  setConversations
}) => {
  // Function to handle sending messages
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
    
    setMessages(prev => [...prev, newMessage]);
    
    onNotify("Message sent", "Your message has been sent successfully.");
    
    const updatedConvo = {
      ...conversation,
      lastMessage: {
        content: newMessage.content || 'Attachment',
        timestamp: timestamp,
        isOutbound: true,
        isRead: false
      }
    };
    
    setActiveConversation(updatedConvo);
    
    setConversations(prev => 
      prev.map(convo => 
        convo.id === conversation.id ? updatedConvo : convo
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg border shadow-sm overflow-hidden">
      <ConversationHeader 
        conversation={conversation}
        onOpenContactInfo={() => setIsSidebarOpen(true)}
      />
      
      <MessageList 
        messages={messages}
        contactName={conversation.contact.name}
        messagesEndRef={messagesEndRef}
      />
      
      <MessageInput onSendMessage={handleSendMessage} />
      
      {isSidebarOpen && (
        <ContactInfoSidebar 
          conversation={conversation}
          isOpen={isSidebarOpen}
          onOpenChange={setIsSidebarOpen}
        />
      )}
    </div>
  );
};

export default MessagePanel;
