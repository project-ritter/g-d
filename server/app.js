const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const regRouters = require('./router');

mongoose.connect('mongodb://localhost/design');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

regRouters(app);

app.use('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.listen(3000, () => {
  console.log("Server started: http://localhost:3000")
});
