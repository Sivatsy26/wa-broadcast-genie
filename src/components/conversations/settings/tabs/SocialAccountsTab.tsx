
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Facebook, Instagram, MessageSquare, Link, Globe } from 'lucide-react';

interface SocialAccountsTabProps {
  userRole: string;
}

const SocialAccountsTab: React.FC<SocialAccountsTabProps> = ({ userRole }) => {
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 'facebook', name: 'Facebook', connected: true, username: 'johndoe', autoPost: true },
    { id: 'twitter', name: 'Twitter', connected: true, username: '@johndoe', autoPost: false },
    { id: 'instagram', name: 'Instagram', connected: false, username: '', autoPost: false },
    { id: 'linkedin', name: 'LinkedIn', connected: true, username: 'john-doe', autoPost: true },
    { id: 'youtube', name: 'YouTube', connected: false, username: '', autoPost: false },
    { id: 'telegram', name: 'Telegram', connected: false, username: '', autoPost: false },
    { id: 'website', name: 'Website Widget', connected: false, username: '', autoPost: false },
  ]);

  const handleConnect = (accountId: string) => {
    setSocialAccounts(socialAccounts.map(account => 
      account.id === accountId ? { ...account, connected: true, username: 'new_user' + Math.floor(Math.random() * 1000) } : account
    ));
    
    toast({
      title: "Account connected",
      description: `Your ${accountId} account has been connected successfully.`
    });
  };

  const handleDisconnect = (accountId: string) => {
    setSocialAccounts(socialAccounts.map(account => 
      account.id === accountId ? { ...account, connected: false, username: '' } : account
    ));
    
    toast({
      title: "Account disconnected",
      description: `Your ${accountId} account has been disconnected.`
    });
  };

  const handleToggleAutoPost = (accountId: string, value: boolean) => {
    setSocialAccounts(socialAccounts.map(account => 
      account.id === accountId ? { ...account, autoPost: value } : account
    ));
    
    toast({
      title: "Setting updated",
      description: value 
        ? `Auto-posting has been enabled for ${accountId}.` 
        : `Auto-posting has been disabled for ${accountId}.`
    });
  };
  
  const handleSaveApiSettings = () => {
    toast({
      title: "API settings saved",
      description: "Your social API settings have been updated."
    });
  };

  const getSocialIcon = (accountId: string) => {
    switch(accountId) {
      case 'facebook':
        return <Facebook className="h-4 w-4 text-blue-600" />;
      case 'instagram':
        return <Instagram className="h-4 w-4 text-purple-600" />;
      case 'telegram':
        return <MessageSquare className="h-4 w-4 text-blue-500" />; // Using MessageSquare as alternative
      case 'website':
        return <Globe className="h-4 w-4 text-green-600" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {accountId.substring(0, 1).toUpperCase()}
        </div>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Social Accounts</h2>
        <p className="text-muted-foreground">Connect and manage your social media accounts</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
          
          <div className="space-y-4">
            {socialAccounts.map(account => (
              <div key={account.id} className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {getSocialIcon(account.id)}
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    {account.connected && <p className="text-sm text-muted-foreground">{account.username}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {account.connected && (
                    <div className="flex items-center mr-4">
                      <Switch 
                        id={`auto-post-${account.id}`}
                        checked={account.autoPost}
                        onCheckedChange={(value) => handleToggleAutoPost(account.id, value)}
                        className="mr-2"
                      />
                      <Label htmlFor={`auto-post-${account.id}`} className="text-sm">Auto-post</Label>
                    </div>
                  )}
                  {account.connected ? (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDisconnect(account.id)}
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleConnect(account.id)}
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {(userRole === 'super-admin' || userRole === 'white-label' || userRole === 'admin') && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Social API Settings</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook-app-id">Facebook App ID</Label>
                  <Input id="facebook-app-id" placeholder="Enter Facebook App ID" />
                </div>
                <div>
                  <Label htmlFor="facebook-app-secret">Facebook App Secret</Label>
                  <Input id="facebook-app-secret" type="password" placeholder="Enter Facebook App Secret" />
                </div>
                <div>
                  <Label htmlFor="twitter-api-key">Twitter API Key</Label>
                  <Input id="twitter-api-key" placeholder="Enter Twitter API Key" />
                </div>
                <div>
                  <Label htmlFor="twitter-api-secret">Twitter API Secret</Label>
                  <Input id="twitter-api-secret" type="password" placeholder="Enter Twitter API Secret" />
                </div>
                <div>
                  <Label htmlFor="instagram-client-id">Instagram Client ID</Label>
                  <Input id="instagram-client-id" placeholder="Enter Instagram Client ID" />
                </div>
                <div>
                  <Label htmlFor="instagram-client-secret">Instagram Client Secret</Label>
                  <Input id="instagram-client-secret" type="password" placeholder="Enter Instagram Client Secret" />
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="callback-url">Callback URL</Label>
                <div className="flex mt-1">
                  <Input id="callback-url" value="https://yourdomain.com/auth/callback" readOnly className="bg-gray-50" />
                  <Button 
                    variant="outline" 
                    className="ml-2"
                    onClick={() => {
                      navigator.clipboard.writeText("https://yourdomain.com/auth/callback");
                      toast({ title: "URL copied to clipboard" });
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Use this URL in your social app configurations as the redirect/callback URL.</p>
              </div>
              
              <div className="mt-6">
                <Button onClick={handleSaveApiSettings}>Save API Settings</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Posting Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Schedule Posts</p>
                <p className="text-sm text-muted-foreground">Automatically schedule posts for optimal times</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cross-Platform Posting</p>
                <p className="text-sm text-muted-foreground">Post content to all connected platforms at once</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notify on Engagement</p>
                <p className="text-sm text-muted-foreground">Get notified when users engage with your posts</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="mt-6">
              <Button>Save Posting Preferences</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialAccountsTab;
