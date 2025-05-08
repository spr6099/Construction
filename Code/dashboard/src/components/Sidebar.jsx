import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";
import userProfileLink from "../hooks/CurrentUser";
function Sidebar() {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const profileLink = userProfileLink();

  return (
    <div>
      <nav className="sidebar  sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          <a className="sidebar-brand brand-logo" href="index.html">
            <img src="/assets/images/logo.svg" alt="logo" />
          </a>
          <a className="sidebar-brand brand-logo-mini" href="index.html">
            <img src="/assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
        <ul className="nav ">
          <li className="nav-item profile ">
            <div className="profile-desc">
              <div className="profile-pic">
                <div className="count-indicator">
                  <img
                    className="img-xs rounded-circle"
                    // src="/assets/images/faces/face15.jpg"
                    src={
                      user?.profileImg
                        ? `${baseUrl}/uploads/${user.profileImg}`
                        : "/assets/images/faces/face15.jpg"
                    }
                    alt=""
                  />
                  <span className="count bg-success"></span>
                </div>
                <div className="profile-name">
                  <h5 className="mb-0 font-weight-normal">{user?.name}</h5>
                  <span>{user?.role}</span>
                </div>
              </div>
              <a href="/#" id="profile-dropdown" data-toggle="dropdown">
                <i className="mdi mdi-dots-vertical"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list"
                aria-labelledby="profile-dropdown"
              >
                <Link to={profileLink} className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-primary"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      Account settings
                    </p>
                  </div>
                </Link>
                <div className="dropdown-divider"></div>
                {/* <a href="/#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      Change Password
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
                <a href="/#" className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-calendar-today text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject ellipsis mb-1 text-small">
                      To-do list
                    </p>
                  </div>
                </a> */}
              </div>
            </div>
          </li>

          {user?.role === "admin" && (
            <div>
              <li className="nav-item   nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/admin/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/admin/newrequests">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">New Requests</span>
                </Link>
              </li>

              {/* Collapse Menu Example */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">Users</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/supplyer">
                        Consultancies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/supplyer">
                        Supplyers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/contractor">
                        Contractors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/labour">
                        Labours
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin/user">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}

              {/* Other Nav Items */}
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/admin/reports">
                  <span className="menu-icon">
                    <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">Work Reports</span>
                </Link>
              </li>
              {/*  <li className="nav-item menu-items">
                <a className="nav-link" href="pages/tables/basic-table.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">Tables</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/charts/chartjs.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-title">Charts</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title">Icons</span>
                </a>
              </li> */}

              {/* Auth Collapse Menu */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-security"></i>
                  </span>
                  <span className="menu-title">User Pages</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/blank-page.html"
                      >
                        Blank Page
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-404.html"
                      >
                        404
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html"
                      >
                        500
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="pages/samples/login.html">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/register.html"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </li> */}

              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-file-document-box"></i>
                  </span>
                  <span className="menu-title">Documentation</span>
                </a>
              </li> */}
            </div>
          )}

          {user?.role === "consultancy" && (
            <div>
              <li className="nav-item  nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/consultancy/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>

              {/* <li className="nav-item menu-items">
                <Link className="nav-link" to="/consultancy/newclientworks">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">New Work Requests</span>
                </Link>
              </li> */}
              {/* <li className="nav-item menu-items">
                <Link className="nav-link" to="/consultancy/clientworks">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">New Works</span>
                </Link>
              </li> */}

              {/* Collapse Menu Example */}
              <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">Works</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/newProposals">
                        New Proposals
                      </Link>
                    </li> */}
                    {/* 
                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/consultancy/bidding_proposals"
                      >
                        bidding proposals
                      </Link>
                    </li> */}
                    {/* <li className="nav-item">
                      <Link
                        className="nav-link"
                        to="/consultancy/contractorProposals"
                      >
                        Contractor Proposals
                      </Link>
                    </li> */}
                    {/* <li className="nav-item">
                      <Link className="nav-link" >
                        starting Projects
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/tenders">
                        Tenders
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Other Nav Items */}
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/consultancy/startingprojects">
                  <span className="menu-icon">
                    <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">starting works</span>
                </Link>
              </li>
              {/* <li className="nav-item menu-items">
                <a className="nav-link" href="pages/tables/basic-table.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">Tables</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/charts/chartjs.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-title">Charts</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title">Icons</span>
                </a>
              </li> */}

              {/* Auth Collapse Menu */}
              <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-security"></i>
                  </span>
                  <span className="menu-title">Promo Works</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/addworks">
                        Add
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/viewworks">
                        view
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html"
                      >
                        500
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="pages/samples/login.html">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/register.html"
                      >
                        Register
                      </a>
                    </li> */}
                  </ul>
                </div>
              </li>

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/consultancy/profile">
                  <span className="menu-icon">
                    <i className="mdi mdi-file-document-box"></i>
                  </span>
                  <span className="menu-title">Profile</span>
                </Link>
              </li>
            </div>
          )}
          {user?.role === "supplier" && (
            <div>
              <li className="nav-item  nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/supplier/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/supplier/add_products">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Products</span>
                </Link>
              </li>

              {/* Collapse Menu Example */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">Users</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Consultancies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Supplyers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/contractor">
                        Contractors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/labour">
                        Labours
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/user">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}

              {/* Other Nav Items */}
              {/* <li className="nav-item menu-items">
                <a className="nav-link" href="pages/forms/basic_elements.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">Form Elements</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/tables/basic-table.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">Tables</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/charts/chartjs.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-title">Charts</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title">Icons</span>
                </a>
              </li> */}

              {/* Auth Collapse Menu */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-security"></i>
                  </span>
                  <span className="menu-title">User Pages</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/blank-page.html"
                      >
                        Blank Page
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-404.html"
                      >
                        404
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html"
                      >
                        500
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="pages/samples/login.html">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/register.html"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </li> */}

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/supplier/supplyer_profile">
                  <span className="menu-icon">
                    <i className="mdi mdi-file-document-box"></i>
                  </span>
                  <span className="menu-title">Profile</span>
                </Link>
              </li>
            </div>
          )}
          {user?.role === "contractor" && (
            <div>
              <li className="nav-item  nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/newtenders">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">New Tenders</span>
                </Link>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/works">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Works</span>
                </Link>
              </li>

              {/* Collapse Menu Example */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">Users</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Consultancies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Supplyers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/contractor">
                        Contractors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/labour">
                        Labours
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/user">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}

              {/* Other Nav Items */}
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/products">
                  <span className="menu-icon">
                    <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">Products</span>
                </Link>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/labours">
                  <span className="menu-icon">
                    <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">Labours</span>
                </Link>
              </li>
              {/* <li className="nav-item menu-items">
                <a className="nav-link" href="pages/charts/chartjs.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-title">Charts</span>
                </a>
              </li> */}
              {/* <li className="nav-item menu-items">
                <a className="nav-link" href="pages/icons/mdi.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title">Icons</span>
                </a>
              </li> */}

              {/* Auth Collapse Menu */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-security"></i>
                  </span>
                  <span className="menu-title">User Pages</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/blank-page.html"
                      >
                        Blank Page
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-404.html"
                      >
                        404
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html"
                      >
                        500
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="pages/samples/login.html">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/register.html"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </li> */}

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/contractor/contractor_profile">
                  <span className="menu-icon">
                    <i className="mdi mdi-file-document-box"></i>
                  </span>
                  <span className="menu-title">Profile</span>
                </Link>
              </li>
            </div>
          )}
          {user?.role === "labour" && (
            <div>
              <li className="nav-item  nav-category">
                <span className="nav-link">Navigation</span>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/labour/dashboard">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </Link>
              </li>
              
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/labour/offerLetter">
                  <span className="menu-icon">
                    <i className="mdi mdi-speedometer"></i>
                  </span>
                  <span className="menu-title">Offer Letters</span>
                </Link>
              </li>

              {/* Collapse Menu Example */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#ui-basic"
                  aria-expanded="false"
                  aria-controls="ui-basic"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-laptop"></i>
                  </span>
                  <span className="menu-title">Users</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="ui-basic">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Consultancies
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/supplyer">
                        Supplyers
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/contractor">
                        Contractors
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/labour">
                        Labours
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/consultancy/user">
                        Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </li> */}

              {/* Other Nav Items */}
              {/* <li className="nav-item menu-items">
                <a className="nav-link" href="pages/forms/basic_elements.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-playlist-play"></i>
                  </span>
                  <span className="menu-title">Form Elements</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/tables/basic-table.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-table-large"></i>
                  </span>
                  <span className="menu-title">Tables</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <a className="nav-link" href="pages/charts/chartjs.html">
                  <span className="menu-icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-title">Charts</span>
                </a>
              </li>
              <li className="nav-item menu-items">
                <Link className="nav-link" to="/labour/skills">
                  <span className="menu-icon">
                    <i className="mdi mdi-contacts"></i>
                  </span>
                  <span className="menu-title">Skills</span>
                </Link>
              </li> */}

              {/* Auth Collapse Menu */}
              {/* <li className="nav-item menu-items">
                <a
                  className="nav-link"
                  data-toggle="collapse"
                  href="#auth"
                  aria-expanded="false"
                  aria-controls="auth"
                >
                  <span className="menu-icon">
                    <i className="mdi mdi-security"></i>
                  </span>
                  <span className="menu-title">User Pages</span>
                  <i className="menu-arrow"></i>
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/blank-page.html"
                      >
                        Blank Page
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-404.html"
                      >
                        404
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/error-500.html"
                      >
                        500
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="pages/samples/login.html">
                        Login
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="pages/samples/register.html"
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </li> */}

              <li className="nav-item menu-items">
                <Link className="nav-link" to="/labour/profile">
                  <span className="menu-icon">
                    <i className="mdi mdi-file-document-box"></i>
                  </span>
                  <span className="menu-title">Profile</span>
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

// {user?.role === "supplyer" && (
//   <div>
//     <li className="nav-item nav-category">
//       <span className="nav-link">Navigation</span>
//     </li>
//     <li className="nav-item menu-items">
//       <a className="nav-link" href="index.html">
//         <span className="menu-icon">
//           <i className="mdi mdi-speedometer"></i>
//         </span>
//         <span className="menu-title">Dashboard</span>
//       </a>
//     </li>

//     {/* Collapse Menu Example */}
//     <li className="nav-item menu-items">
//       <a
//         className="nav-link"
//         data-toggle="collapse"
//         href="#ui-basic"
//         aria-expanded="false"
//         aria-controls="ui-basic"
//       >
//         <span className="menu-icon">
//           <i className="mdi mdi-laptop"></i>
//         </span>
//         <span className="menu-title">Basic UI Elements</span>
//         <i className="menu-arrow"></i>
//       </a>
//       <div className="collapse" id="ui-basic">
//         <ul className="nav flex-column sub-menu">
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/ui-features/buttons.html"
//             >
//               Buttons
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/ui-features/dropdowns.html"
//             >
//               Dropdowns
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/ui-features/typography.html"
//             >
//               Typography
//             </a>
//           </li>
//         </ul>
//       </div>
//     </li>

//     {/* Other Nav Items */}
//     <li className="nav-item menu-items">
//       <a className="nav-link" href="pages/forms/basic_elements.html">
//         <span className="menu-icon">
//           <i className="mdi mdi-playlist-play"></i>
//         </span>
//         <span className="menu-title">Form Elements</span>
//       </a>
//     </li>
//     <li className="nav-item menu-items">
//       <a className="nav-link" href="pages/tables/basic-table.html">
//         <span className="menu-icon">
//           <i className="mdi mdi-table-large"></i>
//         </span>
//         <span className="menu-title">Tables</span>
//       </a>
//     </li>
//     <li className="nav-item menu-items">
//       <a className="nav-link" href="pages/charts/chartjs.html">
//         <span className="menu-icon">
//           <i className="mdi mdi-chart-bar"></i>
//         </span>
//         <span className="menu-title">Charts</span>
//       </a>
//     </li>
//     <li className="nav-item menu-items">
//       <a className="nav-link" href="pages/icons/mdi.html">
//         <span className="menu-icon">
//           <i className="mdi mdi-contacts"></i>
//         </span>
//         <span className="menu-title">Icons</span>
//       </a>
//     </li>

//     {/* Auth Collapse Menu */}
//     <li className="nav-item menu-items">
//       <a
//         className="nav-link"
//         data-toggle="collapse"
//         href="#auth"
//         aria-expanded="false"
//         aria-controls="auth"
//       >
//         <span className="menu-icon">
//           <i className="mdi mdi-security"></i>
//         </span>
//         <span className="menu-title">User Pages</span>
//         <i className="menu-arrow"></i>
//       </a>
//       <div className="collapse" id="auth">
//         <ul className="nav flex-column sub-menu">
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/samples/blank-page.html"
//             >
//               Blank Page
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/samples/error-404.html"
//             >
//               404
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/samples/error-500.html"
//             >
//               500
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="pages/samples/login.html">
//               Login
//             </a>
//           </li>
//           <li className="nav-item">
//             <a
//               className="nav-link"
//               href="pages/samples/register.html"
//             >
//               Register
//             </a>
//           </li>
//         </ul>
//       </div>
//     </li>

//     <li className="nav-item menu-items">
//       <a
//         className="nav-link"
//         href="http://www.bootstrapdash.com/demo/corona-free/jquery/documentation/documentation.html"
//       >
//         <span className="menu-icon">
//           <i className="mdi mdi-file-document-box"></i>
//         </span>
//         <span className="menu-title">Documentation</span>
//       </a>
//     </li>
//   </div>
// )}
