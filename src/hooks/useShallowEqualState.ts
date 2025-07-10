import { useState, useCallback } from 'react';
import { shallowEqual } from '../utils/shallowEqual';

export function useShallowEqualState<T>(initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((nextState: T | ((prev: T) => T)) => {
    setState(prev => {
      const value = typeof nextState === 'function' ? (nextState as (prev: T) => T)(prev) : nextState;
      return shallowEqual(prev, value) ? prev : value;
    });
  }, []);

  return [state, setShallowState];
}