
import React, { useState } from 'react';
import ContactSidebar from '../panels/ContactSidebar';
import MessagePanel from '../panels/MessagePanel';
import { Contact } from '@/types/conversation';
import { cn } from '@/lib/utils';
import { ConversationMenuBar } from '../MenuBar';

const ConversationLayout = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] overflow-hidden bg-white rounded-lg border shadow-sm">
      <ConversationMenuBar />
      
      <div className="flex flex-1 overflow-hidden">
        <ContactSidebar 
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
        <div className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isInfoSidebarOpen ? "mr-80" : ""
        )}>
          <MessagePanel 
            contact={selectedContact}
            isInfoOpen={isInfoSidebarOpen}
            onToggleInfo={() => setIsInfoSidebarOpen(!isInfoSidebarOpen)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationLayout;
