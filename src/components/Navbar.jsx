import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const [active, setActive] = useState(false);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const handleClick = () => {
    logout();
  };
  
  return (
    <header>
      <div className="bg-[#1D232A] text-white/60 shadow-sm shadow-gray-600 flex justify-between items-center h-[70px] fixed top-0 w-full z-20">
        <Link to="/">
          {user ? (
            <h1 className="font-[700] text-[25px] ps-3 md:text-[35px] ">
              HRM {user?.user?.role}{" "}
            </h1>
          ) : (
            <h1 className="font-[700] text-[25px] ps-3 md:text-[35px] ">
              HRM{" "}
            </h1>
          )}
        </Link>
        <nav>
          {!user && (
            <div className="flex items-center justify-center">
              <Link to={"/login"}>
                <button className=" p-1 font-semibold " onClick={handleClick}>
                  Login
                </button>
              </Link>
            </div>
          )}
          {user && (
            <div className="flex items-center justify-center space-x-4">
              {location.pathname === "/" && (
                <Link to={"/home"}>
                  <button className="border border-[#578DE7]  rounded-md  font-medium p-2">
                    Dashboard
                  </button>
                </Link>
              )}

              <button
                className=" border-r p-1 font-semibold  pr-2"
                onClick={handleClick}
              >
                Log out
              </button>

              <div className="relative">
                <div
                  onClick={() => setActive(!active)}
                  className="avatar cursor-pointer"
                >
                  <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2 mr-3">
                    <img
                      src={user && user.user?.profileImage?.public_id ? `https://res.cloudinary.com/dzrvgsiey/image/upload/v1722068233/${user.user?.profileImage?.public_id}.jpg` : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt=""/>
                  </div>
                </div>
                {active && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-lg text-gray-900 z-50">
                    <div className="rounded-t-lg h-14 overflow-hidden"></div>
                    <div className="mx-auto w-16 h-16 relative ring-primary/50 ring-offset-base-100 ring  -mt-16  rounded-full overflow-hidden">
                      <img
                        className="object-cover  object-center w-16 h-16"
                        src={user && user.user?.profileImage?.public_id ? `https://res.cloudinary.com/dzrvgsiey/image/upload/v1722068233/${user.user?.profileImage?.public_id}.jpg` : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                        alt="Woman looking front"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h2 className="font-semibold">{user.user.name}</h2>
                      <p className="text-gray-500">{user.user.jobrole}</p>
                      <p className="text-gray-500 text-sm">
                        +91 {user.user.mob}
                      </p>
                      <p className="text-gray-500 text-sm">{user.user.email}</p>
                    </div>
                    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                      <li className="flex flex-col items-center justify-around">
                        <svg
                          className="w-4 fill-current text-blue-900"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <div>2k</div>
                      </li>
                      <li className="flex flex-col items-center justify-between">
                        <svg
                          className="w-4 fill-current text-blue-900"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                        </svg>
                        <div>10k</div>
                      </li>
                      <li className="flex flex-col items-center justify-around">
                        <svg
                          className="w-4 fill-current text-blue-900"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>
                        <div>15</div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
