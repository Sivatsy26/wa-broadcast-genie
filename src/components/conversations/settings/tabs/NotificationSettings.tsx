
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export const NotificationSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [notifyNewMessages, setNotifyNewMessages] = useState<boolean>(true);
  const [notifyMentions, setNotifyMentions] = useState<boolean>(true);

  const handleSoundToggle = (checked: boolean) => {
    setSoundEnabled(checked);
    toast({
      title: checked ? 'Sound notifications enabled' : 'Sound notifications disabled',
      description: checked ? 'You will now hear notification sounds.' : 'Notification sounds have been muted.',
    });
  };

  const handleNewMessagesToggle = (checked: boolean) => {
    setNotifyNewMessages(checked);
    toast({
      title: checked ? 'New message notifications enabled' : 'New message notifications disabled',
      description: checked ? 'You will be notified of new messages.' : 'You will not be notified of new messages.',
    });
  };

  const handleMentionsToggle = (checked: boolean) => {
    setNotifyMentions(checked);
    toast({
      title: checked ? 'Mention notifications enabled' : 'Mention notifications disabled',
      description: checked ? 'You will be notified when mentioned.' : 'You will not be notified when mentioned.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Notification Settings</h2>
      <p className="text-muted-foreground">Control how you're notified about conversations</p>

      <Card>
        <CardHeader>
          <CardTitle>Sound Notifications</CardTitle>
          <CardDescription>Enable or disable sound alerts for notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-toggle">Play sound for notifications</Label>
            <Switch id="sound-toggle" checked={soundEnabled} onCheckedChange={handleSoundToggle} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Message Notifications</CardTitle>
          <CardDescription>Configure what messages trigger notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="new-message-toggle">Notify on new messages</Label>
            <Switch id="new-message-toggle" checked={notifyNewMessages} onCheckedChange={handleNewMessagesToggle} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mentions-toggle">Notify when mentioned</Label>
            <Switch id="mentions-toggle" checked={notifyMentions} onCheckedChange={handleMentionsToggle} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
