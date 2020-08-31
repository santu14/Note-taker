// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");


// Set up PORT for local use or Heroku
const PORT = process.env.PORT || 8080;

const app = express();
// Required for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files CSS/JS 
app.use(express.static(__dirname + "/public"));

// ---------------- API Routes ---------------------

// --- GET ----
app.get("/api/notes", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")));
});


// --- POST ----
app.post("/api/notes", (req, res) => {
  // Add Unique 8 digit ID 
  req.body.id = Math.floor(Math.random() * 100000000);
  // Store note in variable
  let newNote = req.body;

  // Return our stored notes as an array of objects
  const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log(savedNotes);
  // Add new note to array
  savedNotes.push(newNote);
  // save our new array of object into a .json file
  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.status(200).json({added: true});

});


// --- DELETE ----
app.delete("/api/notes/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);

  // Return our stored notes as an array of objects
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  console.log(savedNotes);
  
  // Filter our notes by all notes that do not match deleted note id
  const notes = savedNotes.filter((note) => note.id !== id);
  console.log(notes);
  // Save our new array of notes
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  res.json();
});

// ---------------- HTML routes -----------------------

// Route to Notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Route to Home page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on: http://localhost:" + PORT);
});

