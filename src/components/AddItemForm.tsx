import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import s from './TodoList.module.css';

type AddItemFormProps = {
  addTask: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormProps> = (props) => {
  const { addTask } = props;

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
		setError('');
	}

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.ctrlKey && e.key === 'Enter') {
      addTitleHandler();
    }
  };

  const addTitleHandler = (): void => {
    if (title.trim()) {
      addTask(title.trim());
      setTitle('');
      setError(null);
    } else {
      setError('Title is required');
    }
  };

  return (
    <>
      <div>
        <input
          className={error ? s.input_error : ''}
          value={title}
          onChange={onChangeTitleHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTitleHandler}>+</button>
      </div>
      {error && <span className={s.message_error}>{error}</span>}
    </>
  );
};
