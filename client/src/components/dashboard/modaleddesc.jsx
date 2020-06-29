import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { loginUser, setCurrentUser } from "../../actions/authActions";

class Modaleddesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDescription: this.props.bandData.description,
      user: this.props.auth.user,
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
    M.Modal.init(this.Modaleddesc, options);
    
  }x

  onChangeHandler = (event) => {
    this.setState({
        newDescription: event.target.value,
        
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    
    data.append("newdesc", this.state.newDescription);
    data.append("userid", this.state.user.id);
    console.log(data);
    //console.log(this.state.user.id);
    axios.post("api/users/changebanddesc", data)
      .then(res => { // then print response status
        console.log(res.statusText);
        
        //this.setState({ThereIsDesc: true});
        
        
      })
  };

  render() {
    
    return (
      <div>
        <a
          className="waves-effect waves-light btn modal-trigger"
          data-target="modal-edit-desc"
        >
          
          Add Description
        </a>

        <div
          ref={(Modaleddesc) => {
            this.Modaleddesc = Modaleddesc;
          }}
          id="modal-edit-desc"
          className="modal"
        >
          
          <div className="modal-content">
            <h4>Change your description</h4>
            
            <form>
              <textarea
                name="newdesc"
                onChange={this.onChangeHandler}
              ></textarea>
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
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(Modaleddesc);