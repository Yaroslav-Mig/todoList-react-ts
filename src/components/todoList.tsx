import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import classes from './todoList.module.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValueType = 'all' | 'active' | 'completed';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filterValue: FilterValueType;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, status: boolean) => void;
};

export function TodoList(props: PropsType) {
  const [newTask, setNewTask] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setNewTask(e.currentTarget.value);
    setError(null);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTask();
    }
  };
  const addTask = (): void => {
    if (newTask.trim()) {
      props.addTask(newTask.trim());
      setNewTask('');
    } else {
      setError('Title is required');
    }
  };
  const onFilterHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    switch (target.getAttribute('data-filter')) {
      case 'all':
        props.changeFilter('all');
        break;
      case 'active':
        props.changeFilter('active');
        break;
      case 'completed':
        props.changeFilter('completed');
        break;
    }
  };

  const mappedTasks = props.tasks.map((task) => {
    const onRemoveHandler = (): void => props.removeTask(task.id);
    const onStatusHandler = (): void => props.changeTaskStatus(task.id, task.isDone);
    return (
      <li key={task.id}>
        <input type='checkbox' checked={task.isDone} onChange={onStatusHandler} />
        <span className={task.isDone ? classes.task_completed : ''}>{task.title}</span>
        <button onClick={onRemoveHandler}>x</button>
      </li>
    );
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          className={error ? classes.input_error : ''}
          value={newTask}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      {error && <p className={classes.message_error}>{error}</p>}
      <ul>{mappedTasks}</ul>
      <div>
        <button
          className={props.filterValue === 'all' ? classes.btn_active : ''}
          data-filter='all'
          onClick={onFilterHandler}
        >
          All
        </button>
        <button
          className={props.filterValue === 'active' ? classes.btn_active : ''}
          data-filter='active'
          onClick={onFilterHandler}
        >
          Active
        </button>
        <button
          className={props.filterValue === 'completed' ? classes.btn_active : ''}
          data-filter='completed'
          onClick={onFilterHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
