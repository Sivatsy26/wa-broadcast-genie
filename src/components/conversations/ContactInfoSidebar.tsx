
import React from 'react';
import { Conversation } from '@/types/conversation';

interface ContactInfoSidebarProps {
  conversation: Conversation;
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactInfoSidebar: React.FC<ContactInfoSidebarProps> = ({ conversation, isOpen, onOpenChange }) => {
  return <div>Contact Info Sidebar (Placeholder)</div>;
};

export default ContactInfoSidebar;
