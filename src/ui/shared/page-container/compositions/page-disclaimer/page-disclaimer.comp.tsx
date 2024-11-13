import { IPageDisclaimerProps } from "./page-disclaimer.types";
import "./page-disclaimer.styles.css";

export function PageDisclaimer(props: IPageDisclaimerProps) {
  return <p className="page__disclaimer" {...props} />
}
