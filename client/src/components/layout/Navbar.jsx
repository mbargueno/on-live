import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Login from "components/auth/Login";

class Navbar extends Component {
  render() {
    const { user } = this.props.auth;

    if (!localStorage.getItem("jwtToken")) {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/images/Speaker08.png"}
                  alt="OnLive"
                  style={{
                    width: "150px",
                  }}
                />
              </Link>

              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/About">About</Link>
                </li>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                <li>
                  <Link to="/Contact">Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper white">
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/images/Speaker08.png"}
                  alt="OnLive"
                  style={{
                    width: "150px",
                  }}
                />
              </Link>

              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link to="/dashboard">
                    <div className="top-nav-profile">
                      <img
                        src={
                          process.env.PUBLIC_URL + user.profile_pic
                        }
                        alt={user.name}
                        title={user.name}
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="#" onClick={logoutUser()}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
