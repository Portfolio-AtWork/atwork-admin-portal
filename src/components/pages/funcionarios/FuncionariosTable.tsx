import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';

import { FuncionariosByGrupoResult } from '@/hooks/pages/useFuncionarios';

export const FuncionariosTable = ({
  funcionarios,
}: {
  funcionarios: FuncionariosByGrupoResult[];
}) => {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'A':
        return MessagesResource.ACTIVE;
      case 'C':
        return MessagesResource.CANCELED;
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{MessagesResource.NAME}</TableHead>
            <TableHead>{MessagesResource.EMAIL}</TableHead>
            <TableHead>{MessagesResource.STATUS}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map((funcionario) => (
            <TableRow key={funcionario.ID}>
              <TableCell>{funcionario.Nome}</TableCell>
              <TableCell>{funcionario.Email}</TableCell>
              <TableCell>{getStatusDisplay(funcionario.ST_Status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
