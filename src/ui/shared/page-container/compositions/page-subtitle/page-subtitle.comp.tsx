import { IPageSubtitleProps } from "./page-subtitle.types";
import "./page-subtitle.styles.css";

export function PageSubtitle(props: IPageSubtitleProps) {
  return <h2 className="page__subtitle" {...props} />
}
