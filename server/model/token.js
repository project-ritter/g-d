const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: String,
  userId: Object
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
