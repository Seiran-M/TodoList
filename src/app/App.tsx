import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Redirect, Route, Switch} from 'react-router-dom'
import {
   AppBar,
   Button,
   CircularProgress,
   Container,
   IconButton,
   LinearProgress,
   Toolbar,
   Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import './App.css'
import styles from './App.module.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {AppRootStateType} from '../state/store'
import {initializeAppTC, RequestStatusType} from '../state/reducers/app-reducer'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from '../features/login/Login'
import {logoutTC} from '../state/reducers/auth-reducer'


export const App: React.FC = () => {
   console.log('App is called')
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
   const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(initializeAppTC())
   }, [])

   const logoutHandler = () => dispatch(logoutTC())

   if (!isInitialized) {
      return (
         <div style={{position: 'fixed', top: '40%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
         </div>
      )
   }

   return (
      <>
         <div className="App">
            <AppBar position="static">
               <Toolbar className={styles.toolbar}>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                     <Menu/>
                  </IconButton>
                  <Typography className={styles.typography} variant="h6">
                     Todolists
                  </Typography>

                  {isLoggedIn &&
                  <Button className={styles.button} color="inherit" onClick={logoutHandler}>Logout</Button>}

               </Toolbar>
               {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
               <Switch>
                  <Route exact path={'/'} render={() => <TodolistsList/>}/>
                  <Route path={'/login'} render={() => <Login/>}/>
                  <Route path={'/404'} render={() => <div className={styles.error}>Error 404: Page not found!</div>}/>
                  <Redirect from={'*'} to={'/404'}/>
               </Switch>
            </Container>
            <ErrorSnackbar/>
         </div>
      </>
   )
}
