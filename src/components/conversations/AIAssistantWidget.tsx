
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
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      setInput('');
      setIsProcessing(true);
      
      // Simulate AI response based on user query
      setTimeout(() => {
        let response = "I'm processing your request...";
        
        const query = input.toLowerCase();
        
        // Simulate responses based on common questions
        if (query.includes("product") || query.includes("service")) {
          response = "Based on the company documents, we offer a range of professional services including consulting, development, and maintenance. Would you like more specific details about a particular product or service?";
        }
        else if (query.includes("pricing") || query.includes("cost")) {
          response = "According to our pricing documents, our services start at $99/month for basic packages. Enterprise solutions are custom-priced based on specific requirements. Would you like me to send you a detailed pricing sheet?";
        }
        else if (query.includes("contact") || query.includes("support")) {
          response = "The company's main support email is support@example.com and the phone number is +1-555-123-4567. Support hours are Monday-Friday, 9AM-5PM EST.";
        }
        else {
          response = "I've searched the company documents for information related to your query. Could you provide more specific details about what you're looking for?";
        }
        
        setMessages(prev => [...prev, { content: response, isBot: true }]);
        setIsProcessing(false);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 shadow-lg z-50 md:w-96">
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bot className="h-4 w-4" />
            AI Assistant
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-5 w-5 p-0">×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[300px] pr-2 mb-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 p-2 text-sm rounded-lg ${
                msg.isBot 
                  ? 'bg-secondary text-secondary-foreground ml-0 mr-6' 
                  : 'bg-primary text-primary-foreground ml-6 mr-0'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isProcessing && (
            <div className="mb-2 p-2 text-sm rounded-lg bg-secondary text-secondary-foreground ml-0 mr-6">
              <div className="flex space-x-1">
                <div className="animate-bounce">.</div>
                <div className="animate-bounce delay-75">.</div>
                <div className="animate-bounce delay-150">.</div>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about company information..."
            className="min-h-[40px] max-h-[120px] text-sm py-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button size="sm" onClick={handleSendMessage} className="px-3 h-10">Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;
