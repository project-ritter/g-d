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

  gradeCSV(req, res, next) {
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

        endAverage = endSum / len;
        totalAverage = sum / len;

        result = result.map((item) => {
          return {
            count: item,
            percent: (item / len * 100).toFixed(2) + '%'
          }
        });
        done(null, data);
      },
      (data, done) => {

        let s2 = 0;
        data.forEach(({total}) => {
          s2 += (total - endAverage) * (total - endAverage);
        });
        s = (Math.sqrt(s2 / len)).toFixed(2);
        done(null, data);
      }], (err) => {

      let filename = 'grade-analyse.csv';
      let content = '成绩等级,人数,所占比例\n';
      content += '90-100（优秀）,' + result[0].count + ',' + (result[0].count / len).toFixed(2) * 100 + '%' + '\n';
      content += '80-89（良好）,' + result[1].count + ',' + (result[1].count / len).toFixed(2) * 100 + '%' + '\n';
      content += '70-79（中等）,' + result[2].count + ',' + (result[2].count / len).toFixed(2) * 100 + '%' + '\n';
      content += '60-69（及格）,' + result[3].count + ',' + (result[3].count / len).toFixed(2) * 100 + '%' + '\n';
      content += '<60（不及格）,' + result[4].count + ',' + (result[4].count / len).toFixed(2) * 100 + '%' + '\n';
      content += '平均值,' + totalAverage + '\n';
      content += '标准差,' + s + '\n';

      res.setHeader('Content-disposition', 'attachment; filename=' + filename + '');
      res.setHeader('Content-Type', 'text/csv');

      res.send(content);

    })
  }

}

module.exports = ReportCSV;