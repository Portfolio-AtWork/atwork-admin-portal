import { useCallback } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Language, useLanguage } from '@/contexts/LanguageContext';
import useLocalStorage from '@/hooks/useLocalStorage';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const [currentLanguage, setCurrentLanguage] = useLocalStorage(
    'atWorkLanguage',
    language,
  );

  const handleChange = useCallback(
    (value: Language) => {
      setLanguage(value);
      setCurrentLanguage(value);
    },
    [setCurrentLanguage, setLanguage],
  );

  return (
    <Select value={currentLanguage} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pt">Português</SelectItem>
        <SelectItem value="en">English</SelectItem>
      </SelectContent>
    </Select>
  );
}
