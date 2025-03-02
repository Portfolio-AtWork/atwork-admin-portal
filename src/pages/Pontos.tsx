import { useParams } from 'react-router-dom';

import { PageHeader } from '@/components/layout/PageHeader';
import { LoadingMessage } from '@/components/LoadingMessage';
import { PontosTable } from '@/components/pages/pontos/PontosTable';
import { useGetPontosByFuncionario } from '@/hooks/api/ponto/useGetPontosByFuncionario';
import { MessagesResource } from '@/i18n/resources';

const Pontos = () => {
  const { id } = useParams();
  const fetchPontos = useGetPontosByFuncionario({ ID_Funcionario: id });

  return (
    <>
      <PageHeader title={MessagesResource.EMPLOYEE_POINTS} />
      <LoadingMessage
        isLoading={fetchPontos.isLoading}
        error={fetchPontos.error}
      />
      <PontosTable pontos={fetchPontos.data} />
    </>
  );
};

export default Pontos;
