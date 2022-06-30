import { CSSProperties } from 'react';

const AddItemForm = {
  display: 'flex',
  flexFlow: 'column wrap',
  boxSizing: 'border-box',
  maxWidth: '250px',
  width: '100%',
} as CSSProperties;

const Button = {
	flex: '0 0 25px',
  padding: '5px',
  minWidth: 0,
  lineHeight: '1rem',
  borderRadius: '0 0 4px 4px',
};

export const styles = {
  AddItemForm: AddItemForm,
  Button: Button,
};
