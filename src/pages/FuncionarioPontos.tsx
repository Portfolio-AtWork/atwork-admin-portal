import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { TableActions } from '@/components/table/TableActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetPontosByFuncionario } from '@/hooks/api/ponto/useGetPontosByFuncionario';
import { MessagesResource } from '@/i18n/resources';
import { GetPontoByFuncionarioResult } from '@/services/types/ponto';

const FuncionarioPontos = () => {
  const { id } = useParams();
  const fetchPontos = useGetPontosByFuncionario({ ID_Funcionario: id });
  console.log(fetchPontos.data);
  return (
    <>
      <PageHeader title={MessagesResource.EMPLOYEE_POINTS} />
      <LoadingMessage
        isLoading={fetchPontos.isLoading}
        error={fetchPontos.error}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.DATE}</TableHead>
              <TableHead>{MessagesResource.STATUS}</TableHead>
              <TableHead>{MessagesResource.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchPontos.data?.map((ponto: GetPontoByFuncionarioResult) => (
              <TableRow key={ponto.ID}>
                <TableCell>
                  {format(new Date(ponto.DT_Ponto), 'dd/MM/yyyy HH:mm:ss')}
                </TableCell>
                <TableCell>{ponto.ST_Ponto}</TableCell>
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

export default FuncionarioPontos;
