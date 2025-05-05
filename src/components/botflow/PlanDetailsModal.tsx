
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
}

export const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
}) => {
  const plans = [
    {
      name: "Free",
      price: "$0/month",
      accountLimits: {
        whatsapp: 1,
        facebook: 1,
        instagram: 1
      },
      features: [
        "1 account per platform",
        "Basic flow templates",
        "100 messages/day",
        "Community support"
      ]
    },
    {
      name: "Pro",
      price: "$49/month",
      accountLimits: {
        whatsapp: 5,
        facebook: 5,
        instagram: 5
      },
      features: [
        "5 accounts per platform",
        "All flow templates",
        "5,000 messages/day",
        "Priority support",
        "Advanced analytics"
      ]
    },
    {
      name: "Business",
      price: "$149/month",
      accountLimits: {
        whatsapp: 20,
        facebook: 20,
        instagram: 20
      },
      features: [
        "20 accounts per platform",
        "All flow templates",
        "50,000 messages/day",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager"
      ]
    },
    {
      name: "Enterprise",
      price: "Contact us",
      accountLimits: {
        whatsapp: "Unlimited",
        facebook: "Unlimited",
        instagram: "Unlimited"
      },
      features: [
        "Unlimited accounts",
        "All features",
        "Unlimited messages",
        "24/7 support",
        "Custom development",
        "SLA guarantees",
        "Dedicated success team"
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Account Connection Limits</DialogTitle>
          <DialogDescription>
            Your current plan: <span className="font-bold">{currentPlan}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`border rounded-lg p-4 ${currentPlan === plan.name ? 'border-primary bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <span className="text-sm font-medium">{plan.price}</span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Account Limits:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="w-20">WhatsApp:</span> 
                    <span className="font-medium">{plan.accountLimits.whatsapp}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-20">Facebook:</span> 
                    <span className="font-medium">{plan.accountLimits.facebook}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-20">Instagram:</span> 
                    <span className="font-medium">{plan.accountLimits.instagram}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Features:</p>
                <ul className="text-xs space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <Check className="h-3 w-3 mt-0.5 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {currentPlan === plan.name && (
                <div className="mt-2 text-xs text-primary font-medium">Current plan</div>
              )}
            </div>
          ))}
        </div>
        
        {currentPlan !== "Enterprise" && (
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="text-amber-500 h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Need more accounts?</p>
                <p className="text-xs text-amber-700">
                  Upgrade your plan to connect more social media accounts to your bot flows. 
                  Enterprise plan offers unlimited connections across all platforms.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          {currentPlan !== "Enterprise" && (
            <Button>Upgrade Plan</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
