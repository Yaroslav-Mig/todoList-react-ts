import React, { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList, TaskType, FilterValueType } from './components/TodoList';
import './App.css';

const getFilteredTasks = (tasks: Array<TaskType>, filter: string) => {
  switch (filter) {
    case 'completed':
      return (tasks = tasks.filter((task) => task.isDone));
    case 'active':
      return (tasks = tasks.filter((task) => !task.isDone));
  }
  return tasks;
};

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'Javascript', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Angular', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValueType>('all');

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

  const changeFilter = (filterValue: FilterValueType): void => setFilter(filterValue);

  const changeTaskStatus = (id: string, newStatus: boolean): void => {
    const newTasks = tasks.map((task) => (task.id === id ? { ...task, isDone: newStatus } : task));
    setTasks(newTasks);
  };

  const filteredTasks = getFilteredTasks(tasks, filter);

  return (
    <div className='App'>
      <TodoList
        title='What to learn'
        tasks={filteredTasks}
        filterValue={filter}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
