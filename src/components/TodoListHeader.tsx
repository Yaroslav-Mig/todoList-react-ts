import React, { FC } from 'react';

type TodoListHeaderProps = {
  todoListId: string;
  title: string;
  removeTodoList: (todoListId: string) => void;
};

export const TodoListHeader: FC<TodoListHeaderProps> = (props) => {
  const { todoListId, title, removeTodoList } = props;

  const onRemoveHandler = (): void => removeTodoList(todoListId);

  return (
    <h3>
      {title}
      <button onClick={onRemoveHandler}>x</button>
    </h3>
  );
};
