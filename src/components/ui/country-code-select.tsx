
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const countryCodes = [
  { code: '1', country: 'US/CA' },
  { code: '44', country: 'UK' },
  { code: '91', country: 'IN' },
  { code: '61', country: 'AU' },
  { code: '64', country: 'NZ' },
  { code: '49', country: 'DE' },
  { code: '33', country: 'FR' },
  { code: '81', country: 'JP' },
  { code: '86', country: 'CN' },
  { code: '82', country: 'KR' },
  { code: '7', country: 'RU' },
  { code: '55', country: 'BR' },
  { code: '52', country: 'MX' },
  { code: '971', country: 'AE' },
  { code: '966', country: 'SA' },
  { code: '234', country: 'NG' },
  { code: '27', country: 'ZA' },
  { code: '20', country: 'EG' },
  { code: '254', country: 'KE' },
];

export function CountryCodeSelect({ value, onValueChange }: CountryCodeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <div className="flex items-center">
          <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="Code" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {countryCodes.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            +{country.code} ({country.country})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
