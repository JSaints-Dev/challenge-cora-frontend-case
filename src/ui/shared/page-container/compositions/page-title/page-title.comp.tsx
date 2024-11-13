import { IPageTitleProps } from "./page-title.types";
import "./page-title.styles.css";

export function PageTitle(props: IPageTitleProps) {
  return <h1 className="page__title" {...props} />
}
