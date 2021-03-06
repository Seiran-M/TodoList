import React, {ChangeEvent} from 'react'
import {FilterValuesType} from '../../App'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import style from './Todolist.module.scss'

export type TaskType = {
   id: string
   title: string
   isDone: boolean
}
type TodolistPropsType = {
   id: string
   title: string
   tasks: Array<TaskType>
   filter: FilterValuesType
   removeTask: (taskId: string, todolistID: string) => void
   addTask: (taskTitle: string, todolistID: string) => void
   changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
   changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
   changeTaskTitle: (taskID: string, newTitle: string, todolistID: string) => void
   removeTodolist: (todolistID: string) => void
   changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
   const removeTodolist = () => {props.removeTodolist(props.id)}
   const addTask = (title: string) => {props.addTask(title, props.id)}
   const changeTodolistTitle = (newTitle: string) => {props.changeTodolistTitle(props.id, newTitle)}
   const onAllClickHandler = () => props.changeFilter('all', props.id)
   const onActiveClickHandler = () => props.changeFilter('active', props.id)
   const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

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
            {props.tasks.map(t => {
               const onRemoveHandler = () => props.removeTask(t.id, props.id)
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
               }
               const onChangeTitleHandler = (newValue: string) => {
                  props.changeTaskTitle(t.id, newValue, props.id)
               }
               return (
                  <div className={t.isDone ? 'is-done' : ''} key={t.id}>
                     <Checkbox color="primary"
                               checked={t.isDone}
                               onChange={onChangeStatusHandler}
                     />
                     <EditableSpan title={t.title}
                                   onChange={onChangeTitleHandler}/>
                     <IconButton onClick={onRemoveHandler} size="small" aria-label="delete">
                        <Delete/>
                     </IconButton>
                  </div>
               )
            })}
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
}