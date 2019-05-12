import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";
// import firebase from "./utils/firebase.js";
import { GoogleApiWrapper } from 'google-maps-react';
import MapBox from "./components/MapBox";

// import ReactDOM from 'react-dom'
import ChatBox from "./components/chatbox";
import API from "./utils/API";

import './App.css';

require("dotenv").config();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,

      name: "",
      id: "",

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
    //   firebase.database().ref("/chat").orderByChild("time").on("child_added", snapshot => {

    //     console.log("Snapshot: ",snapshot.val());
    //     const newMessagesArray = this.state.messagesArray;
    //     newMessagesArray.push(snapshot.val());

    //     this.setState({ messagesArray: newMessagesArray });

    //   });
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", id: "", }, () => console.log(res.data))
      )
      .catch(err => console.log(err));
  };


  //handleCreateGroup = props => {
  //firebase.database().ref();
  // }
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


  // chatSubmit = event => {
  //   event.preventDefault();
  //   firebase.database().ref("/chat").push({
  //     name: "brendan",
  //     message: this.state.chatText,
  //     time: firebase.database.ServerValue.TIMESTAMP,
  //   })
  //   ReactDOM.findDOMNode(this.refs.chatarea).value="";
  // }



  responseFacebook = (response) => {
    console.log(response);
    this.saveUsers(response);

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
              {/* <p>The CatchUp! app allows you to
                create, share and join private location based groups.
              </p> */}
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

            {/* Create group box */}
            <div className="text-box">
              <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Create Group
              </button>
              </p>
              <div className="collapse" id="collapseExample">
                <div className="card card-body">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Group Name" aria-label="Group Name" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="button" id="button-addon">Create</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Create group box */}
            <div className="text-box">
              <p>
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  Join a Group
              </button>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="card card-body">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Group Name" aria-label="Group Name" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon2">Join</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
        
            <ChatBox
              name={"brendan"}
              messagesArray={this.state.messagesArray}
            />

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
          gProps={this.props.google}
          gZoom={17}
          gOnMarkerClick={this.gOnMarkerClick}
          gName={"Fred"}
          gGroupName={"Lunch"}
          gOnClose={this.onInfoWindowClose}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(App)

