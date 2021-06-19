import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import App from './app/App'
import './index.css'
import {store} from './app/store'
import * as serviceWorker from './serviceWorker'


ReactDOM.render(
   <Provider store={store}>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
   </Provider>, document.getElementById('root'))


serviceWorker.unregister()
