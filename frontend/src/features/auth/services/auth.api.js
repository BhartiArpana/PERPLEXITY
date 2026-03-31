import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true
})

export const register = async(name,email,password)=>{
    const response = await api.post('/api/auth/register',{name, email ,password})
    return response.data
}

export const login = async(email,password)=>{
    const response = await api.post('/api/auth/login',{ email ,password})
    return response.data
}

export const getMe = async(n)=>{
    const response = await api.get('/api/auth/get-me',)
    return response.data
}
