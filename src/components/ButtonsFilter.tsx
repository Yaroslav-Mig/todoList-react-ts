import React, { FC } from 'react';
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

	const onFilterHandler = (value: FilterValueType) : () => void => {
		return () => changeTaskFilter(todoListId, value);
	}

  const btnAllColor = filter === 'all' ? 'primary' : 'default';
  const btnActiveColor = filter === 'active' ? 'primary' : 'default';
  const btnCompletedColor = filter === 'completed' ? 'primary' : 'default';

  return (
    <ButtonGroup className={classes.root} variant='contained' size='small'>
      <Button color={btnAllColor} onClick={onFilterHandler('all')}>
        All
      </Button>
      <Button color={btnActiveColor} onClick={onFilterHandler('active')}>
        Active
      </Button>
      <Button color={btnCompletedColor} onClick={onFilterHandler('completed')}>
        Completed
      </Button>
    </ButtonGroup>
  );
};
