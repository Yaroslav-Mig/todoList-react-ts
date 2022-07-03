import React, { useState } from 'react';
import { v1 } from 'uuid';
import { TodoList, TaskType, FilterValueType } from './components/TodoList';
import { AddItemForm } from './components/addItemForm/AddItemForm';
import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Theme,
  Container,
  Grid,
  Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

type TasksStateType = {
  [todoListId: string]: Array<TaskType>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grid: {
      padding: theme.spacing(3),
		},
		paper: {
			display: 'flex',
			flexFlow: 'column',
			padding: theme.spacing(2),
			'& > *': {
				width: '100%',
      },
    },
  })
);

const getFilteredTasks = (tasks: Array<TaskType>, filter: string) => {
  switch (filter) {
    case 'completed':
      return (tasks = tasks.filter((task) => task.isDone));
    case 'active':
      return (tasks = tasks.filter((task) => !task.isDone));
  }
  return tasks;
};

function App(): JSX.Element {
  const classes = useStyles();
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'all' },
    { id: todoListId2, title: 'What to watch', filter: 'all' },
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'Javascript', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Angular', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Harry Potter', isDone: true },
      { id: v1(), title: 'Green mile', isDone: true },
      { id: v1(), title: 'Snatch', isDone: true },
      { id: v1(), title: 'Shot caller', isDone: true },
      { id: v1(), title: 'Fargo', isDone: false },
    ],
  });

  //TODO: Functions for todoLists

  const addTodoList = (title: string): void => {
    const todoListId = v1();
    const newTodoList: TodoListType = {
      id: todoListId,
      title,
      filter: 'all',
    };
    setTodoLists([newTodoList, ...todoLists]);
    setTasks({ [todoListId]: [], ...tasks });
  };

  const removeTodoList = (todoListId: string): void => {
    const filteredTodoLists = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoLists);
    const { [todoListId]: removedTasks, ...restTasks } = tasks;
    setTasks(restTasks);
  };

  const changeTodoListTitle = (todoListId: string, title: string) => {
    const updatedTodoLists = todoLists.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl));
    setTodoLists(updatedTodoLists);
  };

  //TODO: Functions for tasks

  const addTask = (todoListId: string, title: string): void => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    const newTasks = [newTask, ...tasks[todoListId]];
    setTasks({ ...tasks, [todoListId]: newTasks });
  };

  const removeTask = (todoListId: string, id: string): void => {
    const filteredTasks = tasks[todoListId].filter((task) => task.id !== id);
    setTasks({ ...tasks, [todoListId]: filteredTasks });
  };

  const changeTaskFilter = (todoListId: string, filter: FilterValueType): void => {
    const updatedTodoLists = todoLists.map((tl) => (todoListId === tl.id ? { ...tl, filter } : tl));
    setTodoLists(updatedTodoLists);
  };

  const changeTaskStatus = (todoListId: string, id: string, isDone: boolean): void => {
    const updatedTasks = tasks[todoListId].map((task) => (task.id === id ? { ...task, isDone } : task));
    setTasks({ ...tasks, [todoListId]: updatedTasks });
  };

  const changeTaskTitle = (todoListId: string, id: string, title: string): void => {
    const updatedTasks = tasks[todoListId].map((task) => (task.id === id ? { ...task, title } : task));
    setTasks({ ...tasks, [todoListId]: updatedTasks });
  };

  const mappedTodoLists = todoLists.map((tl: TodoListType): JSX.Element => {
    const filteredTasks = getFilteredTasks(tasks[tl.id], tl.filter);

    return (
      <Grid key={tl.id} item md={3}>
        <Paper className={classes.paper} elevation={3}>
          <TodoList
            todoListId={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            removeTask={removeTask}
            changeTaskFilter={changeTaskFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTodoList={removeTodoList}
            changeTodoListTitle={changeTodoListTitle}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className='App'>
      <AppBar position='static'>
        <Toolbar className={classes.flexGrow}>
          <IconButton className={classes.menuButton} edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.flexGrow} variant='h6'>
            TodoLists
          </Typography>
          <Button color='inherit' variant='outlined'>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container className={classes.grid} maxWidth='lg'>
        <Grid className={classes.flexGrow} container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.padding} elevation={3}>
              <AddItemForm addItem={addTodoList} />
            </Paper>
          </Grid>
        </Grid>
        <Grid className={classes.flexGrow} container spacing={3}>
          {mappedTodoLists}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
