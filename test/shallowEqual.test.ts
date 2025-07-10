import { shallowEqual } from '../src/utils/shallowEqual';

describe('shallowEqual', () => {
  it('returns true for same object reference', () => {
    const obj = { a: 1 };
    expect(shallowEqual(obj, obj)).toBe(true);
  });

  it('returns true for shallow equal objects', () => {
    expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('returns false for objects with different keys', () => {
    expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('returns false for objects with different values', () => {
    expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns false for different types', () => {
    expect(shallowEqual({ a: 1 }, [1])).toBe(false);
  });
});
