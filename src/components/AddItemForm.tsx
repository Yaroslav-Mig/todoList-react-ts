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
      addTask(title.trim());
      setTitle('');
      setError(null);
    } else {
      setError('Title is required');
    }
  };

  const inputClass = error ? s.input_error : '';
  const disabledBtn = (error === null || error) ? true : false;

  return (
    <>
      <div>
        <input
          className={inputClass}
          value={title}
          onChange={onChangeTitleHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTitleHandler} disabled={disabledBtn}>
          +
        </button>
      </div>
      {error && <span className={s.message_error}>{error}</span>}
    </>
  );
};
