import React, { FC, MouseEvent } from 'react';
import { FilterValueType } from './TodoList';
import { Button, ButtonGroup, createStyles, makeStyles } from '@material-ui/core';

type ButtonsFilterProps = {
  todoListId: string;
  filter: FilterValueType;
  changeTaskFilter: (todoListId: string, value: FilterValueType) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      boxShadow: 'none',
      '& > *': {
        flexGrow: 1,
      },
    },
  })
);

export const ButtonsFilter: FC<ButtonsFilterProps> = (props) => {
	const { todoListId, filter, changeTaskFilter } = props;
  const classes = useStyles();

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

  const btnAllColor = filter === 'all' ? 'primary' : 'default';
  const btnActiveColor = filter === 'active' ? 'primary' : 'default';
  const btnCompletedColor = filter === 'completed' ? 'primary' : 'default';

  return (
    <ButtonGroup className={classes.root} variant='contained' size='small' onClick={onFilterHandler}>
      <Button color={btnAllColor} data-filter='all'>
        All
      </Button>
      <Button color={btnActiveColor} data-filter='active'>
        Active
      </Button>
      <Button color={btnCompletedColor} data-filter='completed'>
        Completed
      </Button>
    </ButtonGroup>
  );
};
