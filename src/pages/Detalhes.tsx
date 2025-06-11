import DetalhesCard from '@/components/pages/detalhes/DetalhesCard';
import { DetalhesProvider } from '@/components/pages/detalhes/DetalhesContext';

const Detalhes = () => {
  return (
    <DetalhesProvider>
      <DetalhesCard />
    </DetalhesProvider>
  );
};

export default Detalhes;
