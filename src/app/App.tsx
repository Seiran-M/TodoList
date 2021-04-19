import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../state/store'
import {RequestStatusType} from '../state/reducers/app-reducer'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'


export const App: React.FC = () => {
   console.log('App is called')

   const status = useSelector<AppRootStateType, RequestStatusType>((state)=>state.app.status)
   return (
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
            <TodolistsList/>
         </Container>
         <ErrorSnackbar/>
      </div>
   )
}

