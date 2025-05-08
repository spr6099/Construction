import React, { useContext, useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LandingPage() {
  const [logStatus, setlogStatus] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "consultancy":
          navigate("/consultancy/dashboard");
          break;
        case "supplier":
          navigate("/supplier/dashboard");
          break;
        case "contractor":
          navigate("/contractor/dashboard");
          break;
        case "labour":
          navigate("/labour/dashboard");
          break;
        default:
          break;
      }
    }
  }, [user, navigate]);

  return (
    <div className="landing container-fluid py-5 d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div
        className="row logins-container w-100 shadow-lg rounded-4 overflow-hidden"
        style={{ maxWidth: "900px", background: "#1e1e2f" }}
      >
        {/* Left Panel */}
        <div
          className="col-md-6 d-none d-md-flex flex-column justify-content-between p-4 text-white"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="mt-3">
            <h4 className="text-uppercase fw-bold">AMU</h4>
          </div>
          <div className="text-center my-auto px-3">
            <h2 className="fw-bold display-6 lh-base">
              Capturing Moments,
              <br />
              Creating Memories
            </h2>
          </div>
          <div className="text-end">
            <a href="/" className="text-white text-decoration-none fw-light">
              ← Back to website
            </a>
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-6 p-5 bg-dark text-white border-start border-secondary">
          <h2 className="fw-bold mb-3">
            {logStatus ? "Login to your account" : "Create an account"}
          </h2>

          {logStatus ? <Login /> : <Register />}
          {/* {logStatus ? <h2>hai</h2> : <h2>hellow</h2>} */}

          <div>
            <p className="mb-4">
              {logStatus
                ? "Don’t have an account?"
                : "Already have an account?"}{" "}
              <span
                className="text-info text-decoration-none"
                style={{ cursor: "pointer" }}
                onClick={() => setlogStatus(!logStatus)}
              >
                {logStatus ? "Register" : "Log in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
