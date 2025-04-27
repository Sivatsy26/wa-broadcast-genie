
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DisappearingMessagesTab: React.FC = () => {
  const [enableDisappearing, setEnableDisappearing] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("12:00");

  const handleSaveSettings = () => {
    let message = 'Messages will not disappear';
    if (enableDisappearing && date) {
      const dateTime = new Date(date);
      const [hours, minutes] = time.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      message = `Messages will disappear on ${format(dateTime, 'PPPp')}`;
    }
    
    toast({
      title: "Disappearing message settings saved",
      description: message
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-disappearing" className="text-base font-medium">Enable Disappearing Messages</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  When enabled, messages will disappear at the specified date and time
                </p>
              </div>
              <Switch 
                id="enable-disappearing" 
                checked={enableDisappearing} 
                onCheckedChange={setEnableDisappearing} 
              />
            </div>
            
            {enableDisappearing && (
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Select Time</Label>
                  <div className="flex gap-2 items-center">
                    <Clock className="h-4 w-4" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Once messages disappear, they cannot be recovered.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Disappearing Message Settings</Button>
      </div>
    </div>
  );
};

export default DisappearingMessagesTab;
