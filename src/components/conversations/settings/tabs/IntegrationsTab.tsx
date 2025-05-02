
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface IntegrationsTabProps {
  userRole: string;
}

const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ userRole }) => {
  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack', connected: true, icon: '🔵', category: 'communication' },
    { id: 'zoom', name: 'Zoom', connected: false, icon: '📹', category: 'communication' },
    { id: 'google_calendar', name: 'Google Calendar', connected: true, icon: '📅', category: 'productivity' },
    { id: 'salesforce', name: 'Salesforce', connected: false, icon: '☁️', category: 'crm' },
    { id: 'hubspot', name: 'HubSpot', connected: true, icon: '🧲', category: 'crm' },
    { id: 'mailchimp', name: 'Mailchimp', connected: false, icon: '📧', category: 'email' },
    { id: 'stripe', name: 'Stripe', connected: true, icon: '💳', category: 'payment' },
    { id: 'zapier', name: 'Zapier', connected: false, icon: '⚡', category: 'automation' },
    { id: 'google_analytics', name: 'Google Analytics', connected: true, icon: '📊', category: 'analytics' },
  ]);

  const [filter, setFilter] = useState('all');

  const handleConnect = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? { ...integration, connected: true } : integration
    ));
    
    toast({
      title: "Integration connected",
      description: `The ${id} integration has been connected successfully.`
    });
  };

  const handleDisconnect = (id: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === id ? { ...integration, connected: false } : integration
    ));
    
    toast({
      title: "Integration disconnected",
      description: `The ${id} integration has been disconnected.`
    });
  };

  const handleSaveSettings = (id: string) => {
    toast({
      title: "Settings saved",
      description: `The settings for ${id} have been saved successfully.`
    });
  };

  const filteredIntegrations = filter === 'all' 
    ? integrations 
    : filter === 'connected' 
      ? integrations.filter(i => i.connected) 
      : filter === 'disconnected' 
        ? integrations.filter(i => !i.connected)
        : integrations.filter(i => i.category === filter);

  const categories = ['all', 'connected', 'disconnected', 'communication', 'productivity', 'crm', 'email', 'payment', 'automation', 'analytics'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Integrations</h2>
        <p className="text-muted-foreground">Connect and manage third-party integrations</p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={filter === category ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className={integration.connected ? "border-primary/20" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-2xl mr-3">
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{integration.category}</p>
                  </div>
                </div>
                <div>
                  {integration.connected ? (
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Connected</div>
                  ) : (
                    <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">Not Connected</div>
                  )}
                </div>
              </div>
              
              {integration.connected ? (
                <>
                  {integration.id === 'slack' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="slack-channel">Default Channel</Label>
                        <Input id="slack-channel" defaultValue="#general" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="slack-notifications">Notifications</Label>
                        <Switch id="slack-notifications" defaultChecked={true} />
                      </div>
                    </div>
                  )}
                  
                  {integration.id === 'google_calendar' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="calendar-id">Default Calendar</Label>
                        <Input id="calendar-id" defaultValue="primary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="calendar-sync">Two-way Sync</Label>
                        <Switch id="calendar-sync" defaultChecked={true} />
                      </div>
                    </div>
                  )}
                  
                  {integration.id === 'hubspot' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hubspot-contacts">Sync Contacts</Label>
                        <Switch id="hubspot-contacts" defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hubspot-deals">Sync Deals</Label>
                        <Switch id="hubspot-deals" defaultChecked={false} />
                      </div>
                    </div>
                  )}
                  
                  {integration.id === 'stripe' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="stripe-webhooks">Enable Webhooks</Label>
                        <Switch id="stripe-webhooks" defaultChecked={true} />
                      </div>
                      <div>
                        <Label htmlFor="stripe-mode">Mode</Label>
                        <select 
                          id="stripe-mode"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          defaultValue="test"
                        >
                          <option value="test">Test Mode</option>
                          <option value="live">Live Mode</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {integration.id === 'google_analytics' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ga-id">Tracking ID</Label>
                        <Input id="ga-id" defaultValue="UA-12345678-1" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="ga-anonymize">Anonymize IP</Label>
                        <Switch id="ga-anonymize" defaultChecked={true} />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={() => handleDisconnect(integration.id)}>Disconnect</Button>
                    <Button onClick={() => handleSaveSettings(integration.id)}>Save Settings</Button>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-sm mb-4">
                    {integration.id === 'zoom' && "Connect your Zoom account to schedule and manage video meetings directly from the application."}
                    {integration.id === 'salesforce' && "Sync contacts, deals and activities with your Salesforce CRM."}
                    {integration.id === 'mailchimp' && "Connect to Mailchimp to sync contacts and automate email campaigns."}
                    {integration.id === 'zapier' && "Connect with 3,000+ apps through Zapier's automation platform."}
                  </p>
                  <Button onClick={() => handleConnect(integration.id)}>Connect {integration.name}</Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No integrations found for this filter.</p>
          <Button className="mt-4" onClick={() => setFilter('all')}>View All Integrations</Button>
        </div>
      )}
      
      {(userRole === 'super-admin' || userRole === 'white-label') && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Custom Integration</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Create a custom integration with any third-party service using our API.
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="integration-name">Integration Name</Label>
                <Input id="integration-name" placeholder="Enter name for your custom integration" />
              </div>
              
              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-service.com/webhook" />
              </div>
              
              <div>
                <Label htmlFor="auth-type">Authentication Type</Label>
                <select 
                  id="auth-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="none">None</option>
                  <option value="basic">Basic Auth</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="api_key">API Key</option>
                  <option value="oauth2">OAuth 2.0</option>
                </select>
              </div>
              
              <div className="flex justify-end">
                <Button>Create Integration</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IntegrationsTab;
