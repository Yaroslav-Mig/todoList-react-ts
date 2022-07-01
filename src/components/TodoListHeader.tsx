import React, { FC } from 'react';
import { EditableSpan } from './EditableSpan';
import { IconButton, Typography } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

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
    <Typography variant='h6' align='center'>
      <EditableSpan title={title} changeTitle={changeTitle} />
			<IconButton
				title='delete'
				aria-label='delete'
				size='small'
				onClick={onRemoveHandler}>
				<BackspaceIcon fontSize='small' />
      </IconButton>
    </Typography>
  );
};
