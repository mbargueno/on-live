import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Login from "components/auth/Login";
import Topmenu from "components/dashboard/Topmenu";
import Header from "components/dashboard/header";
import Content from "components/dashboard/content/content";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdated: false,
      user: this.props.auth.user,
      show: "timeline",
    };
    //this.ChangeContainer = this.ChangeContainer.bind(this);
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onShowChange = (val) => {
    this.setState({
      show: val,
    });
  };

  render() {
    const { user } = this.props.auth;

    let url = "/api/users/user/band/" + user.email;

    if (user.role === "band") {
      return (
        <main className="profile-main">
          <div className="container">
            <Header handleUser={user} />
            <div className="row">
              <div className="col s12">
                <div className="profile-name">
                  <h4>{user.name}</h4>
                  <h5>
                    <i className="material-icons dashboard-role-icon">
                      music_note
                    </i>
                    {user.role}{" "}
                    <i className="material-icons dashboard-role-icon">star</i>{" "}
                    {user.ranking}
                  </h5>
                  <div>{user.description}</div>
                </div>
                <Topmenu onChangeShow={this.onShowChange} />
              </div>
              <div className="col s12 m4 l2">
                
              </div>
              <div className="col s12 m4 l8">
                {" "}
                <Content show={this.state.show} />
              </div>
              <div className="col s12 m4 l2">
                
              </div>
            </div>
          </div>
        </main>
      );
    } else {
      return (
        <main className="profile-main">
          <div className="container">
            <Header handleUser={user} />
            <div class="row">
              <div class="col s12">
                <div className="profile-name">
                  <h4>{user.name}</h4>
                  <h5>
                    <i className="material-icons dashboard-role-icon">
                      headset
                    </i>
                    {user.role}
                  </h5>
                </div>
                <Topmenu onChangeShow={this.onShowChange} />
              </div>
              <div class="col s12 m4 l2">
               
              </div>
              <div class="col s12 m4 l8">
                <Content show={this.state.show} />
              </div>
              <div class="col s12 m4 l2">
                
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
