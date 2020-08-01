import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <nav className="navbar navbar-collapse fixed-top" id="mainNav">
            <div className="container">
              <Link className="navbar-brand" to="/">
                bsmithdev
              </Link>
              <button
                id="navbar-btn"
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#navbarResponsive"
                aria-controls="navbarResponsive"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Menu
                <i className="fa fa-bars" id="bars" />
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item" data-toggle="collapse" data-target="#navbarResponsive">
                    <Link 
                      className="nav-link"
                      to="/"
                    >
                      Articles
                    </Link>
                  </li>
                  <li className="nav-item" data-toggle="collapse" data-target="#navbarResponsive">
                    <a className="nav-link" href="https://github.com/bbsmithy" target="blank">
                      Work
                    </a>
                  </li>
                  <li className="nav-item" data-toggle="collapse" data-target="#navbarResponsive">
                    <Link className="nav-link" to="/cv" >
                      CV
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
