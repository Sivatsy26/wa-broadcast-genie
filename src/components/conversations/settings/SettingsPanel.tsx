import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
import AnalyticsTab from './tabs/AnalyticsTab';
import GlobalSettingsTab from './tabs/GlobalSettingsTab';
import SecurityTab from './tabs/SecurityTab';
import SocialAccountsTab from './tabs/SocialAccountsTab';
import SupportTab from './tabs/SupportTab';
import APIKeysTab from './tabs/APIKeysTab';
import ChatbotTab from './tabs/ChatbotTab';
import IntegrationsTab from './tabs/IntegrationsTab';

interface SettingsPanelProps {
  userRole: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ userRole }) => {
  const navigate = useNavigate();
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
  
  // Plans settings
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic', price: 29, features: ['2 Social Profiles', '500 Monthly Messages', 'Basic Analytics'], isPopular: false },
    { id: 2, name: 'Professional', price: 99, features: ['10 Social Profiles', '2,000 Monthly Messages', 'Advanced Analytics', 'Team Collaboration'], isPopular: true },
    { id: 3, name: 'Enterprise', price: 299, features: ['Unlimited Social Profiles', '10,000 Monthly Messages', 'Custom Analytics', 'Priority Support', 'White Label Options'], isPopular: false }
  ]);

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

  const navigateToUserManagement = () => {
    navigate('/users');
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

  // Plan management functions
  const handleAddPlan = () => {
    const newPlan = {
      id: plans.length + 1,
      name: 'New Plan',
      price: 0,
      features: ['Feature 1', 'Feature 2'],
      isPopular: false
    };
    
    setPlans([...plans, newPlan]);
    
    toast({
      title: "Plan added",
      description: "A new pricing plan has been added."
    });
  };
  
  const handleEditPlan = (id: number) => {
    const updatedPlans = [...plans];
    const planIndex = updatedPlans.findIndex(p => p.id === id);
    
    if (planIndex !== -1) {
      updatedPlans[planIndex] = {
        ...updatedPlans[planIndex],
        name: window.prompt('Enter plan name:', updatedPlans[planIndex].name) || updatedPlans[planIndex].name,
        price: parseInt(window.prompt('Enter plan price:', updatedPlans[planIndex].price.toString()) || updatedPlans[planIndex].price.toString()),
        features: window.prompt('Enter features (comma separated):', updatedPlans[planIndex].features.join(','))?.split(',') || updatedPlans[planIndex].features
      };
      
      setPlans(updatedPlans);
      
      toast({
        title: "Plan updated",
        description: "The pricing plan has been updated."
      });
    }
  };
  
  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
    
    toast({
      title: "Plan deleted",
      description: "The pricing plan has been removed."
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
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <p className="text-muted-foreground">Manage users and their permissions</p>
                </div>
                
                <Button onClick={navigateToUserManagement}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <p className="text-center py-6">
                  Please use the full User Management page for comprehensive user administration including adding, editing, and managing users with detailed information.
                </p>
                <div className="flex justify-center">
                  <Button onClick={navigateToUserManagement}>
                    Go to User Management
                  </Button>
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
                  {plans.map(plan => (
                    <div key={plan.id} className={`border rounded-lg p-4 ${plan.isPopular ? 'bg-primary/5 border-primary/20 shadow-sm' : ''}`}>
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{plan.name}</h4>
                        {plan.isPopular && (
                          <div className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">Popular</div>
                        )}
                      </div>
                      <p className="text-2xl font-bold mt-2">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                      <ul className="text-sm mt-4 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <div className="flex mt-4 space-x-2">
                        <Button 
                          variant={subscriptionPlan === plan.name.toLowerCase() ? 'default' : 'outline'} 
                          className="flex-grow"
                          onClick={() => {
                            setSubscriptionPlan(plan.name.toLowerCase());
                            handleChangePlan();
                          }}
                        >
                          {subscriptionPlan === plan.name.toLowerCase() ? 'Current Plan' : 'Switch Plan'}
                        </Button>
                        
                        {(userRole === 'super-admin' || userRole === 'white-label') && (
                          <>
                            <Button 
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditPlan(plan.id)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeletePlan(plan.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {(userRole === 'super-admin' || userRole === 'white-label') && (
                  <Button onClick={handleAddPlan}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Plan
                  </Button>
                )}
              </div>
              
              {(userRole === 'super-admin' || userRole === 'white-label') && (
                <div className="bg-white p-6 rounded-lg border">
                  <h3 className="text-lg font-medium mb-4">Payment Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stripe-api-key">Stripe API Key</Label>
                      <Input 
                        id="stripe-api-key" 
                        placeholder="Enter your Stripe API key"
                        type="password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment-currency">Default Currency</Label>
                      <select 
                        id="payment-currency"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="usd">USD ($)</option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="aud">AUD ($)</option>
                        <option value="cad">CAD ($)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                      <Input 
                        id="invoice-prefix" 
                        placeholder="INV-"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                      <Input 
                        id="tax-rate" 
                        type="number"
                        placeholder="0"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button>Save Payment Settings</Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "appearance" && (
            <AppearanceTab />
          )}
          
          {activeTab === "analytics" && (
            <AnalyticsTab userRole={userRole} />
          )}
          
          {activeTab === "global-settings" && (
            <GlobalSettingsTab />
          )}
          
          {activeTab === "security" && (
            <SecurityTab userRole={userRole} />
          )}
          
          {activeTab === "social-accounts" && (
            <SocialAccountsTab userRole={userRole} />
          )}
          
          {activeTab === "notifications" && (
            <NotificationsTab />
          )}
          
          {activeTab === "support" && (
            <SupportTab userRole={userRole} />
          )}
          
          {activeTab === "api-keys" && (
            <APIKeysTab userRole={userRole} />
          )}
          
          {activeTab === "chatbot" && (
            <ChatbotTab userRole={userRole} />
          )}
          
          {activeTab === "integrations" && (
            <IntegrationsTab userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
