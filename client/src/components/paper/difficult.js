import {Component} from 'react';
import rd3 from 'react-d3';
import superagent from 'superagent';

const BarChart = rd3.BarChart;

export default class Difficult extends Component {

  constructor(props) {
    super(props);
    this.state = {
      difficult: [],
      barData: [{
        name: '',
        values: []
      }]
    };
  }

  componentDidMount() {
    superagent
      .get('/api/paper/difficult')
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
          <BarChart data={this.state.barData} width={500} height={300}
                    title="难度分析结果" yAxisLabel="难度越小题目越难"
                    xAxisLabel=''/>

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
        </div>

      </div>

    );
  }
}
