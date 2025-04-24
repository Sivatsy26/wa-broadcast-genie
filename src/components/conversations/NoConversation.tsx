
import React from 'react';
import { MessageSquare } from 'lucide-react';

const NoConversation: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-lg border">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-2" />
      <h3 className="text-xl font-medium">No conversation selected</h3>
      <p className="text-muted-foreground">Select a conversation from the list to view messages</p>
    </div>
  );
};

export default NoConversation;
