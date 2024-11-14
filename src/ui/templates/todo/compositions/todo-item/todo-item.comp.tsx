import {
  ITodoItemActionProps,
  ITodoItemActionsContainerProps,
  ITodoItemContainerProps,
  ITodoItemContentProps,
  ITodoItemDescriptionProps,
  ITodoItemEmptyProps,
  ITodoItemHeaderProps,
  ITodoItemIndexProps,
  ITodoItemLinkProps,
  ITodoItemLinksContainerProps,
  ITodoItemRootProps,
  ITodoItemStatusProps,
  ITodoItemTitleProps,
} from "./todo-item.types";
import "./todo-item.styles.css";
import { classNames } from "../../../../../resources";
import { useTodoItem } from "./use-todo-item";

export function TodoItemRoot({ children }: ITodoItemRootProps) {
  return <ul className="todo__list">{children}</ul>;
}

export function TodoItemEmpty({ children, ...props }: ITodoItemEmptyProps) {
  return (
    <span className="todo__list__empty" {...props}>
      {children}
    </span>
  );
}

export function TodoItemContainer({
  children,
  ...props
}: ITodoItemContainerProps) {
  return (
    <li className="todo__item__container" {...props}>
      {children}
    </li>
  );
}

export function TodoItemTitle({ children, ...props }: ITodoItemTitleProps) {
  return (
    <h3 className="todo__item__title" {...props}>
      {children}
    </h3>
  );
}

export function TodoItemIndex({ children, ...props }: ITodoItemIndexProps) {
  return (
    <span className="todo__item__title" {...props}>
      {children}
    </span>
  );
}

export function TodoItemContent({ children, ...props }: ITodoItemContentProps) {
  return (
    <div className="todo__item__content" {...props}>
      {children}
    </div>
  );
}

export function TodoItemHeader({ children, ...props }: ITodoItemHeaderProps) {
  return (
    <div className="todo__item__header" {...props}>
      {children}
    </div>
  );
}

export function TodoItemStatus({ ...props }: ITodoItemStatusProps) {
  const { item } = useTodoItem();
  return (
    <span className={classNames("todo__item__status", item.status)} {...props}>
      {item.status}
    </span>
  );
}

export function TodoItemDescription({
  children,
  ...props
}: ITodoItemDescriptionProps) {
  return (
    <p className="todo__item__description" {...props}>
      {children}
    </p>
  );
}

export function TodoItemLinksContainer({
  children,
  ...props
}: ITodoItemLinksContainerProps) {
  return (
    <div className="todo__item__links__container" {...props}>
      {children}
    </div>
  );
}

export function TodoItemLink({ children, ...props }: ITodoItemLinkProps) {
  return (
    <a className="todo__item_link" {...props}>
      {children}
    </a>
  );
}

export function TodoItemActionsContainer({
  children,
  ...props
}: ITodoItemActionsContainerProps) {
  return (
    <div className="todo__item__actions__container" {...props}>
      {children}
    </div>
  );
}

export function TodoItemAction({ children, ...props }: ITodoItemActionProps) {
  return (
    <button className="todo__item__action" {...props}>
      {children}
    </button>
  );
}

export function TodoItemActionChangeStatus({
  ...props
}: Omit<ITodoItemActionProps, "onClick" | "children">) {
  const { handleChangeStatus, toggleItemStatus, item } = useTodoItem();
  return (
    <TodoItemAction {...props} onClick={handleChangeStatus}>
      change to{" "}
      <strong>
        <u>{toggleItemStatus(item.status)}</u>
      </strong>
    </TodoItemAction>
  );
}
