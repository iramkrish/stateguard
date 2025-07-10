export function shallowEqual<T extends Record<PropertyKey, unknown>>(
  objA: T,
  objB: T
): boolean {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  const keysA = Reflect.ownKeys(objA);
  const keysB = Reflect.ownKeys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;

    if (!Object.is(objA[key as keyof T], objB[key as keyof T])) {
      return false;
    }
  }

  return true;
}
