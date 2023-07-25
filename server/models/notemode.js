const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: String,
    title:String,
    note: String,
  },
  {
    timestamps: true
  }
);

const noteModel = mongoose.model("notes",noteSchema)
module.exports = noteModel;