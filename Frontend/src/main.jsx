import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from "react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";
import Error from "./Components/Error.jsx";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import Login from "./Auth/Login.jsx";
import { getStoredUser } from "./utils/localStorage";

const VITE_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

const user = getStoredUser();
const address = user?.address || null;
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Navigate to={"auth/login"} replace />,
    errorElement: <ErrorBoundary><Error /></ErrorBoundary>
  },
  { 
    path: `/:${address}`, 
    element: <App />,
    errorElement: <ErrorBoundary><Error /></ErrorBoundary>
  },
  { 
    path: "/auth/login", 
    element: <Login />,
    errorElement: <ErrorBoundary><Error /></ErrorBoundary>
  },
  { 
    path: "*", 
    element: <Error />,
    errorElement: <ErrorBoundary><Error /></ErrorBoundary>
  },
]);
createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <GoogleOAuthProvider clientId={VITE_APP_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </ErrorBoundary>
);
