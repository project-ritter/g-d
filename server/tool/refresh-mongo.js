'use strict'

const mongoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const User = require('../model/user');
const Student = require('../model/student');
const modelsMap = {
  User,
  Student
};

let docs = Object.keys(rawData);

mongoose.connect('mongodb://localhost/design');

Object.keys(rawData).forEach(v => {
  modelsMap[v].remove(() => {
    modelsMap[v].create(rawData[v], () => {
      docs = docs.filter(doc => doc !== v);
      if (docs.length === 0) {
        process.exit(0);
      }
    });
  });
});
