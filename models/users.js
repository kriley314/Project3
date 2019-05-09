const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    id: { type: Number, required: false },
    email: { type: String, required: false },
    name: { type: String, required: false },
    userID: { type: Number, required: false },
    date: { type: Date, default: Date.now }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

