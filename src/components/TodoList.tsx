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
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValueType;
  removeTask: (id: string) => void;
  changeTaskFilter: (todoListId: string, value: FilterValueType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeTaskStatus: (id: string, status: boolean) => void;
};

export function TodoList(props: PropsType) {
  const {
    todoListId,
    title,
    tasks,
    filter,
    removeTask,
    changeTaskFilter,
    addTask,
    changeTaskStatus,
  } = props;

  return (
    <div>
      <TodoListHeader title={title} />
      <AddItemForm todoListId={todoListId} addTask={addTask} />
      <TodoListTasks tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus} />
      <ButtonsFilter todoListId={todoListId} filter={filter} changeTaskFilter={changeTaskFilter} />
    </div>
  );
}
