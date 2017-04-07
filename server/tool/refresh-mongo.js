'use strict'

const mongoose = require('mongoose');
let rawData = require('./fixture/raw-data');
const User = require('../model/user');
const Course = require('../model/course');
const Student = require('../model/student');
const Score = require('../model/score');
const Grade = require('../model/grade');

const xls = require('../shell/read-xlsx');

const modelsMap = {
  User,
  Student,
  Course,
  Score,
  Grade
};

console.log(xls())
rawData.Grade = xls();
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
