const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const regRouters = require('./router');

mongoose.connect('mongodb://localhost/design');

const app = express();

app.use(express.static('client/dist'));


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(bodyParser.json());

regRouters(app);

app.listen(3000, () => {
  console.log("Server started: http://localhost:3000")
});