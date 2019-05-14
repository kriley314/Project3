import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";
// import LeaveGroup from "./components/LeaveGroup";
// import firebase from "./utils/firebase.js";
import { GoogleApiWrapper } from 'google-maps-react';
import MapBox from "./components/MapBox";
import { List, ListItem } from "./components/List";
import JoinGroup from './components/JoinGroup/JoinGroup';



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
    this.loadUsers();
  }

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data }, () => console.log("loadUsers Data: ", res.data))
      )
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
    this.setState({ name: response.name, id: response.id })
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
                autoLoad={true}
                reauthenticate={true}
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

            {this.state.groupName.length ? (
              <List>
                {this.state.groupName.map(groups => {
                  return (
                    <ListItem key={groups._id}>
                      <a href={"/group/" + groups._id}>
                        <strong>
                          {this.state.groupName}
                        </strong>
                      </a>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
            <JoinGroup
              groupName={this.state.groupName}
              groupMember={this.state.name}
            />

            <ChatBox
              name={this.state.name}
              groupName={this.state.groupName}
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
          gName={this.state.name}
          gGroupName={this.state.groupName}
          gOnClose={this.onInfoWindowClose}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(App)

