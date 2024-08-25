import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./Colors/lightmode.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import NewRecipe from "./Components/NewRecipe/NewRecipe";
import OneRecipe from "./Pages/OneRecipe/OneRecipe";

import createStore from "react-auth-kit/createStore";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthProvider from "react-auth-kit";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: true,
});

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/create",
    element: (
      <RequireAuth fallbackPath={"/login"}>
        <NewRecipe />
      </RequireAuth>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/recipes/:id",
    element: <OneRecipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
