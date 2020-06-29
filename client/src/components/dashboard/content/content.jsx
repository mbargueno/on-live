import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { loginUser, setCurrentUser } from "../../../actions/authActions";
import Timeline from "components/dashboard/content/timeline.jsx";
import Songs from "components/dashboard/content/songs.jsx";
import Bands from "components/dashboard/content/bands.jsx";
import Events from "components/dashboard/content/events.jsx";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      user: this.props.auth.user,
    };
  }

  

  render() {

    if(this.props.show === "timeline"){
        
        return (<div><Timeline /></div>)
    } else if (this.props.show === "songs"){
        
        return (<div><Songs /></div>)
    } else if (this.props.show === "bands"){
        return (<div><Bands /></div>)
    } else if (this.props.show === "events"){
        return (<div><Events /></div>)
    } else {
        
        return (<p>Error loading content</p>)
    }
    
    
  }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
  });
  
  export default connect(mapStateToProps)(Content);