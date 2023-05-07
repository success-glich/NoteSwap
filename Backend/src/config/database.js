const mongoose = require("mongoose");

const { MONGODB_URL } = require("./vars");

class Connection {
  connectionToDb() {
    throw new Error("Cannot implement this method on parent class");
  }
}
class MongoConnection extends Connection {
  async connectionToDb() {
    await mongoose.connect(MONGODB_URL);
  }
}
class MySqLConnection extends Connection {
  async connectionToDb() {
    return "Connected successful";
  }
}

module.exports = { MongoConnection, MySqLConnection };
