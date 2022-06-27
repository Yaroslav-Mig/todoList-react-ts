import React, { ChangeEvent, FC, useState } from 'react';

type EditableSpanProps = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditableSpan: FC<EditableSpanProps> = (props) => {
  const { title, changeTitle } = props;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');

  const onEditMode = (): void => {
    setEditMode(true);
    setNewTitle(title);
	};

  const offEditMode = (): void => {
    if (newTitle.trim()) {
      setEditMode(false);
      changeTitle(newTitle.trim());
    }
    setEditMode(false);
	};

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input
      type='text'
      autoFocus
      value={newTitle}
      onBlur={offEditMode}
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{title}</span>
  );
};
