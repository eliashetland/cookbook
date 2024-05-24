import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./Colors/lightmode.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

import RecipeView from "./Components/RecipeView/RecipeView";
import NewRecipe from "./Components/NewRecipe/NewRecipe";

const redirect = async (path: string) => {
  await new Promise(() => {
    window.location.href = path;
  });
  return {};
};

const redirectLoggedIn = async () => {
  if (localStorage.getItem("token"))redirect("/");
  return {};
};

const redirectNotLoggedIn = async () => {
  if (!localStorage.getItem("token")) redirect("/login");
  return {};
};

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: <NewRecipe />,
    loader: redirectNotLoggedIn,
  },
  {
    path: "/login",
    element: <Login />,
    loader: redirectLoggedIn,
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
