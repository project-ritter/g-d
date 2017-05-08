const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paperScoreSchema = new Schema({
  one: {
    score: Number,
    total: Number
  },
  two: {
    score: Number,
    total: Number
  },
  three: {
    score: Number,
    total: Number
  },
  four: {
    score: Number,
    total: Number
  },
  five: {
    score: Number,
    total: Number
  },
  six: {
    score: Number,
    total: Number
  },
  total: Number
});

const PaperScore = mongoose.model('PaperScore', paperScoreSchema);

module.exports = PaperScore;
