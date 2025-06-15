import { fireEvent, render, screen } from '@testing-library/react';
import { Pencil } from 'lucide-react';
import { describe, expect, it, vi } from 'vitest';

import { TableActions } from '@/components/table/TableActions';

// Mock MessagesResource to match the titles used in TableActions
vi.mock('@/i18n/resources', () => ({
  MessagesResource: {
    EDIT: 'Edit',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
  },
}));

describe('TableActions', () => {
  const row = { id: 1 };

  it('renders update, delete, and cancel buttons when handlers provided', () => {
    const updateAction = vi.fn();
    const deleteAction = vi.fn();
    const cancelAction = vi.fn();

    render(
      <TableActions
        row={row}
        updateAction={updateAction}
        deleteAction={deleteAction}
        cancelAction={cancelAction}
      />,
    );

    expect(screen.getByTitle('Edit')).toBeInTheDocument();
    expect(screen.getByTitle('Delete')).toBeInTheDocument();
    expect(screen.getByTitle('Cancel')).toBeInTheDocument();
  });

  it('calls updateAction when update button is clicked', () => {
    const updateAction = vi.fn();

    render(<TableActions row={row} updateAction={updateAction} />);

    fireEvent.click(screen.getByTitle('Edit'));
    expect(updateAction).toHaveBeenCalledWith(row);
  });

  it('calls deleteAction when delete button is clicked', () => {
    const deleteAction = vi.fn();

    render(<TableActions row={row} deleteAction={deleteAction} />);

    fireEvent.click(screen.getByTitle('Delete'));
    expect(deleteAction).toHaveBeenCalledWith(row);
  });

  it('calls cancelAction when cancel button is clicked', () => {
    const cancelAction = vi.fn();

    render(<TableActions row={row} cancelAction={cancelAction} />);

    fireEvent.click(screen.getByTitle('Cancel'));
    expect(cancelAction).toHaveBeenCalledWith(row);
  });

  it('renders and calls custom action button', () => {
    const customAction = vi.fn();
    const customTitle = 'Custom Action';

    render(
      <TableActions
        row={row}
        customActions={[
          {
            action: customAction,
            title: customTitle,
            icon: <Pencil data-testid="custom-icon" />,
          },
        ]}
      />,
    );

    const button = screen.getByTitle(customTitle);
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(customAction).toHaveBeenCalledWith(row);
  });
});
