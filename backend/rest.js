const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTION"
  );
  next();
});

diaryEntries = [
  { id: 1, date: "March 1st", entry: "Entry 1" },
  { id: 2, date: "March 11st", entry: "Entry 2" },
  { id: 3, date: "March 21st", entry: "Entry 3" },
];

app.use(bodyParser.json());

app.post("/add-entry", (req, res) => {
  let id = req.body.id;
  let date = req.body.date;
  let entry = req.body.entry;

  diaryEntries.push({ id, date, entry });

  // status berhasil
  res.status(200).json({ message: "Post submitted" });
});

app.get("/diary-entries", (req, res, next) => {
  res.json({ diaryEntries });
});

module.exports = app;
