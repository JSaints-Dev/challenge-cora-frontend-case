import {
  ITransactionsTableBodyProps,
  ITransactionsTableCellProps,
  ITransactionsTableRootProps,
  ITransactionsTableRowProps,
} from "./transactions-table.types";

import "./transactions-table.styles.css";

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
  return <tr {...props}>{children}</tr>;
}

export function TransactionsTableCell({
  children,
  ...props
}: ITransactionsTableCellProps) {
  return <td {...props}>{children}</td>;
}
