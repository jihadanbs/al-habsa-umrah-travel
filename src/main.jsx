import React from 'react';
import ReactDOM from 'react-dom/client';  
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Card from './components/card/Card.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>
  },
  {
    path: "/card",
    element: <Card/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
