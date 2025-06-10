import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PrivateRoute from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Funcionarios = lazy(() => import('./pages/Funcionarios'));
const Login = lazy(() => import('./pages/Login'));
const Detalhes = lazy(() => import('./pages/Detalhes'));
const Settings = lazy(() => import('./pages/Settings'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/funcionarios"
            element={
              <PrivateRoute>
                <Funcionarios />
              </PrivateRoute>
            }
          />
          <Route
            path="/funcionario/:id/detalhes"
            element={
              <PrivateRoute>
                <Detalhes />
              </PrivateRoute>
            }
          />
          <Route
            path="/cancelar-funcionario/:id"
            element={
              <PrivateRoute>
                <Funcionarios />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}
