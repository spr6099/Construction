import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useContext } from "react";

function SupplyerLayout() {
  const { user } = useContext(AuthContext);
  // const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  if (!user || user.role !== "supplier") return <Navigate to="/" replace />;

  return (
    <div className="container-scroller">
      {/* <!-- partial:partials/_sidebar.html --> */}
      <Sidebar />

      {/* <!-- partial --> */}
      <div className="container-fluid page-body-wrapper">
        {/* <!-- partial:partials/_navbar.html --> */}

        <Header />

        <div >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SupplyerLayout;
