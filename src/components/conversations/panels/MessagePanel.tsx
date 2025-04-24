
import React from 'react';
import { Contact } from '@/types/conversation';
import NoConversation from '../NoConversation';

interface MessagePanelProps {
  contact: Contact | null;
  isInfoOpen: boolean;
  onToggleInfo: () => void;
}

const MessagePanel: React.FC<MessagePanelProps> = ({
  contact,
  isInfoOpen,
  onToggleInfo
}) => {
  if (!contact) {
    return <NoConversation />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10" />
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.phone}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Message list will be implemented here */}
      </div>
      <div className="p-4 border-t">
        {/* Message input will be implemented here */}
      </div>
    </div>
  );
};

export default MessagePanel;
