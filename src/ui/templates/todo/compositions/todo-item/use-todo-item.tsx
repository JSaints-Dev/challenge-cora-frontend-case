import { useContext } from "react";
import { TodoItemContext } from "./todo-item.context";

export const useTodoItem = () => {
  const context = useContext(TodoItemContext);
  if (!context) {
    throw new Error("useTodoItem must be used within a TodoItemProvider");
  }
  return context;
};
