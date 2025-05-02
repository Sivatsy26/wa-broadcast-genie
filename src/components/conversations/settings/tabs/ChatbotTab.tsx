
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash, Settings, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatbotTabProps {
  userRole: string;
}

const ChatbotTab: React.FC<ChatbotTabProps> = ({ userRole }) => {
  const [chatbotEnabled, setChatbotEnabled] = useState(true);
  const [chatbotName, setChatbotName] = useState("AssistBot");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I assist you today?");
  const [offlineMessage, setOfflineMessage] = useState("I'm currently offline, but leave a message and I'll get back to you soon.");
  const [aiModel, setAiModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState("0.7");
  const [maxResponseTokens, setMaxResponseTokens] = useState("1024");
  
  const [responses, setResponses] = useState([
    { id: 1, trigger: "pricing", response: "Our pricing starts at $29/month for the Basic plan, $99/month for Professional, and $299/month for Enterprise." },
    { id: 2, trigger: "help", response: "You can find our help documentation at https://help.example.com or reach out to support@example.com." },
    { id: 3, trigger: "contact", response: "You can reach our team at contact@example.com or call us at (555) 123-4567." },
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState([
    { id: 1, title: "Pricing Page", url: "https://example.com/pricing", active: true },
    { id: 2, title: "Help Documentation", url: "https://example.com/help", active: true },
    { id: 3, title: "Company Blog", url: "https://example.com/blog", active: false },
  ]);

  const [showNewResponse, setShowNewResponse] = useState(false);
  const [newTrigger, setNewTrigger] = useState("");
  const [newResponse, setNewResponse] = useState("");
  
  const [showNewKnowledgeSource, setShowNewKnowledgeSource] = useState(false);
  const [newSourceTitle, setNewSourceTitle] = useState("");
  const [newSourceUrl, setNewSourceUrl] = useState("");

  const handleSaveSettings = () => {
    toast({
      title: "Chatbot settings saved",
      description: "Your chatbot configuration has been updated."
    });
  };

  const handleAddResponse = () => {
    if (!newTrigger || !newResponse) {
      toast({
        title: "Error",
        description: "Please enter both a trigger word and a response.",
        variant: "destructive"
      });
      return;
    }
    
    const newResponseItem = {
      id: responses.length + 1,
      trigger: newTrigger.toLowerCase(),
      response: newResponse
    };
    
    setResponses([...responses, newResponseItem]);
    setNewTrigger("");
    setNewResponse("");
    setShowNewResponse(false);
    
    toast({
      title: "Response added",
      description: "The automated response has been added successfully."
    });
  };

  const handleDeleteResponse = (id: number) => {
    setResponses(responses.filter(response => response.id !== id));
    
    toast({
      title: "Response deleted",
      description: "The automated response has been removed."
    });
  };

  const handleAddKnowledgeSource = () => {
    if (!newSourceTitle || !newSourceUrl) {
      toast({
        title: "Error",
        description: "Please enter both a title and URL for the knowledge source.",
        variant: "destructive"
      });
      return;
    }
    
    const newSource = {
      id: knowledgeBase.length + 1,
      title: newSourceTitle,
      url: newSourceUrl,
      active: true
    };
    
    setKnowledgeBase([...knowledgeBase, newSource]);
    setNewSourceTitle("");
    setNewSourceUrl("");
    setShowNewKnowledgeSource(false);
    
    toast({
      title: "Knowledge source added",
      description: "The new knowledge source has been added successfully."
    });
  };

  const handleToggleKnowledgeSource = (id: number, active: boolean) => {
    setKnowledgeBase(knowledgeBase.map(source => 
      source.id === id ? { ...source, active } : source
    ));
    
    toast({
      title: active ? "Source activated" : "Source deactivated",
      description: active ? "The knowledge source is now active." : "The knowledge source has been deactivated."
    });
  };

  const handleDeleteKnowledgeSource = (id: number) => {
    setKnowledgeBase(knowledgeBase.filter(source => source.id !== id));
    
    toast({
      title: "Knowledge source deleted",
      description: "The knowledge source has been removed."
    });
  };

  const handleTrainBot = () => {
    toast({
      title: "Chatbot training started",
      description: "The chatbot is being trained on your knowledge base. This may take a few minutes."
    });
    
    // Simulate training completion after 3 seconds
    setTimeout(() => {
      toast({
        title: "Chatbot training completed",
        description: "Your chatbot has been successfully trained and is ready to use."
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Chatbot Settings</h2>
        <p className="text-muted-foreground">Configure and train your AI chatbot assistant</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="responses">Automated Responses</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">Enable Chatbot</h3>
                  <p className="text-sm text-muted-foreground">Toggle to enable or disable the chatbot on your website</p>
                </div>
                <Switch 
                  checked={chatbotEnabled}
                  onCheckedChange={setChatbotEnabled}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <Label htmlFor="chatbot-name">Chatbot Name</Label>
                  <Input 
                    id="chatbot-name"
                    value={chatbotName}
                    onChange={(e) => setChatbotName(e.target.value)}
                    placeholder="Enter a name for your chatbot"
                  />
                </div>
                
                <div>
                  <Label htmlFor="avatar">Chatbot Avatar</Label>
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <textarea
                    id="welcome-message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    placeholder="Enter a welcome message for your chatbot"
                  ></textarea>
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="offline-message">Offline Message</Label>
                  <textarea
                    id="offline-message"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={offlineMessage}
                    onChange={(e) => setOfflineMessage(e.target.value)}
                    placeholder="Enter a message to display when your chatbot is offline"
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <Label htmlFor="chat-position">Chat Widget Position</Label>
                  <select 
                    id="chat-position"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-left">Top Left</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <div className="flex mt-1">
                    <input 
                      type="color" 
                      id="theme-color" 
                      defaultValue="#4f46e5" 
                      className="w-10 h-10 p-1 border rounded" 
                    />
                    <Input defaultValue="#4f46e5" className="ml-2" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <Button onClick={handleSaveSettings}>Save Settings</Button>
                <Button variant="outline">Preview Chatbot</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Chatbot Availability</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">24/7 Availability</p>
                    <p className="text-sm text-muted-foreground">Keep your chatbot available at all times</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div>
                  <Label htmlFor="business-hours" className="mb-2 block">Business Hours</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-time" className="text-sm">Start Time</Label>
                      <Input id="start-time" type="time" defaultValue="09:00" />
                    </div>
                    <div>
                      <Label htmlFor="end-time" className="text-sm">End Time</Label>
                      <Input id="end-time" type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="flex flex-col items-center">
                        <Label htmlFor={`day-${day}`} className="text-xs mb-1">{day}</Label>
                        <input 
                          type="checkbox" 
                          id={`day-${day}`} 
                          defaultChecked={day !== 'Sat' && day !== 'Sun'} 
                          className="h-4 w-4"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Automated Responses</h3>
                <Button onClick={() => setShowNewResponse(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Response
                </Button>
              </div>
              
              {showNewResponse && (
                <div className="mb-6 p-4 border rounded-md bg-gray-50">
                  <h4 className="font-medium mb-2">Add Automated Response</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="trigger-word">Trigger Word/Phrase</Label>
                      <Input 
                        id="trigger-word" 
                        value={newTrigger} 
                        onChange={(e) => setNewTrigger(e.target.value)} 
                        placeholder="e.g., pricing, help, contact" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">The word or phrase that will trigger this response</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="automated-response">Response</Label>
                      <textarea
                        id="automated-response"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={newResponse}
                        onChange={(e) => setNewResponse(e.target.value)}
                        placeholder="Enter the response the chatbot should give"
                      ></textarea>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button onClick={handleAddResponse}>Add Response</Button>
                      <Button variant="outline" onClick={() => setShowNewResponse(false)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {responses.map(response => (
                  <div key={response.id} className="p-4 border rounded-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm inline-block mb-1">
                          {response.trigger}
                        </div>
                        <p className="text-sm">{response.response}</p>
                      </div>
                      <div className="flex mt-2 md:mt-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDeleteResponse(response.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {responses.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You don't have any automated responses yet.</p>
                    <Button className="mt-4" onClick={() => setShowNewResponse(true)}>Create Your First Response</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Knowledge Base</h3>
                <Button onClick={() => setShowNewKnowledgeSource(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </div>
              
              {showNewKnowledgeSource && (
                <div className="mb-6 p-4 border rounded-md bg-gray-50">
                  <h4 className="font-medium mb-2">Add Knowledge Source</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="source-title">Title</Label>
                      <Input 
                        id="source-title" 
                        value={newSourceTitle} 
                        onChange={(e) => setNewSourceTitle(e.target.value)} 
                        placeholder="e.g., Pricing Page" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="source-url">URL or File</Label>
                      <Input 
                        id="source-url" 
                        value={newSourceUrl} 
                        onChange={(e) => setNewSourceUrl(e.target.value)} 
                        placeholder="https://example.com/page-to-index" 
                      />
                      <p className="text-xs text-muted-foreground mt-1">Enter a URL to crawl or upload a document</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button onClick={handleAddKnowledgeSource}>Add Source</Button>
                      <Button variant="outline" onClick={() => setShowNewKnowledgeSource(false)}>Cancel</Button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {knowledgeBase.map(source => (
                  <div key={source.id} className="p-4 border rounded-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h4 className="font-medium">{source.title}</h4>
                        <p className="text-sm text-muted-foreground break-all">{source.url}</p>
                      </div>
                      <div className="flex items-center space-x-2 mt-2 md:mt-0">
                        <div className="flex items-center">
                          <Switch 
                            checked={source.active} 
                            onCheckedChange={(checked) => handleToggleKnowledgeSource(source.id, checked)} 
                          />
                          <span className="ml-2 text-sm">{source.active ? 'Active' : 'Inactive'}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDeleteKnowledgeSource(source.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {knowledgeBase.length === 0 && (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You don't have any knowledge sources yet.</p>
                    <Button className="mt-4" onClick={() => setShowNewKnowledgeSource(true)}>Add Your First Source</Button>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Button onClick={handleTrainBot}>Train Chatbot</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Training your chatbot will incorporate all active knowledge sources to improve responses.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="document-upload">Upload Documents</Label>
                  <Input id="document-upload" type="file" multiple accept=".pdf,.doc,.docx,.txt" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: PDF, Word (DOC, DOCX), Text files
                  </p>
                </div>
                
                <Button>Upload and Process</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">AI Model Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ai-model">AI Model</Label>
                  <select 
                    id="ai-model"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                  >
                    <option value="gpt-4">GPT-4 (Most Capable)</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
                    <option value="davinci">Davinci (Legacy)</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="temperature">Temperature (Creativity)</Label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" 
                      id="temperature" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="flex-grow h-2 rounded-lg appearance-none bg-gray-200"
                    />
                    <span>{temperature}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lower values produce more consistent, factual responses. Higher values produce more creative, varied responses.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="max-tokens">Maximum Response Length (tokens)</Label>
                  <Input 
                    id="max-tokens" 
                    type="number" 
                    value={maxResponseTokens}
                    onChange={(e) => setMaxResponseTokens(e.target.value)}
                    min="100"
                    max="4000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum number of tokens (roughly words) the AI can generate in a response.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Label className="mb-2 block">Context Handling</Label>
                  
                  <RadioGroup defaultValue="session" className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="session" id="session-context" />
                      <div>
                        <Label htmlFor="session-context">Session Context</Label>
                        <p className="text-sm text-muted-foreground">Remember conversation history during a single user session</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="persistent" id="persistent-context" />
                      <div>
                        <Label htmlFor="persistent-context">Persistent Context</Label>
                        <p className="text-sm text-muted-foreground">Remember conversation history across multiple sessions</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="stateless" id="stateless" />
                      <div>
                        <Label htmlFor="stateless">Stateless</Label>
                        <p className="text-sm text-muted-foreground">No memory between messages (each message is independent)</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={handleSaveSettings}>Save Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Chatbot Behavior</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Human Handoff</p>
                    <p className="text-sm text-muted-foreground">Allow users to request a human agent</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Collect User Feedback</p>
                    <p className="text-sm text-muted-foreground">Ask users to rate chatbot responses</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Collect User Information</p>
                    <p className="text-sm text-muted-foreground">Ask for name and email before starting chat</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Typing Indicator</p>
                    <p className="text-sm text-muted-foreground">Show typing animation when chatbot is responding</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>
              
              <div className="mt-6">
                <Button>Save Behavior Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Installation</h3>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Chatbot Embed Code</Label>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      {`<script>
  window.chatbotConfig = {
    apiKey: "YOUR_API_KEY",
    theme: "${primaryColor}",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.example.com/chatbot.js" async></script>`}
                    </pre>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`<script>
  window.chatbotConfig = {
    apiKey: "YOUR_API_KEY",
    theme: "${primaryColor}",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.example.com/chatbot.js" async></script>`);
                    toast({ title: "Code copied to clipboard" });
                  }}
                >
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatbotTab;
