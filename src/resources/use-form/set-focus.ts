import { MutableRefObject, RefObject } from "react";

export const setFocus = <T>(
  refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>
) => (name: keyof T) => {
  if (refs.current[name] && refs.current[name].current) {
    refs.current[name].current!.focus();
  }
};
