import React, { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTask();
    }
  };
  const addTask = (): void => {
    props.addTask(title);
    setTitle('');
  };

  const onFilterHandler = (e: MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget;
    switch (target.getAttribute('data-filter')) {
      case 'all':
        props.filterTask('all');
        break;
      case 'active':
        props.filterTask('active');
        break;
      case 'completed':
        props.filterTask('completed');
        break;
    }
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} />
        <button onClick={addTask}>+</button>
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
        <button data-filter='all' onClick={onFilterHandler}>
          All
        </button>
        <button data-filter='active' onClick={onFilterHandler}>
          Active
        </button>
        <button data-filter='completed' onClick={onFilterHandler}>
          Completed
        </button>
      </div>
    </div>
  );
}
