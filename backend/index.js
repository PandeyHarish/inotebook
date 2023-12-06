const connectToMongo = require("./dbConnect");
const express = require("express");

connectToMongo();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hi! this is my first api request");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});