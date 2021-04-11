import React, {useCallback, useEffect} from 'react'
import './App.css'
import {Todolist} from './components/Todolist/Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
   addTodolistTC,
   changeTodolistFilterAC,
   changeTodolistTitleTC,
   fetchTodolistsTC,
   removeTodolistTC,
   TodolistDomainType,
} from './reducers/todolists-reducer'
import {addTaskTC, changeTaskTitleTC, deleteTaskTC, updateTaskStatusTC,} from './reducers/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {TaskStatuses, TaskType} from './api/tasks-api'
import {FilterValuesType} from './reducers/todolist-reducer.test'


export type TasksStateType = {
   [key: string]: Array<TaskType>
}

export const AppWithRedux: React.FC = () => {
   console.log('App is called')

   const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(fetchTodolistsTC())
   }, [dispatch])

   // Functions for todolist:
   const addTodolist = useCallback((title: string) => {
      dispatch(addTodolistTC(title))
   }, [dispatch])

   const removeTodolist = useCallback((todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
   }, [dispatch])

   const changeFilter = useCallback((newFilterValue: FilterValuesType, todolistId: string) => {
      dispatch(changeTodolistFilterAC(newFilterValue, todolistId))
   }, [dispatch])

   const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle))
   }, [dispatch])

   // Functions for tasks:
   const removeTask = useCallback((todolistId: string, taskId: string) => {
      dispatch(deleteTaskTC(todolistId, taskId))
   }, [dispatch])

   const addTask = useCallback((todolistId: string, taskTitle: string) => {
      dispatch(addTaskTC(todolistId, taskTitle))
   }, [dispatch])

   const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTaskStatusTC(taskId, status, todolistId))
   }, [dispatch])

   const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
      dispatch(changeTaskTitleTC(todolistId, taskId, title))
   }, [dispatch])

   return (
      <div className="App">
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               <Button color="inherit">Login</Button>
            </Toolbar>
         </AppBar>

         <Container fixed>
            <Grid container style={{margin: '20px'}}>
               <AddItemForm addItem={addTodolist}/>
               <Grid container spacing={3}>
                  {
                     todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]

                        return (
                           <Grid item key={tl.id}>
                              <Paper style={{padding: '15px'}}>
                                 <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTodolist={removeTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={tl.filter}
                                    changeTodolistTitle={changeTodolistTitle}
                                 />
                              </Paper>
                           </Grid>
                        )
                     })
                  }
               </Grid>
            </Grid>
         </Container>
      </div>
   )
}