import React , { Component } from "react";
import API from "../../utils/API";


class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {

      groupName: "",

    };
  }

  componentDidMount() {

    this.loadGroups();
  }

  loadGroups = () => {
    API.getGroups()
      .then(res =>
        this.setState({ groups: res.data }, () => console.log(res.data))
      )
      .catch(err => console.log(err));
  };

  saveGroups = (data) => {
    API.saveGroup(data)
      .then(res =>
        console.log(res))
  }



  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  joinSubmit = event => {
    event.preventDefault();
    if (this.state.groupName) {
      API.saveGroup({
        groupName: this.state.groupName,
        groupMember: this.state.name
      })
        .then(res => this.loadGroups())
        .catch(err => console.log(err));
    }


    // groupSubmit = event => {
    //   event.preventDefault();
    //   firebase.database().ref("/groups").push({
    //     // groupID: this.props.groupID,
    //     groupName: this.state.groupName,
    //     groupMember: this.state.name

    //   })

    this.setState({ groupName: "" })
  }

  // deleteGroup = id => {
  //   firebase.database().ref("/groups").deleteGroup(id)
  //   .then(res => this.loadGroups())
  //   .catch(err => console.log(err));
  //   };

  render() {
    return (
      <div className="text-box">
              <p>
                <button class="btn btn-dark" type="button" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
                  Join a Group
              </button>
              </p>
              <div class="collapse" id="collapseExample1">
                <div class="card card-body">
                  <div class="input-group mb-3">
                    <input type="text" onChange={this.handleInputChange} name="groupName" className="form-control" placeholder="Group Name" aria-label="Group Name" aria-describedby="button-addon2" value={this.state.groupName} />
                    <div class="input-group-append">
                      <button onClick={this.groupSubmit} className="btn btn-outline-secondary" type="button" id="button-addon">Join</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
  }
}

export default JoinGroup;