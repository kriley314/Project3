import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },

  getGroups: function() {
    return axios.get("/api/groups");
  },
  // Gets the user with the given id
  getGroup: function(id) {
    return axios.get("/api/groups/" + id);
  },
  // Update group with given id
  updateGroup: function(groupName) {
    return axios.put("api/groups/" + groupName);
  },

  // Deletes the user with the given id
  deleteGroup: function(id) {
    return axios.delete("/api/groups/" + id);
  },
  // Saves a user to the database
  saveGroup: function(groupData) {
    return axios.post("/api/groups", groupData);
  }
};
