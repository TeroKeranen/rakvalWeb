import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import { store } from './store.js'
import { Provider } from 'react-redux'
import { Amplify } from 'aws-amplify'
import awsconfig from '../amplifyconfiguration.json'

Amplify.configure(awsconfig)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
