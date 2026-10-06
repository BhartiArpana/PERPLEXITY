import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, clearError } = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    clearError(); // page khulte hi purana error hatao
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleLogin(email, password);
    if (res?.success) navigate("/");
  }

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Welcome back</p>

        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="off"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>

        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;