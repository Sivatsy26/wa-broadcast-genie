
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";

interface SupportTabProps {
  userRole: string;
}

const SupportTab: React.FC<SupportTabProps> = ({ userRole }) => {
  const handleSubmitTicket = () => {
    toast({
      title: "Ticket submitted",
      description: "Your support ticket has been submitted. We will respond shortly."
    });
  };
  
  const handleScheduleCall = () => {
    toast({
      title: "Call scheduled",
      description: "Your support call has been scheduled. Check your email for details."
    });
  };
  
  const knowledgeBaseArticles = [
    { id: 1, title: "Getting Started Guide", category: "Onboarding", views: 1245 },
    { id: 2, title: "Setting Up Your First Campaign", category: "Campaigns", views: 982 },
    { id: 3, title: "Advanced Analytics Features", category: "Analytics", views: 756 },
    { id: 4, title: "Troubleshooting Connection Issues", category: "Troubleshooting", views: 1432 },
    { id: 5, title: "User Management Best Practices", category: "Administration", views: 843 }
  ];
  
  const supportTickets = [
    { id: 101, subject: "Integration Issue", status: "Open", created: "2023-05-01", updated: "2023-05-02" },
    { id: 102, subject: "Billing Question", status: "Closed", created: "2023-04-28", updated: "2023-04-30" },
    { id: 103, subject: "Feature Request", status: "In Progress", created: "2023-04-25", updated: "2023-04-29" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Support</h2>
        <p className="text-muted-foreground">Get help and contact our support team</p>
      </div>
      
      <Tabs defaultValue="help" className="space-y-4">
        <TabsList>
          <TabsTrigger value="help">Help Center</TabsTrigger>
          <TabsTrigger value="ticket">Create Ticket</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          {(userRole === 'super-admin' || userRole === 'white-label') && (
            <TabsTrigger value="support-settings">Support Settings</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
                <Input placeholder="Search for help articles..." className="mb-4" />
                
                <div className="space-y-2">
                  {knowledgeBaseArticles.map(article => (
                    <div key={article.id} className="p-3 hover:bg-gray-50 rounded-md cursor-pointer border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{article.title}</h4>
                          <p className="text-sm text-muted-foreground">{article.category}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{article.views} views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Video Tutorials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Getting Started Video</p>
                  </div>
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Advanced Features Tour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How do I reset my password?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions sent to your email.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">How do I add team members?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to Settings > User Management and click the "Add User" button to invite team members.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">How do I upgrade my subscription?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Go to Settings > Billing and select a different plan to upgrade your subscription.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">How do I connect my social accounts?</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Navigate to Settings > Social Accounts and click the "Connect" button next to each platform you want to integrate.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button>View All FAQs</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ticket">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Submit a Support Ticket</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter a subject for your support ticket" />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Management</option>
                    <option value="billing">Billing</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select 
                    id="priority"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea 
                    id="description" 
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Describe your issue in detail"
                  ></textarea>
                </div>
                
                <div>
                  <Label htmlFor="attachment">Attachments</Label>
                  <Input id="attachment" type="file" />
                  <p className="text-sm text-muted-foreground mt-1">You can attach screenshots or relevant files (max 10MB per file)</p>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Schedule a Support Call</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="call-date">Preferred Date</Label>
                    <Input id="call-date" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="call-time">Preferred Time</Label>
                    <Input id="call-time" type="time" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="call-topic">Topic</Label>
                    <Input id="call-topic" placeholder="What would you like to discuss?" />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="call-notes">Additional Notes</Label>
                    <textarea 
                      id="call-notes" 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Any specific questions or areas you need help with"
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleScheduleCall}>Schedule Call</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">My Support Tickets</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Ticket ID</th>
                      <th className="text-left py-3 px-4">Subject</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Created</th>
                      <th className="text-left py-3 px-4">Last Updated</th>
                      <th className="text-center py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportTickets.map(ticket => (
                      <tr key={ticket.id} className="border-b">
                        <td className="py-3 px-4">#{ticket.id}</td>
                        <td className="py-3 px-4">{ticket.subject}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium 
                            ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                              ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-green-100 text-green-800'}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{ticket.created}</td>
                        <td className="py-3 px-4">{ticket.updated}</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {supportTickets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You don't have any support tickets yet.</p>
                  <Button className="mt-4" onClick={() => document.getElementById('ticket-tab')?.click()}>Create a Ticket</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {(userRole === 'super-admin' || userRole === 'white-label') && (
          <TabsContent value="support-settings">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Support Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" defaultValue="support@yourcompany.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="support-hours">Support Hours</Label>
                    <Input id="support-hours" defaultValue="Monday-Friday, 9am-5pm EST" />
                  </div>
                  
                  <div>
                    <Label htmlFor="auto-response">Auto-Response Message</Label>
                    <textarea 
                      id="auto-response" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      defaultValue="Thank you for contacting our support team. We have received your message and will get back to you as soon as possible."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <Button>Save Support Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SupportTab;
