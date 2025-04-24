
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { PlusCircle, Edit, Trash2, MessageSquareText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export interface AutoResponse {
  id: string;
  name: string;
  content: string;
  isActive: boolean;
  createdAt: Date;
}

const INITIAL_RESPONSES: AutoResponse[] = [
  {
    id: '1',
    name: 'Welcome Message',
    content: 'Thank you for contacting us! One of our team members will get back to you shortly.',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Out of Office',
    content: 'Thank you for your message. Our office is currently closed. We will respond to your inquiry when we return.',
    isActive: false,
    createdAt: new Date(),
  },
];

export const AutoResponseManager: React.FC = () => {
  const [responses, setResponses] = useState<AutoResponse[]>(INITIAL_RESPONSES);
  const [isSystemEnabled, setIsSystemEnabled] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [editingResponse, setEditingResponse] = useState<AutoResponse | null>(null);
  const [newResponseName, setNewResponseName] = useState<string>('');
  const [newResponseContent, setNewResponseContent] = useState<string>('');

  const openAddDialog = () => {
    setEditingResponse(null);
    setNewResponseName('');
    setNewResponseContent('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (response: AutoResponse) => {
    setEditingResponse(response);
    setNewResponseName(response.name);
    setNewResponseContent(response.content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingResponse(null);
    setNewResponseName('');
    setNewResponseContent('');
  };

  const handleSaveResponse = () => {
    if (!newResponseName.trim() || !newResponseContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingResponse) {
      // Update existing response
      setResponses(responses.map(r => 
        r.id === editingResponse.id 
          ? { ...r, name: newResponseName, content: newResponseContent } 
          : r
      ));
      toast({
        title: "Response updated",
        description: `"${newResponseName}" has been updated.`,
      });
    } else {
      // Add new response
      const newResponse: AutoResponse = {
        id: `new-${Date.now()}`,
        name: newResponseName,
        content: newResponseContent,
        isActive: true,
        createdAt: new Date(),
      };
      setResponses([...responses, newResponse]);
      toast({
        title: "Response created",
        description: `"${newResponseName}" has been created.`,
      });
    }
    
    closeDialog();
  };

  const handleDeleteResponse = (id: string) => {
    setResponses(responses.filter(r => r.id !== id));
    toast({
      title: "Response deleted",
      description: "The auto response has been deleted.",
    });
  };

  const handleToggleResponse = (id: string) => {
    setResponses(responses.map(r => 
      r.id === id ? { ...r, isActive: !r.isActive } : r
    ));
  };

  const handleToggleSystem = () => {
    setIsSystemEnabled(!isSystemEnabled);
    toast({
      title: isSystemEnabled ? "Auto responses disabled" : "Auto responses enabled",
      description: isSystemEnabled 
        ? "Automatic responses are now turned off." 
        : "Automatic responses are now active.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Auto Responses</h2>
          <p className="text-muted-foreground">Manage your automated responses to incoming messages</p>
        </div>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Add Response</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Enable or disable the auto response system
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="system-toggle" className={isSystemEnabled ? "text-green-600" : "text-gray-400"}>
                {isSystemEnabled ? "Enabled" : "Disabled"}
              </Label>
              <Switch 
                id="system-toggle" 
                checked={isSystemEnabled} 
                onCheckedChange={handleToggleSystem} 
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {responses.map(response => (
          <Card key={response.id} className={!response.isActive ? "opacity-70" : undefined}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquareText className="h-5 w-5 text-primary" />
                  {response.name}
                </CardTitle>
                <Switch 
                  checked={response.isActive} 
                  onCheckedChange={() => handleToggleResponse(response.id)} 
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line">{response.content}</p>
            </CardContent>
            <CardFooter className="justify-between border-t pt-3">
              <span className="text-xs text-muted-foreground">
                Created: {response.createdAt.toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openEditDialog(response)}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Edit</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDeleteResponse(response.id)}
                  className="flex items-center gap-1 text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {responses.length === 0 && (
          <Card className="border-dashed border-2 cursor-pointer" onClick={openAddDialog}>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <PlusCircle className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No auto responses added yet</p>
              <Button variant="link" className="mt-2">Add your first response</Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingResponse ? 'Edit Auto Response' : 'New Auto Response'}</DialogTitle>
            <DialogDescription>
              {editingResponse 
                ? 'Update this automated response' 
                : 'Create an automated response that will be sent to new conversations'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="response-name">Response Name</Label>
              <Input 
                id="response-name"
                value={newResponseName} 
                onChange={(e) => setNewResponseName(e.target.value)}
                placeholder="e.g., Welcome Message" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="response-content">Response Content</Label>
              <Textarea 
                id="response-content"
                value={newResponseContent} 
                onChange={(e) => setNewResponseContent(e.target.value)}
                placeholder="Type your automated response message here..."
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button onClick={handleSaveResponse}>
              {editingResponse ? 'Save Changes' : 'Create Response'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
