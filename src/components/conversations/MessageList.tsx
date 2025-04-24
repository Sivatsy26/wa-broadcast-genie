
import React from 'react';
import { Message } from '@/types/conversation';

interface MessageListProps {
  messages: Message[];
  contactName?: string;
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, contactName, messagesEndRef }) => {
  return <div>Message List (Placeholder)</div>;
};

export default MessageList;
