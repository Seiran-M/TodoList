import React, {ChangeEvent} from 'react'
import {FilterValuesType} from '../App'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
   changeTodolistTitle: (todolistID: string,newTitle:string) => void
}

export function Todolist(props: TodolistPropsType) {
   const removeTodolist = () => {props.removeTodolist(props.id)}
   const addTask = (title: string) => {props.addTask(title, props.id)}
   const changeTodolistTitle=(newTitle:string)=>{
      props.changeTodolistTitle(props.id, newTitle)
   }

   const onAllClickHandler = () => props.changeFilter('all', props.id)
   const onActiveClickHandler = () => props.changeFilter('active', props.id)
   const onCompletedClickHandler = () => props.changeFilter('completed', props.id)

   return (
      <div>
         <h3>
            <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>X</button>
         </h3>
         <AddItemForm addItem={addTask}/>
         <ul>
            {props.tasks.map(t => {
               const onRemoveHandler = () => props.removeTask(t.id, props.id)
               const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
               }
               const onChangeTitleHandler = (newValue:string) => {
                  props.changeTaskTitle(t.id, newValue, props.id);
               }
               return (
                  <li className={t.isDone ? 'is-done' : ''} key={t.id}>
                     <input type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeStatusHandler}
                     />
                     <EditableSpan title={t.title}
                                   onChange={onChangeTitleHandler}/>
                     <button onClick={onRemoveHandler}>x</button>
                  </li>
               )
            })
            }
         </ul>
         <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
         </div>
      </div>
   )
}


