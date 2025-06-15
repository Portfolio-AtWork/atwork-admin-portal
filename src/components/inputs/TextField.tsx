import { UseFormRegisterReturn } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  id?: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  error?: string;
  register: UseFormRegisterReturn;
}

export const TextField = ({
  id,
  label,
  placeholder = '',
  type = 'text',
  error,
  register,
}: TextInputProps) => {
  if (!id) {
    id = uuidv4();
  }

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder || label}
        {...register}
      />
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
