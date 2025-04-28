
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Calendar,
  Send,
  MessageCircle,
  Eye,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CampaignDetailProps {
  campaign: any;
  open: boolean;
  onClose: () => void;
}

export function CampaignDetail({ campaign, open, onClose }: CampaignDetailProps) {
  if (!campaign) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{campaign.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Badge className={`${getStatusColor(campaign.status)} capitalize`}>
              {campaign.status}
            </Badge>
            {campaign.scheduled && (
              <span className="text-sm flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {new Date(campaign.scheduled).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{campaign.audience}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>{campaign.template || 'Custom Message'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {campaign.status !== 'draft' && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Delivery Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sent</span>
                      <span className="font-medium">{campaign.sent} messages</span>
                    </div>
                    <Progress value={(campaign.sent / 2500) * 100} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Delivered</span>
                      <span className="font-medium">
                        {campaign.delivered} ({Math.round((campaign.delivered / campaign.sent) * 100) || 0}%)
                      </span>
                    </div>
                    <Progress value={(campaign.delivered / campaign.sent) * 100} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Read</span>
                      <span className="font-medium">
                        {campaign.read} ({Math.round((campaign.read / campaign.sent) * 100) || 0}%)
                      </span>
                    </div>
                    <Progress value={(campaign.read / campaign.sent) * 100} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Responded</span>
                      <span className="font-medium">
                        {campaign.responded} ({Math.round((campaign.responded / campaign.sent) * 100) || 0}%)
                      </span>
                    </div>
                    <Progress value={(campaign.responded / campaign.sent) * 100} />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Message Content</CardTitle>
                <CardDescription>
                  {campaign.template 
                    ? `Using template: ${campaign.template}` 
                    : 'Custom message'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm">
                    {campaign.template === 'Summer_Promo_2023'
                      ? "Hello {{1}}, summer is here! Enjoy 25% off your next purchase with code SUMMER25."
                      : campaign.template === 'New_Product_2023'
                      ? "Hi {{1}}, we're excited to announce our new product line! Check it out now and get early access."
                      : campaign.template === 'Feedback_Survey_Q2'
                      ? "Hello {{1}}, we value your opinion! Please take a moment to complete our quick survey about your recent experience."
                      : "Custom message content would appear here."}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg max-w-xs mx-auto">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        {campaign.status === 'draft' ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </div>
                      <div className="ml-2">
                        <p className="text-xs font-medium">Business Name</p>
                        <p className="text-xs text-muted-foreground">WhatsApp Business</p>
                      </div>
                    </div>
                    <p className="text-sm">
                      {campaign.template === 'Summer_Promo_2023'
                        ? "Hello John, summer is here! Enjoy 25% off your next purchase with code SUMMER25."
                        : campaign.template === 'New_Product_2023'
                        ? "Hi Sarah, we're excited to announce our new product line! Check it out now and get early access."
                        : campaign.template === 'Feedback_Survey_Q2'
                        ? "Hello Michael, we value your opinion! Please take a moment to complete our quick survey about your recent experience."
                        : "Hello Customer, thank you for being with us!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="pt-4">
            {campaign.status !== 'draft' ? (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Message Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <Send className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-2xl font-bold">{campaign.sent}</p>
                        <p className="text-xs text-muted-foreground">Sent</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <MessageCircle className="h-5 w-5 mx-auto mb-1 text-green-600" />
                        <p className="text-2xl font-bold">{campaign.delivered}</p>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <Eye className="h-5 w-5 mx-auto mb-1 text-amber-600" />
                        <p className="text-2xl font-bold">{campaign.read}</p>
                        <p className="text-xs text-muted-foreground">Read</p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <ChevronRight className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-2xl font-bold">{campaign.responded}</p>
                        <p className="text-xs text-muted-foreground">Responded</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Time Analysis</CardTitle>
                    <CardDescription>When users engaged with your campaign</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60 w-full flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-muted-foreground text-sm">Detailed analytics would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No analytics available</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Analytics will be available once the campaign is sent.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
