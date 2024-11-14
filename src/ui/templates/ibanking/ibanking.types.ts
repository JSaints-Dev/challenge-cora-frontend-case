import { IListItem, IListResponse } from "../../../services";

export type ITransactionsFilter = "ALL" | IListItem["entry"];

export type ITransactionsFiltered = {
  filter: ITransactionsFilter;
  transactions: IListResponse;
};
