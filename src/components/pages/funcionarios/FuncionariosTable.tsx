
import { Check, ScrollText, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CancellationModal } from '@/components/modals/CancellationModal';
import { TableActions } from '@/components/table/TableActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MessagesResource } from '@/i18n/resources';
import { GetFuncionariosByGrupoResult } from '@/services/types/funcionario';

export const FuncionariosTable = ({
  funcionarios = [],
}: {
  funcionarios: GetFuncionariosByGrupoResult[];
}) => {
  const navigate = useNavigate();
  const [selectedFuncionario, setSelectedFuncionario] = useState<GetFuncionariosByGrupoResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    navigate(`/funcionario/${row.ID}/pontos`);
  }

  function openCancelFuncionarioModal(funcionarioId: string) {
    const funcionario = funcionarios.find((f) => f.ID === funcionarioId);
    if (funcionario) {
      setSelectedFuncionario(funcionario);
      setIsModalOpen(true);
      // Change URL without navigating
      window.history.pushState({}, '', `/cancelar-funcionario/${funcionarioId}`);
    }
  }

  function handleConfirmCancel() {
    // Here you would implement the actual cancellation logic
    console.log(`Cancelando funcionário: ${selectedFuncionario?.Nome}`);
    setIsModalOpen(false);
    // Return to previous URL
    window.history.back();
  }

  function handleCancelModal() {
    setIsModalOpen(false);
    // Return to previous URL
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
                    cancelAction={openCancelFuncionarioModal}
                    customActions={[
                      {
                        action: handleRowClick,
                        color: 'yellow',
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

      <CancellationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        itemName={selectedFuncionario?.Nome || ''}
        onConfirm={handleConfirmCancel}
        onCancel={handleCancelModal}
      />
    </>
  );
};
