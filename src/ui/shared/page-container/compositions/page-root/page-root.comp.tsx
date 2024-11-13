import { IPageContainerProps } from "./page-root.types";
import "./page-root.styles.css";

export function PageRootContainer({children}: IPageContainerProps) {
  return (
    <main className="page__root__container">
      {children}
    </main>
  )
}

