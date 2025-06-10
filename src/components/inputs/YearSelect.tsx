import { useMemo } from 'react';

import { Label } from '../ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type YearSelectProps = {
  label?: string;
  value: number;
  onChange: (value: string) => void;
};

export const YearSelect = ({
  label = 'Ano',
  value,
  onChange,
}: YearSelectProps) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 3 }, (_, i) => currentYear - i);
  }, []);

  return (
    <div className="flex flex-col space-y-1">
      <Label>{label}</Label>
      <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione um ano" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year.toString()} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
