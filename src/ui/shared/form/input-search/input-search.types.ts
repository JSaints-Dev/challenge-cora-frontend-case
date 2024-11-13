import { ComponentProps, FormEvent } from "react";

export type InputSearchProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
} & ComponentProps<"input">;
