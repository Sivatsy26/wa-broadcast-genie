
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Search } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AIAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<{ content: string; isBot: boolean; isLoading?: boolean }[]>([
    { content: "Hello! I'm your AI assistant. I can help you find information from your company documents. What would you like to know?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      
      // Add loading message
      setMessages(prev => [...prev, { content: "Searching through documents...", isBot: true, isLoading: true }]);
      setIsProcessing(true);
      
      // Simulate AI processing the documents
      setTimeout(() => {
        // Remove loading message and replace with response
        setMessages(prev => prev.filter(msg => !msg.isLoading));
        
        // Generate appropriate response based on query
        let botResponse = "";
        const query = input.toLowerCase();
        
        if (query.includes("product") || query.includes("catalog")) {
          botResponse = "Based on the Product Catalog document, we offer three main product lines: Basic, Pro, and Enterprise. The Pro version includes all features of Basic plus advanced reporting and team collaboration tools.";
        } else if (query.includes("price") || query.includes("pricing") || query.includes("cost")) {
          botResponse = "According to our pricing documents, the Basic plan is $29/month, the Pro plan is $99/month, and the Enterprise plan is customized based on needs, starting at $499/month.";
        } else if (query.includes("sales") || query.includes("revenue")) {
          botResponse = "From the Sales Data Q1 2024 spreadsheet, our total revenue for Q1 was $2.4M, which is a 15% increase compared to the previous quarter.";
        } else if (query.includes("faq") || query.includes("question")) {
          botResponse = "From the Customer FAQs document: The most common question is about integration with third-party tools. Yes, we support integration with all major CRM and marketing automation platforms through our API.";
        } else if (query.includes("service") || query.includes("support")) {
          botResponse = "According to our Service Procedures document, support is available 24/7 for Enterprise customers, while Basic and Pro customers have access to support from 8am to 8pm on weekdays.";
        } else {
          botResponse = "I've searched through your company documents but couldn't find specific information about that. Would you like to ask something about our products, pricing, sales data, or service procedures?";
        }
        
        setMessages(prev => [...prev, { content: botResponse, isBot: true }]);
        setIsProcessing(false);
        setInput('');
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 shadow-lg z-50 max-h-[500px] flex flex-col">
      <CardHeader className="py-2 px-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bot className="h-4 w-4" />
            Company AI Assistant
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">×</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 flex-1 flex flex-col">
        <ScrollArea className="h-[320px] pr-2 mb-2 flex-1">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 p-2 text-sm rounded-lg ${
                msg.isBot 
                  ? 'bg-secondary text-secondary-foreground ml-0 mr-4' 
                  : 'bg-primary text-primary-foreground ml-4 mr-0'
              } ${msg.isLoading ? 'flex items-center' : ''}`}
            >
              {msg.isLoading ? (
                <>
                  <Search className="h-3 w-3 mr-2 animate-pulse" />
                  <span>{msg.content}</span>
                </>
              ) : (
                msg.content
              )}
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-1">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your company documents..."
            className="min-h-[40px] max-h-[120px] text-sm py-2"
            disabled={isProcessing}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="sm" 
            onClick={handleSendMessage} 
            className="px-2 h-10" 
            disabled={isProcessing}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistantWidget;
