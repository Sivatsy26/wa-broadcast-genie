
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';

export const MessageSettings = () => {
  const [disappearingMessages, setDisappearingMessages] = useState<boolean>(false);
  const [disappearingTime, setDisappearingTime] = useState<number>(24); // In hours

  const handleDisappearingToggle = (checked: boolean) => {
    setDisappearingMessages(checked);
    toast({
      title: checked ? 'Disappearing messages enabled' : 'Disappearing messages disabled',
      description: checked 
        ? `Messages will disappear after ${disappearingTime} hours.` 
        : 'Messages will be kept permanently.',
    });
  };

  const handleTimeChange = (value: number[]) => {
    setDisappearingTime(value[0]);
  };

  const formatTime = (hours: number): string => {
    if (hours < 24) {
      return `${hours} hours`;
    } else if (hours === 24) {
      return '1 day';
    } else if (hours < 168) {
      return `${Math.floor(hours / 24)} days`;
    } else {
      return '1 week';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Message Settings</h2>
      <p className="text-muted-foreground">Configure how messages are handled in conversations</p>

      <Card>
        <CardHeader>
          <CardTitle>Disappearing Messages</CardTitle>
          <CardDescription>
            Messages will be automatically deleted after the specified time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="disappearing-toggle">Enable disappearing messages</Label>
            <Switch 
              id="disappearing-toggle" 
              checked={disappearingMessages} 
              onCheckedChange={handleDisappearingToggle} 
            />
          </div>
          
          {disappearingMessages && (
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Time before messages disappear</Label>
                <p className="text-sm text-muted-foreground">
                  Current: {formatTime(disappearingTime)}
                </p>
              </div>
              <Slider
                defaultValue={[24]}
                min={1}
                max={168}
                step={1}
                value={[disappearingTime]}
                onValueChange={handleTimeChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 hour</span>
                <span>1 day</span>
                <span>1 week</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
