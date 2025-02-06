import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';
import { getPontosByFuncionario } from '@/services/api/ponto';

interface Ponto {
  ID: string;
  ID_Funcionario: string;
  DT_Ponto: string;
  ST_Ponto: string;
}

const FuncionarioPontos = () => {
  const { id } = useParams();

  const { data: pontos, isLoading, error } = useQuery({
    queryKey: ['pontos', id],
    queryFn: () => getPontosByFuncionario(id!),
    enabled: !!id,
  });

  return (
    <>
      <PageHeader title={MessagesResource.EMPLOYEE_POINTS} />
      <LoadingMessage isLoading={isLoading} error={error} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.DATE}</TableHead>
              <TableHead>{MessagesResource.STATUS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pontos?.map((ponto: Ponto) => (
              <TableRow key={ponto.ID}>
                <TableCell>
                  {format(new Date(ponto.DT_Ponto), 'dd/MM/yyyy HH:mm:ss')}
                </TableCell>
                <TableCell>{ponto.ST_Ponto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FuncionarioPontos;