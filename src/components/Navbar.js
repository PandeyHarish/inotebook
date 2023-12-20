import  {Link}  from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React from "react";

const Navbar = ({showAlert}) => {
    let history = useNavigate();
    const handlelogout = ()=>{
      localStorage.removeItem("auth-token")
      showAlert("Logged out successfully", "success");
      history("/login");
    }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
         { !localStorage.getItem("auth-token")?<div>
            <Link role="button" className="btn btn-primary mx-1" to="/login">Login</Link>
            <Link role="button" className="btn btn-primary mx-1" to="/signup">SignUp</Link>
          </div>: <button className="btn btn-primary" onClick={handlelogout}>Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
