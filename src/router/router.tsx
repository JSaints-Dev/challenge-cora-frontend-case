import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import HomePage from "../pages/home/home.page";
import TodoPage from "../pages/todo/todo.page";
import LoginPage from "../pages/login/login.page";

export const router = createBrowserRouter([
  {
    path: routes.HOME,
    element: <HomePage />,
  },
  {
    path: routes.TODO,
    element: <TodoPage />,
  },
  {
    path: routes.LOGIN,
    element: <LoginPage />,
  }
])
