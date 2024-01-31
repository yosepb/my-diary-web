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

app.get("/diary-entries", (req, res, next) => {
  DiaryEntryModel.find()
    .then((data) => {
      res.json({ diaryEntries: data });
    })
    .catch(() => {
      console.log("Error fetching entries");
    });
});

app.post("/add-entry", (req, res) => {
  let date = req.body.date;
  let entry = req.body.entry;

  const DiaryEntry = new DiaryEntryModel({ date, entry });
  DiaryEntry.save();
  res.status(200).json({ message: "Post submitted" });
});

app.delete("/remove-entry/:id", (req, res) => {
  DiaryEntryModel.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({ message: "Post deleted" });
  });
});

app.put("/update-entry/:id", (req, res) => {
  let _id = req.body.id;
  let date = req.body.date;
  let entry = req.body.entry;

  const updatedEntry = new DiaryEntryModel({ _id, date, entry });

  DiaryEntryModel.updateOne({ _id }, updatedEntry).then(() => {
    res.status(200).json({ message: "Post updated" });
  });
});

module.exports = app;
