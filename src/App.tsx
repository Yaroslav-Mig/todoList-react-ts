import { type } from 'os';
import React from 'react';
import './App.css';
import { TodoList } from './components/todoList';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const studyList: Array<TaskType> = [
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'Javascript', isDone: true },
    { id: 4, title: 'React', isDone: false },
    { id: 5, title: 'Angular', isDone: false },
  ];
  const shoppingList: Array<TaskType> = [
    { id: 1, title: 'Diary products', isDone: true },
    { id: 2, title: 'Bread', isDone: true },
    { id: 3, title: 'Meat', isDone: false },
    { id: 4, title: 'Cheese', isDone: false },
    { id: 5, title: 'Fish', isDone: true },
  ];

  return (
    <div className='App'>
			<TodoList title='What to learn' tasks={studyList }/>
      <TodoList title='What to buy' tasks={shoppingList }/>
    </div>
  );
}

export default App;
