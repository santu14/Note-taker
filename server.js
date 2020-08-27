const express = require("express");
const path = require("path");
const fs = require("fs");
const notesDB = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

// API Routes
app.get("/api/notes", (req, res) => {
  res.json(notesDB);
});

app.post("/api/notes", (req, res) => {
  req.body.id = Math.floor(Math.random() * 100000000);
  let newNote = req.body;

  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8").toString());
  savedNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.status(200).json({added: true});

});

app.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);

  console.log("here");

  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json").toString());

  const notes = savedNotes.filter((note) => note.id !== id);
  console.log(notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json({ array: notes });
});

// HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

