import React, { Component } from 'react';
import logo from './logo.png';
import FacebookLogin from 'react-facebook-login';
import Sidebar from "react-sidebar";
// import firebase from "./utils/firebase.js";
import { GoogleApiWrapper } from 'google-maps-react';
import MapBox from "./components/MapBox";

// import ReactDOM from 'react-dom'
import ChatBox from "./components/ChatBox";
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
        this.setState({ users: res.data, name: "", id: "", },() => console.log(res.data))
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

            <div class="btn-group">
              <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                My Groups <i className="fas fa-users"></i>
              </button>
            </div>

            <br />
            <br />
            <hr />

            <div className="btn-group">
              <button type="button" className="btn btn-dark">
                Current Group <i className="fas fa-users"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-lg-right">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
              </div>
            </div>
            <br />
            <i className="fas fa-user-circle fa-3x" style={{ marginRight: 5, marginTop: 10 }}></i>
            <i className="fas fa-user-circle fa-3x" style={{ marginRight: 5, marginLeft: 10, marginTop: 5 }}></i>
            <i className="fas fa-user-circle fa-3x" style={{ marginLeft: 5, marginTop: 10 }}></i>
            <br />
            <br />
            <br />
           <ChatBox
            name = {"brendan"}
            messagesArray = {this.state.messagesArray}
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
            gProps = {this.props.google}
            gZoom = {17}
            gOnMarkerClick = {this.gOnMarkerClick}
            gName = {"Fred"}
            gGroupName = {"Lunch"}
            gOnClose = {this.onInfoWindowClose}
        />
      </div>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(App)

