'use strict'

const async = require('async');
const PaperScore = require('../model/paperScore');

class PaperController {
  caculateDifficult(req, res, next) {

    let result = [0, 0, 0, 0, 0, 0,];
    let total = [];
    async.waterfall([
      (done) => {
        PaperScore.find({}, done);
      },
      (data, done) => {
        total.push(data[0].one.total);
        total.push(data[0].two.total);
        total.push(data[0].three.total);
        total.push(data[0].four.total);
        total.push(data[0].five.total);
        total.push(data[0].six.total);

        data.map(item => {
          result[0] += item.one.score;
          result[1] += item.two.score;
          result[2] += item.three.score;
          result[3] += item.four.score;
          result[4] += item.five.score;
          result[5] += item.six.score;
        });
        result = result.map((item, index) => {
          return {
            x: '第 ' + (index + 1 ) + ' 题',
            y: ((item / data.length) / total[index]).toFixed(2)
          }
        });


        done(null, data);
      }
    ], (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(result);
    });
  }

}

module.exports = PaperController;