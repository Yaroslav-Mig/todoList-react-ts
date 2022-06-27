import React, { ChangeEvent, FC } from 'react';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './TodoList';
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
      <li key={task.id}>
        <input type='checkbox' checked={task.isDone} onChange={onStatusHandler} />
        <span className={taskClass}>
          <EditableSpan title={task.title} changeTitle={changeTitle} />
        </span>
        <button onClick={onRemoveHandler}>x</button>
      </li>
    );
  });

  return <ul>{mappedTasks}</ul>;
};
