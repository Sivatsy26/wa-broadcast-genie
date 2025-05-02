
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User, Users, CreditCard, Paintbrush, BarChart3, Globe, 
  Shield, Share2, Bell, HeadphonesIcon, Key, Bot, Smartphone,
  MessageSquare, Eye, EyeOff, Mail, Phone, UserPlus, Lock, Calendar,
  Trash, Plus, LogOut, Settings, LineChart, CircleDollarSign, FileText,
  Gauge, Language, Database, FileCode
} from "lucide-react";
import AppearanceTab from './tabs/AppearanceTab';
import NotificationsTab from './tabs/NotificationsTab';
import DisappearingMessagesTab from './tabs/DisappearingMessagesTab';
import TemplatesTab from './tabs/TemplatesTab';
import DataManagementTab from './tabs/DataManagementTab';
import AutomatedResponsesTab from './tabs/AutomatedResponsesTab';
import AISettingsTab from './tabs/AISettingsTab';

interface SettingsPanelProps {
  userRole: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [timezone, setTimezone] = useState('UTC-5 Eastern Time');
  const [receiveMarketingEmails, setReceiveMarketingEmails] = useState(true);
  const [receiveProductUpdates, setReceiveProductUpdates] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState('light');
  const [apiKey, setApiKey] = useState('sk_test_123456789');
  const [facebookConnected, setFacebookConnected] = useState(true);
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [instagramConnected, setInstagramConnected] = useState(true);
  const [subscriptionPlan, setSubscriptionPlan] = useState('professional');
  const [autoRenew, setAutoRenew] = useState(true);
  
  // User settings
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', lastActive: '2023-05-01' },
    { id: 2, name: 'Mark Johnson', email: 'mark@example.com', role: 'user', lastActive: '2023-05-02' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', role: 'user', lastActive: '2023-04-28' },
  ]);
  
  // White label settings
  const [companyName, setCompanyName] = useState('My Company');
  const [logoUrl, setLogoUrl] = useState('https://example.com/logo.png');
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [customDomain, setCustomDomain] = useState('app.mycompany.com');
  
  // Billing settings
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [cardNumber, setCardNumber] = useState('**** **** **** 4242');
  const [expiryDate, setExpiryDate] = useState('05/25');
  const [billingAddress, setBillingAddress] = useState('123 Main St, New York, NY 10001');
  
  // Security settings
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipRestrictions, setIpRestrictions] = useState('');
  const [passwordPolicy, setPasswordPolicy] = useState('medium');
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handleChangePassword = () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Current password is required",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password changed",
      description: "Your password has been updated successfully."
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences updated",
      description: "Your account preferences have been saved."
    });
  };
  
  const handleCreateUser = () => {
    toast({
      title: "Invitation sent",
      description: "An invitation has been sent to the new user."
    });
  };
  
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been removed from your account."
    });
  };
  
  const handleSaveWhiteLabel = () => {
    toast({
      title: "White label settings saved",
      description: "Your branding settings have been updated."
    });
  };
  
  const handleSaveBilling = () => {
    toast({
      title: "Billing information updated",
      description: "Your payment details have been saved."
    });
  };
  
  const handleChangePlan = () => {
    toast({
      title: "Subscription updated",
      description: "Your subscription plan has been changed."
    });
  };
  
  const handleGenerateApiKey = () => {
    setApiKey('sk_test_' + Math.random().toString(36).substring(2, 15));
    toast({
      title: "New API key generated",
      description: "Your old API key has been revoked."
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved."
    });
  };

  const handleConnectSocial = (platform: string) => {
    toast({
      title: `${platform} connected`,
      description: `Your ${platform} account has been successfully connected.`
    });
  };

  const handleDisconnectSocial = (platform: string) => {
    toast({
      title: `${platform} disconnected`,
      description: `Your ${platform} account has been disconnected.`
    });
  };
  
  const handleSubmitTicket = () => {
    toast({
      title: "Support ticket created",
      description: "We'll respond to your inquiry shortly."
    });
  };
  
  const handleSaveIntegration = () => {
    toast({
      title: "Integration saved",
      description: "Your integration settings have been updated."
    });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 w-full mb-6 md:mb-0">
          <div className="bg-white rounded-lg border p-0">
            <div className="space-y-1 p-0.5">
              {[
                { id: "profile", label: "Profile", icon: <User size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "users", label: "Users", icon: <Users size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
                { id: "white-label", label: "White Label", icon: <Share2 size={18} />, visibleTo: ['super-admin', 'white-label'] },
                { id: "billing", label: "Billing", icon: <CreditCard size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
                { id: "appearance", label: "Appearance", icon: <Paintbrush size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
                { id: "global-settings", label: "Global Settings", icon: <Globe size={18} />, visibleTo: ['super-admin'] },
                { id: "security", label: "Security", icon: <Shield size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "social-accounts", label: "Social Accounts", icon: <Share2 size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "notifications", label: "Notifications", icon: <Bell size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "support", label: "Support", icon: <HeadphonesIcon size={18} />, visibleTo: ['super-admin', 'white-label', 'admin', 'user'] },
                { id: "api-keys", label: "API Keys", icon: <Key size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
                { id: "chatbot", label: "Chatbot", icon: <Bot size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
                { id: "integrations", label: "Integrations", icon: <Globe size={18} />, visibleTo: ['super-admin', 'white-label', 'admin'] },
              ].filter(item => item.visibleTo.includes(userRole)).map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start px-3 ${activeTab === item.id ? "" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span className="flex items-center">
                    <span className="mr-2">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="md:w-3/4 w-full">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <p className="text-muted-foreground">Manage your personal information and preferences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input 
                      id="full-name" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-address">Email Address</Label>
                    <Input 
                      id="email-address" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input 
                      id="phone-number" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input 
                      id="timezone" 
                      value={timezone} 
                      onChange={(e) => setTimezone(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select 
                      id="language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="german">German</option>
                      <option value="portuguese">Portuguese</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Password & Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="current-password" 
                        type={isPasswordVisible ? "text" : "password"} 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-0 top-0 h-full" 
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </div>
                  <div></div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-2">
                  <Switch 
                    id="two-factor" 
                    checked={twoFactorEnabled} 
                    onCheckedChange={setTwoFactorEnabled}
                  />
                  <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleChangePassword}>Change Password</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Account Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                    <Switch 
                      id="marketing-emails" 
                      checked={receiveMarketingEmails} 
                      onCheckedChange={setReceiveMarketingEmails}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-updates">Receive product updates</Label>
                    <Switch 
                      id="product-updates" 
                      checked={receiveProductUpdates} 
                      onCheckedChange={setReceiveProductUpdates}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="theme-setting">Theme</Label>
                    <div className="flex space-x-2">
                      <Button 
                        variant={theme === 'light' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setTheme('light')}
                      >
                        Light
                      </Button>
                      <Button 
                        variant={theme === 'dark' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setTheme('dark')}
                      >
                        Dark
                      </Button>
                      <Button 
                        variant={theme === 'system' ? 'default' : 'outline'} 
                        size="sm" 
                        onClick={() => setTheme('system')}
                      >
                        System
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSavePreferences}>Save Preferences</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Manage users and their permissions</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Users</h3>
                  <Button onClick={handleCreateUser}>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Last Active</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4 capitalize">{user.role}</td>
                          <td className="py-3 px-4">{user.lastActive}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteUser(user.id)}>
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Role Permissions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure what actions different user roles can perform in your account
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Admin</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage Users</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage Billing</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Access API Keys</span>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">User</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Create Campaigns</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">View Analytics</span>
                        <Switch defaultChecked={true} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Manage Social Accounts</span>
                        <Switch defaultChecked={true} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Permissions</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "white-label" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">White Label Settings</h2>
                <p className="text-muted-foreground">Customize branding for your clients</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Branding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo-url">Logo URL</Label>
                    <Input 
                      id="logo-url" 
                      value={logoUrl} 
                      onChange={(e) => setLogoUrl(e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="color" 
                        id="primary-color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="w-10 h-10 p-1 border rounded"
                      />
                      <Input 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="custom-domain">Custom Domain</Label>
                    <Input 
                      id="custom-domain" 
                      value={customDomain} 
                      onChange={(e) => setCustomDomain(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSaveWhiteLabel}>Save Branding</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Email Templates</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-header">Email Header</Label>
                    <textarea 
                      id="email-header" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="HTML content for email header"
                    ></textarea>
                  </div>
                  <div>
                    <Label htmlFor="email-footer">Email Footer</Label>
                    <textarea 
                      id="email-footer" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="HTML content for email footer"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Email Templates</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Client Portal</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-powered-by">Show "Powered by" footer</Label>
                    <Switch id="show-powered-by" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-help-docs">Show help documentation</Label>
                    <Switch id="show-help-docs" defaultChecked={true} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Portal Settings</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Billing Settings</h2>
                <p className="text-muted-foreground">Manage your subscription and payment methods</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Current Plan</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium capitalize">{subscriptionPlan} Plan</p>
                      <p className="text-sm text-muted-foreground mt-1">Renews on May 15, 2023</p>
                    </div>
                    <div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Basic</h4>
                    <p className="text-2xl font-bold mt-2">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="text-sm mt-4 space-y-2">
                      <li>2 Social Profiles</li>
                      <li>500 Monthly Messages</li>
                      <li>Basic Analytics</li>
                    </ul>
                    <Button 
                      variant={subscriptionPlan === 'basic' ? 'default' : 'outline'} 
                      className="w-full mt-4"
                      onClick={() => {
                        setSubscriptionPlan('basic');
                        handleChangePlan();
                      }}
                    >
                      {subscriptionPlan === 'basic' ? 'Current Plan' : 'Switch Plan'}
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 bg-primary/5 border-primary/20 shadow-sm">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Professional</h4>
                      <Badge className="bg-primary/20 text-primary">Popular</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-2">$99<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="text-sm mt-4 space-y-2">
                      <li>10 Social Profiles</li>
                      <li>2,000 Monthly Messages</li>
                      <li>Advanced Analytics</li>
                      <li>Team Collaboration</li>
                    </ul>
                    <Button 
                      variant={subscriptionPlan === 'professional' ? 'default' : 'outline'} 
                      className="w-full mt-4"
                      onClick={() => {
                        setSubscriptionPlan('professional');
                        handleChangePlan();
                      }}
                    >
                      {subscriptionPlan === 'professional' ? 'Current Plan' : 'Switch Plan'}
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Enterprise</h4>
                    <p className="text-2xl font-bold mt-2">$299<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                    <ul className="text-sm mt-4 space-y-2">
                      <li>Unlimited Social Profiles</li>
                      <li>10,000 Monthly Messages</li>
                      <li>Custom Analytics</li>
                      <li>Priority Support</li>
                      <li>White Label Options</li>
                    </ul>
                    <Button 
                      variant={subscriptionPlan === 'enterprise' ? 'default' : 'outline'} 
                      className="w-full mt-4"
                      onClick={() => {
                        setSubscriptionPlan('enterprise');
                        handleChangePlan();
                      }}
                    >
                      {subscriptionPlan === 'enterprise' ? 'Current Plan' : 'Switch Plan'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-renew" 
                    checked={autoRenew} 
                    onCheckedChange={setAutoRenew}
                  />
                  <Label htmlFor="auto-renew">Auto-renew subscription</Label>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                
                <RadioGroup defaultValue="visa">
                  <div className="flex items-center space-x-2 border rounded-md p-3 mb-3">
                    <RadioGroupItem value="visa" id="visa" />
                    <Label htmlFor="visa" className="flex-grow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires {expiryDate}</p>
                        </div>
                        <div>
                          <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <rect fill="#1A1F71" width="32" height="32" rx="4"/>
                            <path d="M13.1 12.0001L10.5 20.0001H8L10.6 12.0001H13.1ZM24 20.0001H21.6L19.5 13.7001L18.3 18.4001C18.1 19.0001 17.7 20.0001 16.6 20.0001H14L13.9 19.8001C15 19.5001 15.8 19.0001 16.4 18.4001C16.7 18.1001 17 17.7001 17.1 17.2001L17.9 14.0001L19.6 20.0001H22L24.1 12.0001H21.7L20 18.2001L19.2 12.0001H17.1L15.6 16.7001L15.1 18.0001C15 18.2001 14.9 18.2001 14.7 18.2001C14.2 18.2001 13.2 16.9001 13.2 16.9001L13.5 15.9001C13.6 15.4001 13.9 14.7001 15.2 14.7001C15.9 14.7001 16.5 15.0001 16.7 15.7001L17.2 12.5001C16.7 12.2001 16 12.0001 15.2 12.0001C13.4 12.0001 12.3 13.1001 11.7 14.6001L11.1 16.4001C11 16.7001 10.9 17.0001 10.9 17.3001C10.9 18.9001 12.2 20.3001 14.2 20.3001H14.4C15.6 20.3001 16.5 19.8001 17 18.7001L17.3 17.8001L17.9 20.0001H19.5L21.1 15.6001L21.7 20.0001H24V20.0001Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="mastercard" id="mastercard" />
                    <Label htmlFor="mastercard" className="flex-grow">
                      <div className="flex justify-between items-center">
                        <div>
                          <p>Add new payment method</p>
                        </div>
                        <div className="flex space-x-2">
                          <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="4" fill="#252525"/>
                            <circle cx="12" cy="16" r="6" fill="#EB001B"/>
                            <circle cx="20" cy="16" r="6" fill="#F79E1B"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 20C18.209 18.7905 19.7622 16.5397 19.7622 16C19.7622 15.4603 18.209 13.2095 16 12C13.791 13.2095 12.2378 15.4603 12.2378 16C12.2378 16.5397 13.791 18.7905 16 20Z" fill="#FF5F00"/>
                          </svg>
                          <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <rect fill="#1A1F71" width="32" height="32" rx="4"/>
                            <path d="M13.1 12.0001L10.5 20.0001H8L10.6 12.0001H13.1ZM24 20.0001H21.6L19.5 13.7001L18.3 18.4001C18.1 19.0001 17.7 20.0001 16.6 20.0001H14L13.9 19.8001C15 19.5001 15.8 19.0001 16.4 18.4001C16.7 18.1001 17 17.7001 17.1 17.2001L17.9 14.0001L19.6 20.0001H22L24.1 12.0001H21.7L20 18.2001L19.2 12.0001H17.1L15.6 16.7001L15.1 18.0001C15 18.2001 14.9 18.2001 14.7 18.2001C14.2 18.2001 13.2 16.9001 13.2 16.9001L13.5 15.9001C13.6 15.4001 13.9 14.7001 15.2 14.7001C15.9 14.7001 16.5 15.0001 16.7 15.7001L17.2 12.5001C16.7 12.2001 16 12.0001 15.2 12.0001C13.4 12.0001 12.3 13.1001 11.7 14.6001L11.1 16.4001C11 16.7001 10.9 17.0001 10.9 17.3001C10.9 18.9001 12.2 20.3001 14.2 20.3001H14.4C15.6 20.3001 16.5 19.8001 17 18.7001L17.3 17.8001L17.9 20.0001H19.5L21.1 15.6001L21.7 20.0001H24V20.0001Z" fill="white"/>
                          </svg>
                          <svg className="h-8 w-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="4" fill="#016FD0"/>
                            <path d="M16 21H7V18H16V21Z" fill="white"/>
                            <path d="M9 12L7 17H10L10.3 16H12.6L13 17H16L14 12H9ZM10.8 15L11.4 13.4L12 15H10.8Z" fill="white"/>
                            <path d="M17 12L15 17H17.6L17.9 16H20.1L20.4 17H23L21 12H17ZM18.3 15L18.9 13.4L19.5 15H18.3Z" fill="white"/>
                            <path d="M24 17L25 12H27.5L26.5 17H24Z" fill="white"/>
                            <path d="M20 11L20.4 10H22.4L22 11H20Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-6">
                  <div>
                    <Label htmlFor="billing-address">Billing Address</Label>
                    <Input 
                      id="billing-address" 
                      value={billingAddress} 
                      onChange={(e) => setBillingAddress(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSaveBilling}>Save Payment Info</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Description</th>
                      <th className="text-left py-3 px-4">Amount</th>
                      <th className="text-right py-3 px-4">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4">Apr 15, 2023</td>
                      <td className="py-3 px-4">Professional Plan - Monthly</td>
                      <td className="py-3 px-4">$99.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Mar 15, 2023</td>
                      <td className="py-3 px-4">Professional Plan - Monthly</td>
                      <td className="py-3 px-4">$99.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4">Feb 15, 2023</td>
                      <td className="py-3 px-4">Professional Plan - Monthly</td>
                      <td className="py-3 px-4">$99.00</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Analytics Settings</h2>
                <p className="text-muted-foreground">Configure your analytics preferences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Tracking & Reporting</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Google Analytics</Label>
                      <p className="text-sm text-muted-foreground">Connect your Google Analytics account</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Facebook Pixel</Label>
                      <p className="text-sm text-muted-foreground">Track conversions from Facebook ads</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Custom Events</Label>
                      <p className="text-sm text-muted-foreground">Track custom events in your application</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="ga-tracking-id">Google Analytics Tracking ID</Label>
                  <Input id="ga-tracking-id" placeholder="UA-XXXXXXXXX-X" />
                </div>
                
                <div className="mt-6">
                  <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                  <Input id="fb-pixel-id" placeholder="XXXXXXXXXXXXXXXXXX" />
                </div>
                
                <div className="mt-6">
                  <Button>Save Analytics Settings</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Scheduled Reports</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Weekly Performance Report</p>
                      <p className="text-sm text-muted-foreground">Sent every Monday at 9:00 AM</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Monthly Analytics Summary</p>
                      <p className="text-sm text-muted-foreground">Sent on the 1st of each month</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked={true} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Campaign Performance Alerts</p>
                      <p className="text-sm text-muted-foreground">Sent when campaigns exceed targets</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Report
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Data Retention</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Analytics Data Retention Period</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="forever">Forever</option>
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Analytics data older than this will be automatically deleted
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Retention Settings</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Security Settings</h2>
                <p className="text-muted-foreground">Configure your account security preferences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={twoFactorEnabled} 
                      onCheckedChange={setTwoFactorEnabled}
                    />
                  </div>
                  
                  {twoFactorEnabled && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm mb-4">Scan this QR code with your authenticator app:</p>
                      <div className="bg-white w-40 h-40 mx-auto mb-4 flex items-center justify-center border">
                        <p className="text-xs text-center text-muted-foreground">QR code placeholder</p>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="verification-code">Enter verification code</Label>
                        <div className="flex space-x-2 mt-1">
                          <Input id="verification-code" placeholder="000000" className="text-center" />
                          <Button>Verify</Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Management</p>
                        <p className="text-sm text-muted-foreground">Control your active sessions</p>
                      </div>
                      <Button variant="outline">Manage Sessions</Button>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="session-timeout">Session timeout (minutes)</Label>
                      <Input 
                        id="session-timeout" 
                        type="number" 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        min="5"
                        className="w-32"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Sessions will expire after this period of inactivity
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Password Policy</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Password Strength</Label>
                    <RadioGroup 
                      value={passwordPolicy} 
                      onValueChange={setPasswordPolicy} 
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="low" id="password-low" />
                        <Label htmlFor="password-low">Low - Minimum 8 characters</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="medium" id="password-medium" />
                        <Label htmlFor="password-medium">Medium - Minimum 10 characters with numbers and symbols</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="password-high" />
                        <Label htmlFor="password-high">High - Minimum 12 characters with uppercase, lowercase, numbers and symbols</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Password expiration</Label>
                    <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="never">Never</option>
                      <option value="30">30 days</option>
                      <option value="60">60 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Access Restrictions</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ip-restrictions">IP Whitelist (one per line)</Label>
                    <textarea 
                      id="ip-restrictions"
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="192.168.1.1"
                      value={ipRestrictions}
                      onChange={(e) => setIpRestrictions(e.target.value)}
                    ></textarea>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leave empty to allow access from any IP address
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Device Management</Label>
                      <p className="text-sm text-muted-foreground">Limit the number of devices that can access your account</p>
                    </div>
                    <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      <option value="unlimited">Unlimited</option>
                      <option value="1">1 device</option>
                      <option value="2">2 devices</option>
                      <option value="3">3 devices</option>
                      <option value="5">5 devices</option>
                      <option value="10">10 devices</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Access Settings</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "social-accounts" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Social Accounts</h2>
                <p className="text-muted-foreground">Manage your connected social media accounts</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                        f
                      </div>
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-sm text-muted-foreground">{facebookConnected ? 'Connected as John Doe' : 'Not connected'}</p>
                      </div>
                    </div>
                    <div>
                      {facebookConnected ? (
                        <Button variant="outline" onClick={() => {
                          setFacebookConnected(false);
                          handleDisconnectSocial('Facebook');
                        }}>Disconnect</Button>
                      ) : (
                        <Button onClick={() => {
                          setFacebookConnected(true);
                          handleConnectSocial('Facebook');
                        }}>Connect</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white mr-3">
                        t
                      </div>
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-muted-foreground">{twitterConnected ? 'Connected as @johndoe' : 'Not connected'}</p>
                      </div>
                    </div>
                    <div>
                      {twitterConnected ? (
                        <Button variant="outline" onClick={() => {
                          setTwitterConnected(false);
                          handleDisconnectSocial('Twitter');
                        }}>Disconnect</Button>
                      ) : (
                        <Button onClick={() => {
                          setTwitterConnected(true);
                          handleConnectSocial('Twitter');
                        }}>Connect</Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white mr-3">
                        i
                      </div>
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-sm text-muted-foreground">{instagramConnected ? 'Connected as @johndoe' : 'Not connected'}</p>
                      </div>
                    </div>
                    <div>
                      {instagramConnected ? (
                        <Button variant="outline" onClick={() => {
                          setInstagramConnected(false);
                          handleDisconnectSocial('Instagram');
                        }}>Disconnect</Button>
                      ) : (
                        <Button onClick={() => {
                          setInstagramConnected(true);
                          handleConnectSocial('Instagram');
                        }}>Connect</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Account Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-post to Facebook</p>
                      <p className="text-sm text-muted-foreground">Automatically post new content to Facebook</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-post to Twitter</p>
                      <p className="text-sm text-muted-foreground">Automatically post new content to Twitter</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-post to Instagram</p>
                      <p className="text-sm text-muted-foreground">Automatically post new content to Instagram</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Permissions</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "api-keys" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">API Keys</h2>
                <p className="text-muted-foreground">Manage your API keys for integrations</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">API Access</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Use these API keys to authenticate your requests to our API. Keep your API keys secure and do not share them publicly.
                  </p>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">API Key</Label>
                      <Button variant="outline" size="sm" onClick={handleGenerateApiKey}>
                        Regenerate
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        value={apiKey} 
                        readOnly 
                        className="pr-24 font-mono text-sm"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => {
                          navigator.clipboard.writeText(apiKey);
                          toast({
                            title: "Copied!",
                            description: "API key copied to clipboard"
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last generated: May 2, 2023
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="font-medium">Webhook Secret</Label>
                      <Button variant="outline" size="sm">
                        Regenerate
                      </Button>
                    </div>
                    <div className="relative">
                      <Input 
                        value="whsec_************************************************" 
                        readOnly 
                        className="pr-24 font-mono text-sm"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2"
                        onClick={() => {
                          toast({
                            title: "Copied!",
                            description: "Webhook secret copied to clipboard"
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last generated: April 15, 2023
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">API Usage</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">This month's usage</p>
                      <p className="text-sm text-muted-foreground">245,000 / 500,000 requests</p>
                    </div>
                    <div className="w-32">
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: '49%' }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Endpoint</th>
                          <th className="text-left py-3 px-4">Requests</th>
                          <th className="text-left py-3 px-4">Last Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">/api/campaigns</td>
                          <td className="py-3 px-4">120,458</td>
                          <td className="py-3 px-4">Today, 2:45 PM</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">/api/contacts</td>
                          <td className="py-3 px-4">76,321</td>
                          <td className="py-3 px-4">Today, 1:12 PM</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">/api/analytics</td>
                          <td className="py-3 px-4">48,221</td>
                          <td className="py-3 px-4">Yesterday, 11:30 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">API Documentation</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Access our comprehensive API documentation to learn how to integrate with our platform.
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <FileCode className="h-4 w-4 mr-2" />
                      View Documentation
                    </Button>
                    <Button variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      API Status
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Support</h2>
                <p className="text-muted-foreground">Get help with your account</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Contact Support</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="How can we help you?" />
                  </div>
                  <div>
                    <Label htmlFor="support-message">Message</Label>
                    <textarea 
                      id="support-message" 
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Describe your issue in detail"
                    ></textarea>
                  </div>
                  <div>
                    <Label htmlFor="support-priority">Priority</Label>
                    <select 
                      id="support-priority"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="low">Low - General question</option>
                      <option value="medium">Medium - Need assistance soon</option>
                      <option value="high">High - Experiencing issues</option>
                      <option value="critical">Critical - Service is down</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="support-attachment">Attachments (optional)</Label>
                    <Input id="support-attachment" type="file" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Support Tickets</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Ticket ID</th>
                        <th className="text-left py-3 px-4">Subject</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Created</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">#12345</td>
                        <td className="py-3 px-4">Integration question</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="py-3 px-4">May 1, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">#12344</td>
                        <td className="py-3 px-4">Billing issue</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Resolved
                          </span>
                        </td>
                        <td className="py-3 px-4">Apr 28, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">#12343</td>
                        <td className="py-3 px-4">API documentation</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                            Resolved
                          </span>
                        </td>
                        <td className="py-3 px-4">Apr 25, 2023</td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Help Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Documentation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Browse our comprehensive documentation to learn how to use our platform effectively.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center mb-2">
                      <HeadphonesIcon className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Live Chat</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Chat with our support team for immediate assistance with your questions.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center mb-2">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Community Forum</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect with other users to share knowledge, tips, and best practices.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <h4 className="font-medium">Webinars</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Join our regular webinars to learn advanced features and strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Integrations</h2>
                <p className="text-muted-foreground">Connect your favorite tools and services</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Available Integrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <span className="text-purple-600 text-lg font-semibold">S</span>
                        </div>
                        <h4 className="font-medium">Salesforce</h4>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sync contacts and campaigns with your Salesforce CRM
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-600 text-lg font-semibold">M</span>
                        </div>
                        <h4 className="font-medium">Mailchimp</h4>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Import your email list from Mailchimp
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 text-lg font-semibold">Z</span>
                        </div>
                        <h4 className="font-medium">Zapier</h4>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Connect with 3,000+ apps via Zapier
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-600 text-lg font-semibold">H</span>
                        </div>
                        <h4 className="font-medium">HubSpot</h4>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sync your HubSpot contacts and deals
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 text-lg font-semibold">S</span>
                        </div>
                        <h4 className="font-medium">Stripe</h4>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Process payments and manage subscriptions
                    </p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 text-lg font-semibold">G</span>
                        </div>
                        <h4 className="font-medium">Google Analytics</h4>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Track campaign performance in Google Analytics
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Integration Directory
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Webhooks</h3>
                <div className="space-y-4">
                  <p className="text-sm">
                    Create webhooks to receive real-time notifications when specific events occur.
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Event</th>
                          <th className="text-left py-3 px-4">URL</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-right py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">campaign.created</td>
                          <td className="py-3 px-4 font-mono text-xs">https://example.com/webhooks/campaign</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">message.sent</td>
                          <td className="py-3 px-4 font-mono text-xs">https://example.com/webhooks/message</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Webhook
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Custom Integrations</h3>
                <div className="space-y-4">
                  <p className="text-sm mb-4">
                    Build your own integrations using our API and developer tools.
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <FileCode className="h-4 w-4 mr-2" />
                      API Documentation
                    </Button>
                    <Button variant="outline">
                      <Key className="h-4 w-4 mr-2" />
                      Manage API Keys
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "global-settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Global Settings</h2>
                <p className="text-muted-foreground">Configure global system settings</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">System Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">Temporarily disable access to the platform</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New User Registrations</p>
                      <p className="text-sm text-muted-foreground">Allow new users to register accounts</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Notifications</p>
                      <p className="text-sm text-muted-foreground">Send notifications about system status</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="default-timezone">Default Time Zone</Label>
                    <select 
                      id="default-timezone"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                    >
                      <option value="utc">UTC (Coordinated Universal Time)</option>
                      <option value="est">EST (Eastern Standard Time)</option>
                      <option value="cst">CST (Central Standard Time)</option>
                      <option value="mst">MST (Mountain Standard Time)</option>
                      <option value="pst">PST (Pacific Standard Time)</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="default-language">Default Language</Label>
                    <select 
                      id="default-language"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="pt">Portuguese</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save System Configuration</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Limits & Quotas</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="max-file-size">Maximum File Upload Size (MB)</Label>
                    <Input 
                      id="max-file-size" 
                      type="number" 
                      defaultValue="10" 
                      min="1"
                      className="w-32"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rate-limit">API Rate Limit (requests per minute)</Label>
                    <Input 
                      id="rate-limit" 
                      type="number" 
                      defaultValue="60" 
                      min="1"
                      className="w-32"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-contacts">Maximum Contacts Per Account</Label>
                    <Input 
                      id="max-contacts" 
                      type="number" 
                      defaultValue="10000" 
                      min="100"
                      className="w-32"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Limits & Quotas</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Email Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="smtp-host">SMTP Host</Label>
                    <Input id="smtp-host" defaultValue="smtp.example.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-port">SMTP Port</Label>
                      <Input id="smtp-port" defaultValue="587" />
                    </div>
                    <div>
                      <Label htmlFor="smtp-security">Security</Label>
                      <select 
                        id="smtp-security"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="smtp-username">Username</Label>
                    <Input id="smtp-username" defaultValue="notifications@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="smtp-password">Password</Label>
                    <Input id="smtp-password" type="password" value="************" />
                  </div>
                  <div>
                    <Label htmlFor="from-email">Default From Email</Label>
                    <Input id="from-email" defaultValue="no-reply@example.com" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="test-email">Send Test Email</Label>
                    <div className="flex space-x-2">
                      <Input id="test-email" placeholder="your@email.com" className="w-64" />
                      <Button>Send Test</Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Email Configuration</Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">System Logs</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Log Level</p>
                      <p className="text-sm text-muted-foreground">Set the verbosity of system logs</p>
                    </div>
                    <select 
                      id="log-level"
                      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="error">Error</option>
                      <option value="warning">Warning</option>
                      <option value="info" selected>Info</option>
                      <option value="debug">Debug</option>
                      <option value="trace">Trace</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Activity Logging</p>
                      <p className="text-sm text-muted-foreground">Track user actions throughout the system</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Health Check</p>
                      <p className="text-sm text-muted-foreground">Schedule automatic system health checks</p>
                    </div>
                    <select 
                      id="health-check"
                      className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="15m">Every 15 minutes</option>
                      <option value="30m">Every 30 minutes</option>
                      <option value="1h" selected>Hourly</option>
                      <option value="6h">Every 6 hours</option>
                      <option value="12h">Every 12 hours</option>
                      <option value="24h">Daily</option>
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Download System Logs
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Database Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automated Backups</p>
                      <p className="text-sm text-muted-foreground">Schedule regular database backups</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  
                  <div>
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <select 
                      id="backup-frequency"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-1"
                    >
                      <option value="daily" selected>Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="retention-period">Retention Period (days)</Label>
                    <Input 
                      id="retention-period" 
                      type="number" 
                      defaultValue="30" 
                      min="1"
                      className="w-32"
                    />
                  </div>
                  
                  <div className="pt-4 flex flex-col space-y-2">
                    <Button variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Backup Now
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Backup History
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button>Save Database Settings</Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "chatbot" && <AISettingsTab />}
          {activeTab === "appearance" && <AppearanceTab />}
          {activeTab === "notifications" && <NotificationsTab />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

// TypeScript definition for the Badge component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className ? className : 'bg-gray-100 text-gray-800'}`}>
      {children}
    </span>
  );
};
