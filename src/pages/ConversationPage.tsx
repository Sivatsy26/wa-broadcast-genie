
import React from 'react';
import ConversationLayout from '@/components/conversations/layout/ConversationLayout';

const ConversationPage = () => {
  return (
    <div className="h-full animate-fade-in">
      <div className="flex flex-col h-full">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Conversations</h1>
        <p className="text-muted-foreground mb-4">Manage your WhatsApp conversations</p>
        <ConversationLayout />
      </div>
    </div>
  );
};

export default ConversationPage;
