import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import FeedPage from './Pages/FeedPage';
import ProfilePage from './Pages/ProfilePage';
import PostDetailsPage from './Pages/PostDetailsPage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';
import ProtectedRoute from './Layouts/ProtectedRoute';
import AuthProtectedRoute from './Layouts/AuthProtectedRoute';

const router=createBrowserRouter([
  {path:'', element: <MainLayout/> , children:[
    {index:true , element: <ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile' , element: <ProtectedRoute><ProfilePage/></ProtectedRoute>},
    {path:'post-details' , element: <ProtectedRoute><PostDetailsPage/></ProtectedRoute>},
    {path:'*' , element: <NotFound/>},
  ]},
  {path:'', element: <AuthLayout/> , children:[
    {path:'login' , element: <AuthProtectedRoute><Login/></AuthProtectedRoute>},
    {path:'register' , element: <AuthProtectedRoute><Register/></AuthProtectedRoute>},
  
  ]},
])
export default function App() {
  return <>
      <RouterProvider router={router}></RouterProvider>
  </>
}
