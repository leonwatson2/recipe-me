
function isObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === "object";
}

export function deepEqual<T>(x: T, y: T): boolean {
  if (x === y) return true;

  const notObjects = !isObject(x) || !isObject(y);
  if (notObjects) return false;

  const keysX = Object.keys(x) as Array<keyof T>;
  const keysY = Object.keys(y) as Array<keyof T>;

  if (keysX.length !== keysY.length) return false;

  for (const key of keysX) {
    if (!keysY.includes(key) || !deepEqual(x[key], y[key])) {
      return false;
    }
  }

  return true;

}

export function isArray(value: any): value is Array<any> {
  if (Array.isArray(value)) return true;
  return false;
}
