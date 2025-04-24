
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger, 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

import { AppearanceSettings } from './tabs/AppearanceSettings';
import { NotificationSettings } from './tabs/NotificationSettings';
import { MessageSettings } from './tabs/MessageSettings';
import { DataSettings } from './tabs/DataSettings';

export const ConversationSettings: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl">Conversation Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="appearance" className="flex h-[calc(100%-4rem)]">
          <TabsList className="flex flex-col h-full space-y-1 rounded-none border-r pt-2 w-48">
            <TabsTrigger value="appearance" className="justify-start px-4">
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start px-4">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="messages" className="justify-start px-4">
              Messages
            </TabsTrigger>
            <TabsTrigger value="data" className="justify-start px-4">
              Data Management
            </TabsTrigger>
          </TabsList>
          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="appearance" className="mt-0">
              <AppearanceSettings />
            </TabsContent>
            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="messages" className="mt-0">
              <MessageSettings />
            </TabsContent>
            <TabsContent value="data" className="mt-0">
              <DataSettings />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
