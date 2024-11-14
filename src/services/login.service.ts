import { ApiService } from "./api.service";
import { setToken } from "./token.service";
import { ApiResponse } from "./api.utils";

export type ILoginResponse = {
  token: string;
};

export type ILoginParams = {
  cpf: string;
  password: string;
};

const apiService = new ApiService(import.meta.env.VITE_API_URL);

export const loginService = async ({
  cpf,
  password,
}: ILoginParams): Promise<ApiResponse<ILoginResponse>> => {
  const response = await apiService.post<ILoginResponse, ILoginParams>(
    "/auth",
    {
      cpf,
      password,
    }
  );

  if (response.status && response.data) {
    setToken(response.data.token);
  }

  return response;
};
