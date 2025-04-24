
import React, { useState } from 'react';
import { AccountSelector } from './multi-account/AccountSelector';
import { ConversationSettings } from './settings/ConversationSettings';
import { AIAssistantPanel } from './ai-assistant/AIAssistantPanel';
import { AutoResponseManager } from './auto-response/AutoResponseManager';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Bot, MessageSquareText, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ConversationMenuBar: React.FC = () => {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isAutoResponseDialogOpen, setIsAutoResponseDialogOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <AccountSelector />

          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger className="font-normal">File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Conversation
                  <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Import Contacts
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Export Conversations
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-normal">View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Contacts
                  <MenubarShortcut>⌘1</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Archived
                  <MenubarShortcut>⌘2</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  Toggle Dark Mode
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="font-normal">Tools</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => setIsAutoResponseDialogOpen(true)}>
                  Auto Responses
                </MenubarItem>
                <MenubarItem onClick={() => setIsAIAssistantOpen(true)}>
                  AI Assistant
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAutoResponseDialogOpen} onOpenChange={setIsAutoResponseDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MessageSquareText className="h-4 w-4" />
                <span>Auto Responses</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Auto Responses</DialogTitle>
              </DialogHeader>
              <AutoResponseManager />
            </DialogContent>
          </Dialog>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-1"
          >
            <Bot className="h-4 w-4" />
            <span>AI Assistant</span>
          </Button>
          
          <ConversationSettings />
        </div>
      </div>

      <AIAssistantPanel 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </>
  );
};
