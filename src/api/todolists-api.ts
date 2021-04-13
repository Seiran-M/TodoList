import axios from 'axios'const instance = axios.create({   baseURL: 'https://social-network.samuraijs.com/api/1.1/',   withCredentials: true,   headers: {'API-KEY': '85f20b48-f9ce-40aa-b7ca-82ca81a13c9b'}})// APIexport const todolistsAPI = {   getTodolists() {      return instance.get<Array<TodolistType>>('todo-lists')   },   createTodolist(title: string) {      return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})   },   deleteTodolist(todolistId: string) {      return instance.delete<ResponseType>(`todo-lists/${todolistId}`)   },   updateTodolist(todolistId: string, title: string) {      return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})   }}// typesexport type TodolistType = {   id: string   addedDate: string   order: number   title: string}type ResponseType<D = {}> = {   resultCode: number   messages: Array<string>   data: D}