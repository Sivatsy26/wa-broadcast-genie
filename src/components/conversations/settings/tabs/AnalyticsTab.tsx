
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from "@/hooks/use-toast";

const data = [
  { date: '2023-05-01', messages: 65, responses: 41 },
  { date: '2023-05-02', messages: 78, responses: 50 },
  { date: '2023-05-03', messages: 92, responses: 63 },
  { date: '2023-05-04', messages: 85, responses: 59 },
  { date: '2023-05-05', messages: 110, responses: 80 },
  { date: '2023-05-06', messages: 120, responses: 85 },
  { date: '2023-05-07', messages: 105, responses: 73 },
];

interface AnalyticsTabProps {
  userRole: string;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ userRole }) => {
  const [trackPageViews, setTrackPageViews] = useState(true);
  const [trackClickEvents, setTrackClickEvents] = useState(true);
  const [trackConversions, setTrackConversions] = useState(true);
  const [useGoogleAnalytics, setUseGoogleAnalytics] = useState(false);
  const [shareDailyReports, setShareDailyReports] = useState(true);
  const [shareWeeklyReports, setShareWeeklyReports] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Analytics settings saved",
      description: "Your analytics preferences have been updated."
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Analytics data exported",
      description: "Your analytics data has been exported to CSV."
    });
  };
  
  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all analytics data? This action cannot be undone.")) {
      toast({
        title: "Analytics data cleared",
        description: "All analytics data has been cleared."
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Settings</h2>
        <p className="text-muted-foreground">Configure and view your analytics data</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Message Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="messages" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="responses" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={handleExportData}>
              Export Data
            </Button>
            
            {userRole === 'super-admin' && (
              <Button variant="outline" className="text-red-500" onClick={handleClearData}>
                Clear Data
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Tracking Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="page-views" className="font-medium">Track Page Views</Label>
                <p className="text-sm text-muted-foreground">Record when users view different pages</p>
              </div>
              <Switch 
                id="page-views" 
                checked={trackPageViews} 
                onCheckedChange={setTrackPageViews} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="click-events" className="font-medium">Track Click Events</Label>
                <p className="text-sm text-muted-foreground">Record when users click on buttons and links</p>
              </div>
              <Switch 
                id="click-events" 
                checked={trackClickEvents} 
                onCheckedChange={setTrackClickEvents} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="conversions" className="font-medium">Track Conversions</Label>
                <p className="text-sm text-muted-foreground">Record when users complete important actions</p>
              </div>
              <Switch 
                id="conversions" 
                checked={trackConversions} 
                onCheckedChange={setTrackConversions} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="google-analytics" className="font-medium">Use Google Analytics</Label>
                <p className="text-sm text-muted-foreground">Connect with Google Analytics for enhanced tracking</p>
              </div>
              <Switch 
                id="google-analytics" 
                checked={useGoogleAnalytics} 
                onCheckedChange={setUseGoogleAnalytics} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Reporting Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-reports" className="font-medium">Daily Reports</Label>
                <p className="text-sm text-muted-foreground">Receive daily analytics reports via email</p>
              </div>
              <Switch 
                id="daily-reports" 
                checked={shareDailyReports} 
                onCheckedChange={setShareDailyReports} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports" className="font-medium">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Receive weekly analytics summaries via email</p>
              </div>
              <Switch 
                id="weekly-reports" 
                checked={shareWeeklyReports} 
                onCheckedChange={setShareWeeklyReports} 
              />
            </div>
            
            <div className="mt-6">
              <Label htmlFor="report-recipients" className="font-medium">Report Recipients</Label>
              <textarea
                id="report-recipients"
                className="flex mt-2 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Enter email addresses (one per line)"
                defaultValue="admin@example.com&#10;manager@example.com"
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveSettings}>Save Analytics Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
