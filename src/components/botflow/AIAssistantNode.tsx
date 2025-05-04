
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const AIAssistantNode = ({ data }) => {
  const [prompt, setPrompt] = useState(data.prompt || '');
  const [model, setModel] = useState(data.model || 'gpt-4o-mini');
  const [temperature, setTemperature] = useState(data.temperature || 0.7);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Update the node data when saved
  const handleSaveSettings = () => {
    data.prompt = prompt;
    data.model = model;
    data.temperature = temperature;
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-purple-500 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-purple-500"
      />
      <div className="flex items-center">
        <Zap className="h-5 w-5 text-purple-500" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">
            {model} | Temp: {temperature}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            Configure AI Assistant
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>AI Assistant Configuration</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="model">AI Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="temperature">Temperature: {temperature}</Label>
              </div>
              <Slider 
                id="temperature"
                min={0} 
                max={1} 
                step={0.1}
                value={[temperature]} 
                onValueChange={(values) => setTemperature(values[0])} 
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower values make responses more focused, higher values make them more creative.
              </p>
            </div>
            
            <div>
              <Label htmlFor="prompt">System Prompt</Label>
              <Textarea 
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mt-2 min-h-[120px]"
                placeholder="Enter instructions for the AI assistant..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Define how the AI should behave and what context it should have.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveSettings}
            >
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-purple-500"
      />
    </div>
  );
};

export default AIAssistantNode;
