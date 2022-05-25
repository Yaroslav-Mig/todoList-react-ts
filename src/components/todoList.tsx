import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { AddItemForm } from './AddItemForm';
import classes from './TodoList.module.css';
import { TodoListHeader } from './TodoListHeader';

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
    const onStatusHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      changeTaskStatus(task.id, e.currentTarget.checked);
    };
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
      <TodoListHeader title={title} />
			<AddItemForm addTask={addTask}/>
      <ul>{mappedTasks}</ul>
      <div onClick={onFilterHandler}>
        <button className={filterValue === 'all' ? classes.btn_active : ''} data-filter='all'>
          All
        </button>
        <button className={filterValue === 'active' ? classes.btn_active : ''} data-filter='active'>
          Active
        </button>
        <button
          className={filterValue === 'completed' ? classes.btn_active : ''}
          data-filter='completed'
        >
          Completed
        </button>
      </div>
    </div>
  );
}
