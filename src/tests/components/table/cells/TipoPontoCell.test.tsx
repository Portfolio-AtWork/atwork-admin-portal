import { render, screen } from '@testing-library/react';

import { TipoPontoCell } from '@/components/table/cells/TipoPontoCell';
import { MessagesResource } from '@/i18n/resources';

describe('TipoPontoCell', () => {
  it('exibe label "Entrada" para TP_Ponto = "E"', () => {
    render(<TipoPontoCell TP_Ponto="E" />);
    expect(screen.getByText(MessagesResource.ENTRADA)).toBeInTheDocument();
  });

  it('exibe label "Saída" para TP_Ponto = "S"', () => {
    render(<TipoPontoCell TP_Ponto="S" />);
    expect(screen.getByText(MessagesResource.SAIDA)).toBeInTheDocument();
  });

  it('exibe label vazio para valores desconhecidos', () => {
    render(<TipoPontoCell TP_Ponto="X" />);
    // Como o label é '', ele não deve renderizar texto visível
    const cell = screen.getByRole('cell'); // supondo TableCell gera <td role="cell">
    expect(cell.textContent).toBe('');
  });
});
