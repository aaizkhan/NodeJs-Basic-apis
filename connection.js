const mongoose = require("mongoose");

async function connectMongoDb(url) {
  //Connection with mongoDb
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("MongoDb Error in Connectiong", err));
}
module.exports = { connectMongoDb };
