import React, {useCallback, useEffect, useMemo} from 'react'
import {useDispatch} from 'react-redux'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'

import styles from './Todolist.module.css'
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm'
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan'
import {Task} from './Task/Task'
import {fetchTasksTC} from '../../../state/reducers/tasks-reducer'
import {RequestStatusType} from '../../../state/reducers/app-reducer'
import {TaskStatuses, TaskType} from '../../../api/tasks-api'


export const Todolist = React.memo((props: TodolistPropsType) => {
   const {demo, tasks, title, id, filter, changeFilter, removeTask, changeTaskStatus, changeTaskTitle, entityStatus} = props

   const dispatch = useDispatch()

   useEffect(() => {
      if(demo) return;
      const todolistId = id
      dispatch(fetchTasksTC(todolistId))
   }, [])


   const removeTodolist = () => {props.removeTodolist(id)}
   const addTask = useCallback((title: string) => {props.addTask(title, id)}, [props.addTask, id])
   const changeTodolistTitle = useCallback((newTitle: string) => {props.changeTodolistTitle(id, newTitle)}, [id, props.changeTodolistTitle])

   const onAllClickHandler = useCallback(() => changeFilter('all', id), [changeFilter, id])
   const onActiveClickHandler = useCallback(() => changeFilter('active', id), [changeFilter, id])
   const onCompletedClickHandler = useCallback(() => changeFilter('completed', id), [changeFilter, id])

   let tasksForTodolist = tasks

   if (filter === 'active') {
      tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
   }
   if (filter === 'completed') {
      tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
   }

//    let tasksForTodolist = useMemo(() => {
//       if (filter === "active") {
//          return tasks.filter((task) => task.status === TaskStatuses.New);
//       }
//       if (filter === "completed") {
//          return tasks.filter((task) => task.status === TaskStatuses.Completed);
//       }
//    return tasksForTodolist;
// }, [filter, tasks]);

   return (
      <>
         <h3>
            <EditableSpan
               title={title}
               onChange={changeTodolistTitle}
               disabled={entityStatus === 'loading'}
            />
            <IconButton
               onClick={removeTodolist}
               disabled={entityStatus === 'loading'}
               size="small"
               aria-label="delete"
            >
               <Delete/>
            </IconButton>
         </h3>

         <AddItemForm
            addItem={addTask}
            disabled={entityStatus === 'loading'}
         />

         <div>
            {
               tasksForTodolist.map(task => <Task
               todolistId={id}
               task={task}
               entityStatus={task.entityStatus}
               removeTask={removeTask}
               changeTaskStatus={changeTaskStatus}
               changeTaskTitle={changeTaskTitle}
               key={task.id}/>)
            }
         </div>

         <div className={styles.filterButtons}>
            <Button
               size="small"
               variant={filter === 'all' ? 'contained' : 'text'}
               onClick={onAllClickHandler}>All
            </Button>
            <Button
               color={'primary'}
               size="small"
               variant={filter === 'active' ? 'contained' : 'text'}
               onClick={onActiveClickHandler}>Active
            </Button>
            <Button
               color={'secondary'}
               size="small"
               variant={filter === 'completed' ? 'contained' : 'text'}
               onClick={onCompletedClickHandler}>Completed
            </Button>
         </div>
      </>
   )
})


// types
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistPropsType = {
   demo?: boolean,
   title: string
   id: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
   removeTodolist: (todolistID: string) => void
   changeTodolistTitle: (todolistID: string, newTitle: string) => void
   removeTask: (todolistID: string, taskId: string) => void
   addTask: (taskTitle: string, todolistId: string) => void
   changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
   changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
   entityStatus: RequestStatusType
}