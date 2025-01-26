import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGrupos } from '@/hooks/pages/useGrupos';
import { useTranslation } from 'react-i18next';
import { Label } from '../ui/label';

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
  const { grupos } = useGrupos();
  const { t } = useTranslation();

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
          <SelectValue placeholder={t('select')} />
        </SelectTrigger>
        <SelectContent>
          {grupos?.map((grupo) => (
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
