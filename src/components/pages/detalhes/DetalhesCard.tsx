import { useCallback, useMemo, useState } from 'react';

import { CreatePontoManualDialog } from '../pontos/CreatePontoManualDialog';

import { TABS, useDetalhes } from './DetalhesContext';
import { JustificativasFilter } from './justificativas/JustificativasFilter';
import { JustificativasTable } from './justificativas/JustificativasTable';
import { PontosFilter } from './pontos/PontosFilter';
import { PontosTable } from './pontos/PontosTable';

import { LoadingMessage } from '@/components/LoadingMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetJustificativas } from '@/hooks/api/justificativa/useGetJustificativas';
import { useCreatePontoManual } from '@/hooks/api/ponto/useCreatePontoManual';
import { useGetPontosByFuncionario } from '@/hooks/api/ponto/useGetPontosByFuncionario';
import { MessagesResource } from '@/i18n/resources';
import { CreatePontoManualCommand } from '@/services/types/ponto';

const formatDateToApi = (date: Date | undefined) => {
  if (!date) return undefined;
  return date.toISOString().split('T')[0]; // yyyy-MM-dd
};

const DetalhesCard = () => {
  const { pontosQueryParams, justificativasQueryParams, ID_Funcionario } =
    useDetalhes();

  const [openCreatePonto, setOpenCreatePonto] = useState(false);

  const fetchPontos = useGetPontosByFuncionario({
    ID_Funcionario,
    DT_Ponto: formatDateToApi(pontosQueryParams.DT_Ponto),
  });

  const fetchJustificativas = useGetJustificativas({
    ID_Funcionario,
    Ano: justificativasQueryParams.Ano,
    Mes: justificativasQueryParams.Mes,
  });

  const mutatePontoManual = useCreatePontoManual();

  const addPontoManual = useCallback(
    (values: CreatePontoManualCommand) => {
      mutatePontoManual
        .mutateAsync({
          ...values,
          ID_Funcionario,
        })
        .then((response) => {
          if (response) {
            fetchPontos.refetch();
            setOpenCreatePonto(false);
          }
        });
    },
    [ID_Funcionario, fetchPontos, mutatePontoManual],
  );

  const renderTabOptions = useMemo(() => {
    return (
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value={TABS.PONTOS}>
            {MessagesResource.POINTS}
          </TabsTrigger>
          <TabsTrigger value={TABS.JUSTIFICATIVAS}>
            {MessagesResource.JUSTIFICATIVAS}
          </TabsTrigger>
        </TabsList>
        <div className="flex gap-2">
          <CreatePontoManualDialog
            open={openCreatePonto}
            onOpenChange={setOpenCreatePonto}
            onSubmit={addPontoManual}
            isPending={mutatePontoManual.isPending}
          />
        </div>
      </div>
    );
  }, [addPontoManual, mutatePontoManual.isPending, openCreatePonto]);

  const renderPontosContent = useMemo(() => {
    return (
      <TabsContent value={TABS.PONTOS}>
        <LoadingMessage
          isLoading={fetchPontos.isLoading}
          error={fetchPontos.error}
        />
        <PontosFilter />
        <PontosTable
          pontos={fetchPontos.data}
          refetch={() => fetchPontos.refetch()}
        />
      </TabsContent>
    );
  }, [fetchPontos]);

  const renderJustificativasContent = useMemo(() => {
    return (
      <TabsContent value={TABS.JUSTIFICATIVAS}>
        <LoadingMessage
          isLoading={fetchJustificativas.isLoading}
          error={fetchJustificativas.error}
        />
        <JustificativasFilter />
        <JustificativasTable
          justificativas={fetchJustificativas.data}
          refetch={() => fetchJustificativas.refetch()}
        />
      </TabsContent>
    );
  }, [fetchJustificativas]);

  return (
    <>
      <Tabs defaultValue={TABS.PONTOS} className="mt-4">
        {renderTabOptions}
        {renderPontosContent}
        {renderJustificativasContent}
      </Tabs>
    </>
  );
};

export default DetalhesCard;
