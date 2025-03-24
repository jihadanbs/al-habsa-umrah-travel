import React from 'react';
import ReactDOM from 'react-dom/client';  
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.jsx';
import CardPages from './pages/CardPages.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element : <App/>
  },
  {
    path: "/card",
    element: <CardPages/>
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
