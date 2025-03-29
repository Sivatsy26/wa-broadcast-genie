
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  QrCode,
  Smartphone,
  RefreshCw,
  Check,
  X,
  PhoneCall,
  Key,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface WhatsAppAccount {
  id: string;
  name: string;
  phone: string;
  status: 'connected' | 'disconnected' | 'expired';
  type: 'qr' | 'otp' | 'api';
  lastActive: string;
}

const accounts: WhatsAppAccount[] = [
  {
    id: '1',
    name: 'Business Account 1',
    phone: '+1 (555) 123-4567',
    status: 'connected',
    type: 'qr',
    lastActive: '2023-06-20T15:30:00Z',
  },
  {
    id: '2',
    name: 'Marketing Account',
    phone: '+1 (555) 987-6543',
    status: 'connected',
    type: 'api',
    lastActive: '2023-06-22T10:15:00Z',
  },
  {
    id: '3',
    name: 'Support Account',
    phone: '+1 (555) 456-7890',
    status: 'disconnected',
    type: 'otp',
    lastActive: '2023-06-15T09:45:00Z',
  },
  {
    id: '4',
    name: 'Sales Account',
    phone: '+1 (555) 789-0123',
    status: 'expired',
    type: 'qr',
    lastActive: '2023-05-10T14:20:00Z',
  },
];

const WhatsAppAccounts = () => {
  const { toast } = useToast();
  const [newAccountName, setNewAccountName] = useState('');
  const [businessId, setBusinessId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConnect = (accountId: string) => {
    toast({
      title: "Reconnecting account",
      description: "Attempting to reconnect WhatsApp account...",
    });
  };

  const handleAddAccount = (type: string) => {
    toast({
      title: "Account creation initiated",
      description: `Creating new WhatsApp account via ${type}...`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">WhatsApp Accounts</h1>
          <p className="text-muted-foreground">
            Manage your connected WhatsApp business accounts
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add WhatsApp Account</DialogTitle>
              <DialogDescription>
                Choose a method to connect your WhatsApp business account.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="qr">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="api">Business API</TabsTrigger>
              </TabsList>
              
              <TabsContent value="qr" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-name">Account Name</Label>
                  <Input
                    id="qr-name"
                    placeholder="e.g., Marketing Account"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                  />
                </div>
                
                <div className="border rounded-md p-6 flex flex-col items-center justify-center">
                  <QrCode className="h-32 w-32 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Scan this QR code with your WhatsApp app to connect
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Refresh QR Code
                  </Button>
                </div>
                
                <Button className="w-full" onClick={() => handleAddAccount('QR code')}>
                  <Check className="mr-2 h-4 w-4" />
                  Confirm Connection
                </Button>
              </TabsContent>
              
              <TabsContent value="phone" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-name">Account Name</Label>
                  <Input
                    id="phone-name"
                    placeholder="e.g., Support Account"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                    <p className="text-sm">
                      We'll send a one-time password to this number to verify.
                    </p>
                  </div>
                </div>
                
                <Button className="w-full" onClick={() => handleAddAccount('phone verification')}>
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Send Verification Code
                </Button>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="api-name">Account Name</Label>
                  <Input
                    id="api-name"
                    placeholder="e.g., Business Account"
                    value={newAccountName}
                    onChange={(e) => setNewAccountName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="business-id">Business ID</Label>
                  <Input
                    id="business-id"
                    placeholder="Enter Meta Business ID"
                    value={businessId}
                    onChange={(e) => setBusinessId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                
                <Button className="w-full" onClick={() => handleAddAccount('Business API')}>
                  <Key className="mr-2 h-4 w-4" />
                  Connect API
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <Card key={account.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{account.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{account.phone}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      account.status === 'connected'
                        ? 'bg-green-500'
                        : account.status === 'disconnected'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                  <span className="text-sm capitalize">{account.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  {account.type === 'qr' && <QrCode className="h-4 w-4" />}
                  {account.type === 'otp' && <PhoneCall className="h-4 w-4" />}
                  {account.type === 'api' && <Key className="h-4 w-4" />}
                  <span className="text-sm">{account.type === 'qr' ? 'QR Code' : account.type === 'otp' ? 'Phone Verification' : 'Business API'}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last active</span>
                  <span>{new Date(account.lastActive).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Messages sent</span>
                  <span>2,458</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              {account.status !== 'connected' ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleConnect(account.id)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reconnect
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full text-green-600"
                  disabled
                >
                  <Check className="mr-2 h-4 w-4" />
                  Connected
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WhatsAppAccounts;
