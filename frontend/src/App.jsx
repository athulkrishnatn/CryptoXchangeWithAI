import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CoinPage from "./pages/Coin";
import Watchlist from "./pages/Watchlist";
import Login from "../src/components/Login/index";
import Signup from "../src/components/SignUp/index";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute  from "../src/pages/ProtectedRoute"
import { WatchlistProvider } from "./context/WatchlistContext";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <div className="App">
      <WatchlistProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home/>} />

            
  
            {/* Protected Routes */}
       
              <Route path="/dashboard" element={  <ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/coin/:id" element={<ProtectedRoute><CoinPage /></ProtectedRoute>} />
              <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

              
        
          </Routes>
          <Chatbot/>
        </BrowserRouter>
      </WatchlistProvider>
    </div>
  );
}

export default App;
