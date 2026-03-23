import {register,login,getMe} from '../services/auth.api'
import {setUser,setLoading,setError} from '../app.slice'
import { useDispatch } from 'react-redux'

export function useAuth(){
    const dispatch = useDispatch()

    async function handleRegister(name, email , password){
        try{
            dispatch(setLoading(true))
            const data = await register(name, email,password)
            // dispatch(setUser(data.user))
            return data
        }catch(err){
            dispatch(setError(err.response?.data?.message || "Login failed")) 
        }
        finally{
            dispatch(setLoading(false))
        }
    }


    async function handleLogin(email, password){
        try{
            dispatch(setLoading(true))
            const data  = await login(email,password)
            dispatch(setUser(data.user))
        }catch(err){
            dispatch(setError(err.response?.data?.message))
        }
        finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(err){
            dispatch(setError(err.response?.data?.message || "User fetch failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handleRegister,
        handleLogin,
        handleGetMe
    }
}
