import { MutableRefObject, RefObject } from 'react';

export const reset = <T>(
  refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>,
  defaultValues: Partial<T> | undefined,
  clearErrors: (name?: keyof T) => void
) => () => {
  if (defaultValues) {
    Object.keys(defaultValues).forEach(key => {
      const ref = refs.current[key as keyof T];
      if (ref && ref.current) {
        ref.current.value = defaultValues[key as keyof T] as string;
      }
    });
  }
  clearErrors();
};
