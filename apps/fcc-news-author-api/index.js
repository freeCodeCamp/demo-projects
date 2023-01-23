require("dotenv").config();
const authors = require("./authors");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/authors", (req, res) => {
  res.json(authors);
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
