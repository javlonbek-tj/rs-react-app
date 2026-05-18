import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the default value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('reads an existing value from localStorage on init', () => {
    localStorage.setItem('key', 'stored');
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('stored');
  });

  it('updates state and localStorage when the setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => {
      result.current[1]('new value');
    });
    expect(result.current[0]).toBe('new value');
    expect(localStorage.getItem('key')).toBe('new value');
  });

  it('reads and writes using the correct key', () => {
    localStorage.setItem('myKey', 'hello');
    const { result } = renderHook(() => useLocalStorage('myKey', ''));
    expect(result.current[0]).toBe('hello');
    act(() => {
      result.current[1]('world');
    });
    expect(localStorage.getItem('myKey')).toBe('world');
  });

  it('does not mix values between different keys', () => {
    const { result: a } = renderHook(() => useLocalStorage('a', 'alpha'));
    const { result: b } = renderHook(() => useLocalStorage('b', 'beta'));
    expect(a.current[0]).toBe('alpha');
    expect(b.current[0]).toBe('beta');
  });
});
