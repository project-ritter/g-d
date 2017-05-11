'use strict'

const async = require('async');
const superagent = require('superagent');

const Grade = require('../model/grade');

class EmailController {
  getAll(req, res, next) {
    console.log('iuewopppppppppptyuio')
    console.log('sdklfj')
    console.log(req.body)

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
        }],

      (err) => {
        if (err) {
          return next(err);
        }
        let html = getTableTemplate({result, totalAverage, s, len});
        superagent
          .post('http://sendcloud.sohu.com/webapi/mail.send.json')
          .type('form')
          .send({
            api_user: 'ritter_q_test_UrgDlT',
            api_key: 'tquQK6oUaeuMU9iK',
            from: 'bme_ritter@outlook.com',
            to: req.body.userEmail,
            html,
            subject: '成绩分析报告'
          })
          .end((err, data) => {
            if (err) {
              throw err;
            }
            res.send(data);
          });
      });
  }
}

const getTableTemplate = ({result, totalAverage, s, len}) => {
  return (
    `<table style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
    <thead>
    <caption>试卷分析报告</caption>
    </thead>
    <tbody>
    <tr></tr>
    <tr>
        <th colspan="7"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            (2016-2017学年第1学期)
        </th>
    </tr>
    <tr>
        <th colspan="7"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            课程名称：数据库原理及应用B 课程代码：JS100492 课程性质：选修课 学分：3.0
        </th>
    </tr>
    <tr>
        <th colspan="3"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            任课教师：乔平安
        </th>
        <th colspan="4"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            教学班代号：网络1501
        </th>
    </tr>
    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; "
            rowspan="5">试卷成绩
        </th>
    </tr>
    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            成绩等级
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            90-100
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            80-89
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            70-79
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            60-69
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            <60
        </th>
    </tr>
    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            人数
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${result[0].count}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${result[1].count}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${result[2].count}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${result[3].count}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${result[4].count}
        </th>
    </tr>
    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            所占比例
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${(result[0].count / len).toFixed(2) * 100 + '%'}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${(result[1].count / len).toFixed(2) * 100 + '%'}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${(result[2].count / len).toFixed(2) * 100 + '%'}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${(result[3].count / len).toFixed(2) * 100 + '%'}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${(result[4].count / len).toFixed(2) * 100 + '%'}
        </th>
    </tr>
    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            平均值
        </th>
        <th colspan="2"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${totalAverage}
        </th>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            标准差
        </th>
        <th colspan="2"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            ${s}
        </th>
    </tr>

    <tr rowspan="4">
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            试卷情况分析
        </th>
        <th colspan="6"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; "></th>
    </tr>

    <tr>
        <th style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            改进措施
        </th>
        <th colspan="6"
            style="border-width: 1px;padding: 8px;border-style: solid;border-color: #666666;background-color: #ffffff; "></th>
    </tr>

    <tr>
        <th colspan="3"
            style="border-width: 1px;padding: 8px;text-align:left;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            试卷分析人(签字)
        </th>

        <th colspan="4"
            style="border-width: 1px;padding: 8px; text-align:left;border-style: solid;border-color: #666666;background-color: #ffffff; ">
            系(教研室)主任(签字)
        </th>
    </tr>

    </tbody>
</table>
`
  )

};

module.exports = EmailController;