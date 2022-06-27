import React, { FC } from 'react';
import { EditableSpan } from './EditableSpan';

type TodoListHeaderProps = {
  todoListId: string;
  title: string;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, title: string) => void;
};

export const TodoListHeader: FC<TodoListHeaderProps> = (props) => {
  const { todoListId, title, removeTodoList, changeTodoListTitle } = props;

  const onRemoveHandler = (): void => removeTodoList(todoListId);
  const changeTitle = (newTitle: string): void => changeTodoListTitle(todoListId, newTitle);

  return (
    <h3>
      <EditableSpan title={title} changeTitle={changeTitle} />
      <button onClick={onRemoveHandler}>x</button>
    </h3>
  );
};
