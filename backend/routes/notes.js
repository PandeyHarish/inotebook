const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator"); //query, add this if you want to use query
const Notes = require("../model/notes");

const router = express.Router();

// fetch all notes using: get "/api/note/fetchnotes"  login is required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// add notes  using: post  "/api/note/fetchnotes" login is required
router.post(
  "/addnotes",
  fetchuser,
  [body("title", "Please enter a valid title").isLength({ min: 3 }), body("description", "Please enter a valid descprition").isLength({ min: 3 })],
  async (req, res) => {
    // if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNotes = await note.save();
      res.json(savedNotes);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);
module.exports = router;
