import { Check, X } from 'lucide-react';
import { useState } from 'react';

import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { DateCell } from '@/components/table/cells/DateCell';
import { StatusCell } from '@/components/table/cells/StatusCell';
import { TipoPontoCell } from '@/components/table/cells/TipoPontoCell';
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

export const PontosTable = ({
  pontos = [],
  refetch,
}: {
  pontos: GetPontoByFuncionarioResult[];
  refetch: () => void;
}) => {
  const approvePonto = useApprovePonto();
  const cancelPonto = useCancelPonto();
  const [selectedPonto, setSelectedPonto] =
    useState<GetPontoByFuncionarioResult | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleApprovePoint = (ponto: GetPontoByFuncionarioResult) => {
    setSelectedPonto(ponto);
    setIsApproveDialogOpen(true);
  };

  const handleCancelPoint = (ponto: GetPontoByFuncionarioResult) => {
    setSelectedPonto(ponto);
    setIsCancelDialogOpen(true);
  };

  const confirmApprove = () => {
    if (selectedPonto) {
      approvePonto.mutate({
        ID_Funcionario: selectedPonto.ID_Funcionario,
        ID_Ponto: selectedPonto.ID,
      });
      setIsApproveDialogOpen(false);
      refetch();
    }
  };

  const confirmCancel = () => {
    if (selectedPonto) {
      cancelPonto.mutate({
        ID_Funcionario: selectedPonto.ID_Funcionario,
        ID_Ponto: selectedPonto.ID,
      });
      setIsCancelDialogOpen(false);
      refetch();
    }
  };

  function getRowColor(ST_Ponto: string) {
    if (ST_Ponto === 'C') return 'bg-red-500/25';
    else if (ST_Ponto === 'P') return 'bg-yellow-500/25';
    else return 'bg-lime-500/25';
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.STATUS}</TableHead>
              <TableHead>{MessagesResource.TIPO_PONTO}</TableHead>
              <TableHead>{MessagesResource.DATE}</TableHead>
              <TableHead>{MessagesResource.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(pontos || []).map((ponto: GetPontoByFuncionarioResult) => (
              <TableRow key={ponto.ID} className={getRowColor(ponto.ST_Ponto)}>
                <StatusCell value={ponto.ST_Ponto} />
                <TipoPontoCell TP_Ponto={ponto.TP_Ponto} />
                <DateCell value={ponto.DT_Ponto} />
                <TableCell>
                  <TableActions
                    row={ponto}
                    customActions={[
                      {
                        action: ponto.ST_Ponto === 'P' && handleApprovePoint,
                        title: MessagesResource.APPROVE_POINT,
                        icon: <Check color="#16d057" />,
                      },
                      {
                        action: ponto.ST_Ponto === 'P' && handleCancelPoint,
                        title: MessagesResource.CANCEL_POINT,
                        icon: <X color="#ee0606" />,
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
        isOpen={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
        title={MessagesResource.APPROVE_POINT}
        description={MessagesResource.APPROVE_POINT_CONFIRMATION}
        onConfirm={confirmApprove}
        onCancel={() => setIsApproveDialogOpen(false)}
      />

      <ConfirmationDialog
        isOpen={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        title={MessagesResource.CANCEL_POINT}
        description={MessagesResource.CANCEL_POINT_CONFIRMATION}
        onConfirm={confirmCancel}
        onCancel={() => setIsCancelDialogOpen(false)}
      />
    </>
  );
};
