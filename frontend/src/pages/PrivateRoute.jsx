import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/WatchlistContext";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
