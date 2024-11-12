export type ITodoTypes = "pending" | "done";

export type ITodoItem = {
  id: string;
  ref: string;
  title: string;
  description: JSX.Element;
  status: ITodoTypes;
  required: boolean;
  links?: { name: string; url?: string, link?: string }[];
}
