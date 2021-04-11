import React, {useEffect, useState} from 'react'import {tasksAPI} from '../api/tasks-api'export default {   title: 'TasksAPI'}export const GetTasks = () => {   const [state, setState] = useState<any>(null)   useEffect(() => {      const todolistId = 'fdf38826-f3f8-4430-82a7-dea2e143d3f7'      tasksAPI.getTasks(todolistId)         .then((res) => {            setState(res.data)         })   }, [])   return <pre> {JSON.stringify(state, null, 2)}</pre>}export const CreateTask = () => {   const [state, setState] = useState<any>(null)   useEffect(() => {      const todolistId = 'fdf38826-f3f8-4430-82a7-dea2e143d3f7'      const title = 'TASKKKK'      tasksAPI.createTask(todolistId, title)         .then((res) => {            setState(res.data)         })   }, [])   return <pre> {JSON.stringify(state, null, 2)}</pre>}export const DeleteTask = () => {   const [state, setState] = useState<any>(null)   useEffect(() => {      const todolistId = 'fdf38826-f3f8-4430-82a7-dea2e143d3f7'      const taskId = 'bde2c2a7-5506-4b97-87f3-07544969fa2d'      tasksAPI.deleteTask(todolistId, taskId)         .then((res) => {            setState(res.data)         })   }, [])   return <pre> {JSON.stringify(state, null, 2)}</pre>}export const UpdateTask = () => {   const [state, setState] = useState<any>(null)   useEffect(() => {      const todolistId = 'fdf38826-f3f8-4430-82a7-dea2e143d3f7'      const taskId = 'e10097d8-bcf8-4aeb-9950-ef61cbaf8c42'      const data = {         title: "Updated Title 145145",         description: 'Updated Description',         completed: false,         status: 111,         priority: 555,         startDate: "2012-03-19T07:22Z",         deadline: "2012-03-19T07:22Z"      }      tasksAPI.updateTask(todolistId, taskId, data)         .then((res) => {            setState(res.data)         })   }, [])   return <pre> {JSON.stringify(state, null, 2)}</pre>}