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
      <div className="flex justify-between items-center relative p-5 ps-7 z-50">
        <Link to={"/"}>
          <h1 className="ms-5 text-2xl text-white font-normal">
            CryptoTrackerAI
          </h1>
        </Link>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-light flex gap-6 max-[800px]:hidden">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
          <Link to="/watchlist" className="hover:text-white">Watchlist</Link>
          <Link to="/chatbot" className="hover:text-white">chatbot</Link>
        </div>

        <div className="text-white font-light flex gap-3">
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
                className="bg-transparent border border-white rounded-4xl w-auto px-4 py-2 text-white font-medium"
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
