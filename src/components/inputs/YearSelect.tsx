import { useMemo } from 'react';

import { Label } from '../ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type YearSelectProps = {
  label?: string;
  value: number;
  onChange: (value: string) => void;
  className?: string;
};

export const YearSelect = ({
  label = 'Ano',
  value,
  onChange,
  className,
}: YearSelectProps) => {
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 3 }, (_, i) => currentYear - i);
  }, []);

  return (
    <div className={cn('flex flex-col space-y-1', className)}>
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
