import { Check, Image, X } from 'lucide-react';
import { useState } from 'react';

import { useDetalhes } from '../DetalhesContext';

import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { ImageDialog } from '@/components/modals/ImageDialog';
import { DateCell } from '@/components/table/cells/DateCell';
import { StatusCell } from '@/components/table/cells/StatusCell';
import { TableActions } from '@/components/table/TableActions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useApproveJustificativa } from '@/hooks/api/justificativa/useApproveJustificativa';
import { useCancelJustificativa } from '@/hooks/api/justificativa/useCancelJustificativa';
import { MessagesResource } from '@/i18n/resources';
import { GetJustificativasResult } from '@/services/types/justificativa';

export const JustificativasTable = ({
  justificativas = [],
  refetch,
}: {
  justificativas: GetJustificativasResult[];
  refetch: () => void;
}) => {
  const { ID_Funcionario } = useDetalhes();
  const [selectedJustificativa, setSelectedJustificativa] =
    useState<GetJustificativasResult | null>(null);

  const approveJustificativa = useApproveJustificativa();
  const cancelJustificativa = useCancelJustificativa();

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const handleApprovePoint = (Justificativa: GetJustificativasResult) => {
    setSelectedJustificativa(Justificativa);
    setIsApproveDialogOpen(true);
  };

  const handleCancelPoint = (Justificativa: GetJustificativasResult) => {
    setSelectedJustificativa(Justificativa);
    setIsCancelDialogOpen(true);
  };

  const confirmApprove = () => {
    if (selectedJustificativa) {
      approveJustificativa.mutate({
        ID_Funcionario: ID_Funcionario,
        ID_Justificativa: selectedJustificativa.ID_Justificativa,
      });
      setIsApproveDialogOpen(false);
      refetch();
    }
  };

  const confirmCancel = () => {
    if (selectedJustificativa) {
      cancelJustificativa.mutate({
        ID_Funcionario: ID_Funcionario,
        ID_Justificativa: selectedJustificativa.ID_Justificativa,
      });
      setIsCancelDialogOpen(false);
      refetch();
    }
  };

  const handleShowImage = (Justificativa: GetJustificativasResult) => {
    setSelectedJustificativa(Justificativa);
    setIsImageDialogOpen(true);
  };

  function getRowColor(ST_Justificativa: string) {
    if (ST_Justificativa === 'C') return 'bg-red-500/25';
    else if (ST_Justificativa === 'P') return 'bg-yellow-500/25';
    else return 'bg-lime-500/25';
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{MessagesResource.TIPO_JUSTIFICATIVA}</TableHead>
              <TableHead>{MessagesResource.JUSTIFICATIVA}</TableHead>
              <TableHead>{MessagesResource.DATE}</TableHead>
              <TableHead>{MessagesResource.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(justificativas || []).map(
              (Justificativa: GetJustificativasResult) => (
                <TableRow
                  key={Justificativa.ID_Justificativa}
                  className={getRowColor(Justificativa.ST_Justificativa)}
                >
                  <StatusCell value={Justificativa.ST_Justificativa} />
                  <TableCell>{Justificativa.Justificativa}</TableCell>
                  <DateCell value={Justificativa.DT_Justificativa} dateOnly />
                  <TableCell>
                    <TableActions
                      row={Justificativa}
                      customActions={[
                        {
                          action:
                            Justificativa.ST_Justificativa === 'P' &&
                            handleApprovePoint,
                          title: MessagesResource.APPROVE_POINT,
                          icon: <Check color="#16d057" />,
                        },
                        {
                          action:
                            Justificativa.ST_Justificativa === 'P' &&
                            handleCancelPoint,
                          title: MessagesResource.CANCEL_POINT,
                          icon: <X color="#ee0606" />,
                        },
                        {
                          action:
                            Justificativa.TemImagemJustificativa &&
                            handleShowImage,
                          title: MessagesResource.IMAGEM_JUSTIFICATIVA,
                          icon: <Image />,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>

      <ImageDialog
        isOpen={isImageDialogOpen}
        mimeType={selectedJustificativa?.ImagemContentType}
        onOpenChange={setIsImageDialogOpen}
        title={MessagesResource.IMAGEM_JUSTIFICATIVA}
        base64Image={selectedJustificativa?.ImagemJustificativa}
        onClose={() => setIsImageDialogOpen(false)}
      />

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
