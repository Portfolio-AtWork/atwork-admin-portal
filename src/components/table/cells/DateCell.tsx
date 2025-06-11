import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { TableCell } from '@/components/ui/table';

interface DateCellProps {
  value: Date | string | undefined | null;
  dateOnly?: boolean;
}

export const DateCell = ({ value, dateOnly = false }: DateCellProps) => {
  if (!value) return <TableCell />;

  const formatStr = dateOnly ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm:ss';

  let date: Date;

  if (typeof value === 'string') {
    // Tenta converter a string brasileira para um objeto Date
    date = parse(value, 'dd/MM/yyyy HH:mm:ss', new Date(), { locale: ptBR });
    // Caso seja só a data
    if (isNaN(date.getTime())) {
      date = parse(value, 'dd/MM/yyyy', new Date(), { locale: ptBR });
    }
  } else {
    date = value;
  }

  if (isNaN(date.getTime())) return <TableCell />; // Data inválida

  return <TableCell>{format(date, formatStr, { locale: ptBR })}</TableCell>;
};
