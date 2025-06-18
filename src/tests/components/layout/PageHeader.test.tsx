import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PageHeader } from '@/components/layout/PageHeader'; // caminho correto

describe('PageHeader', () => {
  it('renders the title correctly', () => {
    render(<PageHeader title="Dashboard" />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard' }),
    ).toBeInTheDocument();
  });

  it('renders children elements if provided', () => {
    render(
      <PageHeader title="Usuários">
        <button>Adicionar</button>
        <button>Exportar</button>
      </PageHeader>,
    );
    expect(screen.getByText('Adicionar')).toBeInTheDocument();
    expect(screen.getByText('Exportar')).toBeInTheDocument();
  });

  it('has the correct container class', () => {
    render(<PageHeader title="Test" />);
    const container = screen.getByTestId('page-header');
    expect(container.className).toContain('flex');
    expect(container.className).toContain('justify-between');
    expect(container.className).toContain('items-center');
    expect(container.className).toContain('mb-6');
  });
});
