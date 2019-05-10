const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user collection and inserts the user below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/catchupdb"
);

const usersSeed = [
  {
    accessToken: "0okjn9uhb8yg",
    email: "1234@email.com",
    name: "User1234",
    userID: "1234",
    groups: [],
    date: new Date(Date.now())
  },
  {
    accessToken: "1qaz2wsx5tgb6yhn",
    email: "5678@email.com",
    name: "User5678",
    userID: "5678",
    groups: [],
    date: new Date(Date.now())
  },
];

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " user inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
