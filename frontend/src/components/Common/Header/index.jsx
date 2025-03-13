import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TemporaryDrawer from "./drawer";
import Login from "../../Login/index";
import Signup from "../../SignUp/index";

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => setToken(sessionStorage.getItem("token") || "");
    checkToken();
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const switchToSignup = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  return (
    <>
      <div className=" fixed top-0 left-0 w-full  backdrop-blur-md z-50  flex justify-between items-center   p-5 ps-5">
        <Link to={"/"}>
          <h1 className=" text-lg sm:text-xl lg:ms-3 lg:text-2xl text-white font-light">
         <span>   CryptoTrackerAI <i class="fa-brands fa-hive sm:w-sm"></i></span>
          </h1>
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-light flex gap-6 max-[800px]:hidden">
          <Link to="/" className={` ${location.pathname === "/" ? "border-b-2 border-white font-semibold" : ""}`} >Home</Link>
          <Link to="/about" className={` ${location.pathname === "/about" ? "border-b-2 border-white font-semibold" : ""}`}>About</Link>

          <Link to="/dashboard" className={` ${location.pathname === "/dashboard" ? "border-b-2 border-white font-semibold" : ""}`}>Coins</Link>
          <Link to="/nft" className={` ${location.pathname === "/nft" ? "border-b-2 border-white font-semibold" : ""}`}>NFT</Link>
          <Link to="/watchlist" className={` ${location.pathname === "/watchlist" ? "border-b-2 border-white font-semibold" : ""}`}>Watchlist</Link>
          

        </div>

        <div className="text-white font-light hidden md:flex gap-3">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-white rounded-4xl w-auto px-4 py-2 hover:bg-gray-400 text-black font-normal"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => setOpenLogin(true)}
                className="bg-white rounded-4xl w-auto px-4 py-2 hover:bg-gray-200 text-black font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setOpenRegister(true)}
                className="bg-transparent    w-auto px-4 py-2 text-white font-medium"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        <div className="hidden max-[800px]:block">
          <TemporaryDrawer />
        </div>
      </div>

      {openLogin && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setOpenLogin(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Login
              onClose={() => setOpenLogin(false)}
              onLoginSuccess={() => {
                setToken(sessionStorage.getItem("token") || "");
                setOpenLogin(false);
              }}
            />
          </div>
        </div>
      )}

      {openRegister && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setOpenRegister(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Signup
              onClose={() => setOpenRegister(false)}
              onSignupSuccess={() => {
                setToken(sessionStorage.getItem("token") || "");
                setOpenRegister(false);
              }}
            />
          </div>
          
        </div>
        
      )}
    </>
  );
};

export default Header;
