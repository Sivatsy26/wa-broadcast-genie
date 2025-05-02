
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Bot, 
  Plus, 
  Edit, 
  Trash2, 
  MessageSquare, 
  PanelLeft, 
  Copy,
  Settings,
  Code,
  Zap
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ChatbotTabProps {
  userRole: string;
}

const ChatbotTab: React.FC<ChatbotTabProps> = ({ userRole }) => {
  const [botName, setBotName] = useState("Customer Support Bot");
  const [welcomeMessage, setWelcomeMessage] = useState("Hello! How can I assist you today?");
  const [multiLanguageSupport, setMultiLanguageSupport] = useState(true);
  const [showBotAvatar, setShowBotAvatar] = useState(true);
  const [businessHours, setBusinessHours] = useState(true);
  const [handoffToHuman, setHandoffToHuman] = useState(true);
  const [saveChat, setSaveChat] = useState(true);
  const [aiModel, setAiModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState("0.7");
  const [maxResponseTokens, setMaxResponseTokens] = useState("1024");
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  
  const [responses, setResponses] = useState([
    { id: 1, trigger: "pricing", response: "Our pricing starts at $29/month for the Basic plan, $99/month for Professional, and $299/month for Enterprise." },
    { id: 2, trigger: "hours", response: "Our business hours are Monday to Friday, 9 AM to 5 PM EST." },
    { id: 3, trigger: "refund", response: "We offer a 30-day money-back guarantee for all our plans. Please contact our support team to process your refund." },
    { id: 4, trigger: "contact", response: "You can reach our support team at support@example.com or call us at +1-555-123-4567." }
  ]);

  const [newTrigger, setNewTrigger] = useState("");
  const [newResponse, setNewResponse] = useState("");
  const [editingResponse, setEditingResponse] = useState<{ id: number; trigger: string; response: string } | null>(null);

  const handleSaveChatbotSettings = () => {
    toast({
      title: "Chatbot settings saved",
      description: "Your chatbot configuration has been updated successfully."
    });
  };

  const handleAddResponse = () => {
    if (!newTrigger || !newResponse) {
      toast({
        title: "Missing information",
        description: "Please provide both a trigger and a response",
        variant: "destructive"
      });
      return;
    }

    const newId = responses.length > 0 ? Math.max(...responses.map(r => r.id)) + 1 : 1;
    
    setResponses([...responses, { id: newId, trigger: newTrigger, response: newResponse }]);
    setNewTrigger("");
    setNewResponse("");
    
    toast({
      title: "Response added",
      description: "A new automated response has been added"
    });
  };

  const handleEditResponse = (id: number, trigger: string, response: string) => {
    setEditingResponse({ id, trigger, response });
  };

  const handleSaveEdit = () => {
    if (!editingResponse) return;
    
    const updatedResponses = responses.map(r => 
      r.id === editingResponse.id 
        ? { ...r, trigger: editingResponse.trigger, response: editingResponse.response } 
        : r
    );
    
    setResponses(updatedResponses);
    setEditingResponse(null);
    
    toast({
      title: "Response updated",
      description: "The automated response has been updated"
    });
  };

  const handleDeleteResponse = (id: number) => {
    setResponses(responses.filter(r => r.id !== id));
    
    toast({
      title: "Response deleted",
      description: "The automated response has been removed"
    });
  };

  const handleDuplicateResponse = (response: { id: number; trigger: string; response: string }) => {
    const newId = responses.length > 0 ? Math.max(...responses.map(r => r.id)) + 1 : 1;
    
    setResponses([...responses, { 
      id: newId, 
      trigger: `${response.trigger}_copy`, 
      response: response.response 
    }]);
    
    toast({
      title: "Response duplicated",
      description: "The automated response has been duplicated"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Chatbot Settings</h2>
        <p className="text-muted-foreground">
          Configure your AI-powered chatbot to assist customers
        </p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bot-name">Chatbot Name</Label>
                    <Input 
                      id="bot-name" 
                      value={botName} 
                      onChange={(e) => setBotName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="welcome-message">Welcome Message</Label>
                    <Textarea 
                      id="welcome-message" 
                      value={welcomeMessage} 
                      onChange={(e) => setWelcomeMessage(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        id="primary-color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-avatar">Show Bot Avatar</Label>
                    <Switch 
                      id="show-avatar"
                      checked={showBotAvatar}
                      onCheckedChange={setShowBotAvatar}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="multilingual">Multi-language Support</Label>
                    <Switch 
                      id="multilingual"
                      checked={multiLanguageSupport}
                      onCheckedChange={setMultiLanguageSupport}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="business-hours">Business Hours Only</Label>
                    <Switch 
                      id="business-hours"
                      checked={businessHours}
                      onCheckedChange={setBusinessHours}
                    />
                  </div>
                  {businessHours && (
                    <div className="space-y-2 pl-6">
                      <p className="text-sm text-muted-foreground">
                        Chatbot will only be active during specified hours:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="start-time" className="text-xs">Start Time</Label>
                          <Input id="start-time" type="time" defaultValue="09:00" />
                        </div>
                        <div>
                          <Label htmlFor="end-time" className="text-xs">End Time</Label>
                          <Input id="end-time" type="time" defaultValue="17:00" />
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mt-2">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                          <Button 
                            key={index} 
                            variant={index < 5 ? "default" : "outline"}
                            size="sm"
                            className="w-full"
                          >
                            {day}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="handoff">Allow Human Handoff</Label>
                    <Switch 
                      id="handoff"
                      checked={handoffToHuman}
                      onCheckedChange={setHandoffToHuman}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="save-chat">Save Chat History</Label>
                    <Switch 
                      id="save-chat"
                      checked={saveChat}
                      onCheckedChange={setSaveChat}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleSaveChatbotSettings} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Preview</h3>
              <div className="border rounded-lg p-4 bg-slate-50 relative">
                <div className="flex items-center space-x-2 border-b pb-3 mb-3">
                  <Bot className="h-6 w-6" style={{ color: primaryColor }} />
                  <span className="font-medium">{botName}</span>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm inline-block max-w-xs">
                    {welcomeMessage}
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary p-3 rounded-lg shadow-sm inline-block max-w-xs text-white" style={{ backgroundColor: primaryColor }}>
                      How much does your service cost?
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm inline-block max-w-xs">
                    {responses.find(r => r.trigger === "pricing")?.response || "I don't have pricing information yet."}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Add New Response</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trigger-word">Trigger Word/Phrase</Label>
                  <Input 
                    id="trigger-word" 
                    placeholder="e.g., pricing, hours, refund"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    The keywords that will trigger this response
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="response-text">Response</Label>
                  <Textarea 
                    id="response-text" 
                    placeholder="Enter the response the chatbot should give"
                    rows={3}
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleAddResponse}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Response
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="font-medium mb-4">Automated Responses</h3>
            <div className="space-y-3">
              {responses.map(response => (
                <Card key={response.id}>
                  <CardContent className="p-4">
                    {editingResponse && editingResponse.id === response.id ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`edit-trigger-${response.id}`}>Trigger Word/Phrase</Label>
                          <Input 
                            id={`edit-trigger-${response.id}`}
                            value={editingResponse.trigger}
                            onChange={(e) => setEditingResponse({ 
                              ...editingResponse, 
                              trigger: e.target.value 
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`edit-response-${response.id}`}>Response</Label>
                          <Textarea 
                            id={`edit-response-${response.id}`}
                            rows={3}
                            value={editingResponse.response}
                            onChange={(e) => setEditingResponse({ 
                              ...editingResponse, 
                              response: e.target.value 
                            })}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button onClick={handleSaveEdit}>
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setEditingResponse(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">Trigger: <span className="font-normal">{response.trigger}</span></h4>
                            <p className="text-sm mt-1">{response.response}</p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleDuplicateResponse(response)}>
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditResponse(response.id, response.trigger, response.response)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteResponse(response.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">AI Configuration</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ai-model">AI Model</Label>
                    <select
                      id="ai-model"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                    >
                      <option value="gpt-4">GPT-4 (Recommended)</option>
                      <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                      <option value="claude-3">Claude 3</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      More advanced models provide better responses but may cost more
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">
                      Temperature: {temperature}
                    </Label>
                    <Input
                      id="temperature"
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>More Focused (0)</span>
                      <span>More Creative (1)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Maximum Response Length</Label>
                    <select
                      id="max-tokens"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={maxResponseTokens}
                      onChange={(e) => setMaxResponseTokens(e.target.value)}
                    >
                      <option value="256">Short (256 tokens)</option>
                      <option value="512">Medium (512 tokens)</option>
                      <option value="1024">Standard (1024 tokens)</option>
                      <option value="2048">Long (2048 tokens)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Integration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Website Embed</h4>
                      <p className="text-xs text-muted-foreground">
                        Add chatbot to your website
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Code className="mr-2 h-4 w-4" />
                      Get Code
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">WhatsApp Integration</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect to WhatsApp Business
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Knowledge Base</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect to your documentation
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <PanelLeft className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Expert Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea 
                    id="system-prompt" 
                    rows={5}
                    defaultValue="You are a helpful customer support assistant for our company. Be polite, concise, and helpful. If you don't know the answer to something, suggest the user contact our support team."
                  />
                  <p className="text-xs text-muted-foreground">
                    Instructions that define how the AI chatbot should behave
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Conversation Memory</h4>
                    <p className="text-xs text-muted-foreground">
                      Remember context from previous messages
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Stream Responses</h4>
                    <p className="text-xs text-muted-foreground">
                      Show typing animation for natural experience
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                
                <Button onClick={handleSaveChatbotSettings} className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Save Advanced Settings
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
