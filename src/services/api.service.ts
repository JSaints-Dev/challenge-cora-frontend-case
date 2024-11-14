import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getToken, removeToken } from "./token.service";
import { ApiResponse, handleApiResponse, handleApiError } from "./api.utils";
import { routes } from "../router";

export class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = getToken();

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          removeToken();
          window.location.pathname !== routes.LOGIN
            ? (window.location.href = routes.LOGIN)
            : null;
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<T>(url);
      return handleApiResponse<T>(response);
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  }

  async post<T, D>(url: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<T>(url, data);
      return handleApiResponse<T>(response);
    } catch (error) {
      return handleApiError(error as AxiosError);
    }
  }
}
