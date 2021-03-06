import React, {useState} from 'react'
import './App.scss'
import {Todolist} from './components/Todolist/Todolist'
import {v1} from 'uuid'
import {TaskType} from './components/Todolist/Todolist'
import {AddItemForm} from './components/AddItemForm/AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type TasksStateType = {
   [key: string]: Array<TaskType>
}

export const App: React.FC = () => {

   const todolistId1 = v1()
   const todolistId2 = v1()

   const [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistId1, title: 'What to learn', filter: 'all'},
      {id: todolistId2, title: 'What to bye', filter: 'all'},
   ])
   const [tasksObj, setTasks] = useState<TasksStateType>({
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
         {id: v1(), title: 'Coffee',isDone: false},
      ],
   })

   // Function for todolist:
   function addTodolist(title: string) {
      const newTodoListId = v1()
      const newTodolist: TodolistType = {id: newTodoListId, filter: 'all', title: title}
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasksObj, [newTodoListId]: []})
   }

   function removeTodolist(todolistId: string) {
      setTodolists(todolists.filter(tl => tl.id !== todolistId))
      delete tasksObj[todolistId]
      setTasks({...tasksObj})
   }

   function changeFilter(newFilterValue: FilterValuesType, todolistId: string) {
      const todolist = todolists.find(tl => tl.id === todolistId)
      if (todolist) {
         todolist.filter = newFilterValue
         setTodolists([...todolists])
      }
   }

   function changeTodolistTitle(todolistId: string, newTitle: string) {
      const todolist = todolists.find(tl => tl.id === todolistId)
      if (todolist) {
         todolist.title = newTitle
         setTodolists([...todolists])
      }
   }

   // Function for tasks:
   function removeTask(taskId: string, todolistId: string) {
      const todolistTask = tasksObj[todolistId]
      tasksObj[todolistId] = todolistTask.filter(t => t.id !== taskId)
      setTasks({...tasksObj})
   }

   function addTask(taskTitle: string, todolistId: string) {
      let newTask = {
         id: v1(),
         title: taskTitle,
         isDone: false
      }
      const todolistTask = tasksObj[todolistId]
      tasksObj[todolistId] = [newTask, ...todolistTask]
      setTasks({...tasksObj})
   }

   function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
      const todolistTasks = tasksObj[todolistId]

      const task: TaskType | undefined = todolistTasks.find(t => t.id === taskId)
      if (task) {
         task.isDone = isDone
         setTasks({...tasksObj})
      }
   }

   function changeTaskTitle(taskId: string, newTitle: string, todolistID: string) {
      const todolistTasks = tasksObj[todolistID]

      const task: TaskType | undefined = todolistTasks.find(t => t.id === taskId)
      if (task) {
         task.title = newTitle
         setTasks({...tasksObj})
      }
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