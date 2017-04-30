'use strict'

const async = require('async');
const Grade = require('../model/grade');

class GradeController {
  getAll(req, res, next) {
    let {currentPage = 1, pageCount = 10}= req.query;
    let skipCount = pageCount * (currentPage - 1);
    async.series({
        items: (done) => {
          Grade.find({}).limit(Number(pageCount)).skip(skipCount).exec((err, data) => {
            done(err, data);
          });
        },
        totalPage: (done) => {
          Grade.count((err, data) => {
            let count = Math.ceil(data / pageCount);
            done(err, count);
          });
        }
      },
      (err, result) => {
        if (err) {
          return next(err);
        }
        return res.status(200).send(result);

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

        result = result.map((item) => {
          return {
            count: item,
            percent: (item / len * 100).toFixed(2)
          }
        });

        endAverage = ( endSum / len).toFixed(2);
        totalAverage = (sum / len).toFixed(2);
        done(null, data);
      },
      (data, done) => {

        let s2 = 0;
        data.forEach(({total}) => {
          s2 += (total - endAverage) * (total - endAverage);
        });
        s = (Math.sqrt(s2 / len)).toFixed(2);
        done(null, s);
      }], (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({endAverage, totalAverage, result, len, s});
    })

  }
}

module.exports = GradeController;