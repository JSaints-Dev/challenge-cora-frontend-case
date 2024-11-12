import React, { useRef, useState, useEffect, useCallback, useMemo, FormEvent } from 'react';
import { ZodSchema } from 'zod';

type FieldError = {
  message: string;
};

type FormState<T> = {
  errors: Partial<Record<keyof T, FieldError>>;
};

type UseFormReturn<T> = {
  register: (name: keyof T) => {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
  };
  handleSubmit: (callback: (data: T) => void) => (e: FormEvent<HTMLFormElement>) => void;
  reset: () => void;
  setValue: (name: keyof T, value: string) => void;
  setError: (name: keyof T, error: FieldError) => void;
  clearErrors: (name?: keyof T) => void;
  getValues: () => T;
  setFocus: (name: keyof T) => void;
  formState: FormState<T>;
};

export function useForm<T extends Record<string, unknown>>(defaultValues?: Partial<T>, schema?: ZodSchema<T>): UseFormReturn<T> {
  const refs = useRef<Record<keyof T, React.RefObject<HTMLInputElement>>>({} as Record<keyof T, React.RefObject<HTMLInputElement>>);
  const [formState, setFormState] = useState<FormState<T>>({ errors: {} });

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach(key => {
        const ref = refs.current[key as keyof T];
        if (ref && ref.current) {
          ref.current.value = defaultValues[key as keyof T] as string;
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = useCallback((name: keyof T) => {
    if (!refs.current[name]) {
      refs.current[name] = React.createRef();
    }
    return {
      ref: refs.current[name],
      name: name as string,
    };
  }, []);

  const handleSubmit = useCallback((callback: (data: T) => void) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = Object.keys(refs.current).reduce((acc, key) => {
        const ref = refs.current[key as keyof T];
        if (ref && ref.current) {
          acc[key as keyof T] = ref.current.value as unknown as T[keyof T];
        }
        return acc;
      }, {} as T);

      if (schema) {
        const result = schema.safeParse(data);
        if (!result.success) {
          const errors = result.error.errors.reduce((acc, err) => {
            acc[err.path[0] as keyof T] = { message: err.message };
            return acc;
          }, {} as Partial<Record<keyof T, FieldError>>);
          setFormState(prevState => ({ ...prevState, errors }));
          return;
        }
      }

      setFormState(prevState => ({ ...prevState, errors: {} }));
      callback(data);
    };
  }, [schema]);

  const reset = useCallback(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach(key => {
        const ref = refs.current[key as keyof T];
        if (ref && ref.current) {
          ref.current.value = defaultValues[key as keyof T] as string;
        }
      });
    }
    setFormState({ errors: {} });
  }, [defaultValues]);

  const setValue = useCallback((name: keyof T, value: string) => {
    if (refs.current[name] && refs.current[name].current) {
      refs.current[name].current!.value = value;
    }
  }, []);

  const setError = useCallback((name: keyof T, error: FieldError) => {
    setFormState(prevState => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [name]: error,
      },
    }));
  }, []);

  const clearErrors = useCallback((name?: keyof T) => {
    setFormState(prevState => {
      const newErrors = { ...prevState.errors };
      if (name) {
        delete newErrors[name];
      } else {
        Object.keys(newErrors).forEach(key => {
          delete newErrors[key as keyof T];
        });
      }
      return { ...prevState, errors: newErrors };
    });
  }, []);

  const getValues = useCallback((): T => {
    const acc = {} as T;
    for (const key in refs.current) {
      if (Object.prototype.hasOwnProperty.call(refs.current, key)) {
        const ref = refs.current[key as keyof T];
        if (ref && ref.current) {
          acc[key as keyof T] = ref.current.value as unknown as T[keyof T];
        }
      }
    }
    return acc;
  }, []);

  const setFocus = useCallback((name: keyof T) => {
    if (refs.current[name] && refs.current[name].current) {
      refs.current[name].current!.focus();
    }
  }, []);

  return useMemo(() => ({
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    getValues,
    setFocus,
    formState,
  }), [register, handleSubmit, reset, setValue, setError, clearErrors, getValues, setFocus, formState]);
}
