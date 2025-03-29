
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Users,
  Send,
  MessageCircle,
  Smartphone,
  FileText,
  PlusCircle,
  UserPlus,
  ChevronRight,
  Phone,
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Broadcast
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs">All connected</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Broadcasts</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +3 from last week
            </p>
            <Progress value={65} className="mt-4 h-2" />
            <p className="mt-1 text-xs text-muted-foreground">65% delivered</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">823</div>
            <p className="text-xs text-muted-foreground">
              +18 new leads today
            </p>
            <div className="mt-4 flex items-center text-xs gap-2">
              <div className="text-green-500">↑ 14%</div>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last week
            </p>
            <div className="mt-4 flex items-center text-xs gap-2">
              <div className="text-green-500">↑ 8%</div>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Broadcast Performance</CardTitle>
            <CardDescription>
              Your recent broadcast campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md">
              <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
              <span className="ml-2 text-sm text-muted-foreground">Performance chart will appear here</span>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Summer Promo</span>
                </div>
                <div>92% delivered</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <span>New Product Launch</span>
                </div>
                <div>78% delivered</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  <span>Customer Survey</span>
                </div>
                <div>65% delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>
              Latest leads added to your CRM
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground truncate">
                    sarah.j@example.com
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-muted-foreground truncate">
                    m.chen@company.co
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <UserPlus className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Emma Rodriguez</p>
                  <p className="text-xs text-muted-foreground truncate">
                    emma.r@domain.net
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <span>View All Leads</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Your scheduled tasks and follow-ups
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 mt-0.5 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">Client follow-up call</p>
                  <p className="text-xs text-muted-foreground">
                    Today at 2:00 PM • Acme Corp
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 mt-0.5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">Schedule product demo</p>
                  <p className="text-xs text-muted-foreground">
                    Tomorrow at 10:00 AM • New Prospect
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 mt-0.5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Clock className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">Send proposal</p>
                  <p className="text-xs text-muted-foreground">
                    Jun 24, 2023 • Global Solutions Inc.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Template Status</CardTitle>
            <CardDescription>
              Status of your WhatsApp templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Welcome Message</p>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-1.5" />
                      <p className="text-xs text-muted-foreground">Approved</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Product Launch</p>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full mr-1.5" />
                      <p className="text-xs text-muted-foreground">Pending Approval</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Special Discount</p>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1.5" />
                      <p className="text-xs text-muted-foreground">Rejected</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <span>Manage Templates</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
