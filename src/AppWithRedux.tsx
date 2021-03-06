import React, {useReducer} from 'react'
import './App.scss'
import {Todolist} from './components/Todolist/Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
   addTodolistAC,
   changeFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
} from './reducers/todolist-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootState} from './state/store'
import {TasksStateType} from './App'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}


export const AppWithRedux: React.FC = () => {
   const dispatch = useDispatch()
   const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
   const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

   // Functions for todolist:
   function addTodolist(title: string) {
      const action = addTodolistAC(title)
      dispatch(action)
   }

   function removeTodolist(todolistId: string) {
      const action = removeTodolistAC(todolistId)
      dispatch(action)
   }

   function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
      dispatch(changeFilterAC(newFilterValue, todolistId))
   }

   function changeTodolistTitle(newTitle: string, todolistId: string) {
      dispatch(changeTodolistTitleAC(newTitle, todolistId))
   }

   // Functions for tasks:
   function removeTask(taskId: string, todolistId: string) {
      dispatch(removeTaskAC(taskId, todolistId))
   }

   function addTask(taskTitle: string, todolistId: string) {
      dispatch(addTaskAC(taskTitle, todolistId))
   }

   function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
   }

   function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
   }

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
                        if (tl.filter === 'active') {
                           tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                           tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                        }
                        return (
                           <Grid item>
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