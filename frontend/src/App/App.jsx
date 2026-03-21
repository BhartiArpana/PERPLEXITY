import React, { useEffect } from 'react'
import { RouterProvider, } from 'react-router-dom'
import { router } from './App.routes'
import { useAuth } from '../features/auth/hook/useAuth'
import './styles/app.scss'

const App = () => {
const auth = useAuth() 
useEffect(()=>{
    auth.handleGetMe()
},[])

  return (
   <div className="app"> <RouterProvider router={router} /></div>
  )
}

export default App