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
  const { title, tasks, filterValue, removeTask, changeFilter, addTask, changeTaskStatus } = props;
  const [newTask, setNewTask] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTask(e.currentTarget.value);
    setError(null);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTaskHandler();
    }
  };
  const addTaskHandler = (): void => {
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    } else {
      setError('Title is required');
    }
  };
  const onFilterHandler = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLButtonElement;
    switch (target.dataset.filter) {
      case 'all':
        changeFilter('all');
        break;
      case 'active':
        changeFilter('active');
        break;
      case 'completed':
        changeFilter('completed');
    }
  };

  const mappedTasks = tasks.map((task) => {
    const onRemoveHandler = (): void => removeTask(task.id);
    const onStatusHandler = (): void => changeTaskStatus(task.id, task.isDone);
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
      <h3>{title}</h3>
      <div>
        <input
          className={error ? classes.input_error : ''}
          value={newTask}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {error && <p className={classes.message_error}>{error}</p>}
      <ul>{mappedTasks}</ul>
      <div onClick={onFilterHandler}>
        <button className={filterValue === 'all' ? classes.btn_active : ''} data-filter='all'>
          All
        </button>
        <button className={filterValue === 'active' ? classes.btn_active : ''} data-filter='active'>
          Active
        </button>
        <button className={filterValue === 'completed' ? classes.btn_active : ''} data-filter='completed'>
          Completed
        </button>
      </div>
    </div>
  );
}
