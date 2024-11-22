import { MutableRefObject, RefObject } from 'react';

export const getValues = <T>(
  refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>
) => (): T => {
  const values = {} as T;

  for (const fieldName in refs.current) {
    if (Object.prototype.hasOwnProperty.call(refs.current, fieldName)) {
      const ref = refs.current[fieldName as keyof T];
      if (ref?.current) {
        values[fieldName as keyof T] = ref.current.value as unknown as T[keyof T];
      }
    }
  }

  return values;
};
