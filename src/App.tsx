import React, { useState } from 'react';
import './App.css';
import { TodoList } from './components/todoList';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};
export type FilterValueType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'Javascript', isDone: true },
    { id: 4, title: 'React', isDone: false },
    { id: 5, title: 'Angular', isDone: false },
  ]);
  const [filter, setFilter] = useState('all');

  function removeTask(id: number): void {
    const filteredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filteredTasks);
  }
  function filterTask(filterValue: FilterValueType): void {
    setFilter(filterValue);
  }

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
      />
      {/* <TodoList title='What to buy' tasks={shoppingList }/> */}
    </div>
  );
}

export default App;
