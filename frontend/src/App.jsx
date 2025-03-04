import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinPage from "./pages/Coin";
import Login from "./components/Login/index";
import Register from "./components/SignUp/index";
import PrivateRoute from "./pages/PrivateRoute";
import Watchlist from "./pages/Wishlist";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/coin/:id" element={<PrivateRoute><CoinPage /></PrivateRoute>} />
          <Route path="/watchlist" element={<PrivateRoute><Watchlist /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
