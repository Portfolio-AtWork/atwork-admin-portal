import { format } from 'date-fns';
import { Check, LoaderCircle, X } from 'lucide-react';

import { TableActions } from '@/components/table/TableActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useApprovePonto } from '@/hooks/api/ponto/useApprovePonto';
import { useCancelPonto } from '@/hooks/api/ponto/useCancelPonto';
import { MessagesResource } from '@/i18n/resources';
import { GetPontoByFuncionarioResult } from '@/services/types/ponto';

const getStatusPoint = (ST_Ponto: string) => {
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
};

export const PontosTable = ({
  pontos = [],
}: {
  pontos: GetPontoByFuncionarioResult[];
}) => {
  const approvePonto = useApprovePonto();
  const cancelPonto = useCancelPonto();

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.STATUS}</TableHead>
              <TableHead>{MessagesResource.DATE}</TableHead>
              <TableHead>{MessagesResource.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pontos.map((ponto: GetPontoByFuncionarioResult) => (
              <TableRow key={ponto.ID}>
                <TableCell
                  title={
                    ponto.ST_Ponto === 'A'
                      ? MessagesResource.ACTIVE
                      : ponto.ST_Ponto === 'P'
                        ? MessagesResource.PENDING
                        : MessagesResource.CANCELED
                  }
                >
                  {getStatusPoint(ponto.ST_Ponto)}
                </TableCell>
                <TableCell>
                  {format(new Date(ponto.DT_Ponto), 'dd/MM/yyyy HH:mm:ss')}
                </TableCell>
                <TableCell>
                  <TableActions row={ponto} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
