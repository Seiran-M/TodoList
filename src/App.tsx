import React, {useState} from 'react'
import './App.css'
import {Todolist} from './components/Todolist/Todolist'
import {v1} from "uuid"
import {TaskType} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
type TasksStateType = {
   [key: string]: Array<TaskType>
}

export const App: React.FC = () => {
   const todolistID1 = v1()
   const todolistID2 = v1()
   const [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistID1, title: 'What to learn', filter: "all"},
      {id: todolistID2, title: 'What to bye', filter: "all"},
   ])

   function removeTodolist(todolistID: string) {
      // filter - пропускает дальше, только true
      const filteredTodolist = todolists.filter(tl => tl.id !== todolistID)
      setTodolists(filteredTodolist)

      delete tasksObj[todolistID]
      setTasks({...tasksObj})
   }

   function changeTodolistTitle(todolistID: string, newTitle: string) {
      const todolist = todolists.find(tl => tl.id === todolistID);
      if (todolist) {
         todolist.title = newTitle;
         setTodolists([...todolists])
      }
   }


   const [tasksObj, setTasks] = useState<TasksStateType>({
      [todolistID1]: [
         {id: v1(), title: 'HTML&CSS', isDone: true},
         {id: v1(), title: 'JS', isDone: true},
         {id: v1(), title: 'ReactJS', isDone: false},
         {id: v1(), title: 'Rest API', isDone: false},
         {id: v1(), title: 'GraphQL', isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: 'Bread', isDone: true},
         {id: v1(), title: 'Milk', isDone: true},
         {id: v1(), title: 'Coffee', isDone: false},
      ],
   })

   function removeTask(taskID: string, todolistID: string) {
      const todolistTask = tasksObj[todolistID]
      tasksObj[todolistID] = todolistTask.filter(t => t.id !== taskID)
      setTasks({...tasksObj})
   }

   function addTask(taskTitle: string, todolistID: string) {
      let newTask = {
         id: v1(),
         title: taskTitle,
         isDone: false
      }
      const todolistTask = tasksObj[todolistID]
      tasksObj[todolistID] = [newTask, ...todolistTask]
      setTasks({...tasksObj})
   }

   function changeFilter(newFilterValue: FilterValuesType, todolistID: string) {
      const todolist = todolists.find(tl => tl.id === todolistID)
      if (todolist) {
         todolist.filter = newFilterValue
         setTodolists([...todolists])
      }
   }

   function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
      const todolistTasks = tasksObj[todolistID]

      const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
      if (task) {
         task.isDone = isDone
         setTasks({...tasksObj})
      }
   }

   function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
      const todolistTasks = tasksObj[todolistID]

      const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
      if (task) {
         task.title = newTitle
         setTasks({...tasksObj})
      }
   }

   function addTodolist(title: string) {
      const newTodoListID = v1()
      const newTodolist: TodolistType = {
         id: newTodoListID, filter: "all", title: title
      }
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasksObj, [newTodoListID]: []})
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
            <Grid container style={{margin:"20px"}}>
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
                              <Paper style={{padding:"15px"}}>
                              <Todolist
                                 key={tl.id}
                                 id={tl.id}
                                 title={tl.title}
                                 tasks={tasksForTodolist}
                                 removeTodolist={removeTodolist}
                                 removeTask={removeTask}
                                 changeFilter={changeFilter}
                                 addTask={addTask}
                                 changeTaskStatus={changeStatus}
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
