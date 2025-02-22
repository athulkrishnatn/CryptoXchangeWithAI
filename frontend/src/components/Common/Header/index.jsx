import React from 'react';
import TemporaryDrawer from './drawer';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex justify-between items-center relative p-5 ps-7">
      {/* Left: Logo */}
      <Link to={'/'}>
        <h1 className="ms-5 text-2xl text-white font-semibold">
          CryptoTrackerAI <span className="text-blue-300">.</span>
        </h1>
      </Link>

      {/* Center: Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white font-light flex gap-6 max-[800px]:hidden">
        <Link to="/" className="hover:text-white">Home</Link>
        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
        <Link to="/compare" className="hover:text-white">Compare</Link>
        <Link to="/watchlist" className="hover:text-white">Watchlist</Link>
      </div>

      {/* Right: Login/Signup */}
      <div className="text-white font-light">
        <h2>Login/Signup</h2>
      </div>

      {/* Mobile Drawer */}
      <div className="hidden max-[800px]:block">
        <TemporaryDrawer />
      </div>
    </div>
  );
};

export default Header;
