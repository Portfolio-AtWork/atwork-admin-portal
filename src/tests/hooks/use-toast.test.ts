/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { reducer } from '@/hooks/use-toast';

const createToast = (id: string, overrides = {}) => ({
  id,
  title: 'Test Title',
  description: 'Test Description',
  open: true,
  onOpenChange: vi.fn(),
  ...overrides,
});

describe('toast reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      toasts: [],
    };
  });

  it('should add a toast (up to limit)', () => {
    const action = {
      type: 'ADD_TOAST',
      toast: createToast('1'),
    };

    const state = reducer(initialState, action as any);
    expect(state.toasts.length).toBe(1);
    expect(state.toasts[0].id).toBe('1');
  });

  it('should update a toast', () => {
    const stateWithToast = {
      toasts: [createToast('1')],
    };

    const action = {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated Title' },
    };

    const state = reducer(stateWithToast, action as any);
    expect(state.toasts[0].title).toBe('Updated Title');
  });

  it('should dismiss a specific toast (set open to false)', () => {
    const stateWithToast = {
      toasts: [createToast('1')],
    };

    const action = {
      type: 'DISMISS_TOAST',
      toastId: '1',
    };

    const state = reducer(stateWithToast, action as any);
    expect(state.toasts[0].open).toBe(false);
  });

  it('should dismiss all toasts if no id is given', () => {
    const stateWithToasts = {
      toasts: [createToast('1'), createToast('2')],
    };

    const action = {
      type: 'DISMISS_TOAST',
    };

    const state = reducer(stateWithToasts, action as any);
    expect(state.toasts.every((t) => !t.open)).toBe(true);
  });

  it('should remove a toast by ID', () => {
    const stateWithToasts = {
      toasts: [createToast('1'), createToast('2')],
    };

    const action = {
      type: 'REMOVE_TOAST',
      toastId: '1',
    };

    const state = reducer(stateWithToasts, action as any);
    expect(state.toasts.length).toBe(1);
    expect(state.toasts[0].id).toBe('2');
  });

  it('should remove all toasts if no ID is given', () => {
    const stateWithToasts = {
      toasts: [createToast('1'), createToast('2')],
    };

    const action = {
      type: 'REMOVE_TOAST',
    };

    const state = reducer(stateWithToasts, action as any);
    expect(state.toasts.length).toBe(0);
  });
});
