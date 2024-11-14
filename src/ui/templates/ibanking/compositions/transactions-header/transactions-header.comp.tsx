import { formatCurrency, formatDate } from "../../../../../utils";
import { TransactionsHeaderProps } from "./transactions-header.types";

export function TransactionsHeader({ date, currentBalance }: TransactionsHeaderProps) {
  return (
    <div className="transactions__header__day__container">
      <span className="text__header bold">{formatDate(date)}</span>
      <span className="text__header">
        Saldo do dia <strong>{formatCurrency(currentBalance)}</strong>
      </span>
    </div>
  );
}
