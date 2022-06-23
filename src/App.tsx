import React, { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList, TaskType, FilterValueType } from './components/TodoList';
import './App.css';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

const getFilteredTasks = (tasks: Array<TaskType>, filter: string) => {
  switch (filter) {
    case 'completed':
      return (tasks = tasks.filter((task) => task.isDone));
    case 'active':
      return (tasks = tasks.filter((task) => !task.isDone));
  }
  return tasks;
};

function App(): JSX.Element {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to watch', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'Javascript', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Angular', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Harry Potter', isDone: true },
      { id: v1(), title: 'Green mile', isDone: true },
      { id: v1(), title: 'Snatch', isDone: true },
      { id: v1(), title: 'Shot caller', isDone: true },
      { id: v1(), title: 'Fargo', isDone: false },
    ],
  });

  const addTask = (title: string): void => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const removeTask = (id: string): void => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const changeTaskFilter = (todoListId: string, filter: FilterValueType): void => {
    const updatedTodoLists = todoLists.map((tl) => (todoListId === tl.id ? { ...tl, filter } : tl));
    setTodoLists(updatedTodoLists);
  };

  const changeTaskStatus = (id: string, newStatus: boolean): void => {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, isDone: newStatus } : task));
    setTasks(newTasks);
  };

	const mappedTodoLists = todoLists.map((tl: TodoListType): JSX.Element => {
		
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);

    return (
      <TodoList
        key={tl.id}
        todoListId={tl.id}
        title={tl.title}
        tasks={filteredTasks}
        filter={tl.filter}
        removeTask={removeTask}
        changeTaskFilter={changeTaskFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    );
  });

  return <div className='App'>{mappedTodoLists}</div>;
}

export default App;
