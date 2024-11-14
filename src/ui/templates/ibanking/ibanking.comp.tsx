import { Fragment, useEffect, useState } from "react";
import { IListItem, IListResponse, ListService } from "../../../services";
import { Button, PageContainer } from "../../shared";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  sortDate,
} from "../../../utils";
import { TransactionsTable } from "./compositions/transactions-table";
import { classNames } from "../../../resources";
import debitIcon from "../../../assets/debit.svg";
import creditIcon from "../../../assets/credit.svg";
import { ITransactionsFilter, ITransactionsFiltered } from "./ibanking.types";
import "./ibanking.styles.css";

function handleFormatCurrency(
  value: IListItem["amount"],
  entry: IListItem["entry"]
) {
  const _value = formatCurrency(value);
  return entry === "CREDIT" ? `+ ${_value}` : _value;
}

function handleSortTransactions(transactions: IListResponse | undefined) {
  return transactions?.results
    ?.slice()
    .sort((dateA, dateB) => sortDate(dateA.date, dateB.date));
}

export function IBankingTemplate() {
  const [transactions, setTransactions] = useState<IListResponse | undefined>(
    undefined
  );

  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransactionsFiltered | undefined
  >();

  const sortedTransactions = handleSortTransactions(
    filteredTransactions?.transactions
  );

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

  return (
    <PageContainer.Root>
      <PageContainer.Content>
        <section className="transactions__container">
          <div className="transactions__container__filter__transaction">
            <Button
              onClick={() => handleFilterTransactions("ALL")}
              className="rounded__full"
              variant={`${
                filteredTransactions?.filter === "ALL" ? "primary" : "secondary"
              }`}
            >
              Todos
            </Button>
            <Button
              onClick={() => handleFilterTransactions("DEBIT")}
              className="rounded__full"
              variant={`${
                filteredTransactions?.filter === "DEBIT"
                  ? "primary"
                  : "secondary"
              }`}
            >
              Débito
            </Button>
            <Button
              className="rounded__full"
              variant={`${
                filteredTransactions?.filter === "CREDIT"
                  ? "primary"
                  : "secondary"
              }`}
              onClick={() => handleFilterTransactions("CREDIT")}
            >
              Crédito
            </Button>
          </div>
          <section className="transactions__container__list__container">
            {sortedTransactions?.map((transaction) => (
              <Fragment key={transaction.date}>
                <div className="transactions__header__day__container">
                  <span className="text__header bold">
                    {formatDate(transaction.date)}
                  </span>
                  <span className="text__header">
                    Saldo do dia{" "}
                    <strong>
                      {formatCurrency(transaction.currentBalance)}
                    </strong>
                  </span>
                </div>

                <div>
                  <div className="transactions__line" />
                  <div className="transactions__card">
                    <TransactionsTable.Root>
                      <TransactionsTable.Body>
                        {transaction?.items
                          ?.slice()
                          .sort((a, b) => sortDate(a.dateEvent, b.dateEvent))
                          .map((item) => {
                            return (
                              <TransactionsTable.Row key={item.id}>
                                <TransactionsTable.Cell width="5%">
                                  <img
                                    src={
                                      item.entry === "DEBIT"
                                        ? debitIcon
                                        : creditIcon
                                    }
                                    alt={item.entry}
                                    className="transactions__icon"
                                  />
                                </TransactionsTable.Cell>
                                <TransactionsTable.Cell width="30%">
                                  <div
                                    className={classNames(
                                      "text__table__body",
                                      item.entry,
                                      "ellipsis"
                                    )}
                                  >
                                    {item.name}
                                  </div>
                                </TransactionsTable.Cell>
                                <TransactionsTable.Cell width="30%">
                                  <span className="text__table__body">
                                    {item.label}
                                  </span>
                                </TransactionsTable.Cell>
                                <TransactionsTable.Cell width="20%">
                                  <span className="text__table__body text__align__center">
                                    {formatDateTime(item.dateEvent)}
                                  </span>
                                </TransactionsTable.Cell>
                                <TransactionsTable.Cell width="20%">
                                  <span
                                    className={classNames(
                                      "text__table__body bold text__align__right",
                                      item.entry,
                                      item.entry === "DEBIT" &&
                                        "text__decoration__line__through"
                                    )}
                                  >
                                    {handleFormatCurrency(
                                      item.amount,
                                      item.entry
                                    )}
                                  </span>
                                </TransactionsTable.Cell>
                              </TransactionsTable.Row>
                            );
                          })}
                      </TransactionsTable.Body>
                    </TransactionsTable.Root>
                  </div>
                  <div className="transactions__line" />
                </div>
              </Fragment>
            ))}
          </section>
        </section>
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
