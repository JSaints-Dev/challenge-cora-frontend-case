import { ITransactionsFilter } from "../../ibanking.types";

export type FilterButtonsProps = {
  currentFilter: ITransactionsFilter;
  onFilterChange: (filter: ITransactionsFilter) => void;
}
