import {TasksStateType} from '../App'import {v1} from 'uuid'import {AddTodolistActionType, RemoveTodolistActionType, ACTIONS_TYPE} from './todolists-reducer'type RemoveTaskActionType = {   type: typeof ACTIONS_TYPE.REMOVE_TASK   payload: {      todolistId: string      taskId: string   }}type AddTaskActionType = {   type: typeof ACTIONS_TYPE.ADD_TASK   payload: {      title: string      todolistId: string   }}type ChangeTaskStatusActionType = {   type: typeof ACTIONS_TYPE.CHANGE_TASK_STATUS   payload: {      todolistId: string      taskId: string      isDone: boolean   }}type ChangeTaskTitleActionType = {   type: typeof ACTIONS_TYPE.CHANGE_TASK_TITLE   payload: {      taskId: string      todolistId: string      title: string   }}export type  ActionsType =   RemoveTaskActionType   | AddTaskActionType   | ChangeTaskStatusActionType   | ChangeTaskTitleActionType   | AddTodolistActionType   | RemoveTodolistActionTypeconst initialState: TasksStateType = {}export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {   const stateCopy = {...state}   switch (action.type) {      case ACTIONS_TYPE.REMOVE_TASK: {         const tasks = stateCopy[action.payload.todolistId]         const newTasks = tasks.filter(t => t.id !== action.payload.taskId)         stateCopy[action.payload.todolistId] = newTasks         return stateCopy      }      case ACTIONS_TYPE.ADD_TASK : {         const tasks = stateCopy[action.payload.todolistId]         const newTask = {id: v1(), title: action.payload.title, isDone: false}         const newTasks = [newTask, ...tasks]         stateCopy[action.payload.todolistId] = newTasks         return stateCopy      }      case ACTIONS_TYPE.CHANGE_TASK_STATUS: {         const todolistTasks = stateCopy[action.payload.todolistId]         const task = todolistTasks.find(t => t.id === action.payload.taskId)         if (task) {            task.isDone = action.payload.isDone         }debugger         return {            ...state,            [action.payload.todolistId]: state[action.payload.todolistId].map(task => {               if (task.id === action.payload.taskId) {                  return {...task, isDone: action.payload.isDone}               } else {                  return task               }            })         }      }      case ACTIONS_TYPE.CHANGE_TASK_TITLE: {         const stateCopy = {...state}         const tasks = stateCopy[action.payload.todolistId]         const task = tasks.find(t => t.id === action.payload.taskId)         if (task) {            task.title = action.payload.title         }         return {            ...state,            [action.payload.todolistId]: state[action.payload.todolistId].map(task => {               if (task.id === action.payload.taskId) {                  return {...task, title: action.payload.title}               } else {                  return task               }            })         }      }      case ACTIONS_TYPE.ADD_TODOLIST: {         const stateCopy = {...state}         stateCopy[action.payload.todolistId] = []         return stateCopy      }      case ACTIONS_TYPE.REMOVE_TODOLIST: {         const stateCopy = {...state}         delete stateCopy[action.payload.id]         return stateCopy      }      default:         return state   }}export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {   return {type: ACTIONS_TYPE.REMOVE_TASK, payload: {todolistId, taskId}}}export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {   return {type: ACTIONS_TYPE.ADD_TASK, payload: {title, todolistId}}}export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {   return {type: ACTIONS_TYPE.CHANGE_TASK_STATUS, payload: {taskId, isDone, todolistId}}}export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {   return {type: ACTIONS_TYPE.CHANGE_TASK_TITLE, payload: {taskId, title, todolistId}}}