import { ApiService } from "./api.service";
import { ApiResponse } from "./api.utils";

export type IListItem = {
  id: string;
  description: string;
  label: string;
  entry: "DEBIT" | "CREDIT";
  amount: number;
  name: string;
  dateEvent: string;
  status: string;
}

export type IListResponse = {
  results: {
    items: IListItem[];
    date: string;
    currentBalance: number;
  }[];
  itemsTotal: number;
};

const apiService = new ApiService(import.meta.env.VITE_API_URL);

export const ListService = async (): Promise<ApiResponse<IListResponse>> => {
  return await apiService.get<IListResponse>("/list");
};
