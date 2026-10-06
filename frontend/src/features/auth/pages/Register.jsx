import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, clearError } = useAuth();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    clearError();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleRegister(name, email, password);

    if (res?.success) {
      alert("We’ve sent a verification link to your email. Please verify your account before logging in.");
      navigate("/login");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <p>Create your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            autoComplete="off"
            required
            onChange={(e) => setName(e.target.value)}
          />

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
            autoComplete="new-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;