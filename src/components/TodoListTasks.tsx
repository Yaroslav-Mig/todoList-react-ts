import React, { ChangeEvent, FC } from 'react';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './TodoList';
import { Checkbox, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import s from './TodoList.module.css';

type TodoListTasksProps = {
  todoListId: string;
  tasks: Array<TaskType>;
  removeTask: (todoListId: string, id: string) => void;
  changeTaskStatus: (todoListId: string, id: string, status: boolean) => void;
  changeTaskTitle: (todoListId: string, id: string, title: string) => void;
};

export const TodoListTasks: FC<TodoListTasksProps> = (props) => {
  const { todoListId, tasks, removeTask, changeTaskStatus, changeTaskTitle } = props;

  const mappedTasks = tasks.map((task): JSX.Element => {
    const onRemoveHandler = (): void => removeTask(todoListId, task.id);

    const onStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      changeTaskStatus(todoListId, task.id, e.currentTarget.checked);
    };

    const changeTitle = (newTitle: string): void => changeTaskTitle(todoListId, task.id, newTitle);

    const taskClass = task.isDone ? s.task_completed : '';

    return (
      <ListItem key={task.id} selected dense>
        <Checkbox color='primary' size='small' checked={task.isDone} onChange={onStatusHandler} />
        <ListItemText className={taskClass}>
          <EditableSpan title={task.title} changeTitle={changeTitle} />
        </ListItemText>
        <IconButton
          title='delete'
          aria-label='delete'
          size='small'
          edge='end'
          onClick={onRemoveHandler}
        >
          <DeleteForeverIcon fontSize='small' />
        </IconButton>
      </ListItem>
    );
  });

  return <List>{mappedTasks}</List>;
};
