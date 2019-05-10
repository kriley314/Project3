const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    accessToken: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    userID: { type: String, required: true },
    groups: { type: Array },
    date: { type: Date, default: Date.now }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

