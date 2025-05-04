
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ArrowRight } from 'lucide-react';
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

const ConditionNode = ({ data }) => {
  const [condition, setCondition] = useState(data.condition || '');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Update the node data when the condition changes
  const handleSaveCondition = () => {
    data.condition = condition;
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-yellow-500 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-yellow-500"
      />
      <div className="flex items-center">
        <ArrowRight className="h-5 w-5 text-yellow-500" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">
            {condition ? `if ${condition}` : 'Set condition...'}
          </div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            Edit Condition
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Condition</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="condition">Condition</Label>
            <Input 
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-2"
              placeholder="e.g., user.intent === 'help'"
            />
            <p className="text-xs text-gray-500 mt-2">
              Enter a condition that will determine which path to follow.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveCondition}
            >
              Save Condition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex justify-between mt-2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          className="left-10 w-2 h-2 !bg-green-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          className="left-auto right-10 w-2 h-2 !bg-red-500"
        />
      </div>
    </div>
  );
};

export default ConditionNode;
