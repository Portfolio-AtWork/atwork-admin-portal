import { TABS, useDetalhes } from './DetalhesContext';
import { PontosFilter } from './pontos/PontosFilter';
import { PontosTable } from './pontos/PontosTable';

import { LoadingMessage } from '@/components/LoadingMessage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetPontosByFuncionario } from '@/hooks/api/ponto/useGetPontosByFuncionario';
import { MessagesResource } from '@/i18n/resources';

const formatDateToApi = (date: Date | undefined) => {
  if (!date) return undefined;
  return date.toISOString().split('T')[0]; // yyyy-MM-dd
};

const DetalhesCard = () => {
  const { pontosQueryParams, ID_Funcionario } = useDetalhes();

  const fetchPontos = useGetPontosByFuncionario({
    ID_Funcionario,
    DT_Ponto: formatDateToApi(pontosQueryParams.DT_Ponto),
  });

  return (
    <>
      <Tabs defaultValue={TABS.PONTOS} className="mt-4">
        <TabsList>
          <TabsTrigger value={TABS.PONTOS}>
            {MessagesResource.POINTS}
          </TabsTrigger>
          <TabsTrigger value={TABS.JUSTIFICATIVAS}>
            {MessagesResource.JUSTIFICATIVAS}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.PONTOS}>
          <LoadingMessage
            isLoading={fetchPontos.isLoading}
            error={fetchPontos.error}
          />
          <PontosFilter />
          <PontosTable pontos={fetchPontos.data} />
        </TabsContent>
        <TabsContent value={TABS.JUSTIFICATIVAS}>
          <h1>Justificativas</h1>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DetalhesCard;
