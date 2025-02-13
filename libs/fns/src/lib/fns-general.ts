export function getDefaultValue<T>(value: T, defaultValue: T, { condition = true }: { condition?: boolean } = {}): T {
  if (!condition) return value;
  return value === undefined ? defaultValue : value;
}
