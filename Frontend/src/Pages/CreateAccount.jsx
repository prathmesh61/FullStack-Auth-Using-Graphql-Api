import React, { useState } from "react";
import "../index.scss";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
      password
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;
const CreateAccount = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN);

  const handleCreateUser = async () => {
    await createUser({ variables: { name, email, password } });
    navigate("/home");
  };

  if (loading) return "Submitting...";
  // if (error) return `Submission error! user already exist`;
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
            onChange={(e) => setName(e.target.value)}
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
        <button className="btn" onClick={handleCreateUser}>
          Submit
        </button>
        <span>
          If You have an account then? <Link to="/login">Login Hero.</Link>
        </span>
        {error && (
          <span className="error">Submission error! user already exist</span>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
