import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import Header from "../components/Header";
import Foooter from "../components/Foooter";

function UserLayout() {
  const { user } = useContext(AuthContext);
  // const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "user") return <Navigate to="/" replace />;

  return (
    <div>
      <div>
        <Header />
        <div>
          <Outlet />
        </div>
        <Foooter/>
      </div>
    </div>
  );
}

export default UserLayout;
