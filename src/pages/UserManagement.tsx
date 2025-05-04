import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  MoreHorizontal, 
  User, 
  UserPlus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Shield,
  KeyRound,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  position?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  role: 'super-admin' | 'white-label' | 'admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  addedBy?: string;
}

type UserStatus = 'active' | 'inactive' | 'pending';

const UserManagement = () => {
  const { toast } = useToast();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false);
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [isDeactivateUserDialogOpen, setIsDeactivateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>('super-admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [userAvatar, setUserAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  
  // Mock data for users
  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: '1',
      name: 'Maria Lopez',
      email: 'maria.lopez@example.com',
      company: 'TechCorp',
      position: 'CEO',
      phone: '+1 555-123-4567',
      address1: '123 Main St',
      address2: 'Suite 500',
      state: 'California',
      country: 'USA',
      postalCode: '90001',
      role: 'super-admin',
      status: 'active',
      createdAt: '2023-01-15T10:30:00Z',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'Robert Chen',
      email: 'robert.chen@example.com',
      company: 'Marketing Pro',
      position: 'Director',
      phone: '+1 555-987-6543',
      address1: '456 Elm St',
      address2: '',
      state: 'New York',
      country: 'USA',
      postalCode: '10001',
      role: 'white-label',
      status: 'active',
      createdAt: '2023-02-20T14:15:00Z',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: '3',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      company: 'TechCorp',
      position: 'Marketing Manager',
      phone: '+1 555-456-7890',
      address1: '789 Oak St',
      address2: 'Floor 3',
      state: 'Texas',
      country: 'USA',
      postalCode: '75001',
      role: 'admin',
      status: 'active',
      createdAt: '2023-03-10T09:45:00Z',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      id: '4',
      name: 'James Taylor',
      email: 'james.taylor@example.com',
      company: 'Sales Inc',
      position: 'Sales Associate',
      phone: '+1 555-234-5678',
      role: 'user',
      status: 'inactive',
      createdAt: '2023-04-05T16:20:00Z',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    {
      id: '5',
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      company: 'TechCorp',
      position: 'Customer Support',
      role: 'user',
      status: 'pending',
      createdAt: '2023-05-12T11:10:00Z',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
  ]);

  // User form schema
  const userFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    company: z.string().optional(),
    position: z.string().optional(),
    phone: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
    role: z.enum(['super-admin', 'white-label', 'admin', 'user']),
    status: z.enum(['active', 'inactive', 'pending']).default('active'),
  });

  // Role change form schema
  const roleChangeSchema = z.object({
    role: z.enum(['super-admin', 'white-label', 'admin', 'user']),
  });

  // Password reset form schema
  const passwordResetSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  // User form
  const addUserForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      phone: "",
      address1: "",
      address2: "",
      state: "",
      country: "",
      postalCode: "",
      role: "user",
      status: "active",
    },
  });

  // Edit user form
  const editUserForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      phone: "",
      address1: "",
      address2: "",
      state: "",
      country: "",
      postalCode: "",
      role: "user",
      status: "active",
    },
  });

  // Role change form
  const changeRoleForm = useForm<z.infer<typeof roleChangeSchema>>({
    resolver: zodResolver(roleChangeSchema),
    defaultValues: {
      role: "user",
    },
  });

  // Password reset form
  const passwordResetForm = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Filter users based on search query and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.company && user.company.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all-status' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get available roles based on current user role
  const getAvailableRoles = () => {
    switch (currentUserRole) {
      case 'super-admin':
        return ['super-admin', 'white-label', 'admin', 'user'];
      case 'white-label':
        return ['admin', 'user'];
      case 'admin':
        return ['user'];
      default:
        return ['user'];
    }
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        toast({
          title: "File too large",
          description: "Avatar image must be less than 1MB",
          variant: "destructive"
        });
        return;
      }
      
      setUserAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAddUser = (data: z.infer<typeof userFormSchema>) => {
    // Check if user can add the selected role
    const availableRoles = getAvailableRoles();
    if (!availableRoles.includes(data.role)) {
      toast({
        title: "Permission denied",
        description: `You don't have permission to add a ${data.role}`,
        variant: "destructive"
      });
      return;
    }
    
    // Create new user with required properties
    const newUser: UserProfile = {
      id: Math.random().toString(36).substring(2, 9),
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: new Date().toISOString(),
      addedBy: "Current User", // In a real app, this would be the current user's name
      company: data.company || undefined,
      position: data.position || undefined,
      phone: data.phone || undefined,
      address1: data.address1 || undefined,
      address2: data.address2 || undefined,
      state: data.state || undefined,
      country: data.country || undefined,
      postalCode: data.postalCode || undefined
    };
    
    // Add avatar if uploaded
    if (avatarPreview) {
      newUser.avatar = avatarPreview;
    }
    
    setUsers([...users, newUser]);
    setIsAddUserDialogOpen(false);
    setUserAvatar(null);
    setAvatarPreview(null);
    addUserForm.reset();
    
    toast({
      title: "User added",
      description: `${newUser.name} has been added successfully`
    });
  };

  const handleViewUser = (user: UserProfile) => {
    setSelectedUser(user);
    setIsViewUserDialogOpen(true);
  };

  const handleEditUser = (user: UserProfile) => {
    setSelectedUser(user);
    
    // Set form values
    editUserForm.setValue("name", user.name);
    editUserForm.setValue("email", user.email);
    editUserForm.setValue("company", user.company || "");
    editUserForm.setValue("position", user.position || "");
    editUserForm.setValue("phone", user.phone || "");
    editUserForm.setValue("address1", user.address1 || "");
    editUserForm.setValue("address2", user.address2 || "");
    editUserForm.setValue("state", user.state || "");
    editUserForm.setValue("country", user.country || "");
    editUserForm.setValue("postalCode", user.postalCode || "");
    editUserForm.setValue("role", user.role);
    editUserForm.setValue("status", user.status);
    
    if (user.avatar) {
      setAvatarPreview(user.avatar);
    }
    
    setIsEditUserDialogOpen(true);
  };

  const handleUpdateUser = (data: z.infer<typeof userFormSchema>) => {
    if (!selectedUser) return;
    
    // Check if user can edit to the selected role
    const availableRoles = getAvailableRoles();
    if (!availableRoles.includes(data.role) && data.role !== selectedUser.role) {
      toast({
        title: "Permission denied",
        description: `You don't have permission to change role to ${data.role}`,
        variant: "destructive"
      });
      return;
    }
    
    // Update user
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          name: data.name,
          email: data.email,
          company: data.company || undefined,
          position: data.position || undefined,
          phone: data.phone || undefined,
          address1: data.address1 || undefined,
          address2: data.address2 || undefined,
          state: data.state || undefined,
          country: data.country || undefined,
          postalCode: data.postalCode || undefined,
          role: data.role,
          status: data.status,
          avatar: avatarPreview || user.avatar
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
    setUserAvatar(null);
    setAvatarPreview(null);
    
    toast({
      title: "User updated",
      description: `${data.name} has been updated successfully`
    });
  };

  const handleChangeRole = (user: UserProfile) => {
    setSelectedUser(user);
    changeRoleForm.setValue("role", user.role);
    setIsChangeRoleDialogOpen(true);
  };

  const handleUpdateRole = (data: z.infer<typeof roleChangeSchema>) => {
    if (!selectedUser) return;

    // Check if user can change to the selected role
    const availableRoles = getAvailableRoles();
    if (!availableRoles.includes(data.role) && data.role !== selectedUser.role) {
      toast({
        title: "Permission denied",
        description: `You don't have permission to change role to ${data.role}`,
        variant: "destructive"
      });
      return;
    }

    // Update user role
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          role: data.role
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setIsChangeRoleDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "Role updated",
      description: `${selectedUser.name}'s role has been updated to ${data.role}`
    });
  };

  const handleResetPassword = (user: UserProfile) => {
    setSelectedUser(user);
    passwordResetForm.reset();
    setIsResetPasswordDialogOpen(true);
  };

  const handleUpdatePassword = (data: z.infer<typeof passwordResetSchema>) => {
    if (!selectedUser) return;
    
    // In a real app, you'd call an API to update the user's password
    // Here we'll just show a toast message
    setIsResetPasswordDialogOpen(false);
    setSelectedUser(null);
    passwordResetForm.reset();
    
    toast({
      title: "Password reset",
      description: `Password for ${selectedUser.name} has been reset successfully`
    });
  };

  const handleToggleUserStatus = (user: UserProfile) => {
    setSelectedUser(user);
    
    // If active, show deactivation dialog, otherwise activate immediately
    if (user.status === 'active') {
      setIsDeactivateUserDialogOpen(true);
    } else {
      // Activate user directly
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            status: 'active' as UserStatus
          };
        }
        return u;
      });
      
      setUsers(updatedUsers);
      
      toast({
        title: "User activated",
        description: `${user.name} has been activated successfully`
      });
    }
  };

  const handleDeactivateUser = () => {
    if (!selectedUser) return;
    
    // Update user status
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          status: 'inactive' as UserStatus
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setIsDeactivateUserDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "User deactivated",
      description: `${selectedUser.name} has been deactivated successfully`
    });
  };

  const handleConfirmDeleteUser = () => {
    if (!selectedUser) return;
    
    // Delete user
    const updatedUsers = users.filter(user => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteUserDialogOpen(false);
    setSelectedUser(null);
    
    toast({
      title: "User deleted",
      description: `${selectedUser.name} has been deleted successfully`
    });
  };

  const handleInitiateDeleteUser = (user: UserProfile) => {
    setSelectedUser(user);
    setIsDeleteUserDialogOpen(true);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'super-admin':
        return (
          <Badge variant="default" className="bg-purple-500">
            Super Admin
          </Badge>
        );
      case 'white-label':
        return (
          <Badge variant="default" className="bg-indigo-500">
            White Label
          </Badge>
        );
      case 'admin':
        return (
          <Badge variant="default" className="bg-blue-500">
            Admin
          </Badge>
        );
      case 'user':
        return (
          <Badge variant="outline">
            User
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
            <span className="text-sm text-green-600">Active</span>
          </div>
        );
      case 'inactive':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-gray-400 mr-1.5"></div>
            <span className="text-sm text-gray-600">Inactive</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-amber-500 mr-1.5"></div>
            <span className="text-sm text-amber-600">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Role permission simulation
  const canAddRole = (role: string) => {
    switch (currentUserRole) {
      case 'super-admin':
        return true;
      case 'white-label':
        return role === 'admin' || role === 'user';
      case 'admin':
        return role === 'user';
      default:
        return false;
    }
  };

  const canEditUser = (user: UserProfile) => {
    if (currentUserRole === 'super-admin') return true;
    if (currentUserRole === 'white-label' && (user.role === 'admin' || user.role === 'user')) return true;
    if (currentUserRole === 'admin' && user.role === 'user') return true;
    return false;
  };

  const canDeleteUser = (user: UserProfile) => {
    return canEditUser(user);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account with detailed information
              </DialogDescription>
            </DialogHeader>
            
            <Form {...addUserForm}>
              <form onSubmit={addUserForm.handleSubmit(handleAddUser)} className="space-y-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarPreview || ""} />
                      <AvatarFallback className="bg-primary/10">
                        <User className="h-12 w-12 text-primary/80" />
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      className="absolute bottom-0 right-0"
                      onClick={() => document.getElementById('avatar-upload')?.click()}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a profile picture (Max 1MB)
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={addUserForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Marketing Manager" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 555-123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={addUserForm.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Role *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {getAvailableRoles().map((role) => (
                              <SelectItem key={role} value={role}>
                                {role === 'super-admin' ? 'Super Admin' :
                                 role === 'white-label' ? 'White Label' :
                                 role === 'admin' ? 'Admin' : 'User'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Address Information (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={addUserForm.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addUserForm.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2</FormLabel>
                          <FormControl>
                            <Input placeholder="Suite 500" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addUserForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="California" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addUserForm.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={addUserForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="90001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => {
                    setIsAddUserDialogOpen(false);
                    setAvatarPreview(null);
                    addUserForm.reset();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="super-admin">Super Admins</SelectItem>
              <SelectItem value="white-label">White Labels</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="user">Users</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="py-4">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            View and manage your users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    <div>
