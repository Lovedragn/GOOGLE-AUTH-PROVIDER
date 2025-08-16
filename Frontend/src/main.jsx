import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import Error from "./Components/Error.jsx";
import Login from "./Auth/Login.jsx";
const VITE_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const address = localStorage.getItem("address_url");
const router = createBrowserRouter([
  { path: "/", element: <Navigate to={"auth/login"} replace /> },
  { path: `/:${address}`, element: <App /> },
  { path: "/auth/login", element: <Login /> },
  { path: "*", element: <Error /> },
]);
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={VITE_APP_GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
