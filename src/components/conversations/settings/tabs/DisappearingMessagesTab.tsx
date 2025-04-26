
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const DisappearingMessagesTab: React.FC = () => {
  const [enableDisappearing, setEnableDisappearing] = useState<boolean>(false);
  const [disappearingTime, setDisappearingTime] = useState<string>("24h");

  const handleSaveSettings = () => {
    // Here you would save the disappearing messages settings
    toast({
      title: "Disappearing message settings saved",
      description: `Messages will ${enableDisappearing ? `disappear after ${disappearingTime}` : 'not disappear'}.`
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-disappearing" className="text-base font-medium">Enable Disappearing Messages</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  When enabled, new messages will disappear after the specified time
                </p>
              </div>
              <Switch 
                id="enable-disappearing" 
                checked={enableDisappearing} 
                onCheckedChange={setEnableDisappearing} 
              />
            </div>
            
            {enableDisappearing && (
              <div className="space-y-2">
                <Label htmlFor="disappearing-time">Messages will disappear after:</Label>
                <Select
                  value={disappearingTime}
                  onValueChange={setDisappearingTime}
                  disabled={!enableDisappearing}
                >
                  <SelectTrigger id="disappearing-time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 hour</SelectItem>
                    <SelectItem value="6h">6 hours</SelectItem>
                    <SelectItem value="12h">12 hours</SelectItem>
                    <SelectItem value="24h">24 hours (1 day)</SelectItem>
                    <SelectItem value="7d">7 days</SelectItem>
                    <SelectItem value="30d">30 days</SelectItem>
                    <SelectItem value="90d">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Once disappearing messages are enabled, they will apply to new messages only.
                Previously sent messages will not be affected.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Disappearing Message Settings</Button>
      </div>
    </div>
  );
};

export default DisappearingMessagesTab;
