
import { ControllerRenderProps } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateInputProps {
  label: string;
  placeholder?: string;
  error?: string;
  field: ControllerRenderProps<any, any>;
}

export const DateField = ({
  label,
  placeholder = '',
  error,
  field,
}: DateInputProps) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Input type="date" placeholder={placeholder || label} {...field} />
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
