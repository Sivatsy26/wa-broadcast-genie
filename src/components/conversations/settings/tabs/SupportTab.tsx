
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface SupportTabProps {
  userRole: string;
}

const SupportTab: React.FC<SupportTabProps> = ({ userRole }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('general');
  
  const handleSubmitTicket = () => {
    if (!subject || !message) {
      toast({
        title: "Missing information",
        description: "Please provide both a subject and message for your support ticket",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Support ticket created",
      description: "We'll respond to your inquiry shortly."
    });
    
    setSubject('');
    setMessage('');
    setSelectedPriority('medium');
    setSelectedCategory('general');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support</h2>
        <p className="text-muted-foreground">
          Contact our support team and access help resources
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Submit a Support Ticket</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="general">General Question</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing</option>
                  <option value="feature">Feature Request</option>
                  <option value="account">Account Management</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Brief summary of your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue in detail"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
            </div>
          </div>
          
          {userRole === 'super-admin' && (
            <div>
              <h3 className="text-lg font-medium mb-4">Premium Support</h3>
              <p className="text-muted-foreground mb-4">
                As a Super Admin, you have access to our premium support services with 
                priority response times and dedicated account representatives.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline">Schedule a Call</Button>
                <Button>Contact Account Rep</Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h4 className="font-medium">How do I add team members?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Go to Settings {'>'} User Management and click the "Add User" button to invite team members.
                </p>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium">How do I upgrade my subscription?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Go to Settings {'>'} Billing and select a different plan to upgrade your subscription.
                </p>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium">How do I connect my social accounts?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Navigate to Settings {'>'} Social Accounts and click the "Connect" button next to each platform you want to integrate.
                </p>
              </div>
              <div className="border rounded-md p-4">
                <h4 className="font-medium">How do I create a chatbot?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Go to the Chatbot Builder section from the main navigation and follow the step-by-step wizard.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <div className="grid grid-cols-1 gap-3">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">Documentation</span>
                  <Button variant="outline" size="sm">View</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">Video Tutorials</span>
                  <Button variant="outline" size="sm">Watch</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">API Reference</span>
                  <Button variant="outline" size="sm">View</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-medium">Join Community</span>
                  <Button variant="outline" size="sm">Join</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTab;
