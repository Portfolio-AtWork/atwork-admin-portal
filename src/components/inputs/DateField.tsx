import { UseFormRegisterReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DateInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  error?: string;
  register: UseFormRegisterReturn;
  max?: string;
}

export const DateField = ({
  id,
  label,
  placeholder = '',
  error,
  register,
  max,
}: DateInputProps) => {
  if (!id) {
    id = uuidv4();
  }

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        type="date"
        placeholder={placeholder || label}
        {...register}
        max={max}
      />
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
