const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user collection and inserts the user below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/catchupdb"
);

const groupsSeed = [
  {
    groupName: "Test 1",
    memberIds: [],
    date: new Date(Date.now())
  },
  {
    groupName: "Test 2",
    memberIds: [],
    date: new Date(Date.now())
  },
];

db.Groups
  .remove({})
  .then(() => db.Groups.collection.insertMany(groupsSeed))
  .then(data => {
    console.log(data.result.n + " group inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
