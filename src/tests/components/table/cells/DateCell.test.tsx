import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DateCell } from '@/components/table/cells/DateCell';

describe('DateCell', () => {
  it('renders empty TableCell when value is undefined', () => {
    const { container } = render(<DateCell value={undefined} />);
    // Verifica se está renderizando uma célula (pode ser vazio)
    expect(container.firstChild).toBeInTheDocument();
    expect(container.textContent).toBe('');
  });

  it('renders formatted date when value is a Date object', () => {
    const date = new Date(2023, 4, 20, 15, 30, 45); // 20/05/2023 15:30:45
    render(<DateCell value={date} />);
    expect(screen.getByText('20/05/2023 15:30:45')).toBeInTheDocument();
  });

  it('renders formatted date only when dateOnly is true', () => {
    const date = new Date(2023, 4, 20, 15, 30, 45);
    render(<DateCell value={date} dateOnly />);
    expect(screen.getByText('20/05/2023')).toBeInTheDocument();
  });

  it('parses and formats date from string with time', () => {
    render(<DateCell value="20/05/2023 15:30:45" />);
    expect(screen.getByText('20/05/2023 15:30:45')).toBeInTheDocument();
  });

  it('parses and formats date from string without time', () => {
    render(<DateCell value="20/05/2023" />);
    expect(screen.getByText('20/05/2023 00:00:00')).toBeInTheDocument();
  });

  it('renders empty TableCell when string date is invalid', () => {
    const { container } = render(<DateCell value="invalid-date-string" />);
    expect(container.textContent).toBe('');
  });
});
