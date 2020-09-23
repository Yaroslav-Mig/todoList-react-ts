import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList } from './components/todoList';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'Javascript', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Angular', isDone: false },
  ]);
  const [filter, setFilter] = useState('all');

  const removeTask = (id: string): void => {
    const filteredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filteredTasks);
  };
  const filterTask = (filterValue: FilterValueType): void => setFilter(filterValue);
  const addTask = (title: string): void => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  let displayTasks = tasks;
  if (filter === 'active') {
    displayTasks = tasks.filter((item) => item.isDone === false);
  }
  if (filter === 'completed') {
    displayTasks = tasks.filter((item) => item.isDone === true);
  }

  return (
    <div className='App'>
      <TodoList
        title='What to learn'
        tasks={displayTasks}
        removeTask={removeTask}
        filterTask={filterTask}
        addTask={addTask}
      />
      {/* <TodoList title='What to buy' tasks={shoppingList }/> */}
    </div>
  );
}

export default App;
