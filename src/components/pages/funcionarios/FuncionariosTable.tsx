import { Check, ScrollText, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { TableActions } from '@/components/table/TableActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCancelFuncionario } from '@/hooks/api/funcionario/useCancelFunctionario';
import { MessagesResource } from '@/i18n/resources';
import { GetFuncionariosByGrupoResult } from '@/services/types/funcionario';

export const FuncionariosTable = ({
  funcionarios = [],
}: {
  funcionarios: GetFuncionariosByGrupoResult[];
}) => {
  const navigate = useNavigate();

  const [selectedFuncionario, setSelectedFuncionario] =
    useState<GetFuncionariosByGrupoResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateStatusFunc = useCancelFuncionario();

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

  function handleRowClick(row: GetFuncionariosByGrupoResult) {
    navigate(`/funcionario/${row.ID}/detalhes`);
  }

  const openCancelFuncionarioModal = useCallback(
    (row: GetFuncionariosByGrupoResult) => {
      const funcionario = funcionarios.find((f) => f.ID === row.ID);
      if (funcionario) {
        setSelectedFuncionario(funcionario);
        setIsModalOpen(true);
        // Change URL without navigating
        window.history.pushState({}, '', `/cancelar-funcionario/${row.ID}`);
      }
    },
    [funcionarios],
  );

  const handleConfirmCancel = useCallback(() => {
    updateStatusFunc.mutateAsync(selectedFuncionario.ID).then((response) => {
      if (response) {
        setIsModalOpen(false);
        window.history.back();
      }
    });
  }, [selectedFuncionario?.ID, updateStatusFunc]);

  function handleCancelModal() {
    setIsModalOpen(false);
    window.history.back();
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.STATUS}</TableHead>
              <TableHead>{MessagesResource.NAME}</TableHead>
              <TableHead>{MessagesResource.EMAIL}</TableHead>
              <TableHead>{MessagesResource.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow
                key={funcionario.ID}
                className="cursor-pointer hover:bg-muted"
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
                <TableCell>
                  <TableActions
                    row={funcionario}
                    cancelAction={
                      funcionario.ST_Status === 'A' &&
                      openCancelFuncionarioModal
                    }
                    customActions={[
                      {
                        action: handleRowClick,
                        title: MessagesResource.SEE_EMPLOYEE_POINTS,
                        icon: <ScrollText className="w-5 h-5" />,
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmationDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        description={MessagesResource.CANCEL_EMPLOYEE_CONFIRMATION.withParameters(
          { funcionario: selectedFuncionario?.Nome || '' },
        )}
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModal}
      />
    </>
  );
};
