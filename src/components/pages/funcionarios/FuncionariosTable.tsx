import { Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FuncionariosByGrupoResult } from '@/hooks/pages/useFuncionarios';
import { MessagesResource } from '@/i18n/resources';

export const FuncionariosTable = ({
  funcionarios,
}: {
  funcionarios: FuncionariosByGrupoResult[];
}) => {
  const navigate = useNavigate();

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'A':
        return <Check color="#16d057" />;
      case 'C':
        return <X color="#ee0606" />;
      default:
        return status;
    }
  };

  const handleRowClick = (funcionarioId: string) => {
    navigate(`/funcionario/${funcionarioId}/pontos`);
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
            <TableRow 
              key={funcionario.ID}
              className="cursor-pointer hover:bg-muted"
              onClick={() => handleRowClick(funcionario.ID)}
            >
              <TableCell
                title={
                  funcionario.ST_Status == 'A'
                    ? MessagesResource.ACTIVE
                    : MessagesResource.CANCELED
                }
              >
                {getStatusDisplay(funcionario.ST_Status)}
              </TableCell>
              <TableCell>{funcionario.Nome}</TableCell>
              <TableCell>{funcionario.Email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};