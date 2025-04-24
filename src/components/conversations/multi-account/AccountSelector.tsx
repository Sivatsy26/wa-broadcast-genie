
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Check, ChevronsUpDown, Phone, PhoneOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface WhatsAppAccount {
  id: string;
  name: string;
  phoneNumber: string;
  isActive: boolean;
}

const MOCK_ACCOUNTS: WhatsAppAccount[] = [
  {
    id: '1',
    name: 'Sales',
    phoneNumber: '+1 (555) 123-4567',
    isActive: true,
  },
  {
    id: '2',
    name: 'Support',
    phoneNumber: '+1 (555) 987-6543',
    isActive: true,
  },
  {
    id: '3',
    name: 'Marketing',
    phoneNumber: '+1 (555) 567-8901',
    isActive: false,
  },
];

export const AccountSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<WhatsAppAccount>(MOCK_ACCOUNTS[0]);

  const handleSelectAccount = (account: WhatsAppAccount) => {
    setSelectedAccount(account);
    setOpen(false);
    toast({
      title: "Account switched",
      description: `Now using ${account.name} account.`,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border-dashed"
        >
          <div className="flex items-center gap-2 truncate">
            {selectedAccount.isActive ? (
              <Phone className="h-4 w-4 text-green-500" />
            ) : (
              <PhoneOff className="h-4 w-4 text-amber-500" />
            )}
            <span className="truncate">{selectedAccount.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search accounts..." />
          <CommandList>
            <CommandEmpty>No accounts found.</CommandEmpty>
            <CommandGroup>
              {MOCK_ACCOUNTS.map((account) => (
                <CommandItem
                  key={account.id}
                  value={account.name}
                  onSelect={() => handleSelectAccount(account)}
                >
                  <div className="flex items-center gap-2 flex-1 truncate">
                    {account.isActive ? (
                      <Phone className="h-4 w-4 text-green-500" />
                    ) : (
                      <PhoneOff className="h-4 w-4 text-amber-500" />
                    )}
                    <div className="flex flex-col">
                      <span>{account.name}</span>
                      <span className="text-xs text-muted-foreground">{account.phoneNumber}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedAccount.id === account.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
