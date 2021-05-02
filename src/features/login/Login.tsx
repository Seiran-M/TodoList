import React from 'react'import {Redirect} from 'react-router-dom'import {useDispatch, useSelector} from 'react-redux'import {useFormik} from 'formik'import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'import {loginTC} from '../../state/reducers/auth-reducer'import {AppRootStateType} from '../../state/store'export const Login = () => {   const isLoggedIn = useSelector<AppRootStateType, boolean>((state)=>state.auth.isLoggedIn)   const dispatch = useDispatch()   const formik = useFormik({      initialValues: {         email: 'seyran.m1@gmail.com',         password: 'h!4KW8Dgyimt4Um',         rememberMe: false      },      validate: (values) => {         const errors: FormikErrorType = {}         if (!values.email) {            errors.email = 'Email is required'         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {            errors.email = 'Invalid email address'         }         if (!values.password) {            errors.password = 'Password is required'         } else if (values.password.length < 4 || values.password.length > 15) {            errors.password = 'Password must be from 4 to 15 characters'         }         return errors      },      onSubmit: values => {         dispatch(loginTC(values))         formik.resetForm()      },   })   if (isLoggedIn){      return <Redirect to={"/"}/>   }   return <Grid container justify="center">      <Grid item xs={4}>         <form onSubmit={formik.handleSubmit}>            <FormControl>               <FormLabel>                  <p>To log in get registered                     <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</a>                  </p>                  <p>or use common test account credentials:</p>                  <p>Email: free@samuraijs.com</p>                  <p>Password: free</p>               </FormLabel>               <FormGroup>                  <TextField                     label="Email"                     margin="normal"                     {...formik.getFieldProps('email')}                  />                  {formik.touched.email && formik.errors.email && (                     <div style={{color: 'red'}}>{formik.errors.email}</div>)}                  <TextField                     type="password"                     label="Password"                     margin="normal"                     {...formik.getFieldProps('password')}                  />                  {formik.touched.password && formik.errors.password && (                     <div style={{color: 'red'}}>{formik.errors.password}</div>)}                  <FormControlLabel                     label={'Remember me'}                     control={                        <Checkbox {...formik.getFieldProps('rememberMe')}/>                     }                  />                  <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>               </FormGroup>            </FormControl>         </form>      </Grid>   </Grid>}// typestype FormikErrorType = {   email?: string   password?: string   rememberMe?: boolean}