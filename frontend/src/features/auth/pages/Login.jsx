import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {handleLogin} = useAuth()
  const navigate = useNavigate()
  const user = useSelector(state=>state.auth.user)
  const loading = useSelector(state=>state.auth.loading)

 async function handleSubmit(e){
    e.preventDefault()
    await handleLogin(email,password)
    navigate('/')
  }

  if(!loading && user){
    return <Navigate to='/' />
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Welcome back</p>

        <form autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button>Login</button>
        </form>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
