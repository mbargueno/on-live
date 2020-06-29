import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Login from "components/auth/Login";

class Topmenu extends Component {

onClickHandler = (e) => {
  this.props.onChangeShow(e.target.name);

}

    render() {

        

        return (
            <div className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a href="#test1" name="timeline" onClick={this.onClickHandler}>Timeline</a>
              </li>
              <li className="tab">
                <a href="#test2" name="songs" onClick={this.onClickHandler}>
                  New Songs / Videos
                </a>
              </li>
              <li className="tab">
                <a href="#test4" name="bands" onClick={this.onClickHandler}>New Artists / bands</a>
              </li>
              <li className="tab">
                <a href="#test4" name="events" onClick={this.onClickHandler}>New Events</a>
              </li>
            </ul>
          </div>
        );

    }

}

export default Topmenu;