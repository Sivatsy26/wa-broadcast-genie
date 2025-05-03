
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Smartphone, Globe, Facebook, X } from 'lucide-react';
import { type Chatbot } from '@/services/chatbotService';

interface ChatbotPreviewProps {
  chatbot: Chatbot;
  open: boolean;
  onClose: () => void;
}

const ChatbotPreview: React.FC<ChatbotPreviewProps> = ({ chatbot, open, onClose }) => {
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState<{ type: 'bot' | 'user', content: string }[]>([
    { type: 'bot', content: chatbot.welcome_message }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setMessages([...messages, { type: 'user', content: message }]);
    setMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm sorry, I don't have an answer for that right now.";
      
      // Check for matching responses by keywords
      if (message.toLowerCase().includes("help")) {
        botResponse = "I'm here to help! What would you like to know about our products or services?";
      } else if (message.toLowerCase().includes("price") || message.toLowerCase().includes("cost")) {
        botResponse = "Our pricing starts at $29/month for the Basic plan, $99/month for Professional, and $299/month for Enterprise.";
      } else if (message.toLowerCase().includes("contact")) {
        botResponse = "You can reach our support team at support@example.com or call us at +1-555-123-4567.";
      } else if (message.toLowerCase().includes("hours")) {
        botResponse = "Our business hours are Monday to Friday, 9 AM to 5 PM EST.";
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 1000);
  };

  const getChatbotIcon = () => {
    switch (chatbot.type) {
      case 'faq':
        return <Bot className="h-6 w-6" />;
      case 'lead-gen':
        return <Smartphone className="h-6 w-6" />;
      case 'support':
        return <Smartphone className="h-6 w-6" />;
      case 'custom':
        return <Bot className="h-6 w-6" />;
      default:
        return <Bot className="h-6 w-6" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp':
        return <Smartphone className="h-5 w-5" />;
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'website':
        return <Globe className="h-5 w-5" />;
      default:
        return <Bot className="h-5 w-5" />;
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span className="mr-2">Chatbot Preview</span>
            {chatbot.channels.length > 0 && (
              <div className="flex gap-1 ml-auto">
                {chatbot.channels.map((channel) => (
                  <div
                    key={channel}
                    className="h-6 w-6 rounded-full bg-muted flex items-center justify-center"
                    title={channel.charAt(0).toUpperCase() + channel.slice(1)}
                  >
                    {getChannelIcon(channel)}
                  </div>
                ))}
              </div>
            )}
          </DialogTitle>
          <DialogDescription>
            Test how your chatbot will look and respond to users
          </DialogDescription>
        </DialogHeader>
        
        <Card className="flex-1 overflow-hidden flex flex-col h-[500px] border-none shadow-none mb-0">
          <div className="flex items-center p-2 border-b bg-muted/30">
            <div className="flex items-center gap-2">
              <div 
                className="h-8 w-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: chatbot.primary_color }}
              >
                {chatbot.show_avatar && getChatbotIcon()}
              </div>
              <span className="font-medium">{chatbot.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                  style={
                    msg.type === 'user'
                      ? { backgroundColor: chatbot.primary_color }
                      : {}
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </CardContent>

          <div className="p-3 border-t mt-auto">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                style={{ backgroundColor: chatbot.primary_color }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPreview;
