
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
  Gauge, Languages, Database, FileCode
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
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Active</div>
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
                      <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">Popular</div>
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
                            <path d="M13.1 12.0001L10.5 20.0001H8L10.6 12.0001H13.1ZM24 20.0001H21.6L19.5 13.7001L18.3 18.4001C18.1 19.0001 17.7 20.0001 16.6 20.0001H14L13.9 19.8001C15 19.5001 15.8 19.0001 16.4 18.4001C16.7 18.1001 17 17.7001 17.1 17.2001L17.9 14.0001L19.6 20.0001H22L24.1 12.0001H21.7L20 18.2001L19.2 12.0001H17.1L15.6 16.7001L15.1 18.0001C15 18.2001 14.9 18.2001 14.7 18.2001C14.2 18.2001 13.2 16.9001 13.2 16.9001L13.5 15.9001C13.6 15.4001 13.9 14.7001 15.2 14.7001C15.9 14.7001 16.5 15.0001 16.7 15.7001L17.2 12.5001C16.7 12.2001 16 12.0001 15.2 12.0001C13.4 12.0001 12.3 13.1001 11.7 14.6001L11.1 16.4001C11 16.7001 10.9 16.9001 10.9 17.2001C10.9 17.4001 10.9 17.5001 11 17.7001C11.2 18.8001 12.5 20.2001 14.2 20.2001H14.3C15.3 20.2001 16 19.8001 16.4 19.3001L16.5 20.0001H19.1L19 19.5001C19 19.0001 19 18.3001 19.1 17.7001L20.8 12.0001H24Z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="border-t mt-6 pt-6">
                  <h4 className="font-medium mb-4">Add New Payment Method</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="**** **** **** ****" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="***" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="Enter your name as it appears on the card" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <textarea
                        id="billing-address"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Enter your billing address"
                        defaultValue={billingAddress}
                      ></textarea>
                    </div>
                  </div>
                  <Button className="mt-4" onClick={handleSaveBilling}>
                    Add Payment Method
                  </Button>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Description</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Invoice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">May 1, 2023</td>
                        <td className="py-3 px-4">Professional Plan - Monthly</td>
                        <td className="py-3 px-4">$99.00</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Paid</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Apr 1, 2023</td>
                        <td className="py-3 px-4">Professional Plan - Monthly</td>
                        <td className="py-3 px-4">$99.00</td>
                        <td className="py-3 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Paid</span>
                        </td>
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
            </div>
          )}
          
          {activeTab === "appearance" && (
            <AppearanceTab />
          )}
          
          {activeTab === "notifications" && (
            <NotificationsTab />
          )}
          
          {activeTab === "templates" && (
            <TemplatesTab />
          )}
          
          {activeTab === "data-management" && (
            <DataManagementTab />
          )}
          
          {activeTab === "automated-responses" && (
            <AutomatedResponsesTab />
          )}
          
          {activeTab === "ai-settings" && (
            <AISettingsTab />
          )}
          
          {activeTab === "disappearing-messages" && (
            <DisappearingMessagesTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
