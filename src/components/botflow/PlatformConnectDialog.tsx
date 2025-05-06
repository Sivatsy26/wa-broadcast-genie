import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Scan, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface PlatformConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformType: 'whatsapp' | 'facebook' | 'instagram' | 'telegram' | 'website';
  accountIndex: number;
  onSuccess: () => void;
}

// Define QR code status type to ensure consistent usage
type QrCodeStatus = 'generating' | 'ready' | 'scanning' | 'success' | 'expired';

const PlatformConnectDialog: React.FC<PlatformConnectDialogProps> = ({
  open,
  onOpenChange,
  platformType,
  accountIndex,
  onSuccess
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessAccountId, setBusinessAccountId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [connectionMethod, setConnectionMethod] = useState<'qrcode' | 'apikey'>(
    platformType === 'whatsapp' ? 'qrcode' : 'apikey'
  );
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrCodeStatus, setQrCodeStatus] = useState<QrCodeStatus>('generating');
  const [qrCodeTimer, setQrCodeTimer] = useState<number>(60);
  const { toast } = useToast();

  useEffect(() => {
    // Reset connection method when platform changes
    setConnectionMethod(platformType === 'whatsapp' ? 'qrcode' : 'apikey');
    
    // Reset form fields
    setApiKey('');
    setPhoneNumber('');
    setBusinessAccountId('');
    setQrCodeUrl(null);
    setQrCodeStatus('generating');
    setQrCodeTimer(60);
  }, [platformType, open]);

  // QR code timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (open && connectionMethod === 'qrcode' && qrCodeStatus === 'ready' && qrCodeTimer > 0) {
      interval = setInterval(() => {
        setQrCodeTimer((prev) => {
          if (prev <= 1) {
            setQrCodeStatus('expired');
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Generate mock QR code when dialog opens
      if (qrCodeStatus === 'generating') {
        setTimeout(() => {
          // Mock QR code - in a real implementation this would come from WhatsApp API
          setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-mock-connection-code');
          setQrCodeStatus('ready');
        }, 1500);
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [open, connectionMethod, qrCodeStatus, qrCodeTimer]);

  const getPlatformTitle = () => {
    switch (platformType) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'facebook':
        return 'Facebook Messenger';
      case 'instagram':
        return 'Instagram';
      case 'telegram':
        return 'Telegram';
      case 'website':
        return 'Website Widget';
      default:
        return '';
    }
  };

  const handleGenerateNewQrCode = () => {
    setQrCodeStatus('generating');
    setQrCodeTimer(60);
    
    // Simulate generating a new QR code
    setTimeout(() => {
      setQrCodeUrl('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp-mock-connection-code-' + Date.now());
      setQrCodeStatus('ready');
    }, 1500);
  };

  const simulateQrCodeScan = () => {
    setQrCodeStatus('scanning');
    
    // Simulate QR code scanning process
    setTimeout(() => {
      setQrCodeStatus('success');
      toast({
        title: "Connection Successful",
        description: `${getPlatformTitle()} account ${accountIndex + 1} has been connected via QR code.`,
      });
      onSuccess();
      onOpenChange(false);
    }, 2000);
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      // Validation for required fields in API key mode
      if (connectionMethod === 'apikey') {
        // Validation for required fields
        if (platformType === 'whatsapp' && !phoneNumber) {
          toast({
            title: "Missing information",
            description: "Please enter the WhatsApp phone number",
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }

        if ((platformType === 'whatsapp' || platformType === 'facebook' || platformType === 'instagram') && !apiKey) {
          toast({
            title: "Missing information",
            description: `Please enter the ${getPlatformTitle()} API key`,
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }

        if ((platformType === 'facebook' || platformType === 'instagram') && !businessAccountId) {
          toast({
            title: "Missing information",
            description: `Please enter the Business Account ID`,
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }

        // For website widget we just need a name
        if (platformType === 'website' && !displayName) {
          toast({
            title: "Missing information",
            description: "Please enter a name for your website widget",
            variant: "destructive",
          });
          setIsConnecting(false);
          return;
        }
      }

      // For QR code connection method, we just simulate a successful connection
      if (connectionMethod === 'qrcode' && qrCodeStatus === 'success') {
        toast({
          title: "Connection Successful",
          description: `${getPlatformTitle()} account ${accountIndex + 1} has been connected via QR code.`,
        });
        onSuccess();
        onOpenChange(false);
        return;
      }

      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Connection Successful",
        description: `${getPlatformTitle()} account ${accountIndex + 1} has been connected.`,
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: `There was a problem connecting your ${getPlatformTitle()} account. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Render QR code connection UI for WhatsApp
  const renderQrCodeConnection = () => {
    return (
      <div className="flex flex-col items-center justify-center py-4 space-y-4">
        <div className="text-center mb-2">
          <p className="text-sm text-muted-foreground mb-4">
            Scan this QR code from your WhatsApp mobile app to connect your account
          </p>
          {qrCodeStatus === 'generating' && (
            <div className="w-[200px] h-[200px] flex items-center justify-center bg-muted rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Generating QR code...</span>
            </div>
          )}
          {qrCodeStatus === 'ready' && qrCodeUrl && (
            <div className="relative">
              <img 
                src={qrCodeUrl} 
                alt="WhatsApp QR Code" 
                className="w-[200px] h-[200px] mx-auto border rounded-lg"
                onClick={simulateQrCodeScan} // For demo purposes
              />
              <div className="absolute bottom-2 right-2 bg-background/80 py-1 px-2 rounded text-xs font-medium">
                {qrCodeTimer}s
              </div>
            </div>
          )}
          {qrCodeStatus === 'scanning' && (
            <div className="w-[200px] h-[200px] flex flex-col items-center justify-center bg-muted rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="mt-2 text-muted-foreground">Connecting...</span>
            </div>
          )}
          {qrCodeStatus === 'success' && (
            <div className="w-[200px] h-[200px] flex flex-col items-center justify-center bg-green-50 rounded-lg border-2 border-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="mt-2 font-medium text-green-700">Successfully connected</span>
            </div>
          )}
          {qrCodeStatus === 'expired' && (
            <div className="w-[200px] h-[200px] flex flex-col items-center justify-center bg-muted rounded-lg">
              <span className="text-muted-foreground mb-2">QR code expired</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleGenerateNewQrCode}
              >
                Generate new QR code
              </Button>
            </div>
          )}
        </div>
        {qrCodeStatus === 'ready' && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              To scan the QR code, open WhatsApp on your phone, go to Settings, select Linked Devices, and tap Link a Device.
            </p>
          </div>
        )}
        {/* This button is just for demonstration purposes */}
        {qrCodeStatus === 'ready' && (
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={simulateQrCodeScan}
          >
            Simulate QR Code Scan
          </Button>
        )}
        <div>
          <Label htmlFor="display-name">Display Name (Optional)</Label>
          <Input
            id="display-name"
            placeholder="How this account will appear in your dashboard"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="mt-2"
          />
        </div>
      </div>
    );
  };

  // Render different form fields based on platform type
  const renderPlatformSpecificFields = () => {
    // For WhatsApp with QR code option, show tabs
    if (platformType === 'whatsapp') {
      return (
        <Tabs defaultValue={connectionMethod} onValueChange={(value) => setConnectionMethod(value as 'qrcode' | 'apikey')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <Scan className="w-4 h-4" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="apikey" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              API Key
            </TabsTrigger>
          </TabsList>
          <TabsContent value="qrcode">
            {renderQrCodeConnection()}
          </TabsContent>
          <TabsContent value="apikey">
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="phone-number">WhatsApp Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="e.g. +1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include the country code, e.g., +1 for US
                </p>
              </div>
              <div>
                <Label htmlFor="api-key">WhatsApp Business API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your WhatsApp Business API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="display-name">Display Name (Optional)</Label>
                <Input
                  id="display-name"
                  placeholder="How this account will appear in your dashboard"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      );
    }
      
    // For other platforms, keep existing code
    switch (platformType) {
      case 'facebook':
        return (
          <>
            <div>
              <Label htmlFor="page-id">Facebook Page ID</Label>
              <Input
                id="page-id"
                placeholder="Enter your Facebook Page ID"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can find this in your Facebook Page settings
              </p>
            </div>
            <div>
              <Label htmlFor="api-key">Facebook Developer API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Facebook API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="display-name">Display Name (Optional)</Label>
              <Input
                id="display-name"
                placeholder="How this account will appear in your dashboard"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2"
              />
            </div>
          </>
        );
        
      case 'instagram':
        return (
          <>
            <div>
              <Label htmlFor="instagram-id">Instagram Business Account ID</Label>
              <Input
                id="instagram-id"
                placeholder="Enter your Instagram Business Account ID"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You need a Business Account to enable Instagram messaging API
              </p>
            </div>
            <div>
              <Label htmlFor="api-key">Instagram API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your Instagram API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="display-name">Display Name (Optional)</Label>
              <Input
                id="display-name"
                placeholder="How this account will appear in your dashboard"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2"
              />
            </div>
          </>
        );
        
      case 'telegram':
        return (
          <>
            <div>
              <Label htmlFor="telegram-token">Telegram Bot Token</Label>
              <Input
                id="telegram-token"
                type="password"
                placeholder="Enter your Telegram Bot API Token"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can get this from BotFather on Telegram
              </p>
            </div>
            <div>
              <Label htmlFor="bot-username">Bot Username</Label>
              <Input
                id="bot-username"
                placeholder="e.g. @YourBot"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2"
              />
            </div>
          </>
        );
        
      case 'website':
        return (
          <>
            <div>
              <Label htmlFor="widget-name">Widget Name</Label>
              <Input
                id="widget-name"
                placeholder="e.g. Support Widget"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <div className="bg-muted p-3 rounded-md mt-4">
                <p className="font-medium">Installation Instructions</p>
                <p className="text-sm mt-2">
                  After creating your widget, you'll receive a code snippet to add to your website.
                  Place this in the <code>&lt;head&gt;</code> section of your website's HTML.
                </p>
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Connect {getPlatformTitle()} Account {accountIndex + 1}</DialogTitle>
          <DialogDescription>
            {platformType === 'whatsapp' 
              ? 'Connect your WhatsApp account via QR code or API key'
              : `Add the required information to connect your ${getPlatformTitle()} account`
            }
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {renderPlatformSpecificFields()}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isConnecting}
          >
            Cancel
          </Button>
          {(platformType !== 'whatsapp' || 
            (platformType === 'whatsapp' && connectionMethod === 'apikey') || 
            (platformType === 'whatsapp' && connectionMethod === 'qrcode' && qrCodeStatus === 'success')) && (
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Account'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformConnectDialog;
