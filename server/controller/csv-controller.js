'use strict'

const student = require('../model/student');

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

}

module.exports = ReportCSV;