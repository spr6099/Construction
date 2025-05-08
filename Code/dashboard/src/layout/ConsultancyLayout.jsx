import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useContext } from "react";

function ConsultancyLayout() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "consultancy") return <Navigate to="/" replace />;

  return (
    <div className="d-flex flex-column vh-100">
      <Header />

      <div className="d-flex flex-grow-1" style={{ overflow: "hidden" }}>
        <div
          className="no-scrollbar"
          style={{
            overflowY: "auto",
            height: "100%",
            maxWidth: "250px", // adjust width as needed
            minWidth:"200px",
          }}
        >
          <Sidebar />
        </div>

        <main
          className="flex-grow-1 p-3 no-scrollbar"
          style={{ overflowY: "auto", height: "100%" }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ConsultancyLayout;
