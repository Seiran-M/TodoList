import {TasksStateType} from '../AppWithRedux'import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer'import {ACTIONS_TYPE} from './actions'import {Dispatch} from 'redux'import {AppRootStateType} from '../state/store'import {tasksAPI, TaskStatuses, TaskType} from '../api/tasks-api'export type  ActionsType =   RemoveTaskActionType   | AddTaskActionType   | ChangeTaskStatusActionType   | ChangeTaskTitleActionType   | AddTodolistActionType   | RemoveTodolistActionType   | SetTasksActionType   | SetTodolistActionTypeconst initialState: TasksStateType = {}export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {   switch (action.type) {      case ACTIONS_TYPE.REMOVE_TASK: {         const stateCopy = {...state}         const tasks = stateCopy[action.payload.todolistId]         const newTasks = tasks.filter(t => t.id !== action.payload.taskId)         stateCopy[action.payload.todolistId] = newTasks         return stateCopy      }      case ACTIONS_TYPE.ADD_TASK : {         const stateCopy = {...state}         const tasks = stateCopy[action.payload.task.todoListId]         const newTasks = [action.payload.task, ...tasks]         stateCopy[action.payload.task.todoListId] = newTasks         return stateCopy      }      case ACTIONS_TYPE.CHANGE_TASK_STATUS: {         const stateCopy = {...state}         const todolistTasks = stateCopy[action.payload.todolistId]         const task = todolistTasks.find(t => t.id === action.payload.taskId)         if (task) {            task.status = action.payload.status         }         return {            ...state,            [action.payload.todolistId]: state[action.payload.todolistId].map(task => {               if (task.id === action.payload.taskId) {                  return {...task, isDone: action.payload.status}               } else {                  return task               }            })         }      }      case ACTIONS_TYPE.CHANGE_TASK_TITLE: {         debugger         const stateCopy = {...state}         const tasks = stateCopy[action.payload.todolistId]         const task = tasks.find(t => t.id === action.payload.taskId)         if (task) {            task.title = action.payload.title         }         return {            ...state,            [action.payload.todolistId]: state[action.payload.todolistId].map(task => {               if (task.id === action.payload.taskId) {                  return {...task, title: action.payload.title}               } else {                  return task               }            })         }      }      case ACTIONS_TYPE.ADD_TODOLIST: {         const stateCopy = {...state}         stateCopy[action.payload.todolistId] = []         return stateCopy      }      case ACTIONS_TYPE.REMOVE_TODOLIST: {         const stateCopy = {...state}         delete stateCopy[action.payload.id]         return stateCopy      }      case ACTIONS_TYPE.SET_TODOLISTS: {         const stateCopy = {...state}         action.payload.todolists.forEach((tl) => {            stateCopy[tl.id] = []         })         return stateCopy      }      case ACTIONS_TYPE.SET_TASKS: {         const copyState = {...state}         copyState[action.todolistId] = action.tasks         return copyState      }      default:         return state   }}export const removeTaskAC = (todolistId: string, taskId: string) =>   ({type: ACTIONS_TYPE.REMOVE_TASK, payload: {todolistId, taskId}} as const)type RemoveTaskActionType = ReturnType<typeof removeTaskAC>export const addTaskAC = (task: TaskType) =>   ({type: ACTIONS_TYPE.ADD_TASK, payload: {task}} as const)type AddTaskActionType = ReturnType<typeof addTaskAC>export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>   ({type: ACTIONS_TYPE.CHANGE_TASK_STATUS, payload: {taskId, status, todolistId}} as const)type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>   ({type: ACTIONS_TYPE.CHANGE_TASK_TITLE, payload: {taskId, title, todolistId}} as const)type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>   ({type: ACTIONS_TYPE.SET_TASKS, tasks, todolistId} as const)type  SetTasksActionType = ReturnType<typeof setTasksAC>//thunkexport const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {   tasksAPI.getTasks(todolistId)      .then((res) => {         const tasks = res.data.items         dispatch(setTasksAC(tasks, todolistId))      })}export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {   tasksAPI.deleteTask(todolistId, taskId)      .then(() => {         const action = removeTaskAC(todolistId, taskId)         dispatch(action)      })}export const addTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {   tasksAPI.createTask(todolistId, taskTitle)      .then((res) => {         dispatch(addTaskAC(res.data.data.item))      })}export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {   return (dispatch: Dispatch, getState: () => AppRootStateType) => {// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком  // чтобы у неё отобрать остальные св-ва      const allTasksFromState = getState().tasks;      const tasksForCurrentTodolist = allTasksFromState[todolistId]      const task = tasksForCurrentTodolist.find(t => {         return t.id === taskId      })      if (task) {         tasksAPI.updateTask(todolistId, taskId, {            title: task.title,            startDate: task.startDate,            priority: task.priority,            description: task.description,            deadline: task.deadline,            status: status         }).then(() => {            const action = changeTaskStatusAC(taskId, status, todolistId)            dispatch(action)         })      }   }}export const changeTaskTitleTC = (taskId: string, title: string, todolistId: string) =>   (dispatch: Dispatch, getState: () => AppRootStateType) => {   const allTasksFromState = getState().tasks   const tasksForCurrentTodolist = allTasksFromState[todolistId]   const task = tasksForCurrentTodolist.find(t => {      return t.id === taskId   })   if (task) {      tasksAPI.updateTask(todolistId, taskId, {         title: title,         startDate: task.startDate,         priority: task.priority,         description: task.description,         deadline: task.deadline,         status: task.status      }).then((res) => {            dispatch(changeTaskTitleAC(taskId, title, todolistId))         })   }}