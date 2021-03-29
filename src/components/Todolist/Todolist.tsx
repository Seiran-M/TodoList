import React, {useCallback} from 'react'
import {FilterValuesType} from '../../App'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {Button, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import style from './Todolist.module.css'
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
   changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
   removeTodolist: (todolistID: string) => void
   changeTodolistTitle: (todolistID: string, newTitle: string) => void
   removeTask: (todolistID: string, taskId: string) => void
   addTask: (taskTitle: string, todolistId: string) => void
   changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
   changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {

   const {tasks, title, id, filter, changeFilter, removeTask, changeTaskStatus, changeTaskTitle}= props

   console.log('Todolist is called')
   const removeTodolist = () => {props.removeTodolist(id)}
   const addTask = useCallback((title: string) => {props.addTask(title, id)}, [props.addTask, id])
   const changeTodolistTitle = useCallback((newTitle: string) => {props.changeTodolistTitle(id, newTitle)}, [id, props.changeTodolistTitle])

   const onAllClickHandler = useCallback(() => changeFilter('all', props.id), [props.changeFilter, id])
   const onActiveClickHandler = useCallback(() => changeFilter('active', props.id), [props.changeFilter, id])
   const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.id), [props.changeFilter, id])

   let tasksForTodolist = tasks

   if (filter === 'active') {
      tasksForTodolist = tasks.filter(t => !t.isDone)
   }
   if (filter === 'completed') {
      tasksForTodolist = tasks.filter(t => t.isDone)
   }

   return (
      <div>
         <h3>
            <EditableSpan title={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} size="small" aria-label="delete">
               <Delete/>
            </IconButton>
         </h3>

         <AddItemForm addItem={addTask}/>

         <div>
            {tasksForTodolist.map(t => <Task
               todolistId={id}
               task={t}
               removeTask={removeTask}
               changeTaskStatus={changeTaskStatus}
               changeTaskTitle={changeTaskTitle}
               key={t.id}/>)
            }
         </div>

         <div className={style.filterButtons}>
            <Button size="small" variant={filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'primary'} size="small" variant={filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} size="small" variant={filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
         </div>
      </div>
   )
})

