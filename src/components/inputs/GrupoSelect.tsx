import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGrupos } from '@/hooks/pages/useGrupos';
import { useTranslation } from 'react-i18next';

type GrupoSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean | undefined;
};

export const GrupoSelect = ({
  value,
  onValueChange,
  disabled,
}: GrupoSelectProps) => {
  const { grupos } = useGrupos();
  const { t } = useTranslation();

  return (
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
  );
};
