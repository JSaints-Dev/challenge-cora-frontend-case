import { forwardRef } from "react";
import "./input-search.styles.css";
import { InputSearchProps } from "./input-search.types";

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ handleSubmit, ...props }, ref) => {
    return (
      <form className="todo__search" onSubmit={handleSubmit}>
        <input ref={ref} className="todo__search__input" {...props} />
        <button type="submit" className="todo__search__button">
          buscar
        </button>
      </form>
    );
  }
);

InputSearch.displayName = "InputSearch";
