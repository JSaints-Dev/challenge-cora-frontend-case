// src/hooks/use-transactions.ts
import { useEffect, useState } from "react";
import { IListResponse, ListService } from "../../../services";
import { ITransactionsFilter, ITransactionsFiltered } from "./ibanking.types";
import { sortDate } from "../../../utils";

export function useTransactions() {
  const [transactions, setTransactions] = useState<IListResponse | undefined>(undefined);
  const [filteredTransactions, setFilteredTransactions] = useState<ITransactionsFiltered | undefined>();

  useEffect(() => {
    async function fetchTransactions() {
      const response = await ListService();
      if (response.status && response.data) {
        setTransactions(response.data);
        setFilteredTransactions({
          filter: "ALL",
          transactions: response.data,
        });
      }
    }
    fetchTransactions();
  }, []);

  function handleFilterTransactions(entry: ITransactionsFilter) {
    if (entry === "ALL" && transactions) {
      setFilteredTransactions({
        filter: "ALL",
        transactions: transactions,
      });
    }

    if (entry === "DEBIT" && transactions) {
      const filtered = transactions.results.reduce<IListResponse["results"]>(
        (acc, item) => {
          const filteredItems = item.items.filter(
            (item) => item.entry === "DEBIT"
          );
          filteredItems.length && acc.push({ ...item, items: filteredItems });
          return acc;
        },
        []
      );

      setFilteredTransactions({
        filter: "DEBIT",
        transactions: { results: filtered, itemsTotal: filtered.length },
      });
    }

    if (entry === "CREDIT" && transactions) {
      const filtered = transactions.results.reduce<IListResponse["results"]>(
        (acc, item) => {
          const filteredItems = item.items.filter(
            (item) => item.entry === "CREDIT"
          );
          filteredItems.length && acc.push({ ...item, items: filteredItems });
          return acc;
        },
        []
      );

      setFilteredTransactions({
        filter: "CREDIT",
        transactions: { results: filtered, itemsTotal: filtered.length },
      });
    }
  }

  const sortedTransactions = filteredTransactions?.transactions?.results
    ?.slice()
    .sort((dateA, dateB) => sortDate(dateA.date, dateB.date));

  return {
    transactions: sortedTransactions,
    filter: filteredTransactions?.filter,
    handleFilterTransactions,
  };
}
