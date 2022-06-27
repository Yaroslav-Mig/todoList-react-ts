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
  removeTask: (todoListId: string, id: string) => void;
  changeTaskFilter: (todoListId: string, value: FilterValueType) => void;
  addTask: (todoListId: string, title: string) => void;
  changeTaskStatus: (todoListId: string, id: string, status: boolean) => void;
  changeTaskTitle: (todoListId: string, id: string, title: string) => void;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (todoListId: string, title: string) => void;
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
    changeTaskTitle,
    removeTodoList,
    changeTodoListTitle,
  } = props;

  const addItem = (title: string): void => addTask(todoListId, title);

  return (
    <div>
      <TodoListHeader
        todoListId={todoListId}
        title={title}
        removeTodoList={removeTodoList}
        changeTodoListTitle={changeTodoListTitle}
      />
      <AddItemForm addItem={addItem} />
      <TodoListTasks
        todoListId={todoListId}
        tasks={tasks}
        removeTask={removeTask}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={changeTaskTitle}
      />
      <ButtonsFilter todoListId={todoListId} filter={filter} changeTaskFilter={changeTaskFilter} />
    </div>
  );
}
