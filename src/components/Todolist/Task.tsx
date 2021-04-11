import React, {ChangeEvent, useCallback} from 'react'import {Checkbox, IconButton} from '@material-ui/core'import {EditableSpan} from '../EditableSpan/EditableSpan'import {Delete} from '@material-ui/icons'import {TaskStatuses, TaskType} from '../../api/tasks-api'type TaskPropsType = {   todolistId: string   task: TaskType   removeTask: (todolistId: string, taskId: string) => void   changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void}export const Task = React.memo((props: TaskPropsType) => {   const {task, todolistId, removeTask, changeTaskTitle, changeTaskStatus} = props   const onRemoveHandler = useCallback(() => removeTask(todolistId, task.id), [todolistId, task.id])   const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {      let newIsDoneValue = e.currentTarget.checked      changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)   }, [task.id, todolistId])   const onChangeTitleHandler = useCallback((newValue: string) => {      changeTaskTitle(task.id, newValue, todolistId)   }, [changeTaskTitle, task.id, todolistId])   return (      <div className={TaskStatuses.Completed ? 'is-done' : ''} key={task.id}>         <Checkbox color="primary" checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>         <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>         <IconButton onClick={onRemoveHandler} size="small" aria-label="delete">            <Delete/>         </IconButton>      </div>   )})