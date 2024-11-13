import { Children, FormEvent, useState } from "react";
import logoImage from "../../../assets/logo.svg";
import "./todo.styles.css";
import { TODO_LIST } from "./todo.constants";
import { ITodoTask, ITodoTasksStatus } from "./todo.types";
import { PageContainer } from "../../shared";

function toggleTaskStatus(status: ITodoTasksStatus): ITodoTasksStatus {
  return status === "done" ? "pending" : "done";
}

export function TodoTemplate() {
  const [tasks, setTasks] = useState(TODO_LIST);

  function handleSearch(e: FormEvent<HTMLFormElement>, todoList: ITodoTask[]) {
    e.preventDefault();
    const search = (e.target as HTMLFormElement).search.value;

    if (search === "") {
      setTasks(todoList);
      return;
    }

    setTasks(
      todoList.filter((task) => {
        const childrenArray = Children.toArray(
          task.description.props?.children
        );
        const stringChildren = childrenArray?.filter(
          (child) => typeof child === "string"
        );
        return (
          task.title.includes(search) ||
          stringChildren.some((child) => child.includes(search))
        );
      })
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  }

  function handleChangeTaskStatus(TaskId: string) {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === TaskId) {
          return {
            ...task,
            status: toggleTaskStatus(task.status),
          };
        }
        return task;
      });
    });
  }

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
        <div className="todo__wrapper">
          <form
            className="todo__search"
            onSubmit={(e) => handleSearch(e, TODO_LIST)}
          >
            <input id="search" placeholder="busca por texto..." />
            <button type="submit">buscar</button>
          </form>

          <ul className="todo__list">
            {tasks.length === 0 && (
              <span>
                <strong>Ops!!!</strong> Nenhum resultado foi encontrado
                &#128533;
              </span>
            )}
            {tasks?.map((task, i) => {
              return (
                <li key={task.id}>
                  <span>
                    {i + 1}
                    {task.required ? "*" : ""}.
                  </span>
                  <div className="todo__content">
                    <h3>
                      {task.title}
                      <span data-type={task.status} className="button__status">
                        {task.status}
                      </span>
                    </h3>
                    <p>{task.description}</p>

                    {task.links && task.links.length > 0 && (
                      <div className="todo__links">
                        {task?.links?.map((link) => (
                          <a key={link.name} target="_blank" href={link.url}>
                            {link.name}
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="todo__actions">
                      <button onClick={() => handleDeleteTask(task.id)}>
                        delete
                      </button>

                      <button onClick={() => handleChangeTaskStatus(task.id)}>
                        change to{" "}
                        <strong>
                          <u>{toggleTaskStatus(task.status)}</u>
                        </strong>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </PageContainer.Content>
    </PageContainer.Root>
  );
}
