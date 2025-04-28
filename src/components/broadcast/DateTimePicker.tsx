import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker({ date, setDate, disabled = false }: DateTimePickerProps) {
  const [selectedHour, setSelectedHour] = React.useState<string>(
    date ? format(date, "HH") : "12"
  );
  const [selectedMinute, setSelectedMinute] = React.useState<string>(
    date ? format(date, "mm") : "00"
  );
  const [selectedMeridiem, setSelectedMeridiem] = React.useState<string>(
    date ? (parseInt(format(date, "H")) >= 12 ? "PM" : "AM") : "AM"
  );

  // Update time when any time component changes
  React.useEffect(() => {
    if (date) {
      const newDate = new Date(date);
      let hours = parseInt(selectedHour);
      
      // Convert hours based on meridiem
      if (selectedMeridiem === "PM" && hours < 12) {
        hours += 12;
      } else if (selectedMeridiem === "AM" && hours === 12) {
        hours = 0;
      }
      
      newDate.setHours(hours);
      newDate.setMinutes(parseInt(selectedMinute));
      setDate(newDate);
    }
  }, [selectedHour, selectedMinute, selectedMeridiem]);

  // Generate hours for 12-hour format
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return { value: hour.toString().padStart(2, "0"), label: hour.toString() };
  });

  // Generate minutes
  const minutes = Array.from({ length: 60 }, (_, i) => {
    return { value: i.toString().padStart(2, "0"), label: i.toString().padStart(2, "0") };
  });

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Keep the current time when selecting a new date
      const hours = date ? date.getHours() : new Date().getHours();
      const minutes = date ? date.getMinutes() : new Date().getMinutes();
      selectedDate.setHours(hours);
      selectedDate.setMinutes(minutes);
      setDate(selectedDate);
    } else {
      setDate(undefined);
    }
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="flex gap-1 items-center">
        <Clock className="h-4 w-4 text-muted-foreground mr-1" />
        
        <Select
          value={selectedHour}
          onValueChange={setSelectedHour}
          disabled={disabled || !date}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour.value} value={hour.value}>
                {hour.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <span className="text-muted-foreground">:</span>
        
        <Select
          value={selectedMinute}
          onValueChange={setSelectedMinute}
          disabled={disabled || !date}
        >
          <SelectTrigger className="w-16">
            <SelectValue placeholder="Min" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute.value} value={minute.value}>
                {minute.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select
          value={selectedMeridiem}
          onValueChange={setSelectedMeridiem}
          disabled={disabled || !date}
        >
          <SelectTrigger className="w-16">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
