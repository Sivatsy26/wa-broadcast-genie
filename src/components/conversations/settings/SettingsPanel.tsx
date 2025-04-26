
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppearanceTab from './tabs/AppearanceTab';
import NotificationsTab from './tabs/NotificationsTab';
import DisappearingMessagesTab from './tabs/DisappearingMessagesTab';
import TemplatesTab from './tabs/TemplatesTab';
import DataManagementTab from './tabs/DataManagementTab';
import AutomatedResponsesTab from './tabs/AutomatedResponsesTab';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("appearance");

  return (
    <div className="w-full">
      <Tabs defaultValue="appearance" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="disappearing">Disappearing Messages</TabsTrigger>
        </TabsList>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
          <TabsTrigger value="automated">Automated Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="pt-4">
          <AppearanceTab />
        </TabsContent>

        <TabsContent value="notifications" className="pt-4">
          <NotificationsTab />
        </TabsContent>

        <TabsContent value="disappearing" className="pt-4">
          <DisappearingMessagesTab />
        </TabsContent>

        <TabsContent value="templates" className="pt-4">
          <TemplatesTab />
        </TabsContent>

        <TabsContent value="data" className="pt-4">
          <DataManagementTab />
        </TabsContent>

        <TabsContent value="automated" className="pt-4">
          <AutomatedResponsesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
