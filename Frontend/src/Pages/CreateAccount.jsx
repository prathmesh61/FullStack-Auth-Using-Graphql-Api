import React, { useState } from "react";
import "../index.scss";
import { Link } from "react-router-dom";
const CreateAccount = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <div className="Container">
      <div className="CreateAccount">
        <h1>Graphql Full Stack Auth CreateAccount</h1>
        <div className="input-box">
          <label className="label">Username:</label>
          <input
            type="text"
            required
            name="Username"
            placeholder="Username..."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
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
            placeholder="Username..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn">Submit</button>
        <span>
          If You have an account then? <Link to="/login">Login Hero.</Link>
        </span>
      </div>
    </div>
  );
};

export default CreateAccount;
