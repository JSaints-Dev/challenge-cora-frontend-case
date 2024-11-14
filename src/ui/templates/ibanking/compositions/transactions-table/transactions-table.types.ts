import { ComponentProps } from "react";

export type ITransactionsTableRootProps = {
  children: React.ReactNode;
} & ComponentProps<"table">;

export type ITransactionsTableBodyProps = {
  children: React.ReactNode;
} & ComponentProps<"tbody">;

export type ITransactionsTableRowProps = {
  children: React.ReactNode;
} & ComponentProps<"tr">;

export type ITransactionsTableCellProps = {
  children: React.ReactNode;
} & ComponentProps<"td">;
