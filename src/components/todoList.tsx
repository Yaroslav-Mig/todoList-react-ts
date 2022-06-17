import React from 'react';
import { TodoListHeader } from './TodoListHeader';
import { AddItemForm } from './AddItemForm';
import { ButtonsFilter } from './ButtonsFilter';
import { TodoListTasks } from './TodoListTasks';

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

  return (
    <div>
      <TodoListHeader title={title} />
      <AddItemForm addTask={addTask} />
      <TodoListTasks tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus} />
      <ButtonsFilter filterValue={filterValue} changeFilter={changeFilter} />
    </div>
  );
}
