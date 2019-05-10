import React, { Component} from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";

import MapBox from "../components/MapBox";
import API from "../utils/API";

require("dotenv").config();

class SignIn extends Component {
    state = {
      name: "",
      id: "",
    };
    
    componentDidMount() {
        this.loadUsers();
      }

    loadUsers = () => {
    API.getUsers()
        .then(res =>
        this.setState({ users: res.data, name: "", id: "", },() => console.log(res.data))
        )
        .catch(err => console.log(err));
    };

    deleteUser = id => {
        API.deleteUser(id)
          .then(res => this.loadUsers())
          .catch(err => console.log(err));
      };

    saveUsers = (data) => {
    API.saveUser(data)
    .then(res => 
        console.log(res))
    }

    handleOnClick = event => {
        event.preventDefault();
        if (this.state.name) {
          API.saveUser({
            name: this.state.name,
          })
            .then(res => this.loadUsers())
            .catch(err => console.log(err));
        }
      };

      responseFacebook = (response) => {
        console.log(response);
        this.saveUsers(response);
      }
    
      render () {
        return (
          <div className="App">
          <Sidebar
          sidebar={<b>
            <div>
            <img id="logo-image" src={logo} alt="catchup-app-logo" />
            </div>

            <div className="about-text">
            <p>The CatchUp! app allows you to
              create, share and join private location based groups.
            </p>
            
            </div>
            <div
              style={{ padding: 40 }}>
              <br />
              <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOKLOGIN}
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
              <br />
              <br />
            </div>
            </b>}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "white" } }}
          >
            <button onClick={() => this.onSetSidebarOpen(true)}>
              Menu
          </button>
          </Sidebar>
          <MapBox
          gProps = {this.props.google}
          gZoom = {17}
          gOnMarkerClick = {this.gOnMarkerClick}
          gName = {'Current location'}
          gOnClose = {this.onInfoWindowClose}
      />
      </div>
        );
      }
    }
    

export default SignIn;