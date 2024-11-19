import { PageContainer } from "../../shared";
import { FilterButtons } from "./compositions/filter-buttons/filter-buttons.comp";
import { TransactionsList } from "./compositions/transactions-list/transactions-list.comp";
import "./ibanking.styles.css";
import { useTransactions } from "./use-transactions";

export function IBankingTemplate() {
  const { transactions, filter, handleFilterTransactions } = useTransactions();

  return (
    <PageContainer.Root>
      <PageContainer.Content>
        <section className="transactions__container">
          {transactions?.length ? (
            <>
              {filter && <FilterButtons currentFilter={filter} onFilterChange={handleFilterTransactions} />}
              <TransactionsList transactions={transactions} />
            </>
          ) : (
            <div className="transactions__container__empty">
              <span className="text__empty">Ops! Não há transações disponíveis.</span>
            </div>
          )}
        </section>
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
