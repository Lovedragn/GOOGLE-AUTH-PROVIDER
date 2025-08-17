import React, { useEffect } from "react";

import Cards from "../Components/Cards";



useEffect(()=>{
     const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential,
        }),
      });

    const data = async()=>{ fetch("http://localhost:5000/get/user",{

    })}
},[])
const Container = () => {
  return (
    <div className="flex gap-5 justify-center">
      <Cards title="walking" desc="walk for 10 miles" date="10:12pm" />
      <Cards title="walking" desc="walk for 10 miles" date="10:12pm" />
      <Cards title="walking" desc="walk for 10 miles" date="10:12pm" />
      <Cards title="walking" desc="walk for 10 miles" date="10:12pm" />
    </div>
  );
};

export default Container;
