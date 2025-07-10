export function deepEqual(
  a: unknown,
  b: unknown,
  visited = new WeakMap()
): boolean {
  if (Object.is(a, b)) return true;

  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object' || a === null || b === null) return false;

  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Handle circular references
  if (visited.has(a)) return visited.get(a) === b;
  visited.set(a, b);

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    const valA = (a as Record<string, unknown>)[key];
    const valB = (b as Record<string, unknown>)[key];
    if (!deepEqual(valA, valB, visited)) return false;
  }

  return true;
}
