import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export const register = async(name,email,password)=>{
    const response = await api.post('/api/auth/register',{name, email ,password})
    return response.data
}

export const login = async(email,password)=>{
    const response = await api.post('/api/auth/login',{ email ,password})
    // console.log('login response:', response.data);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
    }
    return response.data
}

export const getMe = async(n)=>{
    const response = await api.get('/api/auth/get-me',)
    return response.data
}

export const logout = async()=>{
    try {
        const response = await api.get('/api/auth/logout')
        return response.data
    } finally {
        localStorage.removeItem('token')
    }
}
