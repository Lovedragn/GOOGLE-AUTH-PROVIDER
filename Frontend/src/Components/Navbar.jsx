import Login from "../Auth/Login";
import { useState, useEffect } from "react";
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full py-2 px-10 justify-between  text-white ">
      <div className="bg-grey-400 h-10 w-full flex items-center justify-between">
        <div className="flex w-full ">
          <h3>{user?.name}</h3>
        </div>
        <div className="flex gap-5">
          <img
            src={user?.picture} // ✅ Google payload gives `picture`
            alt="Profile"
            className="w-8 rounded-full"
            loading="eager"
            width={8}
          />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
