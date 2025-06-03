import { Check, LoaderCircle, X } from 'lucide-react';

import { TableCell } from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';

interface StatusPontoCellProps {
  ST_Ponto: string;
}

function getTitle(st_ponto: string) {
  switch (st_ponto) {
    case 'A':
      return MessagesResource.ACTIVE;
    case 'P':
      return MessagesResource.PENDING;
    case 'C':
      return MessagesResource.CANCELED;
    default:
      return st_ponto;
  }
}

function getIcon(ST_Ponto: string) {
  switch (ST_Ponto) {
    case 'A':
      return <Check color="#16d057" />;
    case 'P':
      return <LoaderCircle color="#f4d71f" />;
    case 'C':
      return <X color="#ee0606" />;
    default:
      return ST_Ponto;
  }
}

export const StatusPontoCell = ({ ST_Ponto }: StatusPontoCellProps) => {
  const title = getTitle(ST_Ponto);
  const icon = getIcon(ST_Ponto);

  return <TableCell title={title}>{icon}</TableCell>;
};
