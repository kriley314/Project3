import React, { Component } from 'react';
import firebase from "../../utils/firebase.js";
import "./style.css";

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        
    };
  }

  componentDidMount() {
    firebase.database().ref("/groups").orderByChild("name").on("child_added", snapshot => {
      console.log("Snapshot: ", snapshot.val());
      console.log('groups', this.state.groupList)
      const newGroupList = this.state.groupList;

      // newGroupList.push(snapshot.val());

      this.setState({ groupList: newGroupList });
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  groupSubmit = event => {
    event.preventDefault();
    firebase.database().ref("/groups").push({
      // groupID: this.props.groupID,
      groupName: this.state.groupName,
      groupMember: this.state.name

    })

    this.setState({groupName: ""})
  }

  deleteGroup = id => {
    firebase.database().ref("/groups").deleteGroup(id)
    .then(res => this.loadGroups())
    .catch(err => console.log(err));
    };
    
  render() {
    return (
      <div className="text-box">
      <p>
        <button className="btn btn-dark" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Create Group
      </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <div className="input-group mb-3">
            <input type="text" onChange={this.handleInputChange} name="groupName"className="form-control" placeholder="Group Name" aria-label="Group Name" aria-describedby="button-addon2" value={this.state.groupName} />
            <div className="input-group-append">
              <button onClick={this.groupSubmit} className="btn btn-outline-secondary" type="button" id="button-addon">Create</button>
            </div>
          </div>
        </div>
      </div>
      <div id="groupsList-container">
                  
      </div>
    </div>
    )
  }
}

export default CreateGroup;