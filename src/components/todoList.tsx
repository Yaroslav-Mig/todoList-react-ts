import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { TodoListHeader } from './TodoListHeader';
import { AddItemForm } from './AddItemForm';
import { ButtonsFilter } from './ButtonsFilter';
import classes from './TodoList.module.css';

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
      <AddItemForm addTask={addTask} />
      <ul>{mappedTasks}</ul>
      <ButtonsFilter filterValue={filterValue} changeFilter={changeFilter} />
    </div>
  );
}
