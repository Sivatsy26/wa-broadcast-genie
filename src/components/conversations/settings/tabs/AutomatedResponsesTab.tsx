
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trash2, edit, messageSquarePlus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AutoResponse {
  id: string;
  name: string;
  message: string;
  active: boolean;
  condition: 'away' | 'afterHours' | 'always';
}

const AutomatedResponsesTab: React.FC = () => {
  const [enableAutoResponses, setEnableAutoResponses] = useState(true);
  const [activeStatus, setActiveStatus] = useState<'available' | 'away'>('available');
  const [autoResponses, setAutoResponses] = useState<AutoResponse[]>([
    {
      id: '1',
      name: 'Away Message',
      message: "Thank you for your message. I'm currently unavailable but will respond as soon as I return.",
      active: true,
      condition: 'away'
    },
    {
      id: '2',
      name: 'After Hours',
      message: "Thank you for contacting us. Our business hours are Monday to Friday, 9 AM to 5 PM. We'll respond to your message when we return to the office.",
      active: true,
      condition: 'afterHours'
    }
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newResponseName, setNewResponseName] = useState('');
  const [newResponseMessage, setNewResponseMessage] = useState('');
  const [newResponseCondition, setNewResponseCondition] = useState<'away' | 'afterHours' | 'always'>('always');
  const [editingResponse, setEditingResponse] = useState<AutoResponse | null>(null);

  const handleAddResponse = () => {
    if (newResponseName.trim() && newResponseMessage.trim()) {
      const newResponse: AutoResponse = {
        id: `response-${Date.now()}`,
        name: newResponseName,
        message: newResponseMessage,
        active: true,
        condition: newResponseCondition
      };
      setAutoResponses([...autoResponses, newResponse]);
      setNewResponseName('');
      setNewResponseMessage('');
      setNewResponseCondition('always');
      setIsAddDialogOpen(false);
      
      toast({
        title: "Auto response added",
        description: `"${newResponseName}" has been added successfully.`
      });
    }
  };

  const handleEditResponse = () => {
    if (editingResponse && editingResponse.name.trim() && editingResponse.message.trim()) {
      setAutoResponses(autoResponses.map(r => 
        r.id === editingResponse.id ? editingResponse : r
      ));
      setIsEditDialogOpen(false);
      
      toast({
        title: "Auto response updated",
        description: `"${editingResponse.name}" has been updated successfully.`
      });
    }
  };

  const toggleResponseActive = (id: string) => {
    setAutoResponses(autoResponses.map(r => 
      r.id === id ? {...r, active: !r.active} : r
    ));
  };

  const handleDeleteResponse = (id: string) => {
    setAutoResponses(autoResponses.filter(r => r.id !== id));
    
    toast({
      title: "Auto response deleted",
      description: "The automated response has been deleted successfully."
    });
  };

  const startEditingResponse = (response: AutoResponse) => {
    setEditingResponse({...response});
    setIsEditDialogOpen(true);
  };

  const handleSaveSettings = () => {
    toast({
      title: "Automated response settings saved",
      description: `Automated responses are now ${enableAutoResponses ? 'enabled' : 'disabled'}.`
    });
  };

  const getConditionText = (condition: string) => {
    switch(condition) {
      case 'away': return 'When Away';
      case 'afterHours': return 'After Hours';
      case 'always': return 'Always Active';
      default: return condition;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-auto-responses" className="text-base font-medium">Enable Automated Responses</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Automatically respond to messages when you're unavailable
                </p>
              </div>
              <Switch 
                id="enable-auto-responses" 
                checked={enableAutoResponses} 
                onCheckedChange={setEnableAutoResponses} 
              />
            </div>
            
            {enableAutoResponses && (
              <div className="space-y-2 pt-2 border-t">
                <Label>Your Current Status</Label>
                <div className="flex space-x-4">
                  <Button 
                    variant={activeStatus === 'available' ? 'default' : 'outline'}
                    onClick={() => setActiveStatus('available')}
                    className="flex-1"
                  >
                    Available
                  </Button>
                  <Button 
                    variant={activeStatus === 'away' ? 'default' : 'outline'}
                    onClick={() => setActiveStatus('away')}
                    className="flex-1"
                  >
                    Away
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  {activeStatus === 'available' 
                    ? 'You are marked as available. After-hours responses will still be sent outside business hours.'
                    : 'You are marked as away. Away messages will be sent to new conversations.'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Automated Responses</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <messageSquarePlus className="mr-2 h-4 w-4" />
              Add New Response
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Automated Response</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Name</label>
                <Input
                  placeholder="Enter response name"
                  value={newResponseName}
                  onChange={(e) => setNewResponseName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">When to send this response</label>
                <Select 
                  value={newResponseCondition} 
                  onValueChange={(v) => setNewResponseCondition(v as 'away' | 'afterHours' | 'always')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select when to send" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="away">When Away</SelectItem>
                    <SelectItem value="afterHours">After Business Hours</SelectItem>
                    <SelectItem value="always">Always Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Message</label>
                <Textarea
                  placeholder="Enter message to send automatically"
                  rows={6}
                  value={newResponseMessage}
                  onChange={(e) => setNewResponseMessage(e.target.value)}
                />
              </div>
              
              <Button onClick={handleAddResponse} className="w-full">Save Response</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {autoResponses.map((response) => (
          <Card key={response.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium">{response.name}</h3>
                  <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">
                    {getConditionText(response.condition)}
                  </span>
                </div>
                <div className="flex space-x-2 items-center">
                  <Switch 
                    checked={response.active}
                    onCheckedChange={() => toggleResponseActive(response.id)}
                    size="sm"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => startEditingResponse(response)}
                  >
                    <edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteResponse(response.id)}
                  >
                    <trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className={`text-sm ${!response.active ? "text-muted-foreground" : ""} border-t pt-2 whitespace-pre-wrap`}>
                {response.message}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Automated Response</DialogTitle>
          </DialogHeader>
          {editingResponse && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Name</label>
                <Input
                  placeholder="Enter response name"
                  value={editingResponse.name}
                  onChange={(e) => setEditingResponse({...editingResponse, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">When to send this response</label>
                <Select 
                  value={editingResponse.condition} 
                  onValueChange={(v) => setEditingResponse({...editingResponse, condition: v as 'away' | 'afterHours' | 'always'})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select when to send" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="away">When Away</SelectItem>
                    <SelectItem value="afterHours">After Business Hours</SelectItem>
                    <SelectItem value="always">Always Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Response Message</label>
                <Textarea
                  placeholder="Enter message to send automatically"
                  rows={6}
                  value={editingResponse.message}
                  onChange={(e) => setEditingResponse({...editingResponse, message: e.target.value})}
                />
              </div>
              
              <Button onClick={handleEditResponse} className="w-full">Update Response</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Response Settings</Button>
      </div>
    </div>
  );
};

export default AutomatedResponsesTab;
