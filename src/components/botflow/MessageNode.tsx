
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
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

const MessageNode = ({ data }) => {
  const [message, setMessage] = useState(data.message || 'Enter your message...');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Update the node data when the message changes
  const handleSaveMessage = () => {
    data.message = message;
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-blue-500 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-blue-500"
      />
      <div className="flex items-center">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-700 truncate max-w-[120px]">{message}</div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            Edit Message
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
              placeholder="Enter the message that will be sent to the user..."
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleSaveMessage}
            >
              Save Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-blue-500"
      />
    </div>
  );
};

export default MessageNode;
