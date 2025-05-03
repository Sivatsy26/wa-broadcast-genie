
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatbots } from '@/hooks/use-chatbots';
import { type Chatbot } from '@/services/chatbotService';
import { MessageSquare, Users, Clock } from 'lucide-react';

interface ChatbotAnalyticsProps {
  chatbot: Chatbot;
  open: boolean;
  onClose: () => void;
}

const ChatbotAnalytics: React.FC<ChatbotAnalyticsProps> = ({ chatbot, open, onClose }) => {
  const { fetchChatbotAnalyticsQuery } = useChatbots();
  const { data: analytics, isLoading } = fetchChatbotAnalyticsQuery(chatbot.id);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Chatbot Analytics</DialogTitle>
          <DialogDescription>
            View performance metrics for {chatbot.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Conversations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {analytics?.totalConversations.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {analytics?.totalMessages.toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Messages/Conversation
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <div className="text-2xl font-bold">
                  {analytics?.totalConversations 
                    ? (analytics.totalMessages / analytics.totalConversations).toFixed(1) 
                    : "0"}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Daily Conversations (Last 14 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Skeleton className="h-[250px] w-full" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.dailyConversations.map(item => ({
                  ...item,
                  date: formatDate(item.date)
                }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Conversations"
                    fill={chatbot.primary_color || "#4f46e5"} 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotAnalytics;
