import {addTodolistAC, TasksStateType, TodolistDomainType, todolistsReducer} from './todolists-reducer'import {tasksReducer} from './tasks-reducer'test("Id's should be equals", () => {   const startTasksState: TasksStateType = {}   const startTodolistsState: Array<TodolistDomainType> = []   const action = addTodolistAC({id:'1', title: 'New title', order: 0, addedDate: ''})   const endTasksState = tasksReducer(startTasksState, action)   const endTodolistsState = todolistsReducer(startTodolistsState, action)   const keys = Object.keys(endTasksState)   const idFormTasks = keys[0]   const idFormTodolists = endTodolistsState[0].id   expect(idFormTasks).toBe(action.payload.todolist.id)   expect(idFormTodolists).toBe(action.payload.todolist.id)})