import {Component} from 'react';
import {ScatterChart} from 'react-d3';
import superagent from 'superagent';

// const  = rd3.ScatterChart;

export default class Distinct extends Component {

  constructor(props) {
    super(props);
    this.state = {
      distinct: [],
      scatterData: [{
        name: '',
        values: []
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
    console.log(this.state.scatterData)
    return (
      <div>

        <div className="col-sm-6">
          <ScatterChart
            data={this.state.scatterData}
            width={500}
            height={400}
            title="Scatter Chart"
          />
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
        </div>


      </div>
    );
  }
}
