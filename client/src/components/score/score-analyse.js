import React, {Component} from 'react';
import superagent from 'superagent';
import noCache from 'superagent-no-cache';
import rd3 from 'react-d3';

const PieChart = rd3.PieChart;
let pieResult = [];

const score = ['90-100（优秀）', '80-89（良好）', '70-79（中等）', '60-69（及格）', '<60（不及格）'];

export default class ScoreAnalyse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endAverage: 0,
      totalAverage: 0,
      result: [],
      len: 0,
      s: 0
    };
  }

  componentDidMount() {
    superagent
      .get('/api/grades/analyse')
      .use(noCache)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        let {endAverage, totalAverage, result, len, s} = res.body;

        for (let i = 0; i < result.length; ++i) {
          pieResult[i] = {
            label: score[i],
            value: result[i].percent
          }
        }
        this.setState({
          endAverage,
          totalAverage,
          result,
          len,
          s
        });

      })
  }

  render() {
    return (
      <div className="stack-table">

        <div className="text-center analyse-header">成绩分析结果
          <a className="pull-right" target="_blank" href={"localhost:3000/api/report/grade"}>
            表格导出<i className="fa fa-share"></i></a>
        </div>

        <table className="table table-bordered table-striped table-hover">

          <thead>
          <tr>
            <th>成绩等级</th>
            <th>人数</th>
            <th>所占比例</th>
          </tr>
          </thead>
          <tbody className="table-body">

          {
            score.map((item, index) => {
              if (this.state.result.length > 0) {
                return (
                  <tr key={index}>
                    <th>{item}</th>
                    <th>{this.state.result[index].count}</th>
                    <th>{this.state.result[index].percent + '%'}</th>
                  </tr>
                );
              }

            })
          }
          
          <tr>
            <th>平均值</th>
            <th colSpan="2">{this.state.totalAverage}</th>
          </tr>

          <tr>
            <th>标准差</th>
            <th colSpan="2">{this.state.s}</th>
          </tr>
          </tbody>
        </table>

        <div>
          <PieChart data={pieResult} width={450} height={400} radius={110} innerRadius={20} sectorBorderColor="white"
                    title=''/>
        </div>

      </div>
    );
  }
}
