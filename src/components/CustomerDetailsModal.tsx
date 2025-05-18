
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MapPin, Mail, Phone, Building, Calendar } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";

interface CustomerDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  customerType: 'lead' | 'client';
  customerData: any;
  onEdit: () => void;
  onDelete: () => void;
  onConvertToClient?: (leadData: any, clientData: any) => void;
}

interface ConvertToClientFormData {
  customerId: string;
  plan: 'starter' | 'professional' | 'enterprise';
  referredBy: string;
  joinDate: string;
  renewalDate: string;
}

const CustomerDetailsModal: React.FC<CustomerDetailsProps> = ({
  isOpen,
  onClose,
  customerType,
  customerData,
  onEdit,
  onDelete,
  onConvertToClient
}) => {
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const form = useForm<ConvertToClientFormData>({
    defaultValues: {
      customerId: `CLIENT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      plan: 'starter',
      referredBy: '',
      joinDate: new Date().toISOString().split('T')[0],
      renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }
  });

  if (!customerData) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="secondary">New</Badge>;
      case 'contacted':
        return <Badge variant="outline">Contacted</Badge>;
      case 'qualified':
        return <Badge>Qualified</Badge>;
      case 'proposal':
        return <Badge variant="secondary">Proposal</Badge>;
      case 'converted':
        return <Badge variant="outline">Converted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'starter':
        return <Badge variant="secondary">Starter</Badge>;
      case 'professional':
        return <Badge>Professional</Badge>;
      case 'enterprise':
        return <Badge variant="outline">Enterprise</Badge>;
      default:
        return <Badge>{plan}</Badge>;
    }
  };

  const handleConvert = (data: ConvertToClientFormData) => {
    if (onConvertToClient) {
      onConvertToClient(customerData, data);
      setConvertDialogOpen(false);
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {customerType === 'lead' ? 'Lead Details' : 'Client Details'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            {/* Header with avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={customerData.avatar || ""} alt={customerData.name} />
                <AvatarFallback>
                  <Users className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{customerData.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center">
                  <Building className="h-4 w-4 mr-1" /> {customerData.company}
                </p>
              </div>
              {customerType === 'lead' && (
                <div className="ml-auto">
                  {getStatusBadge(customerData.status)}
                </div>
              )}
              {customerType === 'client' && (
                <div className="ml-auto">
                  {getPlanBadge(customerData.plan)}
                </div>
              )}
            </div>

            {/* Customer ID - only for clients */}
            <div className="grid grid-cols-2 gap-3">
              {customerType === 'client' && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Customer ID</p>
                  <p className="font-medium">{customerData.customerId}</p>
                </div>
              )}
              
              {customerType === 'lead' && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-medium">{customerData.source}</p>
                </div>
              )}
              
              {customerType === 'client' && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Referred By</p>
                  <p className="font-medium">{customerData.referredBy}</p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-sm font-medium mb-2">Contact Information</h4>
              <div className="space-y-2">
                <p className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href={`mailto:${customerData.email}`} className="text-blue-500 hover:underline">
                    {customerData.email}
                  </a>
                </p>
                <p className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {customerData.phoneCountry && `+${customerData.phoneCountry}`} {customerData.phone}
                </p>
              </div>
            </div>

            {/* Address */}
            <div>
              <h4 className="text-sm font-medium mb-2">Address</h4>
              <div className="space-y-1">
                <p className="text-sm flex items-start">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground shrink-0 mt-0.5" />
                  <span>
                    {customerData.street && <span>{customerData.street}, </span>}
                    {customerData.address && <span>{customerData.address}, </span>}
                    {customerData.city && <span>{customerData.city}, </span>}
                    {customerData.district && <span>{customerData.district}, </span>}
                    {customerData.state && <span>{customerData.state}, </span>}
                    {customerData.country && <span>{customerData.country} </span>}
                    {customerData.postalCode && <span>{customerData.postalCode}</span>}
                  </span>
                </p>
              </div>
            </div>

            {/* Lead-specific fields */}
            {customerType === 'lead' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{customerData.assignedTo}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md">
                    <p className="text-xs text-muted-foreground">Next Follow-up</p>
                    <p className="font-medium">
                      {customerData.nextFollowUp ? new Date(customerData.nextFollowUp).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span>{new Date(customerData.created).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Contact</span>
                      <span>{customerData.lastContact ? new Date(customerData.lastContact).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Client-specific fields */}
            {customerType === 'client' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Join Date</p>
                  <p className="font-medium">
                    {customerData.joinDate ? new Date(customerData.joinDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-xs text-muted-foreground">Renewal Date</p>
                  <p className="font-medium">
                    {customerData.renewalDate ? new Date(customerData.renewalDate).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            {customerData.notes && (
              <div>
                <h4 className="text-sm font-medium mb-2">Notes</h4>
                <p className="text-sm bg-muted/30 p-3 rounded-md">{customerData.notes}</p>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <div>
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
              {customerType === 'lead' && onConvertToClient && (
                <Button variant="outline" className="ml-2" onClick={() => setConvertDialogOpen(true)}>
                  Convert to Client
                </Button>
              )}
            </div>
            <div>
              <Button variant="outline" className="mr-2" onClick={onClose}>
                Close
              </Button>
              <Button onClick={onEdit}>
                Edit
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert to Client Dialog */}
      <AlertDialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Convert Lead to Client</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide the client details to complete the conversion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleConvert)} className="space-y-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="CLIENT001" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription Plan</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="referredBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referred By</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Referral source" />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="joinDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Join Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="renewalDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Renewal Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction type="submit">Convert</AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CustomerDetailsModal;
