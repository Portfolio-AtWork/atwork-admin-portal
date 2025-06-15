import { act, renderHook } from '@testing-library/react';

import useLocalStorage from '@/hooks/useLocalStorage'; // ajuste o caminho se necessário

describe('useLocalStorage', () => {
  const key = 'testKey';
  const initialValue = 'initial';

  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value if no localStorage value exists', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const [value] = result.current;
    expect(value).toBe(initialValue);
  });

  it('should use value from localStorage if it exists', () => {
    localStorage.setItem(key, JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage(key, initialValue));
    const [value] = result.current;
    expect(value).toBe('stored');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      const [, setValue] = result.current;
      setValue('newValue');
    });

    const [newStoredValue] = result.current;
    expect(newStoredValue).toBe('newValue');
    expect(localStorage.getItem(key)).toBe(JSON.stringify('newValue'));
  });

  it('should accept function updater', () => {
    const { result } = renderHook(() => useLocalStorage(key, 1));

    act(() => {
      const [, setValue] = result.current;
      setValue((prev) => prev + 1);
    });

    const [updatedValue] = result.current;
    expect(updatedValue).toBe(2);
    expect(localStorage.getItem(key)).toBe('2');
  });
});
