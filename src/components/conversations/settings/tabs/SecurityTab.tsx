
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

interface SecurityTabProps {
  userRole: string;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ userRole }) => {
  const [passwordPolicy, setPasswordPolicy] = useState("medium");
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [failedLoginAttempts, setFailedLoginAttempts] = useState("5");
  const [ipRestrictions, setIpRestrictions] = useState("");
  const [enforceSSL, setEnforceSSL] = useState(true);
  const [allowedLoginIPs, setAllowedLoginIPs] = useState("");
  const [captchaOnLogin, setCaptchaOnLogin] = useState(false);
  const [deviceHistory, setDeviceHistory] = useState([
    { device: "MacBook Pro", browser: "Chrome", location: "New York, USA", lastAccess: "2023-05-01 10:30 AM" },
    { device: "iPhone 13", browser: "Safari Mobile", location: "Boston, USA", lastAccess: "2023-05-02 03:15 PM" },
    { device: "Windows PC", browser: "Firefox", location: "Chicago, USA", lastAccess: "2023-04-28 09:45 AM" },
  ]);
  
  const handleSaveSettings = () => {
    toast({
      title: "Security settings saved",
      description: "Your security preferences have been updated."
    });
  };
  
  const handleLogoutAllDevices = () => {
    toast({
      title: "All devices logged out",
      description: "All other devices have been logged out."
    });
  };
  
  const handleEnableLogging = () => {
    toast({
      title: "Security logging enabled",
      description: "Advanced security logging has been enabled."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Security Settings</h2>
        <p className="text-muted-foreground">Configure security options for your account and users</p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Password Settings</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="font-medium mb-2 block">Password Complexity</Label>
              <RadioGroup 
                value={passwordPolicy} 
                onValueChange={setPasswordPolicy}
                className="space-y-2"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="low" id="low-security" />
                  <div>
                    <Label htmlFor="low-security">Low</Label>
                    <p className="text-sm text-muted-foreground">Minimum 6 characters</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="medium" id="medium-security" />
                  <div>
                    <Label htmlFor="medium-security">Medium</Label>
                    <p className="text-sm text-muted-foreground">Minimum 8 characters, at least one number</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="high" id="high-security" />
                  <div>
                    <Label htmlFor="high-security">High</Label>
                    <p className="text-sm text-muted-foreground">Minimum 12 characters, uppercase, lowercase, number, and special character</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {(userRole === 'super-admin' || userRole === 'white-label') && (
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="password-expiry" className="font-medium">Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">Force password reset after this many days</p>
                </div>
                <Input 
                  id="password-expiry" 
                  type="number" 
                  className="w-20 text-center" 
                  min="0" 
                  max="365" 
                  defaultValue="90" 
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Authentication</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor" className="font-medium">Require Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">All users must set up 2FA for their accounts</p>
              </div>
              <Switch 
                id="two-factor" 
                checked={twoFactorRequired} 
                onCheckedChange={setTwoFactorRequired}
                disabled={userRole !== 'super-admin'} 
              />
            </div>
            
            <div>
              <Label htmlFor="session-timeout" className="font-medium">Session Timeout (minutes)</Label>
              <p className="text-sm text-muted-foreground mb-2">Automatically log users out after inactivity</p>
              <Input 
                id="session-timeout" 
                value={sessionTimeout} 
                onChange={(e) => setSessionTimeout(e.target.value)} 
                type="number"
                min="5"
                max="1440"
              />
            </div>
            
            <div>
              <Label htmlFor="failed-attempts" className="font-medium">Failed Login Attempts</Label>
              <p className="text-sm text-muted-foreground mb-2">Lock account after this many failed attempts</p>
              <Input 
                id="failed-attempts" 
                value={failedLoginAttempts} 
                onChange={(e) => setFailedLoginAttempts(e.target.value)} 
                type="number"
                min="3"
                max="10"
                disabled={userRole !== 'super-admin' && userRole !== 'white-label'}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="captcha" className="font-medium">CAPTCHA on Login</Label>
                <p className="text-sm text-muted-foreground">Show CAPTCHA challenge on login screen</p>
              </div>
              <Switch 
                id="captcha" 
                checked={captchaOnLogin} 
                onCheckedChange={setCaptchaOnLogin}
                disabled={userRole !== 'super-admin' && userRole !== 'white-label'} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {(userRole === 'super-admin' || userRole === 'white-label' || userRole === 'admin') && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Advanced Security</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enforce-ssl" className="font-medium">Enforce SSL</Label>
                  <p className="text-sm text-muted-foreground">Require secure HTTPS connections</p>
                </div>
                <Switch 
                  id="enforce-ssl" 
                  checked={enforceSSL} 
                  onCheckedChange={setEnforceSSL} 
                  disabled={userRole !== 'super-admin'}
                />
              </div>
              
              <div>
                <Label htmlFor="ip-restrictions" className="font-medium">IP Restrictions</Label>
                <p className="text-sm text-muted-foreground mb-2">Restrict access to specific IP addresses (comma separated)</p>
                <Input 
                  id="ip-restrictions" 
                  value={ipRestrictions} 
                  onChange={(e) => setIpRestrictions(e.target.value)} 
                  placeholder="e.g., 192.168.1.1, 10.0.0.1"
                  disabled={userRole !== 'super-admin'}
                />
              </div>
              
              <div>
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={handleEnableLogging}
                  disabled={userRole !== 'super-admin'}
                >
                  Enable Advanced Security Logging
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => toast({title: "Security report downloaded"})}
                >
                  Download Security Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Login Devices</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Device</th>
                  <th className="text-left py-3 px-4">Browser</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Last Access</th>
                  <th className="text-right py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {deviceHistory.map((device, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">{device.device}</td>
                    <td className="py-3 px-4">{device.browser}</td>
                    <td className="py-3 px-4">{device.location}</td>
                    <td className="py-3 px-4">{device.lastAccess}</td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm" className="text-red-500">
                        Logout
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4">
            <Button variant="outline" onClick={handleLogoutAllDevices}>
              Logout All Other Devices
            </Button>
          </div>
          
          <div className="mt-6">
            <Button onClick={handleSaveSettings}>Save Security Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityTab;
