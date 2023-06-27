import React from "react";
import "../index.scss";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="Container">
      <div className="CreateAccount">
        <h1>Graphql Full Stack Auth Login</h1>

        <div className="input-box">
          <label className="label">Email:</label>
          <input type="email" required name="Email" placeholder="Email..." />
        </div>
        <div className="input-box">
          <label className="label">Password:</label>
          <input
            type="password"
            required
            name="Password"
            placeholder="Username..."
          />
        </div>
        <button className="btn">Login</button>
        <span>
          Don't have an account? <Link to="/">Create account.</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
