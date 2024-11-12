import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../services/token.service";
import { routes } from "../router/routes";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate(routes.IBANKING);
    }
  }, [navigate]);
};
