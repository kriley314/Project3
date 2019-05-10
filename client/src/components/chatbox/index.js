import React, { Component } from 'react';

import firebase from "./utils/firebase.js";

import './App.css';


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
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  chatSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/chat/group2").push({
      name: "brendan",
      message: this.state.chatText,
      time: firebase.database.ServerValue.TIMESTAMP
    })
  }



  <form>
  <div className="form-group">
    <button onClick={this.chatSubmit} style={{ marginBottom: 10 }} type="button" class="btn btn-dark">Chat <i className="far fa-comment-alt" style={{ marginLeft: 5 }}></i></button>

    <textarea style={{ padding: 10 }} onChange={this.handleInputChange} name="chatText" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
<div className="messageContainer">
  {this.state.messagesArray.map(messageObj =>
    <p>{messageObj.name} said: "{messageObj.message}"</p>
  )}
</div>
