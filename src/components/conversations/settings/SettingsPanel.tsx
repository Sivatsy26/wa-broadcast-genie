
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import {
  User, Users, CreditCard, Paintbrush, BarChart3, Globe, 
  Shield, Share2, Bell, HeadphonesIcon, Key, Bot, LucideGlobe, Smartphone,
  MessageSquare, Eye, EyeOff
} from "lucide-react";
import AppearanceTab from './tabs/AppearanceTab';
import NotificationsTab from './tabs/NotificationsTab';
import DisappearingMessagesTab from './tabs/DisappearingMessagesTab';
import TemplatesTab from './tabs/TemplatesTab';
import DataManagementTab from './tabs/DataManagementTab';
import AutomatedResponsesTab from './tabs/AutomatedResponsesTab';
import AISettingsTab from './tabs/AISettingsTab';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('+1 (555) 123-4567');
  const [timezone, setTimezone] = useState('UTC-5 Eastern Time');
  const [receiveMarketingEmails, setReceiveMarketingEmails] = useState(true);
  const [receiveProductUpdates, setReceiveProductUpdates] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
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

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="md:w-1/4 w-full mb-6 md:mb-0">
          <div className="bg-white rounded-lg border p-0">
            <div className="space-y-1 p-0.5">
              {[
                { id: "profile", label: "Profile", icon: <User size={18} /> },
                { id: "users", label: "Users", icon: <Users size={18} /> },
                { id: "white-label", label: "White Label", icon: <Share2 size={18} /> },
                { id: "billing", label: "Billing", icon: <CreditCard size={18} /> },
                { id: "appearance", label: "Appearance", icon: <Paintbrush size={18} /> },
                { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
                { id: "global-settings", label: "Global Settings", icon: <Globe size={18} /> },
                { id: "security", label: "Security", icon: <Shield size={18} /> },
                { id: "social-accounts", label: "Social Accounts", icon: <Share2 size={18} /> },
                { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
                { id: "support", label: "Support", icon: <HeadphonesIcon size={18} /> },
                { id: "api-keys", label: "API Keys", icon: <Key size={18} /> },
                { id: "chatbot", label: "Chatbot", icon: <Bot size={18} /> },
                { id: "integrations", label: "Integrations", icon: <LucideGlobe size={18} /> },
              ].map((item) => (
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
          
          <div className="mt-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground">View as role:</p>
              <div className="mt-3">
                <ToggleGroup type="single" value={userRole} onValueChange={(value) => value && setUserRole(value)}>
                  <ToggleGroupItem value="super-admin" className="text-xs">
                    Super Admin
                  </ToggleGroupItem>
                  <ToggleGroupItem value="white-label" className="text-xs">
                    White Label
                  </ToggleGroupItem>
                  <ToggleGroupItem value="admin" className="text-xs">
                    Admin
                  </ToggleGroupItem>
                  <ToggleGroupItem value="user" className="text-xs">
                    User
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
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
                </div>
                
                <div className="mt-6">
                  <Button onClick={handleSavePreferences}>Save Preferences</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "appearance" && <AppearanceTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "global-settings" && <DisappearingMessagesTab />}
          {activeTab === "templates" && <TemplatesTab />}
          {activeTab === "data-management" && <DataManagementTab />}
          {activeTab === "automated-responses" && <AutomatedResponsesTab />}
          {activeTab === "chatbot" && <AISettingsTab />}
          
          {/* Placeholder content for other tabs */}
          {(activeTab === "users" || activeTab === "white-label" || activeTab === "billing" || 
            activeTab === "analytics" || activeTab === "security" || activeTab === "social-accounts" || 
            activeTab === "support" || activeTab === "api-keys" || activeTab === "integrations") && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')} Settings</h2>
                <p className="text-muted-foreground">Manage your {activeTab.replace('-', ' ')} settings and preferences</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border h-64 flex items-center justify-center">
                <p className="text-muted-foreground">This feature is coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
