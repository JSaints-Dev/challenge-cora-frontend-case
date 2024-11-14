import {
  ITransactionsTableBodyProps,
  ITransactionsTableCellProps,
  ITransactionsTableRootProps,
  ITransactionsTableRowProps,
} from "./transactions-table.types";

import "./transactions-table.styles.css";
import { classNames } from "../../../../../resources";

export function TransactionsTableRoot({
  children,
  ...props
}: ITransactionsTableRootProps) {
  return (
    <table className="transactions__table__root" {...props}>
      {children}
    </table>
  );
}

export function TransactionsTableBody({
  children,
  ...props
}: ITransactionsTableBodyProps) {
  return <tbody {...props}>{children}</tbody>;
}

export function TransactionsTableRow({
  children,
  ...props
}: ITransactionsTableRowProps) {
  return <tr className="transactions__table__row" {...props}>{children}</tr>;
}

export function TransactionsTableCell({
  children,
  width,
  className,
  ...props
}: ITransactionsTableCellProps) {
  return (
    <td
      style={{
        width,
        maxWidth: width,
      }}
      className={classNames("transactions__table__cell", className)}
      {...props}
    >
      {children}
    </td>
  );
}
