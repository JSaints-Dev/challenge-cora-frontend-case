import logoImage from "../../../assets/logo.svg";
import { PageContainer } from "../../shared";
import { TodoList } from "./compositions";

export function TodoTemplate() {
  return (
    <PageContainer.Root>
      <PageContainer.Logo src={logoImage} alt="Cora" title="Cora" />
      <PageContainer.Title>Weekly to-do list &#128467;</PageContainer.Title>
      <PageContainer.Subtitle>
        Bem-vindo ao nosso produto <i>fake</i> de <strong>to-do</strong> list
      </PageContainer.Subtitle>
      <PageContainer.Description>
        Marque como{" "}
        <strong>
          <u>done</u>
        </strong>{" "}
        as tasks que você conseguir concluir (elas já precisam renderizar com o
        status <strong>done</strong>)
      </PageContainer.Description>
      <PageContainer.Disclaimer>
        Items obrigatórios marcados com arteristico (<strong>*</strong>)
      </PageContainer.Disclaimer>
      <PageContainer.Content>
        <TodoList />
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
