import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'animate.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'sweetalert2/dist/sweetalert2.min.css'
import './assets/styles/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
