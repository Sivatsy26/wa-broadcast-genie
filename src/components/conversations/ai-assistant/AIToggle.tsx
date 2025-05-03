
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface AIToggleProps {
  aiEnabled: boolean;
  onAIEnabledChange: (enabled: boolean) => void;
}

const AIToggle: React.FC<AIToggleProps> = ({ aiEnabled, onAIEnabledChange }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enable-ai" className="text-base font-medium">Enable AI Assistant</Label>
              <p className="text-sm text-muted-foreground mt-1">
                Use AI to automatically respond to customer inquiries
              </p>
            </div>
            <Switch 
              id="enable-ai" 
              checked={aiEnabled} 
              onCheckedChange={onAIEnabledChange} 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIToggle;
