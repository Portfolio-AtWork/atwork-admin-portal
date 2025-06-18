import { render, screen } from '@testing-library/react';

import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders the spinner container and spinner element', () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass(
      'w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin',
    );
  });
});
