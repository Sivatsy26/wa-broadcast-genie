
import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PlatformConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platformType: 'whatsapp' | 'facebook' | 'instagram' | 'telegram' | 'website';
  accountIndex: number;
  onSuccess: () => void;
}

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
  const { toast } = useToast();

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

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      
      // Validation for required fields
      if (platformType === 'whatsapp' && !phoneNumber) {
        toast({
          title: "Missing information",
          description: "Please enter the WhatsApp phone number",
          variant: "destructive",
        });
        return;
      }

      if ((platformType === 'whatsapp' || platformType === 'facebook' || platformType === 'instagram') && !apiKey) {
        toast({
          title: "Missing information",
          description: `Please enter the ${getPlatformTitle()} API key`,
          variant: "destructive",
        });
        return;
      }

      if ((platformType === 'facebook' || platformType === 'instagram') && !businessAccountId) {
        toast({
          title: "Missing information",
          description: `Please enter the Business Account ID`,
          variant: "destructive",
        });
        return;
      }

      // For website widget we just need a name
      if (platformType === 'website' && !displayName) {
        toast({
          title: "Missing information",
          description: "Please enter a name for your website widget",
          variant: "destructive",
        });
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

  // Render different form fields based on platform type
  const renderPlatformSpecificFields = () => {
    switch (platformType) {
      case 'whatsapp':
        return (
          <>
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
          </>
        );
        
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
            Add the required information to connect your {getPlatformTitle()} account
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformConnectDialog;
