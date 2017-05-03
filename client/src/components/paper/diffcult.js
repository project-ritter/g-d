import {Component} from 'react';
import rd3 from 'react-d3';
import superagent from 'superagent';

const BarChart = rd3.BarChart;

export default class Difficult extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        console.log(res.body);
        this.setState({
          barData: [{
            name: '',
            values: res.body
          }]
        });
      })
  }

  render() {
    return (
      <div>
        <BarChart data={this.state.barData} width={500} height={300}
                  title="难度分析结果" yAxisLabel="难度越小题目越难"
                  xAxisLabel=''/>
      </div>
    );
  }
}
