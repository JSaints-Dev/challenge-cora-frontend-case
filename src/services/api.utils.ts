import { AxiosResponse, AxiosError } from "axios";

export type ApiResponse<T> = {
  data?: T;
  status: boolean;
  message?: string[];
};

export const handleApiResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
  return {
    data: response.data,
    status: true,
    message: [],
  };
};

export const handleApiError = <T>(error: AxiosError): ApiResponse<T> => {
  const defaultMessage = [error.message];
  const responseMessage = error.response?.data;

  const message = Array.isArray(responseMessage)
    ? responseMessage
    : typeof responseMessage === 'string'
    ? [responseMessage]
    : defaultMessage;

  return {
    data: undefined,
    status: false,
    message,
  };
};
