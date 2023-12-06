const express = require("express");
const router = express.Router();

const User = require("../model/User");

// create a user usig: POST "/api/auth/"  does not require authentication
router.post("/", (req, res) => {
    const user = User(req.body);
    user.save();

  res.json(req.body);
});


module.exports = router;