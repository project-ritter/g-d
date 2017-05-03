'use strict'

const mongoose = require('mongoose');
let rawData = require('./fixture/raw-data');
const User = require('../model/user');
const Course = require('../model/course');
const Student = require('../model/student');
const Score = require('../model/score');
const Grade = require('../model/grade');
const PaperScore = require('../model/paperScore');

const xls = require('../shell/read-xlsx');
const paperScoreXls = require('../shell/paper-score-xlsx');

const modelsMap = {
  User,
  Student,
  Course,
  Score,
  Grade,
  PaperScore
};

rawData.Grade = xls();
rawData.PaperScore = paperScoreXls();

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
