
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const AppearanceTab: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
  const [wallpaperUrl, setWallpaperUrl] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("medium");

  const handleSaveAppearance = () => {
    // Here you would save the settings to your storage/database
    toast({
      title: "Appearance settings saved",
      description: "Your appearance preferences have been updated."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <Label>Theme</Label>
              <RadioGroup 
                value={theme} 
                onValueChange={setTheme}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Dark</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">System Default</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="wallpaper">Chat Wallpaper URL</Label>
              <Input 
                id="wallpaper" 
                placeholder="Enter URL for custom wallpaper image" 
                value={wallpaperUrl}
                onChange={(e) => setWallpaperUrl(e.target.value)}
                className="mt-1"
              />
              {wallpaperUrl && (
                <div className="mt-2">
                  <p className="text-sm font-medium mb-1">Preview:</p>
                  <div className="h-24 w-full rounded-md bg-cover bg-center" style={{ backgroundImage: `url(${wallpaperUrl})` }} />
                </div>
              )}
            </div>

            <div>
              <Label>Font Size</Label>
              <RadioGroup 
                value={fontSize} 
                onValueChange={setFontSize}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="small" />
                  <Label htmlFor="small">Small</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="large" />
                  <Label htmlFor="large">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveAppearance}>Save Appearance Settings</Button>
      </div>
    </div>
  );
};

export default AppearanceTab;
