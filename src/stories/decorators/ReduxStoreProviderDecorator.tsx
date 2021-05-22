import React from 'react'import {Provider} from 'react-redux'import {combineReducers} from 'redux'import {tasksReducer} from '../../state/reducers/tasks-reducer'import {todolistsReducer} from '../../state/reducers/todolists-reducer'import {v1} from 'uuid'import {RootReducerType} from '../../state/store'import {authReducer} from '../../state/reducers/auth-reducer'import {appReducer, ErrorType, RequestStatusType} from '../../state/reducers/app-reducer'import thunkMiddleware from 'redux-thunk'import {TaskPriorities, TaskStatuses} from '../../api/tasks-api'import {configureStore} from '@reduxjs/toolkit'import {HashRouter} from 'react-router-dom'const rootReducer: RootReducerType = combineReducers({   tasks: tasksReducer,   todolists: todolistsReducer,   auth: authReducer,   app: appReducer})const initialGlobalState = {   todoLists: [      {         id: 'todolistId1',         title: 'What to learn',         filter: 'all',         entityStatus: 'idle',         addedDate: '',         order: 1,      },      {         id: 'todolistId2',         title: 'What to buy',         filter: 'all',         entityStatus: 'loading',         addedDate: '',         order: 1,      },   ],   tasks: {      ['todolistId1']: [         {            id: v1(),            title: 'HTML&CSS',            entityTaskStatus: 'idle',            status: TaskStatuses.New,            description: '',            priority: TaskPriorities.Low,            startDate: '',            deadline: '',            order: 1,            addedDate: '',            todoListId: 'todolistId1',         },         {            id: v1(),            title: 'JS',            entityTaskStatus: 'idle',            status: TaskStatuses.Completed,            description: '',            priority: TaskPriorities.Low,            startDate: '',            deadline: '',            order: 1,            addedDate: '',            todoListId: 'todolistId1',         },      ],      ['todolistId2']: [         {            id: v1(),            title: 'Milk',            entityTaskStatus: 'idle',            status: TaskStatuses.New,            description: '',            priority: TaskPriorities.Low,            startDate: '',            deadline: '',            order: 1,            addedDate: '',            todoListId: 'todolistId2',         },         {            id: v1(),            title: 'React Book',            entityTaskStatus: 'idle',            status: TaskStatuses.Completed,            description: '',            priority: TaskPriorities.Low,            startDate: '',            deadline: '',            order: 1,            addedDate: '',            todoListId: 'todolistId2',         },      ],   },   app: {      status: 'succeeded' as RequestStatusType,      error: null as ErrorType,      isInitialized: true   },   auth: {      isLoggedIn: true   }}export const storyBookStore = configureStore({   reducer: rootReducer,   preloadedState: initialGlobalState,   middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)})export const ReduxStoreProviderDecorator = (storyFn: any) =>   (      <Provider         store={storyBookStore}>{storyFn()}      </Provider>   )export const BrowserRouterDecorator = (storyFn: any)=>(   <HashRouter>   </HashRouter>)