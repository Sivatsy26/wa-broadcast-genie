
import React, { useState } from 'react';
import SettingsPanel from "@/components/conversations/settings/SettingsPanel";
import { Toaster } from "@/components/ui/toaster";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const [userRole, setUserRole] = useState('admin');

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-2">View as role:</p>
          <ToggleGroup type="single" value={userRole} onValueChange={(value) => value && setUserRole(value)}>
            <ToggleGroupItem value="super-admin" className="text-xs">
              Super Admin
            </ToggleGroupItem>
            <ToggleGroupItem value="white-label" className="text-xs">
              White Label
            </ToggleGroupItem>
            <ToggleGroupItem value="admin" className="text-xs">
              Admin
            </ToggleGroupItem>
            <ToggleGroupItem value="user" className="text-xs">
              User
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <SettingsPanel userRole={userRole} />
      <Toaster />
    </div>
  );
};

export default Settings;
