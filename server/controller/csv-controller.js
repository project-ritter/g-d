'use strict'
const async = require('async');

const student = require('../model/student');
const Grade = require('../model/grade');

class ReportCSV {
  studentCSV(req, res, next) {
    student.find({}, (err, docs) => {
      if (err) {
        return next(err);
      }

      let content = '学号,班级,姓名,性别,年龄,邮箱,手机号,身份证号,省,城市,入学年份\n';
      for (let i = 0; i < docs.length; ++i) {
        content += docs[i].number + ',';
        content += docs[i].classroom + ',';
        content += docs[i].name + ',';
        content += docs[i].sex + ',';
        content += docs[i].age + ',';
        content += docs[i].email + ',';
        content += docs[i].phone + ',';
        content += docs[i].idNumber + ',';
        content += docs[i].province + ',';
        content += docs[i].city + ',';
        content += docs[i].entryYear + '\n';
      }

      var filename = 'student.csv';

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'text/csv');

      res.send(content);
    })
  }

  gradeAnalyseCSV(req, res, next) {
    let endAverage = 0;
    let totalAverage = 0;
    let s = 0;
    let len = 0;
    let result = [0, 0, 0, 0, 0];
    async.waterfall([
      (done) => {
        Grade.find(done);
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

        endAverage = endSum / len;
        totalAverage = sum / len;

        result = result.map((item) => {
          return {
            count: item,
            percent: (parseFloat(item / len) * 100) + '%'
          }
        });
        done(null, result);
      },
      (data, done) => {
        let filename = 'score-analyse.csv';
        let content = '试卷成绩\n';
        content += '成绩等级, 90-100（优秀）,80-89（良好）,70-79（中等）,60-69（及格）,< 60（不及格）\n';
        content += '人数,';
        data.map(({count}) => {
          content += count + '人 ,'
        });
        content += '\n 所占百分比,';
        data.map(({percent}) => {
          content += percent + ','
        });

        content += '\n 平均值,' + totalAverage + ', 标准差,' + s + '\n';

        done(null, {filename, content});
      }
    ], (err, result) => {
      res.setHeader('Content-disposition', 'attachment; filename=' + result.filename + '');
      res.setHeader('Content-Type', 'text/csv');

      res.send(result.content);
    });
  }
}

module.exports = ReportCSV;