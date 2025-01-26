import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps {
  label: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email';
  error?: string;
  register: UseFormRegisterReturn;
}

export const TextField = ({
  label,
  placeholder = '',
  type = 'text',
  error,
  register,
}: TextInputProps) => {
  return (
    <>
      <Label>{label}</Label>
      <Input type={type} placeholder={placeholder || label} {...register} />
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
