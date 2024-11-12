import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/token.service";
import { routes } from "./routes";

export const PrivateRoute = () => {
  const token = getToken();
  return token ? <Outlet /> : <Navigate to={routes.LOGIN} />;
};
