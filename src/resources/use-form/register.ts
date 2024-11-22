import { createRef, MutableRefObject, RefObject } from "react";

export const register =
  <T>(refs: MutableRefObject<Record<keyof T, RefObject<HTMLInputElement>>>) =>
  (name: keyof T) => {
    if (!refs.current[name]) {
      refs.current[name] = createRef();
    }
    return {
      ref: refs.current[name],
      name: name as string,
    };
  };
