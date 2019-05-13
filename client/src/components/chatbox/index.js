import React, { Component } from 'react';
//import ReactDOM from './node_modules/react-dom';
import firebase from "../../utils/firebase.js";
import API from "../../utils/API";


class ChatBox extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.messagesArray)
    this.state = { 
        messagesArray: this.props.messagesArray
    };
  }


  componentDidMount() {
    firebase.database().ref("/chat").orderByChild("time").on("child_added", snapshot => {
      console.log("Snapshot: ", snapshot.val());
      console.log('messaes', this.state.messagesArray)
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
        this.setState({ users: res.data, name: "", id: "", },() => console.log(res.data))
      )
      .catch(err => console.log(err));
  };

  chatSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/chat/").push({
      name: "brendan",
      message: this.state.chatText,
      time: firebase.database.ServerValue.TIMESTAMP
    })
    
    this.setState({chatText: ""})
  }


  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <button onClick={this.chatSubmit} style={{ marginBottom: 10 }} type="button" class="btn btn-dark">Chat <i className="far fa-comment-alt" style={{ marginLeft: 5 }}></i></button>

            <textarea style={{ padding: 10 }} onChange={this.handleInputChange} name="chatText" className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.chatText}></textarea>
          </div>
        </form>

        <div className="messageContainer">
          {this.state.messagesArray.map(messageObj =>
            <p>{messageObj.name} said: "{messageObj.message}"</p>
          )}
        </div>
      </div>
    )
  }
}

export default ChatBox;