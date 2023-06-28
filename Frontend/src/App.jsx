import React from "react";
import "./index.scss";
// import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateAccount from "./Pages/CreateAccount";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateAccount />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
