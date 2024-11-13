import { IPageLogoProps } from "./page-logo.types";
import "./page-logo.styles.css";

export function PageLogo(props: IPageLogoProps) {
  return <img className="page__logo" {...props} />
}
