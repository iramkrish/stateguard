import { renderHook, act } from '@testing-library/react-hooks';
import { useShallowEqualState } from '../src/hooks/useShallowEqualState';

describe('useShallowEqualState', () => {
  it('does not update if shallow equal', () => {
    const { result } = renderHook(() => useShallowEqualState({ a: 1 }));
    const set = result.current[1];

    act(() => {
      set({ a: 1 });
    });

    expect(result.current[0]).toEqual({ a: 1 });
  });

  it('updates if shallow unequal', () => {
    const { result } = renderHook(() => useShallowEqualState({ a: 1 }));
    const set = result.current[1];

    act(() => {
      set({ a: 2 });
    });

    expect(result.current[0]).toEqual({ a: 2 });
  });
});
