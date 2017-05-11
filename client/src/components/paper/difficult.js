import {Component} from 'react';
import rd3 from 'react-d3';
import superagent from 'superagent';

const LineChart = rd3.LineChart;

export default class Difficult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficult: [],
      barData: [{
        name: '',
        values: [{x: 0, y: 0}]
      }]
    };
  }

  componentDidMount() {
    superagent
      .get('/api/paper/difficult')
      .query({program: this.props.currentProgram})
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          barData: [{
            name: '',
            values: res.body
          }],
          difficult: res.body
        });
      })
  }

  componentWillReceiveProps() {
    superagent
      .get('/api/paper/difficult')
      .query({program: this.props.currentProgram})
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          barData: [{
            name: '',
            values: res.body
          }],
          difficult: res.body
        });
      })
  }

  render() {
    return (
      <div>
        <div className="col-sm-6">
          <LineChart
            legend={true}
            data={this.state.barData}
            width={500}
            height={300}
            viewBoxObject={{
              x: 0,
              y: 0,
              width: 500,
              height: 400
            }}
            title="难度分析结果"
            yAxisLabel="难度"
            xAxisLabel="题号"
            domain={{x: [, 10], y: [-10,]}}
            gridHorizontal={true}
          />

        </div>
        <div className="col-sm-6 difficult">
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th>题目</th>
              {
                this.state.difficult.map((item, index) => {
                  return (
                    <th key={index}>
                      {item.x}
                    </th>
                  );
                })
              }
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>难度</td>
              {
                this.state.difficult.map((item, index) => {
                  return (
                    <td key={index * 9}>{item.y}</td>
                  );
                })
              }
            </tr>
            </tbody>

          </table>

          <div className="title">
            <h3>难度评价标准：</h3>
            <p>
              试题的难度指数在0.3－0.7之间比较合适，整份试卷的平均难度最好在0.5左右，高于0.7和低于0.3的试题不能太多。
            </p>
          </div>

        </div>

      </div>

    );
  }
}
