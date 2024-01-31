const express = require("express");
const bodyParser = require("body-parser");
const DiaryEntryModel = require("./entry-schema");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://0.0.0.0:27017/db-diary-web-indie")
  .then(() => console.log("Connection Succeed"))
  .catch((err) => console.error("Connection Failed", err));

app.use(bodyParser.json());
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

app.get("/diary-entries", (req, res, next) => {
  res.json({ diaryEntries });
});

app.get("/max-id", (req, res) => {
  let max = 0;
  for (let i = 0; i < diaryEntries.length; i++) {
    if (diaryEntries[i].id > max) {
      max = diaryEntries[i].id;
    }
  }
  res.json({ maxId: max });
});

app.post("/add-entry", (req, res) => {
  let id = req.body.id;
  let date = req.body.date;
  let entry = req.body.entry;
  const DiaryEntry = new DiaryEntryModel({ date, entry });

  console.log(DiaryEntry);

  diaryEntries.push({ id, date, entry });

  // status berhasil
  res.status(200).json({ message: "Post submitted" });
});

app.delete("/remove-entry/:id", (req, res) => {
  const index = diaryEntries.findIndex((el) => {
    return el.id == req.params.id;
  });
  diaryEntries.splice(index, 1);
  res.status(200).json({ message: "Post deleted" });
});

app.put("/update-entry/:id", (req, res) => {
  const index = diaryEntries.findIndex((el) => {
    return el.id == req.params.id;
  });

  let id = req.body.id;
  let date = req.body.date;
  let entry = req.body.entry;

  diaryEntries[index] = { id, date, entry };

  res.status(200).json({ message: "Post updated" });
});

module.exports = app;
