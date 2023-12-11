const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const { validationResult, body } = require("express-validator");
const Notes = require("../model/notes");

const router = express.Router();

// Fetch all notes using: GET "/api/note/fetchnotes" - login is required
router.get("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Add notes using: POST "/api/note/addnotes" - login is required
router.post(
  "/addnotes",
  fetchuser,
  [body("title", "Please enter a valid title").isLength({ min: 3 }), body("description", "Please enter a valid description").isLength({ min: 3 })],
  async (req, res) => {
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
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error("Error adding note:", error.message);
      res.status(500).json({ error: "Failed to add note" });
    }
  }
);

// Update notes using: PUT "/api/note/updatenote/:id" - login is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
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

  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to update this note" });
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });
  } catch (error) {
    console.error("Error updating note:", error.message);
    res.status(500).json({ error: "Failed to update note" });
  }
});

// Delete notes using: DELETE "/api/note/deletenote/:id" - login is required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to delete this note" });
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "The note has been deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
