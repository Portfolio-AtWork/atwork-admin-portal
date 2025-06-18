import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LoadingMessage } from '@/components/LoadingMessage';
import { MessagesResource } from '@/i18n/resources';

describe('LoadingMessage', () => {
  it('shows loading message when isLoading is true', () => {
    render(
      <LoadingMessage
        isLoading={true}
        loadingMessage="Carregando dados..."
        error={null as Error}
      />,
    );
    expect(screen.getByText('Carregando dados...')).toBeInTheDocument();
  });

  it('shows default loading message when isLoading is true and no loadingMessage passed', () => {
    render(<LoadingMessage isLoading={true} error={null as Error} />);
    expect(screen.getByText(MessagesResource.LOADING)).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    const error = new Error('Falha na requisição');
    render(
      <LoadingMessage
        isLoading={false}
        error={error}
        errorMessage="Erro ao carregar dados"
      />,
    );
    expect(screen.getByText('Erro ao carregar dados')).toBeInTheDocument();
    expect(screen.getByText('Erro ao carregar dados')).toHaveClass(
      'text-red-500',
    );
  });

  it('shows default error message when error is present and no errorMessage passed', () => {
    const error = new Error('Falha');
    render(<LoadingMessage isLoading={false} error={error} />);
    expect(
      screen.getByText(MessagesResource.ERROR_LOADING),
    ).toBeInTheDocument();
  });

  it('renders nothing when not loading and no error', () => {
    const { container } = render(
      <LoadingMessage isLoading={false} error={null as Error} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
