const express = require("express");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");

const User = require("../model/User");

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

    // check weather user email already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "sorry email already exists" });
      }

      // if the email is unique a user will be created
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      res.json(user);
    } catch (error) {
      // error is logged in the console as well as a new Response is sent to the server with the error message
      console.error(error.message);
      res.status(500).send("Sorry there is some errr");
    }
  }
);

module.exports = router;
