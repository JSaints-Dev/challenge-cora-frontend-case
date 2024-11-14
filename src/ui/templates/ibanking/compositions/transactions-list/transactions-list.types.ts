import { IListResponse } from "../../../../../services";

export type TransactionsListProps = {
  transactions: IListResponse["results"];
}
