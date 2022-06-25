import React, { FC, MouseEvent } from 'react';
import { FilterValueType } from './TodoList';
import s from './TodoList.module.css';

type ButtonsFilterProps = {
  todoListId: string;
  filter: FilterValueType;
  changeTaskFilter: (todoListId: string, value: FilterValueType) => void;
};

export const ButtonsFilter: FC<ButtonsFilterProps> = (props) => {
  const { todoListId, filter, changeTaskFilter } = props;

  const onFilterHandler = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLButtonElement;
    switch (target.dataset.filter) {
      case 'all':
        changeTaskFilter(todoListId, 'all');
        break;
      case 'active':
        changeTaskFilter(todoListId, 'active');
        break;
      case 'completed':
        changeTaskFilter(todoListId, 'completed');
    }
  };

  const btnAllClass = filter === 'all' ? s.btn_active : '';
  const btnActiveClass = filter === 'active' ? s.btn_active : '';
  const btnCompletedClass = filter === 'completed' ? s.btn_active : '';

  return (
    <div onClick={onFilterHandler}>
      <button className={btnAllClass} data-filter='all'>
        All
      </button>
      <button className={btnActiveClass} data-filter='active'>
        Active
      </button>
      <button className={btnCompletedClass} data-filter='completed'>
        Completed
      </button>
    </div>
  );
};
