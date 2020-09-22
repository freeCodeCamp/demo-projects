require('dotenv').config();
const express = require("express");
const app = express();

const api_v1 = require("./api/v1");

app.use(express.static("public"));

app.use("/v1", api_v1);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message, err.stack);
    res.status(500).json({ status: "internal server error" });
  }
});

const portNum = process.env.PORT || 3000;

const listener = app.listen(portNum, () => {
  console.log("stock proxy is listening on port " + portNum);
});
