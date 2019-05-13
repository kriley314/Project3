import React, { Component } from 'react';
//import ReactDOM from './node_modules/react-dom';
import firebase from "../../utils/firebase.js";
import API from "../../utils/API";


class CreateGroup extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.groupName)
    this.state = { 
        groupName: 
    };
  }

  componentDidMount() {
    firebase.database().ref("/group").orderByChild("time").on("child_added", snapshot => {
      console.log("Snapshot: ", snapshot.val());
      console.log('group', this.state.groupName)
      const newGroupName = this.state.groupName;
      newGroupName.push(snapshot.val());
      this.setState({ groupName: newGroupName });
    })
  }

  handleInputChange = event => {
    const { groupName, value } = event.target;
    this.setState({ [groupName]: value });
  };

  loadUsers = () => {
    API.getUsers()
      .then(res =>
        this.setState({ users: res.data, name: "", id: "", },() => console.log(res.data))
      )
      .catch(err => console.log(err));
  };

  groupSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/group").push({
      groupName: this.state.groupName,
      name: this.state.uName
    })
    
    this.setState({groupName: ""})
  }


  render() {
    return (
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
    )
  }
}

export default CreateGroup;