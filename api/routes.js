const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const notesdata = require("../notesdata.json");

//get all the current message
router.get("/", (req, res) => {
  res.json(notesdata);
});

//post new message
router.post("/", (req, res) => {
  const newNotes = {
    id: uuid.v4(),
    topic: req.body.topic,
    content: req.body.content,
    status: "active",
  };

  notesdata.push(newNotes);

  //generate the new array of objects again
  return res.redirect("/");
});

//delete specific message
let deleted = router.delete("/" + ":id", (req, res) => {
  res.json(notesdata.filter((note) => note.id !== req.params.id));
});

module.exports = router;
