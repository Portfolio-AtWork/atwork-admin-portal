// src/contexts/DetalhesContext.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

type PontosQueryParamsProps = {
  DT_Ponto: Date;
};

type JustificativasQueryParamsProps = {
  Mes: number;
  Ano: number;
};

type DetalhesContextType = {
  ID_Funcionario: string;
  pontosQueryParams: PontosQueryParamsProps;
  setPontosQueryParams: (filtros: PontosQueryParamsProps) => void;
  justificativasQueryParams: JustificativasQueryParamsProps;
  setJustificativasQueryParams: (
    filtros: JustificativasQueryParamsProps,
  ) => void;
};

const getTodayDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const TABS = {
  PONTOS: 'pontos',
  JUSTIFICATIVAS: 'justificativas',
} as const;

const DetalhesContext = createContext<DetalhesContextType | undefined>(
  undefined,
);

export const DetalhesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { id } = useParams();

  const [pontosQueryParams, setPontosQueryParams] =
    useState<PontosQueryParamsProps>({
      DT_Ponto: getTodayDate(),
    });

  const [justificativasQueryParams, setJustificativasQueryParams] =
    useState<JustificativasQueryParamsProps>({
      Mes: getTodayDate().getMonth() + 1,
      Ano: getTodayDate().getFullYear(),
    });

  if (!id) {
    throw new Error('DetalhesProvider requires a route param "id"');
  }

  const values = useMemo(
    () => ({
      ID_Funcionario: id,
      pontosQueryParams,
      setPontosQueryParams,
      justificativasQueryParams,
      setJustificativasQueryParams,
    }),
    [id, justificativasQueryParams, pontosQueryParams],
  );

  return (
    <DetalhesContext.Provider value={values}>
      {children}
    </DetalhesContext.Provider>
  );
};

export const useDetalhes = () => {
  const context = useContext(DetalhesContext);
  if (!context) {
    throw new Error('useDetalhes must be used within a DetalhesProvider');
  }
  return context;
};
