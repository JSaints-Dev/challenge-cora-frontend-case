import { ComponentProps } from "react";
import { classNames } from "../../../resources";
import "./button.styles.css";

export type ButtonProps = {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "outline__white"
    | "brand"
    | "brand__outline";
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "button__comp",
        `button__comp__${variant}`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
