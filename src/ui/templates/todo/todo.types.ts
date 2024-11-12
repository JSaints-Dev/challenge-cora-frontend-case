export type ITodoTasksStatus = "pending" | "done";

export type ITodoTask = {
  id: string;
  ref: string;
  title: string;
  description: JSX.Element;
  status: ITodoTasksStatus;
  required: boolean;
  links?: { name: string; url?: string, link?: string }[];
}
