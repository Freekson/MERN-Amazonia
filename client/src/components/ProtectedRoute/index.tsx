import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

type TProps = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<TProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  return user ? children : <Navigate to="/singin" />;
};

export default ProtectedRoute;
