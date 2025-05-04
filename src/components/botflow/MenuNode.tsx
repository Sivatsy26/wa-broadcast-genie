
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const MenuNode = ({ data }) => {
  const [options, setOptions] = useState(data.options || []);
  const [newOption, setNewOption] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddOption = () => {
    if (newOption.trim() !== '') {
      const newOptions = [...options, newOption.trim()];
      setOptions(newOptions);
      data.options = newOptions; // Update the node data
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    data.options = newOptions; // Update the node data
  };

  const handleSaveOptions = () => {
    data.options = options;
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-green-600 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-green-600"
      />
      <div className="flex items-center">
        <MessageSquarePlus className="h-5 w-5 text-green-600" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{options.length} options</div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            Edit Menu Options
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure Menu Options</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="New option text..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddOption();
                  }
                }}
              />
              <Button onClick={handleAddOption}>Add</Button>
            </div>
            
            <div className="space-y-2">
              <Label>Current Options</Label>
              
              {options.length === 0 ? (
                <p className="text-sm text-gray-500">No options added yet</p>
              ) : (
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">{option}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveOption(index)}
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveOptions}
            >
              Save Options
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-green-600"
      />
    </div>
  );
};
