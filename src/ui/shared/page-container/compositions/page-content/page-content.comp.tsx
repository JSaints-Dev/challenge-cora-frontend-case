import { IPageContentProps } from "./page-content.types";
import "./page-content.styles.css";

export function PageContent({ children }: IPageContentProps) {
  return <div className="page__content">{children}</div>;
}
