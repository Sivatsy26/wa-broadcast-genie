
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

export const AppearanceSettings = () => {
  const [wallpaper, setWallpaper] = useState<string>('default');
  const [theme, setTheme] = useState<string>('light');

  const handleWallpaperChange = (value: string) => {
    setWallpaper(value);
    toast({
      title: 'Wallpaper changed',
      description: 'Your conversation wallpaper has been updated.',
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    toast({
      title: 'Theme changed',
      description: `Theme set to ${value} mode.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Appearance Settings</h2>
      <p className="text-muted-foreground">Customize how your conversations look</p>

      <Card>
        <CardHeader>
          <CardTitle>Chat Wallpaper</CardTitle>
          <CardDescription>Change the background of your conversation</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={wallpaper} onValueChange={handleWallpaperChange}>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="wallpaper-default" />
                <Label htmlFor="wallpaper-default" className="cursor-pointer">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solid" id="wallpaper-solid" />
                <Label htmlFor="wallpaper-solid" className="cursor-pointer">Solid Color</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gradient" id="wallpaper-gradient" />
                <Label htmlFor="wallpaper-gradient" className="cursor-pointer">Gradient</Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose between light and dark mode</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={theme} onValueChange={handleThemeChange}>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light" className="cursor-pointer">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark" className="cursor-pointer">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="theme-system" />
                <Label htmlFor="theme-system" className="cursor-pointer">System</Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};
