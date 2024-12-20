import { serialize as pluginSerialize } from 'object-to-formdata';

export function serialize(data: object) {
  return pluginSerialize(data, { dotsForObjectNotation: true });
}

// Deserialize form data with dots notation for object
export function deserialize<T extends object>(formData: FormData): Partial<T> {
  const result: any = {};

  formData.forEach((value, key) => {
    //console.log(key, value);
    let temp = result;
    const keys = key.split('.');

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    }
    temp[keys[keys.length - 1]] = value;
  });

  return result;
}

function createNestedObject(path: string, value: any): any {
  const keys = path.split('.');
  const result: any = {};

  let temp = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    temp[key] = {};
    temp = temp[key];
  }

  temp[keys[keys.length - 1]] = value;

  return result;
}
