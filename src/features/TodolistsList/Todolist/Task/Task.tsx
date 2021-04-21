import React, {ChangeEvent, useCallback} from 'react'import {Checkbox, IconButton} from '@material-ui/core'import {Delete} from '@material-ui/icons'import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'import {TaskStatuses, TaskType} from '../../../../api/tasks-api'import {RequestStatusType} from '../../../../state/reducers/app-reducer'export const Task = React.memo((props: TaskPropsType) => {   const {task, todolistId, removeTask, changeTaskTitle, changeTaskStatus, entityStatus} = props   const onRemoveHandler = useCallback(() => removeTask(todolistId, task.id), [todolistId, task.id])   const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {      let newIsDoneValue = e.currentTarget.checked      changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)   }, [task.id, todolistId])   const onChangeTitleHandler = useCallback((newValue: string) => {      changeTaskTitle(task.id, newValue, todolistId)   }, [changeTaskTitle, task.id, todolistId])   return (      <div className={TaskStatuses.Completed ? 'is-done' : ''} key={task.id}>         <Checkbox            color="primary"            checked={task.status === TaskStatuses.Completed}            onChange={onChangeStatusHandler}            disabled={entityStatus === 'loading'}         />         <EditableSpan            title={task.title}            onChange={onChangeTitleHandler}            disabled={entityStatus === 'loading'}         />         <IconButton            onClick={onRemoveHandler}            disabled={entityStatus === 'loading'}            size="small"            aria-label="delete"         >            <Delete/>         </IconButton>      </div>   )})// typestype TaskPropsType = {   todolistId: string   task: TaskType   removeTask: (todolistId: string, taskId: string) => void   changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void   entityStatus: RequestStatusType}