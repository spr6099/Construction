import React, { useState } from "react";
import Login from "./Login";

function Header({ isScrolled, logins, setlogins }) {
  const [menuOpen, setmenuOpen] = useState(false);
  const toggleMenu = () => setmenuOpen(!menuOpen);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark navbar-custom fixed-top ${
        isScrolled ? "top-nav-collapse" : ""
      }`}
    >
      {" "}
      {/* Image Logo */}
      <a className="navbar-brand logo-image" href="index.html">
        <img src="/assets/images/logo.svg" alt="alternative" />
      </a>
      {/* Mobile Menu Toggle Button */}
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-awesome fas fa-bars"></span>
        <span className="navbar-toggler-awesome fas fa-times"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${menuOpen ? "show" : ""} `}
        id="navbarsExampleDefault"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link page-scroll"
              href="#register"
              onClick={(e) => {
                setTimeout(() => {
                  setlogins(true);
                }, 100); // delay just enough to let the scroll happen
              }}
            >
              LOGIN
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link page-scroll"
              href="#register"
              onClick={(e) => {
                setTimeout(() => {
                  setlogins(false);
                }, 100); // delay just enough to let the scroll happen
              }}
            >
              REGISTER <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link page-scroll" href="#description">
              DETAILS
            </a>
          </li>

          {/* Dropdown Menu */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle page-scroll"
              href="#date"
              id="navbarDropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              DATE
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="article-details.html">
                <span className="item-text">ARTICLE DETAILS</span>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="terms-conditions.html">
                <span className="item-text">TERMS CONDITIONS</span>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="privacy-policy.html">
                <span className="item-text">PRIVACY POLICY</span>
              </a>
            </div>
          </li>
          {/* End of Dropdown Menu */}

          <li className="nav-item">
            <a className="nav-link page-scroll" href="#contact">
              CONTACT
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <span className="nav-item social-icons">
          <span className="fa-stack">
            <a href="#your-link">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-facebook-f fa-stack-1x"></i>
            </a>
          </span>
          <span className="fa-stack">
            <a href="#your-link">
              <i className="fas fa-circle fa-stack-2x"></i>
              <i className="fab fa-twitter fa-stack-1x"></i>
            </a>
          </span>
        </span>
      </div>
    </nav>
  );
}

export default Header;
