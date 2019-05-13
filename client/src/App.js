import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";
import LeaveGroup from "./components/LeaveGroup";
// import firebase from "./utils/firebase.js";
import { GoogleApiWrapper } from 'google-maps-react';
import MapBox from "./components/MapBox";

// import ReactDOM from 'react-dom'
import ChatBox from "./components/ChatBox";
import API from "./utils/API";

import './App.css';
import CreateGroup from './components/CreateGroup/CreateGroup';

require("dotenv").config();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,

      name: "",
      id: "",

      chatText: "",
      messagesArray: [],

      groupName: "",
      
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

  responseFacebook = (response) => {
    console.log(response);
    this.saveUsers(response);
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          sidebar={<b>
           
            <button onClick={() => this.onSetSidebarOpen(false)}>
            &times;
        </button>
            
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
           <CreateGroup
           groupName={this.state.groupName}
           groupMember={this.state.name}
           />

            {/* Join group box */}
            <div className="text-box">
              <p>
                <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
                  Join a Group
              </button>
              </p>
              <div class="collapse" id="collapseExample1">
                <div class="card card-body">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Type in the group you want to join" aria-label="Group Name" aria-describedby="button-addon2" />
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary" type="button" id="button-addon">Join</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <br />
        
            <ChatBox
              name={"brendan"}
              groupName={"ACL"}
              messagesArray={this.state.messagesArray}
            />

          </b>}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
          <button onClick={() => this.onSetSidebarOpen(true)}>
          <i class="fas fa-bars"></i>
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

