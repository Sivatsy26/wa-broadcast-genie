
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Key } from 'lucide-react';
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

const KeywordTriggerNode = ({ data }) => {
  const [keywords, setKeywords] = useState(data.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddKeyword = () => {
    if (newKeyword.trim() !== '') {
      const newKeywords = [...keywords, newKeyword.trim()];
      setKeywords(newKeywords);
      data.keywords = newKeywords; // Update the node data
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (index) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
    data.keywords = newKeywords; // Update the node data
  };

  const handleSaveKeywords = () => {
    data.keywords = keywords;
    setIsDialogOpen(false);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-amber-500 min-w-[150px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-amber-500"
      />
      <div className="flex items-center">
        <Key className="h-5 w-5 text-amber-500" />
        <div className="ml-2">
          <div className="text-sm font-bold">{data.label}</div>
          <div className="text-xs text-gray-500">{keywords.length} keywords</div>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">
            Edit Trigger Keywords
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure Trigger Keywords</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Input 
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="New keyword..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddKeyword();
                  }
                }}
              />
              <Button onClick={handleAddKeyword}>Add</Button>
            </div>
            
            <div className="space-y-2">
              <Label>Current Keywords</Label>
              
              {keywords.length === 0 ? (
                <p className="text-sm text-gray-500">No keywords added yet</p>
              ) : (
                <div className="space-y-2">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                      <span className="text-sm">{keyword}</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveKeyword(index)}
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
              onClick={handleSaveKeywords}
            >
              Save Keywords
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex justify-between mt-2">
        <Handle
          type="source"
          position={Position.Bottom}
          id="match"
          className="left-10 w-2 h-2 !bg-green-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="nomatch"
          className="left-auto right-10 w-2 h-2 !bg-red-500"
        />
      </div>
    </div>
  );
};

export default KeywordTriggerNode;
