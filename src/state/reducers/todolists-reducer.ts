import {AxiosError} from 'axios'import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'import {todolistsAPI, TodolistType} from '../../api/todolists-api'import {TaskType} from '../../api/tasks-api'import {RequestStatusType, setAppStatusAC} from './app-reducer'import {ResponseCode} from './tasks-reducer'import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'//thunksexport const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists',   async (param, {dispatch, rejectWithValue}) => {      dispatch(setAppStatusAC({status: 'loading'}))      const response = await todolistsAPI.getTodolists()      try {         dispatch(setAppStatusAC({status: 'succeeded'}))         return {todolists: response.data}      } catch (err) {         const error: AxiosError = err         handleServerNetworkError(error.message, dispatch)         return rejectWithValue(null)      }   })export const addTodolistTC = createAsyncThunk('todolists/addTodolist',   async (title: string, {dispatch, rejectWithValue}) => {      dispatch(setAppStatusAC({status: 'loading'}))      const response = await todolistsAPI.createTodolist(title)      try {         if (response.data.resultCode === ResponseCode.success) {            dispatch(setAppStatusAC({status: 'succeeded'}))            return {todolist: response.data.data.item}         } else {            handleServerAppError(response.data, dispatch)            return rejectWithValue(null)         }      } catch (err) {         const error: AxiosError = err         handleServerNetworkError(error.message, dispatch)         return rejectWithValue(null)      }   })export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist',   async (todolistsId: string, {dispatch, rejectWithValue}) => {      dispatch(setAppStatusAC({status: 'loading'}))      dispatch(changeTodolistEntityStatusAC({id: todolistsId, entityStatus: 'loading'}))      const response = await todolistsAPI.deleteTodolist(todolistsId)      try {         if (response.data.resultCode === ResponseCode.success) {            dispatch(setAppStatusAC({status: 'succeeded'}))            return {id: todolistsId}         } else {            handleServerAppError(response.data, dispatch)            return rejectWithValue(null)         }      } catch (err) {         const error: AxiosError = err         handleServerNetworkError(error.message, dispatch)         return rejectWithValue(null)      }   })export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',   async (param: { todolistId: string, title: string }, {dispatch, rejectWithValue}) => {      dispatch(setAppStatusAC({status: 'loading'}))      const response = await todolistsAPI.updateTodolist(param.todolistId, param.title)      try {         if (response.data.resultCode === ResponseCode.success) {            dispatch(setAppStatusAC({status: 'succeeded'}))            return {id: param.todolistId, title: param.title}         } else {            handleServerAppError(response.data, dispatch)            return rejectWithValue(null)         }      } catch (err) {         const error: AxiosError = err         handleServerNetworkError(error.message, dispatch)         return rejectWithValue(null)      }   })const slice = createSlice({   name: 'todolists',   initialState: [] as Array<TodolistDomainType>,   reducers: {      changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {         const index = state.findIndex(tl => tl.id === action.payload.id)         state[index].filter = action.payload.filter      },      changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {         const index = state.findIndex(tl => tl.id === action.payload.id)         state[index].entityStatus = action.payload.entityStatus      }   },   extraReducers: builder => {      builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {         return action.payload.todolists.map((tl: TodolistType) => ({...tl, entityStatus: 'idle', filter: 'all'}))      })      builder.addCase(addTodolistTC.fulfilled, (state, action) => {         state.unshift({...action.payload.todolist, entityStatus: 'idle', filter: 'all'})      })      builder.addCase(removeTodolistTC.fulfilled, (state, action) => {         const index = state.findIndex(tl => tl.id === action.payload.id)         if (index > 1) {            state.splice(index, 1)         }      })      builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {         const index = state.findIndex(tl => tl.id === action.payload.id)         state[index].title = action.payload.title      })   }})export const todolistsReducer = slice.reducerexport const {changeTodolistEntityStatusAC, changeTodolistFilterAC} = slice.actions// typesexport type TasksStateType = { [key: string]: Array<TaskType> }export type FilterValuesType = 'all' | 'active' | 'completed'export type TodolistDomainType = TodolistType & {   filter: FilterValuesType   entityStatus: RequestStatusType}