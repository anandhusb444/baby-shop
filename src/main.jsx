import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ConterxtProvider from './components/Cartcontext.jsx'
import Navbar from './components/Navbar.jsx'
import { Toaster } from 'react-hot-toast';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConterxtProvider>

     <App />
     <Toaster />
   </ConterxtProvider>

    
      
    
      

          
    
  </React.StrictMode>
)
