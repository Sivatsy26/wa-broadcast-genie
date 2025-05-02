
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const GlobalSettingsTab: React.FC = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [signupsEnabled, setSignupsEnabled] = useState(true);
  const [defaultUserRole, setDefaultUserRole] = useState("user");
  const [defaultLanguage, setDefaultLanguage] = useState("english");
  const [defaultTimezone, setDefaultTimezone] = useState("UTC");
  const [maxFileSizeMB, setMaxFileSizeMB] = useState("10");
  const [maxAttachments, setMaxAttachments] = useState("5");
  const [allowedFileTypes, setAllowedFileTypes] = useState("jpg,jpeg,png,pdf,doc,docx");
  const [supportEmail, setSupportEmail] = useState("support@example.com");
  const [systemNotifications, setSystemNotifications] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Global settings saved",
      description: "Your system settings have been updated."
    });
  };
  
  const handleClearCache = () => {
    toast({
      title: "Cache cleared",
      description: "System cache has been cleared successfully."
    });
  };
  
  const handleSystemBackup = () => {
    toast({
      title: "Backup started",
      description: "System backup has been initiated. You will be notified when complete."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Global System Settings</h2>
        <p className="text-muted-foreground">Configure global settings that affect the entire platform</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">System Status</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenance-mode" className="font-medium">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Temporarily disable the application for maintenance</p>
              </div>
              <Switch 
                id="maintenance-mode" 
                checked={maintenanceMode} 
                onCheckedChange={setMaintenanceMode} 
              />
            </div>
            
            {maintenanceMode && (
              <div className="mt-2">
                <Label htmlFor="maintenance-message" className="font-medium">Maintenance Message</Label>
                <textarea
                  id="maintenance-message"
                  className="flex mt-2 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Enter maintenance message to display to users"
                  defaultValue="We're currently performing scheduled maintenance. Please check back shortly."
                ></textarea>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="signups-enabled" className="font-medium">Enable New Signups</Label>
                <p className="text-sm text-muted-foreground">Allow new users to register for the platform</p>
              </div>
              <Switch 
                id="signups-enabled" 
                checked={signupsEnabled} 
                onCheckedChange={setSignupsEnabled} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="system-notifications" className="font-medium">System Notifications</Label>
                <p className="text-sm text-muted-foreground">Send administrative notifications on system events</p>
              </div>
              <Switch 
                id="system-notifications" 
                checked={systemNotifications} 
                onCheckedChange={setSystemNotifications} 
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleClearCache}>
              Clear System Cache
            </Button>
            <Button variant="outline" onClick={handleSystemBackup}>
              Backup System
            </Button>
            <Button variant="outline" className="text-yellow-600">
              Restart Services
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Default Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="default-user-role">Default User Role</Label>
              <select 
                id="default-user-role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={defaultUserRole}
                onChange={(e) => setDefaultUserRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="white-label">White Label</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="default-language">Default Language</Label>
              <select 
                id="default-language"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={defaultLanguage}
                onChange={(e) => setDefaultLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="portuguese">Portuguese</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="default-timezone">Default Timezone</Label>
              <select 
                id="default-timezone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={defaultTimezone}
                onChange={(e) => setDefaultTimezone(e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
                <option value="UTC+1">Central European Time (UTC+1)</option>
                <option value="UTC+8">China Standard Time (UTC+8)</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="support-email">Support Email Address</Label>
              <Input
                id="support-email"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">File Upload Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
              <Input
                id="max-file-size"
                type="number"
                value={maxFileSizeMB}
                onChange={(e) => setMaxFileSizeMB(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="max-attachments">Maximum Attachments Per Message</Label>
              <Input
                id="max-attachments"
                type="number"
                value={maxAttachments}
                onChange={(e) => setMaxAttachments(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="allowed-file-types">Allowed File Types (comma separated)</Label>
              <Input
                id="allowed-file-types"
                value={allowedFileTypes}
                onChange={(e) => setAllowedFileTypes(e.target.value)}
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveSettings}>Save Global Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalSettingsTab;
