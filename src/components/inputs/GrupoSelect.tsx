import { Label } from '../ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetGruposByLogin } from '@/hooks/api/grupo/useGetGruposByLogin';
import { MessagesResource } from '@/i18n/resources';

type GrupoSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean | undefined;
  label: string;
  error: string;
};

export const GrupoSelect = ({
  value,
  onValueChange,
  disabled,
  label,
  error,
}: GrupoSelectProps) => {
  const { data } = useGetGruposByLogin();

  return (
    <>
      <Label>{label}</Label>
      <Select
        onValueChange={onValueChange}
        value={value}
        disabled={disabled}
        defaultValue=""
      >
        <SelectTrigger>
          <SelectValue placeholder={MessagesResource.SELECT} />
        </SelectTrigger>
        <SelectContent>
          {data?.map((grupo) => (
            <SelectItem key={grupo.ID} value={grupo.ID}>
              {grupo.Nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="mt-0 text-sm text-red-500">{error}</p>}
    </>
  );
};
