
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
    <Card className="fixed bottom-20 right-4 w-60 shadow-lg z-50">
      <CardHeader className="py-1.5 px-3">
        <CardTitle className="text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bot className="h-3 w-3" />
            AI Assistant
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-5 w-5 p-0">×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[180px] pr-2 mb-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-1.5 p-1 text-xs rounded-lg ${
                msg.isBot 
                  ? 'bg-secondary text-secondary-foreground ml-0 mr-4' 
                  : 'bg-primary text-primary-foreground ml-4 mr-0'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            className="min-h-[32px] max-h-[80px] text-xs py-1.5"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button size="sm" onClick={handleSendMessage} className="px-2 h-8">Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;
