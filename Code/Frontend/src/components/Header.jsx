import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const Logout = () => {
    sessionStorage.clear();
    setuser("");
    navigate("/");
  };
  return (
    <div>
      <div className="top-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-12">
              <div className="logo">
                <a>
                  <h1>Builderz</h1>
                  {/* <img src="img/logo.jpg" alt="Logo" /> */}
                </a>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 d-none d-lg-block">
              <div className="row">
                <div className="col-4">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="flaticon-calendar"></i>
                    </div>
                    <div className="top-bar-text">
                      <h3>Opening Hour</h3>
                      <p>Mon - Fri, 8:00 - 9:00</p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="flaticon-call"></i>
                    </div>
                    <div className="top-bar-text">
                      <h3>Call Us</h3>
                      <p>+012 345 6789</p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="top-bar-item">
                    <div className="top-bar-icon">
                      <i className="flaticon-send-mail"></i>
                    </div>
                    <div className="top-bar-text">
                      <h3>Email Us</h3>
                      <p>info@example.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Top Bar End --> */}

      {/* <!-- Nav Bar Start --> */}
      <div className="nav-bar">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <a href="#" className="navbar-brand">
              MENU
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto">
                <a className="nav-item nav-link active">Home</a>
                <a className="nav-item nav-link">About</a>
                <a className="nav-item nav-link">Service</a>
                <a className="nav-item nav-link">Team</a>
                <a className="nav-item nav-link">Project</a>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Pages
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item">Blog Page</a>
                    <a className="dropdown-item">Single Page</a>
                  </div>
                </div>
                <a className="nav-item nav-link">Contact</a>
              </div>
              <div className="ml-auto d-flex gap-2">
                <Link
                  className="btn btn-outline-light"
                  to={""}
                  onClick={Logout}
                >
                  Logout
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
