const connectToMongo = require("./dbConnect");
const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
connectToMongo();
const port = 5000;
// middleware to work with json
app.use(express.json());

// available routes
app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("hi! this is my first api request");
});

app.listen(port, () => {
//   console.log(`Example app listening on port http://localhost:${port}`);
});