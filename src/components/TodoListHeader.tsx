import React, { FC } from 'react';
import { EditableSpan } from './EditableSpan';
import { createStyles, IconButton, makeStyles, Typography } from '@material-ui/core';
import BackspaceIcon from '@material-ui/icons/Backspace';

type TodoListHeaderProps = {
  todoListId: string;
  title: string;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, title: string) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      lineHeight: 1,
			'& .MuiInput-root': {
				fontSize: '0.8em',
      },
    },
  })
);

export const TodoListHeader: FC<TodoListHeaderProps> = (props) => {
  const { todoListId, title, removeTodoList, changeTodoListTitle } = props;
  const classes = useStyles();

  const onRemoveHandler = (): void => removeTodoList(todoListId);
  const changeTitle = (newTitle: string): void => changeTodoListTitle(todoListId, newTitle);

  return (
    <Typography className={classes.root} variant='h5' component='h5' align='center' gutterBottom>
      <EditableSpan title={title} changeTitle={changeTitle} />
      <IconButton title='delete' aria-label='delete' size='small' onClick={onRemoveHandler}>
        <BackspaceIcon fontSize='small' />
      </IconButton>
    </Typography>
  );
};
