import {Dispatch} from 'redux'import {setAppErrorAC, setAppStatusAC} from '../state/reducers/app-reducer'import {ResponseType} from '../api/tasks-api'// generic functionexport const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {   if (data.messages.length) {      dispatch(setAppErrorAC({error: data.messages[0]}))   } else {      dispatch(setAppErrorAC({error: 'Some error occurred'}))   }   dispatch(setAppStatusAC({status: 'failed'}))}export const handleServerNetworkError = (message: string, dispatch: ErrorUtilsDispatchType) => {   dispatch(setAppErrorAC({error: message}))   dispatch(setAppStatusAC({status: 'failed'}))}// typestype ErrorUtilsDispatchType = Dispatch<ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>>