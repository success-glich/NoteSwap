const app = require("./src/config/express");
const { MongoConnection } = require("./src/config/database");
const { PORT } = require("./src/config/vars");

(async () => {
  try {
    const connection = new MongoConnection();
    await connection.connectionToDb();
    console.log("🙌🤩😊☺🤩");
    app.listen(PORT, () => {
      console.log("Server Listening at PORT", PORT);
    });
  } catch (err) {
    console.log(err);
    console.log("There was some error while connecting to the database");
  }
})();
