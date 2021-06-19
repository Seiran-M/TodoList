import React, {useCallback, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Grid} from '@material-ui/core'

import {AddItemForm, AddItemFormSubmitHelperType} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {selectIsLoggedIn} from '../Auth/selectors'
import {todolistsActions} from './index'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import {selectTasks, selectTodolists} from '../Application/selectors'


export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
   const tasks = useSelector(selectTasks)
   const isLoggedIn = useSelector(selectIsLoggedIn)
   const todolists = useSelector(selectTodolists)

   const {fetchTodolistsTC} = useActions(todolistsActions)

   const dispatch = useAppDispatch()

   const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
      let thunk = todolistsActions.addTodolistTC(title)
      const resultAction = await dispatch(thunk)

      if (todolistsActions.addTodolistTC.rejected.match(resultAction)) {
         if (resultAction.payload?.errors?.length) {
            const errorMessage = resultAction.payload?.errors[0]
            helper.setError(errorMessage)
         } else {
            helper.setError('Some error occured')
         }
      } else {
         helper.setTitle('')
      }
   }, [])


   useEffect(() => {
      if (demo || !isLoggedIn) {
         return
      }
      fetchTodolistsTC()
   }, [])


   if (!isLoggedIn) {
      return <Redirect to={'/login'}/>
   }

   return <>
      <Grid container style={{padding: '20px'}}>
         <AddItemForm addItem={addTodolistCallback}/>
      </Grid>
      <Grid container spacing={3} style={{flexWrap: 'wrap'}}>
         {
            todolists.map(tl => {
               let allTodolistTasks = tasks[tl.id]

               return <Grid item key={tl.id}>
                  <div style={{width: '300px'}}>
                     <Todolist
                        todolist={tl}
                        tasks={allTodolistTasks}
                        demo={demo}
                     />
                  </div>
               </Grid>
            })
         }
      </Grid>
   </>
}

//types
type PropsType = {
   demo?: boolean
}