import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.scss";
import {useAuth} from '../hook/useAuth'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {handleRegister} = useAuth()
  const navigate = useNavigate()
  const user = useSelector((state)=>state.auth.user)

  async function handleSubmit(e){
    e.preventDefault()

 const res = await handleRegister(name,email,password)
   navigate('/login')
   
   if(res.success){
    alert('We’ve sent a verification link to your email. Please verify your account before logging in.')
   }
   
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create your account</p>

        <form onSubmit={(e)=>handleSubmit(e)}>
       
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />

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
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
         
          <button>Register</button>
        </form>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
