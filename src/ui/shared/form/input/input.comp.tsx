import { forwardRef } from "react";
import { classNames } from "../../../../resources";
import { InputProps } from "./input.types";
import './input.styles.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, name, id,...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="input__container">
        {label && <label htmlFor={inputId} className="input__label">{label}</label>}
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={classNames("input", error && "error")}
          {...props}
        />
        {error && <span className="input__error">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
