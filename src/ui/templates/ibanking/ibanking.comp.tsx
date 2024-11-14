import { Fragment, useEffect, useState } from "react";
import { IListItem, IListResponse, ListService } from "../../../services";
import { PageContainer } from "../../shared";
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

import "./ibanking.styles.css";

export function IBankingTemplate() {
  const [transactions, setTransactions] = useState<IListResponse | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchTransactions() {
      const response = await ListService();

      if (response.status && response.data) {
        setTransactions(response.data);
      }
    }
    fetchTransactions();
  }, []);

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

  const sortedTransactions = handleSortTransactions(transactions);

  return (
    <PageContainer.Root>
      <PageContainer.Content>
        <section className="transactions__container">
          {sortedTransactions?.map((transaction) => (
            <Fragment key={transaction.date}>
              <div className="transactions__header__day__container">
                <span className="text__header bold">
                  {formatDate(transaction.date)}
                </span>
                <span className="text__header">
                  Saldo do dia{" "}
                  <strong>{formatCurrency(transaction.currentBalance)}</strong>
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
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
