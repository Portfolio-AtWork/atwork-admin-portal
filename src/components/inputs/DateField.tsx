import { UseFormRegisterReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateInputProps {
  label: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const DateField = ({
  label,
  placeholder = '',
  error,
  register,
}: DateInputProps) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Input type="date" placeholder={placeholder || label} {...register} />
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
