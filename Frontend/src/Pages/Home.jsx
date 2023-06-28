import { useState } from "react";
import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

const Home = () => {
  const [imgURL, setImgURL] = useState("");
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const imgUp = (e) => {
    const img = e.target.files[0];
    setImgURL(URL.createObjectURL(img));
  };
  return (
    <div>
      {data?.getUsers?.slice(0, 1).map((user) => (
        <div className="card">
          <img src={imgURL} alt="YourPic" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <input onChange={imgUp} type="file" placeholder="Upload Your Pic" />
        </div>
      ))}
    </div>
  );
};

export default Home;
