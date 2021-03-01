import React, { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList, TaskType, FilterValueType } from './components/todoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML', isDone: true },
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'Javascript', isDone: true },
    { id: v1(), title: 'React', isDone: false },
    { id: v1(), title: 'Angular', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValueType>('all');
  let tasksForTodoList = tasks;

  if (filter === 'active') {
    tasksForTodoList = tasks.filter((task) => task.isDone === false);
  }
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter((task) => task.isDone === true);
  }

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
  const changeStatus = (id: string, newStatus: boolean): void => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = newStatus;
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className='App'>
      <TodoList
        title='What to learn'
        tasks={tasksForTodoList}
        filterValue={filter}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
      />
    </div>
  );
}

export default App;
