const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  number: String,
  name: String,
  sex: String,
  age: Number,
  province: String,
  city: String,
  entryYear: String,
  email: String,
  phone: String,
  idNumber: String,
  classroom: String
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
