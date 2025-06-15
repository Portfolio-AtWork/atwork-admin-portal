import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

import Header from '@/components/Header';
import { SidebarProvider } from '@/components/ui/sidebar';

// Mock para evitar erro com window.matchMedia no JSDOM
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('Header', () => {
  it('renders the header title and user greeting', () => {
    localStorage.setItem('userName', 'Gustavo');

    render(
      <SidebarProvider>
        <Header />
      </SidebarProvider>,
    );

    expect(screen.getByText('@Work Admin')).toBeInTheDocument();
    expect(screen.getByText(/Olá|Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/Gustavo/i)).toBeInTheDocument();
  });

  it('renders the menu button', () => {
    const r = render(
      <SidebarProvider>
        <Header />
      </SidebarProvider>,
    );

    const toggleButton = r.container.querySelector(
      'button[data-sidebar="trigger"]',
    );
    expect(toggleButton).toBeInTheDocument();
  });
});

screen.debug(); // mostra o HTML renderizado no terminal
