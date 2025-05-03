
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AIInstructionsEditorProps {
  instructions: string;
  onInstructionsChange: (instructions: string) => void;
}

const AIInstructionsEditor: React.FC<AIInstructionsEditorProps> = ({ 
  instructions, 
  onInstructionsChange 
}) => {
  const handleSaveInstructions = () => {
    toast({
      title: "AI instructions saved",
      description: "The AI assistant will use these instructions when responding to customers."
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium mb-3">AI Instructions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Provide specific instructions for how the AI should respond to inquiries
        </p>
        
        <Textarea
          placeholder="Enter instructions for the AI assistant..."
          rows={4}
          value={instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          className="mb-4"
        />
        
        <div className="flex justify-end">
          <Button onClick={handleSaveInstructions}>Save Instructions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInstructionsEditor;
