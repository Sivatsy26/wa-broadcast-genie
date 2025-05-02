
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AISettingsTab from './tabs/AISettingsTab';

interface SettingsPanelProps {
  userRole: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState("ai-assistant");

  return (
    <div className="pt-2">
      <Tabs defaultValue="ai-assistant" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full border-b pb-0">
          <TabsTrigger value="ai-assistant" className="flex-1">AI Assistant</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <TabsContent value="ai-assistant">
            <AISettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
