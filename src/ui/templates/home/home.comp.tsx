import { Link } from "react-router-dom";
import { routes } from "../../../router/routes";
import logoImage from "../../../assets/logo.svg";
import { PageContainer } from "../../shared";
import "./home.styles.css";

export function HomeTemplate() {
  return (
    <PageContainer.Root>
      <PageContainer.Logo src={logoImage} alt="Cora" title="Cora" />
      <PageContainer.Title>Hey There &#128075;</PageContainer.Title>
      <PageContainer.Subtitle>Tenha um ótimo teste!!!</PageContainer.Subtitle>
      <PageContainer.Description>
        <strong>Vamos começar?</strong> Como você faria os botões abaixo abrirem
        as suas respectivas páginas? (Comece pela <strong>TODO LIST</strong>,
        pois nela contem os próximos passos)
      </PageContainer.Description>

      <PageContainer.Disclaimer>
        &#9888; Você pode encontrar alguns <strong>erros</strong> no meio do
        caminho, não desanime e fique atento para conseguir{" "}
        <strong>visualizar</strong> e <strong>renderizar</strong> as páginas.
      </PageContainer.Disclaimer>

      <PageContainer.Content>
        <ul className="nav__container">
          <li>
            <Link className="link" to={routes.TODO}>
              TO-DO LIST
            </Link>
          </li>

          <li>
            <Link className="link" to={routes.IBANKING}>
              IBANKING
            </Link>
          </li>
        </ul>
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
