import { useParams, useSearchParams } from 'react-router-dom';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { PontosFilter } from '@/components/pages/pontos/PontosFilter';
import { PontosTable } from '@/components/pages/pontos/PontosTable';
import { useGetPontosByFuncionario } from '@/hooks/api/ponto/useGetPontosByFuncionario';
import { MessagesResource } from '@/i18n/resources';

const Pontos = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const DT_Ponto = searchParams.get('DT_Ponto') || undefined;

  const fetchPontos = useGetPontosByFuncionario({
    ID_Funcionario: id,
    DT_Ponto,
  });

  return (
    <>
      <PageHeader title={MessagesResource.EMPLOYEE_POINTS} />
      <LoadingMessage
        isLoading={fetchPontos.isLoading}
        error={fetchPontos.error}
      />
      <PontosFilter />
      <PontosTable pontos={fetchPontos.data} />
    </>
  );
};

export default Pontos;
