const express = require("express");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilders");
const connect = require("./db/connect");

//connexion through function in db/connect.js
connect();

const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

const wilders = require("./routes/wilders");

app.use("/api/wilders", wilders);

const PORT = 3000;
//Start Server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
