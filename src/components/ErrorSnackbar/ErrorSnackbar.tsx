import React from 'react'
import {useSelector} from 'react-redux'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import {appActions} from '../../features/CommonActions/App'
import {useActions} from '../../utils/redux-utils'
import {selectError} from '../../features/Application/selectors'


function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
   //const [open, setOpen] = React.useState(true)
   const error = useSelector(selectError)
   const {setAppError} = useActions(appActions)

   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }
      setAppError({error: null})
   }

   const isOpen = error !== null

   return (
      <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="error">
            {error}
         </Alert>
      </Snackbar>
   )
}
