
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, MessageSquarePlus, ArrowRight, Zap, Key, Code } from 'lucide-react';

interface NodePaletteProps {
  addNode: (type: string, label: string) => void;
  handleAddFunctionNode: () => void;
}

export function NodePalette({ addNode, handleAddFunctionNode }: NodePaletteProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Add Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flow-node-buttons space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => addNode('message', 'Message')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => addNode('menu', 'Menu Options')}
          >
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            Menu
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => addNode('condition', 'Condition')}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Condition
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => addNode('aiAssistant', 'AI Assistant')}
          >
            <Zap className="mr-2 h-4 w-4" />
            AI Assistant
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => addNode('keywordTrigger', 'Keyword Trigger')}
          >
            <Key className="mr-2 h-4 w-4" />
            Keyword Trigger
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleAddFunctionNode}
          >
            <Code className="mr-2 h-4 w-4" />
            Function
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
