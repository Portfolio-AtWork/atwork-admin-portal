import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ImageDialog } from '@/components/modals/ImageDialog';
import { MessagesResource } from '@/i18n/resources';

const base64Stub = 'iVBORw0KGgoAAAANSUhEUgAAAAUA'; // base64 mínima para teste

describe('ImageDialog', () => {
  it('should not render if base64Image is null', () => {
    const { container } = render(
      <ImageDialog
        isOpen={true}
        onOpenChange={() => {}}
        base64Image={null}
        onClose={() => {}}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders image with default mime type if base64 is not a full data URI', () => {
    render(
      <ImageDialog
        isOpen={true}
        onOpenChange={() => {}}
        base64Image={base64Stub}
        onClose={() => {}}
      />,
    );

    const img = screen.getByAltText('Imagem Base64') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(`data:image/png;base64,${base64Stub}`);
  });

  it('renders image with complete data URI if provided', () => {
    const fullDataUri = `data:image/jpeg;base64,${base64Stub}`;
    render(
      <ImageDialog
        isOpen={true}
        onOpenChange={() => {}}
        base64Image={fullDataUri}
        onClose={() => {}}
      />,
    );

    const img = screen.getByAltText('Imagem Base64') as HTMLImageElement;
    expect(img.src).toBe(fullDataUri);
  });

  it('displays custom title if provided', () => {
    render(
      <ImageDialog
        isOpen={true}
        onOpenChange={() => {}}
        base64Image={base64Stub}
        onClose={() => {}}
        title="Custom Title"
      />,
    );

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    const onClose = vi.fn();

    render(
      <ImageDialog
        isOpen={true}
        onOpenChange={() => {}}
        base64Image={base64Stub}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByText(MessagesResource.CLOSE));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
