import React, { Component } from 'react';
//import ReactDOM from './node_modules/react-dom';
import firebase from "../../utils/firebase.js";
import API from "../../utils/API";
import "./style.css";


class ChatBox extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.messagesArray)
    this.state = {
      messagesArray: this.props.messagesArray
    };
  }


  componentDidMount() {

    // firebase.database().ref("/chat").orderByChild("time").on("child_added", snapshot => {
    firebase.database().ref("/chat").orderByChild("groupName").equalTo(this.props.groupName).on("child_added", snapshot => {

      console.log("Snapshot: ", snapshot.val());
      console.log('messages', this.state.messagesArray)
      const newMessagesArray = this.state.messagesArray;
      newMessagesArray.push(snapshot.val());
      this.setState({ messagesArray: newMessagesArray });
    })



    this.loadUsers();
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", id: "", }, () => console.log(res.data))
      )
      .catch(err => console.log(err));
  };

  chatSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/chat").push({
      name: this.props.name,
      groupName: this.props.groupName,
      message: this.state.chatText,
      time: firebase.database.ServerValue.TIMESTAMP
    })

    this.setState({ chatText: "" })
  }


  render() {
    return (
      <div>
        {/* <form>
          <div className="form-group">
            <button onClick={this.chatSubmit} style={{ marginBottom: 10 }} type="button" class="btn btn-dark">Chat <i className="far fa-comment-alt" style={{ marginLeft: 5 }}></i></button>

            <textarea style={{ padding: 10 }} onChange={this.handleInputChange} name="chatText" className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.chatText}></textarea>
          </div>
        </form> */}

        {/* New message input
        <div id="chatbox" class="input-group mb-3">
          <input onChange={this.handleInputChange} name="chatText" type="text" class="form-control" placeholder="Message" aria-label="Message" aria-describedby="button-addon2" value={this.state.chatText} />
          <div class="input-group-append">
            <button onClick={this.chatSubmit} class="btn btn-dark" type="button" id="button-addon2">Send</button>
          </div>
        </div> */}

        {/* collapse */}
        <div className="text-box">
          <p>
            <button className="btn btn-dark" type="button" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
              Chat<i className="far fa-comment-alt" style={{ marginLeft: 5 }}></i></button>
          </p>
          <div className="collapse" id="collapseExample3">
            <div className="card card-body">
              <div className="input-group mb-3">
              <input onChange={this.handleInputChange} name="chatText" type="text" class="form-control" placeholder="Message" aria-label="Message" aria-describedby="button-addon2" value={this.state.chatText} />
                <div className="input-group-append">
                <button onClick={this.chatSubmit} class="btn btn-dark" type="button" id="button-addon2">Send</button>
                </div>
              </div>
                 {/* // full chat container */}
        <div className="messageContainer">
          {this.state.messagesArray.map(messageObj =>
            <p>{messageObj.name} said: "{messageObj.message}"</p>
          )}
        </div>
            </div>
         
          </div>
        </div>



        
      </div>
    )
  }
}

export default ChatBox;