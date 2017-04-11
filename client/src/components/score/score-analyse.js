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
      result: [0, 0, 0, 0, 0],
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
            value: result[i]
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

        <div className="text-center">成绩分析结果
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

          <tr>
            <th>90-100（优秀）</th>
            <th>{this.state.result[0]}</th>
            <th>{(this.state.result[0] / this.state.len * 100).toFixed(2) + '%'}</th>
          </tr>

          <tr>
            <th>80-89（良好）</th>
            <th>{this.state.result[1]}</th>
            <th>{(this.state.result[1] / this.state.len * 100).toFixed(2) + '%'}</th>
          </tr>

          <tr>
            <th>70-79（中等）</th>
            <th>{this.state.result[2]}</th>
            <th>{(this.state.result[2] / this.state.len * 100).toFixed(2) + '%'}</th>
          </tr>

          <tr>
            <th>60-69（及格）</th>
            <th>{this.state.result[3]}</th>
            <th>{(this.state.result[3] / this.state.len * 100).toFixed(2) + '%'}</th>
          </tr>

          <tr>
            <th>{"<60"}（不及格）</th>
            <th>{this.state.result[4]}</th>
            <th>{(this.state.result[4] / this.state.len * 100).toFixed(2) + '%'}</th>
          </tr>

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
                    title='饼形图'/>
        </div>

      </div>
    );
  }
}
