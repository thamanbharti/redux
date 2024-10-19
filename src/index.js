import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateNotes from './createNotes';
import EditNotes from './EditNotes';
import Login from './login';
const root = ReactDOM.createRoot(document.getElementById('root'));

const router=createBrowserRouter([
  {
     path:'/createNotes',
     element:<CreateNotes/>
  },
  {
    path:'/',
    element:<Login/>
  },
  {
     path:'/editNotes/:id',
     element:<EditNotes/>
  },{
      path:'/main',
      element:<App/>
  }
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
          <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
