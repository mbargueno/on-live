import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper white">
            <Link
              to="/"
            >
             <img src={process.env.PUBLIC_URL + '/images/Speaker08.png'}
               alt="OnLive"
               style={{
                width: "150px"
                
              }}
             />
             
            </Link>
          
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link
              to="/About"
              
            >
              About
            </Link>
          </li>
          <li>
          <Link
              to="/Login"
              
            >
              Login
            </Link>
          </li>
          <li>
          <Link
              to="/Contact"
              
            >
              Contact
            </Link>
          </li>
        </ul>
        </div>
        </nav>
      </div>
      
    );
  }
}

export default Navbar;
