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
  

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    } else {
      const savedNotes = JSON.parse(data);
      savedNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  });
});

app.delete("/api/notes/:id", (req, res) => {
  let id = req.params.id;
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
