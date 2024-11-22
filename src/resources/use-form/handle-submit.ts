import { FormEvent, MutableRefObject, RefObject } from 'react';
import { ZodSchema } from 'zod';
import { IFieldError, IFormState } from './use-form.types';

export const handleSubmit = <T>(
  refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>,
  schema: ZodSchema<T> | undefined,
  handleSetFormState: (newState: IFormState<T>) => void
) => (callback: (data: T) => void) => (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const data = Object.keys(refs.current).reduce((acc, key) => {
    const ref = refs.current[key as keyof T];
    if (ref?.current) {
      acc[key as keyof T] = ref.current.value as unknown as T[keyof T];
    }
    return acc;
  }, {} as T);

  if (schema) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = result.error.errors.reduce((acc, err) => {
        const fieldName = err.path[0] as keyof T;
        acc[fieldName] = { message: err.message };
        return acc;
      }, {} as Partial<Record<keyof T, IFieldError>>);
      handleSetFormState({ errors });
      return;
    }
  }

  handleSetFormState({ errors: {} });
  callback(data);
};
