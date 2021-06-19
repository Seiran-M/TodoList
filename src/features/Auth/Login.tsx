import React from 'react'
import {useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {FormikHelpers, useFormik} from 'formik'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'

import {authActions} from './index'
import {login} from './auth-reducer'
import {selectIsLoggedIn} from './selectors'
import {useAppDispatch} from '../../utils/redux-utils'


export const Login = () => {
   const isLoggedIn = useSelector(selectIsLoggedIn)
   const dispatch = useAppDispatch()

   const formik = useFormik({
      validate: (values) => {
         if (!values.email) {
            return {
               email: 'Email is required'
            }
         }
         if (!values.password) {
            return {
               password: 'Password is required'
            }
         }

      },
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {
         const resultAction = await dispatch(authActions.login(values))

         if (login.rejected.match(resultAction)) {
            if (resultAction.payload?.fieldsErrors?.length) {
               const error = resultAction.payload?.fieldsErrors[0]
               formikHelpers.setFieldError(error.field, error.error)
            }
         }
      },
   })

   if (isLoggedIn) {
      return <Redirect to={'/'}/>
   }


   return <Grid container justify="center">
      <Grid item xs={4}>
         <form onSubmit={formik.handleSubmit}>
            <FormControl>
               <FormLabel>
                  <p>
                     To log in get registered <a href={'https://social-network.samuraijs.com/'}
                                                 rel="noopener">here</a>
                  </p>
                  <p>
                     or use common test account credentials:
                  </p>
                  <p> Email: free@samuraijs.com
                  </p>
                  <p>
                     Password: free
                  </p>
               </FormLabel>
               <FormGroup>
                  <TextField
                     label="Email"
                     margin="normal"
                     {...formik.getFieldProps('email')}
                  />
                  {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                  <TextField
                     type="password"
                     label="Password"
                     margin="normal"
                     {...formik.getFieldProps('password')}
                  />
                  {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                  <FormControlLabel
                     label={'Remember me'}
                     control={<Checkbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                     />}
                  />
                  <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
               </FormGroup>
            </FormControl>
         </form>
      </Grid>
   </Grid>
}

//types
type FormValuesType = {
   email: string
   password: string
   rememberMe: boolean
}