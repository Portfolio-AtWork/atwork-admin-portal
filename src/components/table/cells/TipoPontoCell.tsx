import { TableCell } from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';

interface TipoPontoCellProps {
  TP_Ponto: string;
}

function formatName(tp_ponto: string) {
  switch (tp_ponto) {
    case 'E':
      return MessagesResource.ENTRADA;
    case 'S':
      return MessagesResource.SAIDA;
    default:
      return '';
  }
}

export const TipoPontoCell = ({ TP_Ponto }: TipoPontoCellProps) => {
  const label = formatName(TP_Ponto);

  return <TableCell>{label}</TableCell>;
};
