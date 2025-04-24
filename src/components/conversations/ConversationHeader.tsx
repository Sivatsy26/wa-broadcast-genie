
import React from 'react';
import { Conversation } from '@/types/conversation';

interface ConversationHeaderProps {
  conversation: Conversation;
  onOpenContactInfo: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({ conversation, onOpenContactInfo }) => {
  return <div>Conversation Header (Placeholder)</div>;
};

export default ConversationHeader;
