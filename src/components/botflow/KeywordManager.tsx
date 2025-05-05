
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface KeywordManagerProps {
  keywords: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordManager({ keywords, onChange }: KeywordManagerProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const { toast } = useToast();
  
  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    if (keywords.includes(newKeyword.trim())) {
      toast({
        title: "Keyword already exists",
        description: "This trigger keyword already exists",
        variant: "destructive",
      });
      return;
    }
    onChange([...keywords, newKeyword.trim()]);
    setNewKeyword('');
  };
  
  const handleRemoveKeyword = (keyword) => {
    onChange(keywords.filter(k => k !== keyword));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trigger Keywords</CardTitle>
        <CardDescription>
          Set up various trigger keywords for this bot to handle different scenarios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter a keyword..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddKeyword();
              }
            }}
          />
          <Button onClick={handleAddKeyword}>Add</Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <div
              key={keyword}
              className="bg-muted px-3 py-1 rounded-full flex items-center gap-2"
            >
              <Key className="h-3.5 w-3.5" />
              <span>{keyword}</span>
              <button
                className="text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveKeyword(keyword)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
