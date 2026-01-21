'use client';

import { useState, useEffect, useCallback } from 'react';
import { Theme, ThemeContextType } from '@/types';
import { getStorageItem, setStorageItem } from '@/utils';

export const useTheme = (): ThemeContextType => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get theme from storage or system preference
    const storedTheme = getStorageItem<Theme>('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemTheme;

    setThemeState(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      setStorageItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  }, []);

  if (!mounted) return { theme: 'light', toggleTheme };

  return { theme, toggleTheme };
};
