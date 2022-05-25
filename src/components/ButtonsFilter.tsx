import React, { FC, MouseEvent } from 'react';
import { FilterValueType } from './TodoList';
import s from './TodoList.module.css';

type ButtonsFilterProps = {
  filterValue: FilterValueType;
  changeFilter: (value: FilterValueType) => void;
};

export const ButtonsFilter: FC<ButtonsFilterProps> = (props) => {
  const { filterValue, changeFilter } = props;

  const onFilterHandler = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLButtonElement;
    switch (target.dataset.filter) {
      case 'all':
        changeFilter('all');
        break;
      case 'active':
        changeFilter('active');
        break;
      case 'completed':
        changeFilter('completed');
    }
  };

  const btnAllClass = filterValue === 'all' ? s.btn_active : '';
  const btnActiveClass = filterValue === 'active' ? s.btn_active : '';
  const btnCompletedClass = filterValue === 'completed' ? s.btn_active : '';

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
