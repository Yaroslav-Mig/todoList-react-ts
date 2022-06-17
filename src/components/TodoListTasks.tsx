import React, { ChangeEvent, FC } from 'react'
import { TaskType } from './TodoList';
import s from './TodoList.module.css';

type TodoListTasksProps = {
	tasks: Array<TaskType>;
	removeTask: (id: string) => void;
	changeTaskStatus: (id: string, status: boolean) => void;
}

export const TodoListTasks: FC<TodoListTasksProps> = (props) => {

	const { tasks, removeTask, changeTaskStatus } = props;

	const mappedTasks = tasks.map((task) => {
    const onRemoveHandler = (): void => removeTask(task.id);
    const onStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      changeTaskStatus(task.id, e.currentTarget.checked);
		};

		const taskClass = task.isDone ? s.task_completed : ''

    return (
      <li key={task.id}>
        <input type='checkbox' checked={task.isDone} onChange={onStatusHandler} />
        <span className={taskClass}>{task.title}</span>
        <button onClick={onRemoveHandler}>x</button>
      </li>
    );
  });

	return (
		<ul>{mappedTasks}</ul>
	)
}
