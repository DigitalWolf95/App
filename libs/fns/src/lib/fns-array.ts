export function sortArray<T>(array: T[], key: keyof T, { mode = 'asc' }: { mode?: 'asc' | 'desc' } = {}) {
  return array.sort((a, b) => {
    if (!a[key] || !b[key]) return 0;

    if (mode === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
}

export function addOrUpdateEntityInArray<T extends object>(array: T[], entity: T, key: keyof T): T[] {
  const index = array.findIndex((item) => item[key] === entity[key]);
  if (index === -1) {
    return [...array, entity];
  }
  return array.map((item) => (item[key] === entity[key] ? entity : item));
}

export function removeEntityFromArray<T extends object>(array: T[], entity: T, key: keyof T): T[] {
  return array.filter((item) => item[key] !== entity[key]);
}

export function changeArrayElementPosition<T extends object>(array: T[], fromIndex: number, toIndex: number): T[] {
  const arrayCopy = [...array];
  const [removed] = arrayCopy.splice(fromIndex, 1);
  arrayCopy.splice(toIndex, 0, removed);
  return arrayCopy;
}

export function findElementInArrayByValue<T extends object>(array?: T[], key?: keyof T, value?: any): T | undefined {
  if (!array || !key) return undefined;
  return array.find((element) => element[key] === value);
}
