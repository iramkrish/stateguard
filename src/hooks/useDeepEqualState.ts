import { useState, useCallback } from 'react';
import { deepEqual } from '../utils/deepEqual';

export function useDeepEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setDeepState = useCallback((nextState: T | ((prev: T) => T)) => {
    setState(prev => {
      const value = typeof nextState === 'function' ? (nextState as (prev: T) => T)(prev) : nextState;
      return deepEqual(prev, value) ? prev : value;
    });
  }, []);

  return [state, setDeepState];
}