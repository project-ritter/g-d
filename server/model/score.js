const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  student: {
    type: Schema.ObjectId,
    ref: 'Student'
  },
  course: {
    type: Schema.ObjectId,
    ref: 'Course'
  },
  grade: Number
});

const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;
