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

// update notes using: put "/api/note/updatenote/:id" login is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a new note
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json({ note });
});
module.exports = router;
