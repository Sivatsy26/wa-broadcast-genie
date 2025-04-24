
import React from 'react';
import { Contact } from '@/types/conversation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ContactSidebarProps {
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const ContactSidebar: React.FC<ContactSidebarProps> = ({
  selectedContact,
  onSelectContact
}) => {
  return (
    <div className="w-80 border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Conversation list will be implemented here */}
      </div>
    </div>
  );
};

export default ContactSidebar;
