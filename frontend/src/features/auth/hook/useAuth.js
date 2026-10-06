import { register, login, getMe ,logout} from '../services/auth.api'
import { setUser, setLoading, setError } from '../app.slice'
import { useDispatch } from 'react-redux'

export function useAuth() {
  const dispatch = useDispatch()

  function clearError() {
    dispatch(setError(null))
  }

  async function handleRegister(name, email, password) {
    try {
      dispatch(setError(null))
      dispatch(setLoading(true))
      const data = await register(name, email, password)
      return { success: true, ...data }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Registration failed. Please try again."))
      return { success: false }
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function handleLogin(email, password) {
    try {
      dispatch(setError(null))
      dispatch(setLoading(true))
      const data = await login(email, password)
      dispatch(setUser(data.user))
      return { success: true }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Login failed. Please try again."))
      return { success: false }
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true))
      const data = await getMe()
      dispatch(setUser(data.user))
    } catch (err) {
      dispatch(setUser(null)) // logged in nahi hai, ye error nahi hai
    } finally {
      dispatch(setLoading(false))
    }
  }

  async function handleLogout() {
    try {
      dispatch(setLoading(true))
        await logout()  
    } catch (err) {
      dispatch(setError(err.response?.data?.message || "Logout failed. Please try again."))
    } finally {
      dispatch(setLoading(false))
    }
  }

  return { handleRegister, handleLogin, handleGetMe, handleLogout, clearError }
}