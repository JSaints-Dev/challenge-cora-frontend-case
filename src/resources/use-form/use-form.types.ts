import { FormEvent } from "react";

export type IFieldError = {
  message: string;
};

export type IFormState<T> = {
  errors: Partial<Record<keyof T, IFieldError>>;
};

export type IUseFormReturn<T> = {
  register: (name: keyof T) => {
    ref: React.RefObject<HTMLInputElement>;
    name: string;
  };
  handleSubmit: (callback: (data: T) => void) => (e: FormEvent<HTMLFormElement>) => void;
  reset: () => void;
  setValue: (name: keyof T, value: string) => void;
  setError: (name: keyof T, error: IFieldError) => void;
  clearErrors: (name?: keyof T) => void;
  getValues: () => T;
  setFocus: (name: keyof T) => void;
  formState: IFormState<T>;
};
