import { Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Funcionarios from "./pages/Funcionarios";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/funcionarios" element={<Funcionarios />} />
    </Routes>
  );
}