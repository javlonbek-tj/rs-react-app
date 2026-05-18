import { useState } from 'react';

export function useLocalStorage(key: string, defaultValue: string): [string, (value: string) => void] {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? defaultValue);

  function setStoredValue(newValue: string) {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  }

  return [value, setStoredValue];
}
