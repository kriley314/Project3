import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// import Chat from "./Chat";
// import logo from './logo.svg';

// import FacebookLogin from 'react-facebook-login';
// import GoogleLogin from 'react-google-login';
// import Sidebar from "react-sidebar";
//import logo from './logo.svg';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Sidebar from "react-sidebar";
import firebase from "./utils/firebase.js";
import { GoogleApiWrapper } from 'google-maps-react';

import MapBox from "./components/MapBox";

import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      chatText: "",
      messagesArray: []
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  };

  componentDidMount() {
    // var ref = firebase.database().ref("/chat");
    // ref.once("value")
    //   .then(function (snapshot) {
    //     console.log(snapshot.val());
    //   });
    firebase.database().ref("/chat").orderByChild("time").on("child_added", snapshot => {

      console.log("Snapshot: ",snapshot.val());
      const newMessagesArray = this.state.messagesArray;
      newMessagesArray.push(snapshot.val());

      this.setState({ messagesArray: newMessagesArray });
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  //handleCreateGroup = props => {
    //firebase.database().ref();
  // }

  chatSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/chat").push({
      name: "brendan",
      message: this.state.chatText,
      time: firebase.database.ServerValue.TIMESTAMP,
    })
    ReactDOM.findDOMNode(this.refs.chatarea).value="";
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
              style={{ padding: 40 }}>
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
              <button type="button" class="btn btn-dark">
                Change Group <i class="fas fa-users"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-lg-right">
                <button class="dropdown-item" type="button">Action</button>
                <button class="dropdown-item" type="button">Another action</button>
                <button class="dropdown-item" type="button">Something else here</button>
              </div>
            </div>
            <br />
            <i class="fas fa-user-circle fa-3x" style={{ marginRight: 5, marginTop: 10 }}></i>
            <i class="fas fa-user-circle fa-3x" style={{ marginRight: 5, marginLeft: 10, marginTop: 5 }}></i>
            <i class="fas fa-user-circle fa-3x" style={{ marginLeft: 5, marginTop: 10 }}></i>
            <br />
            <br />
            <br />
            {/* <div className="messages">
              if (this.state.data) {
                this.state.messages.map(function (comment) {
                return (
                  <div>
                    {message.author}: {message.message}
                  </div>
                )
              });
            };
            </div> */}
            <form>
              <div className="form-group">
                <button onClick= {this.chatSubmit} style={{ marginBottom: 10 }} type="button" class="btn btn-dark" >Chat <i className="far fa-comment-alt" style={{ marginLeft: 5 }}></i></button>

                <textarea style={{ padding: 10 }} onChange={this.handleInputChange} name="chatText" className="form-control" id="exampleFormControlTextarea1" ref="chatarea" rows="3"></textarea>
              </div>
            </form>
            <div className="messageContainer">
              {this.state.messagesArray.map(messageObj =>
                <p>{messageObj.name} said: "{messageObj.message}"</p>
              )}
            </div>
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
          gProps={this.props.google}
          gZoom={17}
          gOnMarkerClick={this.gOnMarkerClick}
          gName={'Current location'}
          gOnClose={this.onInfoWindowClose}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(App)



