import React from "react";
import { Link } from "react-router-dom";
import { Twitter, LinkedIn, GitHub, Telegram } from "@mui/icons-material"; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 text-center md:text-left">
        
        {/* Branding */}
        <div className="me-10">
          <h2 className="text-xl font-normal">CryptoTrackrAI</h2>
          <p className="text-gray-400 mt-2 font-light text-sm">
            Your AI-powered crypto tracking solution.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-normal mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-400 hover:text-white transition font-light">Home</Link></li>
            <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition font-light">Dashboard</Link></li>
            <li><Link to="/watchlist" className="text-gray-400 hover:text-white transition font-light">Watchlist</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition font-light">About</Link></li>
            <li><Link to="/contact" className="text-gray-400 hover:text-white transition font-light">Contact</Link></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-lg font-normal mb-3">Features</h3>
          <ul className="space-y-2">
            <li className="text-gray-400 font-light">Live Crypto Prices</li>
            <li className="text-gray-400 font-light">Custom Watchlist</li>
            <li className="text-gray-400 font-light">AI Crypto Assistant </li>
            <li className="text-gray-400 font-light">Secure & Fast</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-normal mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/faq" className="text-gray-400 hover:text-white transition font-light">FAQs</Link></li>
            <li><Link to="/blog" className="text-gray-400 hover:text-white transition font-light">Blog</Link></li>
            <li><Link to="/terms" className="text-gray-400 hover:text-white transition font-light">Terms of Service</Link></li>
            <li><Link to="/privacy" className="text-gray-400 hover:text-white transition font-light">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-normal mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-white transition">
              <Twitter fontSize="small" />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-white transition">
              <LinkedIn fontSize="small" />
            </a>
            <a href="https://github.com" target="_blank" className="text-gray-400 hover:text-white transition">
              <GitHub fontSize="small" />
            </a>
            <a href="https://telegram.org" target="_blank" className="text-gray-400 hover:text-white transition">
              <Telegram fontSize="small" />
            </a>
          </div>
        </div>
        
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-800 pt-4">
        &copy; {new Date().getFullYear()} CryptoTrackrAI. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
