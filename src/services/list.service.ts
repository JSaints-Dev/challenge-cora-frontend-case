import { ApiService } from "./api.service";
import { ApiResponse } from "./api.utils";

export type IListResponse = {
  results: {
    items: {
      id: string;
      description: string;
      label: string;
      entry: "DEBIT" | "CREDIT";
      amount: number;
      name: string;
      dateEvent: string;
      status: string;
    }[];
    date: string;
  }[];
  itemsTotal: number;
};

const apiService = new ApiService(import.meta.env.VITE_API_URL);

export const ListService = async (): Promise<ApiResponse<IListResponse>> => {
  return await apiService.get<IListResponse>("/list");
};
