import { ReactElement } from "react";

export type ITodoTasksStatus = "pending" | "done";

export type ITodoTask = {
  id: string;
  ref: string;
  title: string;
  description: ReactElement;
  status: ITodoTasksStatus;
  required: boolean;
  links?: { name: string; url: string }[];
}
