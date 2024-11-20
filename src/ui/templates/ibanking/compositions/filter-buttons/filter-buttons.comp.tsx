import { Button } from "@jsaints-dev/cora-ui";
import { FilterButtonsProps } from "./filter-buttons.types";
import { ComponentProps } from "react";
import './filter-buttons.styles.css';

export type FilterButtonProps = {
  currentFilter: boolean;
  onClick: () => void;
} & ComponentProps<"button">;

function FilterButton({
  currentFilter,
  onClick,
  children,
  ...props
}: FilterButtonProps) {
  return (
    <Button
      onClick={onClick}
      data-active={currentFilter}
      className="rounded-full bg-secondary text-primary hover:bg-primary/10 data-[active=true]:bg-primary data-[active=true]:text-secondary hover:data-[active=true]:bg-primary/90 transition-colors duration-300"
      {...props}
    >
      {children}
    </Button>
  );
}

export function FilterButtons({
  currentFilter,
  onFilterChange,
}: FilterButtonsProps) {
  return (
    <div className="transactions__container__filter__transaction">
      <FilterButton
        onClick={() => onFilterChange("ALL")}
        currentFilter={currentFilter === "ALL"}
      >
        Todos
      </FilterButton>
      <FilterButton
        onClick={() => onFilterChange("DEBIT")}
        currentFilter={currentFilter === "DEBIT"}
      >
        Débito
      </FilterButton>
      <FilterButton
        onClick={() => onFilterChange("CREDIT")}
        currentFilter={currentFilter === "CREDIT"}
      >
        Crédito
      </FilterButton>
    </div>
  );
}
