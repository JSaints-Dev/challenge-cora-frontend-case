import { Children, FormEvent, useState } from "react";
import { ITodoTask } from "./todo-list.types";
import { TODO_LIST } from "./todo-list.constants";
import { TodoItem, TodoItemProvider } from "../todo-item";
import "./todo-list.styles.css";
import { Button, InputSearch } from "@jsaints-dev/cora-ui";

function getItemIndex(index: number, required: boolean): string {
  return `${index + 1}${required ? "*" : ""}.`;
}

export function TodoList() {
  const [items, setItems] = useState(TODO_LIST);

  function handleSearch(e: FormEvent<HTMLFormElement>, todoList: ITodoTask[]) {
    e.preventDefault();
    const search = (e.target as HTMLFormElement).search.value;

    if (search === "") {
      setItems(todoList);
      return;
    }

    setItems(
      todoList.filter((item) => {
        const childrenArray = Children.toArray(
          item.description.props?.children
        );
        const stringChildren = childrenArray?.filter(
          (child) => typeof child === "string"
        );
        return (
          item.title.includes(search) ||
          stringChildren.some(
            (child) => typeof child === "string" && child.includes(search)
          )
        );
      })
    );
  }

  function handleDeleteItem(itemId: string) {
    setItems((currentItem) => {
      return currentItem.filter((item) => item.id !== itemId);
    });
  }

  return (
    <div className="todo__wrapper">
      <InputSearch
        handleSubmit={(e) => handleSearch(e, TODO_LIST)}
        id="search"
        placeholder="busca por texto..."
        name="search"
      />

      <TodoItem.Root>
        {items.length === 0 && (
          <TodoItem.Empty>
            <strong>Ops!!!</strong> Nenhum resultado foi encontrado &#128533;
          </TodoItem.Empty>
        )}
        {items?.map((item, i) => {
          return (
            <TodoItemProvider key={item.id} item={item}>
              <TodoItem.ItemContainer>
                <TodoItem.Index>
                  {getItemIndex(i, item.required)}
                </TodoItem.Index>
                <TodoItem.Content>
                  <TodoItem.Header>
                    <TodoItem.Title>{item.title}</TodoItem.Title>
                    <TodoItem.Status />
                  </TodoItem.Header>
                  <TodoItem.Description>
                    {item.description}
                  </TodoItem.Description>
                  {item.links && item.links.length > 0 && (
                    <TodoItem.LinksContainer>
                      {item?.links?.map((link) => (
                        <TodoItem.Link
                          key={link.name}
                          target="_blank"
                          href={link.url}
                        >
                          {link.name}
                        </TodoItem.Link>
                      ))}
                    </TodoItem.LinksContainer>
                  )}
                  <TodoItem.ActionsContainer>
                    <Button
                      variant="cora-outline"
                      className="h-7 text-xs"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      DELETE
                    </Button>
                    <TodoItem.ActionChangeStatus />
                  </TodoItem.ActionsContainer>
                </TodoItem.Content>
              </TodoItem.ItemContainer>
            </TodoItemProvider>
          );
        })}
      </TodoItem.Root>
    </div>
  );
}
