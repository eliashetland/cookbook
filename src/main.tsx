import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  if (localStorage.getItem("token"))redirect("/cookbook/");
  return {};
};

const redirectNotLoggedIn = async () => {
  if (!localStorage.getItem("token")) redirect("/cookbook/login");
  return {};
};

const router = createBrowserRouter([
  {
    path: "/cookbook/",
    element: <Home />,
  },
  {
    path: "cookbook/create",
    element: <NewRecipe />,
    loader: redirectNotLoggedIn,
  },
  {
    path: "cookbook/login",
    element: <Login />,
    loader: redirectLoggedIn,
  },

  {
    path: "cookbook/recipes/:id",
    element: <RecipeView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
