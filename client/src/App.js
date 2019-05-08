import React, { Component } from 'react';
//import logo from './logo.svg';
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
            <div
            style={{padding: 40}}>
              <br />
              <FacebookLogin
                appId=""
                fields="name,email,picture"
                callback={responseFacebook}
              />
              <br />
              <br />

              <GoogleLogin
                clientId=""
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
              />
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                My Groups <i class="fas fa-users"></i>
                </button>
              <div class="dropdown-menu dropdown-menu-lg-right">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item" type="button">Something else here</button>
              </div>
            </div>

            <br />
            <br />
            <hr />

            <div class="btn-group">
            <button type="button" class="btn btn-dark">
                Current Group <i class="fas fa-users"></i>
                </button>
              <div class="dropdown-menu dropdown-menu-lg-right">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item" type="button">Something else here</button>
              </div>
            </div>
            <br />
            <i class="fas fa-user-circle fa-3x" style={{marginRight: 5, marginTop: 10}}></i>
            <i class="fas fa-user-circle fa-3x" style={{marginRight: 5, marginLeft: 10, marginTop: 5}}></i>
            <i class="fas fa-user-circle fa-3x" style={{marginLeft: 5, marginTop: 10}}></i>
            <br />
            <br />
            <br />
              <form>
                <div class="form-group">
                <button style={{marginBottom: 10}} type="button" class="btn btn-dark">Chat <i class="far fa-comment-alt" style={{marginLeft: 5}}></i></button>
                  
                  <textarea style={{padding: 10}} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </form>
          </b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
            Open sidebar
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

