import React, { useState } from "react";
import { GoogleLogin , googleLogout } from "@react-oauth/google";

const Login = () => {
     const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const handleLogout=()=>{
    googleLogout();
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  const handleLoginSuccess =()=>{
      fetch("https://" , {

      })
  }
  return (
    <div className="bg-black h-screen w-full flex items-center justify-center">
     {!isLoggedIn ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      ) : (
        <button onClick={handleLogout} className="btn">Logout</button>
      )}
    </div>
  );
};

export default Login;
