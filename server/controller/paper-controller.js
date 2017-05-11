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

const getDistinct = ({key, result, program}, callback) => {
  let total, len, programType;
  async.waterfall([
    (done) => {
      PaperScore.find({}).distinct('program').exec((err, docs) => {
        if (err) {
          return next(err);
        }
        programType = docs;
        done(null, docs);
      });
    },
    (data, done) => {
      let sortKey = key + '.score';
      PaperScore.find({program: programType[program]}).sort(sortKey).exec(done);
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

const validateKey = ['total', 'one', 'two', 'three', 'four', 'five', 'six'];

const getValidate = ({docs, item}) => {
  if (item !== 'total') {
    let sum = docs.reduce((a, b) => {
      return a + b[item]['score'];
    }, 0);

    let s = 0;
    docs.forEach(item => {
      s += Math.pow(item.total - sum / docs.length, 2);
    });

    return Math.sqrt(s / docs.length).toFixed(2);
  } else {

    let sum = docs.reduce((a, b) => {
      return a + b[item];
    }, 0);

    let s = 0;
    docs.forEach(item => {
      s += Math.pow(item.total - sum / docs.length, 2);
    });

    return Math.sqrt(s / docs.length).toFixed(2);
  }

};

class PaperController {

  calculateDifficult(req, res, next) {
    let program = req.query.program;
    let result = [0, 0, 0, 0, 0, 0,];
    let total = [];
    let programType;
    async.waterfall([
      (done) => {
        PaperScore.find({}).distinct('program').exec((err, docs) => {
          if (err) {
            return next(err);
          }
          programType = docs;
          done(null, docs);
        });
      },
      (date, done) => {
        PaperScore.find({program: programType[program]}, done);
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
            x: index + 1,
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
    let program = req.query.program;
    async.each(mapKey, (item, callback) => {
      getDistinct({key: item.key, result, program}, callback);
    }, (err) => {
      if (err) {
        return next(err);
      }

      result = result.map((item, index) => {
        return {
          x: index + 1,
          y: item
        }
      });
      return res.status(200).send(result);
    });
  }

  calculateValidate(req, res, next) {
    let program = req.query.program;
    let result = [];
    let len;
    let programType;
    async.waterfall([
      (done) => {
        PaperScore.find({}).distinct('program').exec((err, docs) => {
          if (err) {
            return next(err);
          }
          programType = docs;
          done(null, docs);
        });
      },
      (date, done) => {
        PaperScore.find({program: programType[program]}, done);
      },
      (docs, done) => {
        validateKey.forEach((item) => {
          result.push(getValidate({docs, item}));
        });
        done(null, result);
      },
      (result, done) => {
        let validates = [];
        len = result.length;
        for (let i = 1; i < result.length; ++i) {
          validates.push(Math.abs((len * (1 - result[0] / result[i] ) / (len - 1)).toFixed(2)));
        }
        done(null, validates);
      }
    ], (err, result) => {
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

}

module.exports = PaperController;