
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  avatar?: string;
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'converted' | 'lost';
  assignedTo?: string;
  notes?: string;
  created: string;
  lastContact?: string;
  nextFollowUp?: string;
}

export interface Client {
  id: string;
  customerId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneCountry?: string;
  avatar?: string;
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  source?: string;
  status?: string;
  plan: 'starter' | 'professional' | 'enterprise';
  referredBy?: string;
  notes?: string;
  joinDate: string;
  renewalDate?: string;
  created: string;
  lastContact?: string;
}
