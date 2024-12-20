export function fnsObjectUpdateEntries<T extends object>(oldObject: T, newObject: Partial<T>) {
  return Object.keys(newObject).reduce(
    (acc, currentKey) => {
      const key = currentKey as keyof Partial<T>;
      return { ...acc, [currentKey]: newObject[key] };
    },
    { ...oldObject }
  );
}

export function fnsObjectFromArray<T extends object, K extends string | number | symbol>(array: T[], key: keyof T): { [key in K]: T } {
  return array.reduce((acc, current) => {
    return { ...acc, [current[key] as string]: current };
  }, {}) as { [key in K]: T };
}

export function fnsObjectMergeWithDefaults<T extends object>(defaults: T, values?: T): T {
  if (!values) return defaults;
  return { ...defaults, ...values };
}
