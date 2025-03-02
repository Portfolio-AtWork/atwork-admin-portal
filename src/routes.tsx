import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Funcionarios from './pages/Funcionarios';
import Home from './pages/Home';
import Index from './pages/Index';
import Login from './pages/Login';
import Pontos from './pages/Pontos';
import Settings from './pages/Settings';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/funcionarios" element={<Funcionarios />} />
        <Route path="/funcionario/:id/pontos" element={<Pontos />} />
        <Route path="/cancelar-funcionario/:id" element={<Funcionarios />} />
      </Route>
    </Routes>
  );
}
