import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { TaskType, FilterValueType } from '../App';
import classes from './todoList.module.css';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  filterValue: FilterValueType;
  removeTask: (id: string) => void;
  filterTask: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, status: boolean) => void;
};

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
    setError(null);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTask();
    }
  };
  const addTask = (): void => {
    if (title.trim()) {
      props.addTask(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };
  const onFilterHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    switch (target.getAttribute('data-filter')) {
      case 'all':
        props.filterTask('all');
        break;
      case 'active':
        props.filterTask('active');
        break;
      case 'completed':
        props.filterTask('completed');
        break;
    }
  };

  const tasksForTodoList = props.tasks.map((item) => {
    const onRemoveHandler = (): void => props.removeTask(item.id);
    const onStatusHandler = (): void => props.changeTaskStatus(item.id, item.isDone);
    return (
      <li key={item.id}>
        <input type='checkbox' checked={item.isDone} onChange={onStatusHandler} />
        <span className={item.isDone ? classes.task_completed : ''}>{item.title}</span>
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
          value={title}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      {error && <p className={classes.message_error}>{error}</p>}
      <ul>{tasksForTodoList}</ul>
      <div>
        <button
          className={props.filterValue === 'all' ? classes.btn_active : ''}
          data-filter='all'
          onClick={onFilterHandler}>
          All
        </button>
        <button
          className={props.filterValue === 'active' ? classes.btn_active : ''}
          data-filter='active'
          onClick={onFilterHandler}>
          Active
        </button>
        <button
          className={props.filterValue === 'completed' ? classes.btn_active : ''}
          data-filter='completed'
          onClick={onFilterHandler}>
          Completed
        </button>
      </div>
    </div>
  );
}
