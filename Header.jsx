import React, { useState } from "react";
import "../assets/styling/Header.css";
import LogoImg from "../assets/images/react.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const fetchedUser = JSON.parse(localStorage.getItem("user"));
  console.log(fetchedUser);
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("User Logged Out in successfully");
    navigate("/login");
  };

  return (
    // header-section
    <div className="header-container">
      <div className="navdiv">
        <div className="logo">
          <img src={LogoImg} alt="Logo" height="40px" />
          <h1 className="heading">React Assignment - 7</h1>
        </div>
        <div className="nav-links">
          <ul>
            {/* use the conditional rendering to display message and link to header */}
            <li>
              {fetchedUser && (
                <p className="welcome">
                  Welcome {fetchedUser.firstName} {fetchedUser.lastName}..!
                </p>
              )}
            </li>
            <li>
              <Link className="header-link" to="/">
                Home
              </Link>
            </li>
            {fetchedUser &&
              (fetchedUser.role === "admin" ? (
                <li>
                  <Link to="/admin-dashboard">Dashboard</Link>
                </li>
              ) : (
                <li>
                  <Link to="/student-dashboard">Dashboard</Link>
                </li>
              ))}
            <li>
              {fetchedUser && (
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
