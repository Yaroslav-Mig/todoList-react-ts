import React, { FC } from 'react'

type TodoListHeaderProps = {
	title: string;
}

export const TodoListHeader: FC<TodoListHeaderProps> = (props) => {
	const {title} = props
	return (
		<h3>{title}</h3>
	)
}
