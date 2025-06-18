import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ConfirmationDialog } from '@/components/modals/ConfirmationDialog';
import { MessagesResource } from '@/i18n/resources';

describe('ConfirmationDialog', () => {
  it('renders title and description when open', () => {
    render(
      <ConfirmationDialog
        isOpen={true}
        onOpenChange={() => {}}
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );

    expect(
      screen.getByText(MessagesResource.CONFIRM_CANCELLATION),
    ).toBeInTheDocument();
    expect(screen.getByText(MessagesResource.CANCEL)).toBeInTheDocument();
    expect(screen.getByText(MessagesResource.YES)).toBeInTheDocument();
    expect(screen.getByText(MessagesResource.NO)).toBeInTheDocument();
  });

  it('calls onConfirm when YES is clicked', () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmationDialog
        isOpen={true}
        onOpenChange={() => {}}
        onConfirm={onConfirm}
        onCancel={() => {}}
      />,
    );

    const yesButton = screen.getByText(MessagesResource.YES);
    fireEvent.click(yesButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when NO is clicked', () => {
    const onCancel = vi.fn();

    render(
      <ConfirmationDialog
        isOpen={true}
        onOpenChange={() => {}}
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    );

    const noButton = screen.getByText(MessagesResource.NO);
    fireEvent.click(noButton);

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not render content when isOpen is false', () => {
    render(
      <ConfirmationDialog
        isOpen={false}
        onOpenChange={() => {}}
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );

    expect(
      screen.queryByText(MessagesResource.CONFIRM_CANCELLATION),
    ).not.toBeInTheDocument();
  });
});
