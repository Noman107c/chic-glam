'use client';

import { useState, useCallback } from 'react';

interface UseAsync<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true
): UseAsync<T> & { execute: () => Promise<void> } => {
  const [state, setState] = useState<UseAsync<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await asyncFunction();
      setState({ data: response, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [asyncFunction]);

  return { ...state, execute };
};
