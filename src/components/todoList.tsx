import React, { useState } from 'react';
import { TaskType, FilterValueType } from '../App';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  filterTask: (value: FilterValueType) => void;
  addTask: (title: string) => void;
};

export function TodoList(props: PropsType) {
  const [title, setTitle] = useState('');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
        <button
          onClick={() => {
            props.addTask(title);
            setTitle('');
          }}>
          +
        </button>
      </div>
      <ul>
        {props.tasks.map((item) => {
          return (
            <li key={item.id}>
              <input type='checkbox' checked={item.isDone} />
              <span>{item.title}</span>
              <button onClick={() => props.removeTask(item.id)}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => props.filterTask('all')}>All</button>
        <button onClick={() => props.filterTask('active')}>Active</button>
        <button onClick={() => props.filterTask('completed')}>Completed</button>
      </div>
    </div>
  );
}
