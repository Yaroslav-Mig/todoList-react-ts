import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { TextField } from '@material-ui/core';

type EditableSpanProps = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan: FC<EditableSpanProps> = (props) => {
  const { title, changeTitle } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const onEditModeHandler = (): void => {
    setEditMode(true);
    setNewTitle(title);
	};

  const offEditModeHandler = (): void => {
    if (newTitle.trim()) {
      setEditMode(false);
      changeTitle(newTitle.trim());
    }
    setEditMode(false);
	};

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

	const onKeyChangeTitleHandler = (e: KeyboardEvent<HTMLInputElement>): void => {
		e.ctrlKey && e.key === 'Enter' && offEditModeHandler();
	}

  return editMode ? (
    <TextField
			type='text'
			size='small'
			maxRows={4}
			multiline
      autoFocus
      value={newTitle}
			onBlur={offEditModeHandler}
      onChange={onChangeTitleHandler}
			onKeyDown={onKeyChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={onEditModeHandler}>{title}</span>
  );
};
