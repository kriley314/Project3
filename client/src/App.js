import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Sidebar from "react-sidebar";
import { GoogleApiWrapper } from 'google-maps-react';

import MapBox from "./components/MapBox";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
  render() {
    const responseFacebook = (response) => {
      console.log(response);
    }

    const responseGoogle = (response) => {
      console.log(response);
    }


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
                appId="REACT_APP_FACEBOOKLOGIN"
                fields="name,email,picture"
                callback={responseFacebook}
              />
              <br />
              <br />

              <GoogleLogin
                clientId="REACT_APP_GOOGLE_LOGIN"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
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
