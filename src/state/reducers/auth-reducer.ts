import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'import {authAPI, FieldErrorType, LoginParamsType} from '../../api/auth-api'import {setAppStatusAC} from './app-reducer'import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'import {AxiosError} from 'axios'import {ResponseCode} from './tasks-reducer'//thunksexport const loginTC = createAsyncThunk<undefined, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/login', async (param, {dispatch, rejectWithValue}) => {   dispatch(setAppStatusAC({status: 'loading'}))   try {      const response = await authAPI.login(param)      if (response.data.resultCode === ResponseCode.success) {         dispatch(setAppStatusAC({status: 'succeeded'}))         return      } else {         handleServerAppError(response.data, dispatch)         return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})      }   } catch (err) {      const error: AxiosError = err      handleServerNetworkError(error.message, dispatch)      return rejectWithValue({errors: [error.message], fieldsErrors: undefined})   }})export const logoutTC = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {   dispatch(setAppStatusAC({status: 'loading'}))   try {      const response = await authAPI.logout()      if (response.data.resultCode === ResponseCode.success) {         dispatch(setAppStatusAC({status: 'succeeded'}))         return      } else {         handleServerAppError(response.data, dispatch)         return rejectWithValue({errors: response.data.messages, fieldsErrors: response.data.fieldsErrors})      }   } catch (error) {      handleServerNetworkError(error.message, dispatch)      return rejectWithValue({errors: [error.message], fieldsErrors: undefined})   }})const slice = createSlice({   name: 'auth',   initialState: {      isLoggedIn: false   },   reducers: {      setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {         state.isLoggedIn = action.payload.value      }   },   extraReducers: builder => {      builder.addCase(loginTC.fulfilled, (state) => {         state.isLoggedIn = true      })      builder.addCase(logoutTC.fulfilled, (state) => {         state.isLoggedIn = false      })   }})export const authReducer = slice.reducerexport const {setIsLoggedInAC} = slice.actions