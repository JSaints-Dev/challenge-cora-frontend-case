import { Button } from "../../../../shared";
import { FilterButtonsProps } from "./filter-buttons.types";

export function FilterButtons({ currentFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <div className="transactions__container__filter__transaction">
      <Button
        onClick={() => onFilterChange("ALL")}
        className="rounded__full"
        variant={`${currentFilter === "ALL" ? "primary" : "secondary"}`}
      >
        Todos
      </Button>
      <Button
        onClick={() => onFilterChange("DEBIT")}
        className="rounded__full"
        variant={`${currentFilter === "DEBIT" ? "primary" : "secondary"}`}
      >
        Débito
      </Button>
      <Button
        onClick={() => onFilterChange("CREDIT")}
        className="rounded__full"
        variant={`${currentFilter === "CREDIT" ? "primary" : "secondary"}`}
      >
        Crédito
      </Button>
    </div>
  );
}
