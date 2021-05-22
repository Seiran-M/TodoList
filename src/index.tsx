import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'

import './index.scss'
import {store} from './state/store'
import * as serviceWorker from './serviceWorker'
import {App} from './app/App'
import {BrowserRouter, HashRouter} from 'react-router-dom'

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
               <App />
         </BrowserRouter>
      </Provider>
   </React.StrictMode>

   , document.getElementById('root'))

serviceWorker.unregister()
