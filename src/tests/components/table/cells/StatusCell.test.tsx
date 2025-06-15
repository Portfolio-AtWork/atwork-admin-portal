import { render, screen } from '@testing-library/react';

import { StatusCell } from '@/components/table/cells/StatusCell';
import { MessagesResource } from '@/i18n/resources';

describe('StatusCell', () => {
  it('renders active status correctly', () => {
    render(<StatusCell value="A" />);
    const cell = screen.getByTitle(MessagesResource.ACTIVE);
    expect(cell).toBeInTheDocument();
    // Optionally check if SVG icon (Check) is rendered inside
    expect(cell.querySelector('svg')).toBeTruthy();
  });

  it('renders pending status correctly', () => {
    render(<StatusCell value="P" />);
    const cell = screen.getByTitle(MessagesResource.PENDING);
    expect(cell).toBeInTheDocument();
  });

  it('renders canceled status correctly', () => {
    render(<StatusCell value="C" />);
    const cell = screen.getByTitle(MessagesResource.CANCELED);
    expect(cell).toBeInTheDocument();
  });

  it('renders default value when unknown', () => {
    const unknownValue = 'X';
    render(<StatusCell value={unknownValue} />);
    // Since default returns the value itself, it won't have a title
    // But the cell should contain the string
    expect(screen.getByText(unknownValue)).toBeInTheDocument();
  });
});
