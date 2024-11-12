import { api, apiPaths } from "./api";
import { setToken } from "./token.service";

type LoginResponse = {
  token: string;
};

export const login = async ({
  cpf,
  password,
}: {
  cpf: string;
  password: string;
}): Promise<void> => {
  try {
    const response = await api.post<LoginResponse>(apiPaths.AUTH, {
      cpf,
      password,
    });
    const { token } = response.data;
    setToken(token);
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};
