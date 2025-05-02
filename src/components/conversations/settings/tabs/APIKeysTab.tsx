
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Copy, RefreshCw, Trash, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface APIKeysTabProps {
  userRole: string;
}

const APIKeysTab: React.FC<APIKeysTabProps> = ({ userRole }) => {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: "Production API Key", key: "sk_live_51Nc8aX2eZ9G7hTMI...", visible: false, created: "2023-03-15", lastUsed: "2023-05-01" },
    { id: 2, name: "Development API Key", key: "sk_test_51Nc8aX2eZ9G7hTMI...", visible: false, created: "2023-04-10", lastUsed: "2023-05-02" },
    { id: 3, name: "Webhook Integration", key: "wh_51Nc8aX2eZ9G7hTMIdDV9...", visible: false, created: "2023-04-25", lastUsed: "2023-04-30" },
  ]);

  const [webhookEndpoints, setWebhookEndpoints] = useState([
    { id: 1, url: "https://example.com/webhook/messages", events: ["message.created", "message.updated"], active: true },
    { id: 2, url: "https://yourapp.com/api/notifications", events: ["user.created"], active: false },
  ]);

  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleKeyVisibility = (id: number) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, visible: !key.visible } : key
    ));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard."
    });
  };

  const handleRegenerateKey = (id: number) => {
    const newKey = "sk_" + (Math.random().toString(36).substring(2, 15)) + (Math.random().toString(36).substring(2, 15));
    
    setApiKeys(apiKeys.map(key => 
      key.id === id ? { ...key, key: newKey } : key
    ));
    
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Make sure to update your applications."
    });
  };

  const handleDeleteKey = (id: number) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    
    toast({
      title: "API key deleted",
      description: "The API key has been permanently deleted."
    });
  };

  const handleCreateKey = () => {
    if (!newKeyName) {
      toast({
        title: "Error",
        description: "Please enter a name for the API key.",
        variant: "destructive"
      });
      return;
    }
    
    const newKey = {
      id: apiKeys.length + 1,
      name: newKeyName,
      key: "sk_" + (Math.random().toString(36).substring(2, 15)) + (Math.random().toString(36).substring(2, 15)),
      visible: true,
      created: new Date().toISOString().split('T')[0],
      lastUsed: "Never"
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setShowCreateKey(false);
    
    toast({
      title: "API key created",
      description: "Your new API key has been created successfully."
    });
  };

  const handleToggleWebhook = (id: number, active: boolean) => {
    setWebhookEndpoints(webhookEndpoints.map(endpoint => 
      endpoint.id === id ? { ...endpoint, active } : endpoint
    ));
    
    toast({
      title: active ? "Webhook enabled" : "Webhook disabled",
      description: active ? "The webhook endpoint is now active." : "The webhook endpoint has been disabled."
    });
  };

  const handleDeleteWebhook = (id: number) => {
    setWebhookEndpoints(webhookEndpoints.filter(endpoint => endpoint.id !== id));
    
    toast({
      title: "Webhook deleted",
      description: "The webhook endpoint has been removed."
    });
  };

  const handleCreateWebhook = () => {
    if (!newWebhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL for the webhook endpoint.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedEvents.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one event to trigger this webhook.",
        variant: "destructive"
      });
      return;
    }
    
    const newWebhook = {
      id: webhookEndpoints.length + 1,
      url: newWebhookUrl,
      events: selectedEvents,
      active: true
    };
    
    setWebhookEndpoints([...webhookEndpoints, newWebhook]);
    setNewWebhookUrl("");
    setSelectedEvents([]);
    setShowAddWebhook(false);
    
    toast({
      title: "Webhook created",
      description: "Your new webhook endpoint has been created successfully."
    });
  };

  const toggleEvent = (event: string) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter(e => e !== event));
    } else {
      setSelectedEvents([...selectedEvents, event]);
    }
  };

  const availableEvents = [
    "message.created",
    "message.updated",
    "user.created",
    "user.updated",
    "conversation.created",
    "conversation.updated"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">API Keys</h2>
        <p className="text-muted-foreground">Manage API keys for accessing your account programmatically</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">API Keys</h3>
            <Button onClick={() => setShowCreateKey(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </div>
          
          {showCreateKey && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <h4 className="font-medium mb-2">Create New API Key</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input 
                    id="key-name" 
                    value={newKeyName} 
                    onChange={(e) => setNewKeyName(e.target.value)} 
                    placeholder="e.g., Production API Key" 
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleCreateKey}>Create Key</Button>
                  <Button variant="outline" onClick={() => setShowCreateKey(false)}>Cancel</Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="p-4 border rounded-md">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-muted-foreground">Created: {apiKey.created} • Last used: {apiKey.lastUsed}</p>
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {apiKey.visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleCopyKey(apiKey.key)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRegenerateKey(apiKey.id)}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteKey(apiKey.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 p-2 rounded flex items-center">
                  <code className="text-sm flex-grow">
                    {apiKey.visible ? apiKey.key : apiKey.key.replace(/./g, '•')}
                  </code>
                </div>
              </div>
            ))}
            
            {apiKeys.length === 0 && (
              <div className="text-center py-6">
                <p className="text-muted-foreground">You don't have any API keys yet.</p>
                <Button className="mt-4" onClick={() => setShowCreateKey(true)}>Create Your First API Key</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {(userRole === 'super-admin' || userRole === 'white-label' || userRole === 'admin') && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Webhook Endpoints</h3>
              <Button onClick={() => setShowAddWebhook(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
            </div>
            
            {showAddWebhook && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h4 className="font-medium mb-2">Add Webhook Endpoint</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input 
                      id="webhook-url" 
                      value={newWebhookUrl} 
                      onChange={(e) => setNewWebhookUrl(e.target.value)} 
                      placeholder="https://your-app.com/webhook" 
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Events to Subscribe</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availableEvents.map(event => (
                        <div key={event} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id={`event-${event}`} 
                            checked={selectedEvents.includes(event)} 
                            onChange={() => toggleEvent(event)} 
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor={`event-${event}`} className="text-sm">{event}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateWebhook}>Create Webhook</Button>
                    <Button variant="outline" onClick={() => setShowAddWebhook(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {webhookEndpoints.map(webhook => (
                <div key={webhook.id} className="p-4 border rounded-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div className="flex-grow">
                      <h4 className="font-medium break-all">{webhook.url}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {webhook.events.map(event => (
                          <span 
                            key={event} 
                            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <div className="flex items-center">
                        <Switch 
                          checked={webhook.active} 
                          onCheckedChange={(checked) => handleToggleWebhook(webhook.id, checked)} 
                        />
                        <span className="ml-2 text-sm">{webhook.active ? 'Active' : 'Inactive'}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500"
                        onClick={() => handleDeleteWebhook(webhook.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {webhookEndpoints.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">You don't have any webhook endpoints yet.</p>
                  <Button className="mt-4" onClick={() => setShowAddWebhook(true)}>Create Your First Webhook</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">API Documentation</h3>
          <p className="mb-4">
            Learn how to integrate with our API and use webhooks effectively to build powerful integrations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              API Reference
            </Button>
            
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
              Code Examples
            </Button>
            
            <Button variant="outline" className="justify-start">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Webhook Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIKeysTab;
