'use strict'

const async = require('async');
const PaperScore = require('../model/paperScore');

function getAllTotal(data) {
  let total = [];
  total.push(data[0].one.total);
  total.push(data[0].two.total);
  total.push(data[0].three.total);
  total.push(data[0].four.total);
  total.push(data[0].five.total);
  total.push(data[0].six.total);
  return total;
}

const mapKey = [{
  key: 'one',
  value: 1
}, {
  key: 'two',
  value: 2
}, {
  key: 'three',
  value: 3
}, {
  key: 'four',
  value: 4
}, {
  key: 'five',
  value: 5
}, {
  key: 'six',
  value: 6
}];

const getDistinct = ({key, result}, callback) => {
  let total, len;
  async.waterfall([
    (done) => {
      let sortKey = key + '.score';
      PaperScore.find({}).sort(sortKey).exec(done);
    },
    (data, done) => {
      total = getAllTotal(data);
      len = parseInt(data.length * 0.27);
      let low = 0;
      let high = 0;
      for (let i = 0; i < len; ++i) {
        low += data[i][key].score;
        high += data[data.length - i - 1][key].score;
      }
      low = low / len;
      high = high / len;
      let aver = ((high - low) / data.length).toFixed(2);
      result.push(aver);
      done(null, aver);
    }
  ], callback);
};

class PaperController {

  calculateDifficult(req, res, next) {

    let result = [0, 0, 0, 0, 0, 0,];
    let total = [];
    async.waterfall([
      (done) => {
        PaperScore.find({}, done);
      },
      (data, done) => {
        total = getAllTotal(data);

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

  calculateDistinct(req, res, next) {
    let result = [];
    async.each(mapKey, (item, callback) => {
      getDistinct({key: item.key, result}, callback);
    }, (err) => {
      if (err) {
        return next(err);
      }

      result = result.map((item, index) => {
        return {
          x: '第 ' + (index + 1 ) + ' 题',
          y: item
        }
      });
      return res.status(200).send(result);
    });
  }

  calculateValidate(req, res, next) {

  }

}

module.exports = PaperController;