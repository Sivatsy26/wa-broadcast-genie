
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface AIAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ content: string; isBot: boolean }[]>([
    { content: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      // Here you would integrate with your AI service
      // For now, we'll just echo a response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: "I'm processing your request. This is a placeholder response.", 
          isBot: true 
        }]);
      }, 1000);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-24 right-4 w-80 shadow-lg z-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4 mb-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 p-2 rounded-lg ${
                msg.isBot 
                  ? 'bg-secondary text-secondary-foreground ml-0 mr-8' 
                  : 'bg-primary text-primary-foreground ml-8 mr-0'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="min-h-[44px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;
