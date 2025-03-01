import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import FuncionarioPontos from './pages/FuncionarioPontos';
import Funcionarios from './pages/Funcionarios';
import Home from './pages/Home';
import Index from './pages/Index';
import Login from './pages/Login';
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
        <Route path="/funcionario/:id/pontos" element={<FuncionarioPontos />} />
      </Route>
    </Routes>
  );
}
