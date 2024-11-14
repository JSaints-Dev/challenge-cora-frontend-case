import { IListItem } from "../../../../../services";

export type TransactionsHeaderProps = {
  date: string;
  currentBalance: IListItem["amount"];
}
