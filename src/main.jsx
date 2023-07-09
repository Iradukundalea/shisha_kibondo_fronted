import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store'
import axios from "axios";
import { ToastContainer } from 'react-toastify';

// axios.defaults.baseURL = "https://shisha-be.onrender.com/api";
axios.defaults.baseURL = "http://localhost:5003/api";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
          <App />
        <ToastContainer/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
