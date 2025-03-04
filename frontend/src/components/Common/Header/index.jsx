import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TemporaryDrawer from './drawer';

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center relative p-5 ps-7 z-50 ">
      {/* Left: Logo */}
      <Link to={'/'}>
        <h1 className="ms-5 text-2xl text-white font-normal">
          CryptoTrackerAI 
        </h1>
      </Link>

      {/* Center: Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-light flex gap-6 max-[800px]:hidden">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        <Link to="/watchlist" className="hover:text-white">Watchlist</Link>
      </div>

      {/* Right: Login/Signup or Logout */}
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
              className="bg-transparent border-white rounded-4xl w-auto px-4 py-2  text-white font-medium"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Drawer */}
      <div className="hidden max-[800px]:block">
        <TemporaryDrawer />
      </div>

      
    </div>
  );
};

export default Header;
