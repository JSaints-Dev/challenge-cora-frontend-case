import {
  TodoItemAction,
  TodoItemActionChangeStatus,
  TodoItemActionsContainer,
  TodoItemContainer,
  TodoItemContent,
  TodoItemDescription,
  TodoItemEmpty,
  TodoItemHeader,
  TodoItemIndex,
  TodoItemLink,
  TodoItemLinksContainer,
  TodoItemRoot,
  TodoItemStatus,
  TodoItemTitle,
} from "./todo-item.comp";

export const TodoItem = {
  Root: TodoItemRoot,
  ItemContainer: TodoItemContainer,
  Title: TodoItemTitle,
  Index: TodoItemIndex,
  Content: TodoItemContent,
  Header: TodoItemHeader,
  Status: TodoItemStatus,
  Description: TodoItemDescription,
  LinksContainer: TodoItemLinksContainer,
  Link: TodoItemLink,
  ActionsContainer: TodoItemActionsContainer,
  Action: TodoItemAction,
  ActionChangeStatus: TodoItemActionChangeStatus,
  Empty: TodoItemEmpty,
};

export * from './todo-item.context';
export * from './use-todo-item';
