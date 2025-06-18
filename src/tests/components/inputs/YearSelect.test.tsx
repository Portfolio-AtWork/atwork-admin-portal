// src/components/YearSelect.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { YearSelect } from '@/components/inputs/YearSelect';

describe('YearSelect', () => {
  it('renders label and select with correct years', () => {
    render(<YearSelect value={2025} onChange={() => {}} />);

    // Verifica o label
    expect(screen.getByText('Ano')).toBeInTheDocument();

    // Verifica se o valor atual aparece como selecionado
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('calls onChange when a new year is selected', () => {
    const mockOnChange = vi.fn();
    render(<YearSelect value={2025} onChange={mockOnChange} />);

    // Usa getByText para abrir o select
    const trigger = screen.getByText('2025');
    fireEvent.click(trigger);

    // Seleciona um dos anos (exemplo: 2024)
    const option = screen.getByText('2024');
    fireEvent.click(option);

    // Verifica se o onChange foi chamado com "2024"
    expect(mockOnChange).toHaveBeenCalledWith('2024');
  });
});
