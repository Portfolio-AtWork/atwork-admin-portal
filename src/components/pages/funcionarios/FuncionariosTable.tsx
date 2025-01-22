import React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FuncionariosByGrupoResult } from "@/hooks/pages/useFuncionarios";

export const FuncionariosTable = ({ funcionarios }: { funcionarios: FuncionariosByGrupoResult[] }) => {
  const { t } = useTranslation();

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'A':
        return t('active');
      case 'C':
        return t('canceled');
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('email')}</TableHead>
            <TableHead>{t('status')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {funcionarios.map(funcionario => (
            <TableRow key={funcionario.ID}>
              <TableCell>{funcionario.Nome}</TableCell>
              <TableCell>{funcionario.Email}</TableCell>
              <TableCell>{getStatusDisplay(funcionario.ST_Status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};