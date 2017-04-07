const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
  schoolNumber: String,
  name: String,
  normal: Number,
  middle: Number,
  exc: Number,
  end: Number,
  total: Number,
  info: String
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
