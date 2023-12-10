const express = require("express");
// this is dotenv config imoirt to access environment variables
require("dotenv").config();
const router = express.Router();
const { validationResult, body } = require("express-validator"); //query, add this if you want to use query
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const User = require("../model/User");

// Access JWT secret from environment variables

const secret = process.env.JWT_SECRET;
// create a user usig: POST "/api/auth/"  does not require authentication
router.post(
  "/createUser",
  [
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("email", "Please enter a valid email").isEmail(),
    body("name", "Please enter a valid name").isLength({ min: 3 }),
    // creating a custom validation
    /*body("passwordConfirmation").custom((value, { req }) => {
      return value === req.body.password;
    }),*/
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check weather user email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "sorry email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(req.body.password, salt);
      // if the email is unique a user will be created
      user = await User.create({
        name: req.body.name,
        password: passHash,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);
      res.json({ authToken });
    } catch (error) {
      // error is logged in the console as well as a new Response is sent to the server with the error message
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// login a user usig: POST "/api/auth/"  does not require authentication

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
    // creating a custom validation
    /*body("passwordConfirmation").custom((value, { req }) => {
      return value === req.body.password;
    }),*/
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Login with proper credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Login with proper credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, secret);
      res.json({ authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// endpoint to fetch user information using the fetchuser middleware

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
module.exports = router;
