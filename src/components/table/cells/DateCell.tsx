import { format } from 'date-fns';

import { TableCell } from '@/components/ui/table';

interface DateCellProps {
  value: Date | string | undefined | null;
  dateOnly?: boolean;
}

export const DateCell = ({ value, dateOnly = false }: DateCellProps) => {
  if (!value) return <TableCell />;

  const formatStr = dateOnly ? 'dd/MM/yyyy' : 'dd/MM/yyyy HH:mm:ss';

  return <TableCell>{format(new Date(value), formatStr)}</TableCell>;
};
