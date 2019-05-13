const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupsSchema = new Schema({
    groupName: { type: String, required: true },
    memberIds: { type: Array },
    date: { type: Date, default: Date.now }
});

const Groups = mongoose.model("Groups", groupsSchema);

module.exports = Groups;

