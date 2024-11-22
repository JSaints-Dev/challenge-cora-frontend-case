import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { ZodSchema } from "zod";
import { IUseFormReturn, IFieldError, IFormState } from "./use-form.types";
import { reset } from "./reset";
import { setValue } from "./set-value";
import { getValues } from "./get-values";
import { setFocus } from "./set-focus";
import { register } from "./register";
import { handleSubmit } from "./handle-submit";

/**
 * Hook personalizado para gerenciar formulários baseada no react-hook-form,.
 * com o intuito de mostrar meu conhecimento em trabalhar com formulários.
 * @template T - Tipo dos valores do formulário.
 * @param {Partial<T>} [defaultValues] - Valores padrão para inicializar o formulário.
 * @param {ZodSchema<T>} [schema] - Esquema de validação opcional usando Zod.
 */
export function useForm<T extends Record<string, unknown>>(
  defaultValues?: Partial<T>,
  schema?: ZodSchema<T>
): IUseFormReturn<T> {
  const refs = useRef<Record<keyof T, React.RefObject<HTMLInputElement>>>(
    {} as Record<keyof T, React.RefObject<HTMLInputElement>>
  );
  const [formState, setFormState] = useState<IFormState<T>>({ errors: {} });

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        const ref = refs.current[key as keyof T];
        if (ref && ref.current) {
          ref.current.value = defaultValues[key as keyof T] as string;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetFormState = useCallback((newState: IFormState<T>) => {
    setFormState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  const setError = useCallback((name: keyof T, error: IFieldError) => {
    const newErrors = { ...formState.errors, [name]: error };
    handleSetFormState({ errors: newErrors });
  }, [formState.errors, handleSetFormState]);

  const clearErrors = useCallback((name?: keyof T) => {
    if (name) {
      const newErrors = { ...formState.errors };
      delete newErrors[name];
      handleSetFormState({ errors: newErrors });
      return;
    }
    handleSetFormState({ errors: {} });
  }, [formState.errors, handleSetFormState]);




  return useMemo(
    () => ({
      register: register(refs),
      handleSubmit: handleSubmit(refs, schema, handleSetFormState),
      reset: reset(refs, defaultValues, clearErrors),
      setValue: setValue(refs),
      setError,
      clearErrors,
      getValues: getValues(refs),
      setFocus: setFocus(refs),
      formState,
    }),
    [schema, handleSetFormState, defaultValues, setError, clearErrors, formState]
  );
}
