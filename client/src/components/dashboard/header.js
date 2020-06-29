import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, loginUser, setCurrentUser } from "../../actions/authActions";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import Login from "components/auth/Login";
import Modaledimg from "components/dashboard/modaledimg";


class Header extends Component {

constructor(props) {
    super(props);
    this.state = {
    isUpdated: false,  
    selectedFile: null,
    user: this.props.auth.user,
      profile_background: this.props.auth.user.profile_background,
      profile_pic: this.props.auth.user.profile_pic,
    };
  }

  

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };
    M.Modal.init(this.Modal, options);
    
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    
    const {handleUser} = this.props;
    const data = new FormData();
    
    data.append("file", this.state.selectedFile);
    data.append("userid", this.state.user.id);
    console.log(data);
    //console.log(this.state.user.id);
    axios.post("api/users/uploadbckgrndimg", data)
      .then(res => { // then print response status
        console.log(res.statusText);
        console.log(data);
        console.log(res);
        this.setState({
            profile_background: "/uploads/" + res.data.filename,
        });
        
      })
      
  };

  render() {
    
    

    return (
        <div
            className="profile-header-cont"
            id="profile_background"
            style={{ backgroundImage: "url(" + this.state.profile_background + ")" }}
          >
            <div className="profile-avatar">
              <img src={this.state.user.profile_pic} alt={this.props.auth.user.name} title={this.props.auth.user.name} />
              
            </div>
            <div className="edit-dash-bckgr-cont">
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal-edit-bckgrnd"
        >
          <i className="material-icons">edit</i>
          Change background image
        </a>

        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal-edit-bckgrnd"
          className="modal"
        >
          
          <div className="modal-content">
            <h4>Change background image</h4>
            <p>
              Choose your image below, for better looking we recomend to use
              1280x200 pixels images
            </p>
            <form>
              <input
                type="file"
                name="dashbckgrnd"
                onChange={this.onChangeHandler}
              />
              <input type="hidden" name="userid" value={this.state.user.id} />
            </form>
          </div>
          <div class="modal-footer">
            <a href="#" className="modal-close waves-effect waves-red btn-flat">
              Cancel
            </a>
            <a
              href="#"
              className="modal-close waves-effect waves-green btn-flat"
              onClick={this.onClickHandler}
            >
              Change
            </a>
          </div>
        </div>
      </div>
          </div>

    );

    }


}

Header.propTypes = {
    
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps)(Header);