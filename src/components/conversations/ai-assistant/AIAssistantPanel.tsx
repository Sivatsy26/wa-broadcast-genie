
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Copy, X, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const AIAssistantPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateResponse = () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt for the AI assistant.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate AI response - in a real app, this would call an API
    setTimeout(() => {
      const mockResponses: Record<string, string> = {
        'greeting': 'Hello! Thanks for reaching out. How can I assist you today?',
        'pricing': 'Our standard package starts at $49/month with a 14-day free trial. Would you like me to send over our detailed pricing sheet?',
        'help': 'I understand you need assistance. Could you please provide more details about your issue so I can help you better?',
        'default': 'Thank you for your message. I\'ll look into this and get back to you shortly. Is there anything specific you\'d like me to address?',
      };
      
      // Simple keyword matching
      let responseText = mockResponses.default;
      if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('hi')) {
        responseText = mockResponses.greeting;
      } else if (prompt.toLowerCase().includes('price') || prompt.toLowerCase().includes('cost')) {
        responseText = mockResponses.pricing;
      } else if (prompt.toLowerCase().includes('help') || prompt.toLowerCase().includes('assist')) {
        responseText = mockResponses.help;
      }
      
      setResponse(responseText);
      setLoading(false);
    }, 1500);
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      toast({
        title: "Response copied",
        description: "AI response has been copied to clipboard.",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">AI Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <CardDescription>
          Tell the AI what type of response you need help with
        </CardDescription>
        <Textarea
          placeholder="e.g., Help me craft a response to pricing questions"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="resize-none"
        />
        {response && (
          <Card className="bg-muted/50">
            <CardContent className="p-3">
              <div className="flex justify-between">
                <p className="text-xs font-medium text-muted-foreground mb-1">AI Suggestion:</p>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={handleCopyResponse}
                >
                  <Copy className="h-3.5 w-3.5" />
                </Button>
              </div>
              <p className="text-sm">{response}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button 
          onClick={handleGenerateResponse} 
          disabled={loading || !prompt.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Response'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
