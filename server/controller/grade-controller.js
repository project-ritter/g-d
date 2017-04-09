'use strict'

const async = require('async');
const Grade = require('../model/grade');

class GradeController {
  getAll(req, res, next) {
    Grade.find({}, (err, docs) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(docs);
    });
  }

  gradeAnalyse(req, res, next) {
    let endAverage = 0;
    let totalAverage = 0;
    let s = 0;
    let len = 0;
    let result = [0, 0, 0, 0, 0];
    async.waterfall([
      (done) => {
        Grade.find({info: ''}, done);
      },
      (data, done) => {
        len = data.length;
        data = data.map(({end, total}) => {
          return {end, total};

        });
        done(null, data);
      },
      (data, done) => {
        let endSum = 0;
        let sum = 0;
        data.forEach(({end, total}) => {
          console.log(end, total)
          endSum += end;
          sum += total;
          if (total >= 90) {
            result[0]++;
          } else if (total >= 80 && total <= 89) {
            result[1]++;
          } else if (total >= 70 && total <= 79) {
            result[2]++;
          } else if (total >= 60 && total < 69) {
            result[3]++;
          } else {
            result[4]++;
          }
        });

        endAverage = endSum / len;
        totalAverage = sum / len;
        done(null, null);
      }], (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({endAverage, totalAverage, result, len, s});
    })

  }
}

module.exports = GradeController;