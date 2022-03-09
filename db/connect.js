const mongoose = require("mongoose");

module.exports = async function connect() {
  try {
    const url = "mongodb://127.0.0.1:27017/wilderdb";

    await mongoose.connect(url, { autoIndex: true });
    console.log("Connected sucessfully to database");
  } catch (err) {
    console.error(err.message);
  }
};
