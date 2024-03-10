import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./Colors/lightmode.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import pb from "./lib/pocketbase";
import RecipeView from "./Components/RecipeView/RecipeView";


const isAdmin = async () => {
  if (!pb.authStore.isAdmin) {
    await new Promise(() => {
      window.location.href = "/login";
    });
  }
  return {};
};

const isLoggedIn = async () => {
  if (pb.authStore.isValid) {
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
    path: "/admin",
    element: <Admin />,
    loader: isAdmin,
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
