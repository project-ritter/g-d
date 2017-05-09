import {Component} from 'react';
import {ScatterChart} from 'react-d3';
import superagent from 'superagent';

export default class Distinct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distinct: [],
      scatterData: [{
        name: '',
        values: [{x: 0, y: 0}]
      }]
    };
  }

  componentWillMount() {
    superagent
      .get('/api/paper/distinct')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          scatterData: [{
            name: '',
            values: res.body
          }],
          distinct: res.body
        });
      })
  }

  render() {
    return (
      <div>

        <div className="col-sm-6">
          <ScatterChart data={this.state.scatterData} width={500} height={300}
                        title="区分度分析结果" yAxisLabel=""
                        xAxisLabel='题号'/>
        </div>

        <div className="col-sm-6 difficult">
          <table className="table table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th>题目</th>
              {
                this.state.distinct.map((item, index) => {
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
              <td>区分度</td>
              {
                this.state.distinct.map((item, index) => {
                  return (
                    <td key={index * 9}>{item.y}</td>
                  );
                })
              }
            </tr>
            </tbody>

          </table>

          <div className="title">
            <h3>区分度评价标准：</h3>
            <p> 0.40以上 非常良好 </p>
            <p> 0.30--0.39 良好、如能改进更好 </p>
            <p>0.20--0.29 尚可、用时需作改进</p>
            <p>0.19以下 劣、必须淘汰或改进 </p>
          </div>
        </div>

      </div>
    );
  }
}
