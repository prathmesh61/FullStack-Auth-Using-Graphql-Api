import React, { useState } from "react";
import "../index.scss";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const handleLogin = async () => {
    await login({ variables: { email, password } });
    navigate("/home");
  };
  if (loading) return <p>Loading...</p>;
  // if (error) return `Submission error! user not exist`;

  return (
    <div className="Container">
      <div className="CreateAccount">
        <h1>Graphql Full Stack Auth Login</h1>

        <div className="input-box">
          <label className="label">Email:</label>
          <input
            type="email"
            required
            name="Email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label className="label">Password:</label>
          <input
            type="password"
            required
            name="Password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
        </div>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <span>
          Don't have an account? <Link to="/">Create account.</Link>
        </span>
        {error && (
          <span className="error">Submission error! user not exist</span>
        )}
      </div>
    </div>
  );
};

export default Login;
