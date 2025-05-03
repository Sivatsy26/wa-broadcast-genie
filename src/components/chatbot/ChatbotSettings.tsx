
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Chatbot } from '@/services/chatbotService';
import { useChatbots } from '@/hooks/use-chatbots';
import { Plus, MessageSquare, Copy, Settings, Trash2, Bot, Smartphone, Facebook, Globe } from 'lucide-react';

interface ChatbotSettingsProps {
  chatbot: Chatbot;
  open: boolean;
  onClose: () => void;
}

const ChatbotSettings: React.FC<ChatbotSettingsProps> = ({ chatbot, open, onClose }) => {
  const [tab, setTab] = useState("general");
  const { updateChatbot, isUpdating } = useChatbots();
  
  const form = useForm({
    defaultValues: {
      name: chatbot.name,
      welcome_message: chatbot.welcome_message,
      primary_color: chatbot.primary_color,
      show_avatar: chatbot.show_avatar,
      channels: chatbot.channels,
      system_prompt: chatbot.system_prompt || 'You are a helpful customer support assistant. Be polite, concise, and helpful. If you don\'t know the answer to something, suggest the user contact our support team.',
      ai_model: chatbot.ai_model || 'gpt-4',
      temperature: chatbot.temperature || 0.7,
      max_tokens: chatbot.max_tokens || 1024,
      business_hours: chatbot.business_hours || false,
      business_hours_start: chatbot.business_hours_start || '09:00',
      business_hours_end: chatbot.business_hours_end || '17:00',
      business_days: chatbot.business_days || ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    updateChatbot({
      id: chatbot.id,
      data: {
        ...data,
        updated_at: new Date().toISOString()
      }
    });
    onClose();
  });

  const toggleChannel = (channel: string) => {
    const currentChannels = form.getValues('channels') || [];
    if (currentChannels.includes(channel)) {
      form.setValue('channels', currentChannels.filter(c => c !== channel));
    } else {
      form.setValue('channels', [...currentChannels, channel]);
    }
  };

  const toggleBusinessDay = (day: string) => {
    const currentDays = form.getValues('business_days') || [];
    if (currentDays.includes(day)) {
      form.setValue('business_days', currentDays.filter(d => d !== day));
    } else {
      form.setValue('business_days', [...currentDays, day]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Chatbot Settings</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chatbot Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your chatbot that will be shown to users
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="welcome_message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} />
                      </FormControl>
                      <FormDescription>
                        The first message your chatbot will send to users
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="primary_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="color" 
                          value={field.value} 
                          onChange={field.onChange} 
                          className="w-10 h-10 p-1 border rounded"
                        />
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormDescription>
                        The main color used for your chatbot interface
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="show_avatar"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Show Bot Avatar</FormLabel>
                        <FormDescription>
                          Display a bot icon next to chatbot messages
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel>Channels</FormLabel>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Button
                      type="button"
                      variant={form.getValues('channels').includes('whatsapp') ? 'default' : 'outline'}
                      onClick={() => toggleChannel('whatsapp')}
                      className="flex items-center gap-2"
                    >
                      <Smartphone className="h-4 w-4" />
                      WhatsApp
                    </Button>
                    <Button
                      type="button"
                      variant={form.getValues('channels').includes('facebook') ? 'default' : 'outline'}
                      onClick={() => toggleChannel('facebook')}
                      className="flex items-center gap-2"
                    >
                      <Facebook className="h-4 w-4" />
                      Facebook Messenger
                    </Button>
                    <Button
                      type="button"
                      variant={form.getValues('channels').includes('website') ? 'default' : 'outline'}
                      onClick={() => toggleChannel('website')}
                      className="flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Website Widget
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Select where your chatbot will be available
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="responses" className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Responses Management</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    The responses tab provides a dedicated screen for adding and managing your chatbot's responses.
                  </p>
                  <Button onClick={onClose}>
                    Go to Responses Manager
                  </Button>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-base font-medium mb-2">Quick Response Creation</h3>
                  <div className="space-y-4">
                    <div>
                      <FormLabel htmlFor="trigger">Trigger Word/Phrase</FormLabel>
                      <Input id="trigger" placeholder="e.g., pricing, hours, refund" />
                    </div>
                    
                    <div>
                      <FormLabel htmlFor="response">Response</FormLabel>
                      <Textarea 
                        id="response" 
                        placeholder="Enter the response the chatbot should give"
                        rows={3}
                      />
                    </div>
                    
                    <Button type="button">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Response
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <FormField
                  control={form.control}
                  name="system_prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>System Prompt</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} />
                      </FormControl>
                      <FormDescription>
                        Instructions that define how the AI chatbot should behave
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ai_model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AI Model</FormLabel>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                      >
                        <option value="gpt-4">GPT-4 (Recommended)</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="claude-3">Claude 3</option>
                      </select>
                      <FormDescription>
                        More advanced models provide better responses but may cost more
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature: {field.value}</FormLabel>
                      <FormControl>
                        <Input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          {...field}
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>More Focused (0)</span>
                        <span>More Creative (1)</span>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="max_tokens"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Response Length</FormLabel>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value="256">Short (256 tokens)</option>
                        <option value="512">Medium (512 tokens)</option>
                        <option value="1024">Standard (1024 tokens)</option>
                        <option value="2048">Long (2048 tokens)</option>
                      </select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="business_hours"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Business Hours Only</FormLabel>
                        <FormDescription>
                          Chatbot will only be active during specified hours
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {form.watch('business_hours') && (
                  <div className="space-y-4 pl-6">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="business_hours_start"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="business_hours_end"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <FormLabel>Active Days</FormLabel>
                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                          <Button
                            key={day}
                            type="button"
                            variant={form.getValues('business_days').includes(day) ? 'default' : 'outline'}
                            size="sm"
                            className="w-full capitalize"
                            onClick={() => toggleBusinessDay(day)}
                          >
                            {day.charAt(0)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-between mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotSettings;
