import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  useEffect(() => {
    if (isLoggedIn) {
      const addressUrl = localStorage.getItem("address_url");
      if (addressUrl) {
        navigate(`/${addressUrl}`);
      }
    }
  }, []);
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/auth/login");
    setIsLoggedIn(false);
  };
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential,
        }),
      });

      console.log("login success");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("address_url", data.address);
      setIsLoggedIn(true); // update UI immediately
      navigate(`/:${localStorage.getItem("address_url")}`); // navigate to the user's page
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-900">
          <div className="flex flex-col justify-center items-center gap-1 pb-10">
            
            <h2 className="text-5xl">Google Auth</h2>
            <h1 className="text-9xl font-medium">CRUD</h1>
          </div>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => console.log("Login Failed")}
            useOneTap
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Login;
