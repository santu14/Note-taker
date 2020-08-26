const express = require("express");
const path = require("path");
const fs = require("fs");
const { Console } = require("console");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

// HTML routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API Routes
const allNotes = [];

app.get("/api/notes", (req, res) => {
  res.json("/db/db.json");
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  allNotes.push(newNote);

  res.json(newNote);
  console.log("saved notes: " + JSON.stringify(allNotes))
});

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

module.exports = allNotes;