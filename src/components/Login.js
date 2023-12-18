import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("auth-token", json.authToken);
      history("/");
    }
  };
  return (
    <div className="background">
      <div className="glass-container">
        <div className="glassmorphic-box">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" onChange={onChange} name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={onChange} name="password" required />
            </div>
            <button className="btnSubmit" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
