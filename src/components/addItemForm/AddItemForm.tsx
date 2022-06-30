import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { styles as st } from './styles';

type AddItemFormProps = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormProps> = (props) => {
  const { addItem } = props;

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
    <div style={st.AddItemForm}>
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
        style={st.Button}
        title='push button or ctrl+Enter to add task'
        variant='contained'
        color='primary'
        onClick={addTitleHandler}
        disabled={disabledBtn}
      >
        +
      </Button>
    </div>
  );
};
