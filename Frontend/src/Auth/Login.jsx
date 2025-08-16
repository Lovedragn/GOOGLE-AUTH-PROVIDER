import React, { useState } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import {  useNavigate } from 'react-router';
const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    
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
    <div className="bg-black h-screen w-full flex items-center justify-center">
      {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
          useOneTap
        />
      ) : (
        <button onClick={handleLogout} className="btn">
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
