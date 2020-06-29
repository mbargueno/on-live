import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { loginUser, setCurrentUser } from "../../../actions/authActions";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      newData: [],
      user: this.props.auth.user,
    };
  }

  componentDidMount() {
    const user = this.props.auth.user;

    if (user.role === "band") {
      let url = "/api/users/content/timeline/user/" + user.email;

      axios
        .get(url)
        .then((res) => {
          const timeline = res.data;
          var newData = [];
          timeline.map(function (item, key) {
            let getuserurl = "/api/users/user/" + item.author;

            axios.get(getuserurl).then((user) => {
              var r = item;
              r.username = user.data.name;
              r.profile_pic = user.data.profile_pic;
              newData.push(r);
            });
          });

          this.setState({ data: timeline });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let url = "/api/users/content/timeline/all/";

      axios
        .get(url)
        .then((res) => {
          const timeline = res.data;
          var newData = [];
          //console.log(timeline)
          timeline.map(function (item, key) {
            let getuserurl = "/api/users/user/" + item.author;

            axios.get(getuserurl).then((user) => {
              var r = item;
              r.username = user.data.name;
              r.profile_pic = user.data.profile_pic;
              //Array.prototype.push.apply(newData, r);
              newData.push(r);
            });
          });

          this.setState({ data: timeline });
          this.setState({ newData: newData });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return this.state.data.map(function (item, key) {
      return (
        <div className="post-container" key={key}>
          <div className="profile-pic-timeline">
            <img src={item.profile_pic} alt={item.username} title={item.username} />
          </div>
          <div className="post-header">
            <p className="post-author">{item.username}</p>
            <p className="post-date">{item.date}</p>
          </div>
          <div className="post-content">
            <p>{item.text}</p>
          </div>
        </div>
      );
    });
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Timeline);
