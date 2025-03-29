
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Download,
  Smartphone,
  ChevronDown,
  Loader2,
  BarChart2,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Sample data for charts
const conversationData = [
  { date: 'Jun 1', incoming: 45, outgoing: 38 },
  { date: 'Jun 2', incoming: 52, outgoing: 43 },
  { date: 'Jun 3', incoming: 48, outgoing: 41 },
  { date: 'Jun 4', incoming: 60, outgoing: 52 },
  { date: 'Jun 5', incoming: 58, outgoing: 50 },
  { date: 'Jun 6', incoming: 70, outgoing: 60 },
  { date: 'Jun 7', incoming: 65, outgoing: 58 },
  { date: 'Jun 8', incoming: 75, outgoing: 65 },
  { date: 'Jun 9', incoming: 80, outgoing: 70 },
  { date: 'Jun 10', incoming: 85, outgoing: 75 },
  { date: 'Jun 11', incoming: 90, outgoing: 80 },
  { date: 'Jun 12', incoming: 95, outgoing: 85 },
  { date: 'Jun 13', incoming: 100, outgoing: 90 },
  { date: 'Jun 14', incoming: 105, outgoing: 95 },
];

const messageStatusData = [
  { name: 'Delivered', value: 78 },
  { name: 'Read', value: 65 },
  { name: 'Replied', value: 45 },
  { name: 'Failed', value: 5 },
];

const responseTimeDistribution = [
  { name: '< 5 min', count: 45 },
  { name: '5-15 min', count: 25 },
  { name: '15-30 min', count: 15 },
  { name: '30-60 min', count: 10 },
  { name: '> 60 min', count: 5 },
];

const topAgents = [
  {
    name: 'Maria Lopez',
    avatar: '',
    conversations: 183,
    responseTime: '2m 45s',
    satisfaction: 98,
  },
  {
    name: 'Robert Chen',
    avatar: '',
    conversations: 156,
    responseTime: '3m 12s',
    satisfaction: 96,
  },
  {
    name: 'Sophia Williams',
    avatar: '',
    conversations: 129,
    responseTime: '4m 05s',
    satisfaction: 94,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  const [dateRange, setDateRange] = useState<string>('7d');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Performance insights and metrics for your WhatsApp Business
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="14d">Last 14 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Calendar className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversations
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              {' '}vs previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,452</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2%
              </span>
              {' '}vs previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3m 28s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                +0.8%
              </span>
              {' '}vs previous period
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolution Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.3%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2.1%
              </span>
              {' '}vs previous period
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Conversation Volume</CardTitle>
                <CardDescription>
                  Number of incoming and outgoing conversations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={conversationData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="incoming"
                      stroke="#8884d8"
                      name="Incoming"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="outgoing"
                      stroke="#82ca9d"
                      name="Outgoing"
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Message Status</CardTitle>
                <CardDescription>
                  Distribution of message delivery and read status
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={messageStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {messageStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
                <CardDescription>
                  Distribution of response times for customer messages
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={responseTimeDistribution}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Conversations" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Agents</CardTitle>
              <CardDescription>
                Agents with the highest number of resolved conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-medium">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={agent.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{agent.name}</div>
                        <div className="text-xs text-muted-foreground">{agent.conversations} conversations</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">{agent.responseTime}</div>
                        <div className="text-xs text-muted-foreground">Avg. response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-green-600">{agent.satisfaction}%</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversations" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conversations by Type</CardTitle>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Customer Inquiries</span>
                    </div>
                    <div>45%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Support Issues</span>
                    </div>
                    <div>30%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span>Sales Opportunities</span>
                    </div>
                    <div>15%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span>Other</span>
                    </div>
                    <div>10%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Channel Distribution</CardTitle>
                  <Button variant="outline" size="sm">
                    <PieChart className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>WhatsApp</span>
                    </div>
                    <div>70%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Facebook Messenger</span>
                    </div>
                    <div>20%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <span>Web Chat</span>
                    </div>
                    <div>10%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resolution Metrics</CardTitle>
                  <Button variant="outline" size="sm">
                    <LineChart className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">First Response Time</span>
                    <span className="font-medium">2m 15s</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolution Time</span>
                    <span className="font-medium">15m 42s</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolution Rate</span>
                    <span className="font-medium">94.3%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bot Resolution Rate</span>
                    <span className="font-medium">72.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Message Volume by Hour</CardTitle>
                  <CardDescription>
                    Distribution of message volume throughout the day
                  </CardDescription>
                </div>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={[
                    { hour: '12 AM', count: 25 },
                    { hour: '1 AM', count: 15 },
                    { hour: '2 AM', count: 10 },
                    { hour: '3 AM', count: 5 },
                    { hour: '4 AM', count: 5 },
                    { hour: '5 AM', count: 8 },
                    { hour: '6 AM', count: 12 },
                    { hour: '7 AM', count: 28 },
                    { hour: '8 AM', count: 45 },
                    { hour: '9 AM', count: 70 },
                    { hour: '10 AM', count: 85 },
                    { hour: '11 AM', count: 92 },
                    { hour: '12 PM', count: 85 },
                    { hour: '1 PM', count: 80 },
                    { hour: '2 PM', count: 75 },
                    { hour: '3 PM', count: 85 },
                    { hour: '4 PM', count: 95 },
                    { hour: '5 PM', count: 100 },
                    { hour: '6 PM', count: 90 },
                    { hour: '7 PM', count: 80 },
                    { hour: '8 PM', count: 70 },
                    { hour: '9 PM', count: 60 },
                    { hour: '10 PM', count: 45 },
                    { hour: '11 PM', count: 35 },
                  ]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Message Count" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>
                  Key metrics for agent productivity and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {topAgents.map((agent, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {agent.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{agent.name}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Activity className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center">
                          <div className="text-sm font-medium">{agent.conversations}</div>
                          <div className="text-xs text-muted-foreground">Conversations</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{agent.responseTime}</div>
                          <div className="text-xs text-muted-foreground">Avg. Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-green-600">{agent.satisfaction}%</div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>
                  Performance metrics by department
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={[
                      { 
                        department: 'Customer Support', 
                        conversations: 650, 
                        responseTime: 3.5, 
                        satisfaction: 92 
                      },
                      { 
                        department: 'Sales', 
                        conversations: 450, 
                        responseTime: 4.2,
                        satisfaction: 88
                      },
                      { 
                        department: 'Marketing', 
                        conversations: 250, 
                        responseTime: 5.1,
                        satisfaction: 90
                      },
                      { 
                        department: 'Technical Support', 
                        conversations: 350, 
                        responseTime: 3.8,
                        satisfaction: 85
                      },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 45,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="department" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="conversations" fill="#8884d8" name="Conversations" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Agent Workload Distribution</CardTitle>
              <CardDescription>
                Current workload distribution across active agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center font-medium text-sm">
                  <div>Agent</div>
                  <div>Active Conversations</div>
                </div>
                
                {[
                  { name: 'Maria Lopez', count: 12, max: 15 },
                  { name: 'Robert Chen', count: 8, max: 15 },
                  { name: 'Sophia Williams', count: 15, max: 15 },
                  { name: 'James Taylor', count: 3, max: 15 },
                  { name: 'Emma Johnson', count: 9, max: 15 },
                ].map((agent, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span>{agent.name}</span>
                      </div>
                      <div className="text-sm">
                        {agent.count} / {agent.max}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          agent.count / agent.max > 0.9 ? 'bg-red-500' :
                          agent.count / agent.max > 0.7 ? 'bg-amber-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${(agent.count / agent.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campaign Performance</CardTitle>
                    <CardDescription>
                      Performance metrics for broadcast campaigns
                    </CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter campaigns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="active">Active Campaigns</SelectItem>
                      <SelectItem value="completed">Completed Campaigns</SelectItem>
                      <SelectItem value="scheduled">Scheduled Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium text-sm py-4">Campaign</th>
                        <th className="text-center font-medium text-sm py-4">Sent</th>
                        <th className="text-center font-medium text-sm py-4">Delivered</th>
                        <th className="text-center font-medium text-sm py-4">Read</th>
                        <th className="text-center font-medium text-sm py-4">Responded</th>
                        <th className="text-center font-medium text-sm py-4">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: 'Summer Promotion 2023',
                          sent: 2500,
                          delivered: 2450,
                          read: 1890,
                          responded: 312,
                        },
                        {
                          name: 'Product Launch Announcement',
                          sent: 1800,
                          delivered: 1780,
                          read: 1420,
                          responded: 245,
                        },
                        {
                          name: 'Customer Feedback Survey',
                          sent: 1200,
                          delivered: 1150,
                          read: 950,
                          responded: 180,
                        },
                        {
                          name: 'Holiday Special Offers',
                          sent: 3000,
                          delivered: 2950,
                          read: 2500,
                          responded: 450,
                        },
                        {
                          name: 'New Feature Update',
                          sent: 1500,
                          delivered: 1485,
                          read: 1100,
                          responded: 190,
                        },
                      ].map((campaign, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-4">{campaign.name}</td>
                          <td className="text-center">{campaign.sent.toLocaleString()}</td>
                          <td className="text-center">
                            {campaign.delivered.toLocaleString()} 
                            <div className="text-xs text-muted-foreground">
                              {Math.round((campaign.delivered / campaign.sent) * 100)}%
                            </div>
                          </td>
                          <td className="text-center">
                            {campaign.read.toLocaleString()}
                            <div className="text-xs text-muted-foreground">
                              {Math.round((campaign.read / campaign.delivered) * 100)}%
                            </div>
                          </td>
                          <td className="text-center">
                            {campaign.responded.toLocaleString()}
                            <div className="text-xs text-muted-foreground">
                              {Math.round((campaign.responded / campaign.read) * 100)}%
                            </div>
                          </td>
                          <td className="text-center">
                            <div className="font-medium text-green-600">
                              {Math.round((campaign.responded / campaign.delivered) * 100)}%
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Campaign Metrics Comparison</CardTitle>
                <CardDescription>
                  Performance comparison for key metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={[
                      { 
                        name: 'Delivery Rate', 
                        current: 98.5, 
                        previous: 97.2, 
                      },
                      { 
                        name: 'Open Rate', 
                        current: 82.3, 
                        previous: 76.1, 
                      },
                      { 
                        name: 'Response Rate', 
                        current: 15.8, 
                        previous: 12.4, 
                      },
                      { 
                        name: 'Conversion Rate', 
                        current: 8.7, 
                        previous: 6.3, 
                      },
                    ]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="current" fill="#8884d8" name="Current Period" />
                    <Bar dataKey="previous" fill="#82ca9d" name="Previous Period" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Templates</CardTitle>
                <CardDescription>
                  Templates with the highest engagement rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      name: 'Product Promotion', 
                      engagement: 87, 
                      response: 23,
                      conversion: 12 
                    },
                    { 
                      name: 'Feedback Request', 
                      engagement: 82, 
                      response: 31,
                      conversion: 8 
                    },
                    { 
                      name: 'Event Invitation', 
                      engagement: 76, 
                      response: 18,
                      conversion: 14 
                    },
                    { 
                      name: 'Order Confirmation', 
                      engagement: 95, 
                      response: 12,
                      conversion: 5 
                    },
                    { 
                      name: 'Appointment Reminder', 
                      engagement: 91, 
                      response: 26,
                      conversion: 18 
                    },
                  ].map((template, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b last:border-b-0 last:pb-0">
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-muted-foreground">Template</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{template.engagement}%</div>
                          <div className="text-xs text-muted-foreground">Engagement</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{template.response}%</div>
                          <div className="text-xs text-muted-foreground">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-green-600">{template.conversion}%</div>
                          <div className="text-xs text-muted-foreground">Conversion</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
