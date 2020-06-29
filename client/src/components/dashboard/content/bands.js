import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { loginUser, setCurrentUser } from "../../../actions/authActions";

class Bands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      user: this.props.auth.user,
    };
  }

  render() {
    
    return (<p>This will be the bands news</p>)
  }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps, { loginUser })(Bands);