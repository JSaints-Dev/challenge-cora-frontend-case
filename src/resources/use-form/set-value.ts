import { MutableRefObject, RefObject } from "react";

export const setValue = <T>(
  refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>
) => (name: keyof T, value: string) => {
  if (refs.current[name] && refs.current[name].current) {
    refs.current[name].current!.value = value;
  }
};
