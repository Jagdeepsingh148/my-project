const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  Uid: Number,
  course: String
});

module.exports = mongoose.model("Student", studentSchema);
