import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./Colors/lightmode.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";


import RecipeView from "./Components/RecipeView/RecipeView";




const isLoggedIn = async () => {
  //TODO: Implement this function
  if (true) {
    await new Promise(() => {
      window.location.href = "/";
    });
  }
  return {};
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: isLoggedIn,
  },

  {
    path: "/recipes/:id",
    element: <RecipeView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
