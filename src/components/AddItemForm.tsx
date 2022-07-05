import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button, createStyles, makeStyles, TextField } from '@material-ui/core';
import AddBoxTwoToneIcon from '@material-ui/icons/AddBoxTwoTone';
import st from './TodoList.module.css';

type AddItemFormProps = {
  addItem: (title: string) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    button: {
			padding: '5px',
			lineHeight: '1rem',
			borderRadius: '0px 0px 4px 4px',
    },
  })
);

export const AddItemForm: FC<AddItemFormProps> = (props) => {
  const { addItem } = props;
  const classes = useStyles();

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const eventVal = e.currentTarget.value;

    if (eventVal.trim()) {
      setTitle(eventVal);
      setError('');
    } else {
      setTitle(eventVal);
      setError(null);
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTitleHandler();
    }
  };

  const addTitleHandler = (): void => {
    if (title.trim()) {
      addItem(title.trim());
      setTitle('');
      setError(null);
    } else {
      setError('Error, text is required');
    }
  };

  const labelBtn = error ? error : 'Write here';
  const disabledBtn = error === null || error ? true : false;

  return (
    <div className={st.btnAdd_box}>
      <TextField
        type='text'
        variant='filled'
        size='small'
        error={!!error}
        label={labelBtn}
        value={title}
        onChange={onChangeTitleHandler}
        onKeyDown={onKeyPressHandler}
      />
			<Button
				className={classes.button}
        aria-label='add'
        title='push button or ctrl+Enter to add task'
        variant='contained'
        color='primary'
        startIcon={<AddBoxTwoToneIcon />}
        disabled={disabledBtn}
        onClick={addTitleHandler}
      >
        Add
      </Button>
    </div>
  );
};
