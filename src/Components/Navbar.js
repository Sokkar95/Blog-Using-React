import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { signOut } from "firebase/auth";
import swal from "sweetalert";
import { auth } from "../firebase";
const Navbar = ({ isAuth, setAuth }) => {
  const logout = async () => {
    if (auth.currentUser == null) {
      swal({
        title: "You Arent Logged in!",
        icon: "error",
      });
    } else {
      await signOut(auth);
      setAuth(false);

      swal({
        title: "Logged Out Successfully!",
        text: `you will be missed !`,
        icon: "info",
      });
    }
  };
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand text-info" to="/">
          <div style={{ color: "#3c5b63" }}>
            B L <i className="bi bi-tropical-storm"></i> G{" "}
          </div>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                <i className="bi bi-house-fill"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/post">
                <i className="bi bi-postcard-heart-fill"></i> Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reg">
                <i className="bi bi-people-fill"></i> Register
              </Link>
            </li>
          </ul>

          {!isAuth && (
            <Link className="nav-link" to="/login">
              {" "}
              <button
                id="login-btn"
                className="btn btn-info"
                type="submit"
                style={{ backgroundColor: "#3c5b63" }}
              >
                <i className="bi bi-file-person-fill"></i> Login
              </button>{" "}
            </Link>
          )}
          {isAuth && (
            <Link className="nav-link" to="/home">
              {" "}
              <button
                id="login-btn"
                className="btn btn-info"
                type="submit"
                style={{ backgroundColor: "#3c5b63" }}
                onClick={logout}
              >
                <i className="bi bi-file-person-fill"></i> Logout{" "}
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
