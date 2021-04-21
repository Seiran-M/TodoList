import React from 'react'
import {useSelector} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {AppRootStateType} from '../state/store'
import {RequestStatusType} from '../state/reducers/app-reducer'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'


export const App: React.FC = () => {
   console.log('App is called')

   const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
   return (
      <BrowserRouter>
         <div className="App">
            <AppBar position="static">
               <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="menu">
                     <Menu/>
                  </IconButton>
                  <Typography variant="h6">
                     News
                  </Typography>
                  <Button color="inherit">Login</Button>
               </Toolbar>
               {status === 'loading' && <LinearProgress/>}
            </AppBar>

            <Container fixed>
               <Route exact path={'/'} render={() => <TodolistsList/>}/>
               {/*<Route path={'/login'} render={() => <Login/>}/>*/}
            </Container>

            <ErrorSnackbar/>
         </div>
      </BrowserRouter>

   )
}

