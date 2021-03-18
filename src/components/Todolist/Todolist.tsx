import React, {useCallback} from 'react'
import {FilterValuesType} from '../../App'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import style from './Todolist.module.scss'
import {Task} from './Task'

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}
type TodolistPropsType = {
   title: string
   id: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   addTask: (taskTitle: string, todolistID: string) => void
   changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
   removeTodolist: (todolistID: string) => void
   changeTodolistTitle: (todolistID: string, newTitle: string) => void
   removeTask: (taskId: string, todolistID: string) => void
   changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
   changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {

   console.log('Todolist is called')

   const addTask = useCallback((title: string) => {props.addTask(title, props.id)}, [props.addTask, props.id])

   const removeTodolist = useCallback(() => {props.removeTodolist(props.id)},[])
   const changeTodolistTitle = useCallback((newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}, [props.id, props.changeTodolistTitle])

   const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
   const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
   const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])

   let tasksForTodolist = props.tasks

   if (props.filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
   }
   if (props.filter === 'completed') {
      tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
   }

   return (
      <div>
         <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} size="small" aria-label="delete">
               <Delete/>
            </IconButton>
         </h3>

         <AddItemForm addItem={addTask}/>

         <div>
            {props.tasks.map(t => <Task
               id={t.id}
               task={t}
               removeTask={props.removeTask}
               changeTaskStatus={props.changeTaskStatus}
               changeTaskTitle={props.changeTaskTitle}
               key={t.id}/>)
            }
         </div>

         <div className={style.filterButtons}>
            <Button size="small" variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} size="small" variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} size="small" variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
         </div>
      </div>
   )
})

