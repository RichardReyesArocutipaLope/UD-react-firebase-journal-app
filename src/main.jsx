import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { JournalApp } from './JournalApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <JournalApp />
    </Provider>
  </BrowserRouter>
)
