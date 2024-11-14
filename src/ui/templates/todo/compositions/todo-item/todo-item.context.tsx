import { createContext, useState } from "react";
import {
  ITodoItemContextProps,
  ITodoItemProviderProps,
} from "./todo-item.types";
import { ITodoTasksStatus } from "../todo-list/todo-list.types";

export const TodoItemContext = createContext<ITodoItemContextProps | undefined>(
  undefined
);

export const TodoItemProvider = ({
  item,
  children,
}: ITodoItemProviderProps) => {
  const [currentItem, setCurrentItem] = useState(item);

  const handleChangeStatus = () => {
    setCurrentItem((prevItem) => ({
      ...prevItem,
      status: toggleItemStatus(prevItem.status),
    }));
  };

  const toggleItemStatus = (status: ITodoTasksStatus): ITodoTasksStatus => {
    return status === "done" ? "pending" : "done";
  };

  return (
    <TodoItemContext.Provider
      value={{ item: currentItem, handleChangeStatus, toggleItemStatus }}
    >
      {children}
    </TodoItemContext.Provider>
  );
};
