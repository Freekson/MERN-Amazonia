import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../redux/store";

type TProps = {
  children: JSX.Element;
};

const AdminRoute: React.FC<TProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.user);
  return user && user.isAdmin ? children : <Navigate to="/singin" />;
};

export default AdminRoute;
