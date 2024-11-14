import { ComponentProps, ReactNode } from "react";
import { ITodoTask, ITodoTasksStatus } from "../todo-list/todo-list.types";

export type ITodoItemContextProps = {
  item: ITodoTask;
  handleChangeStatus: () => void;
  toggleItemStatus: (status: ITodoTasksStatus) => ITodoTasksStatus;
};

export type ITodoItemProviderProps = { item: ITodoTask; children: ReactNode };

export type ITodoItemRootProps = {
  children: ReactNode;
};

export type ITodoItemEmptyProps = {
  children: ReactNode;
} & ComponentProps<"span">;

export type ITodoItemContainerProps = {
  children: ReactNode;
} & ComponentProps<"li">;

export type ITodoItemTitleProps = {
  children: ReactNode;
} & ComponentProps<"h3">;

export type ITodoItemIndexProps = {
  children: ReactNode;
} & ComponentProps<"span">;

export type ITodoItemContentProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export type ITodoItemHeaderProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export type ITodoItemStatusProps = ComponentProps<"span">;

export type ITodoItemDescriptionProps = {
  children: ReactNode;
} & ComponentProps<"p">;

export type ITodoItemLinksContainerProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export type ITodoItemLinkProps = {
  children: ReactNode;
} & ComponentProps<"a">;

export type ITodoItemActionsContainerProps = {
  children: ReactNode;
} & ComponentProps<"div">;

export type ITodoItemActionProps = {
  children: ReactNode;
} & ComponentProps<"button">;
