import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSaver from 'file-saver'
import { Toaster } from "react-hot-toast";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
    <Toaster
        position="top-right"
        reverseOrder={false}
    />
  </React.StrictMode>,
)