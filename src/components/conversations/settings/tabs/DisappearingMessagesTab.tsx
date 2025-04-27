
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const DisappearingMessagesTab: React.FC = () => {
  const [enableDisappearing, setEnableDisappearing] = useState<boolean>(false);
  const [days, setDays] = useState<string>("7");

  const handleSaveSettings = () => {
    let message = 'Messages will not disappear';
    if (enableDisappearing) {
      message = `Messages will disappear after ${days} days`;
    }
    
    toast({
      title: "Disappearing message settings saved",
      description: message
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
                  When enabled, messages will be automatically deleted after the specified number of days
                </p>
              </div>
              <Switch 
                id="enable-disappearing" 
                checked={enableDisappearing} 
                onCheckedChange={setEnableDisappearing} 
              />
            </div>
            
            {enableDisappearing && (
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>Days to keep messages</Label>
                  <Input
                    type="number"
                    min="1"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full max-w-[200px]"
                    placeholder="Enter number of days"
                  />
                </div>
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Messages older than the specified number of days will be permanently deleted and cannot be recovered.
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
