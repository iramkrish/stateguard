import { useState, useCallback } from 'react';
import { shallowEqual } from '../utils/shallowEqual';

type Updater<T> = (prev: T) => T;

export function useShallowEqualState<T>(
  initialValue: T
): [T, (value: T | Updater<T>) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setShallowState = useCallback((nextState: T | Updater<T>) => {
    setState((prev) => {
      const value =
        typeof nextState === 'function'
          ? (nextState as Updater<T>)(prev)
          : nextState;
      return shallowEqual(prev, value) ? prev : value;
    });
  }, []);

  return [state, setShallowState];
}
