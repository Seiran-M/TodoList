import React, {useCallback} from 'react'
import './App.css'
import {TaskType, Todolist} from './components/Todolist/Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {addTodolistAC, changeFilterAC, changeTodolistTitleAC, removeTodolistAC,} from './reducers/todolists-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

export type TasksStateType = {
   [key: string]: Array<TaskType>
}

export const AppWithRedux: React.FC = () => {

   console.log('App is called')


   const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
   const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
   const dispatch = useDispatch()

   // Functions for todolist:

   const addTodolist = useCallback((title: string) => {
      const action = addTodolistAC(title)
      dispatch(action)
   }, [dispatch])

   const removeTodolist = useCallback((todolistId: string) => {
      const action = removeTodolistAC(todolistId)
      dispatch(action)
   }, [dispatch])

   const changeFilter = useCallback((newFilterValue: FilterValuesType, todolistId: string) => {
      dispatch(changeFilterAC(newFilterValue, todolistId))
   }, [dispatch])

   const changeTodolistTitle = useCallback((newTitle: string, todolistId: string) => {
      dispatch(changeTodolistTitleAC(newTitle, todolistId))
   }, [dispatch])

   // Functions for tasks:
   const removeTask = useCallback( (todolistId: string, taskId: string)=> {
      dispatch(removeTaskAC(todolistId,taskId ))
   }, [dispatch])

   const addTask = useCallback((taskTitle: string, todolistId: string) => {
      dispatch(addTaskAC(taskTitle, todolistId))
   }, [dispatch])

   const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
   }, [dispatch])

   const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
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
                        let allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

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