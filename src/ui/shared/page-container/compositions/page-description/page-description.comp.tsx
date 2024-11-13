import { IPageDescriptionProps } from "./page-description.types";
import "./page-description.styles.css";

export function PageDescription(props: IPageDescriptionProps) {
  return <p className="page__description" {...props} />
}
