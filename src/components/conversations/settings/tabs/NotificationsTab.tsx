
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const NotificationsTab: React.FC = () => {
  const [messageNotifications, setMessageNotifications] = useState<boolean>(true);
  const [groupNotifications, setGroupNotifications] = useState<boolean>(true);
  const [soundNotifications, setSoundNotifications] = useState<boolean>(true);
  const [desktopNotifications, setDesktopNotifications] = useState<boolean>(true);
  const [soundType, setSoundType] = useState<string>("default");

  const handleSaveSettings = () => {
    // Here you would save the notification settings
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="message-notifications">Message Notifications</Label>
              <Switch 
                id="message-notifications" 
                checked={messageNotifications} 
                onCheckedChange={setMessageNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="group-notifications">Group Notifications</Label>
              <Switch 
                id="group-notifications" 
                checked={groupNotifications} 
                onCheckedChange={setGroupNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-notifications">Sound Notifications</Label>
              <Switch 
                id="sound-notifications" 
                checked={soundNotifications} 
                onCheckedChange={setSoundNotifications} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
              <Switch 
                id="desktop-notifications" 
                checked={desktopNotifications} 
                onCheckedChange={setDesktopNotifications} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Sound Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="default-sound" 
                name="sound-type" 
                value="default" 
                checked={soundType === "default"} 
                onChange={() => setSoundType("default")} 
                className="h-4 w-4"
              />
              <Label htmlFor="default-sound">Default Sound</Label>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto"
                onClick={() => new Audio("/sounds/default-notification.mp3").play()}
              >
                Preview
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="soft-sound" 
                name="sound-type" 
                value="soft" 
                checked={soundType === "soft"} 
                onChange={() => setSoundType("soft")} 
                className="h-4 w-4"
              />
              <Label htmlFor="soft-sound">Soft Notification</Label>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto"
                onClick={() => new Audio("/sounds/soft-notification.mp3").play()}
              >
                Preview
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="radio" 
                id="none-sound" 
                name="sound-type" 
                value="none" 
                checked={soundType === "none"} 
                onChange={() => setSoundType("none")} 
                className="h-4 w-4"
              />
              <Label htmlFor="none-sound">No Sound</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
      </div>
    </div>
  );
};

export default NotificationsTab;
