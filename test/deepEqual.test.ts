import { describe, it, expect } from 'vitest';
import { deepEqual } from '../src/utils/deepEqual';

describe('deepEqual', () => {
  it('returns true for identical objects', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
  });

  it('returns false for objects with different values', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
  });

  it('returns false for objects with different keys', () => {
    expect(deepEqual({ a: 1 }, { b: 1 })).toBe(false);
  });

  it('returns true for identical arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('returns false for arrays with different values', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 4])).toBe(false);
  });

  it('returns false for different types', () => {
    expect(deepEqual({ a: 1 }, [1])).toBe(false);
  });
});