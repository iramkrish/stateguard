import { useCallback, useState } from 'react';
import { deepEqual } from '../utils/deepEqual';

export function useDeepEqualState<T>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialValue);

  const setDeepState = useCallback((nextState: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next =
        typeof nextState === 'function' ? nextState(prev) : nextState;

      return deepEqual(prev, next) ? prev : next;
    });
  }, []);

  return [state, setDeepState];
}
