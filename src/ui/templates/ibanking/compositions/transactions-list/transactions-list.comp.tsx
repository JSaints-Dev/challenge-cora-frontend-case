import { Fragment } from "react";
import debitIcon from "../../../../../assets/debit.svg";
import creditIcon from "../../../../../assets/credit.svg";
import { formatCurrency, formatDateTime, sortDate } from "../../../../../utils";
import { TransactionsHeader } from "../transactions-header/transactions-header.comp";
import { TransactionsTable } from "../transactions-table";
import { classNames } from "../../../../../resources";
import { TransactionsListProps } from "./transactions-list.types";



function handleFormatCurrency(value: number, entry: string) {
  const _value = formatCurrency(value);
  return entry === "CREDIT" ? `+ ${_value}` : _value;
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <section className="transactions__container__list__container">
      {transactions.map((transaction) => (
        <Fragment key={transaction.date}>
          <TransactionsHeader date={transaction.date} currentBalance={transaction.currentBalance} />
          <div>
            <div className="transactions__line" />
            <div className="transactions__card">
              <TransactionsTable.Root>
                <TransactionsTable.Body>
                  {transaction.items
                    .slice()
                    .sort((a, b) => sortDate(a.dateEvent, b.dateEvent))
                    .map((item) => (
                      <TransactionsTable.Row key={item.id}>
                        <TransactionsTable.Cell width="5%">
                          <img
                            src={item.entry === "DEBIT" ? debitIcon : creditIcon}
                            alt={item.entry}
                            className="transactions__icon"
                          />
                        </TransactionsTable.Cell>
                        <TransactionsTable.Cell width="30%">
                          <div className={classNames("text__table__body", item.entry, "ellipsis")}>
                            {item.name}
                          </div>
                        </TransactionsTable.Cell>
                        <TransactionsTable.Cell width="30%">
                          <span className="text__table__body">{item.label}</span>
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
                              item.entry === "DEBIT" && "text__decoration__line__through"
                            )}
                          >
                            {handleFormatCurrency(item.amount, item.entry)}
                          </span>
                        </TransactionsTable.Cell>
                      </TransactionsTable.Row>
                    ))}
                </TransactionsTable.Body>
              </TransactionsTable.Root>
            </div>
            <div className="transactions__line" />
          </div>
        </Fragment>
      ))}
    </section>
  );
}
