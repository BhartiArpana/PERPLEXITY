import React, { useEffect } from 'react'
import { RouterProvider, } from 'react-router-dom'
import { router } from './App.routes'
import { useAuth } from '../features/auth/hook/useAuth'

const App = () => {
const auth = useAuth() 
useEffect(()=>{
    auth.handleGetMe()
},[])

  return (
    <RouterProvider router={router} />
  )
}

export default App