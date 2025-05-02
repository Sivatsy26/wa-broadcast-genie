
import React from 'react';
import SettingsPanel from "@/components/conversations/settings/SettingsPanel";
import { Toaster } from "@/components/ui/toaster";

const Settings = () => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <SettingsPanel />
      <Toaster />
    </div>
  );
};

export default Settings;
