import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import HomePage from "../pages/home/home.page";
import TodoPage from "../pages/todo/todo.page";

export const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <HomePage />,
  },
  {
    path: routes.TODO,
    element: <TodoPage />,
  }
])
