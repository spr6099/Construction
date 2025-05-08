const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MongoLocalURI)
    .then(() => console.log("DB connected"));

  mongoose.connection.on("error", function (err) {
    console.log("The error is :");
  });
};

module.exports = connectDB;
