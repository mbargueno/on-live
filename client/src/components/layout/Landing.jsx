import React, { Component } from "react";
import { Link } from "react-router-dom";
import Footerlanding from "./Footerlanding.jsx";

class Landing extends Component {
  render() {
    return (
    <main className="landing-main">  
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h1>
              Welcome to OnLive, the desired APP for all the live music lovers
            </h1>
            <h2>
              If you are a live music lover, a band or a live music establishment this APP is made for you.
              <br/>
              <br/>
              <span className="joinus-landing">JOIN US!</span>
              
            </h2>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                style={{
                  width: "200px",
                  borderRadius: "40px",
                  letterSpacing: "1.5px",
                  backgroundColor: "transparent",
                  border: "2px solid #fff",
                  fontSize: "25px"
                }}
                className="btn btn-large waves-effect waves-light hoverable accent-3"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "200px",
                  borderRadius: "40px",
                  letterSpacing: "1.5px",
                  backgroundColor: "transparent",
                  border: "2px solid #fff",
                  fontSize: "25px"
                }}
                className="btn btn-large waves-light waves-effect hoverable accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footerlanding/>
    </main>
    );
  }
}

export default Landing;
