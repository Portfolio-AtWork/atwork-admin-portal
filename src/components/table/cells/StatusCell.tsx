import { Check, LoaderCircle, X } from 'lucide-react';

import { TableCell } from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';

interface StatusCellProps {
  value: string;
}

function getTitle(value: string) {
  switch (value) {
    case 'A':
      return MessagesResource.ACTIVE;
    case 'P':
      return MessagesResource.PENDING;
    case 'C':
      return MessagesResource.CANCELED;
    default:
      return value;
  }
}

function getIcon(value: string) {
  switch (value) {
    case 'A':
      return <Check color="#16d057" />;
    case 'P':
      return <LoaderCircle color="#f4d71f" />;
    case 'C':
      return <X color="#ee0606" />;
    default:
      return value;
  }
}

export const StatusCell = ({ value }: StatusCellProps) => {
  const title = getTitle(value);
  const icon = getIcon(value);

  return <TableCell title={title}>{icon}</TableCell>;
};
