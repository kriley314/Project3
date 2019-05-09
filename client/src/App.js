import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";
import { GoogleApiWrapper } from 'google-maps-react';
import MapBox from "./components/MapBox";

import './App.css';
require("dotenv").config();





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      name: "",
      id: null
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  responseFacebook = (response) => {
    console.log(response);
    // make a API request to your server to save the user's info to your database
    // this.setState to save some of the info in your local React state
  }

  // responseGoogle = (response) => {
  //   console.log(response);
  // };

  render() {
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
        <br />
        <br />
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

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(App)
