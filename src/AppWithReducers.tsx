import React, {useReducer} from 'react'
import './App.scss'
import {Todolist} from './components/Todolist/Todolist'
import {v1} from 'uuid'
import {TaskType} from './components/Todolist/Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
   addTodolistAC,
   changeFilterAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   todolistsReducer
} from './reducers/todolist-reducer'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './reducers/tasks-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

export const AppWithReducers: React.FC = () => {

   const todolistId1 = v1()
   const todolistId2 = v1()

   const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to bye', filter: 'all'},
   ])

   const [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
      [todolistId1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'ReactJS', isDone: false},
         {id: v1(), title: 'Rest API', isDone: false},
         {id: v1(), title: 'GraphQL', isDone: false},
      ],
      [todolistId2]: [
         {id: v1(), title: 'Bread', isDone: true},
         {id: v1(), title: 'Milk', isDone: true},
         {id: v1(), title: 'Coffee', isDone: false},
      ],
   })

   // Function for todolist:
   function addTodolist(title: string) {
      const action = addTodolistAC(title)
      dispatchToTaskReducer(action)
      dispatchToTodolistsReducer(action)
   }

   function removeTodolist(todolistId: string) {
      const action = removeTodolistAC(todolistId)
      dispatchToTodolistsReducer(action)
      dispatchToTaskReducer(action)
   }
   function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
      dispatchToTodolistsReducer(changeFilterAC(newFilterValue, todolistId))
   }
   function changeTodolistTitle(newTitle: string, todolistId: string) {
      dispatchToTodolistsReducer(changeTodolistTitleAC(newTitle,todolistId))
   }

   // Function for tasks:
   function removeTask(taskId: string, todolistId: string) {
      dispatchToTaskReducer(removeTaskAC(taskId, todolistId))
   }
   function addTask(taskTitle: string, todolistId: string) {
      dispatchToTaskReducer(addTaskAC(taskTitle, todolistId))
   }
   function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatchToTaskReducer(changeTaskStatusAC(taskId, isDone, todolistId))
   }
   function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
      dispatchToTaskReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
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
                        let tasksForTodolist = tasksObj[tl.id]
                        if (tl.filter === 'active') {
                           tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }
                        if (tl.filter === 'completed') {
                           tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
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