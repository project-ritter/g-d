import {Component} from 'react';
import rd3 from 'react-d3';
import superagent from 'superagent';

const BarChart = rd3.BarChart;

export default class Validate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validate: [],
      barData: [{
        name: '',
        values: []
      }]
    };
  }

  componentDidMount() {
    superagent
      .get('/api/paper/validate')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          barData: [{
            name: '',
            values: res.body
          }],
          validate: res.body
        });
      })
  }

  render() {
    return (
      <div>
        <div className="col-sm-6">
          <BarChart data={this.state.barData} width={500} height={300}
                    title="信度分析结果" yAxisLabel=""
                    xAxisLabel=''/>

        </div>
        <div className="col-sm-6 validate">
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th>题目</th>
              {
                this.state.validate.map((item, index) => {
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
              <td>信度</td>
              {
                this.state.validate.map((item, index) => {
                  return (
                    <td key={index * 9}>{item.y}</td>
                  );
                })
              }
            </tr>
            </tbody>

          </table>

          <div className="title">
            <h3>信度评价标准：</h3>
            <p>
              一般来说，该系数愈高，即工具的信度愈高。在基础研究中，信度至少应达到 0.80 才可接受，在探索性研究中，信度只要达到 0.70 就可接受，介于 0.70－0.98 均属高信度,而低于 0.35
              则为低信度，必须予以拒绝。
            </p>
          </div>

        </div>

      </div>

    );
  }
}
