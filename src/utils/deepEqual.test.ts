import { describe, it, expect } from 'vitest';
import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  it('returns true for primitives that are strictly equal', () => {
    expect(deepEqual(42, 42)).toBe(true);
    expect(deepEqual('hello', 'hello')).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(NaN, NaN)).toBe(true);
  });

  it('returns false for different primitive types or values', () => {
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('returns true for deeply equal objects', () => {
    const a = { name: 'Ram', age: 30, details: { city: 'Chennai' } };
    const b = { name: 'Ram', age: 30, details: { city: 'Chennai' } };
    expect(deepEqual(a, b)).toBe(true);
  });

  it('returns false for objects with different keys or nested values', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(deepEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('returns true for deeply equal arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);
  });

  it('returns false for arrays with different values or orders', () => {
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('returns false if one is array and the other is object', () => {
    expect(deepEqual([1, 2, 3], { 0: 1, 1: 2, 2: 3 })).toBe(false);
  });

  it('handles circular references safely (optional test)', () => {
    type SelfRef = { foo: string; self?: SelfRef };

    const a: SelfRef = { foo: 'bar' };
    const b: SelfRef = { foo: 'bar' };
    a.self = a;
    b.self = b;

    expect(deepEqual(a, b)).toBe(true);
  });
});
